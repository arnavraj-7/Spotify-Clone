import Topbar from "@/components/ui/Topbar";
import useSongStore from "@/stores/SongStore";
import { SignedIn } from "@clerk/clerk-react";
import Trending from "./Home-Page-Components/Trending.tsx";
import Featured from "./Home-Page-Components/Featured.tsx";
import MadeforYou from "./Home-Page-Components/MadeforYou.tsx";
import FeaturedGridSkeleton from "@/skeletons/FeaturedGridSkeleton.tsx";
import MadeforYouGridSkeleton from "@/skeletons/MadeforYouGridSkeleton.tsx";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { isLoadingFeatured, isLoadingMadeForYou, isLoadingTrending } =
    useSongStore();
  const [greet, setGreet] = useState("");

 const handleGreet=()=>{
  const currentHour = new Date().getHours();
  if(currentHour>=5 && currentHour<12){
    setGreet("Good Morning");    
  }else if(currentHour>12 && currentHour<18){
    setGreet("Good Afternoon");
  }else{
    setGreet("Good Evening");
  }
  }
  useEffect(()=>{
    handleGreet();
  })
  return (
    <div className="bg-gradient-to-b from-zinc-900 to-black h-[calc(100vh-100px)] font-urbanist">
        <Topbar />
         <div className="h-[calc(100vh-154px)] w-full overflow-y-auto custom-scrollbar">
        
        <div className="px-6 pt-4 pb-5 space-y-8 animate-fadeIn">
          {/* Greeting with subtle glow effect */}
          <div className="mb-8">
            <h1 className="text-white text-3xl font-bold tracking-tight animate-slideInLeft">
              {greet}
            </h1>
          </div>

          {/* Featured Songs Section */}
          <div className="space-y-4 animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            {isLoadingFeatured ? <FeaturedGridSkeleton /> : <Featured />}
          </div>

      <SignedIn>
          {/* Made for You Section */}
          <div className="space-y-4 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            {isLoadingMadeForYou ? (
              <MadeforYouGridSkeleton />
            ) : (
              <MadeforYou />
            )}
          </div>
      </SignedIn>

          {/* Trending Section */}
          <div className="space-y-4 animate-slideInUp" style={{ animationDelay: '0.3s' }}>
            {isLoadingTrending ? <MadeforYouGridSkeleton /> : <Trending />}
          </div>
        </div>
        </div>
    </div>
  );
};

export default HomePage;