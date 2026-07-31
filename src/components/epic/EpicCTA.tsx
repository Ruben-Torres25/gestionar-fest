import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const PRIMARY_STYLE = {
  background:
    "linear-gradient(115deg, var(--epic-violet-deep) 0%, var(--epic-violet) 48%, var(--epic-violet-bright) 100%)",
  boxShadow:
    "0 0 18px -4px color-mix(in oklab, var(--epic-violet) 48%, transparent), 0 8px 18px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.26)",
} as const;

export function EpicCTA() {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      onClick={() => void navigate({ to: "/entradas" })}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.7, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex min-h-[40px] w-auto cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-xl px-[1.15rem] text-[0.9rem] font-semibold tracking-wide text-white"
      style={PRIMARY_STYLE}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 42%)",
        }}
      />
      <span className="relative">Ver entradas</span>
      <ArrowUpRight
        className="relative size-[15px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-1 group-active:-translate-y-1"
        strokeWidth={2.1}
        aria-hidden
      />
    </motion.button>
  );
}

/** Compact secondary entry — same gradient as Ver entradas, bottom-left. */
export function EpicSocialLink() {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      onClick={() => void navigate({ to: "/social" })}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.05, duration: 0.55, ease: "easeOut" }}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      className="group pointer-events-auto relative inline-flex min-h-[32px] cursor-pointer items-center gap-1 overflow-hidden rounded-xl px-3 py-1.5 font-ui text-[0.72rem] font-semibold tracking-wide text-white"
      style={PRIMARY_STYLE}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 42%)",
        }}
      />
      <span className="relative">GestionAR Social</span>
      <ArrowUpRight
        className="relative size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2.1}
        aria-hidden
      />
    </motion.button>
  );
}
