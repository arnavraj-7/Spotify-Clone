import useAlbumStore from "@/stores/AlbumStore.ts";
import { Clock3, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { SongCard } from "../cards/SongCard.tsx";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import SongSkeleton from "@/skeletons/SongSkeleton";
import usePlayerStore from "@/stores/PlayerStore.ts";
import { Button } from "@/components/ui/button.tsx";
import { motion, AnimatePresence } from "framer-motion";

const AlbumPage = () => {
  const id: string | undefined = useParams().id;
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  const { fetchAlbumbyId, currentAlbum, isLoadingSingleAlbum } =
    useAlbumStore();

  const handlePlayAlbum = () => {
    if (!currentAlbum?.songs) return;

    if (currentAlbum?.songs.some((song) => song._id === currentSong?._id)) {
      togglePlay();
    } else {
      playAlbum(currentAlbum?.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (
      !Array.isArray(currentAlbum?.songs) ||
      typeof currentAlbum.songs[0] === "string"
    )
      return;

    if (typeof currentAlbum.songs === "string") return;
    playAlbum(currentAlbum.songs || [], index);
  };

  useEffect(() => {
    if (!id) return;
    fetchAlbumbyId(id);
  }, [id, fetchAlbumbyId]);

  if (currentAlbum?.songs == undefined) return (<div></div>);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const playButtonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const songListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05
      }
    }
  };

  const songItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="h-[calc(100%-100px)] w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="bg-gradient-to-b from-purple-900 to-zinc-900 p-6 h-60 rounded-t-md"
        variants={headerVariants}
      >
        <div className="flex flex-row max-w-auto gap-x-3 items-end">
          <motion.div 
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src={currentAlbum?.imageUrl}
              alt="CoverImage"
              className="w-35 h-35 md:w-40 md:h-40 object-cover rounded"
            />
          </motion.div>
          <motion.div 
            className="flex flex-col justify-center gap-y-2 md:gap-y-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-md">Album</div>
            <div className="text-md font-bold text-4xl md:text-5xl">
              {currentAlbum?.title}
            </div>
            <div className="text-gray-400 text-[12px] flex md:gap-x-2">
              <span className="font-semibold md:text-md text-white">
                {currentAlbum?.artist}
              </span>
              <span className="">• {currentAlbum?.songs?.length}</span>
              <span className="">• {currentAlbum?.releaseYear}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-zinc-900 h-full rounded-b-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="ml-6 mb-4">
          <motion.div
            variants={playButtonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={() => {
                handlePlayAlbum();
              }}
              size={"icon"}
              className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all duration-200 ease-in-out"
            >
              <AnimatePresence mode="wait">
                {isPlaying &&
                currentAlbum?.songs.some(
                  (song) => song._id === currentSong?._id
                ) ? (
                  <motion.div
                    key="pause"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Pause size={100} className="text-black h-7 w-7" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Play size={100} className="text-black h-7 w-7" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>

        <motion.div 
          className="flex justify-between px-6 text-gray-400 w-full mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <div className="flex">
            <div className="ml-2">#</div>
            <div className="ml-4 ">Title</div>
          </div>
          <div className="flex">
            <div className="mr-0 md:mr-30">
              <Clock3 size={20} />
            </div>
            <div className="mr-0 md:block hidden">Released on</div>
          </div>
        </motion.div>

        <motion.hr 
          className="w-[calc(100%-32px)] flex justify-center mx-auto mb-5"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        />

        <div className="px-4 h-full">
          <ScrollArea className="h-[calc(100vh-500px)]">
            <motion.div
              variants={songListVariants}
              initial="hidden"
              animate="visible"
            >
              {currentAlbum?.songs?.map((song, index) => {
                if (typeof song === "string") return null;
                const isCurrentSong = song._id === currentSong?._id;
                const rank = index + 1;

                return isLoadingSingleAlbum ? (
                  Array.from({ length: 5 }).map((_, skeletonIndex) => {
                    return <SongSkeleton key={skeletonIndex} />;
                  })
                ) : (
                  <motion.div 
                    key={song._id} 
                    onClick={() => handlePlaySong(index)}
                    variants={songItemVariants}
                    whileHover={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      transition: { duration: 0.2 }
                    }}
                    className="rounded-md cursor-pointer"
                  >
                    <SongCard
                      song={song}
                      rank={rank}
                      isPlaying={isCurrentSong && isPlaying}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </ScrollArea>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AlbumPage;