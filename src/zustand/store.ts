import create from "zustand";

interface Store {
  selectedFilter: string;
  modalOpen: boolean;
  currentTeam: string;
  announcementBarClosed: boolean;
  setSelectedFilter: (filter: string) => void;
  setModalOpen: () => void;
  setModalClosed: () => void;
  setCurrentTeam: (team: string) => void;
  setAnnouncementBarClosed: () => void;
}

export const useStore = create<Store>((set) => ({
  selectedFilter: "ALL",
  modalOpen: false,
  currentTeam: "",
  announcementBarClosed: false,
  setSelectedFilter: (filter: string) => set({ selectedFilter: filter }),
  setModalOpen: () => set({ modalOpen: true }),
  setModalClosed: () => set({ modalOpen: false }),
  setCurrentTeam: (team: string) => set({ currentTeam: team }),
  setAnnouncementBarClosed: () => set({ announcementBarClosed: true }),
}));