"use client";

import { useRef, useEffect, useState } from "react";

interface CosmicCanvasProps {
  selectedColor: string;
  cursorPosition: { x: number; y: number };
  isDrawing: boolean;
  setIsDrawing: (isDrawing: boolean) => void;
}

interface Particle {
  x: number;
  y: number;
  color: string;
  size: number;
  opacity: number;
}

const SPRAY_SIZE = 20;
const SPRAY_DENSITY = 30;

const CosmicCanvas: React.FC<CosmicCanvasProps> = ({
  selectedColor,
  cursorPosition,
  isDrawing,
  setIsDrawing,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  const sprayParticles = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    for (let i = 0; i < SPRAY_DENSITY; i++) {
      const u = Math.random();
      const v = Math.random();
      const radius =
        (SPRAY_SIZE *
          Math.sqrt(-2.0 * Math.log(u)) *
          Math.cos(2.0 * Math.PI * v)) /
        3;

      const angle = Math.random() * Math.PI * 2;

      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;

      const distFromCenter = Math.sqrt((px - x) ** 2 + (py - y) ** 2);
      const sizeRatio = 1 - Math.min(1, distFromCenter / SPRAY_SIZE);
      const size = 0.3 + sizeRatio * sizeRatio * 2.2;
      const opacity = Math.max(0.5, 0.85 - distFromCenter / (SPRAY_SIZE * 2));

      const r = parseInt(selectedColor.slice(1, 3), 16);
      const g = parseInt(selectedColor.slice(3, 5), 16);
      const b = parseInt(selectedColor.slice(5, 7), 16);

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    sprayParticles(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    sprayParticles(e.clientX, e.clientY);
  };

  const handleMouseUp = () => setIsDrawing(false);

  return (
    <div className="absolute inset-0 z-10" style={{ mixBlendMode: "screen" }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default CosmicCanvas;
