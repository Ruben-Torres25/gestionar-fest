import { Link } from "@tanstack/react-router";
import { Compass, Home, MessageCircle, Users } from "lucide-react";

const ITEMS = [
  { key: "inicio", label: "Inicio", icon: Home, to: "/social" as const },
  { key: "descubrir", label: "Descubrir", icon: Compass, to: "/social/descubrir" as const },
  { key: "conexiones", label: "Conexiones", icon: Users, to: null },
  { key: "mensajes", label: "Mensajes", icon: MessageCircle, to: null },
];

export function SocialBottomNav({ active }: { active: string }) {
  return (
    <nav
      className="relative z-20 border-t border-white/10 bg-black/70 backdrop-blur-xl"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.3rem)" }}
    >
      <ul className="flex items-stretch justify-around px-1.5 pt-1.5">
        {ITEMS.map(({ key, label, icon: Icon, to }) => {
          const isActive = key === active;
          const inner = (
            <span className="relative flex min-h-[46px] flex-col items-center justify-center gap-1 px-2.5">
              {isActive && (
                <span
                  className="absolute -top-1.5 h-[2px] w-7 rounded-full"
                  style={{
                    background: "var(--epic-violet-bright)",
                    boxShadow: "0 0 10px var(--epic-violet-bright)",
                  }}
                />
              )}
              <Icon
                className="size-[1.15rem]"
                strokeWidth={isActive ? 2.2 : 1.7}
                style={{
                  color: isActive ? "var(--epic-violet-bright)" : "rgba(255,255,255,0.68)",
                  filter: isActive
                    ? "drop-shadow(0 0 8px color-mix(in oklab, var(--epic-violet) 80%, transparent))"
                    : undefined,
                }}
              />
              <span
                className="text-[0.62rem] font-medium tracking-[0.02em]"
                style={{ color: isActive ? "white" : "rgba(255,255,255,0.62)" }}
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
                <button type="button" className="cursor-default">
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
