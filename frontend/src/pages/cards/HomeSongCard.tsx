import type { Song } from "@/types";
import PlayButton from "../components/Home-Page-Components/PlayButton";
import { Pause, PauseIcon } from "lucide-react";
import usePlayerStore from "@/stores/PlayerStore";

const HomeSongCard = ({ song }: { song: Song }) => {
  const { title, artist, imageUrl } = song;
  const { currentSong } = usePlayerStore();
  const isCurrentSong = currentSong?._id === song._id;
  return (
    <div className="h-18 hover:bg-zinc-900 transition-all duration-150 ease-in-out hover:rounded-md relative group">
      <div
        className={"flex p-0 w-full h-full justify-start gap-x-1 md:gap-x-5 items-center"}
      >
        <div className="flex-shrink-0">
          <img
            src={imageUrl}
            alt="CoverImage"
            className="w-13 h-13  md:w-18 md:h-18 object-cover rounded"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-sm md:text-lg font-semibold">{title}</div>
          <div className="text-gray-400 text-sm font-normal">{artist}</div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 hidden group-hover:inline bg-green-500 rounded-md text-gray-600 text-sm ">
        <PlayButton song={song} />
      </div>
    </div>
  );
};

export default HomeSongCard;
