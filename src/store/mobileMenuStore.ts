import { GetState, SetState } from "zustand";

export type MobileMenuSlice = {
  isMobileMenuOpen: boolean;
  activeMenuItems: Array<string>;
  setIsMobileMenuOpen: (_isMobileMenuOpen: boolean) => void;
  setActiveMenuItems: (newActiveItems: Array<string>) => void;
  toggleActiveMenuItems: (
    newActiveItem: Array<string>,
    options: { allowMultiple: boolean }
  ) => void;
};

export const createMobileMenuSlice = (
  set: SetState<MobileMenuSlice>,
  get: GetState<MobileMenuSlice>
): MobileMenuSlice => ({
  activeMenuItems: [],
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: (_isMobileMenuOpen) =>
    set(() => ({ isMobileMenuOpen: _isMobileMenuOpen })),
  setActiveMenuItems: (newActiveItems) =>
    set(() => ({ activeMenuItems: newActiveItems })),
  toggleActiveMenuItems: (
    newActiveItems,
    { allowMultiple } = { allowMultiple: false }
  ) =>
    set((state) => {
      if (
        state.activeMenuItems.some((activeItem) =>
          newActiveItems.includes(activeItem)
        )
      ) {
        if (allowMultiple) {
          const activeWithoutNew = state.activeMenuItems.filter(
            (oldItem) => !newActiveItems.includes(oldItem)
          );
          state.setActiveMenuItems(activeWithoutNew);
        } else {
          state.setActiveMenuItems([] as Array<string>);
        }
      } else {
        if (allowMultiple) {
          state.setActiveMenuItems([
            ...state.activeMenuItems,
            ...newActiveItems,
          ]);
        } else {
          state.setActiveMenuItems([...newActiveItems]);
        }
      }
    }),
});
