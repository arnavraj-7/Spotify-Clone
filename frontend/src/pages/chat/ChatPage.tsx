import useChatStore from "@/stores/ChatStore";
import { Users2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import UserCard from "../cards/UserCard";
import { Button } from "@/components/ui/button";
import ChatMessages from "./ChatMessages";
import type { userWithActivities } from "@/types";

export const ChatPage = () => {
  const { mergedUsers } = useChatStore();
  const [receiver, setReceiver] = useState(null);

  if (!mergedUsers) return null;
  return (
    <>
      <div className="flex flex-rows">
        {/* all users */}
        <div className="flex-1/20">
          <div className="bg-zinc-900 w-full rounded-md h-[calc(100vh-114px)] ">
            <div className="font-bold flex gap-x-2 items-center mb-3">
              <Users2Icon size={30} />
              Users
            </div>
            <hr className="mb-3" />
            <div className="flex flex-col gap-y-4">
              {mergedUsers.map((user: userWithActivities) => {
                return (
                  <Button className="bg-zinc-900 hover:bg-zinc-800 h-full flex justify-start" onClick={() => setReceiver(user)} key={user.clerkId}>
                    <UserCard user={user} />
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1/2">
          {receiver ? <>
          <ChatMessages receiver={receiver} />
          </> : <NoConversationPlaceholder />}
        </div>
      </div>
    </>
  );
};
const NoConversationPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-6">
    <img src="/spotify.png" alt="Spotify" className="size-16 animate-bounce" />
    <div className="text-center">
      <h3 className="text-zinc-300 text-lg font-medium mb-1">
        No conversation selected
      </h3>
      <p className="text-zinc-500 text-sm">Choose a friend to start chatting</p>
    </div>
  </div>
);
