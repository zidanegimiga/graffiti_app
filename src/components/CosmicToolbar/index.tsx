// app/components/CosmicToolbar.tsx
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
      className="flex items-end justify-center gap-6 px-8 py-6"
      style={{
        background:
          "linear-gradient(to top, rgba(5,5,20,0.95), rgba(5,5,20,0.7))",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {COSMIC_COLORS.map((color) => (
        <div key={color.hex} className="relative">
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
  );
};

export default CosmicToolbar;
