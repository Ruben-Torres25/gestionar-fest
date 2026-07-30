import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Bell } from "lucide-react";
import { GESTIONAR_LOGO } from "@/lib/social";

export function SocialHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center gap-3 px-5"
    >
      <Link
        to="/"
        aria-label="Volver a Epic Fest"
        className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur"
      >
        <ArrowLeft className="size-5" />
      </Link>

      <div className="min-w-0 flex-1">
        <h1 className="truncate font-display text-lg uppercase tracking-[0.1em] text-white">
          GestionAR Social
        </h1>
        <p className="flex items-center gap-1.5 text-[0.68rem] text-white/55">
          <span
            className="inline-block size-1.5 animate-pulse rounded-full"
            style={{ background: "var(--gestionar-green)" }}
          />
          Epic Fest · Activo ahora
        </p>
      </div>

      <img
        src={GESTIONAR_LOGO}
        alt="GestionAR Business"
        className="h-4 w-auto object-contain opacity-75"
      />

      <button
        type="button"
        aria-label="Notificaciones"
        className="relative flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur"
      >
        <Bell className="size-5" />
        <span
          className="absolute right-2.5 top-2.5 size-2 rounded-full"
          style={{ background: "var(--social-pink)" }}
        />
      </button>
    </motion.header>
  );
}