import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { toast } from "sonner";

import { MENU_ITEMS } from "@/lib/epic";
import { getSession } from "@/lib/ga-session";

export function EpicMobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  function handleItem(item: (typeof MENU_ITEMS)[number]) {
    onClose();
    if (item === "Inicio") {
      void navigate({ to: "/epic" });
      return;
    }
    if (item === "Entradas") {
      const session = getSession();
      void navigate({ to: session.ticketTierId ? "/mi-entrada" : "/entradas" });
      return;
    }
    toast(`${item} próximamente`);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
          className="absolute inset-0 z-50 flex flex-col bg-epic-night/95 backdrop-blur-xl"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{ background: "var(--epic-violet)" }}
          />
          <div
            className="flex justify-end px-5"
            style={{ paddingTop: "calc(env(safe-area-inset-top) + 1rem)" }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              className="flex size-11 items-center justify-center rounded-full border border-epic-violet/40 bg-epic-violet/10 transition-transform active:scale-95"
            >
              <X className="size-5 text-white" strokeWidth={1.75} />
            </button>
          </div>
          <nav className="relative flex flex-1 flex-col justify-center gap-6 px-8 pb-16">
            {MENU_ITEMS.map((item, i) => (
              <motion.button
                key={item}
                type="button"
                onClick={() => handleItem(item)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.1, duration: 0.45, ease: "easeOut" }}
                whileTap={{ scale: 0.97, color: "var(--epic-violet-bright)" }}
                className="cursor-pointer text-left font-display text-4xl uppercase tracking-wide text-white/90"
              >
                {item}
              </motion.button>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
