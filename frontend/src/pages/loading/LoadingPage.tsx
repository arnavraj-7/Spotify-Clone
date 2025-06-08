
import { Music, Volume2 } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Logo/Icon Section */}
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center shadow-2xl">
            <Music className="w-10 h-10 text-white" />
          </div>
          {/* Pulsing ring animation */}
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border-4 border-green-400 animate-ping opacity-20"></div>
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border-2 border-green-300 animate-pulse opacity-40"></div>
        </div>

        {/* App Name */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">MusicStream</h1>
          <p className="text-green-300 text-lg">Your music, your world</p>
        </div>

        {/* Loading Animation */}
        <div className="space-y-4">
          {/* Sound bars animation */}
          <div className="flex justify-center items-end space-x-1 h-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-green-400 rounded-full animate-pulse"
                style={{
                  height: '8px',
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.8s'
                }}
              ></div>
            ))}
          </div>

          {/* Loading text */}
          <div className="flex items-center justify-center space-x-2 text-green-300">
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">Loading your music experience...</span>
          </div>

          {/* Progress bar */}
          <div className="w-64 mx-auto bg-gray-700 rounded-full h-1">
            <div className="bg-gradient-to-r from-green-400 to-green-600 h-1 rounded-full animate-pulse" style={{width: '60%'}}></div>
          </div>
        </div>

        {/* Floating music notes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 text-green-400 opacity-20 animate-bounce" style={{animationDelay: '0s'}}>
            ♪
          </div>
          <div className="absolute top-1/3 right-1/4 text-green-300 opacity-30 animate-bounce" style={{animationDelay: '0.5s'}}>
            ♫
          </div>
          <div className="absolute bottom-1/3 left-1/3 text-green-500 opacity-25 animate-bounce" style={{animationDelay: '1s'}}>
            ♪
          </div>
          <div className="absolute bottom-1/4 right-1/3 text-green-400 opacity-20 animate-bounce" style={{animationDelay: '1.5s'}}>
            ♫
          </div>
        </div>
      </div>
    </div>
  );
}