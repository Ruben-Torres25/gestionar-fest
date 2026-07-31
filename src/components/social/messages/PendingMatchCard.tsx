import { motion, useReducedMotion } from "motion/react";
import type { PendingMatch } from "@/lib/messages";

const CTA_CLASS =
  "mt-1.5 flex h-9 w-full cursor-pointer items-center justify-center rounded-full border px-3 font-ui text-[0.7rem] font-semibold text-white transition-[filter] duration-200 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--epic-violet-bright)] min-[390px]:text-[0.72rem]";

export function PendingMatchCard({
  match,
  index,
  onStartChat,
}: {
  match: PendingMatch;
  index: number;
  onStartChat: (id: string) => void;
}) {
  const reduced = useReducedMotion();
  const featured = Boolean(match.featured);

  return (
    <motion.article
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -8, scale: 0.985 }}
      transition={{
        delay: 0.04 + index * 0.04,
        duration: 0.26,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="rounded-[1rem] border px-2.5 py-2 min-[390px]:px-3"
      style={{
        borderColor: featured
          ? "color-mix(in oklab, var(--social-blue) 52%, var(--epic-violet-bright))"
          : "color-mix(in oklab, var(--epic-violet) 26%, rgba(255,255,255,0.08))",
        background: featured
          ? "linear-gradient(145deg, color-mix(in oklab, var(--social-blue) 11%, transparent), rgba(8,4,18,0.5))"
          : "rgba(255,255,255,0.022)",
        boxShadow: featured
          ? "0 8px 18px -18px color-mix(in oklab, var(--social-blue) 75%, transparent), inset 0 1px 0 rgba(255,255,255,0.055)"
          : "inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      <div className="flex items-center gap-2.5 min-[390px]:gap-3">
        <img
          src={match.photo}
          alt=""
          className="size-11 shrink-0 rounded-full object-cover min-[390px]:size-12"
          style={{
            boxShadow: featured
              ? "0 0 0 1.5px color-mix(in oklab, var(--social-blue) 58%, var(--epic-violet-bright))"
              : "0 0 0 1.5px color-mix(in oklab, var(--epic-violet-bright) 40%, transparent)",
          }}
          draggable={false}
        />
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <h3 className="truncate font-ui text-[0.9rem] font-semibold leading-none text-white">
              {match.name}
              <span className="font-medium text-white/64">, {match.age}</span>
            </h3>
            {featured && (
              <span
                className="inline-flex shrink-0 items-center justify-center rounded-full px-1.5 py-[3px] font-ui text-[0.5rem] font-semibold uppercase leading-none tracking-[0.04em]"
                style={{
                  color: "color-mix(in oklab, var(--social-blue) 55%, white)",
                  background: "color-mix(in oklab, var(--social-blue) 18%, transparent)",
                  boxShadow:
                    "inset 0 0 0 1px color-mix(in oklab, var(--social-blue) 40%, transparent)",
                }}
              >
                Reciente
              </span>
            )}
          </div>
          <p className="mt-1 truncate font-ui text-[0.7rem] leading-snug text-white/72">
            Hicieron match {match.matchedAgo}
          </p>
          <p className="mt-0.5 truncate font-ui text-[0.66rem] leading-snug text-white/60">
            {match.commonCount} cosas en común
          </p>
        </div>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={() => onStartChat(match.id)}
        className={CTA_CLASS}
        style={{
          touchAction: "manipulation",
          borderColor: "color-mix(in oklab, var(--social-blue) 48%, transparent)",
          background:
            "linear-gradient(100deg, color-mix(in oklab, var(--social-blue) 52%, transparent), color-mix(in oklab, var(--epic-violet) 45%, transparent))",
          boxShadow:
            "0 6px 14px -13px color-mix(in oklab, var(--epic-violet) 65%, transparent), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        Enviar primer mensaje
      </motion.button>
    </motion.article>
  );
}
