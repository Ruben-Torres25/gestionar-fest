import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Crown,
  Gem,
  IdCard,
  RefreshCw,
  Scan,
  Ticket,
} from "lucide-react";

import { getSession } from "@/lib/ga-session";
import {
  getTicketTier,
  MOCK_TICKET_HOLDER,
  type MockTicketTier,
} from "@/mocks/tickets";
import { cn } from "@/lib/utils";
import { GaBottomNav } from "@/components/ga/GaBottomNav";
import { MockQrCode } from "./MockQrCode";

function TierBadgeIcon({ icon }: { icon: MockTicketTier["icon"] }) {
  const cls = "size-4 text-[#c4a0f5]";
  if (icon === "star") return <Crown className={cls} fill="currentColor" strokeWidth={0} />;
  if (icon === "gem") return <Gem className={cls} strokeWidth={1.7} />;
  return <Ticket className={cls} strokeWidth={1.7} />;
}

function AccessOnceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none">
      <path
        d="M4.5 7h15c.8 0 1.4.6 1.4 1.4v1.5c-1 .2-1.7 1-1.7 2s.7 1.8 1.7 2v1.5c0 .8-.6 1.4-1.4 1.4h-15c-.8 0-1.4-.6-1.4-1.4v-1.5c1-.2 1.7-1 1.7-2s-.7-1.8-1.7-2V8.4C3.1 7.6 3.7 7 4.5 7Z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <text
        x="12"
        y="14.4"
        textAnchor="middle"
        fill="currentColor"
        fontSize="8"
        fontWeight="600"
        fontFamily="var(--font-pass), system-ui, sans-serif"
      >
        1
      </text>
    </svg>
  );
}

const GUIDELINES = [
  { icon: "scan" as const, text: "Mostrá este código en el ingreso" },
  { icon: "refresh" as const, text: "Se actualiza automáticamente por tu seguridad" },
  { icon: "id" as const, text: "Presentá tu DNI al ingresar" },
  { icon: "access" as const, text: "1 acceso por entrada" },
];

function GuidelineIcon({ kind }: { kind: (typeof GUIDELINES)[number]["icon"] }) {
  const cls = "size-[17px] shrink-0 text-[#b57aff]";
  if (kind === "scan") return <Scan className={cls} strokeWidth={1.65} />;
  if (kind === "refresh") return <RefreshCw className={cls} strokeWidth={1.65} />;
  if (kind === "id") return <IdCard className={cls} strokeWidth={1.65} />;
  return <AccessOnceIcon className={cls} />;
}

function InfoRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-6 py-[11px]",
        !last && "border-b border-white/[0.07]",
      )}
    >
      <span className="shrink-0 text-[13.5px] font-normal text-white/55">{label}</span>
      <span className="min-w-0 text-right text-[14.5px] font-medium tracking-normal text-white">
        {value}
      </span>
    </div>
  );
}

/** Premium digital pass — Epic Fest identity, wallet-like composition. */
export function EpicTicketPass() {
  const navigate = useNavigate();
  const session = getSession();
  const tier = getTicketTier(session.ticketTierId);

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-[#02010a]">
      <main
        className="font-pass relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden sm:h-[min(100dvh,860px)] sm:rounded-[1.75rem] sm:border sm:border-white/10"
        style={{
          background:
            "linear-gradient(168deg, #11081d 0%, #07040f 45%, #04030c 100%)",
        }}
      >
        {/* Soft ambient lights */}
        <div
          aria-hidden
          className="pass-glow-corner pointer-events-none absolute -right-14 -top-8 size-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(147,51,234,0.28) 0%, rgba(88,28,135,0.1) 48%, transparent 72%)",
            filter: "blur(10px)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(to top, rgba(76,29,149,0.14), transparent)",
          }}
        />

        <header
          className="relative z-20 shrink-0 px-5 sm:px-6"
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.35rem)" }}
        >
          <div className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center">
            <button
              type="button"
              aria-label="Volver"
              onClick={() => void navigate({ to: "/entradas" })}
              className="flex size-9 cursor-pointer items-center justify-center text-white transition-opacity duration-200 hover:opacity-80 active:scale-95"
            >
              <ArrowLeft className="size-[1.15rem]" strokeWidth={1.7} />
            </button>

            <div className="flex flex-col items-center">
              <h1 className="text-center text-[1.35rem] font-semibold leading-tight tracking-tight text-white sm:text-[1.45rem]">
                Entrada Epic Fest
              </h1>
            </div>

            <span aria-hidden />
          </div>

          <div
            aria-hidden
            className="mt-3 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(168,85,247,0.35) 18%, rgba(255,255,255,0.14) 50%, rgba(168,85,247,0.35) 82%, transparent)",
            }}
          />
        </header>

        <div
          className="relative z-10 flex min-h-0 flex-1 flex-col justify-start overflow-hidden px-5 sm:px-6"
          style={{
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
          }}
        >
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <div
                aria-hidden
                className="pass-glow-qr absolute size-[min(48vw,220px)] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(168,85,247,0.22) 0%, rgba(124,58,237,0.08) 45%, transparent 70%)",
                  filter: "blur(8px)",
                }}
              />
              <div
                className="relative"
                style={{
                  borderRadius: 16,
                  boxShadow:
                    "0 0 22px rgba(147,51,234,0.2), 0 0 44px rgba(88,28,135,0.1)",
                }}
              >
                <MockQrCode
                  value={`EPIC-FEST|${MOCK_TICKET_HOLDER.ticketId}|${tier.id}`}
                  className="aspect-square w-[min(40vw,176px)] max-w-[176px]"
                />
              </div>
            </div>

            <div
              className="mt-3.5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
              style={{
                border: "1px solid rgba(168, 85, 247, 0.42)",
                background: "rgba(88, 28, 135, 0.14)",
              }}
            >
              <TierBadgeIcon icon={tier.icon} />
              <span className="text-[13.5px] font-medium tracking-normal text-white">
                {tier.badgeLabel}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <section
              className="rounded-[14px] px-4"
              style={{
                border: "1px solid rgba(139, 92, 246, 0.24)",
                background: "rgba(14, 10, 28, 0.68)",
                backdropFilter: "blur(10px)",
              }}
              aria-label="Datos del titular"
            >
              <InfoRow label="Titular" value={MOCK_TICKET_HOLDER.name} />
              <InfoRow label="DNI" value={MOCK_TICKET_HOLDER.dni} />
              <InfoRow label="ID" value={MOCK_TICKET_HOLDER.ticketId} last />
            </section>

            <section
              className="rounded-[14px] px-4"
              style={{
                border: "1px solid rgba(139, 92, 246, 0.24)",
                background: "rgba(14, 10, 28, 0.68)",
                backdropFilter: "blur(10px)",
              }}
              aria-label="Aclaraciones"
            >
              {GUIDELINES.map((item, index) => {
                const last = index === GUIDELINES.length - 1;
                return (
                  <div
                    key={item.text}
                    className={cn(
                      "flex items-center gap-3 py-[11px]",
                      !last && "border-b border-white/[0.06]",
                    )}
                  >
                    <GuidelineIcon kind={item.icon} />
                    <p className="text-[13px] leading-snug font-normal text-white/88">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </section>
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
