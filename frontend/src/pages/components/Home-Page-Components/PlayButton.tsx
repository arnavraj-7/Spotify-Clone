import { Button } from '@/components/ui/button';
import usePlayerStore from '@/stores/PlayerStore';
import type { Song } from '@/types'
import { Pause, PauseIcon, PlayIcon } from 'lucide-react';
import React from 'react'

const PlayButton = ({song}:{song:Song}) => {
    const {isPlaying,currentSong,setCurrentsong,togglePlay} = usePlayerStore();
  return (
<Button className='w-8 h-8 bg-green-500 hover:bg-green-500 cursor-pointer' size={"icon"} onClick={()=>{
    if(isPlaying&&currentSong?._id===song._id){
        togglePlay()
        return
    }
    setCurrentsong(song)
    console.log("song clicked",song)
}
    }>
    {!isPlaying?<PlayIcon className='w-8 h-8 \' size={100} />:<PauseIcon className='w-8 h-8' size={100} />}
</Button>
)
}

export default PlayButton