import React, { useMemo } from "react";
import { css } from "@emotion/react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useEvents } from "../../queries/useEvents";
import { colors, dimensions } from "../../styles/variables";
import {
  getThisWeeksFriday,
  getDateFromCalendarDateDetails,
  getThisWeeksSaturday,
  getThisWeeksSunday,
} from "../../utils/dateUtils";
import EventDayHeader from "../eventDayHeader/EventDayHeader";
import EventList from "../eventList/EventList";
import H1 from "../h1/H1";

const borderBottomStyle = css`
  &&& {
    padding-bottom: 2em;
    border-radius: 0;
    border-bottom: ${dimensions.border.size.small} solid ${colors.gray.line};
  }
`;

const Calender: React.FC = () => {
  const { data: allEvents, isLoading: eventsLoading } = useEvents();

  const today = useMemo(() => new Date(), []);
  const { events, weekdayEvents } = allEvents ?? { events: [], weekdayEvents: [] };

  return (
    <>
      <H1 title="Termine" size="section" />
      {eventsLoading ? (
        <div
          css={css`
            width: 100%;
            text-align: center;
          `}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50, color: colors.gold }} spin />} />
        </div>
      ) : (
        <>
          {Array.isArray(weekdayEvents) && weekdayEvents.length > 0 && (
            <>
              <EventDayHeader date={today} isWeekdayHeader />
              <EventList events={weekdayEvents} css={borderBottomStyle} isWeekdayList />
            </>
          )}
          <EventDayHeader date={getThisWeeksFriday(today)} />
          <EventList
            events={events.filter(
              (event) =>
                getThisWeeksFriday(today).getDate() ===
                getDateFromCalendarDateDetails(event.start_date_details).getDate(),
            )}
            css={borderBottomStyle}
          />
          <EventDayHeader date={getThisWeeksSaturday(today)} />
          <EventList
            events={events.filter(
              (event) =>
                getThisWeeksSaturday(today).getDate() ===
                getDateFromCalendarDateDetails(event.start_date_details).getDate(),
            )}
            css={borderBottomStyle}
          />
          <EventDayHeader date={getThisWeeksSunday(today)} />
          <EventList
            events={events.filter(
              (event) =>
                getThisWeeksSunday(today).getDate() ===
                getDateFromCalendarDateDetails(event.start_date_details).getDate(),
            )}
          />
        </>
      )}
    </>
  );
};

export default Calender;
