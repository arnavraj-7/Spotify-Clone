import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Song } from '@/types'
import React from 'react'

const HomeSongCard = ({song}:{song:Song}) => {
    const {title, artist, imageUrl} = song;
  return (
    <div className="h-18 hover:bg-zinc-900 transition-all duration-150 ease-in-out hover:rounded-md">
      <div className={"flex p-0 w-full h-full justify-start gap-x-5 items-center"}>
        <div className="flex-shrink-0">
          <img
            src={imageUrl}
            alt="CoverImage"
            className="w-18 h-18 object-cover rounded"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-gray-400 text-sm font-normal">{artist}</div>
        </div>
      </div>
    </div>
  )
}

export default HomeSongCard