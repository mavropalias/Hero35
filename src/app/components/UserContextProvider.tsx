import React, { useEffect, useReducer } from "react";
import firebase from "firebase/app";
import Database from "../services/Database";
import { UserContextProps, UserReducerAction } from "../schema";
import INITIAL_STATE from "../constants/initialState";
declare const FS: any;

// Crate context
export const UserContext = React.createContext({
  state: { ...INITIAL_STATE },
  dispatch: () => {}
} as {
  state: UserContextProps;
  dispatch: React.Dispatch<any>;
});

// Create reducer
const reducer = (state: UserContextProps, action: UserReducerAction) => {
  switch (action.type) {
    case "LOGOUT":
      return { ...INITIAL_STATE };
    case "LOGIN":
      return {
        ...state,
        signedIn: true,
        name: action.payload.name,
        email: action.payload.email,
        picture: action.payload.picture
      };
    case "HYDRATE_FROM_DB":
      return {
        ...state,
        savedTalks: action.payload.savedTalks || []
      };
  }
};

export const UserContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, { ...INITIAL_STATE });
  const value = { state, dispatch };

  // Update state when user signs in
  useEffect(() => {
    if (firebase.auth) {
      const unregisterAuthObserver = firebase
        .auth()
        .onAuthStateChanged(async user => {
          if (!!user) {
            if (!state.signedIn) {
              dispatch({
                type: "LOGIN",
                payload: {
                  name: user.displayName,
                  email: user.email,
                  picture: user.photoURL,
                  signedIn: true
                }
              });
              if (FS) {
                FS.identify(user.uid);
              }
            }
            const updatedUser = await Database.getUser();
            dispatch({
              type: "HYDRATE_FROM_DB",
              payload: { savedTalks: updatedUser.savedTalks }
            });
          } else {
            if (state.signedIn) {
              dispatch({ type: "LOGOUT" });
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
  }, [firebase.auth]);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
