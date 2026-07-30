import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  baseY: number;
  amp: number;
  speed: number;
  phase: number;
  size: number;
  ridge: number;
};

const DOT_COUNT = 160;

function readCssColor(el: HTMLElement, name: string, fallback: string): string {
  const value = getComputedStyle(el).getPropertyValue(name).trim();
  return value || fallback;
}

function lerpColor(t: number, blue: string, green: string): string {
  // Prefer CSS color-mix when available; canvas accepts the result string.
  if (typeof CSS !== "undefined" && "supports" in CSS && CSS.supports("color", "color-mix(in oklab, red, blue)")) {
    const pct = Math.round(Math.min(1, Math.max(0, t)) * 100);
    return `color-mix(in oklab, ${blue} ${100 - pct}%, ${green})`;
  }
  return t < 0.5 ? blue : green;
}

function spawnParticles(width: number, height: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < DOT_COUNT; i++) {
    const ridge = i % 2;
    const x = Math.random() * width;
    const ridgeOffset = ridge === 0 ? height * 0.28 : height * 0.55;
    particles.push({
      x,
      baseY: ridgeOffset + (Math.random() - 0.5) * height * 0.12,
      amp: 8 + Math.random() * 14,
      speed: 0.35 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
      size: 1.1 + Math.random() * 1.8,
      ridge,
    });
  }
  return particles;
}

type GaParticleWaveProps = {
  className?: string;
};

export function GaParticleWave({ className }: GaParticleWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf = 0;
    let running = true;
    let blue = "oklch(0.72 0.16 230)";
    let green = "oklch(0.82 0.2 145)";

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? canvas.clientWidth;
      const h = parent?.clientHeight ?? canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = spawnParticles(w, h);
      blue = readCssColor(canvas, "--ga-blue", blue);
      green = readCssColor(canvas, "--ga-green", green);
    };

    const draw = (phase: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        const wave =
          Math.sin(p.x * 0.018 + phase * p.speed + p.phase) * p.amp +
          Math.sin(p.x * 0.008 + phase * 0.4 + p.ridge) * (p.amp * 0.45);
        const y = p.baseY + wave;
        const t = p.x / Math.max(1, w);
        ctx.beginPath();
        ctx.fillStyle = lerpColor(t, blue, green);
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.arc(p.x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    resize();

    const onResize = () => {
      resize();
      if (reduced) draw(0);
    };
    window.addEventListener("resize", onResize);

    if (reduced) {
      draw(0);
      return () => {
        running = false;
        window.removeEventListener("resize", onResize);
      };
    }

    const tick = (now: number) => {
      if (!running) return;
      draw(now / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-[40%] w-full", className)}
    />
  );
}
