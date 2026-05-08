"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TRIGGER_DEFAULTS = {
  start: "top 88%",
  once: true,
  invalidateOnRefresh: true,
} as const;

/* Fix ScrollTrigger refresh after hydration */
function useSTRefresh() {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(id);
  }, []);
}

/* ── Fade up (headings, subtitles) ── */
export function FadeInSection({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useSTRefresh();
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0, y: 40, duration: 0.8, delay, ease: "power2.out",
        scrollTrigger: { trigger: ref.current, ...TRIGGER_DEFAULTS },
      });
    });
    return () => ctx.revert();
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

/* ── Slide from left ── */
export function SlideInLeft({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useSTRefresh();
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0, x: -60, duration: 0.9, delay, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, ...TRIGGER_DEFAULTS },
      });
    });
    return () => ctx.revert();
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

/* ── Slide from right ── */
export function SlideInRight({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useSTRefresh();
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0, x: 60, duration: 0.9, delay, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, ...TRIGGER_DEFAULTS },
      });
    });
    return () => ctx.revert();
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

/* ── Scale in (cards) ── */
export function ScaleIn({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useSTRefresh();
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0, scale: 0.88, y: 20, duration: 0.7, delay, ease: "back.out(1.3)",
        scrollTrigger: { trigger: ref.current, ...TRIGGER_DEFAULTS },
      });
    });
    return () => ctx.revert();
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

/* ── Stagger children ── */
export function StaggerChildren({ children, className = "", from = "bottom" }: {
  children: React.ReactNode; className?: string; from?: "bottom" | "scale";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useSTRefresh();
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const fromVars = from === "scale"
        ? { opacity: 0, scale: 0.85, y: 15 }
        : { opacity: 0, y: 45 };
      gsap.from(ref.current!.children, {
        ...fromVars,
        duration: 0.65,
        ease: from === "scale" ? "back.out(1.4)" : "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, ...TRIGGER_DEFAULTS },
      });
    });
    return () => ctx.revert();
  }, [from]);
  return <div ref={ref} className={className}>{children}</div>;
}

/* ── Number counter ── */
export function CountUp({ end, suffix = "", className = "" }: {
  end: number; suffix?: string; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useSTRefresh();
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    el.textContent = "0" + suffix;
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end, duration: 1.8, ease: "power2.out",
          onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
        });
      },
    });
  }, [end, suffix]);
  return <span ref={ref} className={className}>0{suffix}</span>;
}
