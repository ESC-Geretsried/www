export const colors = {
  // mint: "#46e1c8",
  // sea: "#CAF6EF",
  // foam: "#F6FEFC",
  // rust: "#C05B36",
  // beige: "#FBF9F8",
  // ice: "#F5F5FF",
  // blueberry: "#3026A4",
  // moonRaker: "#CBCAF7",
  // nightSky: "#1E1868",
  blue: "#223550",
  gold: "#A8803B",

  gray: {
    line: "rgba(255, 255, 255, 0.87)",
    text: "rgba(255, 255, 255, 0.87)",
    transparent: "rgba(255, 255, 255, 0.5)",
    dark: "#6B6B6B",
  },
  white: "#fff",
  almostBlack: "#0B0B0B",
  rgba: {
    ice: "rgba(255, 255, 255, 0.87)",
  },
};

export const fonts = {
  rubikBold:
    '"Rubik Bold", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif',
  rubikBoldItalic:
    '"Rubik Bold Italic", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif',
  PTSans:
    '"PT Sans Regular", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif',
  PTSansBold:
    '"PT Sans Bold", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif',
  mono: '"Silka Mono", SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
  // adelphi:
  //   '"Adelphi VF", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif',
};

export const shadows = {
  light: "0px 0px 35px rgba(0, 0, 0, 0.05)",
};

export const breakpoints = {
  xs: 330,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1450,
};

export const mq = Object.values(breakpoints).map((bp) => `@media (min-width: ${bp}px)`);

export const widths = {
  md: 720,
  lg: 960,
  xl: 1140,
  xxl: 1400,
};

export const grid = {
  gap: "1.5rem",
  gapBig: "4rem",
};

export const dimensions = {
  fontSize: {
    regular: 14, // px
  },
  headingSizes: {
    h1: "3.6rem",
    h1Smaller: "2.2rem",
    h2: "1.6rem",
    h3: "1.3rem",
    h4: "1rem",
    h5: "1rem",
  },
  menuItem: {
    height: "32px",
  },
  lineHeight: {
    regular: "150%",
    heading: 1.2, // tbd oder 106%/99px?
    h1: "106%",
    h2: "112%",
    h3: "130%",
    h4: "135%",
    h5: "130%",
    hAddOn: "108%",
    paragraph: "140%",
    pBlog: "125%",
    intro: "160%",
    button: "143.5%" /* or 29px or 32px */,
    quote: "150%" /* or 69px */,
  },
  fontWeight: {
    bold: 900,
  },
  letterSpacing: {
    default: "0.015em",
    intro: "-0.01em",
    link: "0.1em",
    h1: "0.0em",
    wide: "0.08em",
    hAddOn: "0.14em",
  },
  containerPadding: 1.5,
  header: {
    height: "70px",
  },
  border: {
    size: { small: "2px", normal: "3px", big: "5px" },
  },
};

export const heights = {
  header: 60,
};
