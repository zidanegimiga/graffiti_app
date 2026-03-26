// "use client";

// import { useState } from "react";
// import { ImageWithFallback } from "@/components/ImageWithFallback";
// import CosmicCanvas from "@/components/CosmicCanvas";
// import { COSMIC_COLORS } from "@/constants/colors";

// export default function Home() {
//   const [selectedColor, setSelectedColor] = useState(COSMIC_COLORS[0].hex);
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
//   const [isDrawing, setIsDrawing] = useState(false);

//   return (
//     <main className="relative w-screen h-screen overflow-hidden bg-black touch-none select-none">
//       <div className="absolute inset-0 z-0">
//         <ImageWithFallback
//           src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2000&auto=format&fit=crop"
//           alt="Deep space background"
//           className="size-full object-cover"
//         />
//       </div>

//       <CosmicCanvas
//         selectedColor={selectedColor}
//         cursorPosition={cursorPosition}
//         isDrawing={isDrawing}
//         setIsDrawing={setIsDrawing}
//       />

//       <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
//         {COSMIC_COLORS.map((color) => (
//           <button
//             key={color.hex}
//             onClick={() => setSelectedColor(color.hex)}
//             className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
//             style={{
//               backgroundColor: color.hex,
//               borderColor:
//                 selectedColor === color.hex ? "white" : "transparent",
//               boxShadow:
//                 selectedColor === color.hex ? `0 0 10px ${color.hex}` : "none",
//             }}
//             title={color.name}
//           />
//         ))}
//       </div>
//     </main>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import CosmicCanvas from "@/components/CosmicCanvas";
import { COSMIC_COLORS } from "@/constants/colors";
import { ClientOnly } from "@/components/ClientOnly";


export default function Home() {
  return (
    <ClientOnly>
      <HomeContent />
    </ClientOnly>
  );
}

function HomeContent() {
  const [stage, setStage] = useState<"branding" | "app">("branding");
  const [selectedColor, setSelectedColor] = useState(COSMIC_COLORS[0].hex);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStage("app"), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black touch-none select-none font-space">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2000&auto=format&fit=crop"
          alt="Deep space background"
          className="size-full object-cover opacity-60"
        />
      </div>

      {stage === "branding" && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[2px] animate-overlay-exit">
          <h1 className="text-white text-6xl md:text-9xl font-bold tracking-tighter animate-cosmic-pop">
            COSMIC INK
          </h1>
          <div className="mt-4 w-12 h-1 px-1 bg-white/20 rounded-full overflow-hidden">
            {/* <div className="h-full bg-[#3578ff] animate-loader-progress" /> */}
          </div>
        </div>
      )}

      <div
        className={`relative z-10 w-full h-full transition-all duration-1000 ease-in-out ${
          stage === "app" ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <CosmicCanvas
          selectedColor={selectedColor}
          cursorPosition={cursorPosition}
          isDrawing={isDrawing}
          setIsDrawing={setIsDrawing}
        />

        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-20">
                    <h1 className="text-white text-xl md:text-xl font-bold tracking-tighter animate-cosmic-pop">
            Select a color and let&apos;s spray paint the galaxy!
          </h1>
        </div>
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-4 p-3 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {COSMIC_COLORS.map((color) => (
            <button
              key={color.hex}
              onClick={() => setSelectedColor(color.hex)}
              className={`w-12 h-12 rounded-2xl transition-all duration-500 active:scale-75 ${
                selectedColor === color.hex
                  ? "scale-110 -rotate-6 shadow-[0_0_25px_-5px_rgba(255,255,255,0.4)] ring-2 ring-white"
                  : "opacity-40 hover:opacity-100 hover:-rotate-3"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
