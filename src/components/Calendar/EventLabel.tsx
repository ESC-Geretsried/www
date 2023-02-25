import React, { ReactNode } from "react";
import { Event } from "../../lib/getWPEvents/getWPEvents";

type EventLabelProps = {
  event: Event;
  isWeekdayEvent?: boolean;
};

export const EventLabel: React.FC<EventLabelProps> = ({
  event,
  isWeekdayEvent,
}) => {
  return (
    <div className="flex justify-between">
      <div>
        <strong>{event.title}</strong>
        <span> in {event.venue?.city}</span>
      </div>
      <span className="ml-auto mr-0 whitespace-nowrap">
        {event.startDate.toLocaleString(["de-DE"], {
          month: isWeekdayEvent ? "numeric" : undefined,
          day: isWeekdayEvent ? "numeric" : undefined,
          year: isWeekdayEvent ? "2-digit" : undefined,
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        Uhr
      </span>
    </div>
  );
};
