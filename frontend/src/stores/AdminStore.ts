import API from "@/lib/axios";
import type Albums from "@/pages/Admin/Albums";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useAdminStore = create((set, get) => {
  return {
    songs: [],
    albums: [],
    users: Number,
    totalsongs: Number,
    totalalbums: Number,
    totalartists: Number,
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
        set({
          albums: get().albums.filter((album) => album._id !== id),
          totalsongs: get().totalalbums - 1,
        });
      } catch (error) {
        console.log(error);
      }
    },
  };
});
