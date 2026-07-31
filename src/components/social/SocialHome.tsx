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
        <motion.div
          whileTap={{ scale: 0.975 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
        >
          <Link
            to="/social/descubrir"
            className="group relative flex min-h-[54px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-[1.1rem] text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-white"
            style={{
              background:
                "linear-gradient(100deg, var(--social-blue), var(--epic-violet) 52%, var(--epic-violet-bright))",
              boxShadow:
                "0 16px 40px -18px color-mix(in oklab, var(--epic-violet) 95%, transparent), inset 0 1px 0 rgba(255,255,255,0.32)",
            }}
          >
            <span
              className="pointer-events-none absolute inset-0 opacity-45"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.28), transparent 55%)",
              }}
            />
            <Sparkles className="relative size-4" />
            <span className="relative">Entrar a descubrir</span>
            <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>

      <SocialQuickAccess />
      <SocialLiveActivity />
    </SocialLayout>
  );
}
