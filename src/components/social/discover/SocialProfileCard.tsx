import { motion, useMotionValue, useTransform } from "motion/react";
import { BadgeCheck, Ticket } from "lucide-react";
import { TIER_STYLE, type SocialProfile } from "@/lib/social";
import { VibeTags } from "./VibeTags";
import { ProfileAura } from "./ProfileAura";
import { SwipeOverlay } from "./SwipeOverlay";
import { AffinityPulse } from "./AffinityPulse";

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
  const rotate = useTransform(x, [-220, 220], [-5, 5]);
  const tone = TIER_STYLE[profile.tier].color;

  return (
    <motion.article
      className="absolute inset-0 overflow-hidden rounded-[1.85rem] border bg-black"
      style={{
        x: interactive ? x : 0,
        rotate: interactive ? rotate : 0,
        borderColor: `color-mix(in oklab, ${tone} 38%, rgba(255,255,255,0.12))`,
        boxShadow: `0 28px 64px -30px color-mix(in oklab, ${tone} 85%, transparent), inset 0 1px 0 rgba(255,255,255,0.12)`,
        zIndex: 10 - depth,
        touchAction: interactive ? "pan-y" : undefined,
      }}
      initial={{ scale: 0.94 - depth * 0.04, y: depth * 12, opacity: depth > 1 ? 0 : 1 }}
      animate={{ scale: 1 - depth * 0.045, y: depth * 12, opacity: depth > 1 ? 0 : 1 }}
      exit={{
        x: x.get() > 0 ? 460 : -460,
        opacity: 0,
        transition: { duration: 0.3, ease: "easeIn" },
      }}
      transition={{ type: "spring", stiffness: 240, damping: 30 }}
      drag={interactive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.55}
      dragTransition={{ bounceStiffness: 320, bounceDamping: 34 }}
      onDragEnd={(_, info) => {
        if (!interactive || !onDecision) return;
        const power = info.offset.x + info.velocity.x * 0.12;
        if (power > 120) onDecision("like");
        else if (power < -120) onDecision("pass");
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
            "linear-gradient(to top, rgba(4,2,12,0.97) 4%, rgba(4,2,12,0.82) 22%, rgba(4,2,12,0.28) 46%, transparent 64%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{ background: "linear-gradient(to bottom, rgba(4,2,12,0.55), transparent)" }}
      />

      <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-wrap items-center gap-2">
        <span
          className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-ui text-[0.62rem] font-medium tracking-[0.02em] text-white/95 backdrop-blur"
          style={{
            borderColor: `color-mix(in oklab, ${tone} 42%, transparent)`,
            background: `color-mix(in oklab, ${tone} 14%, rgba(0,0,0,0.42))`,
            boxShadow: `0 0 10px -8px ${tone}`,
          }}
        >
          <Ticket className="size-2.5 opacity-80" />
          {profile.tier}
        </span>
        {profile.verified && (
          <span
            className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-ui text-[0.62rem] font-medium text-white/90 backdrop-blur"
            style={{
              borderColor: "color-mix(in oklab, var(--gestionar-green) 35%, transparent)",
              background: "color-mix(in oklab, var(--gestionar-green) 10%, rgba(0,0,0,0.4))",
            }}
          >
            <BadgeCheck className="size-3" style={{ color: "var(--gestionar-green)" }} />
            Verificado
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 px-4 pb-3.5 pt-2">
        <h3 className="font-brand text-[1.65rem] uppercase leading-none tracking-[0.02em]">
          <span className="text-white">{profile.name}</span>
          <span className="font-ui text-[1.05rem] font-medium normal-case tracking-normal text-white/45">
            , {profile.age}
          </span>
        </h3>
        <p className="mt-2 max-w-[32ch] font-ui text-[0.8rem] font-normal leading-5 text-white/78">
          “{profile.phrase}”
        </p>
        <div className="mt-2">
          <VibeTags tags={profile.tags} />
        </div>
        <div className="mt-2">
          <AffinityPulse label={profile.affinity} tone={tone} />
        </div>
      </div>

      {interactive && <SwipeOverlay x={x} />}
    </motion.article>
  );
}
