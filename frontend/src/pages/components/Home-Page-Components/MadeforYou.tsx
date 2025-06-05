import { ScrollArea } from "@/components/ui/scroll-area";
import HomeSongCard from "@/pages/cards/HomeSongCard";
import TrendingSongCard from "@/pages/cards/TrendingSongCard";
import useSongStore from "@/stores/SongStore";
import { ScrollAreaScrollbar, Scrollbar } from "@radix-ui/react-scroll-area";
import { Key } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { shallow } from "zustand/shallow";
const MadeforYou = () => {
  const { fetchMadeforYou, MadeforYouSong } = useSongStore();
  useEffect(() => {
    if (MadeforYouSong == null || MadeforYouSong.length === 0) {
      fetchMadeforYou();
    }

  }, []);
  return (
    <>
      <div className=" mx-4 flex justify-between items-center">
        <div className="text-2xl ml-3 mt-6 font-bold">Made for You</div>
        <div className="text-sm font-semibold text-zinc-700 hover:text-zinc-500 transition-all duration-150 ease-in ">
          <Link to="/made-for-you"> Show All</Link>
        </div>
      </div>
      <ScrollArea className="w-full whitespace-nowrap overflow-x h-75 px-2 my-0 py-0">
        <div className="flex space-x-4">
          {MadeforYouSong
            ? MadeforYouSong.map((song) => {
                return (
                  <Link to={song._id} key={song._id}>
                    <TrendingSongCard song={song} />
                  </Link>
                );
              })
            : ""}
          <Scrollbar orientation="horizontal" />
        </div>
      </ScrollArea>
    </>
  );
};

export default MadeforYou;
