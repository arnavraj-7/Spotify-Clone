import { Button } from '@/components/ui/button'
import { Music } from 'lucide-react'
import  { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAdminStore } from '@/stores/AdminStore'
import { SongCard_admin } from './SongCard_admin'
import SongSkeleton from '@/skeletons/SongSkeleton'
const Songs = () => {
    const {songs,getAllSongs,isLoading}=useAdminStore();

  return (<>
    <div className='flex flex-row justify-between mt-4'>
        <div className='flex flex-col'>
        <div className='flex flex-rows gap-x-3 text-xl items-center'><Music className="text-green-600" size={30}/>Song Library</div>
<div className='font-normal text-gray-500 text-sm mt-1 mb-4'>Manage your music tracks</div>
        </div>
        <Button>
            <Link to="admin/addsong" className='flex flex-row gap-x-2 items-center'><Music size={10}/>Add Song</Link>
        </Button>
    </div>
    <div>
    {songs.map((song,index)=>{return (
      isLoading?<SongSkeleton/>:<SongCard_admin song={song} rank={index+1} isPlaying={false} key={song._id}/>)})}
    </div>
  </>
  )
}

export default Songs