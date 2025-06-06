import type { Song } from "@/types";
import React from "react";
import { create } from "zustand";
type PlayerStore = {
  isPlaying: boolean;
  queue: Song[];
  currentSong: Song | null;
  currentIndex: number;
  audioRef: React.RefObject<HTMLAudioElement> | null;
  repeat: boolean;
  playAlbum: (songs: Song[], index: number) => void;
  setCurrentsong: (song: Song) => void;
  initialiseQueue: (songs: Song[]) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  setRepeat: () => void;
  setAudioRef:(audioRef: React.RefObject<HTMLAudioElement>)=>void;
};

const usePlayerStore = create<PlayerStore>((set, get) => {
  return {
    currentSong: null,
    isPlaying: false,
    repeat:false,
    currentIndex: -1,
    queue: [],
    audioRef:null,
    setAudioRef:(audioRef: React.RefObject<HTMLAudioElement>)=>set({audioRef}),
    initialiseQueue: (songs: Song[]) => {
      set({
        queue: songs,
        currentSong: get().currentSong || songs[0],
        currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
      });
    },
    playAlbum(songs: Song[], index: number) {
      set({
        queue: songs,
        isPlaying: true,
        currentIndex: index,
        currentSong: songs[index],
      });
    },
    setCurrentsong(song: Song) {
      if (song) {
        const songIndex = get().queue.findIndex(
          (s: Song) => s._id === song._id
        );
        set({
          currentSong: song,
          isPlaying: true,
          currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
        });
      }
    },
    setRepeat() {
      if (get().repeat) {
        set({ repeat: false });
      } else {
        set({ repeat: true });
      }
    },
    togglePlay() {
      set({ isPlaying: !get().isPlaying });
    },
    playNext() {
      const { currentIndex, queue } = get();
      const nextIndex = currentIndex + 1;
      if (nextIndex < queue.length) {
        const nextSong = queue[nextIndex];
        set({
          currentIndex: nextIndex,
          currentSong: nextSong,
          isPlaying: true,
        });
      } else {
        set({ currentIndex: 0, currentSong: queue[0], isPlaying: true });
        return;
      }
    },
    playPrev() {
      const { currentIndex, queue } = get();

      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        const prevSong = queue[prevIndex];
        set({
          currentIndex: prevIndex,
          currentSong: prevSong,
          isPlaying: true,
        });
      } else {
        set({ currentIndex: 0, currentSong: queue[0], isPlaying: true });
        return;
      }
    },
  };
});

export default usePlayerStore;
