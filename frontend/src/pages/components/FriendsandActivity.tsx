import { Users2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import UserCard from "../cards/UserCard";
import useChatStore from "@/stores/ChatStore";
import { useAuth } from "@clerk/clerk-react";
import type { User } from "@/types";
import UsersListSkeleton from "@/skeletons/UserListSkeleton";

const FriendsandActivity = () => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const { users, fetchUsers, userActivities, setMergedUsers, mergedUsers } = useChatStore();
 
  useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      if (token === null) return;
      await fetchUsers(token);
    }
    fetchData();
  }, [getToken]);

  useEffect(() => {
    const merged = users.filter(user => !!user.clerkId).map((user) => {
      if (!user.clerkId) return;
      return {    
        ...user,
        activity: userActivities[user.clerkId] || "Offline",
      }
    });
    setMergedUsers(merged);
     
    if (merged.length === 0) setLoading(true);
    else if (merged.length > 0) setLoading(false);
  }, [userActivities, users])

  useEffect(() => {
    console.log("users:", users, " merged:", mergedUsers, " activities:", userActivities);
  }, [mergedUsers, users, userActivities])

  return (
    <>
      {loading ? <UsersListSkeleton /> :
        <div className="bg-gradient-to-b from-zinc-900 to-zinc-900/95 rounded-xl h-[calc(100vh-114px)] border border-zinc-800/50 shadow-2xl">
          <div className="p-6 border-b border-zinc-800/50">
            <div className="font-bold text-zinc-100 flex gap-x-3 items-center text-lg">
              <div className="p-2 bg-green-600/20 rounded-lg">
                <Users2Icon size={24} className="text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">What they're listening to</h2>
                <p className="text-sm text-zinc-400 font-normal">See what your friends are jamming to</p>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex flex-col gap-y-2 max-h-[calc(100vh-220px)] overflow-y-auto">
              {mergedUsers.map((user: User) => {
                return <UserCard user={user} key={user.clerkId} />;
              })}
              {mergedUsers.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                    <Users2Icon size={32} className="text-zinc-600" />
                  </div>
                  <p className="text-zinc-400">No friends online</p>
                  <p className="text-sm text-zinc-500">Invite friends to see their activity</p>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default FriendsandActivity;