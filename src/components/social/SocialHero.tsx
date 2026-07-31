import { motion } from "motion/react";
import { SocialPulse } from "./SocialPulse";

export function SocialHero() {
  return (
    <section className="px-5 pt-7">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center font-display text-[2.15rem] uppercase leading-[2.25rem] text-white"
        style={{
          textShadow: "0 0 26px color-mix(in oklab, var(--epic-violet) 42%, transparent)",
        }}
      >
        La verdadera previa..
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-3 text-center font-display text-[0.95rem] uppercase leading-snug tracking-[0.06em] text-white/88"
      >
        Exclusivo para{" "}
        <span className="text-epic-violet-bright">LA COMUNIDAD DE EPIC FEST</span>
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-4 max-w-[38ch] text-[0.87rem] font-light leading-6 text-white/70"
      >
        Conocé a quienes vas a ver esta noche..
        <br />
        Armá una previa o coordiná el after..
        <br />
        O simplemente conectá antes de llegar..
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-6"
      >
        <SocialPulse />
      </motion.div>
    </section>
  );
}
