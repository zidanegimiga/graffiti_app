// app/page.tsx
import { ImageWithFallback } from "@/components/ImageWithFallback";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black touch-none select-none">

      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2000&auto=format&fit=crop"
          alt="Deep space background"
          className="size-full object-cover"
        />
      </div>

    </main>
  );
}