import React, { useEffect,useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import API from "@/lib/axios.ts";
import LoadingPage from "@/pages/LoadingPage";
const updateAPItoken = (token: string | null) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
const AuthProvider = ({children}:{children:React.ReactNode}) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        console.log(token);
        updateAPItoken(token);
      } catch (error) {
        console.log("Error in auth provider",error);
        updateAPItoken(null);
      }finally{
        setLoading(false);
      }
    };
    initAuth();
  },[getToken]);
  if(loading){
    return <><LoadingPage/></>
  }
  return <>{children}</>;
};

export default AuthProvider;
