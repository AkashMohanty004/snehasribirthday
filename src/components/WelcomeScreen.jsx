import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Gift } from 'lucide-react';
import { config } from '../config';

export default function WelcomeScreen({ onNext, startMusic }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const fullText = config.welcome.message;

  // Romantic Typewriter effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [fullText]);

  const handleUnlock = () => {
    if (startMusic) {
      startMusic();
    }
    // Heart and star confetti burst
    const end = Date.now() + 900;
    const colors = ['#ff3366', '#ff7597', '#fda4af', '#fcd34d', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Transition to next chapter after a brief delightful delay
    setTimeout(() => {
      onNext();
    }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 relative z-10"
    >
      {/* Top Romantic Tag */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs md:text-sm font-medium text-pink-200 tracking-wider uppercase"
      >
        <Sparkles size={14} className="text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
        <span>A Special Birthday Experience</span>
        <Heart size={14} className="text-rose-400 fill-rose-400 animate-pulse" />
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="font-romantic text-4xl sm:text-6xl md:text-7xl text-pink-300 leading-tight drop-shadow-lg mb-2">
          {config.welcome.title}
        </h1>
        <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-rose-500 to-transparent my-4" />
      </motion.div>

      {/* Typewriter Romantic Note */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="glass-panel max-w-xl mx-auto rounded-2xl p-6 sm:p-8 mt-4 mb-8 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-pink-400 to-rose-600 opacity-60" />
        
        <p className="font-display italic text-lg sm:text-xl text-rose-100/90 leading-relaxed whitespace-pre-line min-h-[140px] sm:min-h-[120px] flex items-center justify-center">
          {displayedText}
          {!isTypingDone && (
            <span className="inline-block w-1.5 h-5 ml-1 bg-rose-400 animate-pulse align-middle" />
          )}
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-pink-300/70 font-sans tracking-wide">
          <span>Crafted with love by Biswajit</span>
          <span>•</span>
          <span>Just for you</span>
        </div>
      </motion.div>

      {/* Unlock Gift Glowing Button */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={handleUnlock}
          className="relative group px-8 py-4 rounded-full font-semibold text-white tracking-wide shadow-2xl transition-all duration-300 overflow-hidden box-glow"
        >
          {/* Button Gradient & Glow Background */}
          <span className="absolute inset-0 bg-gradient-to-r from-rose-600 via-pink-500 to-rose-500 group-hover:from-rose-500 group-hover:to-pink-600 transition-all duration-300" />
          <span className="absolute inset-0 opacity-0 group-hover:opacity-40 bg-white blur-md transition-opacity duration-300" />
          
          <span className="relative z-10 flex items-center gap-3 text-base sm:text-lg font-medium drop-shadow">
            <Gift size={20} className="animate-bounce" />
            <span>{config.welcome.buttonText}</span>
            <Sparkles size={18} className="text-yellow-200" />
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
}
