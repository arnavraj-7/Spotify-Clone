import { UserButton } from "@clerk/clerk-react";
import { ListMusic } from "lucide-react";
import React from "react";


const AdminPage = () => {
    const [TotalSongs, TotalAlbums,TotalArtists,TotalUsers] =[23,9,12,5];
  return (
    <div>
        {/* //Logo and TopBar */}
    <div className="flex flex-row gap-x-3 justify-between">
      <div>
        <div>
          <img src="/spotify.png" alt="" className="size-12" />
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="text-xl font-semibold">Music Manager</div>
          <div className="text-gray-500 font-normal">
            Manage your music catalog
          </div>
        </div>
      </div>
      <UserButton/>
    </div>
    {/* //Stats */}
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="flex flex-row p-5 justify-center items-center bg-zinc-800 rounded-md">
            <div>
                <ListMusic size={30}/>
            </div>
            <div className="flex flex-col">
                <div className="text-gray-500 font-normal ">
                    Total Songs
                </div>
                <div className="text-3xl font-bold">
                    {TotalSongs}
                </div>
            </div>
            </div>
        <div className="flex flex-row justify-center items-center bg-zinc-800">
            <div>
                <ListMusic size={30}/>
            </div>
            <div>
                <div className="text-gray-500 font-normal">
                    Total Albums
                </div>
                <div className="text-3xl font-bold">
                    {TotalAlbums}
                </div>
            </div>
            </div>
        <div className="flex flex-row justify-center items-center bg-zinc-800">
            <div>
                <ListMusic size={30}/>
            </div>
            <div>
                <div className="text-gray-500 font-normal">
                    Total Artists
                </div>
                <div className="text-3xl font-bold">
                    {TotalArtists}
                </div>
            </div>
            </div>
        <div className="flex flex-row justify-center items-center bg-zinc-800">
            <div>
                <ListMusic size={30}/>
            </div>
            <div>
                <div className="text-gray-500 font-normal">
                    Total Users
                </div>
                <div className="text-3xl font-bold">
                    {TotalUsers}
                </div>
            </div>

        </div>
        </div>
        
   
    </div>
  );
};

export default AdminPage;
