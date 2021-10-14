import create, { GetState, SetState } from "zustand";
import { createMobileMenuSlice, MobileMenuSlice } from "./mobileMenuStore";

export type GlobalStore = {
  siteTitle: string;
  pathname: string;
  setPathname: (pathname: string) => void;
  setSiteTitle: (title: string) => void;
};

export const useStore = create<GlobalStore & MobileMenuSlice>((set, get) => ({
  siteTitle: "ESC Geretsried",
  pathname: "/",
  setPathname: (newPathname) => set(() => ({ pathname: newPathname })),
  setSiteTitle: (newTitle) => set(() => ({ siteTitle: newTitle })),
  ...createMobileMenuSlice(
    set as unknown as SetState<MobileMenuSlice>,
    get as unknown as GetState<MobileMenuSlice>
  ),
}));
