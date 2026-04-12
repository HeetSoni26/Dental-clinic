"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import CompareSlider from "../ui/CompareSlider";

export default function SmileSimulator() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState("Whitening");

  const startSimulation = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-outline-variant/10 rounded-[2rem] overflow-hidden shadow-sm">
        {/* Left: Control Panel */}
        <div className="bg-surface-container-lowest p-12 lg:p-16">
          <h2 className="font-serif text-4xl text-primary mb-10">Configure Your Result</h2>
          
          {/* Upload Widget */}
          <div className="mb-12">
            <label className="font-display text-xs uppercase tracking-widest text-outline mb-4 block">1. Upload Portrait</label>
            <div className="border-2 border-dashed border-outline-variant rounded-2xl p-10 flex flex-col items-center justify-center bg-surface transition-all hover:bg-surface-container-high group cursor-pointer">
              <div className="w-16 h-16 bg-primary-container text-on-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
              </div>
              <p className="font-sans text-on-surface-variant text-center mb-2">Drag and drop or <span className="text-tertiary font-bold">browse</span></p>
              <p className="text-[10px] text-outline uppercase tracking-widest font-display">High-res JPG or PNG (Max 10MB)</p>
            </div>
          </div>

          {/* Treatment Selector */}
          <div className="mb-12">
            <label className="font-display text-xs uppercase tracking-widest text-outline mb-4 block">2. Select Enhancement</label>
            <div className="flex flex-wrap gap-3">
              {["Whitening", "Veneers", "Invisalign", "Full Restoration"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTreatment(t)}
                  className={`px-6 py-3 rounded-full font-display text-[10px] tracking-widest uppercase transition-all ${
                    selectedTreatment === t
                      ? "bg-primary-container text-white shadow-md"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-secondary-container"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <Button 
            variant="tertiary" 
            className="w-full py-5 text-sm tracking-[0.2em]" 
            onClick={startSimulation}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing Geometry..." : "Process Simulation"}
          </Button>
        </div>

        {/* Right: Results Preview */}
        <div className="bg-primary-container relative min-h-[500px] flex items-center justify-center overflow-hidden">
          {!showResult && !isProcessing && (
            <div className="text-center p-8">
              <span className="material-symbols-outlined text-6xl text-on-primary/20 mb-4 block">camera_enhance</span>
              <p className="text-on-primary-container font-display text-xs uppercase tracking-widest">Awaiting Input Scan</p>
            </div>
          )}

          {isProcessing && (
            <div className="absolute inset-0 z-20 bg-primary-container/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
              <div className="w-24 h-24 relative mb-6">
                <div className="absolute inset-0 border-2 border-tertiary/20 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-t-tertiary rounded-full animate-spin"></div>
              </div>
              <div className="text-[10px] font-display text-tertiary uppercase tracking-[0.3em] mb-2">Scanning Topology</div>
              <h3 className="font-serif text-2xl text-white">SmileAI™ Analysis in Progress</h3>
            </div>
          )}

          {showResult && (
            <div className="absolute inset-0 animate-fade-in">
              <CompareSlider 
                beforeImage="https://lh3.googleusercontent.com/aida-public/AB6AXuCdfCvXlHaxvsJKYfNbZlZJu_UjSZVqwrC6kBX7NbH2hT9nGWreRkebJnXwFaM9DeZSUfMHA7fCQblKpPwpM_OR9M5xFitYyHp8jqGhYU5losB-lYjU4ULD_puSQ-bK0hENtYhF3_81jCox5EM3uxQwa6jGMSGHediKyQ3JcXSkpXerHo10XwCX-Rxp4BEmwED6rxERX-0cyqGMmTig_7eBQgCULnYgYKqc4468HlO_woF0XheyHqS62yHmZAdByMwcB6NiNmJ4G1t9"
                afterImage="https://lh3.googleusercontent.com/aida-public/AB6AXuCNAatC9CCNZ4mJxy5WGznwJUeEfJVxswEBxkkYNG98RLlc1kV2LcNCrpxRZHdvYfvNxo_KQjlAL3w6H6pQks-DxX-tB8TE_uybZPtv_SohCecaBQlJOCSNFfis7O1yFqoqCPRhfxbY1wec9f2Je_Q7oK--mqHMXfdGDMRQa-Ec4318uHnEvWraCutjblr_QTTqDnUQvxja830xvK9Qzo-8S_EKJaA5r7aRJV-_iKAyk52M3Hr57kOMaWdKUUhr-uXkkNY4vkBTuNGP"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
