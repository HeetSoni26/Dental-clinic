"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { useRevealAnimation, useCounterAnimation, useMaskReveal } from "@/hooks/useAnimations";

const faqs = [
  {
    q: "What should I expect on my first visit?",
    a: "Your first visit is a comprehensive 60-minute experience including a full clinical examination, digital X-rays, and a personalised consultation to understand your aesthetic goals and oral health history.",
  },
  {
    q: "Do you offer sedation dentistry?",
    a: "Yes. We offer IV sedation, oral conscious sedation, and nitrous oxide (laughing gas) for patients with dental anxiety or those undergoing longer procedures.",
  },
  {
    q: "How long do porcelain veneers last?",
    a: "With proper care, our ultra-thin porcelain veneers last 15–20 years. We use only laboratory-crafted e.max veneers for optimal aesthetics and longevity.",
  },
  {
    q: "Do you accept dental insurance?",
    a: "We work with most major insurance providers. Our concierge team will verify your coverage and provide a transparent cost breakdown before any treatment begins.",
  },
  {
    q: "Is teeth whitening safe for sensitive teeth?",
    a: "Absolutely. Our Philips ZOOM laser whitening protocol includes a sensitivity management step. We pre-treat enamel with a remineralising serum to minimise post-treatment sensitivity.",
  },
  {
    q: "How do I care for my dental implants?",
    a: "Dental implants require the same care as natural teeth — brushing twice daily, flossing, and biannual professional cleanings. We'll provide a customised aftercare guide.",
  },
];

const steps = [
  { icon: "call", title: "1. Initial Enquiry", desc: "Reach out via phone, WhatsApp, or our online form. Our concierge team responds within 2 hours." },
  { icon: "event_available", title: "2. Appointment Scheduling", desc: "Choose your specialist, date, and time slot via our real-time availability portal." },
  { icon: "clinical_notes", title: "3. Clinical Examination", desc: "A comprehensive oral health assessment including 3D imaging and personalised diagnostics." },
  { icon: "volunteer_activism", title: "4. Personalised Treatment Plan", desc: "Receive a transparent, jargon-free plan tailored to your health goals and budget." },
  { icon: "workspace_premium", title: "5. Treatment & Aftercare", desc: "Premium in-clinic care followed by ongoing support via your personal patient portal." },
];

export default function PatientCarePage() {
  const heroRef = useRevealAnimation(0.08);
  const journeyRef = useRevealAnimation(0.08);
  const promiseRef = useRevealAnimation(0.09);
  const faqRef = useRevealAnimation(0.07);
  const statsRef = useCounterAnimation();
  const maskRef = useMaskReveal();

  return (
    <div className="bg-surface">
      {/* Hero */}
      <section ref={heroRef} className="relative py-12 md:py-16 px-4 md:px-8 max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center text-center md:text-left">
        <div>
          <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-tertiary block mb-3 reveal-child">Patient Care</span>
          <h1 className="font-serif text-5xl md:text-7xl text-primary leading-[1.05] mb-4 md:mb-6 reveal-child text-balance mx-auto md:mx-0">
            Your Health, <br /><span className="italic">Our Priority.</span>
          </h1>
          <p className="text-on-surface-variant text-base md:text-xl leading-relaxed max-w-xl mb-8 md:mb-10 reveal-child mx-auto md:mx-0">
            From the moment you contact us to years of ongoing care, SmileCraft wraps every touchpoint in warmth, clinical precision, and genuine respect for your time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 reveal-child justify-center md:justify-start">
            <Link href="/book">
              <Button variant="primary" icon="calendar_today" className="px-8 py-5">
                Book Consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="px-8 py-5">
                Contact Concierge
              </Button>
            </Link>
          </div>
        </div>

        <div ref={maskRef} className="relative">
          <div className="aspect-[4/5] relative rounded-2xl overflow-hidden editorial-shadow mask-reveal">
            <Image
              fill
              src="/patient_care_hero_1776015303394.png"
              alt="SmileCraft patient care"
              className="object-cover"
            />
          </div>
          {/* Floating Badge */}
          <div className="absolute -bottom-8 -left-8 bg-white p-5 rounded-xl editorial-shadow border border-outline-variant/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              </div>
              <div>
                <div className="font-serif text-xl text-primary">100% Safe</div>
                <div className="font-display text-[10px] uppercase tracking-widest text-on-surface-variant">NABH Accredited Care</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section ref={statsRef as React.RefObject<HTMLDivElement>} className="py-10 md:py-12 bg-primary-container text-white mt-10">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {[
            { val: 5000, suffix: "+", label: "Happy Patients" },
            { val: 15, suffix: "+", label: "Years of Care" },
            { val: 98, suffix: "%", label: "Success Rate" },
            { val: 24, suffix: "h", label: "Response Time" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="font-serif text-4xl md:text-5xl text-tertiary mb-2" data-count={stat.val} data-suffix={stat.suffix}>
                0{stat.suffix}
              </div>
              <div className="font-display text-[10px] uppercase tracking-[0.25em] text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Patient Journey */}
      <section ref={journeyRef} className="py-12 md:py-16 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <div className="text-center mb-10 md:mb-12 reveal-child">
          <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-tertiary block mb-3">Your Journey</span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary">From First Call to Last Smile</h2>
        </div>
        <div className="relative">
          <div className="absolute left-8 top-8 bottom-8 w-[1px] bg-gradient-to-b from-tertiary via-tertiary/30 to-transparent hidden md:block" />
          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 md:gap-10 items-start group reveal-child">
                <div className="hidden md:flex w-16 h-16 rounded-full bg-white border-2 border-tertiary/30 group-hover:border-tertiary items-center justify-center flex-shrink-0 z-10 transition-colors editorial-shadow">
                  <span className="material-symbols-outlined text-tertiary text-2xl">{step.icon}</span>
                </div>
                <div className="md:pt-3 max-w-2xl bg-surface-container-low md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none">
                  <div className="md:hidden w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center mb-4">
                     <span className="material-symbols-outlined text-tertiary text-lg">{step.icon}</span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-primary mb-2">{step.title}</h3>
                  <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Rights & Comfort */}
      <section className="py-12 md:py-16 bg-surface-container-low border-y border-outline-variant/10">
        <div ref={promiseRef} className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="text-center md:text-left">
              <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-tertiary block mb-3 reveal-child">Our Promise</span>
              <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 reveal-child text-balance mx-auto md:mx-0">An Experience Built Around You</h2>
              <div className="space-y-4">
                {[
                  { icon: "schedule", title: "Zero Wait Times", desc: "We respect your schedule. Our clinical workflow is engineered for punctuality." },
                  { icon: "lock", title: "Complete Confidentiality", desc: "Your health data is encrypted, HIPAA-compliant, and never shared without consent." },
                  { icon: "translate", title: "Multi-Language Support", desc: "Our team speaks English, Hindi, Gujarati, and Marathi for your comfort." },
                  { icon: "spa", title: "Anxiety-Free Environment", desc: "Aromatherapy, curated playlists, and sedation options for a calm experience." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-5 p-5 bg-white rounded-xl border border-transparent hover:border-tertiary/20 transition-all group editorial-shadow reveal-child">
                    <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-tertiary/20 transition-colors">
                      <span className="material-symbols-outlined text-tertiary text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-primary mb-1">{item.title}</h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square">
              <div className="absolute inset-0 rounded-2xl overflow-hidden editorial-shadow">
                <Image
                  fill
                  src="/patient_care_lounge_1776015317336.png"
                  alt="Clinic experience"
                  className="object-cover"
                />
              </div>
              <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md p-5 rounded-xl border border-white/40 editorial-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-serif text-2xl text-primary">4.9</span>
                </div>
                <div className="font-display text-[10px] uppercase tracking-widest text-on-surface-variant">Patient Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section — Animated Accordion */}
      <section ref={faqRef} className="py-12 md:py-16 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
          <div className="reveal-child text-center md:text-left">
            <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-tertiary block mb-3">FAQ</span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-5">Common Questions</h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Can't find your answer? Our patient concierge is available Monday to Saturday.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/contact">
                <Button variant="outline" className="px-6 py-4 w-full">Ask a Question</Button>
              </Link>
              <Link href="/faq">
                <Button variant="primary" className="px-6 py-4 w-full">View All FAQs</Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 reveal-child">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-12 md:py-16 bg-primary-container px-4 md:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 text-[9px] md:text-[10px] font-display uppercase tracking-widest px-4 py-2 rounded-full mb-6 md:mb-8 mt-2">
            <span className="material-symbols-outlined text-[14px] md:text-base">emergency</span>
            24/7 Emergency Line
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-4 md:mb-5">Dental Emergency?</h2>
          <p className="text-white/60 text-lg mb-10">
            Don't wait in pain. Our emergency response team is on-call around the clock.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+911800123456">
              <Button variant="tertiary" icon="call" className="px-8 py-5">
                Call Emergency Line
              </Button>
            </a>
            <a href="https://wa.me/911800123456?text=I%20have%20a%20dental%20emergency" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="px-8 py-5 border-white/20 text-white hover:bg-white/10">
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
