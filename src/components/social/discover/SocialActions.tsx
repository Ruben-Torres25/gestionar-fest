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
    <div className="flex items-center gap-2.5 px-5">
      <motion.button
        type="button"
        disabled={disabled}
        onClick={onPass}
        whileTap={{ scale: 0.95 }}
        className="flex min-h-[52px] items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-4 text-xs uppercase tracking-[0.16em] text-white/70 backdrop-blur disabled:opacity-40"
      >
        <X className="size-4" />
        Paso
      </motion.button>

      <motion.button
        type="button"
        disabled={disabled}
        onClick={onLike}
        whileTap={{ scale: 0.97 }}
        className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl border border-white/25 text-sm font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-40"
        style={{
          background:
            "linear-gradient(110deg, var(--epic-violet-deep), var(--epic-violet) 50%, var(--epic-violet-bright))",
          boxShadow:
            "0 0 28px -8px color-mix(in oklab, var(--epic-violet) 90%, transparent), inset 0 1px 0 rgba(255,255,255,0.22)",
        }}
      >
        <Sparkles className="size-4" />
        Me interesa
      </motion.button>

      <motion.button
        type="button"
        disabled={disabled}
        onClick={onHighlight}
        whileTap={{ scale: 0.95 }}
        aria-label="Destacar interés"
        className="relative flex size-[52px] items-center justify-center rounded-2xl border backdrop-blur disabled:opacity-40"
        style={{
          borderColor: "color-mix(in oklab, var(--social-blue) 70%, transparent)",
          background: "color-mix(in oklab, var(--social-blue) 18%, transparent)",
          boxShadow: "0 0 22px -8px var(--social-blue)",
        }}
      >
        <Zap className="size-5" style={{ color: "var(--social-blue)" }} />
      </motion.button>
    </div>
  );
}