import API from "@/lib/axios";
import type { User } from "@/types";
import { create } from "zustand";

type ChatStore = {
  users: User[] | [];
  error: string | null;
  isLoading: boolean;
  fetchUsers: (token: string) => Promise<void>;
};

const useChatStore = create<ChatStore>((set) => {
  return {
    error: null,
    isLoading: false,
    users: [],
    fetchUsers: async (token:string) => {
      try {
        set({ isLoading: true });
        const users = await API.get("/user",{headers:{Authorization:`Bearer ${token}`}});
        set({ users: users.data });
      } catch (err) {
        set({ error: "Error in fetching users" });
        console.log("Error in fetching users:", err);
      } finally {
        set({ isLoading: false });
      }
    },
  };
});
export default useChatStore;
