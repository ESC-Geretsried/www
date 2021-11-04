import React from "react";

type DownloadsProps = {
  downloads: GatsbyTypes.DownloadsFragment["downloads"];
};

export const Downloads: React.FC<DownloadsProps> = ({ downloads, ...rest }) => {
  return (
    <div {...rest}>{downloads?.map((download) => download?.file?.title)}</div>
  );
};
