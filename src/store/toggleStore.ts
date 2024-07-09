import { create } from "zustand";

const toggleStore = create((set) => ({
  isListingActive: false,
  isDasboardSidebarActive: false,
  listingToggleHandler: () =>
    set((state: any) => ({ isListingActive: !state.isListingActive })),
  dashboardSlidebarToggleHandler: () =>
    set((state: any) => ({
      isDasboardSidebarActive: !state.isDasboardSidebarActive,
    })),
}));

export default toggleStore;
