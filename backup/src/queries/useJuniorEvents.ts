import { useQuery } from "react-query";
import { addMonths, isFuture } from "date-fns";
import { getDateFromCalendarDateDetails } from "../utils/dateUtils";
import { EventType } from "./useEvents";

const getJuniorEvents = async ({ queryKey }: { queryKey: Array<string | { division: string }> }) => {
  const keyWithDivision = queryKey.find(
    (key) => Object.prototype.hasOwnProperty.call(key, "division") && typeof key !== "string",
  ) as {
    division: string;
  };
  const division = keyWithDivision.division;
  const url = new URL("https://backend.esc-geretsried.de/wp-json/tribe/events/v1/events");

  url.search = new URLSearchParams({
    categories: division,
    start_date: addMonths(new Date(), -6).toISOString(),
    per_page: "200",
  }).toString();

  const response = await fetch(url.toString());
  const data = await response.json();
  const games = (data.events as Array<EventType>).filter((event) =>
    event.categories.find((category) => category.slug === "game"),
  );

  return {
    events: games,
    futureEvents: games.filter((event) => isFuture(getDateFromCalendarDateDetails(event.start_date_details))),
  };
};

export const useJuniorEvents = (division: string) => {
  return useQuery(["juniorEvents", { division }], getJuniorEvents);
};
