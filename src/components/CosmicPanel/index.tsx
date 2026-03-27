"use client";

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
  return (
    <div
      className="fixed left-5 top-5 z-30 w-52 rounded-xl p-4 flex flex-col gap-3"
      style={{
        background: "rgba(5, 5, 20, 0.85)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 0 30px rgba(0,0,0,0.5)",
      }}
    >
      <div>
        <h1 className="text-white font-semibold tracking-widest text-sm uppercase">
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
          className="w-full accent-green-400 cursor-pointer"
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
          className="w-full accent-green-400 cursor-pointer"
        />
      </div>

      <div
        className="w-full h-px"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      <button
        onClick={onClear}
        className="w-full py-1.5 rounded-lg text-xs text-white/60 hover:text-white transition-colors"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        Clear Canvas
      </button>

      <p className="text-white/20 text-xs text-center">
        Cosmic Ink. Built by Zidane Gimiga
      </p>
    </div>
  );
};

export default CosmicPanel;
