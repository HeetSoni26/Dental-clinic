"use client";

import { useRef, ReactNode } from "react";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

/**
 * Wraps children in a 3D perspective card that tilts on mouse movement.
 * Disabled on touch devices.
 */
export default function Card3D({ children, className = "", intensity = 12 }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if ("ontouchstart" in window) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.boxShadow = "0 8px 32px rgba(201, 168, 76, 0.25)";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.boxShadow = "";
    card.style.transition = "transform 0.5s ease-out, box-shadow 0.5s ease-out";
    setTimeout(() => {
      if (card) card.style.transition = "transform 0.1s ease-out, box-shadow 0.1s ease-out";
    }, 500);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out, box-shadow 0.1s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
