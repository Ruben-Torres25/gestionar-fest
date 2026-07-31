import { motion, useReducedMotion } from "motion/react";
import { MessageCircle, Zap } from "lucide-react";
import type { NewMatch } from "@/lib/matches";

const RING: Record<NewMatch["ring"], string> = {
  blue: "var(--social-blue)",
  violet: "var(--epic-violet-bright)",
};

export function NewMatchCard({
  match,
  index,
}: {
  match: NewMatch;
  index: number;
}) {
  const reduced = useReducedMotion();
  const ring = RING[match.ring];
  const isPrimary = index === 0;

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 11, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.12 + index * 0.055, duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[1.2rem] border px-3 py-2.5 min-[360px]:px-3.5"
      style={{
        borderColor: isPrimary
          ? "color-mix(in oklab, var(--social-blue) 34%, rgba(255,255,255,0.1))"
          : "color-mix(in oklab, var(--epic-violet) 22%, rgba(255,255,255,0.08))",
        background: isPrimary
          ? "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(12,8,28,0.72) 58%, rgba(8,4,18,0.78))"
          : "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(10,6,20,0.62) 55%, rgba(6,3,14,0.7))",
        boxShadow: isPrimary
          ? `0 16px 34px -24px color-mix(in oklab, ${ring} 78%, transparent), inset 0 1px 0 rgba(255,255,255,0.08)`
          : `0 12px 28px -26px color-mix(in oklab, ${ring} 42%, transparent), inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      <div className="flex items-center gap-2.5 min-[360px]:gap-3">
        <div className="relative shrink-0">
          <img
            src={match.photo}
            alt={match.name}
            className="size-12 rounded-full object-cover min-[390px]:size-[3.15rem]"
            style={{
              boxShadow: isPrimary
                ? `0 0 0 1.5px color-mix(in oklab, ${ring} 78%, transparent), 0 0 11px -5px ${ring}`
                : `0 0 0 1.5px color-mix(in oklab, ${ring} 62%, transparent), 0 0 10px -6px ${ring}`,
            }}
            draggable={false}
          />
          {match.online && (
            <span
              className="absolute bottom-0.5 right-0.5 size-2 rounded-full border-2 border-[#0a0614]"
              style={{
                background: "var(--gestionar-green)",
                boxShadow: "0 0 6px var(--gestionar-green)",
              }}
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="truncate font-ui text-[0.92rem] font-semibold leading-none text-white">
              {match.name}
            </h3>
            <motion.span
              animate={
                reduced ? undefined : { opacity: [0.78, 1, 0.78], scale: [1, 1.015, 1] }
              }
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center rounded-full px-1.5 py-[2px] font-ui text-[0.55rem] font-semibold uppercase tracking-[0.05em]"
              style={{
                color: "color-mix(in oklab, var(--epic-violet-bright) 80%, white)",
                background: "color-mix(in oklab, var(--epic-violet) 20%, transparent)",
                boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--epic-violet) 40%, transparent)",
              }}
            >
              Nuevo
            </motion.span>
          </div>

          <p className="mt-1 font-ui text-[0.7rem] font-normal leading-snug text-white/55">
            {match.status}
            {match.statusAccent ? (
              <>
                {" "}
                <span className="font-medium text-epic-violet-bright/90">{match.statusAccent}</span>
              </>
            ) : null}
          </p>

          <div className="mt-1.5 inline-flex max-w-full items-center gap-1 rounded-full border border-white/[0.09] bg-black/28 px-2 py-0.5">
            {match.tagIcon === "zap" ? (
              <Zap className="size-2.5 shrink-0 text-epic-violet-bright/75" />
            ) : (
              <MessageCircle className="size-2.5 shrink-0 text-social-blue/80" />
            )}
            <span className="truncate font-ui text-[0.58rem] font-medium text-white/62">{match.tag}</span>
          </div>
        </div>

        <MessageCta />
      </div>
    </motion.article>
  );
}

function MessageCta() {
  return (
    <button
      type="button"
      className="min-h-11 min-w-[6.75rem] shrink-0 cursor-pointer rounded-full px-3 font-ui text-[0.66rem] font-semibold text-white transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.97] sm:min-w-[7.25rem]"
      style={{
        background:
          "linear-gradient(100deg, var(--social-blue) 0%, color-mix(in oklab, var(--social-blue) 30%, var(--epic-violet)) 48%, var(--epic-violet-bright))",
        boxShadow:
          "0 8px 18px -14px color-mix(in oklab, var(--epic-violet) 75%, transparent), inset 0 1px 0 rgba(255,255,255,0.22)",
      }}
    >
      Enviar mensaje
    </button>
  );
}
