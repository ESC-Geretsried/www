/* !
 * Hamburgers
 * @description Tasty CSS-animated hamburgers
 * @author Jonathan Suh @jonsuh
 * @site https://jonsuh.com/hamburgers
 * @link https://github.com/jonsuh/hamburgers
 */

import { ComponentMultiStyleConfig } from "@chakra-ui/theme";

const config = {
  width: "30px",
  height: "24px",
  strokeWidth: "3px",
};

const HamburgerLine = {
  display: "block",
  width: config.width,
  height: config.strokeWidth,
  backgroundColor: "brand.ice",
  position: "absolute",
};

export const BurgerButtonStyles: ComponentMultiStyleConfig = {
  parts: ["Hamburger", "HamburgerInner", "HamburgerBox"],
  baseStyle: {
    Hamburger: {
      padding: 6,
      display: "flex",
      cursor: "pointer",
      transitionProperty: "opacity, filter",
      transitionDuration: "0.15s",
      transitionTimingFunction: "linear",
      font: "inherit",
      color: "inherit",
      textTransform: "none",
      backgroundColor: "transparent",
      border: 0,
      margin: 0,
      overflow: "visible",
      _hover: {
        opacity: 0.7,
      },
      _focus: {
        borderRadius: 0,
        outline: "none",
        backgroundColor: "none",
      },
    },
    HamburgerInner: {
      ...HamburgerLine,
      top: "50%",
      marginTop: "-2px",
      transitionProperty: "transform",
      transitionDuration: "0.075s",
      transitionTimingFunction: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
      _before: {
        ...HamburgerLine,
        content: "''",
        top: "-10px",
        transition: "top 0.075s 0.12s ease, opacity 0.075s ease",
      },
      _after: {
        ...HamburgerLine,
        content: "''",
        bottom: "-10px",
        transition:
          "bottom 0.075s 0.12s ease, transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19)",
      },

      ".is-active &": {
        backgroundColor: "brand.ice",
        transform: "rotate(45deg)",
        transitionDelay: "0.12s",
        transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        _before: {
          backgroundColor: "brand.ice",
          top: 0,
          opacity: 0,
          transition: "top 0.075s ease, opacity 0.075s 0.12s ease",
        },
        _after: {
          backgroundColor: "brand.ice",
          bottom: 0,
          transform: "rotate(-90deg)",
          transition:
            " bottom 0.075s ease, transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1)",
        },
      },
    },
    HamburgerBox: {
      width: config.width,
      height: config.height,
      display: "inline-block",
      position: "relative",
    },
  },
};
