import React, { ReactNode, useId } from "react";
import { Event } from "../../lib/getWPEvents/getWPEvents";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../Accordion/Accordion";

type EventListProps = {
  children?: ReactNode;
};

export const EventList: React.FC<EventListProps> = ({ children, ...rest }) => {
  const id = useId();

  return (
    <Accordion id={id} className="stack flex flex-col w-full" collapsible>
      {children}
    </Accordion>
  );
};

type EventListItemProps = {
  value: string;
  children?: ReactNode;
  venue: Event["venue"];
};

export const EventListItem: React.FC<EventListItemProps> = ({
  value,
  children,
  venue,
}) => {
  return (
    <AccordionItem value={value} className="w-full">
      <AccordionTrigger className="w-full text-start hover:underline">
        {children}
      </AccordionTrigger>
      <AccordionContent>
        <div>{venue?.address}</div>
        <div>
          {venue?.zip} {venue?.city}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
