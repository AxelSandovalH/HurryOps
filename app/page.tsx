import Image from "next/image";
import dynamic from "next/dynamic";
import HeroClient from "./components/HeroClient";
import { FadeInSection, SlideInLeft, SlideInRight, StaggerChildren, CountUp } from "./components/Animations";
import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";

const Globe = dynamic(() => import("./components/Globe"), { ssr: false });

export default function Home() {
  return (
    <main className="flex flex-col">
      <IntroAnimation />
      <Navbar />
      <HeroClient />
      <Stats />
      <Problem />
      <HowItWorks />
      <FeaturesGlobe />
      <ForWhom />
      <FinalCTA />
      <Footer />
    </main>
  );
}

/* ─── Stats Bar ──────────────────────────────────────────────────────────── */

function Stats() {
  const stats = [
    { value: 100, suffix: "%", label: "Visibilidad del envío" },
    { value: 3,   suffix: " roles", label: "Diferenciados por función" },
    { value: 0,   suffix: " hojas", label: "De cálculo necesarias" },
    { value: 24,  suffix: "h", label: "Soporte de onboarding" },
  ];
  return (
    <section className="py-10 px-6 bg-navy border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-6" from="scale">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-accent tabular-nums">
                <CountUp end={s.value} suffix={s.suffix} />
              </p>
              <p className="text-gray-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ─── Problem ────────────────────────────────────────────────────────────── */

function Problem() {
  const pains = [
    {
      icon: "💬",
      title: "Cadenas de WhatsApp sin fin",
      desc: "Coordinación por mensajes entre agencias, choferes y clientes. Sin historial, sin orden, sin certeza.",
    },
    {
      icon: "📊",
      title: "Hojas de cálculo desincronizadas",
      desc: "Cada agencia lleva su propio Excel. Nadie tiene la misma versión y los errores cuestan envíos perdidos.",
    },
    {
      icon: "❓",
      title: "El cliente no sabe dónde está su paquete",
      desc: "La pregunta más frecuente: '¿ya llegó?' Sin sistema, cada respuesta es manual y consume tiempo.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-navy">
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="text-center mb-16">
          <span className="inline-block text-accent text-xs font-semibold uppercase tracking-widest mb-4">El problema</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Te suena familiar?</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Operar sin las herramientas correctas es operar a ciegas. Hasta que algo falla.
          </p>
        </FadeInSection>
        <StaggerChildren className="grid md:grid-cols-3 gap-6" from="scale">
          {pains.map((p, i) => (
            <div key={i} className="rounded-2xl border border-white/8 bg-white/4 p-7 hover:border-accent/30 hover:bg-white/6 transition-all">
              <span className="text-3xl mb-5 block">{p.icon}</span>
              <h3 className="font-bold text-white text-base mb-2">{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────────────────────── */

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Captura en EE.UU.",
      desc: "La agencia registra el paquete. HurryOps genera automáticamente la guía HURRY-XXXXX con todos los datos del envío.",
      side: "left" as const,
    },
    {
      number: "02",
      title: "Tránsito rastreable",
      desc: "Cada punto del recorrido actualiza el estado. Operador y agencias ven el flujo completo en tiempo real.",
      side: "right" as const,
    },
    {
      number: "03",
      title: "Entrega en México",
      desc: "El chofer confirma la entrega. El destinatario rastrea su paquete con solo el número de guía, sin cuenta.",
      side: "left" as const,
    },
  ];

  return (
    <section id="como-funciona" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <FadeInSection className="text-center mb-20">
          <span className="inline-block text-accent text-xs font-semibold uppercase tracking-widest mb-4">El flujo</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Tres pasos, visibilidad total</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            De puerta a puerta, sin perder el rastro.
          </p>
        </FadeInSection>

        <div className="relative flex flex-col gap-16">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2" />

          {steps.map((step, i) => {
            const Wrapper = step.side === "left" ? SlideInLeft : SlideInRight;
            const isLeft = step.side === "left";
            return (
              <div key={i} className={`relative flex items-center gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Content */}
                <Wrapper className="flex-1">
                  <div className={`bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow ${isLeft ? "md:text-right" : "md:text-left"}`}>
                    <span className="text-accent font-mono text-sm font-bold">{step.number}</span>
                    <h3 className="font-bold text-navy text-xl mt-1 mb-3">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </Wrapper>

                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-navy items-center justify-center z-10 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                </div>

                {/* Empty side */}
                <div className="hidden md:block flex-1" />
              </div>
            );
          })}
        </div>

        <FadeInSection className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-3 bg-navy text-white px-6 py-3 rounded-full text-sm font-mono">
            <span className="text-gray-400">EE.UU.</span>
            <span className="text-accent animate-pulse">→ HURRY-XXXXX →</span>
            <span className="text-gray-400">México</span>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ─── Features + Globe ───────────────────────────────────────────────────── */

function FeaturesGlobe() {
  const features = [
    { icon: "🏷️", title: "Guías automáticas",       desc: "Número único al capturar. Sin duplicados." },
    { icon: "📍", title: "Rastreo en tiempo real",   desc: "Recibido → Tránsito → En ruta → Entregado." },
    { icon: "🏢", title: "Portal multi-agencia",     desc: "Datos aislados por agencia, visión global para el operador." },
    { icon: "🔍", title: "Rastreo público sin login", desc: "El destinatario consulta con solo el número de guía." },
    { icon: "👥", title: "Roles diferenciados",      desc: "Admin, Agencia y Chofer. Cada uno ve lo que necesita." },
    { icon: "🔒", title: "Auth con Google OAuth",    desc: "Acceso rápido y seguro vía Supabase. Sin contraseñas." },
  ];

  return (
    <section id="caracteristicas" className="py-24 px-6 bg-[#060e1f]">
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="text-center mb-16">
          <span className="inline-block text-accent text-xs font-semibold uppercase tracking-widest mb-4">Características</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            El corredor EE.UU.–México,<br className="hidden md:block" /> digitalizado
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Diseñado para los que mueven paquetes entre dos países, no para los que gestionan almacenes.
          </p>
        </FadeInSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Globe */}
          <SlideInLeft>
            <div className="relative">
              <Globe />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/8 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 font-mono whitespace-nowrap">
                rastreo en tiempo real
              </div>
            </div>
          </SlideInLeft>

          {/* Feature list */}
          <SlideInRight>
            <ul className="flex flex-col gap-5">
              {features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl border border-white/6 bg-white/3 hover:border-accent/30 hover:bg-white/6 transition-all group"
                >
                  <span className="text-xl mt-0.5 flex-shrink-0">{f.icon}</span>
                  <div>
                    <p className="font-semibold text-white text-sm group-hover:text-accent transition-colors">{f.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </SlideInRight>
        </div>
      </div>
    </section>
  );
}

/* ─── For Whom ───────────────────────────────────────────────────────────── */

function ForWhom() {
  const roles = [
    {
      role: "Operador logístico",
      icon: "🗺️",
      color: "from-navy to-blue-900",
      desc: "Múltiples agencias en dos países. Necesitas visibilidad total sin depender de reportes manuales.",
      benefits: ["Dashboard centralizado de todas las agencias", "Historial completo de cada envío", "Control de accesos por agencia"],
    },
    {
      role: "Agencia asociada",
      icon: "🏪",
      color: "from-slate-800 to-navy",
      desc: "Recibes y despachas paquetes. Quieres un sistema ágil que no complique tu operación diaria.",
      benefits: ["Captura rápida de envíos", "Actualización de estados desde el portal", "Datos aislados de otras agencias"],
    },
    {
      role: "Destinatario final",
      icon: "📦",
      color: "from-blue-950 to-navy",
      desc: "Esperas un paquete desde EE.UU. Solo quieres saber dónde está, sin crear cuenta.",
      benefits: ["Rastreo con solo el número de guía", "Sin apps ni registro", "Historial visible en todo momento"],
    },
  ];

  return (
    <section id="para-quien" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="text-center mb-16">
          <span className="inline-block text-accent text-xs font-semibold uppercase tracking-widest mb-4">Para quién</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Hecho para todos en el flujo</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Cada actor tiene su propio espacio. Nadie ve más de lo que necesita.
          </p>
        </FadeInSection>
        <StaggerChildren className="grid md:grid-cols-3 gap-6">
          {roles.map((r, i) => (
            <div key={i} className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-accent/30 hover:shadow-xl transition-all duration-300">
              <div className={`bg-gradient-to-br ${r.color} p-8`}>
                <span className="text-4xl block mb-3">{r.icon}</span>
                <h3 className="font-bold text-white text-xl">{r.role}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{r.desc}</p>
                <ul className="space-y-2.5">
                  {r.benefits.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-accent font-bold mt-0.5 flex-shrink-0">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ─── Final CTA ──────────────────────────────────────────────────────────── */

function FinalCTA() {
  return (
    <section id="contacto" className="py-24 px-6 bg-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </div>
      <div className="max-w-2xl mx-auto relative z-10">
        <FadeInSection className="text-center mb-10">
          <span className="inline-block text-accent text-xs font-semibold uppercase tracking-widest mb-4">Empieza hoy</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Deja el caos en el pasado
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Cuéntanos sobre tu operación y te mostramos cómo HurryOps la transforma.
          </p>
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <ContactForm />
        </FadeInSection>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="py-8 px-6 bg-[#040a17] border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-white font-bold text-lg tracking-tight">HurryOps</span>
        <p className="text-gray-600 text-sm text-center">
          © 2026 HurryOps · Logística EE.UU.–México
        </p>
        <p className="text-gray-700 text-xs">Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
