import { useState } from "react";
import { motion } from "motion/react";
import { SendHorizontal, Smile } from "lucide-react";

export function ChatComposer({
  onSend,
}: {
  onSend: (text: string) => void;
}) {
  const [value, setValue] = useState("");
  const canSend = value.trim().length > 0;

  const submit = () => {
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue("");
  };

  return (
    <div
      className="relative z-20 border-t border-white/8 px-4 pt-3"
      style={{
        paddingBottom: "calc(env(safe-area-inset-bottom) + 0.85rem)",
        background:
          "linear-gradient(0deg, rgba(5,3,16,0.97) 45%, rgba(5,3,16,0.78) 100%)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div className="flex items-center gap-2.5">
        <div className="relative flex min-h-12 min-w-0 flex-1 items-center rounded-full border border-white/10 bg-black/45 pl-2 pr-3.5">
          <button
            type="button"
            aria-label="Emojis"
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/[0.05] hover:text-epic-violet-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--epic-violet-bright)]"
            style={{ touchAction: "manipulation" }}
          >
            <Smile className="size-[1.1rem]" strokeWidth={1.6} />
          </button>
          <label className="min-w-0 flex-1">
            <span className="sr-only">Escribí un mensaje</span>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder="Escribí un mensaje..."
              enterKeyHint="send"
              autoComplete="off"
              className="h-11 w-full bg-transparent font-ui text-base text-white outline-none placeholder:text-white/58"
              style={{ touchAction: "manipulation" }}
            />
          </label>
        </div>

        <motion.button
          type="button"
          whileTap={canSend ? { scale: 0.94 } : undefined}
          onClick={submit}
          disabled={!canSend}
          aria-label="Enviar mensaje"
          className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full transition-[filter,opacity,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--epic-violet-bright)] disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            touchAction: "manipulation",
            background:
              "linear-gradient(145deg, color-mix(in oklab, var(--epic-violet-bright) 92%, white) 0%, var(--epic-violet-bright) 35%, var(--epic-violet) 100%)",
            boxShadow: canSend
              ? "0 0 0 1px color-mix(in oklab, var(--epic-violet-bright) 50%, transparent), 0 0 22px -4px color-mix(in oklab, var(--epic-violet-bright) 80%, transparent), 0 10px 20px -10px color-mix(in oklab, var(--epic-violet) 90%, transparent)"
              : "0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          <SendHorizontal className="size-5 text-white drop-shadow-sm" strokeWidth={2.35} />
        </motion.button>
      </div>
    </div>
  );
}
