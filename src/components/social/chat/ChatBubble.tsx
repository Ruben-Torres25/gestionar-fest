import { motion, useReducedMotion } from "motion/react";
import { Check, CheckCheck } from "lucide-react";
import type { ChatMessage } from "@/lib/chat";
import type { MessageReceipt } from "@/lib/messages";

export function ChatBubble({
  message,
  index,
}: {
  message: ChatMessage;
  index: number;
}) {
  const reduced = useReducedMotion();
  const outgoing = message.side === "outgoing";
  const accent = outgoing ? "var(--epic-violet-bright)" : "var(--social-blue)";
  const showReceipt = outgoing && Boolean(message.receipt);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.03, 0.24),
        duration: 0.28,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`flex w-full ${outgoing ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`relative max-w-[78%] rounded-[1.05rem] py-2 pl-3 min-[390px]:max-w-[74%] ${
          showReceipt ? "pr-7" : "pr-2.5"
        }`}
        style={{
          width: "fit-content",
          background: outgoing
            ? "linear-gradient(148deg, color-mix(in oklab, var(--epic-violet) 22%, rgba(22,10,40,0.94)) 0%, color-mix(in oklab, var(--epic-violet-bright) 18%, rgba(14,6,30,0.96)) 48%, color-mix(in oklab, var(--epic-violet-deep) 40%, rgba(8,3,18,0.97)) 100%)"
            : "linear-gradient(155deg, rgba(5,8,16,0.96), rgba(3,5,12,0.98))",
          border: outgoing
            ? "1px solid color-mix(in oklab, var(--epic-violet-bright) 32%, transparent)"
            : "1px solid color-mix(in oklab, var(--social-blue) 22%, transparent)",
          boxShadow: outgoing
            ? "0 8px 20px -16px color-mix(in oklab, var(--epic-violet) 55%, transparent), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.18)"
            : "0 6px 14px -14px rgba(0,0,0,0.7), 0 0 10px -12px color-mix(in oklab, var(--social-blue) 35%, transparent), inset 0 1px 0 rgba(255,255,255,0.04)",
          backdropFilter: "blur(10px)",
        }}
      >
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-2.5 top-2 w-[3px] rounded-full"
          style={{
            background: accent,
            boxShadow: outgoing
              ? "0 0 12px color-mix(in oklab, var(--epic-violet-bright) 75%, transparent)"
              : "0 0 7px color-mix(in oklab, var(--social-blue) 40%, transparent)",
          }}
        />

        <p className="pl-3 font-ui text-[0.86rem] font-normal leading-snug text-white/[0.95]">
          <span className="whitespace-pre-wrap break-words">{message.text}</span>
        </p>

        {showReceipt && message.receipt && (
          <span className="pointer-events-none absolute bottom-2 right-2.5 inline-flex items-center">
            <ReceiptMark receipt={message.receipt} />
          </span>
        )}
      </div>
    </motion.div>
  );
}

function ReceiptMark({ receipt }: { receipt: MessageReceipt }) {
  const label =
    receipt === "sent" ? "Enviado" : receipt === "delivered" ? "Recibido" : "Visto";

  if (receipt === "sent") {
    return (
      <Check
        className="size-[0.68rem] text-white/28"
        strokeWidth={2.2}
        aria-label={label}
        title={label}
      />
    );
  }

  return (
    <CheckCheck
      className="size-[0.68rem]"
      strokeWidth={2.2}
      aria-label={label}
      title={label}
      style={{
        color:
          receipt === "seen"
            ? "color-mix(in oklab, var(--epic-violet-bright) 70%, white)"
            : "rgba(255,255,255,0.28)",
      }}
    />
  );
}
