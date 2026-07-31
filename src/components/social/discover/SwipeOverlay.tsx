import { motion, type MotionValue, useTransform } from "motion/react";

export function SwipeOverlay({ x }: { x: MotionValue<number> }) {
  const likeOpacity = useTransform(x, [25, 120], [0, 1]);
  const passOpacity = useTransform(x, [-120, -25], [1, 0]);

  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[1.85rem]"
        style={{
          opacity: likeOpacity,
          background:
            "linear-gradient(270deg, color-mix(in oklab, var(--epic-violet) 50%, transparent), transparent 62%)",
          boxShadow: "inset 0 0 0 2px color-mix(in oklab, var(--epic-violet-bright) 70%, transparent)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[1.85rem]"
        style={{
          opacity: passOpacity,
          background:
            "linear-gradient(90deg, color-mix(in oklab, oklch(0.45 0.03 265) 65%, transparent), transparent 62%)",
          boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.22)",
        }}
      />
      <motion.span
        className="pointer-events-none absolute right-5 top-16 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-display text-[0.66rem] uppercase tracking-[0.22em] text-white"
        style={{
          opacity: likeOpacity,
          borderColor: "var(--epic-violet-bright)",
          background: "color-mix(in oklab, var(--epic-violet) 35%, rgba(0,0,0,0.4))",
          boxShadow: "0 0 24px -6px var(--epic-violet-bright)",
        }}
      >
        Interesante
      </motion.span>
      <motion.span
        className="pointer-events-none absolute left-5 top-16 rounded-full border border-white/30 bg-black/40 px-3.5 py-2 font-display text-[0.66rem] uppercase tracking-[0.22em] text-white/85"
        style={{ opacity: passOpacity }}
      >
        Paso
      </motion.span>
    </>
  );
}
