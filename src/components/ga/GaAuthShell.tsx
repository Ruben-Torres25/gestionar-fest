import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { GA_FONDO_LOGIN } from "@/lib/ga-assets";
import { cn } from "@/lib/utils";
import { GaLogo } from "./GaLogo";

type GaAuthShellProps = {
  children: ReactNode;
  className?: string;
};

export function GaAuthShell({ children, className }: GaAuthShellProps) {
  const reduced = useReducedMotion();

  return (
    <div className="flex min-h-[100dvh] w-full max-w-[100vw] items-center justify-center overflow-x-hidden bg-black">
      <main
        className={cn(
          "relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden overflow-x-hidden bg-black sm:h-[min(100dvh,900px)] sm:rounded-[2rem] sm:border sm:border-white/10",
          className,
        )}
      >
        <img
          src={GA_FONDO_LOGIN}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-bottom"
          draggable={false}
        />
        {/* Soft top vignette so logo/form stay readable */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 28%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        <div
          className="relative z-10 flex flex-1 flex-col px-5"
          style={{
            paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)",
            paddingBottom: "calc(env(safe-area-inset-bottom) + 1.75rem)",
          }}
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-1 flex-col"
          >
            <div className="flex justify-center pt-3">
              <GaLogo />
            </div>
            <div className="mt-8 flex flex-1 flex-col">{children}</div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
