import { Box, BoxProps, Stack } from "@chakra-ui/layout";
import { StylesProvider, useMultiStyleConfig } from "@chakra-ui/system";
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
  const styles = useMultiStyleConfig("Extra", {});

  return (
    <Stack {...rest} spacing={6} sx={styles.wrapper}>
      <StylesProvider value={styles}>
        {contact && !isObjectEmpty(contact) && <Contact contact={contact} />}
        {additionalInfo && !isObjectEmpty(additionalInfo) && (
          <AdditionalInfo additionalInfo={additionalInfo} />
        )}
        {downloads && !isObjectEmpty(downloads) && (
          <Downloads downloads={downloads} />
        )}
      </StylesProvider>
    </Stack>
  );
};
