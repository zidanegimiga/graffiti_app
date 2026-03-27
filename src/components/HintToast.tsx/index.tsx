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
      className="fixed bottom-36 left-1/2 z-40 pointer-events-none
                 px-6 py-3 rounded-full flex items-center gap-3"
      style={{
        transform: `translateX(-50%) translateY(${
          phase === "visible" ? "0px" : "10px"
        })`,
        opacity: phase === "visible" ? 1 : 0,
        transition: "opacity 600ms ease, transform 600ms ease",
        background: "rgba(168,85,247,0.18)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(168,85,247,0.5)",
        boxShadow:
          "0 0 24px rgba(168,85,247,0.4), inset 0 0 12px rgba(168,85,247,0.1)",
      }}
    >
      <span
        className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
        style={{
          backgroundColor: "#a855f7",
          boxShadow: "0 0 8px #a855f7",
        }}
      />
      <span
        className="text-white text-sm tracking-widest whitespace-nowrap"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        {message}
      </span>
    </div>
  );
};

export default HintToast;
