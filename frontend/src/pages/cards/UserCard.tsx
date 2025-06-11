import { Music } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { User } from "@/types";


const UserCard = ({ user }: { user: User & { activity: any } }) => {
  const [online, setOnline] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const activity = user.activity;

  useEffect(() => {
    if (activity === "Offline") {
      setOnline(false);
      setPlaying(false);
    } else if (activity === "Idle") {
      setOnline(true);
      setPlaying(false);
    } else if (activity.song) {
      setOnline(true);
      setPlaying(true);
    }
  }, [activity]);

  const [firstName, lastName] = [user.firstName, user.lastName];

  return (
    <div
      className={cn(
        buttonVariants({
          variant: "ghost",
          className:
            "w-full h-auto justify-start p-3 rounded-lg hover:bg-zinc-800/80 transition-all duration-300 group border border-transparent hover:border-zinc-700/50",
        })
      )}
    >
      <div className="flex items-center gap-3 w-full">
        <div className="relative flex-shrink-0">
          <Avatar className="w-12 h-12 ring-2 ring-zinc-700/50 group-hover:ring-green-500/30 transition-all duration-300">
            <AvatarFallback className="bg-gradient-to-br from-zinc-700 to-zinc-800 text-zinc-200 font-medium text-sm">
              {firstName?.[0]}
              {lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          {online && (
            <div className="absolute -bottom-1 -right-1 flex items-center justify-center">
              <span
                className="block h-4 w-4 rounded-full border-2 border-zinc-900 bg-green-400 shadow-lg"
                title="Online"
              />
              {isPlaying && (
                <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-zinc-100 group-hover:text-white transition-colors duration-200 truncate">
              {firstName} {lastName}
            </span>
            {online && isPlaying && (
              <div className="flex items-center gap-1">
                <Music size={14} className="text-green-400 animate-pulse flex-shrink-0" />
                <div className="flex gap-1">
                  <div className="w-1 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>
          
          {online ? (
            isPlaying ? (
              <div className="flex flex-col">
                <span className="text-sm text-zinc-200 font-medium truncate leading-tight">
                  {activity.song}
                </span>
                <span className="text-xs text-zinc-400 truncate">
                  by {activity.artist}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-sm text-zinc-400">Away</span>
              </div>
            )
          ) : (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-zinc-500 rounded-full"></div>
              <span className="text-sm text-zinc-500">Offline</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;