import API from "@/lib/axios";
import type { Song } from "@/types";
import { create } from "zustand";

type SongStore = {
  fetchFeaturedSong(): Promise<void>;
  fetchMadeforYou(token:string): Promise<void>;
  fetchTrendingSong(): Promise<void>;

  featuredSong: Song[];        
  MadeforYouSong: Song[];
  TrendingSong: Song[];

  isLoadingFeatured: boolean;
  isLoadingMadeForYou: boolean;
  isLoadingTrending: boolean;

  error: string | null;
};

const useSongStore = create<SongStore>((set) => ({
  featuredSong: [],
  MadeforYouSong: [],
  TrendingSong: [],
  isLoadingFeatured: false,
  isLoadingMadeForYou: false,
  isLoadingTrending: false,
  error: null,

  fetchFeaturedSong: async () => {
    try {
      set({ isLoadingFeatured: true, error: null });
      const res = await API.get("/song/featured");
      set({ featuredSong: res.data });
    } catch (error) {
      console.error(error);
      set({ error: "Error in fetching featured song" });
    } finally {
      set({ isLoadingFeatured: false });
    }
  },

  fetchMadeforYou: async (token: string) => {
    try {
      set({ isLoadingMadeForYou: true, error: null });
      const res = await API.get("/song/made-for-you",{headers:{Authorization:`Bearer ${token}`}});
      set({ MadeforYouSong: res.data });
    } catch (error) {
      console.error(error);
      set({ error: "Error in fetching made for you songs" });
    } finally {
      set({ isLoadingMadeForYou: false });
    }
  },

  fetchTrendingSong: async () => {
    try {
      set({ isLoadingTrending: true, error: null });
      const res = await API.get("/song/trending");
      set({ TrendingSong: res.data });
    } catch (error) {
      console.error(error);
      set({ error: "Error in fetching trending songs" });
    } finally {
      set({ isLoadingTrending: false });
    }
  },
}));

export default useSongStore;
