import { motion, useMotionValue, useSpring, useReducedMotion, useTransform } from "motion/react";
import { useCallback } from "react";
import { EPIC_SCENE } from "@/lib/epic";

export function EpicScene({ tapped }: { tapped: boolean }) {
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });
  const x = useTransform(sx, (v) => v * 10);
  const y = useTransform(sy, (v) => v * 6);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduced) return;
      const r = e.currentTarget.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    },
    [px, py, reduced],
  );

  const reset = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <motion.div
        style={{ x, y }}
        animate={{ scale: tapped ? 1.02 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute -inset-6"
      >
        <motion.img
          src={EPIC_SCENE}
          alt="Salón violeta de Epic Fest con el oso anfitrión sentado en su trono sosteniendo entradas EPIC"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={
            reduced
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: [1, 1.03, 1], x: [0, -8, 0], y: [0, 4, 0] }
          }
          transition={
            reduced
              ? { duration: 0.8 }
              : {
                  opacity: { duration: 1.1, ease: "easeOut" },
                  scale: { duration: 13, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 13, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 13, repeat: Infinity, ease: "easeInOut" },
                }
          }
          className="size-full object-cover"
          style={{ objectPosition: "62% 62%" }}
        />
      </motion.div>

      {/* Overlays de composición */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4,2,12,0.82) 0%, rgba(4,2,12,0.45) 26%, rgba(4,2,12,0.12) 48%, rgba(4,2,12,0.55) 82%, rgba(4,2,12,0.88) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[70%]"
        style={{ background: "linear-gradient(to right, rgba(4,2,12,0.7), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 140px 40px rgba(2,0,8,0.75)" }}
      />
    </div>
  );
}