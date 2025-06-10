import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TrendingSongCard from "@/pages/cards/TrendingSongCard";
import useSongStore from "@/stores/SongStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Trending = () => {
  const { fetchTrendingSong, TrendingSong } = useSongStore();

  useEffect(() => {
    if (TrendingSong == null || TrendingSong.length === 0) {
      fetchTrendingSong();
    }
  }, []);

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl font-bold tracking-tight hover:underline transition-all duration-200">
          Trending
        </h2>
        <Link
          to="/trending"
          className="text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-200 hover:underline"
        >
          Show All
        </Link>
      </div>

      {/* Horizontal Scroll Container */}
      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4">
          {Array.isArray(TrendingSong) && TrendingSong
            ? TrendingSong.map((song, index) => {
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
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>
    </div>
  );
};

export default Trending;  