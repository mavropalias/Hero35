import { createContext } from "react";
import { UserStore } from "./UserStore";
import { useStaticRendering } from "mobx-react-lite";

const isServer = typeof window === "undefined";
useStaticRendering(isServer);

export const storesContext = createContext({
  userStore: new UserStore()
});
