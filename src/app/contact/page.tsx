"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [activeTab, setActiveTab] = useState(0);

  const locations = [
    {
      name: "Beverly Hills",
      address: "90210 Wilshire Blvd, Beverly Hills, CA",
      phone: "+1 (555) 000-9999",
      email: "concierge@smilecraft.com",
      hours: "Mon–Sat: 9AM–8PM · Sun: 10AM–4PM",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.5073236265906!2d-118.40010742387282!3d34.07323511697789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bbde47b8f36f%3A0x90ea8ede467d8d4a!2sBeverly%20Hills%2C%20CA%2090210%2C%20USA!5e0!3m2!1sen!2sin!4v1712954000000!5m2!1sen!2sin",
    },
    {
      name: "West Hollywood",
      address: "8600 Sunset Blvd, West Hollywood, CA",
      phone: "+1 (555) 111-8888",
      email: "weho@smilecraft.com",
      hours: "Mon–Fri: 10AM–7PM · Sat: 10AM–5PM",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.8938291699!2d-118.38088242387294!3d34.09039251682785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b9302f34df%3A0x57f9ef4e24e1bde4!2sWest%20Hollywood%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1712954100000!5m2!1sen!2sin",
    },
  ];

  const loc = locations[activeTab];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-surface pb-24">
      {/* Header */}
      <header className="py-16 md:py-20 px-4 md:px-8 max-w-screen-2xl mx-auto text-center md:text-left">
        <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-tertiary block mb-3">Get In Touch</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="font-serif text-5xl md:text-7xl text-primary leading-tight">We're Here<br /><em>For You</em></h1>
          <div className="flex flex-col gap-3">
            <a href="tel:5550009999" className="flex items-center gap-3 text-primary hover:text-tertiary transition-colors group">
              <div className="w-10 h-10 rounded-full bg-tertiary/10 group-hover:bg-tertiary/20 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-tertiary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
              </div>
              <span className="font-serif text-xl">+1 (555) 000-9999</span>
            </a>
            <a href="https://wa.me/919999999999?text=Hi+SmileCraft" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-primary hover:text-[#25D366] transition-colors group">
              <div className="w-10 h-10 rounded-full bg-[#25D366]/10 group-hover:bg-[#25D366]/20 flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <span className="font-serif text-xl">WhatsApp Us</span>
            </a>
          </div>
        </div>
      </header>

      {/* Location Tabs + Map */}
      <div className="px-4 md:px-8 max-w-screen-2xl mx-auto mb-10 md:mb-12">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {locations.map((l, i) => (
            <button
              key={l.name}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-full font-display text-xs uppercase tracking-widest transition-all duration-300 ${
                activeTab === i ? "bg-primary text-on-primary shadow-md" : "bg-surface-container-low text-on-surface-variant hover:bg-secondary-container"
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-2xl overflow-hidden editorial-shadow border border-outline-variant/10">
          {/* Map */}
          <div className="lg:col-span-2 h-[380px]">
            <iframe
              key={activeTab}
              title={`${loc.name} Location`}
              src={loc.mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          {/* Info Card */}
          <div className="bg-primary-container p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl text-white mb-1">{loc.name}</h3>
              <p className="font-display text-xs uppercase tracking-widest text-tertiary mb-6">SmileCraft Dental</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-tertiary text-xl mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  <p className="text-white/80 text-sm">{loc.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                  <a href={`tel:${loc.phone.replace(/\D/g, "")}`} className="text-white/80 text-sm hover:text-white transition-colors">{loc.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                  <a href={`mailto:${loc.email}`} className="text-white/80 text-sm hover:text-white transition-colors">{loc.email}</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                  <p className="text-white/80 text-sm">{loc.hours}</p>
                </div>
              </div>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 block w-full py-3 text-center bg-tertiary text-white rounded-xl font-display text-xs uppercase tracking-widest hover:brightness-110 transition-all"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <section className="px-4 md:px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-3">Send Us a Message</h2>
            <p className="text-on-surface-variant mb-6 md:mb-8 text-sm md:text-base">We respond within 4 business hours. For urgent matters, please call directly.</p>

            {status === "success" ? (
              <div className="bg-secondary-container rounded-2xl p-10 text-center">
                <span className="material-symbols-outlined text-5xl text-secondary mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <h3 className="font-serif text-2xl text-primary mb-2">Message Received</h3>
                <p className="text-on-surface-variant">We'll reach back within 4 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-display text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Name</label>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your full name" className="w-full bg-surface-container-low border border-transparent focus:border-tertiary rounded-lg px-5 py-4 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="font-display text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Phone</label>
                    <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 99999 99999" className="w-full bg-surface-container-low border border-transparent focus:border-tertiary rounded-lg px-5 py-4 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="font-display text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" className="w-full bg-surface-container-low border border-transparent focus:border-tertiary rounded-lg px-5 py-4 outline-none transition-all" />
                </div>
                <div>
                  <label className="font-display text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="How can we help you?" className="w-full bg-surface-container-low border border-transparent focus:border-tertiary rounded-lg px-5 py-4 outline-none transition-all resize-none" />
                </div>
                {status === "error" && <p className="text-error text-sm">Something went wrong. Please try calling us directly.</p>}
                <Button variant="primary" icon="send" className="w-full py-5" type="submit">
                  {status === "loading" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>

          {/* Quick contact cards */}
          <div className="space-y-4 md:space-y-5">
            <h2 className="font-serif text-2xl md:text-4xl text-primary mb-3">Quick Contact</h2>
            {[
              { icon: "call", label: "Call Reception", value: "+1 (555) 000-9999", href: "tel:5550009999", cta: "Call Now" },
              { icon: "mail", label: "Email Concierge", value: "concierge@smilecraft.com", href: "mailto:concierge@smilecraft.com", cta: "Send Email" },
              { icon: "emergency", label: "Emergency Line", value: "24/7 Priority Response", href: "/emergency", cta: "Emergency Care" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-5 p-6 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:border-tertiary/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-tertiary/10 group-hover:bg-tertiary/20 flex items-center justify-center flex-shrink-0 transition-colors">
                  <span className="material-symbols-outlined text-tertiary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-display text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5">{item.label}</p>
                  <p className="font-serif text-lg text-primary">{item.value}</p>
                </div>
                <span className="font-display text-[10px] uppercase tracking-widest text-tertiary group-hover:translate-x-1 transition-transform">{item.cta} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
