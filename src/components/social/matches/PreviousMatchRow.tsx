import { motion, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import type { PreviousMatch } from "@/lib/matches";

const RING: Record<PreviousMatch["ring"], string> = {
  blue: "var(--social-blue)",
  violet: "var(--epic-violet-bright)",
};

export function PreviousMatchRow({
  match,
  index,
}: {
  match: PreviousMatch;
  index: number;
}) {
  const reduced = useReducedMotion();
  const ring = RING[match.ring];

  return (
    <motion.button
      type="button"
      initial={reduced ? false : { opacity: 0, y: 7 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.26 + index * 0.04, duration: 0.28 }}
      whileTap={{ scale: 0.985 }}
      className="grid w-full min-h-[3.5rem] cursor-pointer grid-cols-[auto_minmax(0,1fr)_4.5rem] items-center gap-x-3 rounded-xl px-0.5 py-3 text-left transition-colors duration-200 hover:bg-white/[0.025] active:bg-white/[0.04]"
    >
      <div className="relative shrink-0">
        <img
          src={match.photo}
          alt={match.name}
          className="size-11 rounded-full object-cover"
          style={{
            boxShadow: `0 0 0 1.5px color-mix(in oklab, ${ring} 42%, transparent)`,
          }}
          draggable={false}
        />
        {match.online && (
          <span
            className="absolute bottom-0 right-0 size-2 rounded-full border-2 border-[#050310]"
            style={{
              background: "var(--gestionar-green)",
              boxShadow: "0 0 5px var(--gestionar-green)",
            }}
          />
        )}
      </div>

      <div className="min-w-0">
        <h3 className="truncate font-ui text-[0.88rem] font-semibold leading-none text-white">
          {match.name}
        </h3>
        <p className="mt-1 truncate font-ui text-[0.72rem] font-normal leading-snug text-white/50">
          {match.preview}
        </p>
      </div>

      <div className="flex h-full flex-col items-end justify-center gap-1.5">
        <span className="font-ui text-[0.65rem] font-normal tabular-nums leading-none text-white/40">
          {match.time}
        </span>
        {match.unread ? (
          <span
            className="flex size-5 items-center justify-center rounded-full font-ui text-[0.62rem] font-bold leading-none text-white"
            style={{
              background: "color-mix(in oklab, var(--social-pink) 88%, black)",
              boxShadow: "0 0 8px -4px var(--social-pink)",
            }}
          >
            {match.unread}
          </span>
        ) : (
          <ChevronRight className="size-4 text-white/28" />
        )}
      </div>
    </motion.button>
  );
}
