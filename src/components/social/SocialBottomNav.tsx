import { Link } from "@tanstack/react-router";
import { Compass, Home, MessageCircle, Users } from "lucide-react";
import { GESTIONAR_LOGO } from "@/lib/social";

const ITEMS = [
  { key: "inicio", label: "Inicio", icon: Home, to: "/social" as const },
  { key: "descubrir", label: "Descubrir", icon: Compass, to: "/social/descubrir" as const },
  { key: "conexiones", label: "Conexiones", icon: Users, to: null },
  { key: "mensajes", label: "Mensajes", icon: MessageCircle, to: null },
];

export function SocialBottomNav({ active }: { active: string }) {
  return (
    <nav
      className="relative z-20 border-t border-white/10 bg-black/60 backdrop-blur-xl"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.35rem)" }}
    >
      <ul className="flex items-stretch justify-around px-2 pt-2">
        {ITEMS.map(({ key, label, icon: Icon, to }) => {
          const isActive = key === active;
          const inner = (
            <span className="flex min-h-[44px] flex-col items-center justify-center gap-1 px-3">
              <Icon
                className="size-5"
                style={{
                  color: isActive ? "var(--epic-violet-bright)" : "rgba(255,255,255,0.5)",
                  filter: isActive
                    ? "drop-shadow(0 0 8px color-mix(in oklab, var(--epic-violet) 80%, transparent))"
                    : undefined,
                }}
              />
              <span
                className="text-[0.6rem] uppercase tracking-[0.14em]"
                style={{ color: isActive ? "white" : "rgba(255,255,255,0.45)" }}
              >
                {label}
              </span>
            </span>
          );
          return (
            <li key={key}>
              {to ? (
                <Link to={to}>{inner}</Link>
              ) : (
                <button type="button" className="cursor-default opacity-70">
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-center gap-2 pb-1 pt-1">
        <span className="text-[0.55rem] uppercase tracking-[0.22em] text-white/30">Powered by</span>
        <img
          src={GESTIONAR_LOGO}
          alt="GestionAR Business"
          className="h-3 w-auto object-contain opacity-60"
        />
      </div>
    </nav>
  );
}