"use client";

import Link from "next/link";

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 w-full md:hidden z-[110] bg-white/90 backdrop-blur-lg border-t border-outline-variant/10 shadow-[0_-8px_24px_rgba(10,22,40,0.08)]">
      <div className="flex justify-around items-center h-16 px-4">
        <a href="tel:+15550009999" className="text-on-surface-variant flex flex-col items-center justify-center active:bg-surface-container-low transition-colors w-full h-full">
          <span className="material-symbols-outlined">call</span>
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest mt-1">Call Now</span>
        </a>
        
        <Link href="/book" className="text-tertiary flex flex-col items-center justify-center active:bg-surface-container-low transition-colors w-full h-full">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>event</span>
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest mt-1">Book Now</span>
        </Link>
        
        <a href="https://wa.me/15550009999" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant flex flex-col items-center justify-center active:bg-surface-container-low transition-colors w-full h-full">
          <span className="material-symbols-outlined">chat</span>
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest mt-1">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
