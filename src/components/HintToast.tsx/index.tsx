"use client";

import { useEffect, useState } from "react";

interface HintToastProps {
  message: string;
  delay?: number;
}

const HintToast: React.FC<HintToastProps> = ({ message, delay = 5000 }) => {
  const [phase, setPhase] = useState<"hidden" | "visible" | "fading">("hidden");

  useEffect(() => {
    const showTimer = setTimeout(() => setPhase("visible"), 300);
    const fadeTimer = setTimeout(() => setPhase("fading"), delay);
    const doneTimer = setTimeout(() => setPhase("hidden"), delay + 800);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [delay]);

  if (phase === "hidden") return null;

  return (
    <div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-40
                 px-5 py-3 rounded-full flex items-center gap-2
                 pointer-events-none"
      style={{
        background: "rgba(5,5,20,0.9)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 0 20px rgba(168,85,247,0.25)",
        opacity: phase === "visible" ? 1 : 0,
        transition: "opacity 600ms ease",
        transform: `translateX(-50%) translateY(${
          phase === "visible" ? "0px" : "-8px"
        })`,
      }}
    >
      <span
        className="w-2 h-2 rounded-full animate-pulse"
        style={{ backgroundColor: "#a855f7" }}
      />
      <span
        className="text-white/70 text-xs tracking-wide whitespace-nowrap"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        {message}
      </span>
    </div>
  );
};

export default HintToast;
