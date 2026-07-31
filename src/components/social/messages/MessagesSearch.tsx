import { Search } from "lucide-react";

export function MessagesSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative mx-5 mt-4 block">
      <span className="sr-only">Buscar chat o persona</span>
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 size-[1.05rem] -translate-y-1/2 text-white/40"
        strokeWidth={1.85}
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar chat o persona"
        enterKeyHint="search"
        autoComplete="off"
        className="h-[46px] w-full rounded-full border border-white/10 bg-black/35 py-2.5 pl-10 pr-4 font-ui text-[0.82rem] text-white outline-none transition-[border-color] duration-200 placeholder:text-white/38 focus:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--epic-violet-bright)]"
        style={{ touchAction: "manipulation" }}
      />
    </label>
  );
}
