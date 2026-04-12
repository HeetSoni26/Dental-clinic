"use client";

import FAQAccordion from "@/components/ui/FAQAccordion";
import { useRevealAnimation } from "@/hooks/useAnimations";
import Link from "next/link";
import Button from "@/components/ui/Button";

const faqCategories = [
  {
    category: "General",
    items: [
      {
        q: "What should I expect on my first visit?",
        a: "Your first visit is a comprehensive 60-minute experience including a full clinical examination, digital X-rays, and a personalised consultation to understand your aesthetic goals and oral health history.",
      },
      {
        q: "Do you offer sedation dentistry?",
        a: "Yes. We offer IV sedation, oral conscious sedation, and nitrous oxide (laughing gas) for patients with dental anxiety or those undergoing longer procedures.",
      },
      {
        q: "Do you accept dental insurance?",
        a: "We work with most major insurance providers. Our concierge team will verify your coverage and provide a transparent cost breakdown before any treatment begins.",
      },
    ],
  },
  {
    category: "Cosmetic",
    items: [
      {
        q: "How long do porcelain veneers last?",
        a: "With proper care, our ultra-thin porcelain veneers last 15–20 years. We use only laboratory-crafted e.max veneers for optimal aesthetics and longevity.",
      },
      {
        q: "Is teeth whitening safe for sensitive teeth?",
        a: "Absolutely. Our Philips ZOOM laser whitening protocol includes a sensitivity management step. We pre-treat enamel with a remineralising serum to minimise post-treatment sensitivity.",
      },
      {
        q: "What's included in a Smile Makeover?",
        a: "A smile makeover is a fully bespoke treatment plan that may include whitening, veneers, Invisalign, gum contouring, and crowns — all coordinated for maximum aesthetic harmony.",
      },
    ],
  },
  {
    category: "Implants",
    items: [
      {
        q: "How do I care for my dental implants?",
        a: "Dental implants require the same care as natural teeth — brushing twice daily, flossing, and biannual professional cleanings. We'll provide a customised aftercare guide.",
      },
      {
        q: "How long does the implant process take?",
        a: "The complete process typically takes 3–6 months, including the healing phase. With our 3D-guided surgery protocol, placement is precise and recovery is faster than traditional methods.",
      },
      {
        q: "Are implants painful?",
        a: "The procedure is performed under local anaesthesia. Most patients describe post-operative discomfort as mild — typically manageable with over-the-counter pain relief for 2–3 days.",
      },
    ],
  },
  {
    category: "Payments & Insurance",
    items: [
      {
        q: "Do you offer payment plans?",
        a: "Yes. We offer 0% EMI options for 3, 6, and 12 months through our partner financial institutions. Our team will walk you through all available options during your consultation.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit/debit cards, UPI, net banking, and cash. Razorpay-secured online payments are available through the patient portal.",
      },
    ],
  },
  {
    category: "Emergency",
    items: [
      {
        q: "What counts as a dental emergency?",
        a: "Severe toothache, knocked-out tooth, broken crown, or facial swelling are all dental emergencies. Call our 24/7 helpline immediately — we prioritise same-day emergency slots.",
      },
      {
        q: "What should I do if I knock out a tooth?",
        a: "Place the tooth in milk or saline (not water), keep it moist, and call us immediately. Re-implantation success is highest within 30–60 minutes of the incident.",
      },
    ],
  },
];

export default function FAQPage() {
  const headerRef = useRevealAnimation(0.08);
  const contentRef = useRevealAnimation(0.07);

  return (
    <div className="bg-surface pb-20">
      {/* Hero */}
      <header ref={headerRef} className="py-12 md:py-16 px-4 md:px-8 max-w-screen-2xl mx-auto text-center md:text-left">
        <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-tertiary block mb-3 reveal-child">Help Centre</span>
        <div className="flex flex-col lg:flex-row justify-between items-center md:items-start lg:items-end gap-6 md:gap-8">
          <h1 className="font-serif text-5xl md:text-7xl text-primary leading-tight reveal-child text-balance">
            Frequently Asked <br className="hidden md:block" /><span className="italic text-tertiary">Questions.</span>
          </h1>
          <div className="reveal-child">
            <p className="text-on-surface-variant text-lg mb-6 max-w-sm">
              Can't find your answer? Our patient concierge is available Monday to Saturday, 9am–7pm.
            </p>
            <Link href="/contact">
              <Button variant="outline" className="px-6 py-4">Ask a Question</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* FAQ Grid by Category */}
      <section ref={contentRef} className="px-4 md:px-8 max-w-screen-2xl mx-auto space-y-12">
        {faqCategories.map((cat, cidx) => (
          <div key={cidx} className="reveal-child">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Category label */}
              <div className="lg:col-span-1 pt-2">
                <span className="inline-block font-display text-xs uppercase tracking-[0.25em] text-tertiary border border-tertiary/30 rounded-full px-4 py-2 mb-3">
                  {cat.category}
                </span>
                <p className="text-on-surface-variant text-sm">{cat.items.length} questions</p>
              </div>
              {/* Accordion */}
              <div className="lg:col-span-3">
                <FAQAccordion items={cat.items} />
              </div>
            </div>
            {cidx < faqCategories.length - 1 && (
              <div className="mt-12 h-px bg-outline-variant/10" />
            )}
          </div>
        ))}
      </section>

      {/* CTA Band */}
      <section className="mt-12 md:mt-16 mx-4 md:mx-8 bg-primary-container rounded-2xl p-6 md:p-14 text-center max-w-screen-2xl lg:mx-auto editorial-shadow">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-3 md:mb-4">Still Have Questions?</h2>
        <p className="text-white/60 mb-6 md:mb-8 text-sm md:text-base">Our dental concierge team is ready to help you make the right choice.</p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <Link href="/contact" className="w-full sm:w-auto"><Button variant="tertiary" className="px-8 py-4 w-full justify-center">Contact Us</Button></Link>
          <Link href="/book" className="w-full sm:w-auto"><Button variant="outline" className="px-8 py-4 border-white/20 text-white hover:bg-white/10 w-full justify-center">Book Consultation</Button></Link>
        </div>
      </section>
    </div>
  );
}
