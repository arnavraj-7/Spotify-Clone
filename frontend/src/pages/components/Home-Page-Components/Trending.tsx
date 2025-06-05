import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import HomeSongCard from "@/pages/cards/HomeSongCard";
import TrendingSongCard from "@/pages/cards/TrendingSongCard";
import useSongStore from "@/stores/SongStore";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {shallow} from "zustand/shallow";
const Trending = () => {
  const { fetchTrendingSong, TrendingSong, } = useSongStore()
  useEffect(() => {
     if (TrendingSong == null || TrendingSong.length === 0) {
      fetchTrendingSong();
    }
   
  }, []);
  return (
   <>
      <div className=" mx-4 flex justify-between items-cente">
        <div className="text-2xl ml-3 font-bold">Trending</div>
        <div className="text-sm font-semibold text-zinc-700 hover:text-zinc-500 transition-all duration-150 ease-in ">
          <Link to="/trending"> Show All</Link>
        </div>
      </div>
      <ScrollArea className="w-full whitespace-nowrap h-75 px-2">
        <div className="flex space-x-4">
          {TrendingSong
            ? TrendingSong.map((song) => {
                return (
                  <Link to={song._id} key={song._id}>
                    <TrendingSongCard song={song} />
                  </Link>
                );
              })
            : ""}
          <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>
    </>
  );
};

export default Trending;
