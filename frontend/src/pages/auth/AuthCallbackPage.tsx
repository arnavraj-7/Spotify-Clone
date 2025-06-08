import { useEffect, useRef } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import LoadingPage from "../loading/LoadingPage";
import API from "@/lib/axios";
import { useNavigate } from "react-router-dom";

export const AuthCallbackPage = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const didSyncRef = useRef(false);

  //calling the sync function everytime the page is open
  useEffect(() => {
    const syncUser = async () => {

      try {
        if (!user || !isLoaded) {
          return;
        }
        if(didSyncRef.current) return;
        didSyncRef.current = true;
        const res = await API.post("auth/callback",{
          clerkId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        }
          )
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        navigate("/");
      }
    };
    syncUser();
  }, [getToken, navigate, user, isLoaded]);

  return <LoadingPage />;
};
