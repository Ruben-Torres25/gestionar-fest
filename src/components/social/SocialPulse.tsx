import { motion, useReducedMotion } from "motion/react";

const OSO_FLECHADO = "/social/oso-flechado.png";

export function SocialPulse() {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative aspect-[3/1] w-full overflow-hidden rounded-[1.6rem] border border-white/10"
      style={{
        background: "#060312",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 50px -30px color-mix(in oklab, var(--epic-violet) 90%, transparent)",
      }}
    >
      <motion.img
        src={OSO_FLECHADO}
        alt="Epic Fest — osos flechados"
        initial={reduced ? false : { opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 size-full object-contain object-center"
        draggable={false}
      />
    </div>
  );
}
