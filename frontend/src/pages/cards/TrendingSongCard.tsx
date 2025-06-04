import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Song } from "@/types";
import React from "react";

const TrendingSongCard = ({ song }: { song: Song }) => {
  const { title, artist, imageUrl } = song;
  return (
    <div className="p-4 h-65 w-50 flex justify-center hover:bg-zinc-800 transition-all duration-200 hover:rounded-md ease-in-out">
      <div className="flex flex-col gap-y-3">
        <div className="flex-shrink-0 hover:scale-105 transition-all duration-200 ease-out">
          <img
            src={imageUrl}
            alt="CoverImage"
            className="w-40 h-40 object-cover rounded"
          />
        </div>
        <div className="flex flex-col items-start">
        <div className="text-lg font-semibold mb-1">{title}</div>
        <div className="text-gray-400 text-sm font-normal">{artist}</div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSongCard;
