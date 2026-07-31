import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { LIVE_STATS } from "@/lib/social";

export function DiscoverHeader({ onFilters }: { onFilters: () => void }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative flex items-center justify-between px-5"
    >
      <Link
        to="/social"
        aria-label="Volver a GestionAR Social"
        className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-white/85 backdrop-blur"
      >
        <ArrowLeft className="size-5" />
      </Link>

      <div className="pointer-events-none absolute inset-x-14 top-1/2 -translate-y-1/2 text-center">
        <h1 className="font-ui text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-white min-[390px]:text-[1.15rem]">
          ¿A quién veo hoy?
        </h1>
        <p className="mt-1.5 flex items-center justify-center gap-1.5 font-ui text-[0.68rem] font-light text-white/60 min-[390px]:text-[0.7rem]">
          <span
            className="inline-block size-1.5 shrink-0 animate-pulse rounded-full"
            style={{ background: "var(--social-blue)", boxShadow: "0 0 8px var(--social-blue)" }}
          />
          <span className="truncate">Epic Fest · {LIVE_STATS.active} personas activas</span>
        </p>
      </div>

      <button
        type="button"
        onClick={onFilters}
        aria-label="Filtros"
        className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-white/85 backdrop-blur transition-colors hover:bg-white/10"
      >
        <SlidersHorizontal className="size-5" />
      </button>
    </motion.header>
  );
}
