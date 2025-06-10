// MainLayout.tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import AudioPlayer from "@/pages/components/AudioPlayer";
import AudioPlayerControls from "@/pages/components/AudioPlayerControls";
import FriendsandActivity from "@/pages/components/FriendsandActivity";
import LeftSideBar from "@/pages/components/LeftSideBar.tsx";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Chat layout - full width with integrated sidebar
  if (isChatPage) {
    return (
      <div className="bg-black pt-2 min-h-screen">
        <AudioPlayer />
        <ResizablePanelGroup direction="horizontal">
          {/* Left Sidebar */}
          <ResizablePanel
            defaultSize={20}
            minSize={isMobile ? 0 : 10}
            maxSize={30}
            className=""
          >
            <LeftSideBar />
          </ResizablePanel>
          <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
          
          {/* Chat takes full remaining space */}
          <ResizablePanel defaultSize={80} className="">
      
             <Outlet />
           
          </ResizablePanel>
        </ResizablePanelGroup>
        <AudioPlayerControls />
      </div>
    );
  }

  // Default layout for other pages
  return (
    <div className="bg-black pt-2 min-h-screen">
      <AudioPlayer />
      <ResizablePanelGroup direction="horizontal">
        {/* Left Side */}
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={30}
          className=""
        >
          <LeftSideBar />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
        
        {/* Middle Side */}
        <ResizablePanel defaultSize={isMobile ? 100 : 60} className="">
          <Outlet />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* Right Side */}
        <ResizablePanel
          minSize={isMobile ? 0 : 20}
          defaultSize={isMobile ? 0 : 20}
          maxSize={30}
          collapsedSize={0}
          className=""
        >
          <FriendsandActivity />
        </ResizablePanel>
      </ResizablePanelGroup>
      <AudioPlayerControls />
    </div>
  );
};

export default MainLayout;