import React, { ReactNode } from "react";
import { Hx } from "../../Heading/Heading";

type SectionProps = {
  children?: ReactNode;
};

export const Section: React.FC<SectionProps> = ({ children }) => {
  return (
    <section className="flex items-start flex-col stack">{children}</section>
  );
};

export const Heading: React.FC<SectionProps> = ({ children }) => {
  return <Hx className="text-3xl py-2 border-y-2 ">{children}</Hx>;
};
