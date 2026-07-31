import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Bell } from "lucide-react";
import { GESTIONAR_ISOTYPE } from "@/lib/social";

export function SocialHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3 px-5"
    >
      <Link
        to="/"
        aria-label="Volver a Epic Fest"
        className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-white/85 backdrop-blur transition-colors hover:bg-white/10"
      >
        <ArrowLeft className="size-5" />
      </Link>

      <div className="min-w-0">
        <h1 className="truncate font-display text-[1.15rem] uppercase leading-none tracking-[0.08em] text-white">
          GestionAR Social
        </h1>
        <p className="mt-1.5 flex items-center gap-1.5 text-[0.7rem] font-light text-white/60">
          <span
            className="inline-block size-1.5 animate-pulse rounded-full"
            style={{
              background: "var(--gestionar-green)",
              boxShadow: "0 0 8px var(--gestionar-green)",
            }}
          />
          Epic Fest · Activo ahora
        </p>
      </div>

      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]"
        style={{
          boxShadow: "0 0 18px -8px color-mix(in oklab, var(--social-blue) 90%, transparent)",
        }}
        title="GestionAR Business"
      >
        <img
          src={GESTIONAR_ISOTYPE}
          alt="GestionAR Business"
          className="size-6 object-contain"
          style={{ filter: "drop-shadow(0 0 6px rgba(90,150,255,0.35))" }}
        />
      </div>

      <button
        type="button"
        aria-label="Notificaciones"
        className="relative flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-white/85 backdrop-blur"
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
