import React, { ReactNode } from "react";

type HockeyProps = {
  children?: ReactNode;
};

export const Hockey: React.FC<HockeyProps> = ({ children, ...rest }) => {
  return (
    <div id="hockey" className="text-[tomato]">
      {children}
    </div>
  );
};
