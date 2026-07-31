import { Link } from "@tanstack/react-router";
import { Compass, Heart, Home, MessageCircle } from "lucide-react";

const ITEMS = [
  { key: "inicio", label: "Inicio", icon: Home, to: "/social" as const },
  { key: "descubrir", label: "Ver gente", icon: Compass, to: "/social/descubrir" as const },
  { key: "conexiones", label: "Matches", icon: Heart, to: "/social/matches" as const },
  {
    key: "mensajes",
    label: "Mensajes",
    icon: MessageCircle,
    to: "/social/mensajes" as const,
    badge: true,
  },
];

export function SocialBottomNav({ active }: { active: string }) {
  return (
    <nav
      className="relative z-20 border-t border-white/10 bg-black/70 backdrop-blur-xl"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.3rem)" }}
    >
      <ul className="flex items-stretch justify-around px-1.5 pt-1.5">
        {ITEMS.map(({ key, label, icon: Icon, to, badge }) => {
          const isActive = key === active;
          const filled = isActive && (key === "conexiones" || key === "mensajes");
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
              <span className="relative">
                <Icon
                  className="size-[1.15rem]"
                  strokeWidth={isActive ? 2.2 : 1.65}
                  fill={filled ? "currentColor" : "none"}
                  style={{
                    color: isActive ? "var(--epic-violet-bright)" : "rgba(255,255,255,0.52)",
                    filter: isActive
                      ? "drop-shadow(0 0 7px color-mix(in oklab, var(--epic-violet) 70%, transparent))"
                      : undefined,
                  }}
                />
                {badge && (
                  <span
                    className="absolute -right-1 -top-0.5 size-1.5 rounded-full"
                    style={{
                      background: "var(--social-pink)",
                      boxShadow: "0 0 7px var(--social-pink)",
                    }}
                  />
                )}
              </span>
              <span
                className="font-ui text-center text-[0.62rem] font-medium leading-none tracking-[0.01em]"
                style={{
                  color: isActive ? "var(--epic-violet-bright)" : "rgba(255,255,255,0.48)",
                }}
              >
                {label}
              </span>
            </span>
          );
          return (
            <li key={key}>
              <Link to={to} className="cursor-pointer">
                {inner}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
