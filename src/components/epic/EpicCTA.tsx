import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function EpicCTA() {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      onClick={() => void navigate({ to: "/entradas" })}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex min-h-[42px] w-auto cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-xl px-4 text-[0.88rem] font-semibold tracking-wide text-white"
      style={{
        background:
          "linear-gradient(115deg, var(--epic-violet-deep) 0%, var(--epic-violet) 48%, var(--epic-violet-bright) 100%)",
        boxShadow:
          "0 0 24px -4px color-mix(in oklab, var(--epic-violet) 65%, transparent), 0 8px 20px -10px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.28)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 42%)",
        }}
      />
      <span className="relative">Entrada Epic Fest</span>
      <ArrowUpRight
        className="relative size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-1 group-active:-translate-y-1"
        strokeWidth={2}
        aria-hidden
      />
    </motion.button>
  );
}
