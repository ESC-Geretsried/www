import { containerWidths } from "../theme/misc";
import { BreakpointNames, BreakpointObject } from "../types";

export const removeUnit = (value: string, unit: string) => {
  return value.slice(0, value.length - unit.length);
};

export const calcColumnWidths = (
  columns: number,
  {
    excludeBPs,
    addGap,
  }: { excludeBPs: Array<BreakpointNames>; addGap?: BreakpointObject }
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

      const defaultWidth = `${(oneColumWidth * columns).toFixed(2)}em`;

      prev[key] =
        addGap && addGap[key]
          ? `calc(${defaultWidth} + var(--chakra-space-${addGap[key]}))`
          : defaultWidth;

      return prev;
    }, {} as BreakpointObject);
};
