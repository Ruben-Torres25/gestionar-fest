import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  createThreadFromPending,
  INITIAL_MESSAGE_THREADS,
  INITIAL_PENDING_MATCHES,
  unreadCountFromThreads,
  type MessageThread,
  type PendingMatch,
} from "@/lib/messages";
import { SocialLayout } from "../SocialLayout";
import { MessagesHeader } from "./MessagesHeader";
import { MessagesSearch } from "./MessagesSearch";
import { MessagesTabs, type MessagesTab } from "./MessagesTabs";
import { MessagesAvailabilityBanner } from "./MessagesAvailabilityBanner";
import { MessageThreadRow } from "./MessageThreadRow";
import { PendingMatchCard } from "./PendingMatchCard";
import { MessagesEmptyState } from "./MessagesEmptyState";

const TAB_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function MessagesPage() {
  const reduced = useReducedMotion();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<MessagesTab>("conversations");
  const [threads, setThreads] = useState<MessageThread[]>(INITIAL_MESSAGE_THREADS);
  const [pending, setPending] = useState<PendingMatch[]>(INITIAL_PENDING_MATCHES);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const transferTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (transferTimer.current) clearTimeout(transferTimer.current);
      if (highlightTimer.current) clearTimeout(highlightTimer.current);
    };
  }, []);

  const unreadCount = unreadCountFromThreads(threads);

  const filteredThreads = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return threads;
    return threads.filter(
      (thread) =>
        thread.name.toLowerCase().includes(q) ||
        thread.preview.toLowerCase().includes(q),
    );
  }, [query, threads]);

  const filteredPending = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pending;
    return pending.filter((match) => match.name.toLowerCase().includes(q));
  }, [query, pending]);

  const handleStartChat = (id: string) => {
    const match = pending.find((item) => item.id === id);
    if (!match) return;

    if (transferTimer.current) clearTimeout(transferTimer.current);
    if (highlightTimer.current) clearTimeout(highlightTimer.current);

    setPending((prev) => prev.filter((item) => item.id !== id));
    setQuery("");

    const delay = reduced ? 0 : 160;
    transferTimer.current = setTimeout(() => {
      const thread = createThreadFromPending(match);
      setThreads((prev) => [thread, ...prev]);
      setHighlightId(thread.id);
      setTab("conversations");

      highlightTimer.current = setTimeout(() => {
        setHighlightId(null);
      }, reduced ? 0 : 900);
    }, delay);
  };

  const showSearchEmpty =
    query.trim().length > 0 &&
    ((tab === "conversations" && filteredThreads.length === 0) ||
      (tab === "pending" && filteredPending.length === 0));

  const panelTransition = {
    duration: reduced ? 0 : 0.2,
    ease: TAB_EASE,
  };

  return (
    <SocialLayout active="mensajes">
      <div className="pb-20">
        <MessagesHeader unreadCount={unreadCount} />
        <MessagesSearch value={query} onChange={setQuery} />
        <MessagesTabs
          active={tab}
          onChange={setTab}
          pendingCount={pending.length}
        />
        <MessagesAvailabilityBanner />

        <div className="relative mt-3.5 min-h-[26rem]">
          <AnimatePresence initial={false} mode="sync">
            {tab === "conversations" ? (
              <motion.div
                key="conversations"
                initial={reduced ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: 6 }}
                transition={panelTransition}
                role="tabpanel"
                aria-label="Mis conversaciones"
                className="absolute inset-x-5 top-0 space-y-1.5"
              >
                {showSearchEmpty ? (
                  <MessagesEmptyState variant="search" />
                ) : filteredThreads.length === 0 ? (
                  <MessagesEmptyState variant="conversations" />
                ) : (
                  filteredThreads.map((thread, index) => (
                    <MessageThreadRow
                      key={thread.id}
                      thread={thread}
                      index={index}
                      freshlyAdded={thread.id === highlightId}
                    />
                  ))
                )}
              </motion.div>
            ) : (
              <motion.div
                key="pending"
                initial={reduced ? false : { opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -6 }}
                transition={panelTransition}
                role="tabpanel"
                aria-label="Pendientes"
                className="absolute inset-x-5 top-0 space-y-2"
              >
                {showSearchEmpty ? (
                  <MessagesEmptyState variant="search" />
                ) : filteredPending.length === 0 ? (
                  <MessagesEmptyState variant="pending" />
                ) : (
                  <>
                    <AnimatePresence initial={false}>
                      {filteredPending.map((match, index) => (
                        <PendingMatchCard
                          key={match.id}
                          match={match}
                          index={index}
                          onStartChat={handleStartChat}
                        />
                      ))}
                    </AnimatePresence>
                    <p className="px-1 pt-1 text-center font-ui text-[0.68rem] font-light tracking-[0.01em] text-white/40">
                      Esos son todos tus matches pendientes
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SocialLayout>
  );
}
