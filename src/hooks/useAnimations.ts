"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable reveal animation hook.
 * Animates children with staggered fade + translateY on scroll enter.
 */
export function useRevealAnimation(stagger = 0.12) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const elements = ref.current!.querySelectorAll(".reveal-child");
      if (!elements.length) return;

      gsap.fromTo(
        elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [stagger]);

  return ref;
}

/**
 * Parallax hook — moves an element at a different speed relative to scroll.
 */
export function useParallax(yPercent = -15, scrub: number | boolean = true) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Reduce parallax on mobile
    const isMobile = window.innerWidth < 768;
    const finalY = isMobile ? -5 : yPercent;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: finalY,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [yPercent, scrub]);

  return ref;
}

/**
 * Clip-path mask reveal — wipes image in from left.
 */
export function useMaskReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const images = ref.current.querySelectorAll(".mask-reveal");
    if (!images.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        images,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.8,
          ease: "power3.inOut",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Counter animation — animates a number from 0 to target on scroll enter.
 */
export function useCounterAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const counters = ref.current.querySelectorAll<HTMLElement>("[data-count]");
    if (!counters.length) return;

    const ctx = gsap.context(() => {
      counters.forEach((el) => {
        const target = parseFloat(el.dataset.count || "0");
        const suffix = el.dataset.suffix || "";
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = (Number.isInteger(target) ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix;
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Zoom-in parallax — scales a background image from 1 to 1.08 as section enters view.
 * Wrap image in overflow:hidden container, pass ref to the inner image element.
 */
export function useZoomInParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scale: 1 },
        {
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return ref;
}
