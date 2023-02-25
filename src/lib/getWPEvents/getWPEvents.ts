import { isFriday, isWeekend } from "date-fns";
import { env } from "../env";
import {
  getDateFromCalendarDateDetails,
  getThisWeeksFriday,
  getThisWeeksMonday,
  getThisWeeksSaturday,
  getThisWeeksSunday,
} from "./date.utils";

type WPEvent = {
  id: number;
  categories: Array<{ slug: string; name: string }>;
  start_date_details: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minutes: string;
    seconds: string;
  };
  end_date_details: {
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

export type Event = {
  id: string;
  title: string;
  categories: Array<string>;
  startDate: Date;
  endDate: Date;
  venue: {
    city: string | null;
    address: string | null;
    zip: string | null;
  } | null;
};

export const getWPEvents = async () => {
  const url = new URL(env.EVENT_URL);

  url.search = new URLSearchParams({
    start_date: getThisWeeksMonday(new Date()).toISOString(),
    end_date: getThisWeeksSunday(new Date()).toISOString(),
  }).toString();

  const response = await fetch(url.toString());
  const json = (await response.json()) as { events: Array<WPEvent> };

  const events = json.events.map(convertWPEventToEvent);

  const today = new Date();

  const friday = getThisWeeksFriday(today);
  const saturday = getThisWeeksSaturday(today);
  const sunday = getThisWeeksSunday(today);

  const fridayEvents = events.filter(
    (event) => friday.getDate() === event.startDate.getDate()
  );
  const saturdayEvents = events.filter(
    (event) => saturday.getDate() === event.startDate.getDate()
  );
  const sundayEvents = events.filter(
    (event) => sunday.getDate() === event.startDate.getDate()
  );
  const weekdayEvents = events.filter((event) => {
    return !isWeekend(event.startDate) && !isFriday(event.startDate);
  });

  return {
    currentWeek: {
      today,
      friday,
      saturday,
      sunday,
    },
    events: {
      weekday: weekdayEvents,
      friday: fridayEvents,
      saturday: saturdayEvents,
      sunday: sundayEvents,
    },
  };
};

const convertWPEventToEvent = (event: WPEvent): Event => {
  let venue = null;

  if (event.venue.address || event.venue.city || event.venue.zip) {
    venue = {
      address: event.venue.address ?? null,
      city: event.venue.city ?? null,
      zip: event.venue.zip ?? null,
    };
  }

  return {
    id: event.id.toString(),
    title: event.title,
    categories: event.categories.map((category) => category.slug),
    startDate: getDateFromCalendarDateDetails(event.start_date_details),
    endDate: getDateFromCalendarDateDetails(event.end_date_details),
    venue,
  };
};
