"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function TruckAnimation() {
  const truckRef    = useRef<HTMLDivElement>(null);
  const packageRef  = useRef<HTMLDivElement>(null);
  const checkRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const statusRef   = useRef<HTMLSpanElement>(null);

  const STATUSES = ["Recibido en origen", "En tránsito", "En ruta de entrega", "Entregado ✓"];

  useEffect(() => {
    const truck    = truckRef.current;
    const pkg      = packageRef.current;
    const check    = checkRef.current;
    const progress = progressRef.current;
    const status   = statusRef.current;
    if (!truck || !pkg || !check || !progress || !status) return;

    const run = () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });

      // Reset
      tl.set(truck,    { left: "2%", opacity: 1 })
        .set(check,    { opacity: 0, scale: 0 })
        .set(progress, { width: "0%" })
        .set(status,   { opacity: 1 });

      // Status 1: Recibido
      tl.call(() => { if (status) status.textContent = STATUSES[0]; })
        .to(progress, { width: "10%", duration: 0.4, ease: "power1.out" });

      // Truck drives across
      tl.to(truck, { left: "72%", duration: 3.2, ease: "power1.inOut" }, "<0.2")
        .to(progress, { width: "75%", duration: 3.2, ease: "power1.inOut" }, "<");

      // Status updates mid-route
      tl.call(() => { if (status) status.textContent = STATUSES[1]; }, [], 0.8)
        .call(() => { if (status) status.textContent = STATUSES[2]; }, [], 2.4);

      // Truck bounce on arrival
      tl.to(truck, { y: -8, duration: 0.15, ease: "power2.out", yoyo: true, repeat: 3 });

      // Package flies off
      tl.to(pkg, { y: -28, x: 18, rotation: 15, opacity: 0, duration: 0.4, ease: "power2.out" }, "<0.1")
        .to(progress, { width: "100%", duration: 0.3, ease: "power2.out" }, "<");

      // Checkmark appears
      tl.call(() => { if (status) status.textContent = STATUSES[3]; })
        .to(truck,   { opacity: 0, duration: 0.25 })
        .to(check,   { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, "<0.1")
        .set(pkg,    { y: 0, x: 0, rotation: 0, opacity: 1 }, "<");

      // Hold, then fade out before repeat
      tl.to([check, status], { opacity: 0, duration: 0.3 }, "+=1.2");
    };

    run();

    // Package bobbing while driving
    gsap.to(pkg, {
      y: -4, duration: 0.35, ease: "sine.inOut",
      yoyo: true, repeat: -1,
    });

    return () => gsap.killTweensOf([truck, pkg, check, progress, status]);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto select-none">
      {/* Tracking card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Número de guía</p>
            <p className="font-mono text-accent text-sm font-bold">HURRY-20260507-00142</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center">
            <span className="text-sm">📦</span>
          </div>
        </div>

        {/* Road scene */}
        <div className="relative h-24 mb-4 overflow-hidden rounded-xl bg-navy/60 border border-white/8">
          {/* Road */}
          <div className="absolute bottom-5 left-0 right-0 h-px bg-white/10" />
          {/* Dashed center line */}
          <div className="absolute bottom-[18px] left-0 right-0 h-px"
            style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 12px, transparent 12px, transparent 24px)" }}
          />

          {/* City dots */}
          <div className="absolute bottom-3 left-3 flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_6px_#0096FF]" />
            <span className="text-gray-500 text-[9px] font-mono">LA</span>
          </div>
          <div className="absolute bottom-3 right-3 flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_6px_#0096FF]" />
            <span className="text-gray-500 text-[9px] font-mono">GDL</span>
          </div>

          {/* Truck */}
          <div ref={truckRef} className="absolute bottom-5 -translate-y-full" style={{ left: "2%" }}>
            <div className="relative">
              {/* Package on roof */}
              <div ref={packageRef} className="absolute -top-5 left-1/2 -translate-x-1/2 text-sm">📦</div>
              {/* Truck body */}
              <div className="text-2xl">🚚</div>
            </div>
          </div>

          {/* Checkmark on arrival */}
          <div ref={checkRef} className="absolute inset-0 flex items-center justify-center opacity-0">
            <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="h-1 rounded-full bg-white/8 overflow-hidden">
            <div ref={progressRef} className="h-full rounded-full bg-accent" style={{ width: "0%",
              boxShadow: "0 0 8px rgba(0,150,255,0.6)" }}
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span ref={statusRef} className="text-white text-xs font-medium">Recibido en origen</span>
        </div>

        {/* Route */}
        <div className="mt-3 flex items-center justify-between text-[10px] text-gray-600 font-mono">
          <span>Los Ángeles, CA</span>
          <span className="text-accent/60">→</span>
          <span>Guadalajara, Jal</span>
        </div>
      </div>
    </div>
  );
}
