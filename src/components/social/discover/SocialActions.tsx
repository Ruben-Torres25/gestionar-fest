import { motion } from "motion/react";
import { Sparkles, X } from "lucide-react";

const ACTION_TYPE =
  "font-pass tracking-[-0.015em] antialiased [font-feature-settings:'ss01'_on,'kern'_on]";

export function SocialActions({
  onPass,
  onLike,
  onHighlight,
  disabled,
}: {
  onPass: () => void;
  onLike: () => void;
  onHighlight: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="px-5">
      <div className="flex items-stretch gap-2">
        <motion.button
          type="button"
          disabled={disabled}
          onClick={onPass}
          whileTap={{ scale: 0.95 }}
          className={`flex min-h-[48px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[1rem] border bg-black/55 px-3 text-[0.8rem] font-medium text-white/72 backdrop-blur disabled:opacity-40 ${ACTION_TYPE}`}
          style={{
            borderColor: "color-mix(in oklab, var(--epic-violet) 28%, rgba(255,255,255,0.18))",
            boxShadow: "none",
          }}
        >
          <X className="size-3.5 shrink-0 opacity-80" strokeWidth={2.1} />
          <span className="hidden min-[360px]:inline">Paso</span>
        </motion.button>

        <motion.button
          type="button"
          disabled={disabled}
          onClick={onLike}
          whileTap={{ scale: 0.97 }}
          className={`relative flex min-h-[52px] min-w-0 flex-[1.35] items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-[1.05rem] px-3 text-[0.86rem] font-semibold text-white disabled:opacity-40 ${ACTION_TYPE}`}
          style={{
            background:
              "linear-gradient(100deg, var(--epic-violet-deep), var(--epic-violet) 45%, var(--epic-violet-bright))",
            boxShadow:
              "0 12px 28px -16px color-mix(in oklab, var(--epic-violet) 90%, transparent), inset 0 1px 0 rgba(255,255,255,0.28)",
          }}
        >
          <Sparkles className="size-4 shrink-0" strokeWidth={2.1} />
          Me Interesa
        </motion.button>

        <motion.button
          type="button"
          disabled={disabled}
          onClick={onHighlight}
          whileTap={{ scale: 0.95 }}
          className={`flex min-h-[50px] min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-[1rem] border px-2 text-[0.78rem] font-semibold backdrop-blur disabled:opacity-40 min-[390px]:px-2.5 min-[390px]:text-[0.8rem] ${ACTION_TYPE}`}
          style={{
            borderColor: "color-mix(in oklab, var(--social-blue) 70%, transparent)",
            background:
              "linear-gradient(120deg, color-mix(in oklab, var(--social-blue) 28%, transparent), color-mix(in oklab, var(--social-blue) 14%, transparent))",
            boxShadow: "0 0 18px -10px var(--social-blue)",
            color: "color-mix(in oklab, var(--social-blue) 25%, white)",
          }}
        >
          <span className="text-[0.95rem] leading-none" aria-hidden="true">
            ❤️
          </span>
          Super Like
        </motion.button>
      </div>
    </div>
  );
}
