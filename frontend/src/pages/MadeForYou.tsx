import TrendingSongCard from "@/pages/cards/TrendingSongCard";
import useSongStore from "@/stores/SongStore";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const MadeForYou = () => {
  const { getToken } = useAuth();
  const fetchMadeforYou = useSongStore((s) => s.fetchMadeforYou);
  const MadeforYouSong = useSongStore((s) => s.MadeforYouSong);
  useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      if (token === null) {
        return;
      }
      fetchMadeforYou(token);
    }
    fetchData();
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
