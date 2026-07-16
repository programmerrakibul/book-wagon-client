import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useUiStore = create(
  immer((set) => ({
    sidebarOpen: false,
    setSidebarOpen: (open) =>
      set((state) => {
        state.sidebarOpen = open;
      }),
    toggleSidebar: () =>
      set((state) => {
        state.sidebarOpen = !state.sidebarOpen;
      }),
  })),
);
