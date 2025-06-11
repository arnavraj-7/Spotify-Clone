import useChatStore from "@/stores/ChatStore";
import { Users2Icon, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import UserCard from "../cards/UserCard";
import { Button } from "@/components/ui/button";
import ChatMessages from "./ChatMessages";
import type { userWithActivities } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth,useUser } from "@clerk/clerk-react";
import UsersListSkeleton from "@/skeletons/UserListSkeleton";

export const ChatPage = () => {
  const { mergedUsers,fetchUsers,users,userActivities,setMergedUsers,setActiveConversationKey } = useChatStore();
  const [loading, setLoading] = useState(true);
  const {getToken} = useAuth();
  const {user } = useUser();
  const clientId = user?.id;
  const [receiver, setReceiver] = useState<userWithActivities | null>(null);
  
  useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      if (token === null) return;
      await fetchUsers(token);
    }
    fetchData();
  }, [getToken, fetchUsers]);

  useEffect(() => {
    const merged = users.filter(user => !!user.clerkId).map((user) => {
      if (!user.clerkId) return;
      return {    
        ...user,
        activity: userActivities[user.clerkId] || "Offline",
      }
    })
    
    setMergedUsers(merged);
     
    if (merged.length === 0) setLoading(true);
    else if (merged.length > 0) setLoading(false);
  }, [userActivities, users,setMergedUsers])
  

  if (!mergedUsers) return null;

  return (
    <div className="flex h-[calc(100vh-115px)] gap-4 font-manrope">
      {/* Users Sidebar */}
      <div className="w-80 flex-shrink-0">
        <div className="bg-gradient-to-b from-zinc-900 to-zinc-900/95 rounded-xl h-full border border-zinc-800/50 shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800/50 bg-zinc-900/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <MessageCircle size={24} className="text-blue-400" />
              </div>
              <div>
                <h2 className="font-bold text-zinc-100 text-lg">Messages</h2>
                <p className="text-sm text-zinc-400">Choose someone to chat with</p>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="space-y-2">
              <ScrollArea className="h-[calc(100vh-250px)]">
              {loading?<UsersListSkeleton/>:(mergedUsers.map((user: userWithActivities) => {
                const isSelected = receiver?.clerkId === user.clerkId;
                return (
                  <Button 
                    variant="ghost"
                    className={`
                      w-full p-0 h-auto rounded-lg transition-all duration-300 border 
                      ${isSelected 
                        ? 'bg-green-600/20 border-green-500/50 shadow-lg shadow-green-500/10' 
                        : 'bg-transparent border-transparent hover:bg-zinc-800/60 hover:border-zinc-700/50'
                      }
                    `}
                    onClick={() => {setReceiver(user)
                      if(user.clerkId){
                        setActiveConversationKey(clientId+user.clerkId)
                      }
                    }} 
                    key={user.clerkId}
                  >
                    <UserCard user={user} />
                  </Button>
                );
              }))}
              
              {mergedUsers.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                    <Users2Icon size={32} className="text-zinc-600" />
                  </div>
                  <p className="text-zinc-400">No users available</p>
                  <p className="text-sm text-zinc-500">Check back later</p>
                </div>
              )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 min-w-0">
        <div className="bg-gradient-to-b from-zinc-900 to-zinc-900/95 rounded-xl h-full border border-zinc-800/50 shadow-2xl overflow-hidden">
          {receiver ? (
            <ChatMessages receiver={receiver} />
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
};

const NoConversationPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
    <div className="relative">
      <div className="w-24 h-24 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
        <img src="/spotify.png" alt="Spotify" className="w-12 h-12 opacity-80" />
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
        <MessageCircle size={16} className="text-white" />
      </div>
    </div>
    
    <div className="text-center space-y-3">
      <h3 className="text-zinc-200 text-2xl font-bold">
        Ready to start chatting?
      </h3>
      <p className="text-zinc-400 text-lg max-w-md">
        Select a friend from the sidebar to begin your conversation
      </p>
      <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 mt-4">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span>Share what you're listening to</span>
      </div>
    </div>
  </div>
);

export default ChatPage;