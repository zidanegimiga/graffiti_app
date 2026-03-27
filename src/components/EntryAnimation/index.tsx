/* eslint-disable react-hooks/purity */
"use client";

import { useEffect, useState } from "react";

interface EntryAnimationProps {
  onComplete: () => void;
}

const EntryAnimation: React.FC<EntryAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<"visible" | "fading">("visible");

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fading"), 2000);

    const doneTimer = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at center, #0d0d2b 0%, #000000 100%)",
        transition: "opacity 800ms ease-out",
        opacity: phase === "fading" ? 0 : 1,
        pointerEvents: phase === "fading" ? "none" : "auto",
      }}
      suppressHydrationWarning
    >
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
          suppressHydrationWarning
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.1,
              animation: `pulse ${Math.random() * 3 + 2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-4" suppressHydrationWarning>
        <h1
          className="text-4xl md:text-8xl font-bold tracking-widest text-transparent bg-clip-text text-white"
          style={{
            fontFamily: "var(--font-cinzel)",
            // backgroundImage:
            //   "linear-gradient(135deg, #ffffff 0%, #a855f7 40%, #00ffcc 100%)",
            animation: "fadeSlideUp 1s ease-out forwards",
          }}
        >
          COSMIC INK
        </h1>

        <p
          className="text-white/40 tracking-[0.4em] text-xs md:text-sm uppercase"
          style={{
            fontFamily: "var(--font-cinzel)",
            animation: "fadeSlideUp 1s ease-out 300ms forwards",
            opacity: 0,
          }}
        >
          Paint with light
        </p>
      </div>

      <style suppressHydrationWarning>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default EntryAnimation;
