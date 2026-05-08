"use client";

import { useEffect, useRef } from "react";

function toRad(d: number) { return (d * Math.PI) / 180; }

function latLonToVec(lat: number, lon: number): [number, number, number] {
  const φ = toRad(lat), λ = toRad(lon);
  return [Math.cos(φ) * Math.cos(λ), Math.sin(φ), Math.cos(φ) * Math.sin(λ)];
}

function rotateY(v: [number, number, number], a: number): [number, number, number] {
  const [x, y, z] = v;
  return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
}

function project(v: [number, number, number], R: number, cx: number, cy: number) {
  return { px: cx + R * v[0], py: cy - R * v[1], z: v[2] };
}

function slerp(a: [number,number,number], b: [number,number,number], t: number): [number,number,number] {
  const d = Math.min(1, Math.max(-1, a[0]*b[0]+a[1]*b[1]+a[2]*b[2]));
  const θ = Math.acos(d);
  if (θ < 1e-5) return [...a] as [number,number,number];
  const s = Math.sin(θ);
  return [
    (Math.sin((1-t)*θ)/s)*a[0] + (Math.sin(t*θ)/s)*b[0],
    (Math.sin((1-t)*θ)/s)*a[1] + (Math.sin(t*θ)/s)*b[1],
    (Math.sin((1-t)*θ)/s)*a[2] + (Math.sin(t*θ)/s)*b[2],
  ];
}

const LA  = latLonToVec(34.05, -118.24);
const GDL = latLonToVec(20.67, -103.35);
const STEPS = 64;

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const dpr    = window.devicePixelRatio || 1;
    const SIZE   = 480;
    canvas.width  = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width  = SIZE + "px";
    canvas.style.height = SIZE + "px";

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    let rotY = 1.85;
    let pkgT = 0.15;

    const draw = (time: number) => {
      const W = SIZE, H = SIZE;
      const R  = W * 0.38;
      const cx = W / 2, cy = H / 2;

      ctx.clearRect(0, 0, W, H);

      /* ── Ambient glow behind globe ── */
      const glow = ctx.createRadialGradient(cx, cy, R * 0.4, cx, cy, R * 1.6);
      glow.addColorStop(0, "rgba(0,150,255,0.12)");
      glow.addColorStop(1, "rgba(0,150,255,0)");
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = glow; ctx.fill();

      /* ── Globe body — clear contrast with section bg ── */
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      const body = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.25, R * 0.05, cx, cy, R);
      body.addColorStop(0, "#1a3060");
      body.addColorStop(0.6, "#0d1e3d");
      body.addColorStop(1, "#070f22");
      ctx.fillStyle = body; ctx.fill();

      /* ── Clip to sphere ── */
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R - 1, 0, Math.PI * 2); ctx.clip();

      /* Parallels */
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath(); let first = true;
        for (let lon = -180; lon <= 180; lon += 2) {
          const v = rotateY(latLonToVec(lat, lon), rotY);
          if (v[2] < 0) { first = true; continue; }
          const { px, py } = project(v, R, cx, cy);
          first ? ctx.moveTo(px, py) : ctx.lineTo(px, py); first = false;
        }
        ctx.strokeStyle = lat === 0 ? "rgba(0,150,255,0.35)" : "rgba(255,255,255,0.13)";
        ctx.lineWidth = lat === 0 ? 1 : 0.6;
        ctx.stroke();
      }

      /* Meridians */
      for (let lon = -180; lon < 180; lon += 20) {
        ctx.beginPath(); let first = true;
        for (let lat = -85; lat <= 85; lat += 2) {
          const v = rotateY(latLonToVec(lat, lon), rotY);
          if (v[2] < 0) { first = true; continue; }
          const { px, py } = project(v, R, cx, cy);
          first ? ctx.moveTo(px, py) : ctx.lineTo(px, py); first = false;
        }
        ctx.strokeStyle = "rgba(255,255,255,0.13)";
        ctx.lineWidth = 0.6; ctx.stroke();
      }

      /* Arc LA → GDL */
      const arcPts = Array.from({ length: STEPS + 1 }, (_, i) => {
        const v = rotateY(slerp(LA, GDL, i / STEPS), rotY);
        return { ...project(v, R, cx, cy) };
      });

      ctx.setLineDash([6, 5]);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(0,180,255,0.9)";
      ctx.shadowBlur = 6; ctx.shadowColor = "#0096FF";
      ctx.beginPath(); let arcStarted = false;
      for (const p of arcPts) {
        if (p.z < 0) { arcStarted = false; continue; }
        arcStarted ? ctx.lineTo(p.px, p.py) : ctx.moveTo(p.px, p.py);
        arcStarted = true;
      }
      ctx.stroke();
      ctx.setLineDash([]); ctx.shadowBlur = 0;

      ctx.restore();

      /* ── Globe border + rim light ── */
      ctx.shadowBlur = 18; ctx.shadowColor = "rgba(0,150,255,0.5)";
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,150,255,0.55)"; ctx.lineWidth = 1.8; ctx.stroke();
      ctx.shadowBlur = 0;

      /* Inner rim highlight (top-left) */
      ctx.beginPath();
      ctx.arc(cx, cy, R - 1, Math.PI * 1.1, Math.PI * 1.7);
      ctx.strokeStyle = "rgba(255,255,255,0.12)"; ctx.lineWidth = 3; ctx.stroke();

      /* ── City dots ── */
      const drawCity = (vec: [number,number,number], label: string, sub: string) => {
        const v = rotateY(vec, rotY);
        if (v[2] < 0.05) return;
        const { px, py } = project(v, R, cx, cy);
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.0025 + (label === "LA" ? 0 : Math.PI));

        /* Pulse rings */
        ctx.beginPath(); ctx.arc(px, py, 18 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,150,255,${0.07 * pulse})`; ctx.fill();
        ctx.beginPath(); ctx.arc(px, py, 11 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,150,255,${0.14 * pulse})`; ctx.fill();

        /* Core dot */
        ctx.shadowBlur = 10; ctx.shadowColor = "#0096FF";
        ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#0096FF"; ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#fff"; ctx.fill();

        /* Label */
        ctx.font = "bold 12px monospace";
        ctx.fillStyle = "#fff"; ctx.textAlign = "center";
        ctx.fillText(label, px, py - 14);
        ctx.font = "10px monospace";
        ctx.fillStyle = "rgba(0,180,255,0.85)";
        ctx.fillText(sub, px, py + 18);
      };

      drawCity(LA,  "LA",  "EE.UU.");
      drawCity(GDL, "GDL", "México");

      /* ── Package tracer ── */
      const pkgIdx = Math.min(STEPS, Math.floor(pkgT * STEPS));
      const p = arcPts[pkgIdx];
      if (p && p.z >= 0) {
        /* Trail */
        for (let i = Math.max(0, pkgIdx - 10); i < pkgIdx; i++) {
          const tp = arcPts[i];
          if (!tp || tp.z < 0) continue;
          const a = ((i - (pkgIdx - 10)) / 10) * 0.55;
          ctx.beginPath(); ctx.arc(tp.px, tp.py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,210,255,${a})`; ctx.fill();
        }
        /* Head */
        ctx.shadowBlur = 14; ctx.shadowColor = "#00aaff";
        ctx.beginPath(); ctx.arc(p.px, p.py, 7, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,150,255,0.35)"; ctx.fill();
        ctx.beginPath(); ctx.arc(p.px, p.py, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = "#00ccff"; ctx.fill();
        ctx.beginPath(); ctx.arc(p.px, p.py, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#fff"; ctx.fill();
        ctx.shadowBlur = 0;
      }

      rotY += 0.002;
      pkgT = (pkgT + 0.004) % 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[480px] mx-auto block"
    />
  );
}
