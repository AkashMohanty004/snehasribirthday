import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { config } from '../config';

export default function LoveGame({ onNext }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = config.game.questions;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (option, idx) => {
    if (selectedOption !== null) return; // Prevent double taps

    setSelectedOption(idx);
    setFeedback(option.response);

    // Play micro confetti burst
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#ff3366', '#f43f5e', '#fcd34d', '#f472b6']
    });

    // Advance to next question or complete game
    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(currentIdx + 1);
        setSelectedOption(null);
        setFeedback(null);
      } else {
        setIsCompleted(true);
        // Celebration confetti explosion
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#ff3366', '#fb7185', '#fef08a', '#ec4899', '#ffffff']
        });
      }
    }, 1600);
  };

  const handleProceed = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 }
    });
    setTimeout(() => {
      onNext();
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
      transition={{ duration: 0.7 }}
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 relative z-10"
    >
      <div className="w-full max-w-lg mx-auto">
        {!isCompleted ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-pink-300 mb-3 tracking-wide">
                <span>Quiz for Sneha</span>
                <span className="text-yellow-300">★</span>
                <span>Question {currentIdx + 1} of {questions.length}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-pink-100 mb-1">
                {config.game.title}
              </h2>
              <p className="text-sm text-pink-200/80 font-sans">
                {config.game.subtitle}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-rose-500 to-pink-400 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIdx) / questions.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-panel rounded-3xl p-6 sm:p-8 box-glow relative overflow-hidden"
              >
                <div className="flex items-start gap-3 mb-6">
                  <span className="p-2 rounded-xl bg-rose-500/20 text-rose-300">
                    <HelpCircle size={22} />
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug">
                    {currentQ.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    return (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectOption(opt, idx)}
                        disabled={selectedOption !== null}
                        className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                          isSelected
                            ? 'bg-rose-500/30 border-rose-400 text-white shadow-lg shadow-rose-500/20'
                            : 'bg-white/5 hover:bg-white/10 border-white/10 text-pink-100 hover:border-pink-300/30'
                        }`}
                      >
                        <span className="font-medium text-base sm:text-lg">
                          {opt.text}
                        </span>
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-rose-300"
                          >
                            <CheckCircle2 size={20} />
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Feedback note when clicked */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-5 p-3.5 rounded-xl bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-pink-400/30 text-center"
                    >
                      <p className="text-sm font-medium text-pink-200">
                        {feedback}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          /* Completion Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-panel rounded-3xl p-8 sm:p-10 text-center box-glow relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-400 to-rose-600" />
            
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-4xl shadow-inner">
              👑
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-pink-100 mb-3">
              {config.game.successHeading}
            </h2>

            <p className="text-pink-200/90 text-sm sm:text-base mb-8 max-w-sm mx-auto leading-relaxed">
              {config.game.successSubtitle}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleProceed}
              className="px-8 py-4 rounded-full font-semibold text-white tracking-wide bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-xl box-glow flex items-center justify-center gap-3 mx-auto"
            >
              <span>{config.game.buttonText}</span>
              <Sparkles size={18} className="text-yellow-200" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
