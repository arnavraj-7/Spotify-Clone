import useMusicStore from "@/stores/AlbumStore.ts";
import { Clock3, PlayCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import SongCard from "./cards/SongCard.tsx";
import { Link, useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import SongSkeleton from "@/skeletons/SongSkeleton";

const AlbumPage = () => {
  const id: string = useParams().id;

  const { fetchAlbumbyId, currentAlbum, isLoadingSingleAlbum } =
    useMusicStore();
  console.log("mounted");
  useEffect(() => {
    fetchAlbumbyId(id);
  }, [id]);

  return (
    <div className="h-[calc(100%-320px)] w-full rounded-t-md ">
      <div className="bg-gradient-to-b from-purple-900  to-zinc-900 p-6 h-60 rounded-t-md">
        <div className="flex flex-row max-w-auto gap-x-3 items-end">
          <div className="flex-shrink-0">
            <img
              src={currentAlbum?.imageUrl}
              alt="CoverImage"
              className="w-40 h-40 object-cover rounded"
            />
          </div>
          <div className="flex flex-col justify-center gap-y-3">
            <div className="text-md">Album</div>
            <div className="text-md font-bold text-5xl">
              {currentAlbum?.title}
            </div>
            <div className="text-gray-400 text-sm flex gap-x-2">
              <span className="font-semibold text-md text-white">
                Various Artists
              </span>
              <span className="">• {currentAlbum?.songs?.length}</span>
              <span className="">• {currentAlbum?.releaseYear}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 h-full rounded-b-md">
        <div className="ml-6 mb-4">
          <PlayCircle size={50} className="text-green-500" />
        </div>
        <div className="flex justify-between px-6 text-gray-400 w-full mb-2">
          <div className="flex">
            <div className="ml-2">#</div>
            <div className="ml-4 ">Title</div>
          </div>
          <div className="flex">
            <div className="mr-30 ">
              <Clock3 size={20} />
            </div>
            <div className="mr-0 ">Released on</div>
          </div>
        </div>
        <hr className=" w-[calc(100%-32px)] flex justify-center mx-auto mb-5" />

        <div className="px-4 h-full">
          <ScrollArea className="h-[calc(100vh-400px)]">
            {currentAlbum?.songs?.map((song, index) => {
              const rank = index + 1;
              if (typeof song === "string") return null;

              return isLoadingSingleAlbum ? (
                Array.from({ length: 5 }).map(() => {
                  return <SongSkeleton />;
                })
              ) : (
                <Link to={`/song/${song._id}`}>
                  <SongCard song={song} rank={rank} />
                </Link>
              );
            })}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
