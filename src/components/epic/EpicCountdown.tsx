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

const DIGIT_GLOW =
  "0 0 6px rgba(168,85,247,0.55), 0 0 14px rgba(139,92,246,0.4)";

const DIGIT_FILL =
  "linear-gradient(180deg, #ffffff 0%, #f5f0ff 48%, #e9d5ff 100%)";

const DIGIT_FILTER =
  "drop-shadow(0 0 4px rgba(168,85,247,0.65)) drop-shadow(0 0 12px rgba(124,58,237,0.35))";

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
        style={{ textShadow: DIGIT_GLOW }}
      >
        Epic Fest comenzó
      </p>
    );
  }

  return (
    <div
      className="flex items-start justify-center gap-1.5 tabular-nums sm:gap-2"
      role="timer"
      aria-label="Cuenta regresiva para Epic Fest"
    >
      {LABELS.map(([key, label], i) => (
        <div key={key} className="flex items-start gap-1.5 sm:gap-2">
          <div className="flex min-w-[3.4rem] flex-col items-center sm:min-w-[3.8rem]">
            <div className="relative flex h-[3.15rem] items-center justify-center overflow-visible sm:h-[3.5rem]">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={state.parts[key]}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="block font-display text-[3.05rem] leading-none tracking-tight sm:text-[3.45rem]"
                  style={{
                    backgroundImage: DIGIT_FILL,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                    filter: DIGIT_FILTER,
                  }}
                >
                  {state.parts[key]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="mt-1.5 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-white/62">
              {label}
            </span>
          </div>

          {i < LABELS.length - 1 ? (
            <span
              className="font-display pt-0.5 text-[2.35rem] leading-[3.15rem] sm:text-[2.7rem] sm:leading-[3.5rem]"
              style={{
                backgroundImage: DIGIT_FILL,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                filter:
                  "drop-shadow(0 0 4px rgba(168,85,247,0.55)) drop-shadow(0 0 10px rgba(124,58,237,0.3))",
              }}
              aria-hidden
            >
              :
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
