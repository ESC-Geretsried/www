import { IconProps } from "@chakra-ui/react";
import React from "react";
import { PdfIcon, FileDownloadIcon } from "./Icons";

type FileIconProps = {
  mimeType?: string;
};

export const FileIcon: React.FC<FileIconProps & IconProps> = ({
  mimeType,
  ...rest
}) => {
  if (mimeType && mimeType.includes("pdf")) {
    return <PdfIcon {...rest} />;
  }
  return <FileDownloadIcon {...rest} />;
};
