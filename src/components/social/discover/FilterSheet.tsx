import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const GENDERS = ["Hombres", "Mujeres", "Ambos"];

export function FilterSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [gender, setGender] = useState("Ambos");

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-white/15 bg-[#0a0618]/95 p-5 pb-8 backdrop-blur-xl"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/25" />
            <h2 className="font-display text-lg uppercase tracking-[0.1em] text-white">Filtros</h2>

            <Group label="Mostrar">
              {GENDERS.map((g) => (
                <Chip key={g} active={gender === g} onClick={() => setGender(g)}>
                  {g}
                </Chip>
              ))}
            </Group>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-white/25 text-sm font-semibold uppercase tracking-[0.14em] text-white"
              style={{
                background: "linear-gradient(110deg, var(--social-blue), var(--epic-violet))",
              }}
            >
              Aplicar
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-[0.62rem] uppercase tracking-[0.24em] text-white/40">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-[44px] rounded-full border px-4 text-xs text-white/85 transition-colors"
      style={{
        borderColor: active
          ? "var(--epic-violet-bright)"
          : "color-mix(in oklab, white 18%, transparent)",
        background: active
          ? "color-mix(in oklab, var(--epic-violet) 30%, transparent)"
          : "rgba(255,255,255,0.04)",
      }}
    >
      {children}
    </button>
  );
}