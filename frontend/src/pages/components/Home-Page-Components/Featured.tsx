import HomeSongCard from "@/pages/cards/HomeSongCard";
import useSongStore from "@/stores/SongStore";
import React, { useEffect } from "react";
import {shallow} from "zustand/shallow";const Featured = () => {
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
    <div className="grid grid-cols-2 sm:grid-col-1 md:grid-cols-3 gap-x-4 gap-y-4 w-full">
      {featuredSong
        ? featuredSong.map((song) => {
            return <HomeSongCard song={song} key={song._id} />;
          })
        : ""}
    </div>
  );
};

export default Featured;
