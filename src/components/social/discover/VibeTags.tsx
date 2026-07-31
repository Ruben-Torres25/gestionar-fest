export function VibeTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full border border-white/18 bg-white/[0.08] px-2 py-0.5 font-ui text-[0.62rem] text-white/82 backdrop-blur"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
