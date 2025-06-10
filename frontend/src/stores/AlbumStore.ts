import API from "@/lib/axios";
import { create } from "zustand";
import type { Song, Album } from "@/types";
interface AlbumStore {
  albums: Album[] | [];
  currentAlbum: Album | null;
  songs: Song[] | [];
  isLoading: boolean;
  isLoadingSingleAlbum: boolean;
  error: string | null;
  fetchAlbums: () => Promise<void>;
  fetchAlbumbyId: (id:string) => Promise<void>;
}
const useAlbumStore = create<AlbumStore>((set) => {
  return {
    albums: [],
    currentAlbum: null,
    songs: [],
    isLoading: false,
    isLoadingSingleAlbum: false,
    error: null,
    fetchAlbums: async () => {
      try {
        set({ isLoading: true });
        const res = await API.get("/album/");
        set({ albums: res.data });
        set({ isLoading: false });
      } catch (error) {
        set({ error: "Error" });
        console.log("Error in fetching albums:", error);
      }
    },
    fetchAlbumbyId: async (id: string) => {
      try {
        set({ isLoadingSingleAlbum: true, error: null });
        const res = await API.get(`/album/${id}`);
        set({ currentAlbum: res.data });
      } catch (error) {
        set({ error: "Error in fetching album by Id." });
        console.log("Error in fetching album by Id:", error);
      } finally {
        set({ isLoadingSingleAlbum: false });
      }
    },
  };
});

export default useAlbumStore;
