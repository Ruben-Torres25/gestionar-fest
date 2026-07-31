import { AnimatePresence, motion } from "motion/react";
import { GESTIONAR_LOGO, type SocialProfile } from "@/lib/social";
import userPhoto from "@/assets/social/p6.jpg";

export function ConnectionOverlay({
  profile,
  onClose,
}: {
  profile: SocialProfile | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {profile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center px-8 text-center"
          style={{
            background:
              "radial-gradient(70% 50% at 50% 42%, color-mix(in oklab, var(--epic-violet) 42%, transparent), rgba(3,2,10,0.95) 70%)",
            backdropFilter: "blur(14px)",
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center gap-10"
          >
            <svg
              viewBox="0 0 120 20"
              className="pointer-events-none absolute inset-0 m-auto h-5 w-full"
              aria-hidden="true"
            >
              <line
                x1="20"
                y1="10"
                x2="100"
                y2="10"
                stroke="var(--social-blue)"
                strokeOpacity="0.5"
                strokeWidth="1"
              />
              <motion.circle
                r="2.4"
                cy="10"
                fill="white"
                animate={{ cx: [20, 100, 20] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: "drop-shadow(0 0 5px var(--epic-violet-bright))" }}
              />
              {[20, 60, 100].map((cx) => (
                <motion.circle
                  key={cx}
                  cx={cx}
                  cy="10"
                  r="3"
                  fill="var(--epic-violet-bright)"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: cx / 100 }}
                  style={{ filter: "drop-shadow(0 0 6px var(--epic-violet-bright))" }}
                />
              ))}
            </svg>
            <img
              src={userPhoto}
              alt="Tu perfil"
              loading="lazy"
              className="relative size-24 rounded-full border-2 object-cover"
              style={{ borderColor: "var(--social-blue)", boxShadow: "0 0 26px -8px var(--social-blue)" }}
            />
            <img
              src={profile.photo}
              alt={profile.name}
              loading="lazy"
              className="relative size-24 rounded-full border-2 object-cover"
              style={{
                borderColor: "var(--epic-violet-bright)",
                boxShadow: "0 0 26px -8px var(--epic-violet-bright)",
              }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="mt-8 font-display text-[2.1rem] uppercase leading-none text-white"
            style={{
              textShadow: "0 0 26px color-mix(in oklab, var(--epic-violet) 70%, transparent)",
            }}
          >
            Hubo conexión
          </motion.h2>
          <p className="mt-3 text-sm font-light text-white/70">El interés fue mutuo.</p>
          <p className="mt-1 text-[0.78rem] font-light text-white/45">
            Ya pueden empezar a hablar.
          </p>

          <div className="mt-8 w-full space-y-3">
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[54px] w-full items-center justify-center rounded-[1.1rem] font-display text-[0.75rem] uppercase tracking-[0.18em] text-white"
              style={{
                background: "linear-gradient(100deg, var(--social-blue), var(--epic-violet))",
                boxShadow:
                  "0 16px 36px -18px color-mix(in oklab, var(--epic-violet) 100%, transparent), inset 0 1px 0 rgba(255,255,255,0.28)",
              }}
            >
              Enviar mensaje
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[54px] w-full items-center justify-center rounded-[1.1rem] border border-white/15 bg-white/[0.05] font-display text-[0.72rem] uppercase tracking-[0.18em] text-white/75"
            >
              Seguir descubriendo
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2 opacity-70">
            <span className="text-[0.55rem] font-light uppercase tracking-[0.2em] text-white/40">
              GestionAR Social
            </span>
            <img src={GESTIONAR_LOGO} alt="" className="h-3 w-auto object-contain" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
