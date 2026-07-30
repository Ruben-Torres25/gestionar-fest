import type { ReactNode } from "react";
import { SocialBottomNav } from "./SocialBottomNav";

export function SocialLayout({
  children,
  active,
  noScroll = false,
}: {
  children: ReactNode;
  active: "inicio" | "descubrir" | "conexiones" | "mensajes";
  noScroll?: boolean;
}) {
  return (
    <div className="flex min-h-[100dvh] w-full justify-center bg-[#040208]">
      <div className="relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden bg-[#050310] sm:h-[min(100dvh,900px)] sm:my-auto sm:rounded-[2rem] sm:border sm:border-white/10">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 60% at 20% 0%, color-mix(in oklab, var(--epic-violet) 30%, transparent), transparent 60%), radial-gradient(90% 50% at 90% 20%, color-mix(in oklab, var(--social-blue) 22%, transparent), transparent 65%), radial-gradient(100% 60% at 50% 100%, color-mix(in oklab, var(--epic-violet-deep) 45%, transparent), transparent 70%)",
          }}
        />
        <div
          className={`relative z-10 flex-1 ${noScroll ? "overflow-hidden" : "overflow-y-auto"}`}
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)" }}
        >
          {children}
        </div>
        <SocialBottomNav active={active} />
      </div>
    </div>
  );
}