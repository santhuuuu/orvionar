
import React, { useState, useRef } from 'react';

interface VideoPlayerProps {
  videoUrl?: string;
  thumbnail: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, thumbnail }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setHasStarted(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="relative group w-full aspect-video bg-slate-950 rounded-[2rem] lg:rounded-[4rem] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)] mb-16 transition-all duration-700">
      {!hasStarted ? (
        <div 
          className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center"
          onClick={handlePlay}
        >
          {/* Thumbnail Layer */}
          <img 
            src={thumbnail} 
            className="absolute inset-0 w-full h-full object-cover opacity-40 brightness-50 group-hover:scale-105 transition-all duration-1000"
            alt="Video Thumbnail"
          />
          
          {/* Cinematic Play Button */}
          <div className="relative z-20 flex flex-col items-center">
            <div className="w-24 h-24 lg:w-28 lg:h-28 bg-white text-indigo-600 rounded-full flex items-center justify-center text-4xl shadow-2xl group-hover:scale-110 transition-transform mb-6 border-[8px] border-white/10 backdrop-blur-sm">
              <i className="fas fa-play ml-2"></i>
            </div>
            <div className="text-white text-[10px] font-black uppercase tracking-[0.4em] opacity-60 group-hover:opacity-100 transition-opacity">
              Initialize Module 4K Stream
            </div>
          </div>

          {/* Glowing accents */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500 rounded-full filter blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
        </div>
      ) : null}

      {/* Actual Video Element */}
      <video
        ref={videoRef}
        src={videoUrl || "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${hasStarted ? 'opacity-100' : 'opacity-0'}`}
        controls
        playsInline
      />
      
      {/* Decorative Border Glow */}
      <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-[2rem] lg:rounded-[4rem] z-30"></div>
    </div>
  );
};

export default VideoPlayer;
