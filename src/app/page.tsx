"use client";

import { useState } from "react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import CosmicCanvas from "@/components/CosmicCanvas";

export default function Home() {
  const [selectedColor, setSelectedColor] = useState("#a855f7");
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

    </main>
  );
}