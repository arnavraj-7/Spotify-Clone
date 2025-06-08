import HomeSongCard from "@/pages/cards/HomeSongCard";
import useSongStore from "@/stores/SongStore";
import { useEffect } from "react";
const Featured = () => {
  const { fetchFeaturedSong, featuredSong } = useSongStore();
  useEffect(() => {
    if(featuredSong.length==0 || featuredSong==null){
      fetchFeaturedSong();
    }
    
  }, []);
useEffect(()=>{
  console.log(featuredSong);
},[featuredSong])
  return (
    <div className="grid grid-cols-2 ml-2 md:grid-cols-3 md:gap-x-4 gap-x-2 gap-y-2 md:gap-y-4 w-full">
      {featuredSong
        ? featuredSong.map((song) => {
            return <HomeSongCard song={song} key={song._id} />;
          })
        : ""}
    </div>
  );
};

export default Featured;
