import usePlayerStore from "@/stores/PlayerStore";
import React, { useEffect } from "react";

const AudioPlayer = () => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const prevSongRef = React.useRef<string | null>(null);
  const { currentSong, isPlaying, playNext, repeat, setAudioRef } =
    usePlayerStore();
  //declare audioRef globally
  useEffect(() => {
    setAudioRef(audioRef);
  }, [setAudioRef]);

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
  }, [currentSong, isPlaying]);

  //handle song end
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      
      if (!audio) return;
      console.log("song ended.");
      if (repeat) {
      audio.onloadedmetadata = null
        audio.src = currentSong?.audioUrl;
        console.log("repeat true");
        audio.currentTime = 0;
        audio.onloadedmetadata=()=>{audio.play();}
      } else {
        console.log("repeat false");
        playNext()
      }
      
    };
      audio?.addEventListener("ended", handleEnded);
    return () => {
      audio?.removeEventListener("ended", handleEnded);
     
    };
  }, [playNext, repeat]);

  //handle song change
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;
    //check if this is new song
    const isSongChange = prevSongRef.current != currentSong?.audioUrl;
    if (isSongChange) {
      //change song in audio element
      audio.onloadedmetadata = null
      audio.src = currentSong?.audioUrl;
      //reset playback
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.audioUrl;
      if (isPlaying) {
         audio.onloadedmetadata=()=>{
           audio.play();
         }
      }
    }
  }, [currentSong, isPlaying]);
  return (
    <>
      <audio
        ref={audioRef}
        src={currentSong?.audioUrl ? currentSong.audioUrl : null}
      />
    </>
  );
};

export default AudioPlayer;
