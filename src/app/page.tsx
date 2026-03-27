"use client";

import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import CosmicCanvas from "@/components/CosmicCanvas";
import CosmicToolbar from "@/components/CosmicToolbar";
import CosmicPanel from "@/components/CosmicPanel";
import { LightWand } from "@/components/LightWand";
import { COSMIC_COLORS } from "@/constants/colors";
import EntryAnimation from "@/components/EntryAnimation";
import HintToast from "@/components/HintToast.tsx";

export default function Home() {
  const [selectedColor, setSelectedColor] = useState(COSMIC_COLORS[0].hex);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [spraySize, setSpraySize] = useState(20);
  const [sprayDensity, setSprayDensity] = useState(30);
  const [isOverToolbar, setIsOverToolbar] = useState(false);
  const [showEntry, setShowEntry] = useState(true);

  const clearCanvasRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0)
        setCursorPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0)
        setCursorPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  const handleClear = () => {
    document.getElementById("cosmic-clear-btn")?.click();
  };

  const wandStyle = {
    left: cursorPosition.x,
    top: cursorPosition.y,
    transform: "translate(-50%, 0%) rotate(-10deg) scale(0.9)",
  };

  return (
    <main
      className="relative w-screen h-screen overflow-hidden bg-black touch-none select-none"
      style={{ cursor: isOverToolbar ? "auto" : "none" }}
    >
      {showEntry && <EntryAnimation onComplete={() => setShowEntry(false)} />}
      {!showEntry && (
        <HintToast message="Select a color" />
      )}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2000&auto=format&fit=crop"
          alt="Deep space background"
          className="size-full object-cover"
        />
      </div>

      <CosmicCanvas
        selectedColor={selectedColor}
        cursorPosition={{ x: cursorPosition.x, y: cursorPosition.y }}
        isDrawing={isDrawing}
        setIsDrawing={setIsDrawing}
        spraySize={spraySize}
        sprayDensity={sprayDensity}
      />

      <div
        className="hidden md:block absolute bottom-0 left-0 right-0 z-10 pb-safe"
        onMouseEnter={() => setIsOverToolbar(true)}
        onMouseLeave={() => setIsOverToolbar(false)}
      >
        <CosmicToolbar
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          onClear={handleClear}
        />
      </div>

      <div
        className="md:hidden"
        onMouseEnter={() => setIsOverToolbar(true)}
        onMouseLeave={() => setIsOverToolbar(false)}
      >
        <CosmicToolbar
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          onClear={handleClear}
        />
      </div>

      <div
        onMouseEnter={() => setIsOverToolbar(true)}
        onMouseLeave={() => setIsOverToolbar(false)}
      >
        <CosmicPanel
          spraySize={spraySize}
          sprayDensity={sprayDensity}
          onSizeChange={setSpraySize}
          onDensityChange={setSprayDensity}
          onClear={handleClear}
        />
      </div>

      {!isOverToolbar && (
        <div className="pointer-events-none fixed z-20" style={wandStyle}>
          <LightWand color={selectedColor} isSelected={true} asCursor={true} />
        </div>
      )}
    </main>
  );
}
