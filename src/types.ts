import { Event as EventType } from "@microsoft/microsoft-graph-types";

export type GatsbyPageContext = {
  id: string;
  pathname: string;
  title: string;
  limit?: number;
  skip?: number;
  pagesTotal?: number;
  currentPage?: number;
  categorySlug?: string;
};

export type BreakpointNames = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

export type BreakpointObject = { [key in BreakpointNames]?: string | number };

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
export type Unmutable<T> = { readonly [P in keyof T]: T[P] };
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type RequiredAndNonNullable<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
export type MakePropRequired<T, K extends keyof T> = Omit<T, K> &
  RequiredAndNonNullable<Pick<T, K>>;

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

export type MenuItemType = Omit<GatsbyTypes.MenuItemFragment, "childItems"> & {
  isActive: boolean;
  childItems: Array<
    {
      isActive: boolean;
    } & GatsbyTypes.MenuChildItemFragment
  >;
};
