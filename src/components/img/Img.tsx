import React from "react";
import Img, { GatsbyImageProps } from "gatsby-image";
import { ImageSharpFluid, ImageSharpFixed } from "../../../graphql-types";

const TypedImg: React.FC<
  {
    fixed?: ImageSharpFixed | null;
    fluid?: Pick<
      ImageSharpFluid,
      "sizes" | "aspectRatio" | "src" | "srcSet" | "tracedSVG" | "srcWebp" | "srcSetWebp"
    > | null;
  } & Pick<GatsbyImageProps, "alt" | "title">
> = ({ fluid, fixed, ...rest }) => {
  if (fluid === undefined || fluid === null) {
    return null;
  }

  return (
    <Img
      {...rest}
      fluid={{
        ...fluid,
        tracedSVG: fluid.tracedSVG ?? undefined,
        srcSetWebp: fluid.srcSetWebp ?? undefined,
        srcWebp: fluid.srcWebp ?? undefined,
      }}
    />
  );
};

export default TypedImg;
