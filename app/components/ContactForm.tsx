"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xdablwab", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white/10 rounded-2xl p-10 text-center">
        <span className="text-5xl mb-4 block">✅</span>
        <h3 className="text-white text-xl font-bold mb-2">¡Mensaje recibido!</h3>
        <p className="text-gray-300 text-sm">Te contactamos en menos de 24 horas.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 rounded-2xl p-8 flex flex-col gap-4 text-left">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-300 text-xs font-medium uppercase tracking-wide">Nombre</label>
          <input
            name="name"
            required
            placeholder="Tu nombre"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-300 text-xs font-medium uppercase tracking-wide">Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="tu@email.com"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-gray-300 text-xs font-medium uppercase tracking-wide">Mensaje</label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Cuéntanos sobre tu operación..."
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-accent hover:bg-accent-dark disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors text-base"
      >
        {status === "loading" ? "Enviando..." : "Solicitar acceso →"}
      </button>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center">
          Algo salió mal. Intenta de nuevo.
        </p>
      )}
    </form>
  );
}
