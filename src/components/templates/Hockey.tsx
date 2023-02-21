import React, { ReactNode } from "react";

type HockeyProps = {
  children?: ReactNode;
};

export const Hockey: React.FC<HockeyProps> = ({ children, ...rest }) => {
  console.log("hockey");

  return (
    <div id="hockey" className="text-[tomato]">
      {children}
    </div>
  );
};
