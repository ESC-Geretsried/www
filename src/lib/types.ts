export type NonNullableProperties<T> = { [K in keyof T]: NonNullable<T[K]> };

export type NoTypename<T> = Omit<T, "__typename">;

export const templates = [
  "standard",
  "home",
  "tickets",
  "lineup",
  "lineup_board",
  "hockeyTeam",
  "gamepitch",
  "sponsors",
  "shop",
] as const;

export const hockeyDivisions = [
  "damen",
  "1b",
  "u17",
  "u15",
  "u13",
  "u11",
  "u9",
  "u7",
] as const;

export const divisionsWithNesting = [
  "verein",
  "river-rats",
  "eishockey",
] as const;

export const divisionsWithoutNesting = [
  "eiskunstlauf",
  "eislaufschule",
  "inklusionssport",
];

export const allDivisions = [
  ...hockeyDivisions,
  ...divisionsWithNesting,
  ...divisionsWithoutNesting,
];
