import { Box, BoxProps, Heading, List, ListItem } from "@chakra-ui/layout";
import { Event } from "./Event";
import dayjs from "dayjs";
import React from "react";
import { useEvents } from "./useEvents";
import { useTranslation } from "../../translation/useTranslation";
import { Accordion, AccordionItem } from "@chakra-ui/accordion";

export const Calendar: React.FC<BoxProps> = (props) => {
  const { data: result, isError, isLoading, error } = useEvents();
  const [weekdays] = useTranslation("weekdays");

  return (
    <Box {...props}>
      {isLoading && <div>"loading!"</div>}
      {isError && <pre>{JSON.stringify(error)}</pre>}
      {result && (
        <div>
          {Object.entries(result?.data).map(([day, events]) => {
            console.log(day, events);
            return (
              <Box key={day}>
                <Heading
                  as="h3"
                  fontSize="1rem"
                  borderBlockEnd="2px solid"
                  borderColor="brand.ice"
                  py={2}
                >
                  {day !== "weekdays" ? dayjs(day).format("dddd") : weekdays}
                </Heading>
                <Accordion allowToggle>
                  {events.map((event) => (
                    <AccordionItem key={event.id} border="none">
                      <Event event={event} isWeekday={day === "weekdays"} />
                    </AccordionItem>
                  ))}
                </Accordion>
              </Box>
            );
          })}
        </div>
      )}
    </Box>
  );
};
