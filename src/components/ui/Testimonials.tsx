"use client";

import { useState } from "react";

const testimonials = [
  {
    name: "Elena Rossi",
    role: "Fashion Designer",
    text: "The level of care and precision here is unparalleled. My Invisalign journey was seamless, and the results are better than I ever imagined.",
    rating: 5,
  },
  {
    name: "Marcus Vance",
    role: "Architect",
    text: "From the moment you walk in, you feel at peace. Dr. Chen is a master of his craft. My implants feel and look completely natural.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-10 md:py-16 bg-primary-container text-on-primary overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-10 md:gap-20">
        <div className="md:w-1/3">
          <span className="material-symbols-outlined text-4xl md:text-6xl text-tertiary mb-4 md:mb-8">format_quote</span>
          <h2 className="font-serif text-3xl md:text-5xl mb-6 md:mb-8 leading-tight">Voices of Renewed Confidence</h2>
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button 
              onClick={() => setActiveIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="md:w-2/3 flex gap-4 md:gap-8 overflow-x-auto hide-scrollbar snap-x pb-4 md:pb-0">
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className={`min-w-[85vw] sm:min-w-[350px] md:min-w-[400px] bg-white/5 p-8 md:p-12 rounded-2xl backdrop-blur-sm border border-white/10 snap-center transition-opacity duration-500 ${activeIndex === idx ? "opacity-100" : "opacity-40"}`}
            >
              <div className="flex text-tertiary mb-6 md:mb-8">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="font-serif text-lg md:text-xl mb-8 md:mb-12 italic leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-500/20 flex items-center justify-center font-display text-xs">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-display text-sm uppercase tracking-widest">{t.name}</p>
                  <p className="text-on-primary-container text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
