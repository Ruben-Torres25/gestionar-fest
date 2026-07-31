import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
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
  selectedGlow: string;
  iconGlow: string;
};

/** Electric accents per tier — color lives on border + icon, not card fill. */
const TIER_ACCENT: Record<string, TierAccent> = {
  general: {
    stroke: "#5b9fd4",
    ring: "rgba(59, 130, 246, 0.52)",
    radio: "#3b82f6",
    selectedBorder: "#3b82f6",
    selectedGlow:
      "0 0 0 1px rgba(59,130,246,0.38), 0 0 20px rgba(37,99,235,0.4)",
    iconGlow: "0 0 13px rgba(59,130,246,0.45)",
  },
  vip: {
    stroke: "#c084fc",
    ring: "rgba(147, 51, 234, 0.52)",
    radio: "#9333ea",
    selectedBorder: "#9333ea",
    selectedGlow:
      "0 0 0 1px rgba(147,51,234,0.38), 0 0 20px rgba(126,34,206,0.4)",
    iconGlow: "0 0 13px rgba(147,51,234,0.45)",
  },
  supervip: {
    stroke: "#e8c547",
    ring: "rgba(201, 162, 39, 0.55)",
    radio: "#c9a227",
    selectedBorder: "#c9a227",
    selectedGlow:
      "0 0 0 1px rgba(201,162,39,0.42), 0 0 20px rgba(184,134,11,0.4)",
    iconGlow: "0 0 13px rgba(201,162,39,0.48)",
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

  /* Ticket outline, tilted like the mock */
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
}: {
  tier: MockTicketTier;
  selected: boolean;
  onSelect: () => void;
}) {
  const accent = TIER_ACCENT[tier.id] ?? TIER_ACCENT.general;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-xl border bg-[#0e0c16] px-3 py-3 text-left transition-[border-color,box-shadow,background-color,transform] duration-200 active:scale-[0.99]",
        selected ? "bg-[#14101f]" : "border-white/[0.08] hover:border-white/16",
      )}
      style={
        selected
          ? {
              borderColor: accent.selectedBorder,
              boxShadow: accent.selectedGlow,
            }
          : undefined
      }
    >
      <span
        className="flex size-12 shrink-0 items-center justify-center rounded-full border bg-[#120e1c]"
        style={{
          borderColor: selected ? accent.ring : `${accent.stroke}73`,
          boxShadow: selected ? accent.iconGlow : undefined,
        }}
        aria-hidden
      >
        <TierIcon icon={tier.icon} stroke={accent.stroke} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[14.5px] font-semibold text-white">{tier.name}</span>
        <span className="mt-0.5 block text-[11.5px] leading-snug text-white/42">
          {tier.description}
        </span>
      </span>

      <span className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="text-[13.5px] font-semibold tabular-nums text-white">
          {tier.priceLabel}
        </span>
        <span
          className="flex size-[18px] items-center justify-center rounded-full border-[2px] transition-colors duration-200"
          style={
            selected
              ? {
                  borderColor: accent.radio,
                  background: accent.radio,
                  boxShadow: `0 0 10px ${accent.ring}`,
                }
              : {
                  borderColor: "rgba(255,255,255,0.35)",
                  background: "transparent",
                }
          }
          aria-hidden
        >
          {selected ? <span className="size-1.5 rounded-full bg-white" /> : null}
        </span>
      </span>
    </button>
  );
}

/** Epic Fest ticket picker — dark violet UI matching the purchase mock. */
export function EpicTicketSelector() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(MOCK_TICKET_TIERS[0]?.id ?? "general");

  function handleContinue() {
    setSession({ selectedPartyId: "epic-fest", ticketTierId: selectedId });
    void navigate({ to: "/mi-entrada" });
  }

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-black">
      <main className="relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden bg-[#05040a] sm:h-[min(100dvh,900px)] sm:rounded-[2rem] sm:border sm:border-white/10 sm:shadow-[0_0_40px_rgba(124,58,237,0.12)]">
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

        <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-2 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <section
            className="relative flex shrink-0 items-stretch overflow-hidden rounded-xl border border-white/[0.08] bg-[#0e0c16]"
            aria-label="Resumen del evento"
          >
            <div className="relative z-10 flex min-w-0 flex-1 items-center gap-3 p-3 pr-2">
              <div
                className="size-[68px] shrink-0 overflow-hidden rounded-xl bg-[#120e1c]"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(168,85,247,0.35), 0 0 18px rgba(168,85,247,0.4)",
                }}
              >
                <img
                  src={MOCK_EVENT_SUMMARY.logoUrl}
                  alt=""
                  className="h-full w-full object-contain p-1.5"
                  draggable={false}
                />
              </div>
              <div className="min-w-0">
                <p className="text-[14.5px] font-bold uppercase tracking-[0.04em] text-white">
                  {MOCK_EVENT_SUMMARY.name}
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-[11.5px] text-white/48">
                  <MapPin className="size-3.5 shrink-0 text-[#c084fc]" aria-hidden />
                  <span className="truncate">{MOCK_EVENT_SUMMARY.venue}</span>
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-white/48">
                  <CalendarDays className="size-3.5 shrink-0 text-[#c084fc]" aria-hidden />
                  <span className="truncate">{MOCK_EVENT_SUMMARY.dateLabel}</span>
                </p>
              </div>
            </div>

            <div className="relative w-[42%] max-w-[150px] shrink-0 self-stretch min-h-[96px]">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10"
                style={{
                  background:
                    "linear-gradient(90deg, #0e0c16 0%, rgba(14,12,22,0) 100%)",
                }}
                aria-hidden
              />
              <img
                src={MOCK_EVENT_SUMMARY.bearUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "58% 8%" }}
                draggable={false}
              />
            </div>
          </section>

          <div className="mt-4 shrink-0">
            <h2 className="text-[1.2rem] font-semibold tracking-tight text-white">
              Seleccioná tu entrada
            </h2>
            <p className="mt-1 text-[12.5px] text-white/42">
              Elegí el tipo de entrada que más te divierta.
            </p>
          </div>

          <div
            role="radiogroup"
            aria-label="Tipo de entrada"
            className="mt-3 flex shrink-0 flex-col gap-2.5"
          >
            {MOCK_TICKET_TIERS.map((tier) => (
              <TicketOption
                key={tier.id}
                tier={tier}
                selected={selectedId === tier.id}
                onSelect={() => setSelectedId(tier.id)}
              />
            ))}
          </div>

          <div className="mt-auto flex shrink-0 flex-col gap-3 pt-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#12151c] px-4 py-3.5">
              <ShieldCheck
                className="size-5 shrink-0 text-[#a855f7]"
                strokeWidth={1.7}
                aria-hidden
              />
              <div className="min-w-0 leading-tight">
                <p className="text-[13px] font-semibold text-white/90">Compra 100% segura</p>
                <p className="mt-0.5 text-[12px] font-normal text-white/45">
                  Tus datos están protegidos en todo momento.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleContinue}
              className="relative flex h-[50px] w-full cursor-pointer items-center justify-center rounded-lg text-[15px] font-semibold text-white transition-transform duration-200 active:scale-[0.98]"
              style={{
                background: "linear-gradient(90deg, #1d8cff 0%, #5b2be0 50%, #9b37f0 100%)",
                boxShadow:
                  "0 0 28px -4px rgba(91,43,224,0.65), inset 0 1px 0 rgba(255,255,255,0.22)",
              }}
            >
              Continuar
              <ArrowRight
                className="absolute right-5 size-4"
                strokeWidth={2.25}
                aria-hidden
              />
            </button>
          </div>
        </div>

        <div
          className="relative z-20 shrink-0 px-3.5"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.65rem)" }}
        >
          <GaBottomNav active="entradas" />
        </div>
      </main>
    </div>
  );
}
