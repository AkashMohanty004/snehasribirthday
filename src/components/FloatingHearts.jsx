import React, { useMemo } from 'react';

export default function FloatingHearts() {
  // Generate a fixed set of floating hearts with deterministic properties for smooth performance
  const hearts = useMemo(() => {
    const emojis = ['❤️', '💖', '💕', '✨', '🌸', '💝', '💗', '⭐'];
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: `${(i * 4.7 + 3) % 96}%`,
      size: `${14 + (i % 5) * 6}px`,
      duration: `${10 + (i % 6) * 3}s`,
      delay: `${(i * 1.3) % 8}s`,
      opacity: 0.25 + (i % 4) * 0.15,
    }));
  }, []);

  // Soft glowing bokeh orbs
  const bokehOrbs = useMemo(() => {
    return [
      { id: 1, top: '15%', left: '10%', size: '320px', color: 'rgba(244, 63, 94, 0.15)' },
      { id: 2, top: '65%', right: '5%', size: '360px', color: 'rgba(168, 85, 247, 0.15)' },
      { id: 3, top: '40%', left: '45%', size: '280px', color: 'rgba(236, 72, 153, 0.12)' },
      { id: 4, bottom: '5%', left: '20%', size: '300px', color: 'rgba(251, 146, 60, 0.1)' },
    ];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0717] via-[#160b24] to-[#09030e]" />

      {/* Glowing Bokeh Orbs */}
      {bokehOrbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full blur-3xl animate-pulse-glow"
          style={{
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
            animationDuration: `${6 + orb.id * 2}s`,
          }}
        />
      ))}

      {/* Floating Hearts */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute select-none will-change-transform"
          style={{
            left: h.left,
            bottom: '-40px',
            fontSize: h.size,
            opacity: h.opacity,
            animation: `floatUpward ${h.duration} linear infinite`,
            animationDelay: h.delay,
            filter: 'drop-shadow(0 0 8px rgba(255, 105, 180, 0.4))',
          }}
        >
          {h.emoji}
        </div>
      ))}

      {/* Inline styles for the float upward keyframes */}
      <style>{`
        @keyframes floatUpward {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--tw-opacity, 0.6);
          }
          50% {
            transform: translateY(-50vh) translateX(15px) rotate(10deg);
          }
          90% {
            opacity: var(--tw-opacity, 0.6);
          }
          100% {
            transform: translateY(-110vh) translateX(-15px) rotate(-10deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
