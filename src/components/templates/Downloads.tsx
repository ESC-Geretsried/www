import React, { ReactNode } from "react";

type DownloadsProps = {
  children?: ReactNode;
};

export const Downloads: React.FC<DownloadsProps> = ({ children, ...rest }) => {
  return (
    <div id="downloads" className="text-[tomato]">
      {children}
    </div>
  );
};
