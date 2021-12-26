import "../../utils/fetch.utils";
import { Client } from "@microsoft/microsoft-graph-client";
import { Event } from "@microsoft/microsoft-graph-types";
import dayjs from "dayjs";
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import {
  apiConfig,
  authProvider,
  getThisWeeksMonday,
  getThisWeeksSunday,
  isWeekend,
} from "../../utils/function.utils";
require("dotenv").config();

export const graphClient = Client.init({
  authProvider,
});

const keys = [
  "id",
  "subject",
  "body",
  "bodyPreview",
  "categories",
  "start",
  "end",
  "location",
] as const;

type Keys = typeof keys[number];
export type EventType = Pick<Event, Keys>;

export default async function events(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const now = new Date();
  const mondayMorning = dayjs(getThisWeeksMonday(now))
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0)
    .toDate();

  const sundayEvening = dayjs(getThisWeeksSunday(now))
    .set("hour", 24)
    .set("minute", 60)
    .set("second", 0)
    .set("millisecond", 0)
    .toDate();

  try {
    const events: { value: Array<EventType> } = await graphClient
      .api(apiConfig.uriCal)
      .query({
        startDateTime: mondayMorning.toISOString(),
        endDateTime: sundayEvening.toISOString(),
      })
      .select(keys as unknown as Array<string>)
      .get();

    const sortedEvents = events.value
      .filter((event) => event.subject)
      .reduce((prev, curr) => {
        const startDate = dayjs(curr.start?.dateTime);
        const weekday = isWeekend(startDate.toDate())
          ? startDate.format("YYYY-MM-DD").toLowerCase()
          : "weekdays";

        if (Array.isArray(prev[weekday])) {
          prev[weekday].push(curr);

          return prev;
        }

        prev[weekday] = [curr];

        return prev;
      }, {} as { [key: string]: Array<EventType> });

    if (Object.keys(sortedEvents).length === 0) {
      throw new Error("No events found");
    }

    res.status(200).json({ data: sortedEvents, error: null });
    return;
  } catch (error) {
    console.log("Graph Error: ", error);

    res.status(200).json({ data: null, error });
    return;
  }
}
