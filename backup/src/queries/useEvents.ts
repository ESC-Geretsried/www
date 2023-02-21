import { isFriday, isWeekend } from "date-fns";
import { useQuery } from "react-query";
import { getDateFromCalendarDateDetails, getThisWeeksMonday, getThisWeeksSunday } from "../utils/dateUtils";

export type EventType = {
  id: number;
  categories: Array<{ slug: string }>;
  start_date: string;
  start_date_details: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minutes: string;
    seconds: string;
  };
  end_date: string;
  end: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minutes: string;
    seconds: string;
  };
  venue: { city?: string; address?: string; zip?: string };
  title: string;
};

const getEvents = async () => {
  const url = new URL("https://backend.esc-geretsried.de/wp-json/tribe/events/v1/events");

  url.search = new URLSearchParams({
    start_date: getThisWeeksMonday(new Date()).toISOString(),
    end_date: getThisWeeksSunday(new Date()).toISOString(),
  }).toString();

  const response = await fetch(url.toString());
  const json = await response.json();

  return {
    events: json.events as Array<EventType>,
    weekdayEvents: json.events.filter((event: EventType) => {
      const startDate = getDateFromCalendarDateDetails(event.start_date_details);

      return !isWeekend(startDate) && !isFriday(startDate);
    }) as Array<EventType>,
  };
};

export const useEvents = () => {
  return useQuery(["events"], getEvents);
};
