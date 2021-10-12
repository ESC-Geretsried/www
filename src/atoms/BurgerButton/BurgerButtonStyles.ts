/* !
 * Hamburgers
 * @description Tasty CSS-animated hamburgers
 * @author Jonathan Suh @jonsuh
 * @site https://jonsuh.com/hamburgers
 * @link https://github.com/jonsuh/hamburgers
 */

const config = {
  width: "30px",
  height: "24px",
  strokeWidth: "3px",
};

export const BurgerButtonStyles = {
  ".hamburger": {
    padding: 6,
    display: "inline-block",
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
      // borderRadius: 0,
      // outline: "none",
      // backgroundColor: "1px solid brand.ice",
    },
    _focus: {
      borderRadius: 0,
      outline: "none",
      backgroundColor: "1px solid brand.ice",
    },
  },
  ".hamburger.is-active": {
    _hover: {
      opacity: 0.7,
    },
  },
  ".hamburger.is-active .hamburger-inner, .hamburger.is-active .hamburger-inner::before, .hamburger.is-active .hamburger-inner::after":
    {
      backgroundColor: "brand.ice",
    },
  ".hamburger-box": {
    width: config.width,
    height: config.height,
    display: "inline-block",
    position: "relative",
  },
  ".hamburger-inner:": {
    display: "block",
    top: "50%",
    marginTop: "-2px",
  },
  ".hamburger-inner, .hamburger-inner::before, .hamburger-inner::after": {
    width: config.width,
    height: config.strokeWidth,
    backgroundColor: "brand.ice",
    position: "absolute",
    transitionProperty: "transform",
    transitionDuration: "0.15s",
    transitionTimingFunction: "ease",
  },
  ".hamburger-inner::before, .hamburger-inner::after": {
    content: "''",
    display: "block",
  },
  ".hamburger-inner": {
    _before: {
      top: "-10px",
    },
    _after: {
      bottom: "-10px",
    },
  },

  //   /*
  //    * Elastic
  //    */
  // ".hamburger--elastic .hamburger-inner": {
  //   top: "2px",
  //   transitionDuration: "0.275s",
  //   transitionTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  // },
  //   .hamburger--elastic .hamburger-inner::before {
  //     top: 10px;
  //     transition: opacity 0.125s 0.275s ease;
  //   }
  //   .hamburger--elastic .hamburger-inner::after {
  //     top: 20px;
  //     transition: transform 0.275s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  //   }

  //   .hamburger--elastic.is-active .hamburger-inner {
  //     transform: translate3d(0, 10px, 0) rotate(135deg);
  //     transition-delay: 0.075s;
  //   }
  //   .hamburger--elastic.is-active .hamburger-inner::before {
  //     transition-delay: 0s;
  //     opacity: 0;
  //   }
  //   .hamburger--elastic.is-active .hamburger-inner::after {
  //     transform: translate3d(0, -20px, 0) rotate(-270deg);
  //     transition-delay: 0.075s;
  //   }

  //   /*
  //    * Squeeze
  //    */
  ".hamburger--squeeze .hamburger-inner": {
    transitionDuration: "0.075s",
    transitionTimingFunction: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    _before: {
      transition: "top 0.075s 0.12s ease, opacity 0.075s ease",
    },
    _after: {
      transition:
        "bottom 0.075s 0.12s ease, transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    },
  },
  ".hamburger--squeeze.is-active .hamburger-inner": {
    transform: "rotate(45deg)",
    transitionDelay: "0.12s",
    transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    _before: {
      top: 0,
      opacity: 0,
      transition: "top 0.075s ease, opacity 0.075s 0.12s ease",
    },
    _after: {
      bottom: 0,
      transform: "rotate(-90deg)",
      transition:
        " bottom 0.075s ease, transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1)",
    },
  },
};
