import { Accordion, AccordionItem } from "@chakra-ui/accordion";
import { Box, BoxProps, Heading } from "@chakra-ui/layout";
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";
import React, { memo } from "react";
import { useTranslation } from "../../translation/useTranslation";
import { formatDate, isObjectEmpty } from "../../utils/shared.utils";
import { HeadingLevelBoundary, Hx } from "../headings";
import { Event } from "./Event";
import { useEvents } from "./useEvents";
const LoadingSkeleton = () => {
  return (
    <>
      <Skeleton>
        <Heading>Heading</Heading>
      </Skeleton>
      <SkeletonText noOfLines={4} spacing="4" mt={4} />
    </>
  );
};

export const Calendar: React.FC<BoxProps> = memo((props) => {
  const { data: result, isError, isLoading, error } = useEvents();
  const [weekdays] = useTranslation("weekdays");

  if (window === undefined) {
    return null;
  }

  return (
    <HeadingLevelBoundary>
      <Box {...props}>
        {isLoading && <LoadingSkeleton />}
        {isError && <pre>{JSON.stringify(error, null, 4)}</pre>}
        {result && !isObjectEmpty(result?.data) && (
          <div>
            {Object.entries(result.data).map(([day, events]) => {
              return (
                <Box key={day}>
                  <Hx variant="Calendar">
                    {day !== "weekdays" ? formatDate(day, "dddd") : weekdays}
                  </Hx>
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
    </HeadingLevelBoundary>
  );
});
