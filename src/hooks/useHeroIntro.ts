"use client";

import { useEffect } from "react";
import gsap from "gsap";

/**
 * Animation 7 — 3D word-by-word hero headline reveal.
 * Fires AFTER the loader dispatches 'loaderDone' (or immediately if loader already done).
 * Splits the .hero-headline element's words into spans and staggers them in.
 */
export function useHeroIntro() {
  useEffect(() => {
    const headline = document.querySelector<HTMLElement>(".hero-headline");
    if (!headline) return;

    // Split text into word spans
    const rawText = headline.innerText;
    const words = rawText.split(/(\s+)/);
    headline.innerHTML = words
      .map((word) =>
        word.trim()
          ? `<span class="hero-word" style="display:inline-block;opacity:0;transform:rotateX(90deg) translateY(20px);">${word}</span>`
          : word
      )
      .join("");

    const wordEls = headline.querySelectorAll<HTMLElement>(".hero-word");

    const runAnim = () => {
      gsap.to(wordEls, {
        opacity: 1,
        rotateX: 0,
        y: 0,
        duration: 0.7,
        ease: "back.out(1.4)",
        stagger: 0.08,
        perspective: 800,
      });
    };

    if (sessionStorage.getItem("smilecraft_loaded")) {
      // Already loaded — fire immediately
      runAnim();
    } else {
      // Wait for loader to finish
      const handler = () => runAnim();
      window.addEventListener("loaderDone", handler, { once: true });
      return () => window.removeEventListener("loaderDone", handler);
    }
  }, []);
}
