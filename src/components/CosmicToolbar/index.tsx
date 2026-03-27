"use client";

import React from "react";
import { LightWand } from "../LightWand";
import { COSMIC_COLORS } from "@/constants/colors";

interface CosmicToolbarProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  onClear: () => void;
}

const CosmicToolbar: React.FC<CosmicToolbarProps> = ({
  selectedColor,
  onSelectColor,
  onClear,
}) => {
  return (
    <>
      <div
        className="hidden md:block w-full"
        style={{
          background:
            "linear-gradient(to top, rgba(5,5,20,0.95), rgba(5,5,20,0.7))",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="flex items-end justify-center gap-6 px-8 py-6"
          style={{ scrollbarWidth: "none" }}
        >
          {COSMIC_COLORS.map((color) => (
            <div key={color.hex} className="shrink-0">
              {color.hex === selectedColor ? (
                <div className="h-24 w-8 opacity-0" />
              ) : (
                <LightWand
                  color={color.hex}
                  isSelected={false}
                  onClick={() => onSelectColor(color.hex)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className="md:hidden fixed right-0 top-0 bottom-0 z-10 flex flex-col items-center py-6 gap-3"
        style={{
          width: "64px",
          background:
            "linear-gradient(to left, rgba(5,5,20,0.95), rgba(5,5,20,0.7))",
          backdropFilter: "blur(12px)",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 16px) + 16px)",
        }}
      >
        <div
          className="flex flex-col items-center gap-3 overflow-y-auto flex-1 w-full py-2"
          style={{ scrollbarWidth: "none" }}
        >
          {COSMIC_COLORS.map((color) => (
            <div
              key={color.hex}
              className="shrink-0 flex justify-center w-full"
            >
              {color.hex === selectedColor ? (
                <div className="w-8 h-16 opacity-0" />
              ) : (
                <MobileWandDot
                  color={color.hex}
                  onClick={() => onSelectColor(color.hex)}
                />
              )}
            </div>
          ))}
        </div>

        <div
          className="w-8 h-px shrink-0"
          style={{ background: "rgba(255,255,255,0.1)" }}
        />

        <button
          onClick={onClear}
          className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-100 opacity-60"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
          aria-label="Clear canvas"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 20H7L3 16l10-10 7 7-3.5 3.5" />
            <path d="M6.5 17.5l4-4" />
          </svg>
        </button>
      </div>
    </>
  );
};

interface MobileWandDotProps {
  color: string;
  onClick: () => void;
}

const MobileWandDot: React.FC<MobileWandDotProps> = ({ color, onClick }) => {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="flex flex-col items-center gap-1 transition-transform duration-200"
      style={{
        transform: isHover ? "translateX(-4px)" : "translateX(0)",
      }}
      aria-label={`Select color ${color}`}
    >
      <div
        className="w-5 h-5 rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 8px 2px ${color}99, 0 0 16px 4px ${color}44`,
        }}
      />
      <div
        className="w-0.5 h-4 rounded-full"
        style={{
          background: `linear-gradient(to bottom, ${color}88, transparent)`,
        }}
      />
    </button>
  );
};

export default CosmicToolbar;
