import { Box, BoxProps, Stack } from "@chakra-ui/layout";
import React from "react";
import { adBannerHeight, navHeight } from "../../theme/misc";
import { isObjectEmpty } from "../../utils/shared.utils";
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
  post,
  ...rest
}) => {
  return (
    <Stack
      {...rest}
      top={{ md: navHeight.base, xl: adBannerHeight }}
      pos="sticky"
      spacing={6}
    >
      {contact && !isObjectEmpty(contact) && <Contact contact={contact} />}
      {additionalInfo && !isObjectEmpty(additionalInfo) && (
        <AdditionalInfo additionalInfo={additionalInfo} />
      )}
      {downloads && !isObjectEmpty(downloads) && (
        <Downloads downloads={downloads} />
      )}
    </Stack>
  );
};
