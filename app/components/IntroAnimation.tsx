"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function IntroAnimation() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    // Logo entra al centro
    tl.from(logoRef.current, {
      opacity: 0,
      scale: 0.6,
      duration: 0.7,
      ease: "back.out(1.4)",
    })
    // Texto sale deslizando desde detrás del logo hacia la derecha
    .from(textRef.current, {
      opacity: 0,
      x: -40,
      duration: 0.55,
      ease: "power3.out",
    }, "-=0.1")
    // Pausa para leer
    .to({}, { duration: 0.8 })
    // Todo sube y el overlay desaparece
    .to([logoRef.current, textRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.45,
      ease: "power2.in",
      stagger: 0.06,
    })
    .to(overlayRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: "power3.inOut",
    }, "-=0.1");

    return () => { tl.kill(); };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-navy flex items-center justify-center"
    >
      <div className="flex items-center gap-4 md:gap-6">
        <div ref={logoRef} className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-4">
          <Image
            src="/logo.png"
            alt="HurryOps"
            width={140}
            height={140}
            className="object-contain w-16 h-16 md:w-[140px] md:h-[140px]"
            priority
          />
        </div>
        <span
          ref={textRef}
          className="text-white text-4xl md:text-6xl font-bold tracking-tight"
        >
          HurryOps
        </span>
      </div>
    </div>
  );
}
