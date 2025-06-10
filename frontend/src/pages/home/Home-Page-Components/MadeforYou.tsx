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
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl font-bold tracking-tight hover:underline transition-all duration-200">
          Made for You
        </h2>
        <Link
          to="/made-for-you"
          className="text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-200 hover:underline"
        >
          Show All
        </Link>
      </div>

      {/* Horizontal Scroll Container */}
      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4">
          {MadeforYouSong
            ? MadeforYouSong.map((song, index) => {
                return (
                  <div
                    key={song.id || index}
                    className="flex-shrink-0 w-48 animate-slideInRight opacity-0"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <TrendingSongCard song={song} />
                  </div>
                );
              })
            : ""}
        </div>
        <Scrollbar orientation="horizontal" className="h-2" />
      </ScrollArea>
    </div>
  );
};

export default MadeforYou;