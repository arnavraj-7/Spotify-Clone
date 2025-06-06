import API from "@/lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";
import type { Album, Song } from "@/types";
type AdminStore = {
  songs: Song[];
  albums: Album[];
  users: number;
  totalsongs: number;
  totalalbums: number;
  totalartists: number;
  isLoading: boolean;
  error: string | null;
  getStats: () => Promise<void>;
  getAllSongs: () => Promise<void>;
  getAllAlbums: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
  updateSong:(song:Song)=>void
  updateAlbum:(album:Album)=>void
};

export const useAdminStore = create<AdminStore>((set, get) => {
  return {
    songs: [],
    albums: [],
    users: 0,
    totalsongs: 0,
    totalalbums: 0,
    totalartists: 0,
    isLoading: false,
    error: null,
    getStats: async () => {
      set({ isLoading: true });
      try {
        const stats = await API.get("/stats/");
        const { Total_Songs, Total_Albums, Total_Artists, Total_Users } =
          stats.data;
        set({
          users: Total_Users,
          totalsongs: Total_Songs,
          totalalbums: Total_Albums,
          totalartists: Total_Artists,
          isLoading: false,
        });
      } catch (error) {
        console.log(error);
      } finally {
        set({ isLoading: false });
      }
    },
    getAllSongs: async () => {
      set({ isLoading: true });
      try {
        const songs = await API.get("/song/");
        set({ songs: songs.data, isLoading: false });
      } catch (error) {
        console.log(error);
      } finally {
        set({ isLoading: false });
      }
    },
    getAllAlbums: async () => {
      set({ isLoading: true });
      try {
        const albums = await API.get("/album/");
        set({ albums: albums.data, isLoading: false });
      } catch (error) {
        console.log(error);
      } finally {
        set({ isLoading: false });
      }
    },
    async deleteSong(id: string) {
      try {
        const res = await toast.promise(API.delete(`/admin/song/${id}`), {
          loading: "⌛Loading",
          success: "Song deleted successfully!",
          error: "Error in deleting song.",
        });
        console.log(res.data);
        set({
          songs: get().songs.filter((song) => song._id !== id),
          totalsongs: get().totalsongs - 1,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAlbum(id: string) {
      try {
        const res = await toast.promise(API.delete(`/admin/album/${id}`), {
          loading: "⌛Loading",
          success: "Album deleted successfully!",
          error: "Error in deleting album.",
        });
        console.log(res.data);
        const updatedsongs = get().songs.filter((song) => song.albumId !== id);

        set({
          songs: updatedsongs,
          albums: get().albums.filter((album) => album._id !== id),
          totalalbums: get().totalalbums - 1,
          totalsongs: updatedsongs.length,
        });
      } catch (error) {
        console.log(error);
      }
    },
    updateSong(newsong:Song){
      get().songs.push(newsong);
    },
    updateAlbum(newalbum:Album){
      get().albums.push(newalbum);
    }
  };
});
