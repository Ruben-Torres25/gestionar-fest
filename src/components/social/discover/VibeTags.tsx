export function VibeTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[0.65rem] text-white/85 backdrop-blur"
        >
          {t}
        </span>
      ))}
    </div>
  );
}