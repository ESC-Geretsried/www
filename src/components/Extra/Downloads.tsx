import {
  HStack,
  LinkBox,
  LinkOverlay,
  List,
  ListItem,
} from "@chakra-ui/layout";
import { chakra, useStyles } from "@chakra-ui/system";
import React from "react";
import { FileIcon } from "../../atoms/FileIcon";
import { Heading } from "../../atoms/Heading/Heading";
import { PdfIcon } from "../../atoms/Icons";

type DownloadsProps = {
  downloads: GatsbyTypes.DownloadsFragment["downloads"];
};

export const Downloads: React.FC<DownloadsProps> = ({ downloads, ...rest }) => {
  const styles = useStyles();

  return (
    <div {...rest}>
      <Heading borders size="h3" sx={styles.heading}>
        Downloads
      </Heading>
      <List variant="downloads">
        {downloads?.map((download) => (
          <ListItem as={LinkBox} key={download?.file?.title}>
            <LinkOverlay
              color="white"
              as="a"
              href={download?.file?.mediaItemUrl}
              download
            >
              {download?.file?.title}
            </LinkOverlay>
            <FileIcon mimeType={download?.file?.mimeType} ml={2} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
