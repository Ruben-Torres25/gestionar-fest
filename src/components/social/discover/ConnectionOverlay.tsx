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
              "radial-gradient(70% 50% at 50% 45%, color-mix(in oklab, var(--epic-violet) 45%, transparent), rgba(3,2,10,0.94) 70%)",
            backdropFilter: "blur(14px)",
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center"
          >
            <img
              src={userPhoto}
              alt="Tu perfil"
              loading="lazy"
              className="size-24 rounded-full border-2 object-cover"
              style={{ borderColor: "var(--social-blue)" }}
            />
            <img
              src={profile.photo}
              alt={profile.name}
              loading="lazy"
              className="-ml-5 size-24 rounded-full border-2 object-cover"
              style={{ borderColor: "var(--epic-violet-bright)" }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="mt-6 font-display text-3xl uppercase text-white"
            style={{
              textShadow: "0 0 24px color-mix(in oklab, var(--epic-violet) 70%, transparent)",
            }}
          >
            Hubo conexión
          </motion.h2>
          <p className="mt-2 text-sm text-white/65">Los dos mostraron interés.</p>

          <div className="mt-8 w-full space-y-3">
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-white/25 text-sm font-semibold uppercase tracking-[0.14em] text-white"
              style={{
                background: "linear-gradient(110deg, var(--social-blue), var(--epic-violet))",
              }}
            >
              Enviar mensaje
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-sm uppercase tracking-[0.14em] text-white/75"
            >
              Seguir descubriendo
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <span className="text-[0.55rem] uppercase tracking-[0.22em] text-white/35">
              GestionAR Social
            </span>
            <img src={GESTIONAR_LOGO} alt="" className="h-3 w-auto object-contain opacity-60" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}