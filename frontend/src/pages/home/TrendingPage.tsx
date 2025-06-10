import TrendingSongCard from "@/pages/cards/TrendingSongCard";
import useSongStore from "@/stores/SongStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const TrendingPage = () => {
  const { fetchTrendingSong, TrendingSong, } = useSongStore();
  useEffect(() => {
    if (!TrendingSong) {
      fetchTrendingSong();
    }
  
  }, [fetchTrendingSong]);
  return (
    <>
    <div className="flex flex-col justify-center  bg-gradient-to-b from-zinc-800 to zinc-900">
      <div className=" mx-4 flex items-center">
        <div className="text-2xl mb-3 font-bold">Trending</div>
      </div>

      <div className="md:gap-x-2 grid grid-cols-2 md:grid-cols-3">
        {Array.isArray(TrendingSong) && TrendingSong
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

export default TrendingPage;
