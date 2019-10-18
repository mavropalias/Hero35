import React, { useState, useEffect, useContext, useReducer } from "react";
import firebase from "firebase/app";
declare const FS: any;

export type UserContextProps = {
  name: string;
  picture: string;
  signedIn: boolean;
};

const initState: UserContextProps = {
  name: null,
  picture: null,
  signedIn: false
};

export const UserContext = React.createContext({
  state: {
    name: null,
    picture: null,
    signedIn: false
  },
  dispatch: () => {}
} as {
  state: UserContextProps;
  dispatch: React.Dispatch<any>;
});

export type UserReducerAction = {
  type: "login" | "logout";
  payload?: UserContextProps;
};

const reducer = (state: UserContextProps, action: UserReducerAction) => {
  switch (action.type) {
    case "logout":
      return initState;
    case "login":
      return {
        ...state,
        signedIn: true,
        name: action.payload.name,
        picture: action.payload.picture
      };
  }
};

export const UserContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initState);
  const value = { state, dispatch };

  useEffect(() => {
    //TODO this get triggered too often
    if (firebase.auth) {
      const unregisterAuthObserver = firebase
        .auth()
        .onAuthStateChanged(user => {
          if (!!user) {
            if (!state.signedIn) {
              dispatch({
                type: "login",
                payload: {
                  name: user.displayName,
                  picture: user.photoURL,
                  signedIn: true
                }
              });
              if (FS) {
                FS.identify(user.uid);
              }
            }
          } else {
            if (state.signedIn) {
              dispatch({ type: "logout" });
              if (FS) {
                FS.identify(false);
              }
            }
          }
        });
      return function cleanup() {
        unregisterAuthObserver();
      };
    }
  });

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
