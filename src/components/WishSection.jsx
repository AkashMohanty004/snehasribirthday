import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Flame, Wind } from 'lucide-react';
import { config } from '../config';

export default function WishSection({ onNext }) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  const handleBlowCandles = () => {
    if (candlesBlown) return;

    setIsBlowing(true);

    setTimeout(() => {
      setCandlesBlown(true);
      setIsBlowing(false);

      // Huge celebratory fireworks & star confetti
      const end = Date.now() + 1800;
      const colors = ['#f43f5e', '#fb7185', '#fcd34d', '#ec4899', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 80,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 80,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }, 400);
  };

  const handleProceed = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 }
    });
    setTimeout(() => {
      onNext();
    }, 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
      transition={{ duration: 0.7 }}
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 relative z-10 overflow-hidden"
    >
      {/* Continuous Falling Hearts Rain after candles blown */}
      {candlesBlown && (
        <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-lg sm:text-2xl select-none"
              style={{
                top: '-30px',
                left: `${(i * 3.4) % 100}%`,
                opacity: 0.3 + (i % 5) * 0.15,
                animation: `fallRain ${4 + (i % 4) * 2}s linear infinite`,
                animationDelay: `${(i * 0.4) % 5}s`,
                filter: 'drop-shadow(0 0 6px rgba(255,100,150,0.5))',
              }}
            >
              {['💖', '✨', '❤️', '🌸', '⭐', '💕'][i % 6]}
            </div>
          ))}

          <style>{`
            @keyframes fallRain {
              0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
              }
              15% {
                opacity: 0.8;
              }
              85% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(115vh) rotate(360deg);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}

      <div className="w-full max-w-lg mx-auto text-center flex flex-col items-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-pink-300 mb-2">
            <Sparkles size={12} className="text-yellow-300" />
            <span>Chapter 4 • Special Wish</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-romantic text-pink-200">
            {config.wish.heading}
          </h2>
          <p className="text-sm sm:text-base text-pink-100/80 font-display italic mt-2 whitespace-pre-line">
            {!candlesBlown ? config.wish.subheading : config.wish.blownMessage}
          </p>
        </motion.div>

        {/* Interactive Cake Scene */}
        <motion.div
          className="my-6 relative cursor-pointer select-none"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBlowCandles}
          title={!candlesBlown ? "Click or tap to blow the candles!" : "Candles blown!"}
        >
          {/* Subtle Glow Behind Cake */}
          <div className={`absolute -inset-10 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
            candlesBlown ? 'bg-pink-500/20' : 'bg-amber-500/25 animate-pulse'
          }`} />

          {/* Cake Illustration Container */}
          <div className="relative w-72 sm:w-80 h-72 flex flex-col items-center justify-end pb-4">
            {/* Candles Row */}
            <div className="flex items-end justify-center gap-5 sm:gap-6 mb-1 relative z-20">
              {[0, 1, 2].map((candleIdx) => (
                <div key={candleIdx} className="flex flex-col items-center relative">
                  {/* Flame */}
                  <AnimatePresence>
                    {!candlesBlown && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.15, 0.95, 1], y: [0, -2, 1, 0] }}
                        exit={{ scale: 0, y: -15, opacity: 0 }}
                        transition={{
                          scale: { repeat: Infinity, duration: 1.2 + candleIdx * 0.2 },
                          y: { repeat: Infinity, duration: 0.9 + candleIdx * 0.15 },
                        }}
                        className="relative flex items-center justify-center -mb-0.5"
                      >
                        {/* Outer Glow Halo */}
                        <div className="absolute w-8 h-8 rounded-full bg-yellow-400/40 blur-md pointer-events-none" />
                        {/* Flame core */}
                        <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_#fde047] transform -rotate-1" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Smoke drift after blown */}
                  {candlesBlown && (
                    <motion.div
                      initial={{ opacity: 0, y: 0, scale: 0.5 }}
                      animate={{ opacity: [0.7, 0], y: -30, scale: 1.8 }}
                      transition={{ duration: 1.8, delay: candleIdx * 0.15 }}
                      className="absolute -top-6 text-gray-300 pointer-events-none text-xs"
                    >
                      💨
                    </motion.div>
                  )}

                  {/* Wick */}
                  <div className="w-0.5 h-2 bg-neutral-800" />

                  {/* Candle Body */}
                  <div className={`w-3.5 h-11 rounded-t-sm bg-gradient-to-b ${
                    candleIdx === 1 ? 'from-pink-300 via-rose-300 to-pink-400' : 'from-amber-200 via-pink-200 to-rose-300'
                  } shadow-md border-x border-t border-white/40 flex flex-col justify-evenly py-1`}>
                    <div className="w-full h-0.5 bg-white/50 -rotate-12" />
                    <div className="w-full h-0.5 bg-white/50 -rotate-12" />
                    <div className="w-full h-0.5 bg-white/50 -rotate-12" />
                  </div>
                </div>
              ))}
            </div>

            {/* Cake Tier 1 (Top Tier) */}
            <div className="w-40 h-14 rounded-2xl bg-gradient-to-b from-rose-200 via-pink-300 to-rose-400 border border-white/40 shadow-lg relative z-10 flex flex-col items-center justify-between p-1.5 overflow-hidden">
              <div className="w-full flex justify-around text-rose-600 text-xs">
                <span>🍓</span>
                <span>✨</span>
                <span>🍓</span>
              </div>
              {/* Frosting Drips */}
              <div className="w-full h-2 bg-white/90 rounded-full shadow-inner" />
            </div>

            {/* Cake Tier 2 (Middle Tier) */}
            <div className="w-56 h-16 rounded-2xl bg-gradient-to-b from-rose-400 via-pink-500 to-rose-600 border border-white/30 shadow-xl relative -mt-3 z-0 flex flex-col items-center justify-between p-2 overflow-hidden">
              <div className="w-full flex justify-around text-white text-xs opacity-90">
                <span>🌸</span>
                <span>💖</span>
                <span>🌸</span>
                <span>💖</span>
              </div>
              <div className="w-full h-2.5 bg-pink-100/90 rounded-full shadow-inner" />
            </div>

            {/* Cake Tier 3 (Bottom Tier) */}
            <div className="w-68 sm:w-72 h-18 rounded-2xl bg-gradient-to-b from-rose-600 via-pink-700 to-rose-900 border border-white/20 shadow-2xl relative -mt-3 flex flex-col items-center justify-between p-2">
              <div className="w-full flex justify-evenly text-sm">
                <span>🍫</span>
                <span className="font-romantic text-base text-yellow-200 font-bold">Sneha</span>
                <span>🍫</span>
              </div>
              {/* Pearl bead decoration */}
              <div className="w-full flex justify-around">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="w-2 h-2 rounded-full bg-yellow-200 shadow-sm" />
                ))}
              </div>
            </div>

            {/* Golden Cake Platter / Stand */}
            <div className="w-80 h-3.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 shadow-2xl -mt-1 border-t border-white/60" />
          </div>

          {/* Hint Tag Below Cake */}
          <div className="mt-2">
            {!candlesBlown ? (
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs sm:text-sm font-medium backdrop-blur-sm"
              >
                <Wind size={15} className="animate-spin" style={{ animationDuration: '4s' }} />
                <span>Tap the cake to blow the candles! 💨</span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm font-medium"
              >
                <Sparkles size={14} className="text-yellow-300" />
                <span>May all your dreams come true, Sneha! ✨</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Revealed Next Step */}
        <AnimatePresence>
          {candlesBlown && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-4 flex flex-col items-center"
            >
              <p className="text-pink-200 text-sm sm:text-base font-medium mb-4 flex items-center gap-1.5">
                <Heart size={16} className="text-rose-400 fill-rose-400" />
                <span>{config.wish.nextPrompt}</span>
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleProceed}
                className="px-8 py-3.5 rounded-full font-semibold text-white tracking-wide bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-xl box-glow inline-flex items-center gap-2"
              >
                <span>{config.wish.buttonText}</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
