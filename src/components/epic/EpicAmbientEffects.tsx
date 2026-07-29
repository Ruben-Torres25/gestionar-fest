import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

export function EpicAmbientEffects() {
  const reduced = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: 6 + ((i * 37) % 88),
        size: 2 + (i % 3),
        delay: (i * 1.3) % 9,
        duration: 12 + (i % 5) * 2,
        gold: i % 5 === 0,
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Luz superior violeta */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 0.28 : [0.18, 0.32, 0.18] }}
        transition={{ delay: 0.2, duration: 9, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
        className="absolute -top-24 left-1/2 h-64 w-[130%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(ellipse at center, var(--epic-violet), transparent 70%)" }}
      />
      {/* Glow detrás del trono */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 0.3 : [0.22, 0.42, 0.22], scale: reduced ? 1 : [1, 1.06, 1] }}
        transition={{ delay: 0.3, duration: 11, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
        className="absolute bottom-[22%] right-[6%] size-56 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--epic-violet-bright), transparent 70%)" }}
      />
      {/* Halos laterales */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 0.18 : [0.1, 0.24, 0.1] }}
        transition={{ duration: 13, repeat: reduced ? 0 : Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-[-18%] top-1/3 h-72 w-40 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--epic-violet), transparent 70%)" }}
      />
      {/* Humo cerca del suelo */}
      {!reduced &&
        [0, 1].map((i) => (
          <motion.div
            key={`smoke-${i}`}
            animate={{ x: i === 0 ? [-40, 40, -40] : [40, -30, 40], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 22 + i * 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[6%] h-40 w-[75%] rounded-full blur-3xl"
            style={{
              left: i === 0 ? "-10%" : "35%",
              background:
                i === 0
                  ? "radial-gradient(ellipse, var(--epic-violet-deep), transparent 70%)"
                  : "radial-gradient(ellipse, oklch(0.4 0.14 270), transparent 70%)",
            }}
          />
        ))}
      {/* Partículas */}
      {!reduced &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.55, 0], y: [0, -220] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeOut",
            }}
            className="absolute bottom-[14%] rounded-full"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              background: p.gold ? "var(--epic-gold)" : "var(--epic-violet-bright)",
              boxShadow: `0 0 6px ${p.gold ? "var(--epic-gold)" : "var(--epic-violet-bright)"}`,
            }}
          />
        ))}
      {/* Reflejo en las entradas */}
      {!reduced && (
        <motion.div
          animate={{ x: ["-120%", "120%"], opacity: [0, 0.35, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 8, ease: "easeInOut" }}
          className="absolute bottom-[38%] right-[38%] h-16 w-14 rotate-[25deg] blur-md"
          style={{
            background:
              "linear-gradient(100deg, transparent, var(--epic-gold), var(--epic-violet-bright), transparent)",
          }}
        />
      )}
      {/* Reflejo en los lentes */}
      {!reduced && (
        <motion.div
          animate={{ x: ["-60%", "160%"], opacity: [0, 0.3, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 11, ease: "easeInOut" }}
          className="absolute bottom-[45%] right-[20%] h-4 w-10 rotate-[15deg] blur-[3px]"
          style={{ background: "linear-gradient(90deg, transparent, var(--epic-violet-bright), transparent)" }}
        />
      )}
    </div>
  );
}