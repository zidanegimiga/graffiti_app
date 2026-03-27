"use client";

import React, { useState } from "react";

interface LightWandProps {
  color: string;
  isSelected: boolean;
  onClick?: () => void;
  asCursor?: boolean;
}

export const LightWand: React.FC<LightWandProps> = ({
  color,
  isSelected,
  onClick,
  asCursor = false,
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`relative cursor-pointer ${!asCursor ? "transition-all duration-300" : ""}`}
      style={{ transform: isHover && !asCursor ? "translateY(-16px)" : "" }}
      onClick={onClick}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative h-24 w-8 flex flex-col items-center">
        <div
          className="w-2 h-2 rounded-full z-10"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 6px 2px ${color}, 0 0 12px 4px ${color}88`,
          }}
        />

        <div
          className="w-1 flex-1 rounded-full"
          style={{
            background: `linear-gradient(180deg, ${color}cc 0%, #1a1a2e 60%, #0f0f1a 100%)`,
            boxShadow: `0 0 4px ${color}44`,
          }}
        />

        <div
          className="w-3 h-4 rounded-md"
          style={{
            background: "linear-gradient(180deg, #2a2a3e, #0f0f1a)",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1)",
          }}
        />

        {asCursor && (
          <div
            className="absolute top-0 w-4 h-4 rounded-full -z-10 animate-pulse"
            style={{
              backgroundColor: color,
              opacity: 0.3,
              filter: "blur(6px)",
            }}
          />
        )}

        {isSelected && !asCursor && (
          <div
            className="absolute -bottom-2 w-4 h-1 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 8px ${color}`,
            }}
          />
        )}
      </div>
    </div>
  );
};
