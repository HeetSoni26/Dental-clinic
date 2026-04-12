"use client";

import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  icon: string;
}

export default function ServiceCard({ title, description, image, href, icon }: ServiceCardProps) {
  return (
    <Link 
      href={href}
      className="relative aspect-[4/5] rounded-xl overflow-hidden group editorial-shadow"
    >
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
      
      {/* Frosted Glass Panel */}
      <div className="absolute bottom-0 inset-x-0 p-8 m-4 rounded-xl backdrop-blur-xl bg-white/70 border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <span className="material-symbols-outlined text-tertiary mb-4 block">{icon}</span>
        <h3 className="font-serif text-2xl text-primary mb-3">{title}</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
          {description}
        </p>
      </div>
    </Link>
  );
}
