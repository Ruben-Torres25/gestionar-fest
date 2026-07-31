import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Compass, MessageCircle, Users } from "lucide-react";
import { QUICK_ACCESS_META } from "@/lib/social";

export function SocialQuickAccess() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75, duration: 0.5 }}
      className="mt-7 grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-2.5 px-5"
    >
      <motion.div whileTap={{ scale: 0.985 }} className="row-span-2">
        <Link
          to="/social/descubrir"
          className="flex h-full flex-col justify-between rounded-[1.35rem] border p-4"
          style={{
            borderColor: "color-mix(in oklab, var(--epic-violet) 50%, transparent)",
            background:
              "linear-gradient(155deg, color-mix(in oklab, var(--epic-violet) 26%, transparent), rgba(255,255,255,0.03) 65%)",
            boxShadow: "0 18px 40px -28px color-mix(in oklab, var(--epic-violet) 100%, transparent)",
          }}
        >
          <div className="flex items-start justify-between">
            <span
              className="flex size-10 items-center justify-center rounded-xl border border-white/15 bg-black/25"
              style={{ boxShadow: "0 0 20px -8px var(--epic-violet-bright)" }}
            >
              <Compass className="size-5 text-epic-violet-bright" />
            </span>
            <ArrowUpRight className="size-4 text-white/50" />
          </div>
          <div className="mt-6">
            <p className="font-display text-[0.95rem] uppercase leading-[1.05] tracking-[0.04em] text-white">
              ¿A quién veo hoy?
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-[0.7rem] font-light text-white/60">
              <span
                className="inline-block size-1.5 rounded-full"
                style={{
                  background: "var(--gestionar-green)",
                  boxShadow: "0 0 8px var(--gestionar-green)",
                }}
              />
              Activo
            </p>
          </div>
        </Link>
      </motion.div>

      <SecondaryTile
        icon={<Users className="size-[1.05rem]" style={{ color: "var(--social-blue)" }} />}
        title="Hice match con.."
        meta={`${QUICK_ACCESS_META.connections} nuevas`}
        tone="var(--social-blue)"
      />
      <SecondaryTile
        icon={<MessageCircle className="size-[1.05rem]" style={{ color: "var(--social-pink)" }} />}
        title="Mensajes"
        meta={`${QUICK_ACCESS_META.messages} sin leer`}
        tone="var(--social-pink)"
      />
    </motion.section>
  );
}

function SecondaryTile({
  icon,
  title,
  meta,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  meta: string;
  tone: string;
}) {
  return (
    <div
      className="flex min-h-[62px] items-center gap-3 rounded-[1.15rem] border border-white/10 bg-white/[0.035] px-3 py-2.5 backdrop-blur"
      style={{ boxShadow: `inset 0 0 24px -18px ${tone}` }}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/25">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[0.72rem] font-medium leading-snug text-white whitespace-normal">
          {title}
        </p>
        <p className="truncate text-[0.68rem] font-light" style={{ color: tone }}>
          {meta}
        </p>
      </div>
    </div>
  );
}
