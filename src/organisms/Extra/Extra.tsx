import { Box, BoxProps } from "@chakra-ui/layout";
import React from "react";
import { AdditionalInfo } from "./AdditionalInfo";
import { Contact } from "./Contact";
import { Downloads } from "./Downloads";

type ExtraProps = {
  post: any;
  contact?: GatsbyTypes.ContactFragment["contact"];
  additionalInfo?: GatsbyTypes.AdditionalInfoFragment["additionalInfo"];
  downloads?: GatsbyTypes.DownloadsFragment["downloads"];
};

export const Extra: React.FC<ExtraProps & BoxProps> = ({
  contact,
  additionalInfo,
  downloads,
  ...rest
}) => {
  return (
    <Box {...rest}>
      {contact && <Contact contact={contact} />}
      {additionalInfo && <AdditionalInfo additionalInfo={additionalInfo} />}
      {downloads && <Downloads downloads={downloads} />}
    </Box>
  );
};
