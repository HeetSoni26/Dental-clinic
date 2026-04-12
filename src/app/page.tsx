"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import CompareSlider from "@/components/ui/CompareSlider";
import Testimonials from "@/components/ui/Testimonials";
import Card3D from "@/components/ui/Card3D";
import { useRevealAnimation, useCounterAnimation, useMaskReveal, useZoomInParallax } from "@/hooks/useAnimations";
import { useHeroIntro } from "@/hooks/useHeroIntro";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Section reveal refs
  const servicesRef = useRevealAnimation(0.1);
  const testimonialsRef = useRevealAnimation(0.12);
  const compareRef = useRevealAnimation(0.08);
  const doctorsRef = useRevealAnimation(0.1);
  const appointmentRef = useRevealAnimation(0.1);
  const statsRef = useCounterAnimation();
  const galleryMaskRef = useMaskReveal();

  // Hero image zoom-in parallax
  const heroZoomRef = useZoomInParallax();

  // Hero animation refs
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  // Animation 7 — 3D word-by-word headline reveal
  useHeroIntro();

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // Sub + CTA fade up (fire after loader)
    const runFadeIns = () => {
      const sub = heroSubRef.current;
      if (sub) {
        gsap.fromTo(sub, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.4 });
      }
      const cta = heroCTARef.current;
      if (cta) {
        gsap.fromTo(cta, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.6 });
      }
    };

    if (sessionStorage.getItem("smilecraft_loaded")) {
      runFadeIns();
    } else {
      window.addEventListener("loaderDone", runFadeIns, { once: true });
    }

    // Animation 3: Parallax on hero image container
    if (!heroImageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(heroImageRef.current, {
        yPercent: isMobile ? -5 : -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    // Doctor parallax
    const ctx = gsap.context(() => {
      gsap.to(".doctor-parallax", {
        yPercent: isMobile ? 5 : 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".doctors-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const services = [
    { title: "Teeth Whitening", desc: "Laser-guided whitening for a brighter smile in a single luxury session.", icon: "dentistry" },
    { title: "Dental Implants", desc: "Titanium precision for lifelong durability and natural function.", icon: "home_repair_service" },
    { title: "Invisalign", desc: "Invisible alignment therapy designed for professionals and active lifestyles.", icon: "align_center" },
    { title: "Root Canal", desc: "Pain-free endodontic care using advanced microscopic navigation.", icon: "medical_information" },
    { title: "Smile Makeover", desc: "A holistic facial aesthetic approach to redefine your complete look.", icon: "face_6" },
    { title: "Pediatric Dentistry", desc: "Nurturing positive dental experiences for our youngest patients.", icon: "child_care" },
  ];

  return (
    <div className="bg-surface">
      {/* ─────────── HERO ─────────── */}
      <section className="relative h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Left: Content (55%) */}
        <div className="w-full md:w-[55%] h-full flex flex-col justify-center px-4 sm:px-8 md:px-20 bg-surface z-10 pt-20 md:pt-0">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6 animate-fade-up" style={{ animationDelay: "0ms" }}>
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-surface bg-slate-200 overflow-hidden relative">
                  <Image fill src="/hero_patient_1_1776015001405.png" alt="Patient" className="object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-surface bg-slate-300 overflow-hidden relative">
                  <Image fill src="/hero_patient_2_1776015020239.png" alt="Patient" className="object-cover" />
                </div>
              </div>
              <span className="font-display text-xs md:text-sm text-on-surface-variant uppercase tracking-widest text-balance">
                Trusted by 5,000+ patients
              </span>
            </div>
            
            {/* Animation 7: hero headline — useHeroIntro splits this into words */}
            <h1
              className="hero-headline font-serif text-5xl sm:text-6xl md:text-[80px] leading-[1.05] md:leading-[0.95] text-primary mb-6 tracking-tighter"
              style={{ perspective: "800px" }}
            >
              Smile With Confidence{" "}
              <span className="italic text-tertiary">Again</span>
            </h1>
            
            <p ref={heroSubRef} className="text-on-surface-variant text-base md:text-xl leading-relaxed mb-8 md:mb-10 max-w-xl" style={{ opacity: 0 }}>
              Experience the gold standard of modern dentistry. Clinical excellence paired with the comfort of a luxury wellness retreat.
            </p>
            
            <div ref={heroCTARef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 md:gap-8" style={{ opacity: 0 }}>
              <Link href="/book" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full sm:w-auto px-8 py-4 md:py-5 text-base justify-center" icon="calendar_today">
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="/services" className="font-display text-primary border-b-2 border-tertiary-container/30 hover:border-tertiary transition-all py-1 text-center sm:text-left">
                Explore Services →
              </Link>
            </div>
            
            <div ref={statsRef as React.RefObject<HTMLDivElement>} className="mt-10 md:mt-12 flex gap-8 md:gap-12">
              <div>
                <div className="flex items-center gap-1 text-tertiary mb-1">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-display text-lg text-primary" data-count="4.9" data-suffix="">0</span>
                </div>
                <p className="font-sans text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">Google Rating</p>
              </div>
              <div className="h-10 w-[1px] bg-outline-variant/30"></div>
              <div>
                <div className="text-lg font-display text-primary mb-1" data-count="15" data-suffix="+">0+</div>
                <p className="font-sans text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">Years Experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image (45%) with Parallax + Zoom */}
        <div className="hidden md:block w-[45%] h-full relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-container/10 z-10"></div>
          {/* Outer parallax container */}
          <div ref={heroImageRef} className="absolute inset-0 scale-110 zoom-container">
            {/* Inner zoom ref for Animation 6 */}
            <div ref={heroZoomRef} className="absolute inset-0">
              <Image 
                fill 
                src="/hero_main_clinic_1776014982630.png" 
                alt="Dental Studio" 
                className="object-cover" 
                priority
              />
            </div>
          </div>
          <div className="absolute bottom-10 right-10 z-20 bg-white/30 backdrop-blur-md p-6 rounded-lg border border-white/20 editorial-shadow">
            <p className="text-primary font-serif italic text-xl max-w-[200px]">
              &ldquo;Where art meets clinical precision.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── TRUST STRIP ─────────── */}
      <section className="py-8 bg-surface-container-low border-y border-outline-variant/10 overflow-hidden">
        <div className="flex items-center gap-24 whitespace-nowrap px-8 animate-marquee">
          {[1, 2, 3, 4, 1, 2, 3, 4].map((i, idx) => (
            <div key={idx} className="flex items-center gap-4 text-outline font-display uppercase tracking-widest text-xs opacity-60 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-3xl">verified</span>
              {i === 1 && "Google Reviews"}
              {i === 2 && "ISO Certified 9001"}
              {i === 3 && "NABH Accredited"}
              {i === 4 && "Top Dental 2024"}
            </div>
          ))}
        </div>
      </section>

      {/* ─────────── SERVICES ─────────── */}
      <section ref={servicesRef} className="py-16 md:py-20 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6 md:gap-8">
          <div className="max-w-xl reveal-child">
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">World-Class Specializations</h2>
            <p className="text-on-surface-variant text-base md:text-lg">Every treatment is a bespoke journey tailored to your unique anatomy and aesthetic goals.</p>
          </div>
          <Link href="/services" className="font-display text-xs uppercase tracking-widest text-tertiary border-b border-tertiary pb-2 hover:brightness-110 transition-all reveal-child inline-block">
            View All Services
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/20 rounded-xl overflow-hidden shadow-sm">
          {services.map((service, idx) => (
            <Card3D
              key={idx}
              className="bg-surface p-8 md:p-10 hover:bg-surface-container-low transition-colors group cursor-pointer border-r border-b border-outline-variant/5"
            >
              <div className="reveal-child" style={{ animationDelay: `${idx * 80}ms` }}>
                <span className="material-symbols-outlined text-4xl text-tertiary mb-6 block transition-transform group-hover:-translate-y-2">
                  {service.icon}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-primary mb-3">{service.title}</h3>
                <p className="text-on-surface-variant text-sm md:text-base mb-6 leading-relaxed">{service.desc}</p>
                <span className="text-xs font-display uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all text-primary">
                  Learn More <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </span>
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* ─────────── COMPARE ─────────── */}
      <section className="py-16 md:py-20 bg-surface-container-low overflow-hidden">
        <div ref={compareRef} className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <span className="font-display text-xs uppercase tracking-[0.3em] text-tertiary block mb-3 reveal-child">Visual Excellence</span>
              <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 reveal-child">Real Results, Radiant Smiles</h2>
              <p className="text-on-surface-variant text-base md:text-lg mb-8 leading-relaxed max-w-lg reveal-child">
                We don't just treat teeth; we restore confidence. Our signature smile makeover process combines 3D imaging with masterful craftmanship.
              </p>
              <div className="space-y-4">
                {["Full Porcelain Veneers", "Gum Recontouring", "Bite Correction"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 reveal-child">
                    <span className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-secondary material-symbols-outlined text-sm flex-shrink-0">check</span>
                    <p className="font-sans text-primary font-medium text-sm md:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mask-reveal wrapper for before/after */}
            <div ref={galleryMaskRef} className="reveal-child w-full h-[300px] md:h-auto">
              <div className="mask-reveal rounded-xl overflow-hidden editorial-shadow h-full">
                <CompareSlider 
                  beforeImage="/compare_after_1776015065676.png"
                  afterImage="/compare_before_1776015116248.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── DOCTORS (3D Flip Cards) ─────────── */}
      <section ref={doctorsRef} className="pt-16 md:pt-20 pb-10 px-4 md:px-8 max-w-screen-2xl mx-auto doctors-section">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-primary mb-10 reveal-child">The Hands Behind the Art</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {[
            {
              name: "Dr. Sarah Mitchell",
              role: "Founder & Lead Cosmetic Surgeon",
              bio: "Specializing in aesthetic restoration with over 15 years of Beverly Hills expertise.",
              specializations: ["Porcelain Veneers", "Smile Makeovers", "Gum Contouring", "Full Arch Restoration"],
              src: "/doctor_sarah_1776015037223.png",
              offset: false,
            },
            {
              name: "Dr. James Chen",
              role: "Master Implantologist",
              bio: "Pioneer in 3D-guided implant therapy and structural dental rehabilitation.",
              specializations: ["3D-Guided Implants", "Bone Grafting", "All-on-4", "Bite Reconstruction"],
              src: "/doctor_james_1776015052907.png",
              offset: true,
            },
          ].map((doc, idx) => (
            <div key={idx} className={`doctor-card ${doc.offset ? "mt-0 lg:mt-20" : ""} reveal-child h-[450px] md:h-[520px]`}>
              <div className="doctor-card-inner rounded-xl overflow-hidden editorial-shadow">
                {/* Front */}
                <div className="doctor-card-front bg-surface-container-low rounded-xl overflow-hidden">
                  <div className="aspect-[4/5] relative doctor-parallax overflow-hidden">
                    <Image 
                      fill 
                      src={doc.src}
                      alt={doc.name}
                      className="object-cover transition-transform duration-700"
                    />
                  </div>
                  <div className="text-center p-4 md:p-5">
                    <h3 className="font-serif text-xl md:text-2xl text-primary mb-1">{doc.name}</h3>
                    <p className="font-display text-[10px] md:text-xs uppercase tracking-widest text-tertiary mb-1">{doc.role}</p>
                    <p className="text-[10px] text-on-surface-variant">Hover to learn more →</p>
                  </div>
                </div>
                {/* Back */}
                <div className="doctor-card-back bg-primary-container rounded-xl p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-white mb-2">{doc.name}</h3>
                    <p className="font-display text-[10px] md:text-xs uppercase tracking-widest text-tertiary mb-4 md:mb-5">{doc.role}</p>
                    <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-4 md:mb-6">{doc.bio}</p>
                    <div className="space-y-2 md:space-y-3">
                      {doc.specializations.map((s, i) => (
                        <div key={i} className="flex items-center gap-3 text-white/80 text-xs md:text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary flex-shrink-0" />
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link href="/book">
                    <Button variant="tertiary" className="w-full mt-4 md:mt-6 text-xs md:text-sm py-3 md:py-4">
                      Book with {doc.name.split(" ")[1]}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────── TESTIMONIALS ─────────── */}
      <div ref={testimonialsRef as React.RefObject<HTMLDivElement>} className="reveal-child">
        <Testimonials />
      </div>

      {/* ─────────── APPOINTMENT BAND ─────────── */}
      <section ref={appointmentRef} className="py-12 md:py-16 bg-surface flex items-center justify-center px-4 md:px-8">
        <div className="bg-primary-container w-full max-w-6xl rounded-2xl p-6 sm:p-10 md:p-16 relative overflow-hidden editorial-shadow">
          <div className="hidden md:block absolute top-0 right-0 w-1/3 h-full bg-tertiary/5 -skew-x-12 transform translate-x-1/2"></div>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-on-primary mb-3 md:mb-4 reveal-child">Ready for Your Best Smile?</h2>
            <p className="text-slate-400 text-base md:text-lg mb-8 md:mb-10 reveal-child">Take the first step. Our team will contact you within 24 hours.</p>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 reveal-child" onSubmit={(e) => e.preventDefault()}>
              <input className="bg-white/10 border border-transparent focus:border-tertiary text-white placeholder:text-white/40 rounded-lg px-4 md:px-6 py-3 md:py-4 outline-none transition-all text-sm md:text-base w-full" placeholder="Your Name" type="text" />
              <input className="bg-white/10 border border-transparent focus:border-tertiary text-white placeholder:text-white/40 rounded-lg px-4 md:px-6 py-3 md:py-4 outline-none transition-all text-sm md:text-base w-full" placeholder="Phone Number" type="tel" />
              <select className="bg-white/10 border border-transparent focus:border-tertiary text-white/60 rounded-lg px-4 md:px-6 py-3 md:py-4 outline-none transition-all text-sm md:text-base w-full">
                <option className="bg-primary-container">Select Service</option>
                <option className="bg-primary-container">Cosmetic</option>
                <option className="bg-primary-container">Implant</option>
                <option className="bg-primary-container">General</option>
              </select>
              <button className="md:col-span-3 bg-tertiary text-white font-display uppercase tracking-[0.2em] py-4 md:py-5 rounded-lg hover:brightness-110 active:scale-95 transition-all mt-2 md:mt-4 shadow-lg gold-glow text-xs md:text-sm w-full">
                Claim Free Consultation
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
