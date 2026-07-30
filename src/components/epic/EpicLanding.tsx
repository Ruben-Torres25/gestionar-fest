import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { EpicScene } from "./EpicScene";
import { EpicAmbientEffects } from "./EpicAmbientEffects";
import { EpicNavbar } from "./EpicNavbar";
import { EpicMobileMenu } from "./EpicMobileMenu";
import { EpicCountdown } from "./EpicCountdown";
import { EpicHeroContent } from "./EpicHeroContent";
import { EpicCTA } from "./EpicCTA";

export function EpicLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tapped, setTapped] = useState(false);

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-[#040208]">
      <main
        className="relative h-[100dvh] w-full max-w-[430px] overflow-hidden bg-[#040208] sm:h-[min(100dvh,900px)] sm:rounded-[2rem] sm:border sm:border-white/10"
        onPointerDown={() => setTapped(true)}
        onPointerUp={() => setTapped(false)}
        onPointerCancel={() => setTapped(false)}
      >
        <EpicScene tapped={tapped} />
        <EpicAmbientEffects />

        <div
          className="pointer-events-none relative z-20 flex h-full flex-col px-5"
          style={{
            paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
            paddingBottom: "calc(env(safe-area-inset-bottom) + 1.25rem)",
          }}
        >
          <EpicNavbar onOpenMenu={() => setMenuOpen(true)} />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7, ease: "easeOut" }}
            className="mt-7"
          >
            <EpicCountdown />
          </motion.div>

          <div className="mt-8">
            <EpicHeroContent />
          </div>

          <div className="pointer-events-auto mt-auto flex justify-center">
            <EpicCTA />
          </div>

          <div className="pointer-events-auto mt-3 flex justify-center">
            <Link
              to="/social"
              className="text-[0.6rem] uppercase tracking-[0.24em] text-white/35 underline-offset-4 hover:text-white/60"
            >
              Ver GestionAR Social
            </Link>
          </div>
        </div>

        <EpicMobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </main>
    </div>
  );
}