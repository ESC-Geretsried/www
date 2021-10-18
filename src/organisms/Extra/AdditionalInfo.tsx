import React from "react";
import { Heading } from "../../atoms/Heading/Heading";
import { WPContent } from "../../atoms/WPContent/WPContent";

type AdditionalInfoProps = {
  additionalInfo: GatsbyTypes.AdditionalInfoFragment["additionalInfo"];
};

export const AdditionalInfo: React.FC<AdditionalInfoProps> = ({
  additionalInfo,
  ...rest
}) => {
  return (
    <div {...rest}>
      <Heading as="h3" borders>
        {additionalInfo?.title}
      </Heading>
      <WPContent content={additionalInfo?.content ?? ""} />
    </div>
  );
};
