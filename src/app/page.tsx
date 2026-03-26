"use client";

import { useState } from "react";
import { ImageWithFallback } from "@/components/ImageWithFallback"; 
import CosmicCanvas from "@/components/CosmicCanvas"; 
import { COSMIC_COLORS } from "@/constants/colors"; 

export default function Home() {
  const [selectedColor, setSelectedColor] = useState(COSMIC_COLORS[0].hex);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black touch-none select-none">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2000&auto=format&fit=crop"
          alt="Deep space background"
          className="size-full object-cover"
        />
      </div>

      <CosmicCanvas
        selectedColor={selectedColor}
        cursorPosition={cursorPosition}
        isDrawing={isDrawing}
        setIsDrawing={setIsDrawing}
      />

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {COSMIC_COLORS.map((color) => (
          <button
            key={color.hex}
            onClick={() => setSelectedColor(color.hex)}
            className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
            style={{
              backgroundColor: color.hex,
              borderColor:
                selectedColor === color.hex ? "white" : "transparent",
              boxShadow:
                selectedColor === color.hex ? `0 0 10px ${color.hex}` : "none",
            }}
            title={color.name}
          />
        ))}
      </div>
    </main>
  );
}
