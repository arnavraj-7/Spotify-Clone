import API from "@/lib/axios";
import type { Message, User } from "@/types";
import type { Socket } from "socket.io-client";
import { create } from "zustand";

type ChatStore = {
  users: User[] | [];
  onlineUsers: User[] | [];
  userActivities: object;
  error: string | null;
  isLoadingUsers: boolean;
  isLoadingMessages: boolean;
  messages: Message[];
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
  fetchUsers: (token: string) => Promise<void>;
  fetchMessages: (token: string, id: string) => Promise<void>;
  sendMessage: (message: Message) => void;
  receivedMessage: () => void;
  fetchOnlineUsers: () => void;
  fetchUserActivities: () => void;
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
    receivedMessage() {
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
            onlineUsers: [...state.onlineUsers, payload],
          }));
          console.log(payload);

        });
        socket.on("user_disconnected", (payload) => {
          set((state) => ({
            onlineUsers: state.onlineUsers.filter(
              (user) => user.clerkId !== payload.clerkId
            ),userActivities:{...state.userActivities,[payload.clerkId]:"Offline"}
          }));
          console.log(payload);
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
          console.log(payload);
        });
      }
    },
  };
});
export default useChatStore;
