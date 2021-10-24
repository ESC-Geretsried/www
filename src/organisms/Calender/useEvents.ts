import { useQuery } from "react-query";
import { Event } from "../../types";

const getEvents = async () => {
  const url = new URL(process.env.SITE_URL + "/.netlify/functions/events");

  // url.search = new URLSearchParams({
  //   start_date: getThisWeeksMonday(new Date()).toISOString(),
  //   end_date: getThisWeeksSunday(new Date()).toISOString(),
  // }).toString();

  const response = await fetch(url.toString());
  const json = (await response.json()) as { data: Array<Event> };

  console.log(json.data);
  return {
    ...json,
  };
};

export const useEvents = () => {
  return useQuery("calenderEvents", getEvents);
};
