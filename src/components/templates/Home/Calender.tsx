import React, { ReactNode } from "react";

type CalenderProps = {
  children?: ReactNode;
};

export const Calender: React.FC<CalenderProps> = ({ children, ...rest }) => {
  return <>{children}</>;
};
