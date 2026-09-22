import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import WelcomeScreen from './components/WelcomeScreen';
import LoveGame from './components/LoveGame';
import MemorySlideshow from './components/MemorySlideshow';
import WishSection from './components/WishSection';
import LoveLetter from './components/LoveLetter';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlayTrigger, setAutoPlayTrigger] = useState(true);

  // Scroll to top on every chapter change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNext = () => {
    setCurrentPage((prev) => {
      const nextPage = Math.min(prev + 1, 5);
      if (nextPage === 5) {
        setAutoPlayTrigger(true);
      }
      return nextPage;
    });
  };

  const handleRestart = () => {
    setCurrentPage(1);
  };

  const startMusic = () => {
    setAutoPlayTrigger(true);
  };

  const chapters = [
    { num: 1, title: 'Welcome' },
    { num: 2, title: 'Game' },
    { num: 3, title: 'Memories' },
    { num: 4, title: 'Wish' },
    { num: 5, title: 'Love Letter' },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#0b0410] text-pink-50 overflow-x-hidden">
      {/* Background Animated Atmosphere */}
      <FloatingHearts />

      {/* Floating Music Controls (Top-Right) */}
      <MusicPlayer
        autoPlayTrigger={autoPlayTrigger}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />

      {/* Top Floating Story Chapter Indicator */}
      <div className="fixed top-4 left-4 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-white/10 shadow-lg">
        {chapters.map((ch) => (
          <button
            key={ch.num}
            onClick={() => {
              setCurrentPage(ch.num);
              if (ch.num === 5) setAutoPlayTrigger(true);
            }}
            className={`transition-all duration-300 rounded-full flex items-center justify-center ${
              ch.num === currentPage
                ? 'w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-[11px] shadow-md shadow-rose-500/40'
                : 'w-2 h-2 bg-white/25 hover:bg-white/50'
            }`}
            title={`Chapter ${ch.num}: ${ch.title}`}
          >
            {ch.num === currentPage && ch.num}
          </button>
        ))}
      </div>

      {/* Main Pages Flow */}
      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          {currentPage === 1 && (
            <WelcomeScreen key="page1" onNext={handleNext} startMusic={startMusic} />
          )}

          {currentPage === 2 && (
            <LoveGame key="page2" onNext={handleNext} />
          )}

          {currentPage === 3 && (
            <MemorySlideshow key="page3" onNext={handleNext} />
          )}

          {currentPage === 4 && (
            <WishSection key="page4" onNext={handleNext} />
          )}

          {currentPage === 5 && (
            <LoveLetter
              key="page5"
              onRestart={handleRestart}
              startMusic={startMusic}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
