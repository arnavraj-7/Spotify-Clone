import React, { useEffect, useState } from "react";
import { useAuth,useUser } from "@clerk/clerk-react";
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
  const { getToken } = useAuth();
  const { user,isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const { checkAdmin } = useAuthStore();
  const {
    setSocket,
    fetchOnlineUsers,
    fetchUserActivities,
    receiveMessage,
    updateActivity
    
  } = useChatStore();
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        console.log(token);
        updateAPItoken(token);
        if (token) {
          await checkAdmin();
      
        }
      } catch (error) {
        console.log("Error in auth provider", error);
        updateAPItoken(null);
      } 
    };
    initAuth();
  }, [getToken]);

useEffect(()=>{
     // Wait until Clerk has finished loading
    if (!isLoaded) return;

    // If there's no user, we're done loading; render public UI
    if (!user) {
      setLoading(false);
      // also clean up any existing socket
      setSocket(null);
      return;
    }
  setLoading(false);
  const backendURL = import.meta.env.MODE === "production"? import.meta.env.VITE_BACKEND_URL: "http://localhost:5000";
  const socket = io(`${backendURL}`, {
            auth: {
              clerkId: user.id,
            },
          });
          setSocket(socket);
          fetchOnlineUsers();
          fetchUserActivities();
          receiveMessage();
          updateActivity();
          return ()=> setSocket(null);
},[user,isLoaded])

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
