import React from "react";
import styled from "@emotion/styled";
import { dimensions, mq } from "../../styles/variables";
import TypedImg from "../img/Img";
import { ImageSharpFluid } from "../../../graphql-types";

const Wrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
  ${mq[4]} {
    grid-column: 2 / span 8;
    margin-bottom: 8rem;
  }
  .gatsby-image-wrapper {
    margin: 0 -${dimensions.containerPadding}em;
    width: 100vw;
    height: auto;
    ${mq[4]} {
      width: 100%;
      margin: 0;
    }
  }
`;

const FeatureImg: React.FC<{
  img?: {
    fluid?:
      | Pick<ImageSharpFluid, "sizes" | "aspectRatio" | "src" | "srcSet" | "tracedSVG" | "srcWebp" | "srcSetWebp">
      | undefined
      | null;
  };
  alt: string;
  title: string;
}> = ({ alt, title, img, ...rest }) => {
  if (!img?.fluid) {
    return null;
  }

  return (
    <Wrapper {...rest}>
      <TypedImg fluid={img.fluid} alt={alt} title={title} />
    </Wrapper>
  );
};

export default FeatureImg;
