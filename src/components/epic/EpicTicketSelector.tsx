import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  MapPin,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { GaBottomNav } from "@/components/ga/GaBottomNav";
import { setSession } from "@/lib/ga-session";
import {
  MOCK_EVENT_SUMMARY,
  MOCK_TICKET_TIERS,
  type MockTicketTier,
} from "@/mocks/tickets";
import { cn } from "@/lib/utils";

type TierAccent = {
  stroke: string;
  ring: string;
  radio: string;
  selectedBorder: string;
  selectedBg: string;
  selectedGlow: string;
  iconGlow: string;
};

const TIER_ACCENT: Record<string, TierAccent> = {
  general: {
    stroke: "#c7d2fe",
    ring: "rgba(96, 165, 250, 0.55)",
    radio: "#60a5fa",
    selectedBorder: "rgba(96, 165, 250, 0.95)",
    selectedBg: "#12183a",
    selectedGlow:
      "0 0 0 1px rgba(96,165,250,0.4), 0 0 28px rgba(59,130,246,0.5), 0 0 18px rgba(139,92,246,0.25)",
    iconGlow: "0 0 16px rgba(96,165,250,0.55)",
  },
  vip: {
    stroke: "#f5e8ff",
    ring: "rgba(217, 70, 239, 0.6)",
    radio: "#e879f9",
    selectedBorder: "rgba(232, 121, 249, 1)",
    selectedBg: "#1e0f38",
    selectedGlow:
      "0 0 0 1px rgba(232,121,249,0.45), 0 0 32px rgba(192,38,211,0.55), 0 0 20px rgba(168,85,247,0.35)",
    iconGlow: "0 0 18px rgba(232,121,249,0.6)",
  },
  supervip: {
    stroke: "#fef08a",
    ring: "rgba(250, 204, 21, 0.55)",
    radio: "#facc15",
    selectedBorder: "rgba(250, 204, 21, 0.85)",
    selectedBg: "#1c1528",
    selectedGlow:
      "0 0 0 1px rgba(250,204,21,0.35), 0 0 26px rgba(250,204,21,0.4), 0 0 18px rgba(168,85,247,0.28)",
    iconGlow: "0 0 16px rgba(250,204,21,0.5)",
  },
};

function TierIcon({
  icon,
  stroke,
}: {
  icon: MockTicketTier["icon"];
  stroke: string;
}) {
  if (icon === "star") {
    return (
      <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden fill="none">
        <path
          d="M12 3.2 14.2 9.1 20.5 9.4 15.6 13.4 17.2 19.6 12 16.2 6.8 19.6 8.4 13.4 3.5 9.4 9.8 9.1Z"
          stroke={stroke}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "gem") {
    return (
      <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden fill="none">
        <path
          d="M7.2 4.8h9.6L21 9.2 12 20.2 3 9.2 7.2 4.8Z"
          stroke={stroke}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M3.4 9.2h17.2M8.2 4.9 12 9.2 15.8 4.9M12 9.2v11"
          stroke={stroke}
          strokeWidth="1.55"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[22px] -rotate-[28deg]"
      aria-hidden
      fill="none"
    >
      <path
        d="M5.2 8.2h13.6c.7 0 1.2.5 1.2 1.2v1.7c-.9.2-1.5.9-1.5 1.8s.6 1.6 1.5 1.8v1.7c0 .7-.5 1.2-1.2 1.2H5.2c-.7 0-1.2-.5-1.2-1.2v-1.7c.9-.2 1.5-.9 1.5-1.8s-.6-1.6-1.5-1.8V9.4c0-.7.5-1.2 1.2-1.2Z"
        stroke={stroke}
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
      <path
        d="M12 9.1v7.5"
        stroke={stroke}
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeDasharray="1.6 2.1"
      />
    </svg>
  );
}

function TicketOption({
  tier,
  selected,
  onSelect,
  reduceMotion,
}: {
  tier: MockTicketTier;
  selected: boolean;
  onSelect: () => void;
  reduceMotion: boolean | null;
}) {
  const accent = TIER_ACCENT[tier.id] ?? TIER_ACCENT.general;

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={`${tier.name}, ${tier.priceLabel}. ${tier.description}`}
      onClick={onSelect}
      whileTap={{ scale: 0.985 }}
      animate={{
        scale: selected ? 1.01 : 1,
        y: selected ? -1 : 0,
      }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl border px-3.5 py-3.5 text-left outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#e879f9]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05040a]",
        selected ? "" : "bg-[#100e1a] hover:border-white/20",
      )}
      style={
        selected
          ? {
              borderColor: accent.selectedBorder,
              background: accent.selectedBg,
              boxShadow: accent.selectedGlow,
            }
          : {
              borderColor: "rgba(168, 85, 247, 0.22)",
              boxShadow:
                "inset 0 1px 0 rgba(192,132,252,0.06), 0 0 12px rgba(124,58,237,0.08)",
            }
      }
    >
      {selected ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl"
          animate={
            reduceMotion ? { opacity: 0.7 } : { opacity: [0.5, 0.8, 0.5] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              tier.id === "supervip"
                ? "radial-gradient(circle, rgba(250,204,21,0.22) 0%, rgba(168,85,247,0.16) 50%, transparent 72%)"
                : `radial-gradient(circle, ${accent.ring} 0%, transparent 68%)`,
            filter: "blur(12px)",
          }}
        />
      ) : null}

      <span
        className="flex size-12 shrink-0 items-center justify-center rounded-full border"
        style={{
          borderColor: accent.ring,
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.08), #140e24 70%)",
          boxShadow: selected ? accent.iconGlow : `0 0 10px ${accent.ring}`,
        }}
        aria-hidden
      >
        <TierIcon icon={tier.icon} stroke={accent.stroke} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold tracking-tight text-white">
          {tier.name}
        </span>
        <span className="mt-1 block text-[12.5px] leading-snug text-white/68">
          {tier.description}
        </span>
      </span>

      <span className="flex shrink-0 flex-col items-end gap-2">
        <span className="text-[14.5px] font-semibold tabular-nums text-white">
          {tier.priceLabel}
        </span>
        <span
          className="flex size-5 items-center justify-center rounded-full border-2 transition-colors duration-200"
          style={{
            borderColor: selected ? accent.radio : "rgba(255,255,255,0.42)",
            background: selected ? accent.radio : "transparent",
            boxShadow: selected ? `0 0 12px ${accent.ring}` : undefined,
          }}
          aria-hidden
        >
          {selected ? <span className="size-1.5 rounded-full bg-white" /> : null}
        </span>
      </span>
    </motion.button>
  );
}

/** Epic Fest ticket picker — polished premium dark violet UI. */
export function EpicTicketSelector() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedTier = MOCK_TICKET_TIERS.find((t) => t.id === selectedId);
  const canContinue = Boolean(selectedTier);

  function handleContinue() {
    if (!selectedTier) return;
    setSession({ selectedPartyId: "epic-fest", ticketTierId: selectedTier.id });
    void navigate({ to: "/mi-entrada" });
  }

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-black">
      <main
        className="relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden sm:h-[min(100dvh,900px)] sm:rounded-[2rem] sm:border sm:border-white/10"
        style={{
          background:
            "linear-gradient(180deg, #140820 0%, #0a0614 42%, #05040a 100%)",
          boxShadow: "0 0 48px rgba(168,85,247,0.16)",
        }}
      >
        {/* Soft ambient violet — richer, still controlled */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-56"
          style={{
            background:
              "radial-gradient(ellipse 95% 80% at 50% 0%, rgba(168,85,247,0.32), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[40%] h-72 w-[92%] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(192,38,211,0.14), transparent 68%)",
          }}
        />

        <header
          className="relative z-20 grid shrink-0 grid-cols-[2.5rem_1fr_5rem] items-center px-4"
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.55rem)" }}
        >
          <button
            type="button"
            aria-label="Volver"
            onClick={() => void navigate({ to: "/epic" })}
            className="flex size-10 cursor-pointer items-center justify-center text-white transition-opacity duration-200 hover:opacity-80 active:scale-95"
          >
            <ArrowLeft className="size-5" strokeWidth={1.75} />
          </button>

          <h1 className="text-center text-[17px] font-semibold tracking-tight text-white">
            Epic Fest
          </h1>

          <div className="flex items-center justify-end gap-3.5 text-white">
            <button
              type="button"
              aria-label="Notificaciones"
              onClick={() => toast("Notificaciones próximamente")}
              className="cursor-pointer transition-opacity duration-200 hover:opacity-80"
            >
              <Bell className="size-5" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              aria-label="Mensajes"
              onClick={() => toast("Mensajes próximamente")}
              className="cursor-pointer transition-opacity duration-200 hover:opacity-80"
            >
              <MessageSquare className="size-5" strokeWidth={1.6} />
            </button>
          </div>
        </header>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-2 pt-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <section
            className="flex shrink-0 items-center gap-3 rounded-xl border p-3"
            style={{
              borderColor: "rgba(192, 132, 252, 0.45)",
              background: "linear-gradient(120deg, #1a1230 0%, #120c22 100%)",
              boxShadow:
                "0 0 22px rgba(168,85,247,0.22), inset 0 1px 0 rgba(232,121,249,0.18)",
            }}
            aria-label="Resumen del evento"
          >
            <div
              className="size-[68px] shrink-0 overflow-hidden rounded-xl bg-[#1a1528]"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(232,121,249,0.5), 0 0 20px rgba(168,85,247,0.4)",
              }}
            >
              <img
                src={MOCK_EVENT_SUMMARY.imageUrl}
                alt=""
                className="h-full w-full object-cover object-center"
                draggable={false}
              />
            </div>
            <div className="min-w-0">
              <p className="text-[14.5px] font-bold uppercase tracking-[0.04em] text-white">
                {MOCK_EVENT_SUMMARY.name}
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-white/72">
                <MapPin className="size-3.5 shrink-0 text-[#e879f9]" aria-hidden />
                <span className="truncate">{MOCK_EVENT_SUMMARY.venue}</span>
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-[12px] text-white/72">
                <CalendarDays
                  className="size-3.5 shrink-0 text-[#e879f9]"
                  aria-hidden
                />
                <span className="truncate">{MOCK_EVENT_SUMMARY.dateLabel}</span>
              </p>
            </div>
          </section>

          <div className="mt-5 shrink-0">
            <h2 className="text-[1.3rem] font-semibold tracking-tight text-white">
              Seleccioná tu entrada
            </h2>
            <p className="mt-1.5 text-[13px] leading-snug text-white/68">
              Elegí el tipo de entrada que más te convenga
            </p>
          </div>

          <div
            role="radiogroup"
            aria-label="Tipo de entrada"
            className="mt-4 flex shrink-0 flex-col gap-3"
          >
            {MOCK_TICKET_TIERS.map((tier) => (
              <TicketOption
                key={tier.id}
                tier={tier}
                selected={selectedId === tier.id}
                onSelect={() => setSelectedId(tier.id)}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>

          <div className="mt-auto flex shrink-0 flex-col gap-3 pt-5">
            <div
              className="flex items-center gap-3 rounded-2xl border px-4 py-3"
              style={{
                borderColor: "rgba(192, 132, 252, 0.32)",
                background: "linear-gradient(90deg, #18122c 0%, #120e20 100%)",
                boxShadow: "0 0 14px rgba(168,85,247,0.12)",
              }}
            >
              <ShieldCheck
                className="size-5 shrink-0 text-[#e879f9]"
                strokeWidth={1.7}
                aria-hidden
              />
              <div className="min-w-0 leading-tight">
                <p className="text-[13px] font-semibold text-white">
                  Compra 100% segura
                </p>
                <p className="mt-0.5 text-[12px] font-normal text-white/65">
                  Tus datos están protegidos en todo momento.
                </p>
              </div>
            </div>

            <motion.button
              type="button"
              disabled={!canContinue}
              onClick={handleContinue}
              whileTap={canContinue ? { scale: 0.98 } : undefined}
              className={cn(
                "relative flex h-[52px] w-full items-center justify-center overflow-hidden rounded-lg text-[15px] font-semibold tracking-wide text-white transition-[box-shadow,filter] duration-300",
                canContinue ? "cursor-pointer" : "cursor-not-allowed",
              )}
              style={
                canContinue
                  ? {
                      background:
                        "linear-gradient(90deg, #38bdf8 0%, #7c3aed 45%, #e879f9 100%)",
                      boxShadow:
                        "0 0 32px -2px rgba(192,38,211,0.6), 0 0 20px rgba(56,189,248,0.25), 0 8px 18px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.32)",
                    }
                  : {
                      background:
                        "linear-gradient(90deg, #1e3a5f 0%, #3b1d6e 50%, #4c1d75 100%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.75)",
                    }
              }
            >
              {canContinue ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-35"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 45%)",
                  }}
                />
              ) : null}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={selectedTier?.id ?? "none"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  {selectedTier
                    ? `Continuar con ${selectedTier.name}`
                    : "Seleccioná una entrada"}
                </motion.span>
              </AnimatePresence>
              {canContinue ? (
                <ArrowRight
                  className="absolute right-5 size-4"
                  strokeWidth={2.25}
                  aria-hidden
                />
              ) : null}
            </motion.button>
          </div>
        </div>

        <div
          className="relative z-20 shrink-0 px-3.5 pt-1"
          style={{
            paddingBottom: "calc(env(safe-area-inset-bottom) + 0.65rem)",
            background:
              "linear-gradient(to top, rgba(5,4,10,0.95) 55%, transparent)",
          }}
        >
          <GaBottomNav active="entradas" />
        </div>
      </main>
    </div>
  );
}
