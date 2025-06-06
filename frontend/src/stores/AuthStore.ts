import API from "@/lib/axios";
import { create } from "zustand";

type AdminStore = {
  isAdmin: boolean;
  checkAdmin:()=> Promise<void>;
};

const useAuthStore = create<AdminStore>((set) => {
  return {
    isAdmin: false,
    checkAdmin: async () => {
      try {
        const res = await API.get("/admin/dashboard");
        if (res.status == 200) {
          set({ isAdmin: true });
        } else set({ isAdmin: false });
      } catch (error) {
        console.log(error);
      }
    },
  };
});
export default useAuthStore