import { useNavigate } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { BellOff, Check, CheckCheck } from "lucide-react";
import type { MessageReceipt, MessageThread } from "@/lib/messages";

export function MessageThreadRow({
  thread,
  index,
  freshlyAdded = false,
}: {
  thread: MessageThread;
  index: number;
  freshlyAdded?: boolean;
}) {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const isTyping = thread.previewKind === "typing";
  const hasUnread = Boolean(thread.unread);

  return (
    <motion.button
      type="button"
      initial={
        reduced
          ? false
          : freshlyAdded
            ? { opacity: 0, y: -10, scale: 0.98 }
            : { opacity: 0, y: 8 }
      }
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        delay: freshlyAdded ? 0 : 0.05 + index * 0.035,
        duration: freshlyAdded ? 0.32 : 0.28,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileTap={{ scale: 0.985 }}
      onClick={() =>
        navigate({
          to: "/social/mensajes/$chatId",
          params: { chatId: thread.id },
        })
      }
      className="grid w-full min-h-[3.75rem] cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2.5 rounded-[1rem] border px-2.5 py-2 text-left transition-colors duration-200 hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--epic-violet-bright)] min-[390px]:gap-x-3 min-[390px]:px-3 min-[390px]:py-2.5"
      style={{
        touchAction: "manipulation",
        borderColor: freshlyAdded
          ? "color-mix(in oklab, var(--social-blue) 45%, transparent)"
          : thread.highlighted
            ? "color-mix(in oklab, var(--epic-violet-bright) 40%, transparent)"
            : "rgba(255,255,255,0.05)",
        background: freshlyAdded
          ? "linear-gradient(150deg, color-mix(in oklab, var(--social-blue) 10%, transparent), rgba(8,4,18,0.42))"
          : thread.highlighted
            ? "linear-gradient(150deg, color-mix(in oklab, var(--epic-violet) 9%, transparent), rgba(8,4,18,0.42))"
            : "transparent",
        boxShadow: freshlyAdded
          ? "inset 0 1px 0 rgba(255,255,255,0.05)"
          : thread.highlighted
            ? "inset 0 1px 0 rgba(255,255,255,0.04)"
            : undefined,
      }}
      aria-label={`Conversación con ${thread.name}, ${thread.age}${hasUnread ? `, ${thread.unread} sin leer` : ""}`}
    >
      <div className="relative shrink-0">
        <img
          src={thread.photo}
          alt=""
          className="size-10 rounded-full object-cover min-[390px]:size-11"
          style={{
            boxShadow: thread.highlighted
              ? "0 0 0 1.5px color-mix(in oklab, var(--epic-violet-bright) 50%, transparent)"
              : "0 0 0 1px rgba(255,255,255,0.1)",
          }}
          draggable={false}
        />
        {thread.online && (
          <span
            className="absolute bottom-0 right-0 size-2 rounded-full border-[1.5px] border-[#050310]"
            style={{ background: "var(--gestionar-green)" }}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="min-w-0">
        <h3
          className={`truncate font-ui text-[0.88rem] font-semibold leading-none min-[390px]:text-[0.9rem] ${
            hasUnread ? "text-white" : "text-white/95"
          }`}
        >
          {thread.name}
          <span className="font-medium text-white/64">, {thread.age}</span>
        </h3>

        <div className="mt-1 flex min-w-0 items-center gap-1">
          {isTyping ? (
            <TypingPreview reduced={Boolean(reduced)} />
          ) : (
            <p
              className={`min-w-0 flex-1 truncate font-ui text-[0.72rem] leading-snug ${
                hasUnread ? "font-medium text-white/78" : "font-normal text-white/55"
              }`}
            >
              {thread.preview}
            </p>
          )}
          {thread.receipt && <ReceiptIcon receipt={thread.receipt} />}
        </div>
      </div>

      <div className="flex w-[2.75rem] shrink-0 flex-col items-end justify-center gap-1 self-stretch min-[390px]:w-12">
        <div className="flex items-center gap-1">
          {thread.muted && (
            <BellOff
              className="size-3 text-white/40"
              strokeWidth={1.8}
              aria-label="Conversación silenciada"
            />
          )}
          <span
            className="font-ui text-[0.62rem] font-normal tabular-nums leading-none"
            style={{
              color: hasUnread
                ? "color-mix(in oklab, var(--social-pink) 55%, white)"
                : "rgba(255,255,255,0.48)",
            }}
          >
            {thread.time}
          </span>
        </div>

        {hasUnread ? (
          <motion.span
            animate={reduced ? undefined : { opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-[1.1rem] min-w-[1.1rem] items-center justify-center rounded-full px-1 font-ui text-[0.58rem] font-bold leading-none text-white"
            style={{
              background: "color-mix(in oklab, var(--social-pink) 92%, black)",
            }}
          >
            {thread.unread}
          </motion.span>
        ) : (
          <span className="h-[1.1rem]" aria-hidden="true" />
        )}
      </div>
    </motion.button>
  );
}

function TypingPreview({ reduced }: { reduced: boolean }) {
  return (
    <p
      className="flex min-w-0 items-center gap-0.5 font-ui text-[0.72rem] font-medium leading-snug"
      style={{ color: "var(--epic-violet-bright)" }}
      aria-label="Escribiendo"
    >
      <span>Escribiendo</span>
      <span className="inline-flex w-4 justify-start gap-px" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="inline-block text-[0.85em]"
            animate={reduced ? undefined : { opacity: [0.25, 1, 0.25] }}
            transition={{
              duration: 1.15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.18,
            }}
          >
            ·
          </motion.span>
        ))}
      </span>
    </p>
  );
}

function ReceiptIcon({ receipt }: { receipt: MessageReceipt }) {
  const label =
    receipt === "sent" ? "Enviado" : receipt === "delivered" ? "Recibido" : "Visto";

  if (receipt === "sent") {
    return (
      <Check
        className="size-3.5 shrink-0 text-white/35"
        strokeWidth={2.2}
        aria-label={label}
        title={label}
      />
    );
  }

  return (
    <CheckCheck
      className="size-3.5 shrink-0"
      strokeWidth={2.2}
      aria-label={label}
      title={label}
      style={{
        color:
          receipt === "seen" ? "var(--social-blue)" : "rgba(255,255,255,0.38)",
      }}
    />
  );
}
