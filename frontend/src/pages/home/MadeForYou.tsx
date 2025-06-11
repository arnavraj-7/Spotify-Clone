import TrendingSongCard from "@/pages/cards/TrendingSongCard";
import useSongStore from "@/stores/SongStore";
import { Link } from "react-router-dom";
const MadeForYou = () => {

  const MadeforYouSong = useSongStore((s) => s.MadeforYouSong);

  return (
    <>
      <div className="flex flex-col justify-center  bg-gradient-to-b from-zinc-800 to zinc-900">
        <div className=" mx-4 flexitems-center">
          <div className="text-2xl my-5 font-bold">Made for You</div>
        </div>

        <div className=" space-x-4 grid grid-cols-3">
          {Array.isArray(MadeforYouSong) && MadeforYouSong
            ? MadeforYouSong.map((song) => {
                return (
                 
                    <TrendingSongCard song={song} />
                
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default MadeForYou;
