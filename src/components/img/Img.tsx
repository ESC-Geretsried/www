import React from "react";
import { GatsbyImage, GatsbyImageProps, IGatsbyImageData } from "gatsby-plugin-image";

const TypedImg: React.FC<
  {
    image?: IGatsbyImageData | null;
  } & Pick<GatsbyImageProps, "alt" | "title">
> = ({ image, ...rest }) => {
  if (image === undefined || image === null) {
    return null;
  }

  return (
    <GatsbyImage
      {...rest}
      image={image}
    />
  );
};

export default TypedImg;
