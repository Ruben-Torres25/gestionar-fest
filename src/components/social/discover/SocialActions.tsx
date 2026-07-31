import { motion } from "motion/react";
import { Sparkles, X, Zap } from "lucide-react";

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
          className="flex min-h-[54px] shrink-0 items-center gap-2 whitespace-nowrap rounded-[1.1rem] border border-white/14 bg-white/[0.05] px-3.5 font-display text-[0.68rem] uppercase tracking-[0.18em] text-white/75 backdrop-blur disabled:opacity-40"
        >
          <X className="size-4 shrink-0" />
          <span className="hidden min-[360px]:inline">Paso</span>
        </motion.button>

        <motion.button
          type="button"
          disabled={disabled}
          onClick={onLike}
          whileTap={{ scale: 0.97 }}
          className="relative flex min-h-[54px] min-w-0 flex-1 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-[1.1rem] px-2 font-display text-[0.72rem] uppercase tracking-[0.14em] text-white disabled:opacity-40 min-[360px]:text-[0.75rem] min-[360px]:tracking-[0.18em]"
          style={{
            background:
              "linear-gradient(100deg, var(--epic-violet-deep), var(--epic-violet) 48%, var(--epic-violet-bright))",
            boxShadow:
              "0 16px 36px -18px color-mix(in oklab, var(--epic-violet) 100%, transparent), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          <Sparkles className="size-4 shrink-0" />
          Me interesa
        </motion.button>

        <motion.button
          type="button"
          disabled={disabled}
          onClick={onHighlight}
          whileTap={{ scale: 0.95 }}
          className="flex min-h-[54px] shrink-0 items-center gap-2 whitespace-nowrap rounded-[1.1rem] border px-3.5 font-display text-[0.68rem] uppercase tracking-[0.16em] backdrop-blur disabled:opacity-40"
          style={{
            borderColor: "color-mix(in oklab, var(--social-blue) 65%, transparent)",
            background: "color-mix(in oklab, var(--social-blue) 16%, transparent)",
            boxShadow: "0 0 24px -10px var(--social-blue)",
            color: "color-mix(in oklab, var(--social-blue) 45%, white)",
          }}
        >
          <Zap className="size-4 shrink-0" style={{ color: "var(--social-blue)" }} />
          <span className="hidden min-[360px]:inline">Super Like</span>
        </motion.button>
      </div>
    </div>
  );
}
