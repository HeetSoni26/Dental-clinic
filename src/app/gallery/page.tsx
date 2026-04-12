"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";
import { useRevealAnimation } from "@/hooks/useAnimations";
import { AnimatePresence, motion } from "framer-motion";

const categories = ["All", "Whitening", "Veneers", "Implants", "Orthodontics", "Makeover"];

const galleryItems = [
  { src: "/compare_after_1776015065676.png", alt: "Perfect smile after whitening", category: "Whitening" },
  { src: "/compare_before_1776015116248.png", alt: "Natural smile before treatment", category: "Makeover" },
  { src: "/blog_architecture_1776015335754.png", alt: "Smile architecture - cosmetic result", category: "Veneers" },
  { src: "/blog_gums_1776015383561.png", alt: "Healthy gums after periodontal care", category: "Implants" },
  { src: "/blog_straight_teeth_1776015367519.png", alt: "Straight teeth after orthodontic treatment", category: "Orthodontics" },
  { src: "/blog_psychology_1776015401202.png", alt: "Confident smile - smile makeover result", category: "Makeover" },
  { src: "/blog_implants_1776015351867.png", alt: "3D guided dental implant technology", category: "Implants" },
  { src: "/blog_aligners_1776015416487.png", alt: "Clear aligners - Invisalign treatment", category: "Orthodontics" },
  { src: "/hero_patient_1_1776015001405.png", alt: "Happy patient after treatment", category: "Whitening" },
  { src: "/hero_patient_2_1776015020239.png", alt: "Confident smile transformation", category: "Makeover" },
  { src: "/doctor_sarah_1776015037223.png", alt: "Dr. Sarah Mitchell - Expert cosmetic dentist", category: "Veneers" },
  { src: "/doctor_james_1776015052907.png", alt: "Dr. James Chen - Master implantologist", category: "Implants" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const revealRef = useRevealAnimation(0.06);

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(i => i.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => (i !== null ? (i > 0 ? i - 1 : filtered.length - 1) : null));
  const nextImage = () => setLightboxIndex(i => (i !== null ? (i < filtered.length - 1 ? i + 1 : 0) : null));

  return (
    <div className="bg-surface pb-24">
      {/* Hero */}
      <header className="py-16 md:py-20 px-4 md:px-8 max-w-screen-2xl mx-auto text-center md:text-left">
        <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-tertiary block mb-3">Visual Archive</span>
        <h1 className="font-serif text-5xl md:text-7xl text-primary mb-4">Our Work Speaks</h1>
        <p className="text-on-surface-variant text-base md:text-xl max-w-xl mx-auto md:mx-0">
          Every image tells a story of transformation — clinical precision meeting artistic mastery.
        </p>
      </header>

      {/* Filter Tabs */}
      <div className="px-4 md:px-8 max-w-screen-2xl mx-auto mb-10 md:mb-12">
        <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-display text-[10px] uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-on-primary shadow-md"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-secondary-container"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div ref={revealRef} className="px-4 md:px-8 max-w-screen-2xl mx-auto">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-outline-variant/10 rounded-xl overflow-hidden">
          <AnimatePresence>
            {filtered.map((item, idx) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="reveal-child relative aspect-square overflow-hidden bg-surface-container group cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                <Image
                  fill
                  src={item.src}
                  alt={item.alt}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
                  <span className="font-display text-[10px] uppercase tracking-widest text-white/80">{item.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}
