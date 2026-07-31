import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { toast } from "sonner";
import type { ReactNode } from "react";

import { getSession } from "@/lib/ga-session";
import { cn } from "@/lib/utils";

type TabId = "destacados" | "entradas" | "agenda";

type GaBottomNavProps = {
  active?: TabId;
  className?: string;
};

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

function tabFromPath(pathname: string): TabId {
  if (pathname.startsWith("/entradas") || pathname.startsWith("/mi-entrada")) {
    return "entradas";
  }
  if (pathname.startsWith("/fiestas") || pathname.startsWith("/epic")) {
    return "destacados";
  }
  return "destacados";
}

type TabButtonProps = {
  active: boolean;
  label: string;
  onClick: () => void;
  icon: ReactNode;
  activeIcon?: ReactNode;
};

function TabButton({ active, label, onClick, icon, activeIcon }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-10 min-w-0 flex-1 cursor-pointer items-center justify-center rounded-full transition-transform duration-200 active:scale-[0.98]",
        active && "ga-nav-active",
      )}
      aria-current={active ? "page" : undefined}
    >
      <span
        className={cn(
          "inline-flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-full px-1",
          active && "ga-nav-active__inner",
        )}
      >
        {active ? (activeIcon ?? icon) : icon}
        <span
          className={cn(
            "font-ga max-w-full truncate text-[10px] font-medium leading-none",
            active ? "text-[#50df74]" : "text-[#b0b6be]",
          )}
        >
          {label}
        </span>
      </span>
    </button>
  );
}

export function GaBottomNav({ active: _activeProp, className }: GaBottomNavProps) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = tabFromPath(pathname);
  void _activeProp;

  function onSoon(label: string) {
    toast(`${label} próximamente`);
  }

  return (
    <nav
      className={cn(
        "flex items-center gap-0.5 rounded-full border border-white/[0.07] bg-[#10141c]/96 px-1.5 py-1 backdrop-blur-md",
        className,
      )}
      style={{ boxShadow: "0 8px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)" }}
      aria-label="Navegación principal"
    >
      <TabButton
        active={active === "destacados"}
        label="Eventos"
        onClick={() => void navigate({ to: "/fiestas" })}
        icon={<Home className="size-[18px] text-[#8a9199]" strokeWidth={2.1} aria-hidden />}
        activeIcon={<Home className="size-[18px] text-[#3b9dff]" strokeWidth={2.25} aria-hidden />}
      />

      <TabButton
        active={active === "entradas"}
        label="Mis entradas"
        onClick={() => {
          const session = getSession();
          void navigate({
            to: session.ticketTierId ? "/mi-entrada" : "/entradas",
          });
        }}
        icon={<IconTicket className="size-[18px]" />}
      />

      <TabButton
        active={false}
        label="Agenda"
        onClick={() => onSoon("Agenda")}
        icon={<IconCalendar className="size-[18px]" />}
      />
    </nav>
  );
}
