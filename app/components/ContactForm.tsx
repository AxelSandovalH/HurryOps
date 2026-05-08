"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";

type Status = "idle" | "loading" | "success" | "error";

interface Field {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  optional?: boolean;
}

const FIELDS: Field[][] = [
  [
    { name: "name",    label: "Nombre",   required: true,  placeholder: "Tu nombre completo" },
    { name: "company", label: "Empresa",  required: true,  placeholder: "Nombre de tu operación" },
  ],
  [
    { name: "email",   label: "Email",    type: "email",   required: true,  placeholder: "tu@email.com" },
    { name: "phone",   label: "Teléfono", type: "tel",     optional: true,  placeholder: "+52 55 ···· ····" },
  ],
];

export default function ContactForm() {
  const [status, setStatus]     = useState<Status>("idle");
  const [charCount, setCharCount] = useState(0);
  const formRef   = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    try {
      const res = await fetch("https://formspree.io/f/xdablwab", {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
      } else {
        throw new Error();
      }
    } catch {
      setStatus("error");
      // Shake
      if (formRef.current) {
        gsap.fromTo(formRef.current,
          { x: -8 }, { x: 0, duration: 0.4, ease: "elastic.out(4, 0.3)" }
        );
      }
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-white text-xl font-bold mb-2">¡Mensaje recibido!</h3>
        <p className="text-gray-400 text-sm">Te contactamos en menos de 24 horas.</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col gap-5"
    >
      {FIELDS.map((row, ri) => (
        <div key={ri} className="grid sm:grid-cols-2 gap-4">
          {row.map((f) => (
            <FormField key={f.name} field={f} />
          ))}
        </div>
      ))}

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">Mensaje</label>
          <span className={`text-xs tabular-nums ${charCount > 450 ? "text-red-400" : "text-gray-600"}`}>
            {charCount}/500
          </span>
        </div>
        <textarea
          name="message"
          required
          rows={4}
          maxLength={500}
          placeholder="Cuéntanos sobre tu operación: ¿cuántas agencias, volumen de paquetes, ciudades que cubres?"
          onChange={(e) => setCharCount(e.target.value.length)}
          className="bg-white/5 border border-white/15 hover:border-white/25 focus:border-accent rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="group relative overflow-hidden bg-accent hover:bg-accent-dark disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-colors text-base flex items-center justify-center gap-3"
      >
        {status === "loading" ? (
          <>
            <Spinner />
            Enviando...
          </>
        ) : (
          <>
            Solicitar acceso
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </button>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center flex items-center justify-center gap-2">
          <span>⚠</span> Algo salió mal. Intenta de nuevo.
        </p>
      )}

      <p className="text-gray-600 text-xs text-center">
        Sin spam. Te contactamos directamente en menos de 24 h.
      </p>
    </form>
  );
}

function FormField({ field }: { field: Field }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-400 text-xs font-medium uppercase tracking-wider flex gap-1.5">
        {field.label}
        {field.optional && <span className="text-gray-600 normal-case tracking-normal">(opcional)</span>}
      </label>
      <input
        name={field.name}
        type={field.type ?? "text"}
        required={field.required}
        placeholder={field.placeholder}
        className="bg-white/5 border border-white/15 hover:border-white/25 focus:border-accent rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none transition-colors"
      />
    </div>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}
