import React, { ReactNode } from "react";
import { Hx } from "../Heading/Heading";

type CalendarHeadingProps = {
  date: Date;
  children: string;
};

export const CalendarHeading: React.FC<CalendarHeadingProps> = ({
  date,
  children,
}) => {
  return (
    <Hx className="flex justify-between w-full border-b-2 pb-2">
      <span>{children}</span>
      <span>
        {date.toLocaleDateString(["de-DE"], {
          day: "numeric",
          month: "numeric",
          year: "2-digit",
        })}
      </span>
    </Hx>
  );
};
