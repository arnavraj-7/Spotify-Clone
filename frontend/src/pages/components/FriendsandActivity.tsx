import { Users2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import UserCard from "../cards/UserCard";
import useChatStore from "@/stores/ChatStore";
import { useAuth } from "@clerk/clerk-react";
import type { User } from "@/types";

const FriendsandActivity = () => {
  const { getToken } = useAuth();
  const { users,fetchUsers,userActivities } = useChatStore();
  const [mergedUsers,setMergeUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      if (token === null) return;
      await fetchUsers(token);

      const merged = users.map((user) => {
        if(user.clerkId){
            return {     
                ...user,
                activity: userActivities[user.clerkId] || "Offline", // default to offline
            }
        }
      });
      setMergeUsers(merged);
    }
    fetchData();
  }, [getToken]);
  useEffect(()=>{
    console.log("merged",mergedUsers)
  },[mergedUsers])
  return (
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
    </div>
  );
};

export default FriendsandActivity;
