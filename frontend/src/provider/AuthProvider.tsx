import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import API from "@/lib/axios.ts";
import LoadingPage from "@/pages/loading/LoadingPage";
import useAuthStore from "@/stores/AuthStore";
import { io } from "socket.io-client";
import useChatStore from "@/stores/ChatStore";
const updateAPItoken = (token: string | null) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdmin } = useAuthStore();
  const {
    setSocket,
    fetchOnlineUsers,
    fetchUserActivities,
    receivedMessage,
    socket,
  } = useChatStore();
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        console.log(token);
        updateAPItoken(token);
        if (token) {
          await checkAdmin();
          const socket = io("http://localhost:5000", {
            auth: {
              clerkId: userId,
            },
          });
          setSocket(socket);
          fetchOnlineUsers();
          fetchUserActivities();
          receivedMessage();
        }
      } catch (error) {
        console.log("Error in auth provider", error);
        updateAPItoken(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
    return () => {
      // Cleanup on unmount
      setSocket(null);
    };
  }, [getToken]);
  if (loading) {
    return (
      <>
        <LoadingPage />
      </>
    );
  }
  return <>{children}</>;
};

export default AuthProvider;
