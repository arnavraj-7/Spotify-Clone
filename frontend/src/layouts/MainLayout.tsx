import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import FriendsandActivity from "@/pages/components/FriendsandActivity";
import LeftSideBar from "@/pages/components/LeftSideBar.tsx";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    const isMobile = false
  return (
    <div className="bg-black mt-2 min-h-screen">
      <ResizablePanelGroup direction="horizontal" >
        {/*Left Side */}
        <ResizablePanel defaultSize={20} minSize={isMobile?0:10} maxSize={30} className="">
            <LeftSideBar/>
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
       {/* Middle Side */}
        <ResizablePanel defaultSize={isMobile?100:60} className="">
            <Outlet/>
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* Right Side */}
        <ResizablePanel  minSize={0} defaultSize={20} maxSize={30} collapsedSize={0} className="">
            <FriendsandActivity/>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
