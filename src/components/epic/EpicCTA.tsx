import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function EpicCTA() {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97 }}
      className="group flex min-h-[52px] w-[82%] items-center justify-center gap-2 rounded-2xl border border-white/25 text-base font-semibold uppercase tracking-[0.14em] text-white"
      style={{
        background:
          "linear-gradient(120deg, var(--epic-violet-deep), var(--epic-violet) 45%, var(--epic-violet-bright))",
        boxShadow:
          "0 0 28px -6px color-mix(in oklab, var(--epic-violet) 80%, transparent), inset 0 1px 0 rgba(255,255,255,0.25)",
      }}
    >
      Descubrir Epic Fest
      <ArrowUpRight className="size-5 transition-transform duration-300 group-active:translate-x-1 group-active:-translate-y-1" />
    </motion.button>
  );
}