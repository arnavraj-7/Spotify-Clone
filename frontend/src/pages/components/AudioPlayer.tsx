import usePlayerStore from "@/stores/PlayerStore";
import React, { useEffect } from "react";
import {useUser} from "@clerk/clerk-react";
import useChatStore from "@/stores/ChatStore";

const AudioPlayer = () => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const prevSongRef = React.useRef<string | null>(null);
  const {user}  = useUser();
  const {socket} = useChatStore();
  const { currentSong, isPlaying, playNext, repeat, setAudioRef,setPlaying,queue } =
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
    if(socket==null || user==null)return;
    console.log("updating activities");
    socket.emit("update_activity",{[user.id]:{song:currentSong?.title,artist:currentSong?.artist}});
  }, [currentSong, isPlaying]);

  //handle song end
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      
      console.log("song ended.");
      if (!audio) return;
      if(queue.length==0) {
        console.log("queue is null");
        setPlaying(false);
        return
        }
        playNext()
      
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
      />
    </>
  );
};

export default AudioPlayer;
