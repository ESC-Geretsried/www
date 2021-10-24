import { Box, BoxProps } from "@chakra-ui/layout";
import React from "react";
import { useEvents } from "./useEvents";

export const Calender: React.FC<BoxProps> = (props) => {
  const { data: result, isError, isLoading, error } = useEvents();

  return (
    <Box {...props}>
      {isLoading && <div>"loading!"</div>}
      {isError && <pre>{JSON.stringify(error)}</pre>}
      {result && (
        <ul>
          {result?.data.value.map((event: any) => {
            return <li key={event.id}>{event.subject}</li>;
          })}
        </ul>
      )}
    </Box>
  );
};
