import { css } from "@emotion/react";
import { dimensions, fonts, colors, breakpoints } from "./variables";
import { getEmSize } from "./mixins";

export default css`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  *::-moz-selection,
  *::selection {
    background-color: ${colors.gray.text};
  }
  html {
    font-size: ${dimensions.fontSize.regular}px !important;
    line-height: ${dimensions.lineHeight.regular} !important;
  }

  body {
    width: 100%;
    height: auto;
    overflow-x: hidden;
    overflow-y: scroll;
    font-family: ${fonts.PTSans};
    font-size: ${dimensions.fontSize.regular}px !important;
    letter-spacing: ${dimensions.letterSpacing.default};
    color: ${colors.gray.text};
    background-color: ${colors.blue};
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  code {
    font-family: ${fonts.mono};
  }

  a {
    color: ${colors.gray.text};
    text-decoration: underline;
    position: relative;
    text-decoration-thickness: 0.125em;
    text-underline-offset: 4px;

    &:hover,
    &:focus {
      text-decoration: underline;
      color: ${colors.gold} !important;
      border-color: ${colors.gold};
    }
    transition: 0.3s all;
  }

  img {
    max-width: 100%;
    object-fit: contain;
    position: relative;
  }

  figure {
    margin: 2rem 0;
  }

  figcaption {
    font-size: 80%;
  }

  table {
    width: 100%;
    margin-bottom: 1rem;
    border: 1px solid ${colors.gray.line};
    font-size: 85%;
    border-collapse: collapse;
  }

  td,
  th {
    padding: 0.25rem 0.5rem;
    border: 1px solid ${colors.gray.line};
  }

  th {
    text-align: left;
  }

  tbody {
    tr {
      &:nth-of-type(odd) {
        td {
          background-color: ${colors.gray.line};
        }
        tr {
          background-color: ${colors.gray.line};
        }
      }
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.5rem; //mal sehen?
    margin-bottom: 0.5rem; // mal sehen
    font-family: ${fonts.rubikBoldItalic};
    color: ${colors.gray.text};
    font-weight: 900;
    line-height: ${dimensions.lineHeight.heading};
    text-rendering: optimizeLegibility;
  }

  h1 {
    margin-top: 0;
    font-size: ${dimensions.headingSizes.h1};
    letter-spacing: ${dimensions.letterSpacing.h1};
    line-height: ${dimensions.lineHeight.h1};
  }

  h2 {
    font-size: ${dimensions.headingSizes.h2};
    line-height: ${dimensions.lineHeight.h2};
  }

  h3 {
    font-size: ${dimensions.headingSizes.h3};
    line-height: ${dimensions.lineHeight.h3};
  }

  h4 {
    font-size: ${dimensions.headingSizes.h4};
    line-height: ${dimensions.lineHeight.h4};
  }

  h5,
  h6 {
    font-size: ${dimensions.headingSizes.h5};
    line-height: ${dimensions.lineHeight.h5};
    letter-spacing: ${dimensions.letterSpacing.wide};
    text-transform: uppercase;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  strong {
    font-family: ${fonts.PTSansBold};
    color: ${colors.gray.text};
    font-weight: 900;
  }

  ul,
  ol,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  dt {
    font-weight: bold;
  }

  dd {
    margin-bottom: 0.5rem;
  }

  hr {
    position: relative;
    margin: 1.5rem 0;
    border: 0;
    border-top: 1px solid ${colors.gray.line};
  }

  blockquote {
    margin: 0.8rem 0;
    padding: 0.5rem 1rem;
    border-left: 0.25rem solid ${colors.gray.line};
    color: ${colors.gray.text};

    p {
      &:last-child {
        margin-bottom: 0;
      }
    }

    @media (min-width: ${getEmSize(breakpoints.md)}em) {
      padding-right: 5rem;
      padding-left: 1.25rem;
    }
  }
`;
