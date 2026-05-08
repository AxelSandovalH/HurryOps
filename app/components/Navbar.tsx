"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#como-funciona", label: "Cómo funciona" },
    { href: "#caracteristicas", label: "Características" },
    { href: "#para-quien", label: "Para quién" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Image src="/logoTrans.png" alt="HurryOps" width={120} height={40} className="object-contain" />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-navy">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contacto"
            className="bg-accent hover:bg-accent-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            Solicitar acceso
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Menú"
          >
            <span className={`block w-6 h-0.5 bg-navy transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block w-6 h-0.5 bg-navy transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-navy transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-64 border-t border-gray-100" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4 bg-white">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-navy font-medium text-base hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
