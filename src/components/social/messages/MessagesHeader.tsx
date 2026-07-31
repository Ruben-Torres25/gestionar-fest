import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";

export function MessagesHeader({ unreadCount }: { unreadCount: number }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-between px-5"
    >
      <Link
        to="/social"
        aria-label="Volver a GestionAR Social"
        className="relative z-10 flex size-11 min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-white/90 backdrop-blur transition-colors duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--epic-violet-bright)]"
        style={{ touchAction: "manipulation" }}
      >
        <ArrowLeft className="size-5" strokeWidth={1.85} />
      </Link>

      <div className="pointer-events-none absolute inset-x-14 top-1/2 -translate-y-1/2 text-center">
        <h1 className="font-ui text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-white min-[390px]:text-[1.15rem]">
          Mensajes
        </h1>
        <p className="mt-1.5 flex items-center justify-center gap-1.5 font-ui text-[0.68rem] font-light text-white/72 min-[390px]:text-[0.7rem]">
          <span
            className="inline-block size-1.5 shrink-0 rounded-full"
            style={{
              background: "var(--epic-violet-bright)",
              boxShadow: "0 0 5px color-mix(in oklab, var(--epic-violet-bright) 70%, transparent)",
            }}
          />
          <span className="truncate">
            Epic Fest · {unreadCount} mensajes sin leer
          </span>
        </p>
      </div>

      <button
        type="button"
        aria-label="Opciones de mensajes"
        className="relative z-10 flex size-11 min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-2xl border bg-white/[0.06] text-white/90 backdrop-blur transition-colors duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--epic-violet-bright)]"
        style={{
          touchAction: "manipulation",
          borderColor: "color-mix(in oklab, var(--epic-violet-bright) 32%, rgba(255,255,255,0.12))",
          boxShadow: "0 0 10px -8px var(--epic-violet-bright)",
        }}
      >
        <SlidersHorizontal className="size-5" strokeWidth={1.85} />
      </button>
    </motion.header>
  );
}
