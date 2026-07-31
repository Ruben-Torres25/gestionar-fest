import { useNavigate, useRouterState } from "@tanstack/react-router";
import { CalendarDays, Home, Ticket } from "lucide-react";
import { toast } from "sonner";
import type { ReactNode } from "react";

import { getSession } from "@/lib/ga-session";
import { cn } from "@/lib/utils";

type TabId = "destacados" | "entradas" | "agenda";

type GaBottomNavProps = {
  active?: TabId;
  className?: string;
};

const ICON_CLASS = "size-[20px] shrink-0";
const ICON_STROKE = 2;

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
};

function TabButton({ active, label, onClick, icon }: TabButtonProps) {
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
        {icon}
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
        icon={
          <Home
            className={cn(ICON_CLASS, active === "destacados" ? "text-[#50df74]" : "text-[#8a9199]")}
            strokeWidth={ICON_STROKE}
            aria-hidden
          />
        }
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
        icon={
          <Ticket
            className={cn(ICON_CLASS, active === "entradas" ? "text-[#50df74]" : "text-[#8a9199]")}
            strokeWidth={ICON_STROKE}
            aria-hidden
          />
        }
      />

      <TabButton
        active={false}
        label="Agenda"
        onClick={() => onSoon("Agenda")}
        icon={
          <CalendarDays
            className={cn(ICON_CLASS, "text-[#8a9199]")}
            strokeWidth={ICON_STROKE}
            aria-hidden
          />
        }
      />
    </nav>
  );
}
