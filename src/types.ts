export type MenuItemType = {
  isActive: boolean;
  id: string;
  url: string;
  label: string;
  parentId: string;
  childItems: Array<{
    isActive: boolean;
    id: string;
    url: string;
    label: string;
  }>;
};

export type GatsbyPageContext = { id: string; pathname: string; title: string };

export type BreakpointNames = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

export type BreakpointObject = { [key in BreakpointNames]?: string };
