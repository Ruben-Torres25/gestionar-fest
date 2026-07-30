import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { EPIC_LOGO } from "@/lib/epic";

export function EpicNavbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto relative z-30 flex items-center justify-between gap-4 rounded-2xl border border-epic-violet/18 bg-epic-night/55 px-3.5 py-1.5 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.7, ease: "easeOut" }}
        className="relative h-12 w-[6.6rem] shrink-0 overflow-hidden"
      >
        <img
          src={EPIC_LOGO}
          alt="Epic Fest"
          className="absolute left-1/2 top-1/2 h-[6.9rem] w-[6.9rem] max-w-none object-contain"
          style={{
            transform: "translate(-50%, calc(-50% - 4px))",
            filter:
              "drop-shadow(0 0 10px color-mix(in oklab, var(--epic-violet) 38%, transparent))",
          }}
        />
      </motion.div>
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Abrir menú"
        className="flex size-11 shrink-0 items-center justify-center rounded-full border border-epic-violet/28 bg-epic-violet/[0.08] text-foreground transition-transform active:scale-95"
        style={{ boxShadow: "0 0 12px -6px var(--epic-violet)" }}
      >
        <Menu className="size-5 text-white" strokeWidth={1.75} />
      </button>
    </motion.header>
  );
}
