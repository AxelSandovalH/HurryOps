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
  const wa = Math.sin((1-t)*θ)/s, wb = Math.sin(t*θ)/s;
  return [wa*a[0]+wb*b[0], wa*a[1]+wb*b[1], wa*a[2]+wb*b[2]];
}

const LA  = latLonToVec(34.05, -118.24);
const GDL = latLonToVec(20.67, -103.35);
const STEPS = 64;

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    let rotY = 1.85;
    let pkgT = 0.15;

    const draw = (time: number) => {
      const W = canvas.width, H = canvas.height;
      const R = Math.min(W, H) * 0.4;
      const cx = W / 2, cy = H / 2;

      ctx.clearRect(0, 0, W, H);

      // Ambient glow
      const grd = ctx.createRadialGradient(cx, cy, R * 0.3, cx, cy, R * 1.5);
      grd.addColorStop(0, "rgba(0,150,255,0.07)");
      grd.addColorStop(1, "rgba(0,150,255,0)");
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = grd; ctx.fill();

      // Globe fill
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      const sphereGrd = ctx.createRadialGradient(cx - R*0.2, cy - R*0.2, 0, cx, cy, R);
      sphereGrd.addColorStop(0, "rgba(15,30,60,1)");
      sphereGrd.addColorStop(1, "rgba(5,12,28,1)");
      ctx.fillStyle = sphereGrd; ctx.fill();

      // Clip to sphere
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R - 0.5, 0, Math.PI * 2); ctx.clip();

      // Parallels
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath(); let first = true;
        for (let lon = -180; lon <= 180; lon += 2) {
          const v = rotateY(latLonToVec(lat, lon), rotY);
          if (v[2] < 0) { first = true; continue; }
          const { px, py } = project(v, R, cx, cy);
          first ? ctx.moveTo(px, py) : ctx.lineTo(px, py); first = false;
        }
        ctx.strokeStyle = lat === 0 ? "rgba(0,150,255,0.15)" : "rgba(255,255,255,0.05)";
        ctx.lineWidth = 0.5; ctx.stroke();
      }

      // Meridians
      for (let lon = -180; lon < 180; lon += 20) {
        ctx.beginPath(); let first = true;
        for (let lat = -85; lat <= 85; lat += 2) {
          const v = rotateY(latLonToVec(lat, lon), rotY);
          if (v[2] < 0) { first = true; continue; }
          const { px, py } = project(v, R, cx, cy);
          first ? ctx.moveTo(px, py) : ctx.lineTo(px, py); first = false;
        }
        ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.lineWidth = 0.5; ctx.stroke();
      }

      // Arc
      const arcPts = Array.from({ length: STEPS + 1 }, (_, i) => {
        const v = rotateY(slerp(LA, GDL, i / STEPS), rotY);
        return { ...project(v, R, cx, cy) };
      });
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1.5; ctx.strokeStyle = "rgba(0,150,255,0.7)";
      ctx.beginPath(); let started = false;
      for (const p of arcPts) {
        if (p.z < 0) { started = false; continue; }
        started ? ctx.lineTo(p.px, p.py) : ctx.moveTo(p.px, p.py); started = true;
      }
      ctx.stroke(); ctx.setLineDash([]);
      ctx.restore();

      // Globe border with glow
      ctx.shadowBlur = 12; ctx.shadowColor = "rgba(0,150,255,0.4)";
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,150,255,0.35)"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.shadowBlur = 0;

      // City dots
      const drawCity = (vec: [number,number,number], label: string, sublabel: string) => {
        const v = rotateY(vec, rotY);
        if (v[2] < 0) return;
        const { px, py } = project(v, R, cx, cy);
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.0025 + (label === "LA" ? 0 : Math.PI));

        // Rings
        ctx.beginPath(); ctx.arc(px, py, 16 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,150,255,${0.08 * pulse})`; ctx.fill();
        ctx.beginPath(); ctx.arc(px, py, 9 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,150,255,${0.15 * pulse})`; ctx.fill();

        // Core
        ctx.shadowBlur = 8; ctx.shadowColor = "#0096FF";
        ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = "#0096FF"; ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#fff"; ctx.fill();

        // Labels
        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.textAlign = "center";
        ctx.fillText(label, px, py - 14);
        ctx.font = "9px monospace";
        ctx.fillStyle = "rgba(0,150,255,0.8)";
        ctx.fillText(sublabel, px, py - 4);
      };

      drawCity(LA, "LA", "EE.UU.");
      drawCity(GDL, "GDL", "México");

      // Package tracer
      const pkgIdx = Math.min(STEPS, Math.floor(pkgT * STEPS));
      const p = arcPts[pkgIdx];
      if (p && p.z >= 0) {
        for (let i = Math.max(0, pkgIdx - 10); i < pkgIdx; i++) {
          const tp = arcPts[i];
          if (!tp || tp.z < 0) continue;
          const a = ((i - (pkgIdx - 10)) / 10) * 0.5;
          ctx.beginPath(); ctx.arc(tp.px, tp.py, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,200,255,${a})`; ctx.fill();
        }
        ctx.shadowBlur = 10; ctx.shadowColor = "#0096FF";
        ctx.beginPath(); ctx.arc(p.px, p.py, 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,150,255,0.3)"; ctx.fill();
        ctx.beginPath(); ctx.arc(p.px, p.py, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#00aaff"; ctx.fill();
        ctx.beginPath(); ctx.arc(p.px, p.py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#fff"; ctx.fill();
        ctx.shadowBlur = 0;
      }

      rotY += 0.002;
      pkgT = (pkgT + 0.0035) % 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={480}
      className="w-full max-w-[320px] md:max-w-[420px] lg:max-w-[480px] mx-auto"
    />
  );
}
