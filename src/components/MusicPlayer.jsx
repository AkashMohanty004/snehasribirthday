import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { config } from '../config';

export default function MusicPlayer({ autoPlayTrigger, isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize audio element and attempt immediate autoplay
  useEffect(() => {
    const audio = new Audio(config.birthdaySong);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const handleEnded = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    };

    audio.addEventListener('ended', handleEnded);

    // Attempt autoplay immediately as soon as she opens the page
    const tryAutoplay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {
            // Browser restricted unprompted audio: start automatically on her very first touch/tap anywhere!
            const handleFirstInteraction = () => {
              audio.play().then(() => {
                setIsPlaying(true);
                setHasInteracted(true);
              }).catch(() => {});

              window.removeEventListener('click', handleFirstInteraction);
              window.removeEventListener('touchstart', handleFirstInteraction);
              window.removeEventListener('scroll', handleFirstInteraction);
            };

            window.addEventListener('click', handleFirstInteraction, { once: true });
            window.addEventListener('touchstart', handleFirstInteraction, { once: true });
            window.addEventListener('scroll', handleFirstInteraction, { once: true });
          });
      }
    };

    tryAutoplay();

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // When autoPlayTrigger turns true
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch(() => {});
    }
  }, [autoPlayTrigger, isPlaying, setIsPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setHasInteracted(true);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    const newMute = !isMuted;
    setIsMuted(newMute);
    audioRef.current.muted = newMute;
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <div 
        onClick={togglePlay}
        className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-panel cursor-pointer hover:border-pink-400/40 transition-all duration-300 shadow-lg active:scale-95"
        title={isPlaying ? "Pause Romantic Music" : "Play Romantic Music"}
      >
        {/* Animated equalizer waves when playing */}
        <div className="flex items-center gap-0.5 h-4">
          <span className={`w-1 bg-rose-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-[bounce_0.8s_ease-in-out_infinite] h-4' : 'h-1.5'}`} />
          <span className={`w-1 bg-pink-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-[bounce_1.1s_ease-in-out_infinite_0.2s] h-3.5' : 'h-2'}`} />
          <span className={`w-1 bg-rose-300 rounded-full transition-all duration-300 ${isPlaying ? 'animate-[bounce_0.9s_ease-in-out_infinite_0.4s] h-4' : 'h-1.5'}`} />
        </div>

        <span className="text-xs font-medium text-pink-200 tracking-wide hidden sm:inline-block">
          {isPlaying ? "Music Playing" : "Play Music"}
        </span>

        <button
          onClick={toggleMute}
          className="p-1 rounded-full text-pink-300/80 hover:text-white transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        {/* Floating pulse glow ring when playing */}
        {isPlaying && (
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 opacity-25 blur-sm animate-pulse" />
        )}
      </div>
    </div>
  );
}
