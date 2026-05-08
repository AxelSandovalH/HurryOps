"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useHeroAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-badge]", {
        opacity: 0, y: 20, duration: 0.6, ease: "power2.out",
      });
      gsap.from("[data-hero-title]", {
        opacity: 0, y: 40, duration: 0.8, ease: "power2.out", delay: 0.15,
      });
      gsap.from("[data-hero-sub]", {
        opacity: 0, y: 30, duration: 0.7, ease: "power2.out", delay: 0.3,
      });
      gsap.from("[data-hero-ctas]", {
        opacity: 0, y: 20, duration: 0.6, ease: "power2.out", delay: 0.45,
      });
      gsap.from("[data-hero-mockup]", {
        opacity: 0, x: 60, duration: 0.9, ease: "power3.out", delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, []);
}

export function useFadeInOnScroll(selector: string, stagger = 0.15) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(selector, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power2.out",
        stagger,
        scrollTrigger: {
          trigger: selector,
          start: "top 85%",
        },
      });
    });
    return () => ctx.revert();
  }, [selector, stagger]);
}

export function useCounterAnimation(ref: React.RefObject<HTMLElement | null>, end: number) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: end,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].val).toString();
          },
        });
      },
      once: true,
    });
  }, [ref, end]);
}

/* ── Wrapper components that apply animations ── */

export function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function StaggerChildren({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current!.children, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
