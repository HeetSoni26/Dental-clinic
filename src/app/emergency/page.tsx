"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";

function OpenNowBadge() {
  const now = new Date();
  // Convert to IST (UTC+5:30)
  const ist = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  const day = ist.getUTCDay(); // 0=Sun, 6=Sat
  const hour = ist.getUTCHours();
  const minute = ist.getUTCMinutes();
  const timeInMinutes = hour * 60 + minute;
  // Open Mon-Sat 9am-8pm, Sun 10am-4pm IST
  const isOpen = day === 0
    ? timeInMinutes >= 600 && timeInMinutes < 960  // Sun 10am-4pm
    : day !== 0 && timeInMinutes >= 540 && timeInMinutes < 1200; // Mon-Sat 9am-8pm

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-display text-xs uppercase tracking-widest ${
      isOpen ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
    }`}>
      <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
      {isOpen ? "Open Now" : "Currently Closed"}
      <span className="opacity-60">· {isOpen ? "9AM–8PM IST" : "Opens Tomorrow 9AM"}</span>
    </div>
  );
}

export default function EmergencyPage() {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, type: "emergency" }),
    });
    setLoading(false);
    setSubmitted(true);
  };

  const emergencies = [
    { icon: "dentistry", title: "Severe Toothache", desc: "Persistent, throbbing pain that interferes with sleep or daily activities." },
    { icon: "broken_image", title: "Knocked-Out Tooth", desc: "Immediate action required within 60 minutes for successful re-implantation." },
    { icon: "warning", title: "Chipped or Broken Tooth", desc: "Sharp edges may cause injury to the tongue or cheek. Collect any fragments." },
    { icon: "medical_information", title: "Lost Filling or Crown", desc: "Exposure of sensitive dental nerves causing sharp pain on air or liquids." },
    { icon: "local_hospital", title: "Facial Swelling", desc: "Can indicate a dental abscess — a serious infection requiring same-day care." },
    { icon: "bloodtype", title: "Bleeding After Extraction", desc: "Bite firmly on gauze for 20 min. If bleeding persists beyond 1 hour, call us." },
  ];

  return (
    <div style={{ "--color-primary": "#991B1B", "--color-error": "#D32F2F" } as React.CSSProperties}>
      {/* Emergency Hero */}
      <section className="bg-[#7f1d1d] py-16 md:py-20 px-4 md:px-8 text-white relative overflow-hidden">
        {/* CSS pulsing ring behind phone icon */}
        <div className="absolute right-20 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center">
          {[1, 2, 3].map(i => (
            <span
              key={i}
              className="absolute border-2 border-white/20 rounded-full animate-ping"
              style={{ width: `${i * 80}px`, height: `${i * 80}px`, animationDelay: `${i * 0.4}s`, animationDuration: "2s" }}
            />
          ))}
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center z-10">
            <span className="material-symbols-outlined text-5xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>local_hospital</span>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto relative z-10 max-w-3xl text-center md:text-left">
          <OpenNowBadge />
          <h1 className="font-serif text-5xl md:text-8xl mt-5 md:mt-6 mb-3 md:mb-4 leading-tight">
            Dental<br /><em className="opacity-70">Emergency?</em>
          </h1>
          <p className="text-white/70 text-base md:text-xl mb-6 md:mb-8">We treat urgent cases within 2 hours. Call our priority line now.</p>

          {/* Big phone number */}
          <a href="tel:5550009999" className="group inline-flex items-center gap-4 bg-white/10 hover:bg-white/20 transition-all border border-white/20 rounded-2xl px-8 py-5 mb-8">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
            </div>
            <div>
              <p className="font-display text-xs uppercase tracking-widest text-white/50 mb-0.5">Emergency Hotline</p>
              <p className="font-serif text-3xl md:text-4xl">+1 (555) 000-9999</p>
            </div>
            <span className="material-symbols-outlined ml-4 group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>
      </section>

      {/* Emergency Form */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-[#fef2f2]">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h2 className="font-serif text-3xl text-[#7f1d1d] mb-4">Request Immediate Callback</h2>
            <p className="text-[#991B1B]/70 mb-8">Our clinical coordinator will call you back within 10 minutes.</p>

            {submitted ? (
              <div className="bg-white rounded-2xl p-10 text-center editorial-shadow">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <h3 className="font-serif text-2xl text-primary mb-2">We're On It</h3>
                <p className="text-on-surface-variant">Expect a callback within 10 minutes. Please keep your phone available.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 editorial-shadow space-y-5">
                <div>
                  <label className="font-display text-xs uppercase tracking-widest text-[#7f1d1d] block mb-2">Your Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full bg-[#fef2f2] border border-[#fca5a5] focus:border-[#7f1d1d] rounded-lg px-5 py-4 outline-none text-[#7f1d1d] placeholder:text-[#f87171]/50 transition-all"
                  />
                </div>
                <div>
                  <label className="font-display text-xs uppercase tracking-widest text-[#7f1d1d] block mb-2">Phone Number</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 99999 99999"
                    className="w-full bg-[#fef2f2] border border-[#fca5a5] focus:border-[#7f1d1d] rounded-lg px-5 py-4 outline-none text-[#7f1d1d] placeholder:text-[#f87171]/50 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-[#7f1d1d] text-white font-display text-sm uppercase tracking-widest rounded-xl hover:bg-[#991b1b] transition-all active:scale-95 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Request Emergency Callback"}
                </button>
              </form>
            )}
          </div>

          {/* First aid tips */}
          <div>
            <h2 className="font-serif text-3xl text-[#7f1d1d] mb-6">While You Wait</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl editorial-shadow border-l-4 border-[#7f1d1d]">
                <h4 className="font-serif text-lg text-[#7f1d1d] mb-2">Knocked-Out Tooth</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Rinse gently (don't scrub). Try placing back in socket or store in cold milk. Act within 60 minutes.</p>
              </div>
              <div className="bg-white p-6 rounded-xl editorial-shadow border-l-4 border-[#7f1d1d]">
                <h4 className="font-serif text-lg text-[#7f1d1d] mb-2">Severe Pain</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Rinse with warm salt water. Take standard pain relief. Apply cold compress to cheek. Do NOT apply aspirin directly to tooth.</p>
              </div>
              <div className="bg-white p-6 rounded-xl editorial-shadow border-l-4 border-[#7f1d1d]">
                <h4 className="font-serif text-lg text-[#7f1d1d] mb-2">Broken Tooth</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Collect fragments in clean water or milk. Rinse mouth gently. Cover sharp edges with dental wax if available.</p>
              </div>
              <div className="bg-white p-6 rounded-xl editorial-shadow border-l-4 border-[#7f1d1d]">
                <h4 className="font-serif text-lg text-[#7f1d1d] mb-2">Facial Swelling</h4>
                <p className="text-sm text-gray-600 leading-relaxed">This may indicate a dental abscess. Do NOT lance it yourself. Apply a cold pack and call us immediately.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergencies grid */}
      <section className="py-12 md:py-16 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-primary mb-8 md:mb-10 text-center">Is This an Emergency?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencies.map((e, i) => (
            <div key={i} className="bg-surface-container-low p-7 rounded-xl border border-outline-variant/10 hover:border-[#7f1d1d]/30 transition-all group">
              <span className="material-symbols-outlined text-3xl text-[#7f1d1d] mb-4 block group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>{e.icon}</span>
              <h3 className="font-serif text-xl text-primary mb-3">{e.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
