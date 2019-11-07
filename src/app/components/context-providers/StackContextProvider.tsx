import React, { useEffect, useReducer } from "react";
import Router, { useRouter } from "next/router";
import { Category } from "../../schema";
import CATEGORIES from "../../constants/categories";

// Get stack slug from Router
const routerStackSlug = () => {
  if (Router.router && Router.pathname == "/stack/[stackid]") {
    return Router.query.stackid as string;
  } else {
    return "";
  }
};

// Create context
const INITIAL_STATE = CATEGORIES.find(cat => cat.slug === routerStackSlug());
export const StackContext = React.createContext({
  state: { ...INITIAL_STATE },
  dispatch: () => {}
} as {
  state: Category;
  dispatch: React.Dispatch<any>;
});

// Create reducer
const reducer = (
  state: Category,
  action: { type: string; stack_slug: string }
) => {
  switch (action.type) {
    case "SET_STACK":
      return CATEGORIES.find(cat => cat.slug === action.stack_slug);
    case "ROUTE_TO_STACK":
      const stack = CATEGORIES.find(cat => cat.slug === action.stack_slug);
      if (stack.slug !== "") {
        Router.push(`/stack/[stackid]`, `/stack/${stack.slug}`);
      } else {
        Router.push("/", "/");
      }
      return stack;
  }
};

// Create context provider
export const StackContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, { ...INITIAL_STATE });
  const router = useRouter();
  const value = { state, dispatch };

  // Update state when user signs in
  useEffect(() => {
    if (router.pathname == "/stack/[stackid]") {
      dispatch({
        type: "SET_STACK",
        stack_slug: router.query.stackid as string
      });
    }
  }, [router.pathname]);

  return (
    <StackContext.Provider value={value}>
      {props.children}
    </StackContext.Provider>
  );
};
