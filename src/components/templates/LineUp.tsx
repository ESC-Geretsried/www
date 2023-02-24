import React, { ReactNode } from "react";

type StandardProps = {
  children?: ReactNode;
};

export const Linup: React.FC<StandardProps> = ({ children, ...rest }) => {
  return (
    <div id="linup" className="text-[lime]">
      {children}
    </div>
  );
};
