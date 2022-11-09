import create from "zustand";

interface Store {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

export const useStore = create<Store>((set) => ({
  selectedFilter: "ALL",
  setSelectedFilter: (filter: string) => set({ selectedFilter: filter }),
}));