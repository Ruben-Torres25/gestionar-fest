import { motion } from "motion/react";

const NODES = [
  { x: 18, y: 30, r: 5, c: "var(--epic-violet-bright)" },
  { x: 48, y: 16, r: 4, c: "var(--social-blue)" },
  { x: 78, y: 34, r: 6, c: "var(--social-pink)" },
  { x: 32, y: 66, r: 4, c: "var(--social-blue)" },
  { x: 62, y: 74, r: 5, c: "var(--epic-violet-bright)" },
  { x: 88, y: 62, r: 3, c: "var(--epic-violet)" },
  { x: 8, y: 58, r: 3, c: "var(--social-pink)" },
];

const LINKS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [4, 2],
  [4, 5],
  [3, 6],
];

export function SocialPulse() {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-3xl border border-white/10 bg-black/30">
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(60% 70% at 50% 55%, color-mix(in oklab, var(--epic-violet) 45%, transparent), transparent 70%)",
        }}
      />
      <svg viewBox="0 0 100 90" className="absolute inset-0 size-full" aria-hidden="true">
        {LINKS.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="white"
            strokeOpacity={0.22}
            strokeWidth={0.4}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: "easeOut" }}
          />
        ))}
        {NODES.map((n, i) => (
          <g key={i}>
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={n.c}
              fillOpacity={0.18}
              animate={{ r: [n.r, n.r * 2.1, n.r], fillOpacity: [0.2, 0, 0.2] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.35, ease: "easeOut" }}
            />
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.r * 0.5}
              fill={n.c}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
          </g>
        ))}
      </svg>
      <span className="absolute bottom-3 left-4 text-[0.6rem] uppercase tracking-[0.24em] text-white/40">
        Pulso social · Epic Fest
      </span>
    </div>
  );
}