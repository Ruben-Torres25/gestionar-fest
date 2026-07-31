import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  formatNowTime,
  getChatMessages,
  getChatParticipant,
  type ChatMessage,
} from "@/lib/chat";
import { GA_CHAT_BACKGROUND } from "@/lib/ga-assets";
import { SocialLayout } from "../SocialLayout";
import { ChatHeader } from "./ChatHeader";
import { ChatSafetyBanner } from "./ChatSafetyBanner";
import { ChatBubble } from "./ChatBubble";
import { ChatComposer } from "./ChatComposer";

export function ChatPage({ chatId }: { chatId: string }) {
  const reduced = useReducedMotion();
  const participant = getChatParticipant(chatId);
  const [messages, setMessages] = useState<ChatMessage[]>(() => getChatMessages(chatId));
  const [showSafety, setShowSafety] = useState(true);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(getChatMessages(chatId));
    setShowSafety(true);
  }, [chatId]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [messages, showSafety, reduced]);

  if (!participant) {
    return (
      <SocialLayout active="mensajes" hideNav noScroll>
        <div
          className="flex h-full flex-col items-center justify-center px-6 text-center"
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 1rem)" }}
        >
          <p className="font-ui text-sm font-medium text-white/75">
            No encontramos esta conversación
          </p>
          <Link
            to="/social/mensajes"
            className="mt-4 inline-flex min-h-10 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-4 font-ui text-[0.75rem] font-semibold text-white/85"
          >
            Volver a mensajes
          </Link>
        </div>
      </SocialLayout>
    );
  }

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        side: "outgoing",
        text,
        time: formatNowTime(),
        receipt: "sent",
      },
    ]);
  };

  return (
    <SocialLayout active="mensajes" hideNav noScroll>
      <div className="relative flex h-full flex-col overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${GA_CHAT_BACKGROUND})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.42,
            filter: "blur(0.4px) saturate(0.95)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,3,16,0.72) 0%, rgba(5,3,16,0.52) 24%, rgba(5,3,16,0.48) 58%, rgba(5,3,16,0.64) 80%, rgba(5,3,16,0.82) 100%)",
          }}
        />

        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          <ChatHeader participant={participant} />

          <AnimatePresence initial={false}>
            {showSafety && (
              <motion.div
                initial={reduced ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduced ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <ChatSafetyBanner onDismiss={() => setShowSafety(false)} />
              </motion.div>
            )}
          </AnimatePresence>

          <div
            ref={scrollerRef}
            className="no-scrollbar relative flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-3"
            style={{ touchAction: "pan-y" }}
          >
            <div className="relative space-y-3">
              {messages.map((message, index) => (
                <ChatBubble key={message.id} message={message} index={index} />
              ))}
            </div>
          </div>

          <ChatComposer onSend={handleSend} />
        </div>
      </div>
    </SocialLayout>
  );
}
