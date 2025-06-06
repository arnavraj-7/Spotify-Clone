import { create } from "zustand";

interface LocationStore {
    prevlocation: string;
    setPrevlocation: (location: string) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
    prevlocation: "/",
    setPrevlocation: (location: string) => {
     
        if(location=="/song-player") return
        set({ prevlocation:location })},
}))