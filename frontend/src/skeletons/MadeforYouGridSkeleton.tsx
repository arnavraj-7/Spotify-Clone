const MadeforYouGridSkeleton = () => {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
			{Array.from({ length: 4 }).map((_, i) => (
				<div key={i} className='flex flex-col items-center gap-y-4 p-4 bg-zinc-800/50 rounded-md animate-pulse w-full'>
					<div className='w-40 h-40 rounded-md bg-zinc-700 flex-shrink-0' />
					<div className='flex-1 w-full flex flex-col items-start'>
						<div className='h-4 ml-3 bg-zinc-700 rounded w-20 ' />
					</div>
				</div>
			))}
		</div>
	);
};
export default MadeforYouGridSkeleton;