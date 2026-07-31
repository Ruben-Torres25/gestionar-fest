import type { ReactNode } from "react";
import { SocialBottomNav } from "./SocialBottomNav";

export function SocialLayout({
  children,
  active,
  noScroll = false,
  overlay = null,
  dimNav = false,
  hideNav = false,
}: {
  children: ReactNode;
  active: "inicio" | "descubrir" | "conexiones" | "mensajes";
  noScroll?: boolean;
  overlay?: ReactNode;
  dimNav?: boolean;
  hideNav?: boolean;
}) {
  return (
    <div className="flex min-h-[100dvh] w-full justify-center bg-[#040208] font-ui">
      <div className="relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden bg-[#050310] sm:my-auto sm:h-[min(100dvh,900px)] sm:rounded-[2rem] sm:border sm:border-white/10">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 60% at 20% 0%, color-mix(in oklab, var(--epic-violet) 28%, transparent), transparent 60%), radial-gradient(90% 50% at 90% 18%, color-mix(in oklab, var(--social-blue) 20%, transparent), transparent 65%), radial-gradient(100% 60% at 50% 100%, color-mix(in oklab, var(--epic-violet-deep) 45%, transparent), transparent 70%)",
          }}
        />
        <div
          className={`no-scrollbar relative z-10 flex-1 ${noScroll ? "overflow-hidden" : "overflow-y-auto"}`}
          style={{
            paddingTop: hideNav ? undefined : "calc(env(safe-area-inset-top) + 0.85rem)",
            paddingBottom: noScroll || hideNav ? undefined : "1.75rem",
          }}
        >
          {children}
        </div>
        {!hideNav && (
          <div
            className="relative z-20 transition-[opacity,filter] duration-300"
            style={{
              opacity: dimNav ? 0.28 : 1,
              filter: dimNav ? "saturate(0.55)" : undefined,
              pointerEvents: dimNav ? "none" : undefined,
            }}
            aria-hidden={dimNav || undefined}
          >
            <SocialBottomNav active={active} />
          </div>
        )}
        {overlay}
      </div>
    </div>
  );
}
