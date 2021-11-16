import { List, ListItem } from "@chakra-ui/layout";
import React from "react";
import { Heading } from "../../atoms/Heading/Heading";

type DownloadsProps = {
  downloads: GatsbyTypes.DownloadsFragment["downloads"];
};

export const Downloads: React.FC<DownloadsProps> = ({ downloads, ...rest }) => {
  return (
    <div {...rest}>
      <Heading borders size="lg">
        Downloads
      </Heading>
      <List ps={4} listStyleType="disc" paddingBlockStart={2}>
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
