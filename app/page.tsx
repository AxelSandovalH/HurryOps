import Image from "next/image";
import HeroClient from "./components/HeroClient";
import { StaggerChildren, FadeInSection } from "./components/Animations";
import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <main className="flex flex-col">
      <IntroAnimation />
      <Navbar />
      <HeroClient />
      <Problem />
      <HowItWorks />
      <Features />
      <ForWhom />
      <FinalCTA />
      <Footer />
    </main>
  );
}

/* ─── Problem ────────────────────────────────────────────────────────────── */

function Problem() {
  const pains = [
    {
      icon: "💬",
      title: "Cadenas interminables de WhatsApp",
      desc: "Coordinación por mensajes entre agencias, choferes y clientes. Sin historial, sin orden, sin certeza.",
    },
    {
      icon: "📊",
      title: "Hojas de cálculo desactualizadas",
      desc: "Cada agencia lleva su propio Excel. Nadie tiene la misma versión. Los errores cuestan envíos perdidos.",
    },
    {
      icon: "❓",
      title: "El cliente no sabe dónde está su paquete",
      desc: "La pregunta más frecuente: '¿ya llegó mi paquete?' Sin sistema, cada respuesta es manual.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">¿Te suena familiar?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Operar envíos internacionales sin las herramientas correctas es operar a ciegas. Hasta que algo falla.
          </p>
        </FadeInSection>
        <StaggerChildren className="grid md:grid-cols-3 gap-8">
          {pains.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <span className="text-3xl mb-4 block">{p.icon}</span>
              <h3 className="font-bold text-navy text-lg mb-2">{p.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
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
      desc: "La agencia origen registra el paquete. HurryOps genera automáticamente la guía HURRY-XXXXX con todos los datos del envío.",
    },
    {
      number: "02",
      title: "Tránsito rastreable",
      desc: "Cada punto del recorrido actualiza el estado. El operador y las agencias ven el flujo completo en tiempo real desde el portal.",
    },
    {
      number: "03",
      title: "Entrega en México",
      desc: "El chofer confirma la entrega. El destinatario puede rastrear su paquete en cualquier momento con solo el número de guía.",
    },
  ];

  return (
    <section id="como-funciona" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Cómo funciona</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tres pasos. Un sistema. Visibilidad total del paquete de puerta a puerta.
          </p>
        </FadeInSection>
        <StaggerChildren className="grid md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mx-auto mb-6">
                <span className="text-accent font-bold text-lg font-mono">{step.number}</span>
              </div>
              <h3 className="font-bold text-navy text-xl mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </StaggerChildren>
        <FadeInSection className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-navy text-white px-6 py-3 rounded-full text-sm font-mono">
            <span className="text-gray-400">EE.UU.</span>
            <span className="text-accent">→ HURRY-20260507-XXXXX →</span>
            <span className="text-gray-400">México</span>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ─── Features ───────────────────────────────────────────────────────────── */

function Features() {
  const features = [
    {
      icon: "🏷️",
      title: "Guías automáticas",
      desc: "Número de guía único generado al capturar el envío. Sin duplicados, sin errores manuales.",
    },
    {
      icon: "📍",
      title: "Rastreo en tiempo real",
      desc: "Historial completo de estados: Recibido → En tránsito → En ruta → Entregado.",
    },
    {
      icon: "🏢",
      title: "Portal multi-agencia",
      desc: "Cada agencia opera en su propio espacio. Datos aislados, visibilidad compartida para el operador.",
    },
    {
      icon: "🔍",
      title: "Rastreo público sin login",
      desc: "El destinatario final consulta su paquete con solo el número de guía. Sin crear cuenta.",
    },
    {
      icon: "👥",
      title: "Roles diferenciados",
      desc: "Administrador, Agencia y Chofer. Cada rol ve y hace exactamente lo que necesita.",
    },
    {
      icon: "🔒",
      title: "Autenticación segura",
      desc: "Login con Google OAuth vía Supabase. Acceso rápido, seguro y sin contraseñas que gestionar.",
    },
  ];

  return (
    <section id="caracteristicas" className="py-14 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Todo lo que necesitas, nada que no
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Diseñado específicamente para el corredor EE.UU.–México. Sin funciones genéricas, sin complejidad innecesaria.
          </p>
        </FadeInSection>
        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:border-accent/40 hover:shadow-md transition-all"
            >
              <span className="text-2xl mb-3 block">{f.icon}</span>
              <h3 className="font-bold text-navy text-base mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </StaggerChildren>
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
      desc: "Tienes múltiples agencias en EE.UU. y México. Necesitas visibilidad completa de todos los envíos sin depender de reportes manuales.",
      benefits: [
        "Dashboard centralizado de todas las agencias",
        "Historial completo de cada envío",
        "Control de accesos por agencia",
      ],
    },
    {
      role: "Agencia asociada",
      icon: "🏪",
      desc: "Recibes y despachas paquetes a nombre del operador. Quieres un sistema ágil que no te complique la operación diaria.",
      benefits: [
        "Captura rápida de envíos",
        "Actualización de estados desde el portal",
        "Tu información, separada de otras agencias",
      ],
    },
    {
      role: "Destinatario final",
      icon: "📦",
      desc: "Esperas un paquete desde EE.UU. Solo quieres saber dónde está y cuándo llega, sin trámites.",
      benefits: [
        "Rastreo con solo el número de guía",
        "Sin crear cuenta ni instalar apps",
        "Historial de estados visible en todo momento",
      ],
    },
  ];

  return (
    <section id="para-quien" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Hecho para todos en el flujo</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Cada actor del proceso tiene su propio espacio en HurryOps.
          </p>
        </FadeInSection>
        <StaggerChildren className="grid md:grid-cols-3 gap-8">
          {roles.map((r, i) => (
            <div
              key={i}
              className="rounded-2xl border-2 border-gray-100 hover:border-accent/50 p-8 transition-colors"
            >
              <span className="text-4xl mb-4 block">{r.icon}</span>
              <h3 className="font-bold text-navy text-xl mb-3">{r.role}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{r.desc}</p>
              <ul className="space-y-2">
                {r.benefits.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-accent mt-0.5 font-bold">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
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
    <section id="contacto" className="py-24 px-6 bg-navy">
      <div className="max-w-2xl mx-auto">
        <FadeInSection className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Deja el caos en el pasado
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Déjanos tus datos y te contactamos en menos de 24 horas.
          </p>
        </FadeInSection>
        <FadeInSection>
          <ContactForm />
        </FadeInSection>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="py-8 px-6 bg-navy border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-white font-bold text-xl tracking-tight">HurryOps</span>
        <p className="text-gray-500 text-sm text-center">
          © 2026 HurryOps · Logística EE.UU.–México
        </p>
        <p className="text-gray-600 text-xs">Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
