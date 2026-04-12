"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";

type Step = 1 | 2 | 3 | 4;

const services = [
  { name: "Cosmetic Consultation", price: "Free", icon: "flare", slug: "cosmetic" },
  { name: "Full Clinical Exam", price: "₹2,000", icon: "clinical_notes", slug: "exam" },
  { name: "Emergency Visit", price: "₹3,000", icon: "emergency", slug: "emergency" },
  { name: "Hygiene & Cleaning", price: "₹2,500", icon: "dentistry", slug: "cleaning" },
  { name: "Smile Makeover", price: "Custom", icon: "face_6", slug: "makeover" },
  { name: "Dental Implant", price: "₹25,000+", icon: "home_repair_service", slug: "implant" },
];

const doctors = [
  { id: "sarah-mitchell", name: "Dr. Sarah Mitchell", role: "Cosmetic Lead", image: "/doctor_sarah_1776015037223.png" },
  { id: "james-chen", name: "Dr. James Chen", role: "Implant Master", image: "/doctor_james_1776015052907.png" },
];

const timeSlots = ["09:00 AM", "10:30 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:30 PM", "04:30 PM", "06:00 PM"];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function BookPage() {
  const [step, setStep] = useState<Step>(1);
  const [dir, setDir] = useState(1);
  const [selection, setSelection] = useState({
    service: "", doctor: "", date: "", time: "",
    name: "", phone: "", email: "", notes: ""
  });
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Read ?service= or ?doctor= query params
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const s = params.get("service");
    const d = params.get("doctor");
    if (s) setSelection(prev => ({ ...prev, service: services.find(x => x.slug === s)?.name || "" }));
    if (d) setSelection(prev => ({ ...prev, doctor: doctors.find(x => x.id === d)?.name || "" }));
  }, []);

  const goNext = () => { setDir(1); setStep(s => (s + 1) as Step); };
  const goPrev = () => { setDir(-1); setStep(s => (s - 1) as Step); };

  const progressPct = ((step - 1) / 3) * 100;

  const handleConfirm = async () => {
    setLoading(true);
    await fetch("/api/appointments/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selection),
    }).catch(() => {});
    setLoading(false);
    setConfirmed(true);
  };

  const calLink = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent("SmileCraft Appointment")}&details=${encodeURIComponent(`Service: ${selection.service}\nDoctor: ${selection.doctor}`)}&dates=20241015T090000/20241015T100000`;
  const waLink = `https://wa.me/919999999999?text=${encodeURIComponent(`Hi SmileCraft! My appointment is confirmed: ${selection.service} with ${selection.doctor} on ${selection.date} at ${selection.time}.`)}`;

  const stepLabels = ["Service", "Doctor & Time", "Your Details", "Confirm"];

  return (
    <div className="bg-surface pb-32">
      <header className="py-12 md:py-16 px-4 md:px-8 max-w-screen-xl mx-auto text-center">
        <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-tertiary block mb-3">Reservation</span>
        <h1 className="font-serif text-4xl md:text-6xl text-primary mb-8 md:mb-10">Book Your Experience</h1>

        {/* Progress bar */}
        {!confirmed && (
          <div className="max-w-lg mx-auto">
            <div className="flex justify-between mb-3">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-display text-[10px] transition-all duration-300 ${
                    step > i + 1 ? "border-tertiary bg-tertiary text-white" : step === i + 1 ? "border-primary bg-primary text-on-primary" : "border-outline-variant text-outline"
                  }`}>
                    {step > i + 1 ? <span className="material-symbols-outlined text-sm">check</span> : i + 1}
                  </div>
                  <span className={`font-display text-[9px] uppercase tracking-widest hidden sm:block ${step === i + 1 ? "text-primary" : "text-outline"}`}>{label}</span>
                </div>
              ))}
            </div>
            <div className="h-1.5 bg-surface-container-low rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full transition-all duration-500" style={{ width: `${progressPct + 34}%` }} />
            </div>
          </div>
        )}
      </header>

      <section className="px-4 md:px-8 max-w-screen-xl mx-auto">
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-14 editorial-shadow min-h-[480px] overflow-hidden relative">

          {confirmed ? (
            /* Confirmation screen */
            <div className="text-center py-10 animate-fade-in">
              {/* Animated checkmark */}
              <div className="w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center mx-auto mb-6">
                <svg viewBox="0 0 52 52" className="w-12 h-12">
                  <circle cx="26" cy="26" r="24" fill="none" stroke="#C9A84C" strokeWidth="3" />
                  <path
                    d="M14 27l8 8 16-16"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: 100,
                      strokeDashoffset: 0,
                      animation: "checkDraw 0.6s ease forwards"
                    }}
                  />
                  <style>{`@keyframes checkDraw { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }`}</style>
                </svg>
              </div>
              <h2 className="font-serif text-4xl text-primary mb-3">You're Booked!</h2>
              <p className="text-on-surface-variant mb-8">Appointment details have been sent to {selection.email || "your phone"}.</p>
              <div className="bg-surface-container-low rounded-2xl p-6 max-w-md mx-auto text-left mb-8 space-y-3">
                {[
                  { label: "Service", value: selection.service },
                  { label: "Doctor", value: selection.doctor },
                  { label: "Date & Time", value: `${selection.date} at ${selection.time}` },
                  { label: "Patient", value: selection.name },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="font-display text-[10px] uppercase tracking-widest text-on-surface-variant">{label}</span>
                    <span className="font-serif text-primary">{value}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <a href={calLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-surface-container-low rounded-xl font-display text-xs uppercase tracking-widest hover:bg-secondary-container transition-all">
                  <span className="material-symbols-outlined text-base">calendar_add_on</span>
                  Add to Google Calendar
                </a>
                <a href={waLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366]/10 text-[#25D366] rounded-xl font-display text-xs uppercase tracking-widest hover:bg-[#25D366]/20 transition-all">
                  Share on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* STEP 1 */}
                {step === 1 && (
                  <div>
                    <h2 className="font-serif text-3xl text-primary mb-8">Select a Service</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {services.map((s) => (
                        <div
                          key={s.name}
                          onClick={() => { setSelection({ ...selection, service: s.name }); goNext(); }}
                          className={`p-7 border-2 rounded-2xl cursor-pointer transition-all group ${selection.service === s.name ? "border-tertiary bg-tertiary/5" : "border-outline-variant/10 hover:border-primary/40"}`}
                        >
                          <span className="material-symbols-outlined text-4xl text-tertiary mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                          <h3 className="font-serif text-lg text-primary mb-1 group-hover:translate-x-0.5 transition-transform">{s.name}</h3>
                          <p className="font-display text-[10px] text-outline uppercase tracking-widest">From {s.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div>
                    <h2 className="font-serif text-3xl text-primary mb-8">Choose Doctor & Time</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      <div>
                        <p className="font-display text-[10px] uppercase tracking-widest text-on-surface-variant mb-4">Select Specialist</p>
                        <div className="space-y-4">
                          {doctors.map((d) => (
                            <div
                              key={d.id}
                              onClick={() => setSelection({ ...selection, doctor: d.name })}
                              className={`flex items-center gap-5 p-5 border-2 rounded-2xl cursor-pointer transition-all ${selection.doctor === d.name ? "border-tertiary bg-tertiary/5" : "border-outline-variant/10 hover:border-primary/40"}`}
                            >
                              <div className="w-16 h-16 rounded-full overflow-hidden relative flex-shrink-0 border border-outline-variant/20">
                                <Image fill src={d.image} alt={d.name} className="object-cover object-top" />
                              </div>
                              <div>
                                <p className="font-serif text-lg text-primary">{d.name}</p>
                                <p className="font-display text-[10px] text-tertiary uppercase tracking-widest">{d.role}</p>
                              </div>
                              {selection.doctor === d.name && <span className="material-symbols-outlined ml-auto text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-display text-[10px] uppercase tracking-widest text-on-surface-variant mb-4">Select Time Slot</p>
                        <div className="grid grid-cols-2 gap-3">
                          {timeSlots.map((t) => (
                            <button
                              key={t}
                              onClick={() => { setSelection({ ...selection, time: t }); }}
                              className={`p-4 rounded-xl border-2 font-display text-xs uppercase tracking-widest transition-all ${selection.time === t ? "border-tertiary bg-tertiary/5 text-primary" : "border-outline-variant/10 hover:border-tertiary/40"}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <button onClick={goPrev} className="flex items-center gap-2 text-[10px] font-display uppercase tracking-widest text-outline hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">arrow_back</span> Back
                      </button>
                      <Button
                        variant="primary"
                        className="ml-auto px-8 py-4"
                        onClick={() => selection.doctor && selection.time && goNext()}
                      >
                        Continue →
                      </Button>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div>
                    <h2 className="font-serif text-3xl text-primary mb-8">Your Details</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      <div className="space-y-5">
                        {[
                          { label: "Full Name", key: "name", type: "text", placeholder: "Your full name" },
                          { label: "Phone Number", key: "phone", type: "tel", placeholder: "+91 99999 99999" },
                          { label: "Email Address", key: "email", type: "email", placeholder: "you@example.com" },
                        ].map(({ label, key, type, placeholder }) => (
                          <div key={key}>
                            <label className="font-display text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">{label}</label>
                            <input
                              type={type}
                              value={(selection as any)[key]}
                              onChange={e => setSelection({ ...selection, [key]: e.target.value })}
                              placeholder={placeholder}
                              className="w-full bg-surface-container-low border border-transparent focus:border-tertiary rounded-xl px-5 py-4 outline-none transition-all"
                            />
                          </div>
                        ))}
                        <div>
                          <label className="font-display text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Notes (optional)</label>
                          <textarea
                            rows={4}
                            value={selection.notes}
                            onChange={e => setSelection({ ...selection, notes: e.target.value })}
                            placeholder="Any specific concerns or previous dental history..."
                            className="w-full bg-surface-container-low border border-transparent focus:border-tertiary rounded-xl px-5 py-4 outline-none transition-all resize-none"
                          />
                        </div>
                      </div>
                      {/* Booking Summary Sidebar */}
                      <div className="bg-surface-container-low rounded-2xl p-6 h-fit border border-outline-variant/10">
                        <h3 className="font-serif text-xl text-primary mb-5">Booking Summary</h3>
                        {[
                          { icon: "flare", label: "Service", value: selection.service },
                          { icon: "person", label: "Doctor", value: selection.doctor },
                          { icon: "schedule", label: "Time", value: selection.time || "Not selected" },
                        ].map(({ icon, label, value }) => (
                          <div key={label} className="flex items-center gap-4 mb-4 pb-4 border-b border-outline-variant/10 last:border-0 last:mb-0 last:pb-0">
                            <div className="w-9 h-9 rounded-full bg-tertiary/10 flex items-center justify-center flex-shrink-0">
                              <span className="material-symbols-outlined text-tertiary text-base">{icon}</span>
                            </div>
                            <div>
                              <p className="font-display text-[9px] uppercase tracking-widest text-on-surface-variant">{label}</p>
                              <p className="font-serif text-base text-primary">{value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <button onClick={goPrev} className="flex items-center gap-2 text-[10px] font-display uppercase tracking-widest text-outline hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">arrow_back</span> Back
                      </button>
                      <Button
                        variant="primary"
                        className="ml-auto px-8 py-4"
                        onClick={() => selection.name && selection.phone && goNext()}
                      >
                        Review Booking →
                      </Button>
                    </div>
                  </div>
                )}

                {/* STEP 4 - CONFIRM */}
                {step === 4 && (
                  <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-3xl text-primary mb-8 text-center">Confirm Reservation</h2>
                    <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10 mb-8 space-y-5">
                      {[
                        { icon: "flare", label: "Service", value: selection.service },
                        { icon: "person", label: "Doctor", value: selection.doctor },
                        { icon: "schedule", label: "Time", value: selection.time },
                        { icon: "badge", label: "Patient", value: selection.name },
                        { icon: "call", label: "Phone", value: selection.phone },
                      ].map(({ icon, label, value }) => (
                        <div key={label} className="flex items-center justify-between border-b border-outline-variant/10 pb-5 last:border-0 last:pb-0">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-tertiary text-xl">{icon}</span>
                            <div>
                              <p className="font-display text-[9px] uppercase tracking-widest text-on-surface-variant">{label}</p>
                              <p className="font-serif text-lg text-primary">{value}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="primary"
                      className="w-full py-6 text-sm"
                      icon="check_circle"
                      onClick={handleConfirm}
                    >
                      {loading ? "Confirming..." : "Confirm & Book Appointment"}
                    </Button>
                    <button onClick={goPrev} className="mt-5 w-full flex items-center justify-center gap-2 text-[10px] font-display uppercase tracking-widest text-outline hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-lg">arrow_back</span> Edit Details
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
