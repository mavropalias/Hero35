import React from "react";
import { storesContext } from "./index";

export const useStores = () => React.useContext(storesContext);
