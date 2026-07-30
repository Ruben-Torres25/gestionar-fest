import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Compass, MessageCircle, Users } from "lucide-react";
import { QUICK_ACCESS_META } from "@/lib/social";

const CARD =
  "flex min-h-[92px] flex-1 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur";

export function SocialQuickAccess() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75, duration: 0.5 }}
      className="mt-6 flex gap-3 px-5"
    >
      <Link
        to="/social/descubrir"
        className={CARD}
        style={{
          borderColor: "color-mix(in oklab, var(--epic-violet) 45%, transparent)",
          boxShadow: "0 0 22px -10px color-mix(in oklab, var(--epic-violet) 90%, transparent)",
        }}
      >
        <Compass className="size-5 text-epic-violet-bright" />
        <span className="text-xs font-medium text-white">Descubrir</span>
        <span className="text-[0.6rem] uppercase tracking-[0.14em] text-white/45">Activo</span>
      </Link>

      <div className={CARD}>
        <Users className="size-5" style={{ color: "var(--social-blue)" }} />
        <span className="text-xs font-medium text-white">Conexiones</span>
        <span className="text-[0.6rem] uppercase tracking-[0.14em] text-white/45">
          {QUICK_ACCESS_META.connections} nuevas
        </span>
      </div>

      <div className={CARD}>
        <MessageCircle className="size-5" style={{ color: "var(--social-pink)" }} />
        <span className="text-xs font-medium text-white">Mensajes</span>
        <span className="text-[0.6rem] uppercase tracking-[0.14em] text-white/45">
          {QUICK_ACCESS_META.messages} sin leer
        </span>
      </div>
    </motion.section>
  );
}