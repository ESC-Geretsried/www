import React, { ReactNode } from "react";

type StandardProps = {
  children?: ReactNode;
};

export const Standard: React.FC<StandardProps> = ({ children, ...rest }) => {
  console.log("standard");

  return (
    <div id="standard" className="text-[lime]">
      {children}
    </div>
  );
};
