import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Heart, Pause, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { config } from '../config';

export default function MemorySlideshow({ onNext }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const memories = config.memories;

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % memories.length);
  };

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev - 1 + memories.length) % memories.length);
  };

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIdx]);

  // Touch swipe handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const handleProceed = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => {
      onNext();
    }, 400);
  };

  const currentMemory = memories[currentIdx];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
      transition={{ duration: 0.7 }}
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-10 relative z-10"
    >
      <div className="w-full max-w-md sm:max-w-xl mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-pink-300 mb-2">
            <Sparkles size={12} className="text-yellow-300" />
            <span>Chapter 3 • Memories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-romantic text-pink-200">
            Our Little Memories ❤️
          </h2>
          <p className="text-xs sm:text-sm text-pink-200/80 font-display italic mt-1 max-w-sm mx-auto">
            "Some moments become memories... and some memories become a reason to smile forever."
          </p>
        </motion.div>

        {/* Carousel Frame */}
        <div 
          className="w-full relative group"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Card with Image */}
          <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-3xl overflow-hidden glass-panel border border-pink-500/20 box-glow shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <img
                  src={currentMemory.url}
                  alt={currentMemory.title}
                  className="w-full h-full object-cover object-center"
                />

                {/* Soft gradient overlay at bottom of photo for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0414] via-[#0e0414]/30 to-transparent opacity-95" />

                {/* Photo Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-left">
                  <span className="text-[11px] uppercase tracking-widest text-pink-300 font-semibold px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm border border-pink-500/30">
                    Memory {currentIdx + 1} of {memories.length}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 leading-tight">
                    {currentMemory.title}
                  </h3>
                  <p className="text-sm sm:text-base text-pink-100/90 font-light mt-1.5 leading-relaxed">
                    {currentMemory.caption}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Manual Navigation Arrows */}
            <button
              onClick={prevSlide}
              aria-label="Previous Memory"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/90 border border-white/20 backdrop-blur-md transition-all active:scale-90"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Memory"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/90 border border-white/20 backdrop-blur-md transition-all active:scale-90"
            >
              <ChevronRight size={20} />
            </button>

            {/* Play/Pause Toggle on top corner */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 border border-white/20 backdrop-blur-md text-xs flex items-center gap-1"
              title={isAutoPlaying ? "Pause Autoplay" : "Resume Autoplay"}
            >
              {isAutoPlaying ? <Pause size={13} /> : <Play size={13} />}
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {memories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIdx
                    ? 'w-7 h-2 bg-gradient-to-r from-rose-500 to-pink-400 shadow-sm'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Quote & Next Button */}
        <div className="text-center mt-6 w-full">
          <p className="font-romantic text-2xl sm:text-3xl text-pink-300 drop-shadow mb-4">
            “Every picture has a story... and somehow, every story has you. ❤️”
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleProceed}
            className="px-8 py-3.5 rounded-full font-semibold text-white tracking-wide bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-xl box-glow inline-flex items-center gap-2"
          >
            <span>💫 Move Ahead</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
