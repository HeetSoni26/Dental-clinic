"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useParallax } from "@/hooks/useAnimations";

const tocSections = [
  { id: "introduction", label: "Introduction" },
  { id: "the-science", label: "The Science Behind It" },
  { id: "our-approach", label: "Our Approach" },
  { id: "what-to-expect", label: "What to Expect" },
  { id: "aftercare", label: "Aftercare & Longevity" },
  { id: "conclusion", label: "Final Thoughts" },
];

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const heroParallaxRef = useParallax(-10, 1.5) as React.RefObject<HTMLDivElement>;

  // IntersectionObserver for TOC active highlight
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    tocSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <article className="bg-surface pb-20">
      {/* Hero Image with Parallax */}
      <header className="relative h-[55vh] overflow-hidden">
        <div ref={heroParallaxRef} className="absolute inset-0 scale-110">
          <Image
            fill
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLVjWbWKKa7S5nnx6dXxCKOs9MW1K8ZwYUuCFWdeFWbFKJ-PYpIs-hJAagDX2-cwOPSCGXPkVetx40xaByrFosxPSoxniPrsve38L6N53sBCtAJkwMiHv71Egd65by2V24Zil1jP0YR5VJetH_C0HVwZoGqxhDERweDhv1dUozWv929wPQtFAKFF97cfA6hmAuHbja8ROrpIraeUxknViN49eAV-akS9iVIH94OAbQDXp5a8ISZUVbRJ0JjsoHeUde0TdRuI2oaWnO"
            alt="Article hero"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
        <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 right-4 md:right-8 max-w-screen-2xl mx-auto">
          <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-tertiary block mb-3">Clinical Philosophy</span>
          <h1 className="font-serif text-3xl md:text-6xl text-primary max-w-3xl leading-tight">
            The Architecture of a Smile: Beyond Cosmetic Dentistry
          </h1>
          <div className="flex items-center gap-6 mt-4 text-[10px] font-display uppercase tracking-widest text-on-surface-variant">
            <span>Oct 05, 2024</span>
            <span className="w-1 h-1 bg-outline-variant/40 rounded-full" />
            <span>6 min read</span>
            <span className="w-1 h-1 bg-outline-variant/40 rounded-full" />
            <span>Dr. Sarah Mitchell</span>
          </div>
        </div>
      </header>

      {/* Layout: Article + Sticky TOC */}
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 md:gap-16">
        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          <section id="introduction" className="mb-12">
            <h2 className="font-serif text-3xl text-primary mb-5">Introduction</h2>
            <p className="text-on-surface-variant leading-relaxed mb-5">
              A smile is not merely a cosmetic feature. It is a symphony of proportions, planes, and personality — a carefully composed architectural statement that dental science has only recently begun to fully decode. At SmileCraft, we believe that every great smile begins with a rigorous clinical foundation and is completed with artistic intuition.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              In this article, we explore the principles that guide our smile design philosophy, from the golden ratio to the digital smile design protocols we use in our studio every day.
            </p>
          </section>

          <section id="the-science" className="mb-12">
            <h2 className="font-serif text-3xl text-primary mb-5">The Science Behind It</h2>
            <p className="text-on-surface-variant leading-relaxed mb-5">
              The science of smile design begins with facial analysis. We examine your facial thirds, the width-to-height ratio of your teeth, your midline, and the curvature of your lip line. These measurements are not arbitrary — they are rooted in decades of published research and the timeless mathematics of natural beauty.
            </p>
            <div className="rounded-2xl overflow-hidden my-8 aspect-[16/7] relative editorial-shadow">
              <Image fill src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtRBDaiZM_LbEIkvOwLy63D8ytRMQnf-4kNId5XrhXmrae_NNxFWpt-VAcsZ8NixaCH_zWILiKFqz4C1044ZgWYxSJzqgJzEhAl0_ITvxTcHDFA56msuQyxhk7Bj5GAY_WV6iQ7GZyD2bMYTMn6rhvsvk1XqdKPGQCvQ7V2bDZVszV3EieIeAd6_5dbw6W2LczHIUGlvOEvb1Qxqg3FwsJbI5OylPnYzchY_fdL5_2mESNiD-ldbNWwkKaS1VIYNzy3xf8Q6VHsQ3Z" alt="3D smile design" className="object-cover" />
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              Digital Smile Design (DSD) allows us to simulate your results before any treatment begins. We photograph you in 20+ positions and create a high-fidelity 3D model of your proposed outcome — so you always know exactly what to expect.
            </p>
          </section>

          <section id="our-approach" className="mb-12">
            <h2 className="font-serif text-3xl text-primary mb-5">Our Approach</h2>
            <p className="text-on-surface-variant leading-relaxed mb-5">
              Every smile makeover begins with a 90-minute "smile architecture session." During this session, we discuss your aesthetic goals, take diagnostic photographs and impressions, and run preliminary DSD simulations. Nothing moves forward until you love what you see.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              Our interdisciplinary team — cosmetic dentists, periodontists, and ceramists — collaborate on each case to ensure the final result is both beautiful and clinically durable. We don't outsource our ceramics; every porcelain piece is crafted in our in-house lab.
            </p>
          </section>

          <section id="what-to-expect" className="mb-12">
            <h2 className="font-serif text-3xl text-primary mb-5">What to Expect</h2>
            <p className="text-on-surface-variant leading-relaxed mb-5">
              A full smile makeover typically involves 3–5 visits over 4–8 weeks. First visits are diagnostic; middle visits are for preparation and temporaries; final visits are for fitting and bonding your permanent restorations. We schedule generously so each appointment is unhurried.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
              {["Diagnostic Session", "Temporaries & Preview", "Final Placement"].map((step, i) => (
                <div key={i} className="bg-surface-container-low rounded-xl p-6 text-center border border-outline-variant/10">
                  <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="font-serif text-tertiary text-lg">{i + 1}</span>
                  </div>
                  <p className="font-serif text-primary text-sm">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="aftercare" className="mb-12">
            <h2 className="font-serif text-3xl text-primary mb-5">Aftercare & Longevity</h2>
            <p className="text-on-surface-variant leading-relaxed mb-5">
              A smile makeover is an investment — and like any investment, it requires care to perform optimally. We provide every patient with a personalised aftercare protocol including specific toothpaste recommendations, night-guard fitting if needed, and a 12-month maintenance schedule.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              Our e.max porcelain veneers carry a 10-year clinical warranty. We stand behind our work fully.
            </p>
          </section>

          <section id="conclusion" className="mb-12">
            <h2 className="font-serif text-3xl text-primary mb-5">Final Thoughts</h2>
            <p className="text-on-surface-variant leading-relaxed mb-5">
              A great smile is not an accident. It is the result of a meticulous process that respects both science and art. At SmileCraft, we've spent over 15 years refining that process — so every patient who leaves our studio leaves with a smile that is uniquely, unmistakably theirs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link href="/book" className="w-full sm:w-auto">
                <Button variant="primary" icon="calendar_today" className="px-8 py-4 w-full justify-center">Book a Consultation</Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button variant="outline" className="px-8 py-4 w-full justify-center">Explore Services</Button>
              </Link>
            </div>
          </section>
        </div>

        {/* Sticky TOC Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-5">In this article</p>
            <nav className="space-y-1">
              {tocSections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`toc-link block text-sm py-2 pl-4 border-l-2 transition-all ${
                    activeSection === id
                      ? "active text-tertiary border-tertiary font-medium"
                      : "text-on-surface-variant border-outline-variant/20 hover:text-primary hover:border-outline-variant/60"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Author card */}
            <div className="mt-10 p-5 bg-surface-container-low rounded-xl border border-outline-variant/10">
              <p className="font-display text-[10px] uppercase tracking-widest text-on-surface-variant mb-3">Written by</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                  <Image fill src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0r9h1AOjUkdUwvuzbtdIUR3PJ9U8zM6NAxphHA6esvkkockLxHGMOo4nVoDKGcWyt1A6CTDUHe_nTkyaPZaPzkNNylVxd0rebvgjWAWTM0zjS9Uh_RXW684MiCZ3Q71LKHNV_MDLmM6XGMdcgJ--w2EUz0njr11twLPa0Kae6EGSv7ZfMzKP-3gz5wKZZuOs1WFNVHA_JXPU9zrlNLzb0nWQYcC4hTVdaCiUzngyrTE5tieci75incnmJ1plFg4ne13uDAN5a0mRE" alt="Dr. Mitchell" className="object-cover" />
                </div>
                <div>
                  <p className="font-serif text-sm text-primary">Dr. Sarah Mitchell</p>
                  <p className="font-display text-[9px] uppercase tracking-widest text-on-surface-variant">Lead Cosmetic Surgeon</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
