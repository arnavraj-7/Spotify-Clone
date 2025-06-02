const PlaylistCardSkeleton = () => {
  return (
     <div>
      <div className="flex flex-row max-w-auto h-auto gap-x-3 items-center">
        <div className="flex-shrink-0">
          <div className='h-12 w-12 rounded-md animate-pulse bg-gray-600'></div>
        </div>
        <div className="flex flex-col justify-center gap-y-2">
          <div className="bg-gray-600 w-40 h-5 rounded animate-pulse"></div>
          <div className="bg-gray-600 rounded w-30 h-3 animate-pulse"> </div>
        </div>
      </div>
    </div>
  )
}

export default PlaylistCardSkeleton