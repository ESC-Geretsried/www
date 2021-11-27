import { AccordionButton, AccordionPanel } from "@chakra-ui/accordion";
import { Box, BoxProps } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/react";
import { Location } from "@microsoft/microsoft-graph-types";
import dayjs from "dayjs";
import React from "react";
import { EventType } from "../../../static/functions/events";
import { useTranslation } from "../../translation/useTranslation";
import { MakePropRequired } from "../../types";
import { HeadingLevelBoundary, Hx } from "../headings";
import { CalenderAddress } from "./CalenderAddress";

type EventProps = {
  event: EventType;
  isWeekday?: boolean;
};

export const Event: React.FC<EventProps> = ({ event, isWeekday = false }) => {
  const [oclock, adverbIn, address] = useTranslation(["oclock", "adverbIn"]);

  return (
    <HeadingLevelBoundary>
      <AccordionButton
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        textAlign="left"
        px={0}
        transition="transform 0.15s"
        _focus={{ outline: "none" }}
        _focusVisible={{ boxShadow: "outline" }}
        _hover={{ transform: "scale(1.01)" }}
        role="group"
      >
        <Box maxW="68%" paddingInlineEnd={2}>
          <Hx
            variant="h6"
            transition="color 0.15s"
            _groupHover={{ color: "brand.gold" }}
          >
            {event.subject}
          </Hx>
          {event.location?.address?.city && (
            <chakra.span>
              {" "}
              {adverbIn} {event.location.address.city}
            </chakra.span>
          )}
        </Box>
        <Box>
          <chakra.span>
            {dayjs(event.start?.dateTime).format(
              isWeekday ? "ddd D.MM, HH:mm" : "HH:mm"
            )}{" "}
            {oclock}
          </chakra.span>
        </Box>
      </AccordionButton>
      {showPanel(event) && (
        <AccordionPanel px={0}>
          {event.location && !isLocationEmpty(event.location) && (
            <CalenderAddress
              displayName={event.location.displayName}
              address={event.location.address}
              isLastChild={!Boolean(event.bodyPreview)}
            />
          )}
          {event.bodyPreview && event.bodyPreview !== "" && (
            <Box>{event.bodyPreview}</Box>
          )}
        </AccordionPanel>
      )}
    </HeadingLevelBoundary>
  );
};

const isLocationEmpty = (location: Location) => {
  return (
    !location.displayName &&
    !location.address?.city &&
    !location.address?.street &&
    !location.address?.postalCode
  );
};

const showPanel = (event: EventType) =>
  (event.bodyPreview !== undefined && event.bodyPreview !== "") ||
  (event.location && !isLocationEmpty(event.location));
