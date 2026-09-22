import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Send, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { config } from '../config';

export default function LoveLetter({ onRestart, startMusic }) {
  // Trigger music autoplay upon mounting Page 5
  useEffect(() => {
    if (startMusic) {
      startMusic();
    }

    // Launch gentle celebration confetti
    const timer = setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff3366', '#fda4af', '#fcd34d', '#f43f5e', '#ffffff']
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, [startMusic]);

  const letter = config.letter;

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.3,
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: 'easeOut' },
    },
  };

  const whatsappMessage = encodeURIComponent(
    `Hey Biswajit ❤️ I just saw the birthday surprise website you made for me... It brought tears of joy to my eyes! I love you so much! 🥰❤️`
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen w-full flex flex-col items-center justify-start px-4 pt-16 pb-24 relative z-10"
    >
      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        {/* Top Romantic Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs sm:text-sm font-semibold text-pink-200 mb-6"
        >
          <Sparkles size={14} className="text-yellow-300" />
          <span>The Love Letter • From Biswajit's Heart</span>
          <Heart size={14} className="text-rose-400 fill-rose-400" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-romantic text-4xl sm:text-6xl text-pink-200 text-center mb-8 drop-shadow-lg"
        >
          {letter.heading}
        </motion.h1>

        {/* Parchment-style Glass Card for Letter */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="glass-panel w-full rounded-3xl p-6 sm:p-10 border border-pink-400/20 box-glow shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Decorative Rose Corners */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-pink-400 to-rose-600 opacity-70" />
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-rose-500/10 blur-xl pointer-events-none" />

          {/* Letter Body Paragraphs with Staggered Reveal */}
          <div className="space-y-6 text-pink-100/90 font-display text-base sm:text-lg leading-relaxed text-left">
            {letter.paragraphs.map((para, idx) => (
              <motion.p
                key={idx}
                variants={paragraphVariants}
                className={`whitespace-pre-line ${
                  idx === 0
                    ? 'text-xl sm:text-2xl font-bold text-white tracking-wide font-sans mb-3'
                    : ''
                } ${
                  idx === letter.paragraphs.length - 2
                    ? 'text-lg sm:text-xl text-rose-300 font-semibold'
                    : ''
                }`}
              >
                {para}
              </motion.p>
            ))}

            {/* Signature Block */}
            <motion.div
              variants={paragraphVariants}
              className="pt-6 border-t border-white/10"
            >
              <div className="font-romantic text-2xl sm:text-3xl text-pink-200 leading-snug">
                {letter.signatureLines.map((line, i) => (
                  <div key={i} className={i === 2 ? 'text-rose-400 font-bold text-3xl sm:text-4xl mt-1' : ''}>
                    {line}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Final Large Glowing Greeting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="h-0.5 w-40 mx-auto bg-gradient-to-r from-transparent via-rose-500 to-transparent mb-6" />
          
          <h2 className="font-romantic text-4xl sm:text-6xl md:text-7xl text-pink-300 text-glow">
            {letter.finalGreeting}
          </h2>

          <p className="font-display italic text-lg sm:text-2xl text-pink-200/90 mt-2">
            {letter.foreverYours}
          </p>

          <p className="font-sans text-xs sm:text-sm text-pink-400/80 mt-1 uppercase tracking-widest">
            {config.signature}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          {/* Send Love WhatsApp Button */}
          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-white tracking-wide bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 hover:from-emerald-500 hover:to-teal-600 shadow-xl box-glow inline-flex items-center justify-center gap-2.5 transition-transform active:scale-95"
          >
            <Send size={18} />
            <span>Send Love to Biswajit 💌</span>
          </a>

          {/* Replay Story Button */}
          <button
            onClick={onRestart}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full font-medium text-pink-200 hover:text-white glass-panel hover:bg-white/10 border border-white/20 transition-all inline-flex items-center justify-center gap-2 active:scale-95 text-sm"
          >
            <RotateCcw size={16} />
            <span>Experience Again ↺</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
