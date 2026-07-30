import { motion } from "motion/react";
import { Clock, Sparkles } from "lucide-react";
import { LIVE_STATS, PROFILES } from "@/lib/social";

export function SocialLiveActivity() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.5 }}
      className="mt-6 px-5 pb-8"
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
        <h3 className="text-xs uppercase tracking-[0.24em] text-white/70">Ahora en Epic Fest</h3>
      </div>

      <div className="mt-3 rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {PROFILES.slice(0, 4).map((p, i) => (
              <motion.img
                key={p.id}
                src={p.photo}
                alt=""
                loading="lazy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.08, duration: 0.4 }}
                className="size-9 rounded-full border-2 object-cover"
                style={{ borderColor: "color-mix(in oklab, var(--epic-violet) 70%, transparent)" }}
              />
            ))}
          </div>
          <div>
            <p className="font-display text-xl leading-none text-white">{LIVE_STATS.active}</p>
            <p className="text-[0.65rem] uppercase tracking-[0.16em] text-white/45">
              personas activas
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Chip icon={<Sparkles className="size-3.5" />} tone="var(--social-blue)">
            {LIVE_STATS.connections} conexiones recientes
          </Chip>
          <Chip icon={<Clock className="size-3.5" />} tone="var(--epic-violet-bright)">
            Disponible hasta las {LIVE_STATS.until}
          </Chip>
        </div>
      </div>
    </motion.section>
  );
}

function Chip({
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
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.68rem] text-white/80"
      style={{
        borderColor: `color-mix(in oklab, ${tone} 45%, transparent)`,
        background: `color-mix(in oklab, ${tone} 12%, transparent)`,
      }}
    >
      <span style={{ color: tone }}>{icon}</span>
      {children}
    </span>
  );
}