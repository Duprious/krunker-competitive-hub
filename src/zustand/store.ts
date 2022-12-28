import create from "zustand";

interface Store {
  selectedFilter: string;
  modalOpen: boolean;
  currentTeam: string;
  setSelectedFilter: (filter: string) => void;
  setModalOpen: () => void;
  setModalClosed: () => void;
  setCurrentTeam: (team: string) => void;
}

export const useStore = create<Store>((set) => ({
  selectedFilter: "ALL",
  modalOpen: false,
  currentTeam: "",
  setSelectedFilter: (filter: string) => set({ selectedFilter: filter }),
  setModalOpen: () => set({ modalOpen: true }),
  setModalClosed: () => set({ modalOpen: false }),
  setCurrentTeam: (team: string) => set({ currentTeam: team }),
}));