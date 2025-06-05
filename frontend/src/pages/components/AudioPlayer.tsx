import usePlayerStore from "@/stores/PlayerStore";
import React, { useEffect } from "react";

const AudioPlayer = () => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const prevSongRef = React.useRef<string | null>(null);
  const { currentSong, isPlaying, playNext, playPrev } = usePlayerStore();

  //handle play/pause logic

  useEffect(() => {
    async function tryPlay() {
      try {
        if (isPlaying) {
          await audioRef.current?.play();
        } else {
          audioRef.current?.pause();
        }
      } catch (error) {
        console.log(error);
      }
    }
    tryPlay();
  }, [isPlaying]);

  //handle song end
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
        console.log("song ended.");
      playNext();
    };
    audio?.addEventListener("ended", handleEnded);
    return () => {
      audio?.removeEventListener("ended", handleEnded);
    };
  }, [ playNext]);

  //handle song change
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;
    //check if this is new song
    const isSongChange = prevSongRef.current != currentSong?.audioUrl;
    if (isSongChange) {
      //change song in audio element
      audio.src = currentSong?.audioUrl;
      //reset playback
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.audioUrl;
      if (isPlaying) {
        audio.play();
      }
    }
  }, [currentSong, isPlaying]);
  return <audio ref={audioRef} src={currentSong?.audioUrl?currentSong.audioUrl:null} />;
};

export default AudioPlayer;
