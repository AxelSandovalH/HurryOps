"use client";

import Image from "next/image";
import { useEffect } from "react";
import { gsap } from "gsap";

export default function HeroClient() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-badge]",   { opacity: 0, y: 20, duration: 0.5 })
        .from("[data-hero-title]",   { opacity: 0, y: 40, duration: 0.7 }, "-=0.2")
        .from("[data-hero-sub]",     { opacity: 0, y: 25, duration: 0.6 }, "-=0.3")
        .from("[data-hero-ctas]",    { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
        .from("[data-hero-mockup]",  { opacity: 0, x: 60, duration: 0.8, ease: "power2.out" }, "-=0.6");
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span data-hero-badge className="inline-block bg-surface text-accent text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
            Corredor EE.UU. → México
          </span>
          <h1 data-hero-title className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6">
            Logística internacional,{" "}
            <span className="text-accent">sin el caos</span>
          </h1>
          <p data-hero-sub className="text-lg text-gray-600 mb-8 leading-relaxed">
            HurryOps centraliza tu operación de paquetería en un solo portal.
            Guías automáticas, rastreo en tiempo real y control total de tus
            agencias en ambos países.
          </p>
          <div data-hero-ctas className="flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="bg-accent hover:bg-accent-dark text-white font-semibold px-7 py-3.5 rounded-lg transition-colors text-base"
            >
              Solicitar acceso
            </a>
            <a
              href="#como-funciona"
              className="border border-navy text-navy hover:bg-surface font-semibold px-7 py-3.5 rounded-lg transition-colors text-base"
            >
              Ver cómo funciona
            </a>
          </div>
        </div>

        <div data-hero-mockup className="bg-navy rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-2 text-gray-400 text-xs font-mono">hurryops.com/track</span>
          </div>
          <TrackingMockup />
        </div>
      </div>
    </section>
  );
}

function TrackingMockup() {
  const steps = [
    { label: "Recibido en origen",   location: "Los Ángeles, CA",        done: true  },
    { label: "En tránsito",          location: "Nogales, AZ → Sonora",   done: true  },
    { label: "En ruta de entrega",   location: "Guadalajara, Jal",       done: true  },
    { label: "Entregado",            location: "Pendiente",              done: false },
  ];

  return (
    <div className="text-white">
      <div className="bg-white/10 rounded-lg p-4 mb-4">
        <p className="text-xs text-gray-400 mb-1">Número de guía</p>
        <p className="font-mono text-accent text-sm font-bold">HURRY-20260507-00142</p>
      </div>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div
              className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                step.done ? "bg-accent text-white" : "bg-white/10 text-gray-500"
              }`}
            >
              {step.done ? "✓" : ""}
            </div>
            <div>
              <p className={`text-sm font-medium ${step.done ? "text-white" : "text-gray-500"}`}>
                {step.label}
              </p>
              <p className={`text-xs ${step.done ? "text-gray-400" : "text-gray-600"}`}>
                {step.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
