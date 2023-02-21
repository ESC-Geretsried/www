import React from "react";
import { Global } from "@emotion/react";
import normalize from "./normalize";
import "antd/dist/antd.dark.css";

export const GlobalStyles: React.FC = () => {
  return <Global styles={normalize} />;
};
