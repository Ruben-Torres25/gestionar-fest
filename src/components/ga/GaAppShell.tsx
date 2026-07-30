import type { ReactNode } from "react";
import { Bell, Menu, MessageSquare } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { GaLogo } from "./GaLogo";

type GaAppShellProps = {
  children: ReactNode;
  className?: string;
  /** Optional footer slot (e.g. bottom nav) */
  footer?: ReactNode;
};

/** App chrome for post-login screens (matches fiestas mock). */
export function GaAppShell({ children, className, footer }: GaAppShellProps) {
  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-black">
      <main
        className={cn(
          "relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden bg-[#05070a] sm:h-[min(100dvh,900px)] sm:rounded-[2rem] sm:border sm:border-white/10",
          className,
        )}
      >
        <header
          className="relative z-20 flex items-center justify-between gap-2 px-4"
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.85rem)" }}
        >
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => toast("Menú próximamente")}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-[#2f8fff]/75 bg-[#070b12]/80 text-white transition-[box-shadow,border-color,transform] duration-200 hover:border-[#2f8fff] active:scale-95"
            style={{
              boxShadow:
                "0 0 0 1px rgba(47,143,255,0.15), 0 0 14px rgba(47,143,255,0.45)",
            }}
          >
            <Menu className="size-5" strokeWidth={1.75} />
          </button>

          <GaLogo className="h-10 max-w-[190px]" />

          <div className="flex shrink-0 items-center gap-3.5 text-white">
            <button
              type="button"
              aria-label="Notificaciones"
              onClick={() => toast("Notificaciones próximamente")}
              className="cursor-pointer text-white/90 transition-opacity duration-200 hover:opacity-80 active:scale-95"
            >
              <Bell className="size-5" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              aria-label="Mensajes"
              onClick={() => toast("Mensajes próximamente")}
              className="cursor-pointer text-white/90 transition-opacity duration-200 hover:opacity-80 active:scale-95"
            >
              <MessageSquare className="size-5" strokeWidth={1.6} />
            </button>
          </div>
        </header>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-3 pt-5">
          {children}
        </div>

        {footer ? (
          <div
            className="relative z-20 px-3.5"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
          >
            {footer}
          </div>
        ) : null}
      </main>
    </div>
  );
}
