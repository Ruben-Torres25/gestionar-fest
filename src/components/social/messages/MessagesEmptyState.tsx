import { Link } from "@tanstack/react-router";
import { MessageCircle, MessageSquareDashed } from "lucide-react";

export function MessagesEmptyState({
  variant,
}: {
  variant: "conversations" | "pending" | "search";
}) {
  if (variant === "search") {
    return (
      <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.02] px-4 py-8 text-center">
        <MessageCircle
          className="mx-auto size-5 text-white/30"
          strokeWidth={1.6}
          aria-hidden="true"
        />
        <p className="mt-3 font-ui text-sm font-medium text-white/70">
          Sin resultados
        </p>
        <p className="mt-1.5 font-ui text-[0.78rem] font-light text-white/45">
          Probá con otro nombre o mensaje.
        </p>
      </div>
    );
  }

  if (variant === "pending") {
    return (
      <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.02] px-4 py-9 text-center">
        <MessageSquareDashed
          className="mx-auto size-5 text-white/30"
          strokeWidth={1.6}
          aria-hidden="true"
        />
        <h2 className="mt-3 font-ui text-[0.95rem] font-semibold text-white/85">
          No tenés chats pendientes
        </h2>
        <p className="mt-1.5 font-ui text-[0.78rem] font-light leading-relaxed text-white/45">
          Cuando hagas un nuevo match, va a aparecer acá.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.02] px-4 py-9 text-center">
      <MessageCircle
        className="mx-auto size-5 text-white/30"
        strokeWidth={1.6}
        aria-hidden="true"
      />
      <h2 className="mt-3 font-ui text-[0.95rem] font-semibold text-white/85">
        Todavía no hay mensajes
      </h2>
      <p className="mt-1.5 font-ui text-[0.78rem] font-light leading-relaxed text-white/45">
        Hacé match y empezá la charla antes de la fiesta.
      </p>
      <Link
        to="/social/descubrir"
        className="mt-4 inline-flex min-h-10 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-4 font-ui text-[0.75rem] font-semibold text-white/85 transition-colors hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--epic-violet-bright)]"
        style={{ touchAction: "manipulation" }}
      >
        Ver gente
      </Link>
    </div>
  );
}
