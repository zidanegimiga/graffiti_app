"use client";

import { useState, useEffect } from "react";

interface CosmicPanelProps {
  spraySize: number;
  sprayDensity: number;
  onSizeChange: (val: number) => void;
  onDensityChange: (val: number) => void;
  onClear: () => void;
}

const CosmicPanel: React.FC<CosmicPanelProps> = ({
  spraySize,
  sprayDensity,
  onSizeChange,
  onDensityChange,
  onClear,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="hidden md:flex fixed left-5 top-5 z-30 w-52 rounded-xl p-4 flex-col gap-3"
        style={{
          background: "rgba(5, 5, 20, 0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 0 30px rgba(0,0,0,0.5)",
        }}
      >
        <PanelContent
          spraySize={spraySize}
          sprayDensity={sprayDensity}
          onSizeChange={onSizeChange}
          onDensityChange={onDensityChange}
          onClear={onClear}
        />
      </div>

      <button
        className="md:hidden fixed left-4 top-4 z-30 w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(5,5,20,0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 12px rgba(168,85,247,0.3)",
        }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle settings"
      >
        <span className="text-white/70 text-lg leading-none">
          {isOpen ? "✕" : "⚙︎"}
        </span>
      </button>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/40"
          style={{ backdropFilter: "blur(2px)" }}
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className="md:hidden fixed left-0 right-0 bottom-0 z-40 rounded-t-2xl p-6 flex flex-col gap-4"
        style={{
          background: "rgba(5,5,20,0.97)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 400ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        <div className="flex justify-center -mt-2 mb-1">
          <div
            className="w-10 h-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.2)" }}
          />
        </div>

        <PanelContent
          spraySize={spraySize}
          sprayDensity={sprayDensity}
          onSizeChange={onSizeChange}
          onDensityChange={onDensityChange}
          onClear={() => {
            onClear();
            setIsOpen(false);
          }}
        />
      </div>
    </>
  );
};

// ── Shared panel content (used by both desktop and mobile) ──
const PanelContent: React.FC<CosmicPanelProps> = ({
  spraySize,
  sprayDensity,
  onSizeChange,
  onDensityChange,
  onClear,
}) => (
  <>
    <div>
      <h1
        className="text-white font-semibold tracking-widest text-sm uppercase"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Cosmic Ink
      </h1>
      <p className="text-white/30 text-xs mt-0.5">Paint with light</p>
    </div>

    <div
      className="w-full h-px"
      style={{ background: "rgba(255,255,255,0.06)" }}
    />

    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <label className="text-white/60 text-xs">Beam Size</label>
        <span className="text-white/40 text-xs">{spraySize}</span>
      </div>
      <input
        type="range"
        min={5}
        max={40}
        value={spraySize}
        onChange={(e) => onSizeChange(Number(e.target.value))}
        className="w-full accent-purple-400 cursor-pointer"
      />
    </div>

    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <label className="text-white/60 text-xs">Beam Density</label>
        <span className="text-white/40 text-xs">{sprayDensity}</span>
      </div>
      <input
        type="range"
        min={10}
        max={60}
        value={sprayDensity}
        onChange={(e) => onDensityChange(Number(e.target.value))}
        className="w-full accent-purple-400 cursor-pointer"
      />
    </div>

    <div
      className="w-full h-px"
      style={{ background: "rgba(255,255,255,0.06)" }}
    />

    <button
      onClick={onClear}
      className="w-full py-2 rounded-lg text-xs text-white/60 hover:text-white transition-colors"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      Clear Canvas
    </button>

    <p className="text-white/20 text-xs text-center">
      Cosmic Ink · Built by Zidane Gimiga
    </p>
  </>
);

export default CosmicPanel;
