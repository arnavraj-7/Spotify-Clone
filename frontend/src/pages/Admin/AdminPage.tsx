import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/stores/AdminStore";
import { useAuth, UserButton } from "@clerk/clerk-react";
import {
  BookAudioIcon,
  BrushIcon,
  Library,
  ListMusic,
  Music,
  Users2,
} from "lucide-react";
import React, { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const AdminPage = () => {
  const { getToken } = useAuth();
  const [ActiveSongs, setActiveSongs] = React.useState(true);
  const [ActiveAlbums, setActiveAlbums] = React.useState(false);
  const {
    getStats,
    users,
    totalsongs,
    totalalbums,
    totalartists,
    getAllAlbums,
    getAllSongs,
  } = useAdminStore();
  useEffect(() => {
    async function fetchData() {
      const token: string | null = await getToken();
      if (token === null) {
        return;
      }
      getStats(token);
      getAllSongs(token);
      getAllAlbums(token);
      console.log("requested to backend for stats");
    }
    fetchData();
  }, [getToken, getAllAlbums, getAllSongs, getStats]);

  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-5">
        {/* //Logo and TopBar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 mb-8">
            <Link to="/" className="rounded-lg">
              <img src="/spotify.png" className="size-10 text-black" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Music Manager</h1>
              <p className="text-zinc-400 mt-1">Manage your music catalog</p>
            </div>
          </div>
          <UserButton />
        </div>
        {/* //Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex flex-row p-5 justify-center items-center bg-zinc-800 rounded-md gap-x-3">
            <div>
              <ListMusic
                size={50}
                className="bg-emerald-500/10 text-emerald-500 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <div className="text-gray-500 font-normal ">Total Songs</div>
              <div className="text-2xl font-bold">{totalsongs}</div>
            </div>
          </div>
          <div className="flex flex-row p-5 justify-center items-center bg-zinc-800 rounded-md gap-x-3">
            <div>
              <Library
                size={50}
                className="bg-purple-500/10 text-purple-500 rounded-md"
              />
            </div>
            <div>
              <div className="text-gray-500 font-normal">Total Albums</div>
              <div className="text-3xl font-bold">{totalalbums}</div>
            </div>
          </div>
          <div className="flex flex-row p-5 justify-center items-center bg-zinc-800 rounded-md gap-x-3">
            <div>
              <BrushIcon
                size={50}
                className="bg-orange-500/10 text-orange-500 rounded-md"
              />
            </div>
            <div>
              <div className="text-gray-500 font-normal">Total Artists</div>
              <div className="text-3xl font-bold">{totalartists}</div>
            </div>
          </div>
          <div className="flex flex-row p-5 justify-center items-center bg-zinc-800 rounded-md gap-x-3">
            <div>
              <Users2
                size={50}
                className="bg-sky-500/10 text-sky-500 rounded-md"
              />
            </div>
            <div>
              <div className="text-gray-500 font-normal">Total Users</div>
              <div className="text-3xl font-bold">{users}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-x-1">
          <div>
            <NavLink
              to=""
              className={({ isActive }) => {
                if (isActive) {
                  setActiveSongs(true);
                  setActiveAlbums(false);
                }
                return isActive
                  ? "flex items-center gap-x-2 text-white"
                  : "flex items-center gap-x-2 text-white";
              }}
            >
              <Button
                className={ActiveSongs ? "hover:bg-green-900 hover: text-white" : "bg-zinc-800"}
              >
                <Music size={20} />
                Songs
              </Button>
            </NavLink>
          </div>

          <div>
            <NavLink
              to="albums"
              className={({ isActive }) => {
                if (isActive) {
                  setActiveAlbums(true);
                  setActiveSongs(false);
                }
                return isActive
                  ? "flex items-center gap-x-2 text-white"
                  : "flex items-center gap-x-2 text-white";
              }}
            >
              <Button
                className={`${
                  ActiveAlbums ? "hover:bg-green-900 hover: text-white" : "bg-zinc-800"
                }`}
              >
                <BookAudioIcon size={20} className="" />
                Albums
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminPage;
