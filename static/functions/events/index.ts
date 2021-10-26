import { Client } from "@microsoft/microsoft-graph-client";
import { Event } from "@microsoft/microsoft-graph-types";
import { Handler } from "@netlify/functions";
import dayjs from "dayjs";
// import { Event } from "../../../src/types";
import {
  apiConfig,
  authProvider,
  getThisWeeksMonday,
  getThisWeeksSunday,
  isWeekend,
} from "./utils";

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

const handler: Handler = async (event, context) => {
  const now = new Date();
  const mondayMorning = dayjs(getThisWeeksMonday(now))
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .toDate();

  const sundayEvening = dayjs(getThisWeeksSunday(now))
    .set("hour", 24)
    .set("minute", 60)
    .set("second", 0)
    .toDate();

  try {
    const events: { value: Array<EventType> } = await graphClient
      .api(apiConfig.uriCal)
      .select(keys as unknown as Array<string>)
      .filter(
        `start/dateTime ge '${mondayMorning.toISOString()}' and end/dateTime le '${sundayEvening.toISOString()}'`
      )
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

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: sortedEvents }),
    };
  } catch (error) {
    console.log("Graph Error: ", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: error }),
    };
  }

  // return {
  //   statusCode: 200,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ data: "works" }),
  // };
};

export { handler };
