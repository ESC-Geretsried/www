import { AccordionButton, AccordionPanel } from "@chakra-ui/accordion";
import { Box, BoxProps } from "@chakra-ui/layout";
import { Location } from "@microsoft/microsoft-graph-types";
import dayjs from "dayjs";
import React from "react";
import { EventType } from "../../../static/functions/events";
import { Span } from "../../atoms/Span";
import { useTranslation } from "../../translation/useTranslation";
import { MakePropRequired } from "../../types";
import { CalenderAddress } from "./CalenderAddress";

type EventProps = {
  event: EventType;
  isWeekday?: boolean;
};

export const Event: React.FC<EventProps & BoxProps> = ({
  event,
  isWeekday = false,
  ...rest
}) => {
  const [oclock, adverbIn, address] = useTranslation(["oclock", "adverbIn"]);

  return (
    <Box {...rest}>
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
          <Span
            fontWeight="bold"
            transition="color 0.15s"
            _groupHover={{ color: "brand.gold" }}
          >
            {event.subject}
          </Span>
          {event.location?.address?.city && (
            <Span>
              {" "}
              {adverbIn} {event.location.address.city}
            </Span>
          )}
        </Box>
        <Box>
          <Span>
            {dayjs(event.start?.dateTime).format(
              isWeekday ? "ddd D.MM, HH:mm" : "HH:mm"
            )}{" "}
            {oclock}
          </Span>
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
    </Box>
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
