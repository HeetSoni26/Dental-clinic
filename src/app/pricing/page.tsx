"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useRevealAnimation } from "@/hooks/useAnimations";

const treatments = [
  {
    category: "Cosmetic & Aesthetic",
    items: [
      { name: "Teeth Whitening", price: "₹8,000 – ₹15,000", note: "Single session laser whitening" },
      { name: "Porcelain Veneers", price: "₹18,000 – ₹25,000 per tooth", note: "Mastercraft e.max veneers" },
      { name: "Smile Makeover", price: "Custom Quote", note: "Full facial aesthetic planning" },
      { name: "Gum Contouring", price: "₹10,000 – ₹20,000", note: "Laser gum sculpting" },
    ],
  },
  {
    category: "Restorative",
    items: [
      { name: "Dental Implant", price: "₹25,000 – ₹60,000", note: "Ti implant + crown, Nobel Biocare" },
      { name: "All-on-4", price: "₹2,20,000 – ₹4,00,000 per arch", note: "Full arch restoration" },
      { name: "Root Canal Treatment", price: "₹6,000 – ₹12,000", note: "Includes crown, pain-free" },
    ],
  },
  {
    category: "Orthodontics",
    items: [
      { name: "Invisalign Full", price: "₹1,20,000 – ₹2,40,000", note: "Complete aligner therapy" },
      { name: "Invisalign Lite", price: "₹70,000 – ₹1,00,000", note: "14 aligners, minor corrections" },
      { name: "Traditional Braces", price: "₹30,000 – ₹60,000", note: "Ceramic or metal" },
    ],
  },
  {
    category: "General & Preventive",
    items: [
      { name: "Clinical Exam + X-rays", price: "₹2,000 – ₹4,000", note: "Full diagnostic workup" },
      { name: "Scaling & Polishing", price: "₹2,500 – ₹5,000", note: "Ultrasonic + hand scaling" },
      { name: "Tooth Extraction", price: "₹1,500 – ₹6,000", note: "Including wisdom tooth" },
    ],
  },
];

const memberships = [
  {
    name: "Essential",
    price: "₹4,999",
    period: "/year",
    highlight: false,
    perks: [
      "2 Clinical Examinations",
      "2 Scaling & Polishing sessions",
      "10% off all treatments",
      "Priority booking",
      "Digital dental records",
    ],
  },
  {
    name: "Premium",
    price: "₹9,999",
    period: "/year",
    highlight: false,
    perks: [
      "4 Clinical Examinations",
      "2 Whitening touch-up sessions",
      "15% off all treatments",
      "Dedicated patient concierge",
      "Free X-rays annually",
      "Emergency priority slot",
    ],
  },
  {
    name: "Family",
    price: "₹24,999",
    period: "/year",
    highlight: true,
    perks: [
      "Covers up to 4 family members",
      "Unlimited Examinations",
      "20% off all treatments",
      "Free Whitening (once/year)",
      "Emergency home visit coordination",
      "Annual Oral Health Report",
      "Annual Kids Fluoride Treatment",
    ],
  },
];

function EmiCalculator() {
  const [cost, setCost] = useState(50000);
  const [months, setMonths] = useState(6);
  const rate = 1.5; // 1.5% per month (approx 18% p.a.)
  const emi = Math.round((cost * rate / 100) / (1 - Math.pow(1 + rate / 100, -months)));

  return (
    <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10">
      <h3 className="font-serif text-2xl text-primary mb-6">EMI Calculator</h3>
      <div className="space-y-6">
        <div>
          <label className="font-display text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
            Treatment Cost: ₹{cost.toLocaleString()}
          </label>
          <input
            type="range"
            min={5000}
            max={500000}
            step={5000}
            value={cost}
            onChange={e => setCost(parseInt(e.target.value))}
            className="w-full accent-[#C9A84C]"
          />
          <div className="flex justify-between text-xs text-outline mt-1">
            <span>₹5,000</span><span>₹5,00,000</span>
          </div>
        </div>
        <div>
          <label className="font-display text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">Tenure</label>
          <div className="flex gap-3">
            {[3, 6, 12, 24].map(m => (
              <button
                key={m}
                onClick={() => setMonths(m)}
                className={`flex-1 py-2.5 rounded-lg font-display text-xs uppercase tracking-widest border transition-all ${months === m ? "bg-primary text-on-primary border-primary" : "border-outline-variant/30 hover:border-tertiary"}`}
              >
                {m}mo
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center editorial-shadow">
          <p className="font-display text-xs uppercase tracking-widest text-on-surface-variant mb-2">Monthly EMI (est.)</p>
          <p className="font-serif text-5xl text-tertiary">
            ₹{isFinite(emi) ? emi.toLocaleString() : "—"}
          </p>
          <p className="text-xs text-outline mt-2">At 1.5%/month · {months} months</p>
        </div>
        <Link href="/book">
          <Button variant="primary" icon="calculate" className="w-full py-4">Get Custom Finance Plan</Button>
        </Link>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [mode, setMode] = useState<"treatment" | "membership">("treatment");
  const [openCategory, setOpenCategory] = useState<string | null>(treatments[0].category);
  const revealRef = useRevealAnimation(0.08);

  return (
    <div className="bg-surface pb-24">
      {/* Header */}
      <header className="py-16 md:py-20 px-4 md:px-8 max-w-screen-2xl mx-auto text-center md:text-left">
        <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-tertiary block mb-3">Transparent Pricing</span>
        <h1 className="font-serif text-5xl md:text-7xl text-primary mb-4">Investment in Your Smile</h1>
        <p className="text-on-surface-variant text-base md:text-xl max-w-xl mx-auto md:mx-0 text-balance">No surprises. No hidden fees. Full clinical transparency from consultation to completion.</p>
      </header>

      {/* Toggle */}
      <div className="px-4 md:px-8 max-w-screen-2xl mx-auto mb-10 md:mb-12 flex justify-center md:justify-start">
        <div className="inline-flex bg-surface-container-low rounded-full p-1.5 relative">
          <div
            className="absolute top-1.5 bottom-1.5 bg-primary rounded-full transition-all duration-300"
            style={{ left: mode === "treatment" ? "6px" : "50%", width: "calc(50% - 6px)" }}
          />
          <button
            onClick={() => setMode("treatment")}
            className={`relative z-10 px-6 py-2.5 rounded-full font-display text-xs uppercase tracking-widest transition-colors ${mode === "treatment" ? "text-on-primary" : "text-on-surface-variant"}`}
          >
            Per Treatment
          </button>
          <button
            onClick={() => setMode("membership")}
            className={`relative z-10 px-6 py-2.5 rounded-full font-display text-xs uppercase tracking-widest transition-colors ${mode === "membership" ? "text-on-primary" : "text-on-surface-variant"}`}
          >
            Membership Plans
          </button>
        </div>
      </div>

      <div ref={revealRef} className="px-4 md:px-8 max-w-screen-2xl mx-auto">
        <AnimatePresence mode="wait">
          {mode === "treatment" ? (
            <motion.div
              key="treatment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal-child"
            >
              {/* Accordion */}
              <div className="lg:col-span-2 space-y-3">
                {treatments.map((group) => (
                  <div key={group.category} className="bg-white rounded-xl border border-outline-variant/10 overflow-hidden editorial-shadow">
                    <button
                      onClick={() => setOpenCategory(openCategory === group.category ? null : group.category)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left"
                    >
                      <span className="font-serif text-lg text-primary">{group.category}</span>
                      <span
                        className={`material-symbols-outlined text-tertiary transition-transform duration-300 ${openCategory === group.category ? "rotate-180" : ""}`}
                      >
                        expand_more
                      </span>
                    </button>
                    <AnimatePresence>
                      {openCategory === group.category && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 space-y-4 border-t border-outline-variant/10 pt-4">
                            {group.items.map((item) => (
                              <div key={item.name} className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="font-sans text-sm font-medium text-primary">{item.name}</p>
                                  <p className="text-xs text-on-surface-variant">{item.note}</p>
                                </div>
                                <p className="font-display text-xs text-tertiary whitespace-nowrap">{item.price}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* EMI Calculator */}
              <div>
                <EmiCalculator />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="membership"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-child"
            >
              {memberships.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl p-6 md:p-8 flex flex-col ${
                    plan.highlight
                      ? "bg-primary-container text-white border-2 border-tertiary editorial-shadow scale-100 md:scale-105"
                      : "bg-white border border-outline-variant/10 editorial-shadow"
                  }`}
                >
                  {plan.highlight && (
                    <div className="inline-block mb-4 px-3 py-1 bg-tertiary rounded-full font-display text-[10px] uppercase tracking-widest text-white w-fit">
                      Most Popular
                    </div>
                  )}
                  <h3 className={`font-serif text-2xl mb-1 ${plan.highlight ? "text-white" : "text-primary"}`}>{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-6">
                    <span className={`font-serif text-4xl ${plan.highlight ? "text-tertiary" : "text-primary"}`}>{plan.price}</span>
                    <span className={`text-sm mb-1 ${plan.highlight ? "text-white/60" : "text-on-surface-variant"}`}>{plan.period}</span>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.perks.map(p => (
                      <li key={p} className="flex items-center gap-3 text-sm">
                        <span className={`material-symbols-outlined text-base ${plan.highlight ? "text-tertiary" : "text-tertiary"}`} style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <span className={plan.highlight ? "text-white/80" : "text-on-surface-variant"}>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.highlight ? "tertiary" : "outline"}
                    className="w-full py-4"
                  >
                    Get Started
                  </Button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-[10px] md:text-xs text-outline mt-12 px-4 md:px-8">
        All prices are indicative. Final treatment costs are determined after clinical examination. EMI subject to finance partner approval.
      </p>
    </div>
  );
}
