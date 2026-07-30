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
      className="flex items-center gap-3 px-5"
    >
      <Link
        to="/social"
        aria-label="Volver a GestionAR Social"
        className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur"
      >
        <ArrowLeft className="size-5" />
      </Link>
      <div className="min-w-0 flex-1">
        <h1 className="font-display text-lg uppercase tracking-[0.1em] text-white">Descubrir</h1>
        <p className="truncate text-[0.68rem] text-white/55">
          Epic Fest · {LIVE_STATS.active} personas activas
        </p>
      </div>
      <button
        type="button"
        onClick={onFilters}
        aria-label="Filtros"
        className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur"
      >
        <SlidersHorizontal className="size-5" />
      </button>
    </motion.header>
  );
}