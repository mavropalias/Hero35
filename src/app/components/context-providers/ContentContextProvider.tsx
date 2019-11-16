import React, { useEffect, useReducer } from "react";
import Router, { useRouter } from "next/router";
import { ContentState, Talk } from "../../schema";
import CATEGORIES from "../../constants/categories";

// Create context
const INITIAL_STATE: ContentState = {
  topTalks: [],
  curatedTalks: [],
  newTalks: [],
  hotTalks: [],
  risingTalks: [],
  upcomingTalks: []
};
export const ContentContext = React.createContext({
  state: { ...INITIAL_STATE },
  dispatch: () => {}
} as {
  state: ContentState;
  dispatch: React.Dispatch<any>;
});

// Create reducer
const reducer = (
  state: ContentState,
  action: { type: string; payload: Talk[] }
): ContentState => {
  switch (action.type) {
    case "FETCH_CURATED_TALKS":
      if (state.curatedTalks.length > 0) {
        return state;
      } else {
      }
    // return {
    //   ...state,
    //   curatedTalks: action.payload
    // };
  }
};

// Create context provider
export const ContentContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, { ...INITIAL_STATE });
  const router = useRouter();
  const value = { state, dispatch };

  return (
    <ContentContext.Provider value={value}>
      {props.children}
    </ContentContext.Provider>
  );
};
