"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if ("ontouchstart" in window || window.innerWidth < 768) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows immediately
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    // Lerp loop for lagged cursor
    let rafId: number;
    const animate = () => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      cursor.style.transform = `translate(${curX - 20}px, ${curY - 20}px)`;
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const onHoverIn = () => {
      cursor.style.width = "50px";
      cursor.style.height = "50px";
      cursor.style.background = "rgba(201, 168, 76, 0.18)";
      cursor.style.borderColor = "#C9A84C";
    };
    const onHoverOut = () => {
      cursor.style.width = "40px";
      cursor.style.height = "40px";
      cursor.style.background = "transparent";
      cursor.style.borderColor = "#C9A84C";
    };

    const interactiveEls = document.querySelectorAll("a, button, [data-cursor-hover]");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
      });
    };
  }, []);

  return (
    <>
      {/* Lagged ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-tertiary pointer-events-none z-[9998] transition-[width,height,background] duration-200"
        style={{ mixBlendMode: "difference" }}
      />
      {/* Instant dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-tertiary pointer-events-none z-[9999]"
      />
    </>
  );
}
