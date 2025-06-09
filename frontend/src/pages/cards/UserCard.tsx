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
            "w-full h-full justify-start p-3 rounded-md hover:bg-zinc-800 transition-all duration-200",
        })
      )}
    >
      <div className="flex items-start gap-3">
        <div className="relative"> {/* relative container for dot */}
          <Avatar>
            <AvatarFallback>
              {firstName?.[0]}
              {lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          {online && (
            <span
              className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-zinc-900 bg-green-400"
              title="Online"
            />
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-medium text-white">
              {firstName} {lastName}
            </span>
            {online && isPlaying && (
              <Music size={16} className="text-green-400 animate-bounce" />
            )}
          </div>
          {online ? (
            isPlaying ? (
              <>
                <span className="text-sm text-white">{activity.song}</span>
                <span className="text-xs text-gray-400">
                  {activity.artist}
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-400">Idle</span>
            )
          ) : (
            <span className="text-sm text-gray-400">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
