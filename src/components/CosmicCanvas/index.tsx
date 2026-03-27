"use client";

import { useRef, useEffect, useCallback } from "react";

interface CosmicCanvasProps {
  selectedColor: string;
  cursorPosition: { x: number; y: number };
  isDrawing: boolean;
  setIsDrawing: (isDrawing: boolean) => void;
  spraySize: number;
  sprayDensity: number;
  onClear?: () => void;
}

const CosmicCanvas: React.FC<CosmicCanvasProps> = ({
  selectedColor,
  cursorPosition,
  isDrawing,
  setIsDrawing,
  spraySize,
  sprayDensity,
  onClear,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    if (!onClear) return;
  }, [onClear]);

  const sprayParticles = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    for (let i = 0; i < sprayDensity; i++) {
      const u = Math.random();
      const v = Math.random();
      const radius =
        (spraySize *
          Math.sqrt(-2.0 * Math.log(u)) *
          Math.cos(2.0 * Math.PI * v)) /
        3;
      const angle = Math.random() * Math.PI * 2;

      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;

      const distFromCenter = Math.sqrt((px - x) ** 2 + (py - y) ** 2);
      const sizeRatio = 1 - Math.min(1, distFromCenter / spraySize);
      const size = 0.3 + sizeRatio * sizeRatio * 2.2;
      const opacity = Math.max(0.5, 0.85 - distFromCenter / (spraySize * 2));

      const r = parseInt(selectedColor.slice(1, 3), 16);
      const g = parseInt(selectedColor.slice(3, 5), 16);
      const b = parseInt(selectedColor.slice(5, 7), 16);

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;

      ctx.shadowColor = selectedColor;
      ctx.shadowBlur = 6;

      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
    }

    const ctx2 = canvas.getContext("2d")!;
    ctx2.shadowBlur = 0;
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 0) return;
    setIsDrawing(true);
    sprayParticles(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || e.touches.length === 0) return;
    sprayParticles(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  return (
    <div className="absolute inset-0 z-10" style={{ mixBlendMode: "screen" }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      />

      <button onClick={handleClear} className="hidden" id="cosmic-clear-btn" />
    </div>
  );
};

export default CosmicCanvas;
