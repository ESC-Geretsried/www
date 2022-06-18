import React from "react";
// import styled from "@emotion/styled";
import LogoSVG from "../../assets/logo-small.svg";
import LogoCroppedSVG from "../../assets/logo_cropped.svg";

const Logo: React.FC<{ size?: "text" | "small" }> = ({ size = "text" }) => {
  switch (size) {
    case "text":
      return <LogoSVG />;
    case "small":
      return <LogoCroppedSVG />;
    default:
      return <LogoCroppedSVG />;
  }
};

export default Logo;
