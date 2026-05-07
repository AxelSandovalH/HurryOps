import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <ForWhom />
      <FinalCTA />
      <Footer />
    </main>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────────── */

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Image src="/logo.png" alt="HurryOps" width={120} height={40} className="object-contain" />
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-navy">
          <a href="#como-funciona" className="hover:text-accent transition-colors">Cómo funciona</a>
          <a href="#caracteristicas" className="hover:text-accent transition-colors">Características</a>
          <a href="#para-quien" className="hover:text-accent transition-colors">Para quién</a>
        </nav>
        <a
          href="#contacto"
          className="bg-accent hover:bg-accent-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          Solicitar acceso
        </a>
      </div>
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block bg-surface text-accent text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
            Corredor EE.UU. → México
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6">
            Logística internacional,{" "}
            <span className="text-accent">sin el caos</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            HurryOps centraliza tu operación de paquetería en un solo portal.
            Guías automáticas, rastreo en tiempo real y control total de tus
            agencias en ambos países.
          </p>
          <div className="flex flex-wrap gap-4">
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

        <div className="bg-navy rounded-2xl p-6 shadow-2xl">
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
    { label: "Recibido en origen", location: "Los Ángeles, CA", done: true },
    { label: "En tránsito", location: "Nogales, AZ → Sonora", done: true },
    { label: "En ruta de entrega", location: "Guadalajara, Jal", done: true },
    { label: "Entregado", location: "Pendiente", done: false },
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            ¿Te suena familiar?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Operar envíos internacionales sin las herramientas correctas es operar
            a ciegas. Hasta que algo falla.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {pains.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <span className="text-3xl mb-4 block">{p.icon}</span>
              <h3 className="font-bold text-navy text-lg mb-2">{p.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Cómo funciona
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tres pasos. Un sistema. Visibilidad total del paquete de puerta a puerta.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mx-auto mb-6">
                <span className="text-accent font-bold text-lg font-mono">{step.number}</span>
              </div>
              <h3 className="font-bold text-navy text-xl mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-navy text-white px-6 py-3 rounded-full text-sm font-mono">
            <span className="text-gray-400">EE.UU.</span>
            <span className="text-accent">→ HURRY-20260507-XXXXX →</span>
            <span className="text-gray-400">México</span>
          </div>
        </div>
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
    <section id="caracteristicas" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Todo lo que necesitas, nada que no
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Diseñado específicamente para el corredor EE.UU.–México. Sin
            funciones genéricas, sin complejidad innecesaria.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Hecho para todos en el flujo
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Cada actor del proceso tiene su propio espacio en HurryOps.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
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
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ──────────────────────────────────────────────────────────── */

function FinalCTA() {
  return (
    <section id="contacto" className="py-24 px-6 bg-navy">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Deja el caos en el pasado
        </h2>
        <p className="text-gray-300 text-lg mb-10 leading-relaxed">
          Únete a HurryOps y dale a tu operación la visibilidad que merece.
          De EE.UU. a México, cada paquete rastreado, cada agencia coordinada.
        </p>
        <a
          href="mailto:contacto@hurryops.com"
          className="inline-block bg-accent hover:bg-accent-dark text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors"
        >
          Solicitar acceso →
        </a>
        <p className="text-gray-500 text-sm mt-6">
          Sin compromisos. Te contactamos en menos de 24 horas.
        </p>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="py-8 px-6 bg-navy border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Image
          src="/logo.png"
          alt="HurryOps"
          width={100}
          height={32}
          className="object-contain brightness-0 invert opacity-80"
        />
        <p className="text-gray-500 text-sm text-center">
          © 2026 HurryOps · Logística EE.UU.–México
        </p>
        <p className="text-gray-600 text-xs">Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
