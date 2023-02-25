import React from "react";
import { getWPEvents } from "../../../lib/getWPEvents/getWPEvents";
import { CalendarHeading } from "../../Calendar/CalendarHeading";
import { EventLabel } from "../../Calendar/EventLabel";
import { EventListItem, EventList } from "../../Calendar/EventList";
import { HeadingLevelBoundary, Hx } from "../../Heading/Heading";
import { BorderHeading } from "../../Heading/BorderHeading";
import { Section } from "../../Section";

export const Calendar = async () => {
  const { events, currentWeek } = await getWPEvents();

  return (
    <Section>
      <BorderHeading>Termine</BorderHeading>
      <HeadingLevelBoundary>
        {events.weekday.length > 0 ? (
          <>
            <CalendarHeading date={currentWeek.today}>
              Montage bis Donnerstag
            </CalendarHeading>
            <EventList>
              {events.weekday.map((event) => (
                <EventListItem
                  key={event.id}
                  value={event.id}
                  venue={event.venue}
                >
                  <EventLabel event={event} isWeekdayEvent />
                </EventListItem>
              ))}
            </EventList>
          </>
        ) : null}
        <CalendarHeading date={currentWeek.friday}>Freitag</CalendarHeading>
        <EventList>
          {events.friday.map((event) => (
            <EventListItem key={event.id} value={event.id} venue={event.venue}>
              <EventLabel event={event} />
            </EventListItem>
          ))}
        </EventList>

        <CalendarHeading date={currentWeek.saturday}>Samstag</CalendarHeading>
        <EventList>
          {events.saturday.map((event) => (
            <EventListItem key={event.id} value={event.id} venue={event.venue}>
              <EventLabel event={event} />
            </EventListItem>
          ))}
        </EventList>

        <CalendarHeading date={currentWeek.sunday}>Sonntag</CalendarHeading>
        <EventList>
          {events.sunday.map((event) => (
            <EventListItem key={event.id} value={event.id} venue={event.venue}>
              <EventLabel event={event} />
            </EventListItem>
          ))}
        </EventList>
      </HeadingLevelBoundary>
    </Section>
  );
};
