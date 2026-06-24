import { create } from 'zustand';

export type SectionId = 'hero' | 'about' | 'skills' | 'projects' | 'contact';

interface GalaxyState {
  currentSection: SectionId;
  previousSection: SectionId | null;
  isTransitioning: boolean;
  appLoaded: boolean;
  setSection: (section: SectionId) => void;
  setTransitioning: (val: boolean) => void;
  setAppLoaded: (val: boolean) => void;
}

export const useGalaxyStore = create<GalaxyState>((set, get) => ({
  currentSection: 'hero',
  previousSection: null,
  isTransitioning: false,
  appLoaded: false,

  setSection: (section) => {
    const current = get().currentSection;
    if (current === section) return;
    set({
      previousSection: current,
      currentSection: section,
    });
  },

  setTransitioning: (val) => set({ isTransitioning: val }),
  setAppLoaded: (val) => set({ appLoaded: val }),
}));
