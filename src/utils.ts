import { useToken } from "@chakra-ui/system";
import { containerWidths } from "./theme";
import { BreakpointNames, BreakpointObject } from "./types";

export const removeUnit = (value: string, unit: string) => {
  return value.slice(0, value.length - unit.length);
};

export const calcColumnWidths = (
  columns: number,
  { excludeBPs }: { excludeBPs: Array<BreakpointNames> }
) => {
  return Object.entries(containerWidths)
    .filter(([key]) => !excludeBPs.includes(key as BreakpointNames))
    .reduce((prev, curr) => {
      const [key, value] = curr as [
        BreakpointNames,
        BreakpointObject[BreakpointNames]
      ];
      const valueAsInt =
        value === undefined ? 0 : parseInt(removeUnit(value, "em"));

      const oneColumWidth = valueAsInt / 12;

      prev[key] = `${(oneColumWidth * columns).toFixed(2)}em`;

      return prev;
    }, {} as BreakpointObject);
};
