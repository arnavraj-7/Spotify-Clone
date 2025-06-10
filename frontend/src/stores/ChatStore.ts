import API from "@/lib/axios";
import type { Message, User } from "@/types";
import type { Socket } from "socket.io-client";
import { create } from "zustand";

type userWithActivities = User & { activity: string };
type userActivities = {
  [key: string]: string;
};
type ChatStore = {
  users: User[] | [];
  onlineUsers: User[] | [];
  mergedUsers: userWithActivities[] | [];
  userActivities: userActivities;
  error: string | null;
  isLoadingUsers: boolean;
  isLoadingMessages: boolean;
  messages: Message[];
  newMessageIds: Set<string> | null;
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
  fetchUsers: (token: string) => Promise<void>;
  fetchMessages: (token: string, id: string,currentid:string) => Promise<void>;
  sendMessage: (message: Message) => void;
  receiveMessage: () => void;
  markAsSeen: (token: string, id: string) => Promise<void>;
  fetchOnlineUsers: () => void;
  fetchUserActivities: () => void;
  updateActivity: () => void;
  setMessage: (message: Message) => void;
  setMergedUsers: (users: userWithActivities[]) => void;
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
    newMessageIds:null,
    socket: null,
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
    setMergedUsers: (users) => {
      set({ mergedUsers: users });
    },
     markAsSeen: async (token: string, id: string) => {
      console.log("markAsSeen");
      await API.post(`/chat/${id}/mark-seen`, {
        header: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.senderId === id ? { ...msg, delivered: true,seen:true } : msg
        ),
      }));
    },
    fetchMessages: async (token: string, id: string,currentid:string) => {

    set({ isLoadingMessages: true });
    try {
      const response = await API(`/chat/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Find messages that are unseen (new messages)
      const unseenIds = new Set<string>();
      response.data.forEach((msg: Message) => {
        // If message is not delivered AND not sent by current user = it's new
        if (!msg.seen && msg.senderId !== currentid) {
          unseenIds.add(msg._id as string);
        }
      });
      
      set({ messages: response.data, newMessageIds: unseenIds });
      
      
      // Mark messages as delivered after a short delay (so user can see the NEW indicator)
      if (unseenIds.size > 0) {
        setTimeout(() => {
          get().markAsDelivered(token, id);
        }, 2000); // Show NEW indicator for 2 seconds
      }
      
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
    finally {
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
    setMessage(message: Message) {
      set({ messages: [...get().messages, message] });
    },
    receiveMessage() {
      const { socket } = get();
      if (socket) {
        socket.on("receive_messages", (payload) => {
          set((state) => ({
            messages: [...state.messages, payload],  }));
      })
      }
    },
    fetchOnlineUsers: () => {
      const { socket } = get();
      if (socket) {
        socket.on("user_connected", (payload) => {
          set((state) => ({
            onlineUsers: [...state.onlineUsers, payload.clerkId],
            userActivities: {
              ...state.userActivities,
              [payload.clerkId]: "Idle",
            },
          }));
          console.log("user Connected :", payload);
        });
        socket.on("user_disconnected", (payload) => {
          set((state) => ({
            onlineUsers: state.onlineUsers.filter(
              (user) => user.clerkId !== payload.clerkId
            ),
            userActivities: {
              ...state.userActivities,
              [payload.clerkId]: "Offline",
            },
          }));
          console.log("user disconneted :", payload);
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
          console.log("activities:", payload);
        });
      }
    },
    updateActivity: () => {
      const socket = get().socket;
      if (socket) {
        socket.on("update_activity", (payload) => {
          set((state) => ({
            userActivities: { ...state.userActivities, ...payload },
          }));
        });
      }
    },
  };
});
export default useChatStore;
