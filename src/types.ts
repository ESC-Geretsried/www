import { Event as EventType } from "@microsoft/microsoft-graph-types";

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

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

export type Post = Mutable<GatsbyTypes.BlogPostPreviewFieldsFragment>;

// subject,body,bodyPreview,categories,start,end,location
export type Event = Pick<
  EventType,
  | "body"
  | "bodyPreview"
  | "start"
  | "end"
  | "subject"
  | "id"
  | "categories"
  | "location"
>;
