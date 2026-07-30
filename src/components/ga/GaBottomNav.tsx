import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { getSession } from "@/lib/ga-session";
import { cn } from "@/lib/utils";

type TabId = "destacados" | "entradas" | "agenda";

type GaBottomNavProps = {
  active?: TabId;
  className?: string;
};

/** Four-point sparkles matching the Destacados mock (filled, blue). */
function IconSparkles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 2.2 13.7 8.3 19.8 10 13.7 11.7 12 17.8 10.3 11.7 4.2 10 10.3 8.3Z" />
      <path d="M18.2 3.4 18.9 5.9 21.4 6.6 18.9 7.3 18.2 9.8 17.5 7.3 15 6.6 17.5 5.9Z" />
    </svg>
  );
}

/** Ticket stub with side notches + perforation (metallic fill). */
function IconTicket({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id="gaTicketGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d8dde3" />
          <stop offset="100%" stopColor="#7a828c" />
        </linearGradient>
      </defs>
      <path
        fill="url(#gaTicketGrad)"
        d="M5 6.4h14a1.2 1.2 0 0 1 1.2 1.2v2.05a1.7 1.7 0 0 0 0 3.5v2.05A1.2 1.2 0 0 1 19 16.4H5a1.2 1.2 0 0 1-1.2-1.2v-2.05a1.7 1.7 0 0 0 0-3.5V7.6A1.2 1.2 0 0 1 5 6.4Z"
      />
      <rect x="11.25" y="9.15" width="1.5" height="1.2" rx="0.25" fill="#12151c" />
      <rect x="11.25" y="11.4" width="1.5" height="1.2" rx="0.25" fill="#12151c" />
      <rect x="11.25" y="13.65" width="1.5" height="1.2" rx="0.25" fill="#12151c" />
    </svg>
  );
}

/** Calendar with silver vertical fill matching Agenda mock. */
function IconCalendar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id="gaCalGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e4e8ed" />
          <stop offset="100%" stopColor="#7a828c" />
        </linearGradient>
      </defs>
      <path
        fill="url(#gaCalGrad)"
        d="M7.2 3.6h1.5v1.4h6.6V3.6h1.5v1.4h1.7c.9 0 1.6.7 1.6 1.6v12.2c0 .9-.7 1.6-1.6 1.6H5.5c-.9 0-1.6-.7-1.6-1.6V6.6c0-.9.7-1.6 1.6-1.6h1.7V3.6Z"
      />
      <path fill="#0e1218" d="M4.1 9.2h15.8v1.35H4.1z" />
      <circle cx="8.2" cy="13.6" r="1.05" fill="#0e1218" />
      <circle cx="12" cy="13.6" r="1.05" fill="#0e1218" />
      <circle cx="15.8" cy="13.6" r="1.05" fill="#0e1218" />
    </svg>
  );
}

export function GaBottomNav({ active = "destacados", className }: GaBottomNavProps) {
  const navigate = useNavigate();

  function onSoon(label: string) {
    toast(`${label} próximamente`);
  }

  return (
    <nav
      className={cn(
        "flex items-center justify-between gap-1 rounded-full border border-white/[0.07] bg-[#10141c]/96 px-2 py-1.5 backdrop-blur-md",
        className,
      )}
      style={{ boxShadow: "0 8px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)" }}
      aria-label="Navegación principal"
    >
      <button
        type="button"
        onClick={() => void navigate({ to: "/fiestas" })}
        className={cn(
          "inline-flex h-11 flex-[1.45] cursor-pointer items-center justify-center rounded-full transition-transform duration-200 active:scale-[0.98]",
          active === "destacados" && "ga-nav-active",
        )}
        aria-current={active === "destacados" ? "page" : undefined}
      >
        <span className="ga-nav-active__inner inline-flex h-full w-full items-center justify-center gap-1 rounded-full px-3.5">
          <IconSparkles className="size-5 text-[#3b9dff]" />
          <span className="font-ga text-[14px] font-medium text-[#50df74]">Eventos</span>
        </span>
      </button>

      <button
        type="button"
        onClick={() => {
          const session = getSession();
          void navigate({
            to: session.ticketTierId ? "/mi-entrada" : "/entradas",
          });
        }}
        className={cn(
          "inline-flex h-11 flex-1 cursor-pointer flex-col items-center justify-center gap-0 transition-opacity duration-200 hover:opacity-80 active:scale-95",
          active === "entradas" ? "text-[#50df74]" : "text-white/50",
        )}
        aria-current={active === "entradas" ? "page" : undefined}
      >
        <IconTicket className="size-[22px]" />
        <span
          className={cn(
            "font-ga -mt-0.5 text-[11px] font-medium leading-none",
            active === "entradas" ? "text-[#50df74]" : "text-[#b0b6be]",
          )}
        >
          Mis entradas
        </span>
      </button>

      <button
        type="button"
        onClick={() => onSoon("Agenda")}
        className="inline-flex h-11 flex-1 cursor-pointer flex-col items-center justify-center gap-0 text-white/50 transition-opacity duration-200 hover:opacity-80 active:scale-95"
      >
        <IconCalendar className="size-[22px]" />
        <span className="font-ga -mt-0.5 text-[11px] font-medium leading-none text-[#b0b6be]">
          Agenda
        </span>
      </button>
    </nav>
  );
}
