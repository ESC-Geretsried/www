import React from "react";
import styled from "@emotion/styled";
import { dimensions, colors, fonts } from "../../styles/variables";

const WPContentWrapper = styled.div`
  width: 100%;
  word-wrap: break-word;
  margin-bottom: 3em;
  overflow: visible;
  h1,
  h2 {
    font-size: ${dimensions.headingSizes.h1Smaller};
    hyphens: auto;
  }

  h3,
  h4,
  h5 {
    font-size: 1rem;
  }
  &&& .aligncenter {
    margin: 2rem auto;
  }
  &&& .gallery {
    display: none;
  }
  &&& div {
    max-width: 100% !important;
    /* width: inherit !important; */
  }

  &&& iframe {
    width: 100%;
  }

  &&& span {
    font-family: ${fonts.PTSans} !important;
    color: ${colors.gray.text} !important;
  }
  .gatsby-image-wrapper {
    margin: 2rem;

    img {
      max-width: calc(100% - 4rem);
    }
  }
  ul,
  ol {
    padding-left: 1.5em;
  }

  iframe {
    width: 100% !important;
  }

  .button {
    text-decoration: none;
    margin: 0;
    padding: 0.25em 0.75em;
    width: auto;
    overflow: visible;

    background: transparent;

    color: inherit;
    font: inherit;

    line-height: normal;

    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    -webkit-appearance: none;
    border: ${dimensions.border.size.small} solid ${colors.gray.line};
    border-radius: 0;

    &:hover {
      background: transparent;
      color: ${colors.gold};
      border-color: ${colors.gold};
    }
  }
`;

const WPContentContainer: React.FC<{ wpContent: string }> = ({ wpContent, ...rest }) => {
  return (
    <WPContentWrapper {...rest}>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: wpContent }} />
    </WPContentWrapper>
  );
};

export default WPContentContainer;
