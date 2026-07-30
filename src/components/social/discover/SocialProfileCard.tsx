import { motion, useMotionValue, useTransform } from "motion/react";
import { BadgeCheck, Ticket } from "lucide-react";
import { TIER_STYLE, type SocialProfile } from "@/lib/social";
import { VibeTags } from "./VibeTags";
import { ProfileAura } from "./ProfileAura";
import { SwipeOverlay } from "./SwipeOverlay";

export function SocialProfileCard({
  profile,
  interactive,
  depth,
  onDecision,
}: {
  profile: SocialProfile;
  interactive: boolean;
  depth: number;
  onDecision?: (dir: "like" | "pass") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-7, 7]);
  const tone = TIER_STYLE[profile.tier].color;

  return (
    <motion.article
      className="absolute inset-0 overflow-hidden rounded-[1.75rem] border bg-black"
      style={{
        x: interactive ? x : 0,
        rotate: interactive ? rotate : 0,
        borderColor: `color-mix(in oklab, ${tone} 45%, transparent)`,
        boxShadow: `0 24px 60px -24px color-mix(in oklab, ${tone} 85%, transparent)`,
        zIndex: 10 - depth,
        touchAction: interactive ? "pan-y" : undefined,
      }}
      initial={{ scale: 0.94 - depth * 0.04, y: depth * 14, opacity: depth > 1 ? 0 : 1 }}
      animate={{ scale: 1 - depth * 0.05, y: depth * 14, opacity: depth > 1 ? 0 : 1 }}
      exit={{
        x: x.get() > 0 ? 420 : -420,
        opacity: 0,
        transition: { duration: 0.32, ease: "easeIn" },
      }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      drag={interactive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={(_, info) => {
        if (!interactive || !onDecision) return;
        if (info.offset.x > 110) onDecision("like");
        else if (info.offset.x < -110) onDecision("pass");
      }}
    >
      {depth === 0 && <ProfileAura tone={tone} />}

      <img
        src={profile.photo}
        alt={profile.name}
        width={640}
        height={900}
        loading={depth === 0 ? undefined : "lazy"}
        className="absolute inset-0 size-full object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(3,2,10,0.96) 8%, rgba(3,2,10,0.55) 38%, transparent 62%)",
        }}
      />

      <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
        <span
          className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-white backdrop-blur"
          style={{
            borderColor: tone,
            background: `color-mix(in oklab, ${tone} 25%, transparent)`,
            boxShadow: `0 0 18px -6px ${tone}`,
          }}
        >
          <Ticket className="size-3" />
          {profile.tier}
        </span>
        {profile.verified && (
          <span
            className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[0.62rem] text-white/90 backdrop-blur"
            style={{
              borderColor: "color-mix(in oklab, var(--gestionar-green) 60%, transparent)",
              background: "color-mix(in oklab, var(--gestionar-green) 16%, transparent)",
            }}
          >
            <BadgeCheck className="size-3.5" style={{ color: "var(--gestionar-green)" }} />
            Verificado
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-3xl uppercase leading-none text-white">
          {profile.name} <span className="text-white/60">{profile.age}</span>
        </h3>
        <p className="mt-2 text-sm leading-snug text-white/75">“{profile.phrase}”</p>
        <div className="mt-3">
          <VibeTags tags={profile.tags} />
        </div>
        <p
          className="mt-3 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em]"
          style={{ color: "var(--epic-violet-bright)" }}
        >
          <span className="inline-block h-px w-6" style={{ background: tone }} />
          {profile.affinity}
        </p>
      </div>

      {interactive && <SwipeOverlay x={x} />}
    </motion.article>
  );
}