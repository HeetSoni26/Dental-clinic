"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

const treatments = [
  { id: "whitening", label: "Whitening", icon: "brightness_high", color: "#FDE68A", description: "Brightens teeth 6-8 shades" },
  { id: "veneers", label: "Veneers", icon: "flare", color: "#FCA5A5", description: "Porcelain smile design" },
  { id: "braces", label: "Braces", icon: "align_center", color: "#93C5FD", description: "Straightens alignment" },
  { id: "implants", label: "Implants", icon: "home_repair_service", color: "#6EE7B7", description: "Replaces missing teeth" },
];

const overlayStyles: Record<string, string> = {
  whitening: "brightness(1.4) saturate(0.8)",
  veneers: "contrast(1.1) saturate(1.1)",
  braces: "hue-rotate(5deg)",
  implants: "contrast(1.05)",
};

export default function SimulatorPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [treatment, setTreatment] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setUploadedImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="bg-surface pb-24">
      {/* Hero with 3D rotating visual */}
      <section className="py-16 md:py-20 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="text-center md:text-left">
            <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-tertiary block mb-3">AI Smile Preview</span>
            <h1 className="font-serif text-5xl md:text-7xl text-primary mb-4 md:mb-6 leading-tight">
              See Your Smile<br /><em>Before You Decide</em>
            </h1>
            <p className="text-on-surface-variant text-base md:text-xl leading-relaxed mb-6 md:mb-8 max-w-xl mx-auto md:mx-0">
              Upload a photo, select a treatment, and get an artistic preview of your transformed smile. Free, instant, and beautifully illustrative.
            </p>
            <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center justify-center md:justify-start gap-2 md:gap-3 text-xs md:text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-tertiary">info</span>
              <em>Artistic preview only. Your actual results will be assessed by your dentist.</em>
            </div>
          </div>

          {/* 3D rotating phone mockup */}
          <div className="flex justify-center">
            <div
              className="relative w-56 h-auto"
              style={{
                animation: "float3d 6s ease-in-out infinite",
                transformStyle: "preserve-3d",
              }}
            >
              <style>{`
                @keyframes float3d {
                  0%, 100% { transform: perspective(800px) rotateY(-10deg) rotateX(5deg) translateY(0px); }
                  50% { transform: perspective(800px) rotateY(10deg) rotateX(-5deg) translateY(-20px); }
                }
              `}</style>
              <div className="bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border border-white/10">
                <div className="bg-surface-container-low rounded-[2rem] overflow-hidden aspect-[9/19]">
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Uploaded smile preview"
                      className="w-full h-full object-cover"
                      style={{ filter: treatment ? overlayStyles[treatment] : "none", transition: "filter 0.5s ease" }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4 text-center">
                      <span className="material-symbols-outlined text-4xl text-tertiary">face_6</span>
                      <p className="text-xs font-display uppercase tracking-widest text-on-surface-variant">Upload your photo</p>
                    </div>
                  )}
                </div>
              </div>
              {/* Reflection */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface to-transparent opacity-30 rounded-b-[2.5rem]" />
            </div>
          </div>
        </div>
      </section>

      {/* Upload Area */}
      <section className="px-4 md:px-8 max-w-screen-2xl mx-auto mb-10 md:mb-12">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
            isDragging ? "border-tertiary bg-tertiary/5" : "border-outline-variant/30 hover:border-tertiary/50 hover:bg-surface-container-low"
          }`}
        >
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          <span className="material-symbols-outlined text-5xl text-tertiary mb-4 block">cloud_upload</span>
          <p className="font-serif text-xl text-primary mb-2">Drop your photo here</p>
          <p className="text-on-surface-variant text-sm">or click to browse — PNG, JPG, WEBP supported</p>
          <p className="text-xs text-outline mt-3">For best results: use a straight-on smile photo with good lighting</p>
        </div>
      </section>

      {/* Treatment Chips + Result */}
      {uploadedImage && (
        <section className="px-4 md:px-8 max-w-screen-2xl mx-auto mb-10 md:mb-12 animate-fade-in">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 text-center md:text-left">Select a Treatment Preview</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 mb-8 md:mb-10">
            {treatments.map((t) => (
              <button
                key={t.id}
                onClick={() => setTreatment(t.id === treatment ? null : t.id)}
                className={`flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-full border-2 transition-all font-display text-[10px] md:text-xs uppercase tracking-widest ${
                  treatment === t.id ? "border-tertiary bg-tertiary/10 text-primary shadow-md" : "border-outline-variant/20 hover:border-tertiary/40"
                }`}
              >
                <span className="material-symbols-outlined text-[14px] md:text-base" style={{ color: t.color }}>{t.icon}</span>
                {t.label}
                <span className="hidden md:inline text-[9px] text-on-surface-variant font-normal normal-case tracking-normal">· {t.description}</span>
              </button>
            ))}
          </div>

          {/* Before/After Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden editorial-shadow">
              <img src={uploadedImage} alt="Before" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full font-display text-xs uppercase tracking-widest text-primary">Before</div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden editorial-shadow">
              <img
                src={uploadedImage}
                alt="After"
                className="w-full h-full object-cover transition-all duration-500"
                style={{ filter: treatment ? overlayStyles[treatment] : "none" }}
              />
              <div className="absolute top-4 left-4 bg-tertiary px-3 py-1.5 rounded-full font-display text-xs uppercase tracking-widest text-white">
                {treatment ? treatments.find(t => t.id === treatment)?.label : "Select Treatment"}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white/70 text-[10px] italic">⚠ Artistic preview only — illustrative purposes. Actual results assessed by your dentist.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10">
            <h3 className="font-serif text-2xl text-primary mb-3">Love What You See?</h3>
            <p className="text-on-surface-variant mb-6">Book a real consultation and let our experts show you what's truly possible.</p>
            <Link href="/book">
              <Button variant="primary" icon="calendar_today" className="px-10 py-5">Book a Real Consultation</Button>
            </Link>
          </div>
        </section>
      )}

      {/* How it works */}
      {!uploadedImage && (
        <section className="px-4 md:px-8 max-w-screen-2xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Upload a Photo", desc: "Use a clear, straight-on smiling photo for the most accurate preview." },
              { step: "02", title: "Choose a Treatment", desc: "Select from whitening, veneers, braces, or implants to see an illustrative result." },
              { step: "03", title: "Book a Consultation", desc: "Our experts will show you what's truly achievable with your unique smile." },
            ].map((item) => (
              <div key={item.step} className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
                <p className="font-display text-4xl text-tertiary/30 mb-4">{item.step}</p>
                <h3 className="font-serif text-xl text-primary mb-3">{item.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
