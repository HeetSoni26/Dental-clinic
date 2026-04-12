"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useRevealAnimation } from "@/hooks/useAnimations";
import { useState } from "react";

const doctors = [
  {
    id: "sarah-mitchell",
    name: "Dr. Sarah Mitchell",
    role: "Founder & Lead Cosmetic Surgeon",
    bio: "With over 15 years of Beverly Hills cosmetic dentistry experience, Dr. Mitchell has pioneered advanced smile design protocols used by practices across North America. Her philosophy: every smile is a collaboration between art and science.",
    specializations: ["Porcelain Veneers", "Smile Makeovers", "Gum Contouring", "Full Arch Restoration"],
    image: "/doctor_sarah_1776015037223.png",
    education: [
      { year: "2004", degree: "DDS — UCLA School of Dentistry", note: "Graduated with Honours" },
      { year: "2006", degree: "Residency — Beverly Hills Aesthetic Institute", note: "Advanced Cosmetic Dentistry" },
      { year: "2010", degree: "Fellowship — AACD", note: "American Academy of Cosmetic Dentistry" },
    ],
    certifications: ["AACD Fellow", "NABH Accredited", "Invisalign Diamond Provider"],
    patientQuote: "Dr. Mitchell gave me my confidence back. I'd avoided smiling in photos for 10 years.",
    patientName: "Elena R., Fashion Designer",
  },
  {
    id: "james-chen",
    name: "Dr. James Chen",
    role: "Master Implantologist",
    bio: "A pioneer in 3D-guided implant therapy and structural dental rehabilitation, Dr. Chen has placed over 3,000 implants with a 98.7% success rate. He lectures internationally on digital surgical planning and full-arch rehabilitation.",
    specializations: ["3D-Guided Implants", "Bone Grafting", "All-on-4", "Bite Reconstruction"],
    image: "/doctor_james_1776015052907.png",
    education: [
      { year: "2006", degree: "BDS — King's College London", note: "First Class Honours" },
      { year: "2008", degree: "MDS Oral Surgery — Harvard School of Dental Medicine", note: "Research in guided implantology" },
      { year: "2012", degree: "ITI Fellowship", note: "International Team for Implantology" },
    ],
    certifications: ["ITI Fellow", "Board Certified Oral Surgeon", "Nobel Biocare Certified"],
    patientQuote: "My implants look and feel completely natural. I forget they aren't my original teeth.",
    patientName: "Marcus V., Architect",
  },
];

function DoctorModal({ doctor, onClose }: { doctor: typeof doctors[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-md flex items-start justify-center overflow-y-auto py-12 px-4" onClick={onClose}>
      <div className="bg-surface w-full max-w-3xl rounded-2xl overflow-hidden editorial-shadow relative" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-outline-variant/20 transition-all">
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto md:min-h-[400px]">
            <Image fill src={doctor.image} alt={doctor.name} className="object-cover" />
          </div>
          <div className="bg-primary-container p-8 flex flex-col justify-end">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-tertiary mb-2">{doctor.role}</p>
            <h2 className="font-serif text-3xl text-white mb-4">{doctor.name}</h2>
            <p className="text-white/70 text-sm leading-relaxed">{doctor.bio}</p>
          </div>
        </div>

        {/* Education Timeline */}
        <div className="p-8 border-b border-outline-variant/10">
          <h3 className="font-display text-xs uppercase tracking-widest text-tertiary mb-6">Education & Training</h3>
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-tertiary to-transparent" />
            {doctor.education.map((e, i) => (
              <div key={i} className="relative mb-6 last:mb-0">
                <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-tertiary border-2 border-surface" />
                <p className="font-display text-[10px] uppercase tracking-widest text-tertiary mb-1">{e.year}</p>
                <p className="font-serif text-base text-primary">{e.degree}</p>
                <p className="text-on-surface-variant text-xs">{e.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="p-8 border-b border-outline-variant/10">
          <h3 className="font-display text-xs uppercase tracking-widest text-tertiary mb-4">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {doctor.certifications.map(c => (
              <span key={c} className="px-3 py-1.5 bg-secondary-container text-secondary font-display text-[10px] uppercase tracking-widest rounded-full">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Patient Quote */}
        <div className="p-8 bg-surface-container-low">
          <p className="font-serif italic text-lg text-primary mb-3">"{doctor.patientQuote}"</p>
          <p className="font-display text-xs uppercase tracking-widest text-on-surface-variant">— {doctor.patientName}</p>
        </div>

        {/* CTA */}
        <div className="p-6 flex justify-end">
          <Link href={`/book?doctor=${doctor.id}`}>
            <Button variant="primary" icon="calendar_today">Book with {doctor.name.split(" ")[1]}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DoctorsPage() {
  const revealRef = useRevealAnimation(0.12);
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);

  return (
    <div className="bg-surface pb-16 md:pb-24">
      <header className="py-16 md:py-20 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-tertiary block mb-3 text-center md:text-left">Our Specialists</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 text-center md:text-left">
          <h1 className="font-serif text-5xl md:text-7xl text-primary leading-tight">The Hands<br className="hidden md:block"/>Behind the Art</h1>
          <p className="text-on-surface-variant text-lg max-w-md">
            World-class clinicians who combine clinical precision with an artistic eye for the perfect result.
          </p>
        </div>
      </header>

      {/* Doctor Cards */}
      <section ref={revealRef} className="px-4 md:px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="reveal-child doctor-card group cursor-pointer"
              style={{ height: "580px" }}
              onClick={() => setSelectedDoctor(doc)}
            >
              <div className="doctor-card-inner rounded-2xl overflow-hidden editorial-shadow h-full">
                {/* Front */}
                <div className="doctor-card-front bg-surface-container-low rounded-2xl overflow-hidden h-full flex flex-col">
                  <div className="relative flex-1 overflow-hidden">
                    <Image fill src={doc.image} alt={doc.name} className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h2 className="font-serif text-2xl text-white mb-1">{doc.name}</h2>
                      <p className="font-display text-[10px] uppercase tracking-widest text-tertiary">{doc.role}</p>
                    </div>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {doc.specializations.slice(0,2).map(s => (
                        <span key={s} className="text-[9px] font-display uppercase tracking-widest px-2 py-1 bg-secondary-container text-secondary rounded">{s}</span>
                      ))}
                    </div>
                    <span className="text-xs font-display text-tertiary uppercase tracking-widest flex items-center gap-1">
                      View Profile <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </span>
                  </div>
                </div>

                {/* Back */}
                <div className="doctor-card-back bg-primary-container rounded-2xl p-8 flex flex-col justify-between h-full">
                  <div>
                    <p className="font-display text-xs uppercase tracking-[0.3em] text-tertiary mb-2">{doc.role}</p>
                    <h2 className="font-serif text-2xl text-white mb-4">{doc.name}</h2>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">{doc.bio.substring(0, 180)}...</p>
                    <div className="space-y-2">
                      {doc.specializations.map(s => (
                        <div key={s} className="flex items-center gap-3 text-white/80 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary flex-shrink-0" />
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedDoctor(doc); }}
                      className="flex-1 py-3 border border-white/20 text-white rounded-lg font-display text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      Full Profile
                    </button>
                    <Link href={`/book?doctor=${doc.id}`} className="flex-1" onClick={e => e.stopPropagation()}>
                      <Button variant="tertiary" className="w-full py-3">Book Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Our Team */}
      <section className="py-16 md:py-20 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { icon: "school", title: "Elite Credentials", desc: "Trained at the world's top dental schools including Harvard, UCLA, and King's College London." },
            { icon: "workspace_premium", title: "Continuous Learning", desc: "Our team invests 40+ hours annually in advanced continuing education across global symposia." },
            { icon: "handshake", title: "Patient-Centred", desc: "Every treatment plan is crafted in collaboration with you. No two smiles — or journeys — are the same." },
          ].map((item, i) => (
            <div key={i} className="p-8 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:border-tertiary/30 transition-all">
              <span className="material-symbols-outlined text-3xl text-tertiary mb-4 block">{item.icon}</span>
              <h3 className="font-serif text-xl text-primary mb-3">{item.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctor Modal */}
      {selectedDoctor && (
        <DoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
    </div>
  );
}
