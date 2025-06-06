import { Button } from '@/components/ui/button'
import { Music } from 'lucide-react'
import  { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAdminStore } from '@/stores/AdminStore'
import SongSkeleton from '@/skeletons/SongSkeleton'
import { AlbumCard_admin } from './AlbumCard_admin'
import AddAlbumDialog from './AddAlbumForm'
const Albums = () => {
    const {albums,getAllAlbums,isLoading}=useAdminStore();

  return (<>
    <div className='flex flex-row justify-between mt-4'>
        <div className='flex flex-col'>
        <div className='flex flex-rows gap-x-3 text-xl items-center'><Music className="text-green-600" size={30}/>Album Library</div>
<div className='font-normal text-gray-500 text-sm mt-1 mb-4'>Manage your albums</div>
        </div>
        <AddAlbumDialog/>
    </div>
    <div>
    {albums.map((album,index)=>{return (
      isLoading?<SongSkeleton/>:<AlbumCard_admin album={album} rank={index+1} isPlaying={false} key={album._id}/>)})}
    </div>
  </>
  )
}

export default Albums