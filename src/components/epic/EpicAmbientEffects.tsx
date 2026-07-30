import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

export function EpicAmbientEffects() {
  const reduced = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: 8 + ((i * 41) % 84),
        size: 1.5 + (i % 3) * 0.6,
        delay: (i * 1.4) % 9,
        duration: 14 + (i % 5) * 2,
        gold: i % 5 === 0,
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Glow violeta sutil — esquina superior derecha */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 0.2 : [0.12, 0.22, 0.12] }}
        transition={{ delay: 0.2, duration: 10, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
        className="absolute -right-16 -top-20 size-64 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--epic-violet) 70%, transparent), transparent 72%)",
        }}
      />
      {/* Luz superior suave */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 0.2 : [0.12, 0.24, 0.12] }}
        transition={{ delay: 0.2, duration: 9, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
        className="absolute -top-24 left-1/2 h-56 w-[120%] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(ellipse at center, var(--epic-violet), transparent 72%)",
        }}
      />
      {/* Glow detrás de la cabeza / trono */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 0.22 : [0.14, 0.28, 0.14], scale: reduced ? 1 : [1, 1.04, 1] }}
        transition={{ delay: 0.3, duration: 12, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
        className="absolute bottom-[28%] right-[8%] size-48 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--epic-violet-bright) 55%, transparent), transparent 72%)",
        }}
      />
      {/* Halo suave cerca de las entradas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 0.12 : [0.08, 0.16, 0.08] }}
        transition={{ duration: 8, repeat: reduced ? 0 : Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute bottom-[36%] right-[34%] size-28 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--epic-violet-bright) 40%, transparent), transparent 70%)",
        }}
      />
      {/* Halos laterales */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 0.12 : [0.06, 0.16, 0.06] }}
        transition={{ duration: 14, repeat: reduced ? 0 : Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-[-18%] top-1/3 h-64 w-36 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--epic-violet), transparent 72%)" }}
      />
      {/* Humo apenas visible */}
      {!reduced &&
        [0, 1].map((i) => (
          <motion.div
            key={`smoke-${i}`}
            animate={{ x: i === 0 ? [-30, 30, -30] : [30, -24, 30], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 24 + i * 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[8%] h-36 w-[70%] rounded-full blur-3xl"
            style={{
              left: i === 0 ? "-10%" : "35%",
              background:
                i === 0
                  ? "radial-gradient(ellipse, var(--epic-violet-deep), transparent 72%)"
                  : "radial-gradient(ellipse, oklch(0.4 0.12 270), transparent 72%)",
            }}
          />
        ))}
      {/* Partículas discretas */}
      {!reduced &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.35, 0], y: [0, -180] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeOut",
            }}
            className="absolute bottom-[16%] rounded-full"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              background: p.gold ? "var(--epic-gold)" : "var(--epic-violet-bright)",
              boxShadow: `0 0 4px ${p.gold ? "var(--epic-gold)" : "var(--epic-violet-bright)"}`,
            }}
          />
        ))}
      {/* Reflejo suave en las entradas */}
      {!reduced && (
        <motion.div
          animate={{ x: ["-120%", "120%"], opacity: [0, 0.22, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 10, ease: "easeInOut" }}
          className="absolute bottom-[38%] right-[38%] h-14 w-12 rotate-[25deg] blur-md"
          style={{
            background:
              "linear-gradient(100deg, transparent, var(--epic-gold), var(--epic-violet-bright), transparent)",
          }}
        />
      )}
      {/* Reflejo en los lentes */}
      {!reduced && (
        <motion.div
          animate={{ x: ["-60%", "160%"], opacity: [0, 0.22, 0] }}
          transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 13, ease: "easeInOut" }}
          className="absolute bottom-[45%] right-[20%] h-3.5 w-9 rotate-[15deg] blur-[3px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--epic-violet-bright), transparent)",
          }}
        />
      )}
    </div>
  );
}
