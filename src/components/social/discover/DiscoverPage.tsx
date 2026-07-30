import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PROFILES, type SocialProfile } from "@/lib/social";
import { SocialLayout } from "../SocialLayout";
import { DiscoverHeader } from "./DiscoverHeader";
import { ProfileStack } from "./ProfileStack";
import { SocialActions } from "./SocialActions";
import { FilterSheet } from "./FilterSheet";
import { ConnectionOverlay } from "./ConnectionOverlay";

export function DiscoverPage() {
  const [index, setIndex] = useState(0);
  const [filters, setFilters] = useState(false);
  const [connection, setConnection] = useState<SocialProfile | null>(null);
  const [pulse, setPulse] = useState(0);

  const current = PROFILES[index];

  const advance = () => setIndex((i) => Math.min(i + 1, PROFILES.length));

  const decide = (dir: "like" | "pass") => {
    if (!current) return;
    if (dir === "like" && current.matches) {
      setConnection(current);
    }
    advance();
  };

  const highlight = () => {
    if (!current) return;
    setPulse((p) => p + 1);
    window.setTimeout(() => decide("like"), 420);
  };

  return (
    <SocialLayout active="descubrir" noScroll>
      <div className="flex h-full flex-col pb-4">
        <DiscoverHeader onFilters={() => setFilters(true)} />

        <div className="relative mt-4 flex flex-1 flex-col">
          <ProfileStack profiles={PROFILES} index={index} onDecision={decide} />

          <AnimatePresence>
            {pulse > 0 && (
              <motion.span
                key={pulse}
                className="pointer-events-none absolute inset-0 z-30 m-auto size-40 rounded-full border-2"
                style={{ borderColor: "var(--social-blue)" }}
                initial={{ scale: 0.3, opacity: 0.9 }}
                animate={{ scale: 2.4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4">
          <SocialActions
            disabled={!current}
            onPass={() => decide("pass")}
            onLike={() => decide("like")}
            onHighlight={highlight}
          />
          <p className="mt-2 px-5 text-center text-[0.6rem] tracking-wide text-white/30">
            Prototipo visual con asistentes simulados
          </p>
        </div>
      </div>

      <FilterSheet open={filters} onClose={() => setFilters(false)} />
      <ConnectionOverlay profile={connection} onClose={() => setConnection(null)} />
    </SocialLayout>
  );
}