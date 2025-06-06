import API from "@/lib/axios";
import type { User } from "@/types";
import { create } from "zustand";

type ChatStore = {
  users: User[] | [];
  error: string | null;
  isLoading: boolean;
  fetchUsers:()=> Promise<void>;
};

const useChatStore = create<ChatStore>((set) => {
  return {
    error: null,
    isLoading: false,
    users: [],
    fetchUsers : async () => {
      try {
        set({ isLoading: true });
        const users = await API.get("/user");
        set({ users: users.data });
      } catch (err) {
        set({ error: "Error in fetching users", });
        console.log("Error in fetching users:", err);
      } finally {
        set({ isLoading: false });
      }
    },
  };
});
export default useChatStore; 
