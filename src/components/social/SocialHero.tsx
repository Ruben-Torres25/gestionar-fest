import { motion } from "motion/react";
import { SocialPulse } from "./SocialPulse";

export function SocialHero() {
  return (
    <section className="px-5 pt-7">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="font-display text-[0.6rem] uppercase tracking-[0.34em] text-epic-violet-bright"
      >
        Experiencia social del evento
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 font-display text-[2.15rem] uppercase leading-[2.25rem] text-white"
        style={{
          textShadow: "0 0 26px color-mix(in oklab, var(--epic-violet) 42%, transparent)",
        }}
      >
        La previa también
        <br />
        se vive acá
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="mt-4 max-w-[34ch] text-[0.87rem] font-light leading-6 text-white/70"
      >
        Descubrí personas que también van a Epic Fest y empezá a conectar antes de encontrarlas en
        la noche.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="mt-6"
      >
        <SocialPulse />
      </motion.div>
    </section>
  );
}
