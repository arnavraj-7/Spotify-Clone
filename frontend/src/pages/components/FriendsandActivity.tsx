import { Users2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import UserCard from "../cards/UserCard";
import useChatStore from "@/stores/ChatStore";
import { useAuth } from "@clerk/clerk-react";
import type { User } from "@/types";
import UsersListSkeleton from "@/skeletons/UserListSkeleton";

const FriendsandActivity = () => {
  const { getToken } = useAuth();
  const [loading,setLoading] = useState(false);
  const { users,fetchUsers,userActivities,setMergedUsers ,mergedUsers} = useChatStore();
 
  useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      if (token === null) return;
      await fetchUsers(token);
      
    }
    fetchData();
  }, [getToken]);

  useEffect(()=>{
    const merged = users.filter(user=>!!user.clerkId).map((user) => {
            return {     
                ...user,
                activity: userActivities[user.clerkId] || "Offline", // default to offline
            }
        
      });
      setMergedUsers(merged);
      if(merged.length===0) setLoading(true);
      else if(merged.length>0) setLoading(false);
  },[userActivities,users])
  useEffect(()=>{
    console.log("users:",users," merged:",mergedUsers," activities:",userActivities);
  },[mergedUsers,users,userActivities])
  return (

    <>
    {loading?<UsersListSkeleton/>:
    <div className="bg-zinc-900 rounded-md h-[calc(100vh-114px)]">
      <div className="font-bold flex gap-x-2 items-center mb-3">
        <Users2Icon size={30} />
        What they're listening to?
      </div>
      <hr className="mb-3" />
      <div className="flex flex-col gap-y-4">
        {mergedUsers.map((user:User) => {
          return <UserCard user={user} key={user.clerkId} />;
        })}
      </div>
    </div>}
    </>
  );
};

export default FriendsandActivity;
