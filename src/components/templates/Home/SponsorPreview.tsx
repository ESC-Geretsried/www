import React, { ReactNode } from "react";

type SponsorPreviewProps = {
  children?: ReactNode;
};

export const SponsorPreview: React.FC<SponsorPreviewProps> = ({
  children,
  ...rest
}) => {
  return <>{children}</>;
};
