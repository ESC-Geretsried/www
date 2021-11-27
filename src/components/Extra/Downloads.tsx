import { List, ListItem } from "@chakra-ui/layout";
import { useStyles } from "@chakra-ui/system";
import React from "react";
import { Heading } from "../../atoms/Heading/Heading";

type DownloadsProps = {
  downloads: GatsbyTypes.DownloadsFragment["downloads"];
};

export const Downloads: React.FC<DownloadsProps> = ({ downloads, ...rest }) => {
  const styles = useStyles();

  return (
    <div {...rest}>
      <Heading borders size="lg" sx={styles.heading}>
        Downloads
      </Heading>
      <List variant="downloads">
        {downloads?.map((download) => (
          <ListItem key={download?.file?.title}>
            <a href={download?.file?.mediaItemUrl} download>
              {download?.file?.title}
            </a>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
