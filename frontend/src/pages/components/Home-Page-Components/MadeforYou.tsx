import { ScrollArea } from "@/components/ui/scroll-area";
import TrendingSongCard from "@/pages/cards/TrendingSongCard";
import useSongStore from "@/stores/SongStore";
import { useAuth } from "@clerk/clerk-react";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const MadeforYou = () => {
  const { getToken } = useAuth();
  const { fetchMadeforYou, MadeforYouSong } = useSongStore();
  useEffect(() => {
    async function fetchData() {
      if (MadeforYouSong.length > 0) return;
      const token = await getToken();
      if (token === null) {
        return;
      }
      console.log("fired fetchmadefrou");
      fetchMadeforYou(token);
    }
    fetchData();
  }, [MadeforYouSong.length]);
  return (
    <>
      <div className="md:mx-4 flex justify-between items-center ml-5 mb-4 mt-6 ">
        <div className="text-xl md:text-2xl font-bold">Made for You</div>
          <Link to="/made-for-you"> 
        <div className="text-sm font-semibold text-zinc-700 hover:text-zinc-500 transition-all duration-150 ease-in ">
          Show All
        </div>
          </Link>
      </div>
      <ScrollArea className="w-full whitespace-nowrap overflow-x h-75  md:px-2 my-0 py-0">
        <div className="flex md:space-x-4">
          {MadeforYouSong
            ? MadeforYouSong.map((song) => {
                return <TrendingSongCard song={song} key={song._id} />;
              })
            : ""}
          <Scrollbar orientation="horizontal" />
        </div>
      </ScrollArea>
    </>
  );
};

export default MadeforYou;
