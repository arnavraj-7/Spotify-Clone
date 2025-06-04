import React, { useEffect } from 'react'

const AudioPlayer = () => {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const prevSongRef = React.useRef<string | null>(null);
    const {currentSong,isPlaying} = usePlayerStore();

    //handle play/pause logic

    useEffect(()=>{
        if(isPlaying){
            audioRef.current?.play();
        }else{
            audioRef.current?.pause();
        }
    },[isPlaying]); 
  return (
    <div>AudioPlayer</div>
  )
}

export default AudioPlayer