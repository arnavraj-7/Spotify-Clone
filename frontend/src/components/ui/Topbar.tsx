import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/clerk-react";
import { LayoutDashboard, LogOut, User, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton";
import useAuthStore from "@/stores/AuthStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  const { user } = useUser();

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: { duration: 0.2 }
    }
  };

  const adminBadgeVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.nav
      className="sticky w-full h-16 backdrop-blur-md rounded-md text-white flex justify-between items-center px-4 bg-zinc-900/80 border border-zinc-800/50 shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo Section */}
      <motion.div variants={itemVariants}>
        <Link to="/" className="flex items-center gap-x-3 group">
          <motion.div
            variants={logoVariants}
            whileHover="hover"
            className="relative"
          >
            <img
              src="/spotify.png"
              alt="Spotify Logo"
              className="object-cover h-10 w-10 rounded-lg"
            />
            <motion.div
              className="absolute inset-0 bg-green-500/20 rounded-lg"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
          <motion.div
            className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Spotify
          </motion.div>
        </Link>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="flex items-center gap-x-3"
        variants={itemVariants}
      >
        <AnimatePresence>
          {isAdmin && (
            <motion.div
              variants={adminBadgeVariants}
              initial="initial"
              animate="animate"
              exit={{ scale: 0, opacity: 0 }}
              whileHover="hover"
            >
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-lg px-3 py-2 transition-all duration-200 shadow-md hover:shadow-lg border border-green-500/30"
              >
                <Shield className="size-4" />
                <LayoutDashboard className="size-4" />
                <span className="md:inline hidden font-medium">Admin Dashboard</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Authentication Section */}
        <SignedOut>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SignInOAuthButton />
          </motion.div>
        </SignedOut>

        <SignedIn>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full border-2 border-zinc-700 hover:border-green-500 transition-colors duration-200"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.imageUrl}
                      alt={user?.fullName || "User"}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-white text-sm font-semibold">
                      {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  {isAdmin && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-zinc-900 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <Shield className="size-2 text-white" />
                    </motion.div>
                  )}
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent
              className="w-56 bg-zinc-900 border-zinc-800 shadow-xl"
              align="end"
              forceMount
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-center gap-x-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.imageUrl}
                      alt={user?.fullName || "User"}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-white">
                      {user?.firstName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-white">
                      {user?.fullName || "User"}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {user?.emailAddresses[0]?.emailAddress}
                    </p>
                  </div>
                </div>
                
                <DropdownMenuSeparator className="bg-zinc-800" />
                
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800 text-zinc-300 hover:text-white">
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>

                {isAdmin && (
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800 text-zinc-300 hover:text-white">
                    <Link to="/admin/dashboard" className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator className="bg-zinc-800" />
                
                <DropdownMenuItem className="cursor-pointer hover:bg-red-900/50 focus:bg-red-900/50 text-red-400 hover:text-red-300">
                  <SignOutButton>
                    <div className="flex items-center w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </div>
                  </SignOutButton>
                </DropdownMenuItem>
              </motion.div>
            </DropdownMenuContent>
          </DropdownMenu>
        </SignedIn>
      </motion.div>
    </motion.nav>
  );
};

export default Topbar;