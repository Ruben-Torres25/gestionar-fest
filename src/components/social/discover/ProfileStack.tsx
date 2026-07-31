import { AnimatePresence } from "motion/react";
import type { SocialProfile } from "@/lib/social";
import { SocialProfileCard } from "./SocialProfileCard";

export function ProfileStack({
  profiles,
  index,
  onDecision,
}: {
  profiles: SocialProfile[];
  index: number;
  onDecision: (dir: "like" | "pass") => void;
}) {
  const visible = profiles.slice(index, index + 3);

  return (
    <div className="relative mx-5 mb-1 flex-1">
      {visible.length === 0 ? (
        <div className="flex h-full items-center justify-center rounded-[1.75rem] border border-white/10 bg-white/[0.03] px-8 text-center">
          <p className="text-sm text-white/60">
            Viste a todas las personas activas por ahora. Volvé más tarde: la noche recién empieza.
          </p>
        </div>
      ) : (
        <AnimatePresence initial={false}>
          {visible
            .slice()
            .reverse()
            .map((p) => {
              const depth = visible.indexOf(p);
              return (
                <SocialProfileCard
                  key={p.id}
                  profile={p}
                  depth={depth}
                  interactive={depth === 0}
                  onDecision={onDecision}
                />
              );
            })}
        </AnimatePresence>
      )}
    </div>
  );
}