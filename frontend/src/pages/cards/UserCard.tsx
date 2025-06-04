import { Music } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { User } from "@/types";

const UserCard = ({ user }: { user: User }) => {
  const [isPlaying, setIsPlaying] = useState(true); // toggle for demo

  const songTitle = "Neon Tokyo";
  const artist = "Future Pulse";

  const [firstName, lastName] = [user.firstName,user.lastName];

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
        <Avatar>
          <AvatarFallback>
            {firstName?.[0]}
            {lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-medium text-white">{user.firstName+" "+user.lastName}</span>
            {isPlaying && (
              <Music
                size={16}
                className="text-green-400 animate-bounce"
              />
            )}
          </div>
          {isPlaying ? (
            <>
              <span className="text-sm text-white">{songTitle}</span>
              <span className="text-xs text-gray-400">{artist}</span>
            </>
          ) : (
            <span className="text-sm text-gray-400">Idle</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
