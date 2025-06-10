import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Settings, 
  Hammer, 
  HardHat, 
  Cog, 
  Drill, 
  Home,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const UnderMaintenance = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const rotateVariants = {
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const bounceVariants = {
    bounce: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] bg-gradient-to-br from-black via-zinc-900 to-zinc-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 text-zinc-700"
          animate="float"
          variants={floatingVariants}
        >
          <Wrench size={40} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-32 text-zinc-700"
          animate="rotate"
          variants={rotateVariants}
        >
          <Settings size={35} />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-40 text-zinc-700"
          animate="bounce"
          variants={bounceVariants}
        >
          <Hammer size={45} />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20 text-zinc-700"
          animate="float"
          variants={floatingVariants}
          transition={{ delay: 1 }}
        >
          <Drill size={38} />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-10 text-zinc-700"
          animate="rotate"
          variants={rotateVariants}
          transition={{ delay: 2 }}
        >
          <Cog size={30} />
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        className="max-w-xl mx-auto text-center z-10 bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800/50 shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hard Hat Avatar */}
        <motion.div
          className="mb-8 flex justify-center"
          variants={itemVariants}
        >
          <motion.div
            className="relative"
            animate="bounce"
            variants={bounceVariants}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <HardHat size={40} className="text-white" />
            </div>
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <AlertTriangle size={16} className="text-white" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-4"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Under
          </span>{' '}
          <span className="text-white">Construction</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-zinc-300 mb-8"
          variants={itemVariants}
        >
          We're working hard to bring you something amazing!
        </motion.p>

        {/* Tools Icons Row */}
        <motion.div
          className="flex justify-center gap-6 mb-8"
          variants={itemVariants}
        >
          {[Wrench, Hammer, Settings, Drill, Cog].map((Icon, index) => (
            <motion.div
              key={index}
              className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700"
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgb(34 197 94)",
                borderColor: "rgb(34 197 94)"
              }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2
              }}
            >
              <Icon size={24} className="text-zinc-400" />
            </motion.div>
          ))}
        </motion.div>

        {/* Status Message */}
        <motion.div
          className="bg-zinc-800/50 rounded-xl p-6 mb-4 border border-zinc-700/50"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Settings className="text-green-400" size={24} />
            </motion.div>
            <span className="text-green-400 font-semibold">Currently Working On</span>
          </div>
          <p className="text-zinc-300">
            🔨 Building your personalized profile dashboard<br />
            ⚡ Optimizing performance and user experience<br />
            🎨 Adding new exciting features
          </p>
        </motion.div>

        {/* Time Estimate */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-8 text-zinc-400"
          variants={itemVariants}
        >
          <Clock size={20} />
          <span>Estimated completion: Coming Soon™</span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 py-1 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link to="/" className="flex items-center gap-2">
                <Home size={20} />
                Back to Home
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white px-8 py-1 rounded-lg font-medium transition-all duration-200"
              onClick={() => window.location.reload()}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1 }}
                className="mr-2"
              >
                <Settings size={20} />
              </motion.div>
              Refresh Page
            </Button>
          </motion.div>
        </motion.div>

        {/* Fun Message */}
        <motion.p
          className="text-sm text-zinc-500 mt-4"
          variants={itemVariants}
        >
          Don't worry, we'll have this ready faster than you can say "Spotify"! 🎵
        </motion.p>
      </motion.div>
    </div>
  );
};

export default UnderMaintenance;