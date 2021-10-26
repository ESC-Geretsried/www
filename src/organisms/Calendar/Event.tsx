import { AccordionButton, AccordionPanel } from "@chakra-ui/accordion";
import { Box, BoxProps } from "@chakra-ui/layout";
import { Location } from "@microsoft/microsoft-graph-types";
import dayjs from "dayjs";
import React from "react";
import { EventType } from "../../../static/functions/events";
import { useTranslation } from "../../translation/useTranslation";
import { CalenderAddress } from "./CalenderAddress";

type EventProps = {
  event: EventType;
  isWeekday?: boolean;
};

const isLocationEmpty = (location: Location) => {
  return (
    !location.displayName &&
    !location.address?.city &&
    !location.address?.street &&
    !location.address?.postalCode
  );
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
          <Box
            as="span"
            fontWeight="bold"
            transition="color 0.15s"
            _groupHover={{ color: "brand.gold" }}
          >
            {event.subject}
          </Box>
          {event.location?.address?.city && (
            <Box as="span">
              {" "}
              {adverbIn} {event.location.address.city}
            </Box>
          )}
        </Box>
        <Box>
          <Box as="span">
            {dayjs(event.start?.dateTime).format(
              isWeekday ? "ddd D.MM, HH:mm" : "HH:mm"
            )}{" "}
            {oclock}
          </Box>
        </Box>
      </AccordionButton>
      <AccordionPanel px={0}>
        {event.location && !isLocationEmpty(event.location) && (
          <CalenderAddress
            displayName={event.location.displayName}
            address={event.location.address}
            isLastChild={!Boolean(event.bodyPreview)}
          />
        )}
        {event.bodyPreview && <Box>{event.bodyPreview}</Box>}
      </AccordionPanel>
    </Box>
  );
};
