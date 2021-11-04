import { useQuery } from "react-query";
import { EventType } from "../../../static/functions/events/";

const getEvents = async () => {
  const url = new URL(
    process.env.GATSBY_SITE_URL + "/.netlify/functions/events"
  );

  // url.search = new URLSearchParams({
  //   start_date: getThisWeeksMonday(new Date()).toISOString(),
  //   end_date: getThisWeeksSunday(new Date()).toISOString(),
  // }).toString();

  const response = await fetch(url.toString());
  const json = (await response.json()) as {
    data: { [key: string]: Array<EventType> };
  };

  return {
    ...json,
  };
};

export const useEvents = () => {
  return useQuery("calenderEvents", getEvents);
};
