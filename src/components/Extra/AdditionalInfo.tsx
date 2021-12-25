import { useStyles } from "@chakra-ui/system";
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
  const styles = useStyles();

  return (
    <div {...rest}>
      <Heading borders size="h3" sx={styles.heading}>
        {additionalInfo?.title}
      </Heading>
      <WPContent content={additionalInfo?.content ?? ""} marginBlockEnd={0} />
    </div>
  );
};
