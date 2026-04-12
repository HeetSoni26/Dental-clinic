"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      {/* ─────────── GOOGLE MAP ─────────── */}
      <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden group">
        {/* Grayscale-to-color on hover */}
        <div className="absolute inset-0 transition-all duration-700 grayscale group-hover:grayscale-0">
          <iframe
            title="SmileCraft Dental Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.5073236265906!2d-118.40010742387282!3d34.07323511697789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bbde47b8f36f%3A0x90ea8ede467d8d4a!2sBeverly%20Hills%2C%20CA%2090210%2C%20USA!5e0!3m2!1sen!2sin!4v1712954000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        {/* Dark overlay so map blends with dark footer */}
        <div className="absolute inset-0 bg-slate-950/30 pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
        {/* Floating location card */}
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10 bg-slate-950/90 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-5 flex items-start gap-3 md:gap-4 max-w-[85%] md:max-w-md">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[#C9A84C] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
          </div>
          <div>
            <p className="font-sans font-semibold text-white text-sm">SmileCraft Dental</p>
            <p className="text-slate-400 text-xs mt-0.5">90210 Beverly Hills, CA</p>
            <a
              href="https://maps.google.com/?q=Beverly+Hills+CA"
              target="_blank"
              rel="noreferrer"
              className="text-[#C9A84C] text-xs mt-1 inline-block hover:underline"
            >
              Get Directions →
            </a>
          </div>
        </div>
      </div>

      {/* ─────────── FOOTER LINKS ─────────── */}
      <div className="pt-12 md:pt-16 pb-24 md:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 px-5 md:px-8 max-w-screen-2xl mx-auto">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-2xl font-serif font-semibold text-white mb-4 tracking-tight">
              SmileCraft Dental
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Providing world-class dental experiences with a commitment to clinical perfection and patient comfort.
            </p>
          </div>

          {/* Patient Links */}
          <div>
            <h4 className="text-[#C9A84C] font-sans font-medium text-xs uppercase tracking-widest mb-6">Patient Links</h4>
            <ul className="flex flex-col space-y-3">
              {[
                { label: "Emergency Care", href: "/emergency" },
                { label: "Patient Portal", href: "/portal" },
                { label: "Smile Simulator", href: "/simulator" },
                { label: "Book Appointment", href: "/book" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="text-[#C9A84C] font-sans font-medium text-xs uppercase tracking-widest mb-6">Treatments</h4>
            <ul className="flex flex-col space-y-3">
              {["Teeth Whitening", "Porcelain Veneers", "Dental Implants", "Invisalign", "Root Canal"].map((t) => (
                <li key={t}>
                  <Link href="/services" className="text-slate-400 hover:text-white transition-all hover:translate-x-1 inline-block text-sm">
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C9A84C] font-sans font-medium text-xs uppercase tracking-widest mb-6">Contact</h4>
            <address className="not-italic flex flex-col space-y-3">
              <p className="text-slate-400 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#C9A84C]">location_on</span>
                90210 Beverly Hills, CA
              </p>
              <a href="tel:5550009999" className="text-slate-400 hover:text-white text-sm flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-base text-[#C9A84C]">call</span>
                +1 (555) 000-9999
              </a>
              <a href="mailto:concierge@smilecraft.com" className="text-slate-400 hover:text-white text-sm flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-base text-[#C9A84C]">mail</span>
                concierge@smilecraft.com
              </a>
            </address>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="max-w-screen-2xl mx-auto px-5 md:px-8 mt-10 md:mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs tracking-wide text-center md:text-left">
            © 2024 SmileCraft Dental. Clinical Excellence, Redefined.
          </p>
          <div className="flex items-center gap-2">
            <Link href="/privacy" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Privacy</Link>
            <span className="text-slate-700">·</span>
            <Link href="/terms" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Terms</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}

