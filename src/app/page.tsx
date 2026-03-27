"use client";

import CosmicCanvas from "@/components/CosmicCanvas";
import CosmicToolbar from "@/components/CosmicToolbar";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { LightWand } from "@/components/LightWand";
import { COSMIC_COLORS } from "@/constants/colors";
import { useState, useEffect } from "react";

export default function Home() {
  const [selectedColor, setSelectedColor] = useState(COSMIC_COLORS[0].hex);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setCursorPosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        });
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setCursorPosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        });
      }
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

  const sprayOrigin = { x: cursorPosition.x, y: cursorPosition.y };

  const wandStyle = {
    left: cursorPosition.x,
    top: cursorPosition.y,
    transform: "translate(-50%, 0%) rotate(-10deg) scale(0.9)",
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black touch-none select-none cursor-none">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2000&auto=format&fit=crop"
          alt="Deep space background"
          className="size-full object-cover"
        />
      </div>

      <CosmicCanvas
        selectedColor={selectedColor}
        cursorPosition={sprayOrigin}
        isDrawing={isDrawing}
        setIsDrawing={setIsDrawing}
      />

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <CosmicToolbar
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
      </div>

      <div className="pointer-events-none fixed z-20" style={wandStyle}>
        <LightWand color={selectedColor} isSelected={true} asCursor={true} />
      </div>
    </main>
  );
}
