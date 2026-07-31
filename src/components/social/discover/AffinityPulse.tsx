import { motion, useReducedMotion } from "motion/react";

export function AffinityPulse({ label, tone }: { label: string; tone: string }) {
  const reduced = useReducedMotion();
  const nodes = [0, 1, 2];

  return (
    <div
      className="inline-flex items-center gap-2.5 rounded-full border py-1.5 pl-2.5 pr-3.5"
      style={{
        borderColor: `color-mix(in oklab, ${tone} 45%, transparent)`,
        background: "rgba(6,3,18,0.55)",
        backdropFilter: "blur(8px)",
        boxShadow: `0 0 22px -12px ${tone}`,
      }}
    >
      <svg viewBox="0 0 40 12" className="h-3 w-10 shrink-0" aria-hidden="true">
        <line x1="6" y1="6" x2="34" y2="6" stroke={tone} strokeOpacity="0.35" strokeWidth="1" />
        {!reduced && (
          <motion.circle
            r="1.6"
            fill="white"
            cy="6"
            animate={{ cx: [6, 34] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: `drop-shadow(0 0 3px ${tone})` }}
          />
        )}
        {nodes.map((i) => (
          <motion.circle
            key={i}
            cx={6 + i * 14}
            cy="6"
            r="2.4"
            fill={tone}
            animate={reduced ? undefined : { opacity: [0.5, 1, 0.5], r: [2.1, 2.9, 2.1] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.45, ease: "easeInOut" }}
            style={{ filter: `drop-shadow(0 0 4px ${tone})` }}
          />
        ))}
      </svg>
      <span
        className="font-ui text-[0.62rem] font-medium uppercase tracking-[0.08em]"
        style={{ color: "rgba(255,255,255,0.88)" }}
      >
        {label}
      </span>
    </div>
  );
}
