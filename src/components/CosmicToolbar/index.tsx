"use client";

import React from "react";
import { LightWand } from "../LightWand";
import { COSMIC_COLORS } from "@/constants/colors";

interface CosmicToolbarProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const CosmicToolbar: React.FC<CosmicToolbarProps> = ({
  selectedColor,
  onSelectColor,
}) => {
  return (
    <div
      className="w-full"
      style={{
        background:
          "linear-gradient(to top, rgba(5,5,20,0.95), rgba(5,5,20,0.7))",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="
          flex items-end gap-4 px-6 py-6
          overflow-x-auto
          md:justify-center md:gap-6 md:px-8
          snap-x snap-mandatory
        "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {COSMIC_COLORS.map((color) => (
          <div key={color.hex} className="snap-center shrink-0">
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
  );
};

export default CosmicToolbar;
