"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Shows only on first session visit, skips after. */
export default function PageLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("smilecraft_loaded")) return;

    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.style.display = "flex";

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("smilecraft_loaded", "true");
        window.dispatchEvent(new Event("loaderDone"));
      },
    });

    // Phase 1: fill the tooth SVG using GSAP clip-path
    const path = overlay.querySelector<SVGPathElement>("#tooth-fill");
    if (path) {
      tl.fromTo(
        path,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.7, ease: "power2.out" },
        0
      );
    }

    // Phase 2: scale + fade overlay out
    tl.to(
      overlay,
      {
        opacity: 0,
        scale: 0.96,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          overlay.style.display = "none";
        },
      },
      0.85
    );
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center"
      style={{ display: "none" }}
    >
      {/* Tooth SVG */}
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outline */}
        <path
          d="M12 2C9.5 2 8 3 7 4C5.5 4 4 5 4 7C4 9 5 11 5.5 13.5C6 16 6 22 8 22C9.5 22 10 20 12 20C14 20 14.5 22 16 22C18 22 18 16 18.5 13.5C19 11 20 9 20 7C20 5 18.5 4 17 4C16 3 14.5 2 12 2Z"
          stroke="#C9A84C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Fill (animated) */}
        <path
          id="tooth-fill"
          d="M12 2C9.5 2 8 3 7 4C5.5 4 4 5 4 7C4 9 5 11 5.5 13.5C6 16 6 22 8 22C9.5 22 10 20 12 20C14 20 14.5 22 16 22C18 22 18 16 18.5 13.5C19 11 20 9 20 7C20 5 18.5 4 17 4C16 3 14.5 2 12 2Z"
          fill="#C9A84C"
          opacity="0.85"
        />
      </svg>

      <div className="mt-8 font-serif text-2xl text-white tracking-wide">SmileCraft Dental</div>
      <div className="w-32 h-[2px] mt-4 bg-tertiary/30 rounded-full overflow-hidden">
        <div className="h-full bg-tertiary rounded-full animate-[loading_1.1s_ease-out_forwards]" />
      </div>
    </div>
  );
}
