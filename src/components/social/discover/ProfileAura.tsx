import { motion } from "motion/react";

export function ProfileAura({ tone }: { tone: string }) {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem]"
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `radial-gradient(60% 50% at 50% 60%, color-mix(in oklab, ${tone} 55%, transparent), transparent 70%)`,
          filter: "blur(18px)",
        }}
      />
      <motion.span
        className="pointer-events-none absolute inset-x-6 bottom-0 h-px"
        animate={{ opacity: [0.2, 0.9, 0.2], scaleX: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: `linear-gradient(90deg, transparent, ${tone}, transparent)` }}
      />
    </>
  );
}