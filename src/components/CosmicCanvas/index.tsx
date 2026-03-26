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

  return (
    <div className="absolute inset-0 z-10">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
    </div>
  );
};

export default CosmicCanvas;