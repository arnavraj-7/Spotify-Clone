import { ScrollArea } from "@/components/ui/scroll-area";
import HomeSongCard from "@/pages/cards/HomeSongCard";
import TrendingSongCard from "@/pages/cards/TrendingSongCard";
import useSongStore from "@/stores/SongStore";
import { ScrollAreaScrollbar, Scrollbar } from "@radix-ui/react-scroll-area";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {shallow} from "zustand/shallow";
const MadeForYou = () => {
  const { fetchMadeforYou, MadeforYouSong } = useSongStore();
  useEffect(() => {
    if (!MadeforYouSong) {
      fetchMadeforYou();
    }
  }, []);
  return (
    <>
    <div className="flex flex-col justify-center  bg-gradient-to-b from-zinc-800 to zinc-900">
      <div className=" mx-4 flexitems-center">
        <div className="text-2xl my-5 font-bold">Made for You</div>
      </div>

      <div className=" space-x-4 grid grid-cols-3">
        {MadeforYouSong
          ? MadeforYouSong.map((song) => {
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

export default MadeForYou;
