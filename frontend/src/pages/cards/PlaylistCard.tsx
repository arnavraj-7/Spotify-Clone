const PlaylistCard = () => {
  const title: string = "New York";
  const imgUrl: string =
    "https://images.unsplash.com/photo-1511233002817-99325d7cc2d6?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBsYXlsaXN0fGVufDB8fDB8fHww";
  return (
    <div>
      <div className="flex flex-row max-w-auto h-auto gap-x-3 items-center">
        <div className="flex-shrink-0">
          <img
            src={imgUrl}
            alt="CoverImage"
            className="w-12 h-12 object-cover rounded"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-md font-semibold">{title}</div>
          <div className="text-gray-400 text-sm">Album <span className="hidden md:inline">• Various Artists
            </span> </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
