import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Bell } from "lucide-react";
import { GA_SOCIAL_LOCKUP } from "@/lib/ga-assets";

export function SocialHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="grid grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-2 px-4"
    >
      <Link
        to="/epic"
        aria-label="Volver a Epic Fest"
        className="flex size-11 shrink-0 items-center justify-center justify-self-start rounded-2xl border border-white/12 bg-white/[0.06] text-white/85 backdrop-blur transition-colors hover:bg-white/10"
      >
        <ArrowLeft className="size-5" />
      </Link>

      <div className="flex min-w-0 items-center justify-center px-1">
        <img
          src={`${GA_SOCIAL_LOCKUP}?v=3`}
          alt="GestionAR Social"
          className="h-12 w-auto max-w-full object-contain"
          style={{
            filter: "drop-shadow(0 0 14px rgba(0,200,255,0.35))",
          }}
          draggable={false}
        />
      </div>

      <button
        type="button"
        aria-label="Notificaciones"
        className="relative flex size-11 shrink-0 items-center justify-center justify-self-end rounded-2xl border border-white/12 bg-white/[0.06] text-white/85 backdrop-blur"
      >
        <Bell className="size-5" />
        <span
          className="absolute right-2.5 top-2.5 size-2 rounded-full"
          style={{ background: "var(--social-pink)", boxShadow: "0 0 8px var(--social-pink)" }}
        />
      </button>
    </motion.header>
  );
}
