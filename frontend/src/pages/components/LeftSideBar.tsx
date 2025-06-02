import {
  GalleryVerticalEnd,
  HomeIcon,
  Library,
  MessageCircleMore,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import PlaylistCard from "../cards/PlaylistCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistCardSkeleton from "@/skeletons/PlaylistCardSkeleton";
import { SignedIn } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const LeftSideBar = () => {
  const isLoading = true;
  const playlist: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="flex flex-col gap-y-3 w-full">
      {/* Navigation */}
      <div className="flex flex-col gap-y-4 bg-zinc-900 w-full p-4 rounded-md">
        <Link to="/"
        className={cn(buttonVariants({
            variant: "ghost",
            className:"w-full justify-start hover:bg-zinc-800"
        }))}
        >
        <div className="flex gap-x-2 items-center">
          <HomeIcon size={20} />
          <span className="md:inline hidden">Home</span>
        </div>
        </Link>
        <SignedIn>
            <Link to={"/chat"} className={cn(buttonVariants({
                variant: "ghost",
                className:"w-full justify-start hover:bg-zinc-800"
            }))}>
                <div className="flex gap-x-2 items-center">
          <MessageCircleMore size={20} />
          <span className="md:inline hidden">Message</span>
        </div>
            </Link>
        </SignedIn>
      </div>

      {/* Library */}
      <div>
        <ScrollArea className="h-[calc(100vh-200px)] gap-y-4">
          <div className="flex flex-col gap-y-5 bg-zinc-900 rounded-md pl-4 pt-2 pb-4 h-auto ">
            <div className="flex flex-row gap-x-2">
              <Library size={20} />
              Playlists
            </div>

            {playlist.map((item) => {
              return (
                <>{isLoading ? <PlaylistCardSkeleton /> : <PlaylistCard />}</>
              );
            })}
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSideBar;
