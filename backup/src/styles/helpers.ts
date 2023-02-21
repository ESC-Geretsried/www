import { css } from "@emotion/react";
import { grid, mq } from "./variables";
// import { GraphCms_Spacing } from "../../graphql-types";

const transform = (spacing: number | "auto", factor: "auto" | number) =>
  `${typeof spacing === "number" && typeof factor === "number" ? spacing * factor + "px" : "auto"}`;

const createSpacing = (spacing = 8) => (first?: number | "auto", ...data: ReadonlyArray<"auto" | number>) =>
  first === undefined
    ? transform(spacing, 1)
    : data.reduce(
        (acc, item) => `${acc} ${transform(spacing, item)}`,
        transform(spacing, typeof first === "number" ? first : "auto"),
      );

export const generateSpacing = createSpacing(8);

// type SpacingOverload = {
//   (top: number | "auto", right: number | "auto", bottom: number | "auto", left: number | "auto"): string;
//   (top: number | "auto", leftRight: number | "auto", bottom: number | "auto"): string;
//   (topBottom: number | "auto", leftRight: number | "auto"): string;
//   (all: number | "auto"): string;
//   (first: number | "auto", second?: number | "auto", third?: number | "auto", fourth?: number | "auto"): string;
// };

/* eslint-enable @typescript-eslint/unified-signatures */

// const getSpacedConfig = ({
//   prefix,
//   first,
//   second,
//   third,
//   fourth,
// }: {
//   prefix: "padding" | "margin";
//   first: number | "auto";
//   second?: number | "auto";
//   third?: number | "auto";
//   fourth?: number | "auto";
// }) => {
//   const args: Array<"auto" | number> = [second, third, fourth].filter(
//     (value): value is number | "auto" => typeof value === "number" || value === "auto",
//   );

//   return `${prefix}: ${generateSpacing(first, ...args)};`;
// };

// const margin: SpacingOverload = (
//   first: number | "auto",
//   second?: number | "auto",
//   third?: number | "auto",
//   fourth?: number | "auto",
// ) => {
//   return getSpacedConfig({ prefix: "margin", first, second, third, fourth });
// };

// const padding: SpacingOverload = (
//   first: number | "auto",
//   second?: number | "auto",
//   third?: number | "auto",
//   fourth?: number | "auto",
// ) => {
//   return getSpacedConfig({ prefix: "padding", first, second, third, fourth });
// };

// export { margin, padding };

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexAlignCenter = css`
  display: flex;
  align-items: center;
`;

export const flexJustifyCenter = css`
  display: flex;
  justify-content: center;
`;

export const spanArea = css`
  height: 100%;
  width: 100%;
`;

export const spanViewport = css`
  height: 100vh;
  width: 100%;
`;

export const standardGrid = css`
  display: -ms-grid;
  display: grid;
  -ms-grid-template-columns: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  -ms-gap: ${grid.gap};
  gap: ${grid.gap};

  /* grid-template-rows: repeat(9,auto); */
  ${mq[2]} {
    -ms-grid-template-columns: repeat(10, 1fr);
    grid-template-columns: repeat(10, 1fr);
  }
  /* ${mq[5]} {
    gap: ${grid.gapBig};
  } */
`;
