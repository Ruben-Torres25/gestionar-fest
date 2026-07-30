import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, Zap } from "lucide-react";

import { setSession } from "@/lib/ga-session";
import { getMockParties, type MockParty } from "@/mocks/parties";
import { cn } from "@/lib/utils";
import { GaPartyCard } from "./GaPartyCard";

type GaPartySelectorProps = {
  className?: string;
};

/**
 * Always renders list or empty — never auto-skips to `/` for 0 or N=1.
 * Visual layout matches the Destacados mock.
 */
export function GaPartySelector({ className }: GaPartySelectorProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const parties = getMockParties();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return parties;
    return parties.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q) ||
        p.dateLabel.toLowerCase().includes(q),
    );
  }, [parties, query]);

  function handleSelect(party: MockParty) {
    setSession({ selectedPartyId: party.id });
    void navigate({ to: "/epic" });
  }

  return (
    <div className={cn("font-ga flex flex-col", className)}>
      <h1 className="text-center text-[1.5rem] font-semibold leading-tight tracking-tight text-white">
        Seleccioná una fiesta
      </h1>

      <label className="relative mt-5 block">
        <span className="sr-only">Buscador de eventos</span>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-[17px] -translate-y-1/2 text-[#50df74]"
          strokeWidth={1.85}
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscador de eventos"
          className="ga-search h-11 w-full rounded-full border border-[#3ecf6a]/55 bg-[#070b10]/70 pl-11 pr-4 text-[14px] text-white outline-none placeholder:text-white/35 focus:border-[#50df74]/85"
        />
      </label>

      <div className="mt-6 flex items-center gap-1.5">
        <Zap className="size-3.5 text-[#2f8fff]" fill="#2f8fff" aria-hidden />
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#2f8fff]">
          Destacados
        </p>
      </div>

      {parties.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-white/10 px-4 py-8 text-center" role="status">
          <p className="text-base font-medium text-white">No hay fiestas disponibles por ahora</p>
          <p className="mt-2 text-sm text-white/45">
            Volvé más tarde o pedile a tu organizador que te invite.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="mt-6 text-center text-sm text-white/45" role="status">
          No encontramos eventos para “{query}”.
        </p>
      ) : (
        <ul className="mt-1 list-none p-0">
          {filtered.map((party, index) => (
            <li key={party.id}>
              <GaPartyCard
                party={party}
                onSelect={handleSelect}
                showDivider={index < filtered.length - 1}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
