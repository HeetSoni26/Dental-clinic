"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface CompareSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function CompareSlider({ beforeImage, afterImage }: CompareSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] overflow-hidden rounded-2xl editorial-shadow cursor-ew-resize select-none"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image (Background) */}
      <Image 
        src={afterImage} 
        alt="After Treatment" 
        fill 
        className="object-cover"
      />

      {/* Before Image (Overlay) */}
      <Image 
        src={beforeImage} 
        alt="Before Treatment" 
        fill 
        className="object-cover"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      />

      {/* Slider Handle */}
      <div 
        className="absolute inset-y-0 z-10 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
          <span className="material-symbols-outlined text-primary">unfold_more</span>
        </div>
      </div>

      <div className="absolute top-8 left-8 bg-black/30 backdrop-blur-md px-4 py-2 rounded text-white text-[10px] font-display uppercase tracking-widest z-20">Result</div>
      <div className="absolute top-8 right-8 bg-black/30 backdrop-blur-md px-4 py-2 rounded text-white text-[10px] font-display uppercase tracking-widest z-20">Previous</div>
    </div>
  );
}
