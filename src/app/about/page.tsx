"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useRevealAnimation, useParallax } from "@/hooks/useAnimations";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: "2009", title: "Founded in Beverly Hills", desc: "SmileCraft opened its first clinic with a vision to bring luxury aesthetics to dental care." },
  { year: "2012", title: "NABH Accreditation", desc: "Received national accreditation — the first specialty cosmetic dental clinic in the region to do so." },
  { year: "2016", title: "3D Imaging Suite", desc: "Invested in state-of-the-art CBCT and digital smile design technology." },
  { year: "2019", title: "5,000 Smiles Milestone", desc: "Celebrated transforming 5,000 patient smiles across cosmetic and restorative treatments." },
  { year: "2022", title: "International Training Centre", desc: "Launched a teaching clinic to share our methodologies with dental professionals worldwide." },
  { year: "2024", title: "Today", desc: "Rated 4.9 stars across Google, Practo, and JustDial — consistently cited as the city's top dental clinic." },
];

const clinicPhotos = [
  { src: "/hero_main_clinic_1776014982630.png", alt: "Main surgical suite" },
  { src: "/patient_care_hero_1776015303394.png", alt: "Patient reception" },
  { src: "/patient_care_lounge_1776015317336.png", alt: "Comfort lounge" },
  { src: "/service_tools_1776015433527.png", alt: "Premium instruments" },
  { src: "/blog_implants_1776015351867.png", alt: "Digital imaging centre" },
];

export default function AboutPage() {
  const heroParallaxRef = useParallax(-15);
  const revealRef = useRevealAnimation(0.1);
  const timelineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;
    const path = timelineRef.current;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: path,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-surface">
      {/* ─── Cinematic Hero ─── */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div ref={heroParallaxRef} className="absolute inset-[-10%]">
          <Image fill src="/hero_main_clinic_1776014982630.png" alt="SmileCraft clinic" className="object-cover" priority />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="relative z-10 text-center text-white px-4 md:px-8 max-w-4xl mx-auto">
          <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-tertiary block mb-4">Our Story</span>
          <h1 className="font-serif text-5xl md:text-8xl leading-tight mb-4 md:mb-6">Fifteen Years of<br /><em className="opacity-80">Crafted Smiles</em></h1>
          <p className="text-white/70 text-base md:text-xl max-w-2xl mx-auto px-2">
            We started with a single belief: clinical dentistry and high art are not opposites. They are inseparable.
          </p>
        </div>
      </section>

      {/* ─── Mission ─── */}
      <section ref={revealRef} className="py-16 md:py-20 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <span className="font-display text-xs uppercase tracking-[0.3em] text-tertiary block mb-3 reveal-child">Our Philosophy</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 reveal-child">Where Art Meets Clinical Precision</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-6 reveal-child">
              At SmileCraft, we believe a beautiful smile is a fundamental component of human confidence. It's why we treat every patient not as a case number — but as a creative collaboration between clinician and canvas.
            </p>
            <p className="text-on-surface-variant text-lg leading-relaxed reveal-child">
              Our team spends as much time studying proportion, symmetry, and facial aesthetics as they do clinical pharmacology. The result: smiles that don't look "done" — they look <em>right</em>.
            </p>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden editorial-shadow reveal-child">
            <Image fill src="/patient_care_lounge_1776015317336.png" alt="Clinic lounge" className="object-cover" />
          </div>
        </div>
      </section>

      {/* ─── Milestones Timeline ─── */}
      <section className="py-16 md:py-20 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="font-display text-xs uppercase tracking-[0.3em] text-tertiary block mb-3">Our Journey</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">Milestones That Define Us</h2>
          </div>

          <div className="relative">
            {/* SVG animated connector */}
            <svg className="absolute left-[calc(50%-1px)] top-0 bottom-0 hidden md:block" width="2" height="100%" style={{ height: "100%" }} aria-hidden>
              <path
                ref={timelineRef}
                d="M 1 0 L 1 10000"
                stroke="url(#goldGrad)"
                strokeWidth="2"
                fill="none"
              />
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A84C" />
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>

            <div className="space-y-8 md:space-y-12">
              {milestones.map((m, i) => (
                <div key={i} className={`flex items-start gap-4 md:gap-10 ${i % 2 === 0 ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse"} md:w-[calc(50%-24px)] ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-tertiary/10 border-2 border-tertiary flex-shrink-0 items-center justify-center font-display text-xs text-tertiary">
                    {m.year.slice(-2)}
                  </div>
                  <div className="bg-white p-5 md:p-6 rounded-xl editorial-shadow flex-1 w-full">
                    <p className="font-display text-xs uppercase tracking-widest text-tertiary mb-1">{m.year}</p>
                    <h3 className="font-serif text-xl text-primary mb-2">{m.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Clinic Photo Strip ─── */}
      <section className="py-16 md:py-20 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-primary mb-8 md:mb-10 text-center md:text-left">Inside SmileCraft</h2>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x pb-4">
          {clinicPhotos.map((p, i) => (
            <div key={i} className="relative flex-shrink-0 w-72 h-80 rounded-xl overflow-hidden snap-start group editorial-shadow">
              <Image fill src={p.src} alt={p.alt} className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="absolute bottom-4 left-4 text-white font-serif italic text-sm opacity-0 group-hover:opacity-100 transition-opacity">{p.alt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-primary-container text-white text-center">
        <h2 className="font-serif text-3xl md:text-4xl mb-3 md:mb-4">Ready to Begin Your Story?</h2>
        <p className="text-white/70 mb-6 md:mb-8 text-sm md:text-base">Join 5,000+ patients who've trusted us with their smiles.</p>
        <Link href="/book">
          <Button variant="tertiary" icon="calendar_today" className="px-8 md:px-10 py-4 md:py-5 w-full sm:w-auto justify-center">Book Your Consultation</Button>
        </Link>
      </section>
    </div>
  );
}
