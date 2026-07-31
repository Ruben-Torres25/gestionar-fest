import { AnimatePresence, motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { CURRENT_USER, type SocialProfile } from "@/lib/social";
import { GA_SOCIAL_LOCKUP } from "@/lib/ga-assets";
import { EPIC_LOGO_MARK } from "@/lib/epic";

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
          role="dialog"
          aria-modal="true"
          aria-labelledby="match-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="absolute inset-0 z-[60] flex flex-col px-7"
          style={{
            background:
              "radial-gradient(75% 55% at 50% 38%, color-mix(in oklab, var(--epic-violet) 38%, transparent), rgba(3,2,10,0.97) 68%), rgba(3,2,10,0.92)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center gap-8"
            >
              <ConnectionLine />

              <img
                src={CURRENT_USER.photo}
                alt={CURRENT_USER.name}
                loading="lazy"
                className="relative size-[6.5rem] rounded-full border-2 object-cover"
                style={{
                  borderColor: "var(--social-blue)",
                  boxShadow: "0 0 32px -6px var(--social-blue)",
                }}
              />
              <img
                src={profile.photo}
                alt={profile.name}
                loading="lazy"
                className="relative size-[6.5rem] rounded-full border-2 object-cover"
                style={{
                  borderColor: "var(--epic-violet-bright)",
                  boxShadow: "0 0 32px -6px var(--epic-violet-bright)",
                }}
              />
            </motion.div>

            <motion.h2
              id="match-title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45 }}
              className="mt-7 font-brand text-[2.2rem] uppercase leading-none tracking-[0.04em] text-white"
              style={{
                textShadow: "0 0 28px color-mix(in oklab, var(--epic-violet) 70%, transparent)",
              }}
            >
              ¡Hicieron match!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-3 font-ui text-[1rem] font-semibold text-white"
            >
              {CURRENT_USER.name}{" "}
              <span className="font-normal text-epic-violet-bright">+</span> {profile.name}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.4 }}
              className="mt-3 space-y-1"
            >
              <p className="font-ui text-sm font-medium text-white/85">El interés fue mutuo.</p>
              <p className="font-ui text-[0.82rem] font-normal text-white/50">
                Ya pueden empezar a hablar.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.4 }}
              className="mt-7 w-full max-w-[22rem] space-y-2.5"
            >
              <button
                type="button"
                onClick={onClose}
                className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-[1.1rem] font-ui text-[0.92rem] font-semibold text-white"
                style={{
                  background:
                    "linear-gradient(100deg, var(--social-blue) 0%, color-mix(in oklab, var(--social-blue) 35%, var(--epic-violet)) 48%, var(--epic-violet-bright))",
                  boxShadow:
                    "0 14px 32px -16px color-mix(in oklab, var(--epic-violet) 95%, transparent), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
              >
                <MessageCircle className="size-[1.05rem]" />
                Enviar un mensaje
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex min-h-[50px] w-full items-center justify-center rounded-[1.1rem] border border-white/14 bg-white/[0.04] font-ui text-[0.88rem] font-medium text-white/78"
              >
                Seguir viendo gente
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.48, duration: 0.4 }}
            className="flex shrink-0 items-center justify-center gap-3.5 pb-[calc(env(safe-area-inset-bottom)+1.1rem)] pt-2"
          >
            <img
              src={GA_SOCIAL_LOCKUP}
              alt="GestionAR Social"
              className="h-8 w-auto max-w-[9.5rem] object-contain"
              style={{ filter: "drop-shadow(0 0 10px rgba(0,200,255,0.28))" }}
              draggable={false}
            />
            <span
              className="font-ui text-[0.95rem] font-semibold leading-none text-white/35"
              aria-hidden="true"
            >
              ×
            </span>
            <img
              src={EPIC_LOGO_MARK}
              alt="Epic Fest"
              className="h-12 w-auto max-w-[4.5rem] object-contain"
              style={{ filter: "drop-shadow(0 0 12px rgba(160,100,255,0.4))" }}
              draggable={false}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ConnectionLine() {
  return (
    <svg
      viewBox="0 0 160 28"
      className="pointer-events-none absolute inset-x-10 top-1/2 h-7 -translate-y-1/2"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="match-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--social-blue)" stopOpacity="0.85" />
          <stop offset="50%" stopColor="var(--epic-violet-bright)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--epic-violet)" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <motion.line
        x1="12"
        y1="14"
        x2="148"
        y2="14"
        stroke="url(#match-line)"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.35 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ filter: "drop-shadow(0 0 6px var(--epic-violet-bright))" }}
      />

      <motion.circle
        cx="80"
        cy="14"
        r="4.2"
        fill="white"
        animate={{
          r: [3.6, 5.2, 3.6],
          opacity: [0.75, 1, 0.75],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          filter:
            "drop-shadow(0 0 8px var(--social-blue)) drop-shadow(0 0 12px var(--epic-violet-bright))",
        }}
      />

      <motion.circle
        r="2.4"
        cy="14"
        fill="var(--social-blue)"
        animate={{ cx: [18, 142, 18] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 6px var(--social-blue))" }}
      />
    </svg>
  );
}
