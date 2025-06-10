import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PlaylistCard = ({item}:{item:{title:string,imageUrl:string,artist:string}}) => {
  const {title,imageUrl} = item;
  return (
    <div className="h-15">
      <div className={cn("flex flex-row max-w-auto gap-x-3 items-center ",buttonVariants(
        {variant:"ghost",className:"p-0 w-full h-15 justify-start hover:bg-zinc-800"}))}>
        <div className="flex-shrink-0">
          <img
            src={imageUrl}
            alt="CoverImage"
            className="w-12 h-12 object-cover rounded"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-md font-semibold">{title}</div>
          <div className="text-gray-400 text-sm">Album <span className="hidden md:inline">• {item.artist}
            </span> </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
