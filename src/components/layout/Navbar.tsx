"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Doctors", href: "/doctors" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full z-[100] bg-white/75 backdrop-blur-xl border-b border-outline-variant/10 shadow-sm">
      <div className="flex justify-between items-center px-4 md:px-8 py-3 max-w-screen-2xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1.5 group" onClick={() => setIsOpen(false)}>
          <span
            className="text-[1.3rem] md:text-[1.65rem] text-primary group-hover:text-tertiary transition-colors duration-300"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            SmileCraft
          </span>
          <span
            className="text-[1.05rem] md:text-[1.35rem] text-tertiary"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, fontStyle: "italic" }}
          >
            Dental
          </span>
        </Link>
        
        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden text-primary p-1 focus:outline-none flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
           <span className="material-symbols-outlined text-[28px]">{isOpen ? "close" : "menu"}</span>
        </button>

        {/* Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative group transition-colors duration-300 ${
                  isActive ? "text-tertiary" : "text-primary/65 hover:text-primary"
                }`}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  letterSpacing: "0.05em",
                }}
              >
                {link.name}
                {/* Slide-in gold underline */}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] bg-tertiary rounded-full transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* CTA (Desktop) */}
        <Link href="/book" className="hidden md:block">
          <Button variant="primary" className="px-6 py-2.5">
            Book Now
          </Button>
        </Link>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-[100%] left-0 w-full bg-white border-b border-outline-variant/10 shadow-lg transition-all duration-300 origin-top overflow-hidden ${isOpen ? "scale-y-100 opacity-100 py-6" : "scale-y-0 opacity-0 h-0 py-0"}`}>
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link) => {
             const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
             return (
               <Link
                 key={link.name}
                 href={link.href}
                 onClick={() => setIsOpen(false)}
                 className={`text-xl font-serif transition-colors duration-300 ${isActive ? "text-tertiary" : "text-primary"}`}
               >
                 {link.name}
               </Link>
             )
          })}
          <Link href="/book" onClick={() => setIsOpen(false)} className="mt-4">
             <Button variant="primary" className="px-8 py-3 text-lg">
                Book Now
             </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
