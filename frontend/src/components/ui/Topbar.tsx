import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/clerk-react";
import { LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton";
import useAuthStore from "@/stores/AuthStore";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  return (
    <nav className="sticky w-full h-15 backdrop-blur-md rounded-md text-white flex justify-between items-center px-4 bg-zinc-900/75">
      <div className="">
        <Link to="/" className="flex items-center gap-x-3">
          <div>
            <img
              src="/spotify.png"
              alt="Spotify Logo"
              className="object-cover h-10 w-10"
            />
          </div>
          <div>Spotify</div>
        </Link>
      </div>
      <div className="flex justify-end items-center flex-col">
        {isAdmin && (
          <>
            <Link to="/admin" className="flex items-center gap-x-2 bg-zinc-800 rounded-md p-2 hover:bg-zinc-900 hover:scale-104 transition-all ease-in duration-150">
              <LayoutDashboard className="size-4 mr-2"/>
              <span>Admin Dashboard</span>
            </Link>

          </>
        )}
        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>
        <SignedIn>
          <SignOutButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Topbar;
