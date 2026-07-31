import { motion } from "motion/react";
import { Clock, Sparkles } from "lucide-react";
import { GESTIONAR_LOGO, LIVE_STATS, PROFILES } from "@/lib/social";

export function SocialLiveActivity() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.5 }}
      className="mt-7 px-5 pb-2"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex size-2">
          <span
            className="absolute inline-flex size-full animate-ping rounded-full opacity-70"
            style={{ background: "var(--social-pink)" }}
          />
          <span
            className="relative inline-flex size-2 rounded-full"
            style={{ background: "var(--social-pink)" }}
          />
        </span>
        <h3 className="font-display text-[0.72rem] uppercase tracking-[0.26em] text-white/80">
          Ahora en Epic Fest
        </h3>
      </div>

      <div
        className="mt-3 rounded-[1.5rem] border border-white/10 p-4"
        style={{
          background:
            "linear-gradient(150deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015) 55%), #070414",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.07), 0 20px 44px -34px color-mix(in oklab, var(--social-blue) 100%, transparent)",
        }}
      >
        <div className="flex items-center gap-3.5">
          <div className="flex -space-x-3">
            {PROFILES.slice(0, 4).map((p, i) => (
              <motion.span
                key={p.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.08, duration: 0.4 }}
                className="relative inline-flex rounded-full p-[2px]"
                style={{
                  background:
                    "linear-gradient(140deg, var(--social-blue), var(--epic-violet-bright))",
                  boxShadow: "0 0 14px -4px var(--epic-violet-bright)",
                }}
              >
                <img
                  src={p.photo}
                  alt=""
                  loading="lazy"
                  className="size-9 rounded-full border-2 border-[#070414] object-cover"
                />
              </motion.span>
            ))}
          </div>
          <div className="min-w-0">
            <p className="font-display text-[1.6rem] leading-none text-white">{LIVE_STATS.active}</p>
            <p className="mt-1 text-[0.7rem] font-light text-white/55">personas activas</p>
          </div>
        </div>

        <div className="mt-4 grid gap-2">
          <Row icon={<Sparkles className="size-3.5" />} tone="var(--social-blue)">
            <strong className="font-semibold text-white">{LIVE_STATS.connections}</strong> conexiones
            recientes
          </Row>
          <Row icon={<Clock className="size-3.5" />} tone="var(--epic-violet-bright)">
            Disponible hasta las{" "}
            <strong className="font-semibold text-white">{LIVE_STATS.until}</strong>
          </Row>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 opacity-70">
        <span className="text-[0.55rem] font-light uppercase tracking-[0.2em] text-white/40">
          Powered by
        </span>
        <img
          src={GESTIONAR_LOGO}
          alt="GestionAR Business"
          className="h-3.5 w-auto object-contain"
        />
      </div>
    </motion.section>
  );
}

function Row({
  icon,
  tone,
  children,
}: {
  icon: React.ReactNode;
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className="flex items-center gap-2.5 rounded-xl border px-3 py-2 text-[0.75rem] font-light text-white/75"
      style={{
        borderColor: `color-mix(in oklab, ${tone} 30%, transparent)`,
        background: `color-mix(in oklab, ${tone} 9%, transparent)`,
      }}
    >
      <span style={{ color: tone, filter: `drop-shadow(0 0 6px ${tone})` }}>{icon}</span>
      {children}
    </span>
  );
}
