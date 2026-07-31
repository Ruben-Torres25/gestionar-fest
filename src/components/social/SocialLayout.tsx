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
    <div className="ga-app-shell flex min-h-[100dvh] w-full max-w-[100vw] justify-center overflow-x-hidden font-ui">
      <div className="ga-app-shell relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden overflow-x-hidden sm:my-auto sm:h-[min(100dvh,900px)] sm:rounded-[2rem] sm:border sm:border-white/10">
        <div
          className={`no-scrollbar relative z-10 min-w-0 flex-1 overflow-x-hidden ${noScroll ? "overflow-hidden" : "overflow-y-auto"}`}
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
