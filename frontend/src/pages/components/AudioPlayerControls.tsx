import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";
import usePlayerStore from "@/stores/PlayerStore";
import {
  ListMusic,
  Maximize2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useState } from "react";

const AudioPlayerControls = () => {
  const {
    isPlaying,
    playNext,
    playPrev,
    togglePlay,
    currentSong,
    setRepeat,
    repeat,
    audioRef,
  } = usePlayerStore();
  const [volume, setVolume] = useState(75);
  const [currenttime, setCurrenttime] = useState(0);
  const [duration, setDuration] = useState(0);
  const handleDuration = (duration: number | null): string => {
    if (!duration) return "";
    if (duration < 60) {
      if (duration < 10) return "0:0" + String(duration);
      return "0:" + String(duration);
    } else {
      return (
        String(Math.floor(duration / 60)) +
        ":" +
        (duration % 60 > 10
          ? String(duration % 60)
          : "0" + String(duration % 60))
      );
    }
  };
  const handleSeek = (value: number[]) => {
    if(audioRef == null) return ;
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  useEffect(() => {
    if(audioRef == null) return ;
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrenttime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef]);
  return (
    <footer className="h-30  sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        {/* currently playing song */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate hover:underline cursor-pointer">
                  {currentSong.title}
                </div>
                <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* player controls*/}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size="icon"
              variant="ghost"
              className="hidden  hover:text-white text-zinc-400 "
            >
              <Shuffle className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
              onClick={playPrev}
              disabled={!currentSong}
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              className="bg-white hover:bg-white/80 text-black rounded-full h-8 w-8"
              onClick={togglePlay}
              disabled={!currentSong}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
              onClick={playNext}
              disabled={!currentSong}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className={` hover:text-white text-zinc-400 ${
                repeat ? "bg-green-700 text-white" : ""
              }`}
              onClick={() => {
                console.log("repeat clicked");
                setRepeat();
              }}
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          <div className="hidden sm:flex items-center gap-2 w-full">
            <div className="text-xs text-zinc-400">
              {handleDuration(Math.floor(currenttime))}
            </div>
            <Slider
              value={[currenttime]}
              max={duration || 100}
              step={1}
              className="w-full hover:cursor-grab active:cursor-grabbing"
              onValueChange={(value) => {
                handleSeek(value);
              }}
            />
            <div className="text-xs text-zinc-400">
              {currentSong?handleDuration(currentSong.duration):""}
            </div>
          </div>
        </div>

        {/* volume controls */}
        {/* icons for queues and other things */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
          <Button
            size="icon"
            variant="ghost"
            className={`hover:text-white text-zinc-400 ${
              !currentSong && "hidden"
            }`}
          >
            <Link to={`song-player`}>
              <Maximize2 className={`h-4 w-4 ${!currentSong && "hidden"}`} />
            </Link>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400 hidden"
          >
            <ListMusic className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
              onClick={() => {
                if (!audioRef) return;
                if (audioRef.current.volume > 0) {
                  audioRef.current.volume = 0;
                } else {
                  audioRef.current.volume = volume / 100;
                }
              }}
            >
              {audioRef && audioRef?.current?.volume > 0 ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </Button>

            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-24 hover:cursor-grab active:cursor-grabbing"
              onValueChange={(value) => {
                setVolume(value[0]);
                if(!audioRef) return;
                if (audioRef.current) {
                  audioRef.current.volume = value[0] / 100;
                }
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AudioPlayerControls;
