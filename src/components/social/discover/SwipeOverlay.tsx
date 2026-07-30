import { motion, type MotionValue, useTransform } from "motion/react";

export function SwipeOverlay({ x }: { x: MotionValue<number> }) {
  const likeOpacity = useTransform(x, [30, 130], [0, 1]);
  const passOpacity = useTransform(x, [-130, -30], [1, 0]);

  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
        style={{
          opacity: likeOpacity,
          background:
            "linear-gradient(270deg, color-mix(in oklab, var(--epic-violet) 55%, transparent), transparent 60%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
        style={{
          opacity: passOpacity,
          background:
            "linear-gradient(90deg, color-mix(in oklab, oklch(0.5 0.02 260) 60%, transparent), transparent 60%)",
        }}
      />
      <motion.span
        className="pointer-events-none absolute right-5 top-6 rounded-full border px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-white"
        style={{
          opacity: likeOpacity,
          borderColor: "var(--epic-violet-bright)",
          background: "color-mix(in oklab, var(--epic-violet) 35%, transparent)",
        }}
      >
        Me interesa
      </motion.span>
      <motion.span
        className="pointer-events-none absolute left-5 top-6 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-white/80"
        style={{ opacity: passOpacity }}
      >
        Paso
      </motion.span>
    </>
  );
}