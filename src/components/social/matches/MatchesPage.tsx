import { motion, useReducedMotion } from "motion/react";
import { NEW_MATCHES, PREVIOUS_MATCHES } from "@/lib/matches";
import { SocialLayout } from "../SocialLayout";
import { MatchesHeader } from "./MatchesHeader";
import { NewMatchCard } from "./NewMatchCard";
import { PreviousMatchRow } from "./PreviousMatchRow";

export function MatchesPage() {
  return (
    <SocialLayout active="conexiones">
      <div className="pb-12">
        <MatchesHeader />

        <section className="relative mt-8 px-5">
          <div
            className="pointer-events-none absolute -left-8 top-12 h-36 w-36 rounded-full opacity-28 blur-3xl"
            style={{ background: "color-mix(in oklab, var(--epic-violet) 42%, transparent)" }}
          />
          <div
            className="pointer-events-none absolute -right-10 top-24 h-32 w-32 rounded-full opacity-22 blur-3xl"
            style={{ background: "color-mix(in oklab, var(--social-blue) 36%, transparent)" }}
          />

          <SectionHeading
            title="Nuevos matches"
            subtitle="3 conexiones recientes"
            delay={0.08}
          />

          <div className="relative mt-4 space-y-2.5">
            {NEW_MATCHES.map((match, index) => (
              <NewMatchCard key={match.id} match={match} index={index} />
            ))}
          </div>
        </section>

        <section className="mt-12 px-5">
          <SectionHeading title="Conversaciones" subtitle="Chats activos" delay={0.16} />

          <div className="mt-3.5 flex flex-col gap-1.5">
            {PREVIOUS_MATCHES.map((match, index) => (
              <PreviousMatchRow key={match.id} match={match} index={index} />
            ))}
          </div>
        </section>
      </div>
    </SocialLayout>
  );
}

function SectionHeading({
  title,
  subtitle,
  delay,
}: {
  title: string;
  subtitle: string;
  delay: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="flex items-center gap-2.5">
        <motion.span
          initial={reduced ? false : { scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: delay + 0.08, duration: 0.3 }}
          className="h-4 w-[3px] shrink-0 origin-bottom rounded-full"
          style={{
            background:
              "linear-gradient(180deg, var(--epic-violet-bright), var(--social-blue))",
            boxShadow: "0 0 10px -2px var(--epic-violet-bright)",
          }}
        />
        <h2
          className="font-brand text-[1.05rem] uppercase leading-none tracking-[0.14em]"
          style={{
            color: "color-mix(in oklab, white 88%, var(--epic-violet-bright))",
            textShadow: "0 0 18px color-mix(in oklab, var(--epic-violet) 35%, transparent)",
          }}
        >
          {title}
        </h2>
      </div>
      <p className="mt-1.5 mb-2 pl-[13px] font-ui text-[0.68rem] font-medium tracking-[0.02em] text-white/68">
        {subtitle}
      </p>
    </motion.div>
  );
}
