import { motion, useReducedMotion } from "motion/react";

type Node = { x: number; y: number; r: number; c: string; d: number };

const NODES: Node[] = [
  { x: 16, y: 34, r: 2.6, c: "var(--epic-violet-bright)", d: 0 },
  { x: 37, y: 18, r: 2, c: "var(--social-blue)", d: 0.5 },
  { x: 58, y: 30, r: 3.1, c: "var(--social-pink)", d: 1.1 },
  { x: 80, y: 20, r: 2.1, c: "var(--social-blue)", d: 1.7 },
  { x: 28, y: 60, r: 2.3, c: "var(--social-blue)", d: 0.9 },
  { x: 50, y: 72, r: 2.8, c: "var(--epic-violet-bright)", d: 1.4 },
  { x: 74, y: 55, r: 2.4, c: "var(--epic-violet)", d: 2.1 },
  { x: 90, y: 74, r: 1.8, c: "var(--social-pink)", d: 2.6 },
];

const PATHS = [
  "M16 34 L37 18 L58 30 L80 20",
  "M16 34 L28 60 L50 72 L74 55 L90 74",
  "M37 18 L50 72",
  "M58 30 L74 55",
];

export function SocialPulse() {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative h-44 w-full overflow-hidden rounded-[1.6rem] border border-white/10"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01) 40%), radial-gradient(80% 90% at 30% 20%, color-mix(in oklab, var(--epic-violet-deep) 55%, transparent), transparent 70%), #060312",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 50px -30px color-mix(in oklab, var(--epic-violet) 90%, transparent)",
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={reduced ? undefined : { opacity: [0.45, 0.85, 0.45], scale: [1, 1.06, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(45% 55% at 55% 55%, color-mix(in oklab, var(--epic-violet) 42%, transparent), transparent 72%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full"
        animate={reduced ? undefined : { opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--social-blue) 45%, transparent), transparent 70%)",
          filter: "blur(6px)",
        }}
      />

      <svg
        viewBox="0 0 100 90"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pulse-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--social-blue)" stopOpacity="0.55" />
            <stop offset="55%" stopColor="var(--epic-violet-bright)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--social-pink)" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {PATHS.map((d, i) => (
          <g key={d}>
            <motion.path
              d={d}
              fill="none"
              stroke="url(#pulse-line)"
              strokeWidth={0.5}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 1.1, ease: "easeOut" }}
            />
            {!reduced && (
              <motion.path
                d={d}
                fill="none"
                stroke="white"
                strokeOpacity={0.85}
                strokeWidth={0.7}
                strokeLinecap="round"
                strokeDasharray="6 120"
                initial={{ strokeDashoffset: 126 }}
                animate={{ strokeDashoffset: [126, -6] }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 1.3,
                }}
                style={{ filter: "drop-shadow(0 0 2px var(--epic-violet-bright))" }}
              />
            )}
          </g>
        ))}

        {NODES.map((n) => (
          <g key={`${n.x}-${n.y}`}>
            {!reduced && (
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={n.c}
                fillOpacity={0.2}
                animate={{ r: [n.r, n.r * 3, n.r], fillOpacity: [0.22, 0, 0.22] }}
                transition={{ duration: 4, repeat: Infinity, delay: n.d, ease: "easeOut" }}
              />
            )}
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.r * 0.62}
              fill={n.c}
              initial={{ opacity: 0 }}
              animate={{ opacity: reduced ? 1 : [0.7, 1, 0.7] }}
              transition={{ duration: 3.4, repeat: reduced ? 0 : Infinity, delay: n.d * 0.4 }}
              style={{ filter: `drop-shadow(0 0 3px ${n.c})` }}
            />
          </g>
        ))}
      </svg>

      <div className="absolute inset-x-4 bottom-3 flex items-center justify-between">
        <span className="font-display text-[0.58rem] uppercase tracking-[0.26em] text-white/55">
          Pulso social · Epic Fest
        </span>
        <span className="flex items-center gap-1.5 text-[0.6rem] font-light text-white/45">
          <span
            className="inline-block size-1.5 animate-pulse rounded-full"
            style={{ background: "var(--social-blue)", boxShadow: "0 0 8px var(--social-blue)" }}
          />
          en vivo
        </span>
      </div>
    </div>
  );
}
