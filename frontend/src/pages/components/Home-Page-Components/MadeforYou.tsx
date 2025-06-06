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
        const token = await getToken();
        if (token === null) {
          return;
        }
  console.log("fired fetchmadefrou");        
        fetchMadeforYou(token);
      }
      fetchData();
 
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
