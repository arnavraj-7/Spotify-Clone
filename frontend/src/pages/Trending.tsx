import { ScrollArea } from "@/components/ui/scroll-area";
import HomeSongCard from "@/pages/cards/HomeSongCard";
import TrendingSongCard from "@/pages/cards/TrendingSongCard";
import useSongStore from "@/stores/SongStore";
import { ScrollAreaScrollbar, Scrollbar } from "@radix-ui/react-scroll-area";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {shallow} from "zustand/shallow";

const Trending = () => {
  const { fetchTrendingSong, TrendingSong, } = useSongStore();
  useEffect(() => {
    if (!TrendingSong) {
      fetchTrendingSong();
    }
  
  }, []);
  return (
    <>
    <div className="flex flex-col justify-center  bg-gradient-to-b from-zinc-800 to zinc-900">
      <div className=" mx-4 flex items-center">
        <div className="text-2xl font-bold">Trending</div>
      </div>

      <div className=" space-x-4 grid grid-cols-3">
        {TrendingSong
          ? TrendingSong.map((song) => {
              return (
                <Link to={song._id} key={song._id}>
                  <TrendingSongCard song={song} />
                </Link>
              );
            })
          : ""}
      </div>
    </div>
    </>
  );
};

export default Trending;
