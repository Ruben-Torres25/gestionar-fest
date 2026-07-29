import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EVENT_DATE } from "@/lib/epic";

type Parts = { days: string; hours: string; minutes: string; seconds: string };

function getParts(target: number): { parts: Parts; done: boolean } {
  const diff = Math.max(0, target - Date.now());
  const s = Math.floor(diff / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    done: diff <= 0,
    parts: {
      days: pad(Math.floor(s / 86400)),
      hours: pad(Math.floor((s % 86400) / 3600)),
      minutes: pad(Math.floor((s % 3600) / 60)),
      seconds: pad(s % 60),
    },
  };
}

const LABELS: Array<[keyof Parts, string]> = [
  ["days", "Días"],
  ["hours", "Horas"],
  ["minutes", "Min"],
  ["seconds", "Seg"],
];

export function EpicCountdown() {
  const target = new Date(EVENT_DATE).getTime();
  const [state, setState] = useState(() => getParts(target));

  useEffect(() => {
    const id = window.setInterval(() => setState(getParts(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (state.done) {
    return (
      <p
        className="font-display text-3xl uppercase tracking-[0.12em] text-white"
        style={{ textShadow: "0 0 22px color-mix(in oklab, var(--epic-violet) 70%, transparent)" }}
      >
        Epic Fest comenzó
      </p>
    );
  }

  return (
    <div
      className="flex items-start justify-center gap-1 tabular-nums xs:gap-2"
      role="timer"
      aria-label="Cuenta regresiva para Epic Fest"
    >
      {LABELS.map(([key, label], i) => (
        <div key={key} className="flex items-start">
          <div className="flex w-[3.6rem] flex-col items-center sm:w-16">
            <div className="relative h-[3.1rem] overflow-hidden sm:h-14">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={state.parts[key]}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="block font-display text-[3rem] leading-[3.1rem] text-white sm:text-[3.4rem] sm:leading-[3.5rem]"
                  style={{
                    textShadow:
                      "0 0 18px color-mix(in oklab, var(--epic-violet) 55%, transparent), 0 2px 12px rgba(0,0,0,0.6)",
                  }}
                >
                  {state.parts[key]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="mt-1 text-[0.6rem] uppercase tracking-[0.28em] text-white/55">
              {label}
            </span>
          </div>
          {i < LABELS.length - 1 && (
            <span className="font-display text-[2.4rem] leading-[3.1rem] text-epic-violet-bright/70 sm:text-[2.7rem] sm:leading-[3.5rem]">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}