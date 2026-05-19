"use client";

// 21st.dev video-player template, adapted:
// - @/components/ui/button (shadcn — not in this project) → a small plain
//   ControlButton with the same ghost styling.
// - Simplified the controls-panel transition (the original mixed
//   type:"spring" + ease + duration, which fights itself / trips TS).
// - Wrapped in a "The Centre Walkthrough" section for the home page.
// Placeholder video for now — swap `WALKTHROUGH_SRC` when the real one is ready.

import { useRef, useState, type ReactNode } from "react";
import { Play, Pause, Volume2, Volume1, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const WALKTHROUGH_SRC = "/WhatsApp%20Video%202026-05-15%20at%2023.03.56.mp4";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const ControlButton = ({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  children: ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "inline-flex items-center justify-center w-9 h-9 rounded-md text-white text-sm transition-colors hover:bg-[#111111d1]",
      active && "bg-[#111111d1]"
    )}
  >
    {children}
  </button>
);

const CustomSlider = ({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) => {
  return (
    <motion.div
      className={cn(
        "relative w-full h-1 bg-white/20 rounded-full cursor-pointer",
        className
      )}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        onChange(Math.min(Math.max(percentage, 0), 100));
      }}
    >
      <motion.div
        className="absolute top-0 left-0 h-full bg-white rounded-full"
        style={{ width: `${value}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </motion.div>
  );
};

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // Mobile only: tapping the video opens native fullscreen (which lets the
  // phone rotate the video horizontally / vertically). Desktop is untouched —
  // a click there still just plays / pauses.
  const handleVideoClick = () => {
    const v = videoRef.current;
    if (!v) return;
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) {
      togglePlay();
      return;
    }
    const vAny = v as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
    };
    if (typeof vAny.webkitEnterFullscreen === "function") {
      vAny.webkitEnterFullscreen();
    } else if (v.requestFullscreen) {
      v.requestFullscreen().catch(() => {});
    }
    v.play().catch(() => {});
    setIsPlaying(true);
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      const newVolume = value / 100;
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(isFinite(p) ? p : 0);
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number) => {
    if (videoRef.current && videoRef.current.duration) {
      const time = (value / 100) * videoRef.current.duration;
      if (isFinite(time)) {
        videoRef.current.currentTime = time;
        setProgress(value);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (!isMuted) {
        setVolume(0);
      } else {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  const setSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-5xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-[#11111198] backdrop-blur-sm"
      style={{
        border: "1px solid rgba(255,127,80,0.35)",
        boxShadow:
          "0 24px 54px -16px rgba(255,127,80,0.45), 0 6px 18px rgba(0,0,0,0.15)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full"
        onTimeUpdate={handleTimeUpdate}
        src={src}
        onClick={handleVideoClick}
        playsInline
        preload="metadata"
      />

      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute bottom-0 mx-auto max-w-xl left-0 right-0 p-4 m-2 bg-[#11111198] backdrop-blur-md rounded-2xl"
            initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white text-sm">
                {formatTime(currentTime)}
              </span>
              <CustomSlider
                value={progress}
                onChange={handleSeek}
                className="flex-1"
              />
              <span className="text-white text-sm">{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <ControlButton onClick={togglePlay}>
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </ControlButton>
                </motion.div>
                <div className="flex items-center gap-x-1">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ControlButton onClick={toggleMute}>
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : volume > 0.5 ? (
                        <Volume2 className="h-5 w-5" />
                      ) : (
                        <Volume1 className="h-5 w-5" />
                      )}
                    </ControlButton>
                  </motion.div>
                  <div className="w-24">
                    <CustomSlider
                      value={volume * 100}
                      onChange={handleVolumeChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {[0.5, 1, 1.5, 2].map((speed) => (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    key={speed}
                  >
                    <ControlButton
                      onClick={() => setSpeed(speed)}
                      active={playbackSpeed === speed}
                    >
                      {speed}x
                    </ControlButton>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CentreWalkthrough() {
  return (
    <section
      className="section"
      style={{
        background: "linear-gradient(180deg, #FDFCF0 0%, #FAF5E8 50%, #FDFCF0 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-3">
            Step Inside
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            The Centre <span className="gradient-text">Walkthrough</span>
          </h2>
        </div>
        <VideoPlayer src={WALKTHROUGH_SRC} />
      </div>
    </section>
  );
}
