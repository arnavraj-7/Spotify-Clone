import type { Song } from "@/types";
import PlayButton from "../components/Home-Page-Components/PlayButton";

const TrendingSongCard = ({ song }: { song: Song }) => {
  const { title, artist, imageUrl } = song;
  return (
    <div className="md:p-4 h-65 w-50 flex justify-center hover:bg-zinc-800 transition-all duration-200 hover:rounded-md ease-in-out relative group">
      <div className="flex flex-col gap-y-3 ">
        <div className="flex-shrink-0 hover:scale-105 group-hover:scale-110 transition-all duration-200 ease-out">
          <img
            src={imageUrl}
            alt="CoverImage"
            className="w-35 h-35 md:w-40 md:h-40 object-cover rounded"
          />
        </div>
        <div className="flex flex-col items-start">
        <div className="text-lg font-semibold mb-1">{title}</div>
        <div className="text-gray-400 text-sm font-normal">{artist}</div>
        </div>
          <div className="absolute bottom-0 right-0 hidden group-hover:inline bg-green-500 rounded-md text-gray-600 text-sm ">
        <PlayButton song={song} />
      </div>
      </div>
    </div>
  );
};

export default TrendingSongCard;
