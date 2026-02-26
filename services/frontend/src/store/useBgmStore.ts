import { create } from 'zustand';

interface BgmState {
  currentTrack: string | null;
  isPlaying: boolean;
  volume: number;
  play: (track: string) => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  stop: () => void;
}

export const useBgmStore = create<BgmState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 0.5,
  play: (track) => set({ currentTrack: track, isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  setVolume: (volume) => set({ volume }),
  stop: () => set({ currentTrack: null, isPlaying: false }),
}));
