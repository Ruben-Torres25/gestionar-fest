import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { SocialLayout } from "./SocialLayout";
import { SocialHeader } from "./SocialHeader";
import { SocialHero } from "./SocialHero";
import { SocialQuickAccess } from "./SocialQuickAccess";
import { SocialLiveActivity } from "./SocialLiveActivity";

export function SocialHome() {
  return (
    <SocialLayout active="inicio">
      <SocialHeader />
      <SocialHero />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 px-5"
      >
        <motion.div whileTap={{ scale: 0.98 }}>
          <Link
            to="/social/descubrir"
            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl border border-white/25 text-sm font-semibold uppercase tracking-[0.14em] text-white"
            style={{
              background:
                "linear-gradient(110deg, var(--social-blue), var(--epic-violet) 55%, var(--epic-violet-bright))",
              boxShadow:
                "0 0 30px -8px color-mix(in oklab, var(--epic-violet) 85%, transparent), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
          >
            <Sparkles className="size-4" />
            Entrar a descubrir
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
        <p className="mt-2 text-center text-[0.62rem] tracking-wide text-white/35">
          Prototipo visual con asistentes simulados
        </p>
      </motion.div>

      <SocialQuickAccess />
      <SocialLiveActivity />
    </SocialLayout>
  );
}