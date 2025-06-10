import HomeSongCard from "@/pages/cards/HomeSongCard";
import useSongStore from "@/stores/SongStore";
import { useEffect } from "react";

const Featured = () => {
  const { fetchFeaturedSong, featuredSong } = useSongStore();

  useEffect(() => {
   if (!Array.isArray(featuredSong) || featuredSong.length === 0) {
  fetchFeaturedSong();
}
  }, []);

  useEffect(() => {
    console.log(featuredSong);
  }, [featuredSong]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(featuredSong) 
          ? featuredSong.map((song, index) => {
              return (
                <div
                  key={song.id || index}
                  className="animate-scaleIn opacity-0"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <HomeSongCard song={song} />
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Featured;