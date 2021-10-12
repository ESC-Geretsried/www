import { createContext } from "react";
import { GatsbyPageContext } from "./types";

export const PageContext = createContext<GatsbyPageContext>({
  id: "",
  pathname: "/",
  title: "home",
});
