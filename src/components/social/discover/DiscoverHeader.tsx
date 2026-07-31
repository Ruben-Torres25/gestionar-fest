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
      className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5"
    >
      <Link
        to="/social"
        aria-label="Volver a GestionAR Social"
        className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-white/85 backdrop-blur"
      >
        <ArrowLeft className="size-5" />
      </Link>
      <div className="min-w-0">
        <h1 className="truncate font-display text-[1.15rem] uppercase leading-none tracking-[0.08em] text-white">
          Descubrir
        </h1>
        <p className="mt-1.5 flex items-center gap-1.5 truncate text-[0.7rem] font-light text-white/60">
          <span
            className="inline-block size-1.5 animate-pulse rounded-full"
            style={{ background: "var(--social-blue)", boxShadow: "0 0 8px var(--social-blue)" }}
          />
          Epic Fest · {LIVE_STATS.active} personas activas
        </p>
      </div>
      <button
        type="button"
        onClick={onFilters}
        aria-label="Filtros"
        className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-white/85 backdrop-blur transition-colors hover:bg-white/10"
      >
        <SlidersHorizontal className="size-5" />
      </button>
    </motion.header>
  );
}
