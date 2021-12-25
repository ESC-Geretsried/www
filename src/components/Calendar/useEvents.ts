import { useQuery } from "react-query";
import { EventType } from "../../api/events/";

const getEvents = async () => {
  const url = new URL(window.location.origin + "/api/events");

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
