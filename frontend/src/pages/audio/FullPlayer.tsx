import { useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import usePlayerStore from "@/stores/PlayerStore";
import { Minimize2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocationStore } from "@/stores/LocationStore";

const FullPlayer = () => {
  const {prevlocation}= useLocationStore()
  const { currentSong } = usePlayerStore();
  const imgRef = useRef<HTMLImageElement>(null);
  const [bgColor, setBgColor] = useState("rgb(31, 31, 31)");

  useEffect(() => {
    const fac = new FastAverageColor();

    if (imgRef.current) {
      fac.getColorAsync(imgRef.current)
        .then(color => {
          setBgColor(color.rgb);
        })
        .catch((e) => {
          console.error("Error getting color:", e);
        });
        
    }
  }, [currentSong]);
  useEffect(() => {
    console.log(bgColor);
  },[bgColor])

  if (!currentSong) return null;

  return (
    <div
      className="w-full relative h-[calc(100vh-100px)] flex flex-col items-center justify-center transition-all duration-300"
      style={{
        background: `radial-gradient(circle at center, ${bgColor}, #000)`,
        color: "white",
      }}
    > <div className="absolute top-6 right-6">
      <Link to={`${prevlocation}`}>
      <Minimize2Icon/>
      </Link>
      </div>
      <div className="absolute top-6 left-8 text-lg font-bold text-white/90">
        {currentSong.title}
      </div>
      <div className="absolute bottom-6 left-8 text-sm text-white/70">
        {currentSong.artist}
      </div>
      <div className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-xl overflow-hidden shadow-2xl">
        <img
          ref={imgRef}
          crossOrigin="anonymous"
          src={currentSong.imageUrl}
          alt="Album"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default FullPlayer;
