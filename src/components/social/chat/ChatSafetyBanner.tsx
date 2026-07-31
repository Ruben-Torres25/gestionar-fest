import { Shield, X } from "lucide-react";

export function ChatSafetyBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      className="mx-4 mt-3 flex items-start gap-2.5 rounded-[0.9rem] border px-3 py-2.5"
      role="status"
      style={{
        borderColor: "color-mix(in oklab, var(--epic-violet) 35%, transparent)",
        background: "color-mix(in oklab, var(--epic-violet) 14%, rgba(0,0,0,0.35))",
      }}
    >
      <Shield
        className="mt-0.5 size-3.5 shrink-0 text-epic-violet-bright"
        strokeWidth={1.9}
        aria-hidden="true"
      />
      <p className="min-w-0 flex-1 font-ui text-[0.68rem] font-medium leading-snug text-white/72">
        Respetá a la otra persona. No compartas datos sensibles ni hagas cargadas.
      </p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Cerrar aviso de seguridad"
        className="mt-0.5 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--epic-violet-bright)]"
        style={{ touchAction: "manipulation" }}
      >
        <X className="size-3.5" strokeWidth={2} />
      </button>
    </div>
  );
}
