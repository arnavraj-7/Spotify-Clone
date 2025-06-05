import { HomeIcon, Library, MessageCircleMore } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PlaylistCard from "../cards/PlaylistCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistCardSkeleton from "@/skeletons/PlaylistCardSkeleton";
import { SignedIn } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import useMusicStore from "@/stores/MusicStore";
const LeftSideBar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();
  useEffect(() => {
    fetchAlbums();
  }, []);
  return (
    <div className="flex flex-col gap-y-3 w-full h-[calc(100vh-104px)]">
      {/* Navigation */}
      <div className="flex flex-col gap-y-4 bg-zinc-900 w-full p-4 rounded-md">
        <Link
          to="/"
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: "w-full justify-start hover:bg-zinc-800",
            })
          )}
        >
          <div className="flex gap-x-2 items-center">
            <HomeIcon size={20} />
            <span className="md:inline hidden">Home</span>
          </div>
        </Link>
        <SignedIn>
          <Link
            to={"/chat"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start hover:bg-zinc-800",
              })
            )}
          >
            <div className="flex gap-x-2 items-center">
              <MessageCircleMore size={20} />
              <span className="md:inline hidden">Message</span>
            </div>
          </Link>
        </SignedIn>
      </div>

      {/* Library */}
      <div className="bg-zinc-900 rounded-md">
        <div className="flex flex-row justify-start items-center p-4">
          <div>
            <Library size={20} />
          </div>
          <div>
            <span className="ml-4 md:inline hidden">Playlists</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="flex flex-col gap-y-4 rounded-md px-4 pt-2">
            {albums.map((item) => {
              return (
                <Link
                  to={`/album/${item._id || Math.random()}`}
                  key={item._id || Math.random()}
                >
                  {isLoading ? (
                    <PlaylistCardSkeleton />
                  ) : (
                    <PlaylistCard item={item} />
                  )}
                </Link>
              );
            })}
            {albums.map((item) => {
              return (
                <Link
                  to={`/album/${item._id || Math.random()}`}
                  key={item._id || Math.random()}
                >
                  {isLoading ? (
                    <PlaylistCardSkeleton />
                  ) : (
                    <PlaylistCard item={item} />
                  )}
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSideBar;
