import { motion, useReducedMotion } from "motion/react";

export type MessagesTab = "conversations" | "pending";

const SLIDER_TRANSITION = {
  type: "tween" as const,
  duration: 0.22,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

const ACTIVE_GRADIENT =
  "linear-gradient(100deg, var(--social-blue) 0%, color-mix(in oklab, var(--social-blue) 28%, var(--epic-violet)) 48%, var(--epic-violet-bright))";

const ACTIVE_GLOW =
  "0 6px 14px -12px color-mix(in oklab, var(--epic-violet) 70%, transparent), inset 0 1px 0 rgba(255,255,255,0.18)";

export function MessagesTabs({
  active,
  onChange,
  pendingCount,
}: {
  active: MessagesTab;
  onChange: (tab: MessagesTab) => void;
  pendingCount: number;
}) {
  const reduced = useReducedMotion();
  const activeIndex = active === "conversations" ? 0 : 1;

  return (
    <div
      className="relative mx-5 mt-3 grid h-10 grid-cols-2 items-stretch gap-0 rounded-full border border-white/10 bg-black/45 p-1"
      role="tablist"
      aria-label="Filtro de mensajes"
    >
      <div className="pointer-events-none absolute inset-1" aria-hidden="true">
        <motion.span
          className="absolute inset-y-0 left-0 w-1/2 rounded-full"
          initial={false}
          animate={{ x: activeIndex === 0 ? "0%" : "100%" }}
          transition={reduced ? { duration: 0 } : SLIDER_TRANSITION}
          style={{
            background: ACTIVE_GRADIENT,
            boxShadow: ACTIVE_GLOW,
          }}
        />
      </div>

      <TabButton
        active={active === "conversations"}
        onClick={() => onChange("conversations")}
        label="Mis conversaciones"
      />
      <TabButton
        active={active === "pending"}
        onClick={() => onChange("pending")}
        label={`Pendientes (${pendingCount})`}
      />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="relative z-10 flex h-full cursor-pointer items-center justify-center rounded-full px-2 font-ui text-[0.7rem] font-semibold tracking-[0.01em] transition-colors duration-200 active:scale-[0.985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--epic-violet-bright)]"
      style={{
        touchAction: "manipulation",
        color: active ? "#ffffff" : "rgba(255,255,255,0.62)",
        background: "transparent",
      }}
    >
      <span className="truncate">{label}</span>
    </button>
  );
}
