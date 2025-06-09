import API from "@/lib/axios";
import type { Message, User } from "@/types";
import type { Socket } from "socket.io-client";
import { create } from "zustand";


type userWithActivities = User & {activity:string}
type userActivities = {
  [key: string]: string;
}
type ChatStore = {
  users: User[] | [];
  onlineUsers: User[] | [];
  mergedUsers: userWithActivities[] | [];
  userActivities: userActivities;
  error: string | null;
  isLoadingUsers: boolean;
  isLoadingMessages: boolean;
  messages: Message[];
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
  fetchUsers: (token: string) => Promise<void>;
  fetchMessages: (token: string, id: string) => Promise<void>;
  sendMessage: (message: Message) => void;
  receiveMessage: () => void;
  fetchOnlineUsers: () => void;
  fetchUserActivities: () => void;
  updateActivity: () => void;
  setMessage: (message: Message) => void;
  setMergedUsers : (users:userWithActivities[])=> void;
};

const useChatStore = create<ChatStore>((set, get) => {
  return {
    error: null,
    isLoadingUsers: false,
    isLoadingMessages: false,
    users: [],
    onlineUsers: [],
    userActivities: {},
    messages: [],
    mergedUsers: [],
    socket : null,
    fetchUsers: async (token: string) => {
      try {
        set({ isLoadingUsers: true });
        const users = await API.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({ users: users.data });
      } catch (err) {
        set({ error: "Error in fetching users" });
        console.log("Error in fetching users:", err);
      } finally {
        set({ isLoadingUsers: false });
      }
    },
    setMergedUsers:(users)=>{
      set({mergedUsers:users});
    },
    fetchMessages: async (token: string, id: string) => {
      try {
        set({ isLoadingMessages: true });
        const messages = await API.get(`/message/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({ messages: messages.data });
      } catch (err) {
        set({ error: "Error in fetching messages" });
        console.log("Error in fetching messages:", err);
      } finally {
        set({ isLoadingMessages: false });
      }
    },
    setSocket: (socket: Socket) => {
      set({ socket });
    },
    sendMessage(message: Message) {
      const { socket } = get();
      if (socket) {
        socket.emit("send_messages", message);
      }
    },
    setMessage(message:Message){
      set({messages:[...get().messages,message]})
    },
    receiveMessage() {
      const { socket } = get();
      if (socket) {
        socket.on("receive_messages", (payload) => {
          set((state) => ({
            messages: [...state.messages, payload],
          }));
          console.log(payload);
        });

      }
    },
    fetchOnlineUsers: () => {
      const { socket } = get();
      if (socket) {
        socket.on("user_connected", (payload) => {
          set((state) => ({
            onlineUsers: [...state.onlineUsers, payload.clerkId],
            userActivities:{...state.userActivities,[payload.clerkId]:"Idle"}
          }));
          console.log("user Connected :",payload);

        });
        socket.on("user_disconnected", (payload) => {
          set((state) => ({
            onlineUsers: state.onlineUsers.filter(
              (user) => user.clerkId !== payload.clerkId
            ),userActivities:{...state.userActivities,[payload.clerkId]:"Offline"}
          }));
          console.log("user disconneted :",payload);
        });
      }
    },
    fetchUserActivities: () => {
      const { socket } = get();
      if (socket) {
        socket.on("get_activities", (payload) => {
          set((state) => ({
            userActivities: { ...state.userActivities, ...payload },
          }));
          console.log("activities:",payload);
        });
      }
    },
    updateActivity:()=>{
      const socket = get().socket;
      if(socket){
        socket.on("update_activity", (payload) => {
          set((state) => ({
            userActivities: { ...state.userActivities, ...payload },
          }));
        })
      }
      }
  };
});
export default useChatStore;
