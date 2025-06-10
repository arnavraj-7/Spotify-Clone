import useAlbumStore from "@/stores/AlbumStore.ts";
import { Clock3, Pause, Play } from "lucide-react";
import  { useEffect } from "react";
import {SongCard} from "../cards/SongCard.tsx";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import SongSkeleton from "@/skeletons/SongSkeleton";
import usePlayerStore from "@/stores/PlayerStore.ts";
import { Button } from "@/components/ui/button.tsx";

const AlbumPage = () => {
  const id: string | undefined = useParams().id;
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  const { fetchAlbumbyId, currentAlbum, isLoadingSingleAlbum } =
    useAlbumStore();

  const handlePlayAlbum = () => {
    if (!currentAlbum?.songs) return;

    if (currentAlbum?.songs.some((song) => song._id === currentSong?._id)) {
      togglePlay();
    } else {
      playAlbum(currentAlbum?.songs, 0);
    }
  };
  const handlePlaySong = (index: number) => {
    if (
      !Array.isArray(currentAlbum?.songs) ||
      typeof currentAlbum.songs[0] === "string"
    )
      return;

    if (typeof currentAlbum.songs === "string") return;
    playAlbum(currentAlbum.songs || [], index);
  };
  useEffect(() => {
    if(!id)return;
    fetchAlbumbyId(id);
  }, [id,fetchAlbumbyId]);
  if(currentAlbum?.songs==undefined)return(<div></div>)
  return (
    <div className="h-[calc(100%-100px)] w-full ">
      <div className="bg-gradient-to-b from-purple-900  to-zinc-900 p-6 h-60 rounded-t-md">
        <div className="flex flex-row max-w-auto gap-x-3 items-end">
          <div className="flex-shrink-0">
            <img
              src={currentAlbum?.imageUrl}
              alt="CoverImage"
              className="w-35 h-35 md:w-40 md:h-40 object-cover rounded"
            />
          </div>
          <div className="flex flex-col justify-center gap-y-2 md:gap-y-3">
            <div className="text-md">Album</div>
            <div className="text-md font-bold text-4xl md:text-5xl">
              {currentAlbum?.title}
            </div>
            <div className="text-gray-400 text-[12px] flex md:gap-x-2">
              <span className="font-semibold md:text-md text-white">
                {currentAlbum?.artist}
              </span>
              <span className="">• {currentAlbum?.songs?.length}</span>
              <span className="">• {currentAlbum?.releaseYear}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 h-full rounded-b-md">
        <div className="ml-6 mb-4">
          <Button
            onClick={() => {
              handlePlayAlbum();
            }}
            size={"icon"}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all duration-200 ease-in-out"
          >
            {isPlaying &&
            currentAlbum?.songs.some(
              (song) => song._id === currentSong?._id
            ) ? (
              <Pause size={100} className="text-black h-7 w-7" />
            ) : (
              <Play size={100} className="text-black h-7 w-7" />
            )}{" "}
          </Button>
        </div>
        <div className="flex justify-between px-6 text-gray-400 w-full mb-2">
          <div className="flex">
            <div className="ml-2">#</div>
            <div className="ml-4 ">Title</div>
          </div>
          <div className="flex">
            <div className="mr-0 md:mr-30">
              <Clock3 size={20} />
            </div>
            <div className="mr-0 md:block hidden">Released on</div>
          </div>
        </div>
        <hr className=" w-[calc(100%-32px)] flex justify-center mx-auto mb-5" />

        <div className="px-4 h-full">
          <ScrollArea className="h-[calc(100vh-500px)]">
            {currentAlbum?.songs?.map((song, index) => {
              if (typeof song === "string") return null;
              const isCurrentSong = song._id === currentSong?._id;
              const rank = index + 1;

              return isLoadingSingleAlbum ? (
                Array.from({ length: 5 }).map(() => {
                  return <SongSkeleton />;
                })
              ) : (
                <div key={song._id} onClick={() => handlePlaySong(index)}>
                  <SongCard
                    song={song}
                    rank={rank}
                    isPlaying={isCurrentSong && isPlaying}
                  />
                </div>
              );
            })}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
