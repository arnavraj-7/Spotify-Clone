import Topbar from "@/components/ui/Topbar";
import useSongStore from "@/stores/SongStore";
import { SignedIn } from "@clerk/clerk-react";
import Trending from "../components/Home-Page-Components/Trending.tsx";
import Featured from "../components/Home-Page-Components/Featured.tsx";
import MadeforYou from "../components/Home-Page-Components/MadeforYou.tsx";
import FeaturedGridSkeleton from "@/skeletons/FeaturedGridSkeleton.tsx";
import MadeforYouGridSkeleton from "@/skeletons/MadeforYouGridSkeleton.tsx";

const HomePage = () => {
  const { isLoadingFeatured, isLoadingMadeForYou, isLoadingTrending } =
    useSongStore();

  return (
    <div className="flex-col flex">
      <Topbar />
      <div className="h-[calc(100vh-154px)] w-full overflow-y-auto custom-scrollbar">
        <div className="bg-gradient-to-b from-zinc-800 to zinc-900 mt-2 rounded-md w-full flex flex-col gap-y-4 pr-2">
          {/* Greeting */}
          <div className="text-2xl font-bold ml-4 md:ml-8 mt-4">Good Afternoon</div>

          {/* Six Songs */}
          <div className="ml-2 md:ml-8">
            {isLoadingFeatured ? <FeaturedGridSkeleton /> : <Featured />}
            {/* <Featured /> */}
          </div>
          <SignedIn>
            <div className="">
              {isLoadingMadeForYou ? (
                <MadeforYouGridSkeleton />
              ) : (
                <MadeforYou />
              )}
            </div>
          </SignedIn>

          <div className="">
            {isLoadingTrending ? <MadeforYouGridSkeleton /> : <Trending />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
