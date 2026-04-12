"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";

interface LightboxProps {
  images: { src: string; alt: string; category?: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const img = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-lg flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
      >
        <span className="material-symbols-outlined text-2xl">close</span>
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 font-display text-xs uppercase tracking-widest text-white/50">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-6 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
      >
        <span className="material-symbols-outlined text-2xl">arrow_back</span>
      </button>

      {/* Image */}
      <div
        className="relative max-w-5xl max-h-[80vh] w-full mx-20 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ aspectRatio: "4/3" }}
      >
        <Image
          fill
          src={img.src}
          alt={img.alt}
          className="object-contain"
          sizes="(max-width: 768px) 90vw, 80vw"
          priority
        />
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-6 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
      >
        <span className="material-symbols-outlined text-2xl">arrow_forward</span>
      </button>

      {/* Caption */}
      {img.alt && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-serif text-white/70 italic text-sm">
          {img.alt}
        </div>
      )}
    </div>
  );
}
