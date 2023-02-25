import { ReactNode } from "react";

type SectionProps = {
  children?: ReactNode;
};

export const Section: React.FC<SectionProps> = ({ children }) => {
  return (
    <section className="flex items-start flex-col stack">{children}</section>
  );
};
