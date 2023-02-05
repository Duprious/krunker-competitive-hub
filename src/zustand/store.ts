import create from "zustand";

interface Store {
  theme: "light" | "dark";
  selectedFilter: string;
  modalOpen: boolean;
  bracketLinkModalOpen: boolean;
  currentTeam: string;
  announcementBarClosed: boolean;
  setSelectedFilter: (filter: string) => void;
  setModalOpen: () => void;
  setModalClosed: () => void;
  setCurrentTeam: (team: string) => void;
  setAnnouncementBarClosed: () => void;
  toggleBracketLinkModal: () => void;
  toggleTheme: () => void;
}

export const useStore = create<Store>((set) => ({
  theme: "light",
  selectedFilter: "ALL",
  modalOpen: false,
  currentTeam: "",
  announcementBarClosed: false,
  bracketLinkModalOpen: false,
  setSelectedFilter: (filter: string) => set({ selectedFilter: filter }),
  setModalOpen: () => set({ modalOpen: true }),
  setModalClosed: () => set({ modalOpen: false }),
  setCurrentTeam: (team: string) => set({ currentTeam: team }),
  setAnnouncementBarClosed: () => set({ announcementBarClosed: true }),
  toggleBracketLinkModal: () => set((state) => ({ bracketLinkModalOpen: !state.bracketLinkModalOpen })),
  toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));