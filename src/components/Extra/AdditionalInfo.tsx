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
      <Heading borders size="lg">
        {additionalInfo?.title}
      </Heading>
      <WPContent content={additionalInfo?.content ?? ""} marginBlockEnd={0} />
    </div>
  );
};
