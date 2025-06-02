import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import LeftSideBar from "@/pages/components/LeftSideBar.tsx";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    const isMobile = false
  return (
    <div>
      <ResizablePanelGroup direction="horizontal" className="border-amber-500 h-full flex-1">
        {/*Left Side */}
        <ResizablePanel defaultSize={20} minSize={isMobile?0:10} maxSize={30} className="bg-black flex justify-center">
            <LeftSideBar/>
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
       {/* Middle Side */}
        <ResizablePanel defaultSize={isMobile?100:60} className="bg-zinc-900 flex justify-center ">
            middle
            <Outlet/>
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* Right Side */}
        <ResizablePanel  minSize={0} defaultSize={20} maxSize={30} collapsedSize={0} className="bg-red-400 flex justify-center">
            right
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
