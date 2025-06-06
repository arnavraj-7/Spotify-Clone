import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/stores/AdminStore";
import type { Song } from "@/types/index.js";
import { useAuth } from "@clerk/clerk-react";
import { Trash } from "lucide-react";

const SongCard_admin = ({ song, rank,isPlaying }: { song: Song, rank: number,}) => {
  const {getToken } = useAuth();
    const {deleteSong,}=useAdminStore();
   const handleDuration = (duration: number): string => {
    if (duration < 60) {
      return "0:" + String(duration);
    } else {
      return String(Math.floor(duration / 60)) + ":" + ((duration%60)>10?String(duration % 60):"0"+String(duration % 60));
    }
  };
  return (
    <div
      className={cn(
        "h-15 px-2 mb-3",
        buttonVariants({
          variant: "ghost",
          className:
            " w-full h-15 justify-start hover:bg-zinc-800 hover:rounded-md",
        })
      )}
    >
      <div className="flex justify-between w-full">
        {/* song group */}
        <div className="flex flex-row  items-center ">
          <div className="flex items-center">
            <div>
              <div className="w-6 flex items-center mr-4">
               <span className="font-normal text-gray-400">{rank}</span>
              </div>
            </div>
            <div className="mr-3">
              <img
                src={song.imageUrl}
                alt="CoverImage"
                className="w-12 h-12 object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-y-1 ml-1">
              <div className="text-[16px] font-semibold">{song.title}</div>
              <div className="text-gray-400 text-[14px] font-normal">
                {song.artist}
              </div>
            </div>
          </div>
        </div>
        {/* stats group */}
        <div className="flex items-center">
          <div className="text-gray-400 text-[14px] mr-35">
            {handleDuration(song.duration)}
          </div>
          <div className=" text-gray-400 text-[14px]">
            {new Date(song.createdAt || 0).toLocaleDateString()}
          </div>
          <div className="ml-5">
            <Button className="text-red-400 bg-zinc-800 hover:bg-red-500 hover:text-white transition-all duration-200 ease-in-out" 
            onClick={async()=>{
              const token =await getToken();
              if(token===null) return;

                deleteSong(song._id,token)
            }}>
                
                <Trash size={20} />
                </Button></div>
        </div>
      </div>
    </div>
  );
};

export { SongCard_admin};
