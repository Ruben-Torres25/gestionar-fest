import { motion } from "motion/react";

const LINES = ["La noche", "está por", "comenzar"];

export function EpicHeroContent() {
  return (
    <div className="max-w-[78%] text-left">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.6, ease: "easeOut" }}
        className="mb-2 text-[0.62rem] uppercase tracking-[0.32em] text-epic-violet-bright/90"
      >
        Epic Fest · Próximamente
      </motion.p>
      <h1 className="font-display text-[2.7rem] uppercase leading-[0.92] text-white sm:text-5xl">
        {LINES.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ delay: 1.3 + i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="block"
              style={{ textShadow: "0 4px 22px rgba(0,0,0,0.75)" }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
    </div>
  );
}