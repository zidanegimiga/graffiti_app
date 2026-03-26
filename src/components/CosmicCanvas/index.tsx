"use client";

import { useRef, useEffect } from "react";

interface CosmicCanvasProps {
  selectedColor: string;
  cursorPosition: { x: number; y: number };
  isDrawing: boolean;
  setIsDrawing: (isDrawing: boolean) => void;
}

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

  const drawDot = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = selectedColor;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    drawDot(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    drawDot(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="absolute inset-0 z-10">
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