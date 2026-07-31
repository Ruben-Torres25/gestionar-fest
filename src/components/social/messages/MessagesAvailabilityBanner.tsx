import { Clock } from "lucide-react";
import { MESSAGES_META } from "@/lib/messages";

export function MessagesAvailabilityBanner() {
  return (
    <div
      className="mx-5 mt-2.5 flex min-h-7 items-center justify-center gap-1.5 rounded-full border border-white/8 bg-black/25 px-3 py-1"
      role="status"
    >
      <Clock
        className="size-3 shrink-0 text-epic-violet-bright/85"
        strokeWidth={1.9}
        aria-hidden="true"
      />
      <p className="font-ui text-[0.65rem] font-medium tracking-[0.01em] text-white/55">
        Chats disponibles hasta las{" "}
        <span className="font-semibold text-epic-violet-bright">
          {MESSAGES_META.availableUntil}
        </span>
      </p>
    </div>
  );
}
