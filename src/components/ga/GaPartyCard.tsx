import { CalendarDays, ChevronRight } from "lucide-react";

import type { MockParty } from "@/mocks/parties";
import { cn } from "@/lib/utils";

type GaPartyCardProps = {
  party: MockParty;
  onSelect: (party: MockParty) => void;
  className?: string;
  showDivider?: boolean;
};

/** List row matching the fiestas mock (thumb + meta + chevron). */
export function GaPartyCard({ party, onSelect, className, showDivider = true }: GaPartyCardProps) {
  return (
    <div className={cn(className)}>
      <button
        type="button"
        onClick={() => onSelect(party)}
        className="flex w-full cursor-pointer items-center gap-3 py-3.5 text-left transition-opacity duration-200 hover:opacity-95 active:scale-[0.99]"
        aria-label={`Elegir ${party.name}`}
      >
        <div className="size-[78px] shrink-0 overflow-hidden rounded-[12px] bg-[#121820] ring-1 ring-white/5">
          {party.imageUrl ? (
            <img
              src={party.imageUrl}
              alt=""
              className={cn(
                "h-full w-full",
                party.id === "epic-fest" ? "object-contain p-2" : "object-cover",
              )}
              draggable={false}
            />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background: "linear-gradient(135deg, #095efa 0%, #50df74 100%)",
              }}
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-ga truncate text-[14.5px] font-semibold uppercase tracking-[0.02em] text-white">
            {party.name}
          </h2>
          <p className="font-ga mt-0.5 truncate text-[12.5px] font-normal text-white/45">
            {party.venue}
          </p>
          <p className="font-ga mt-1.5 inline-flex items-center gap-1.5 text-[12px] font-normal text-white/48">
            <CalendarDays className="size-3.5 shrink-0 text-white/40" aria-hidden />
            {party.dateLabel}
          </p>
        </div>

        <ChevronRight className="size-5 shrink-0 text-white/30" strokeWidth={1.75} aria-hidden />
      </button>
      {showDivider ? <div className="h-px w-full bg-white/[0.08]" /> : null}
    </div>
  );
}
