import { Link } from "@tanstack/react-router";
import { ArrowLeft, MoreVertical } from "lucide-react";
import type { ChatParticipant } from "@/lib/chat";

export function ChatHeader({ participant }: { participant: ChatParticipant }) {
  return (
    <header
      className="relative z-20 flex items-center gap-3 border-b border-white/8 px-4 pb-3.5"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 0.85rem)",
        background:
          "linear-gradient(180deg, rgba(5,3,16,0.94) 0%, rgba(5,3,16,0.7) 100%)",
        backdropFilter: "blur(14px)",
      }}
    >
      <Link
        to="/social/mensajes"
        aria-label="Volver a mensajes"
        className="flex size-10 min-h-10 min-w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/90 transition-colors duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--epic-violet-bright)]"
        style={{ touchAction: "manipulation" }}
      >
        <ArrowLeft className="size-[1.1rem]" strokeWidth={1.85} />
      </Link>

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="relative shrink-0">
          <img
            src={participant.photo}
            alt=""
            className="size-11 rounded-full object-cover"
            style={{
              boxShadow:
                "0 0 0 1.5px color-mix(in oklab, var(--epic-violet-bright) 42%, transparent)",
            }}
            draggable={false}
          />
          {participant.online && (
            <span
              className="absolute bottom-0 right-0 size-2.5 rounded-full border-[1.5px] border-[#050310]"
              style={{ background: "var(--gestionar-green)" }}
              aria-hidden="true"
            />
          )}
        </div>
        <div className="min-w-0 py-0.5">
          <h1 className="truncate font-ui text-[1rem] font-semibold leading-none tracking-[-0.01em] text-white">
            {participant.name}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 font-ui text-[0.7rem] font-medium leading-none">
            {participant.online ? (
              <>
                <span
                  className="inline-block size-1.5 rounded-full"
                  style={{
                    background: "var(--gestionar-green)",
                    boxShadow:
                      "0 0 5px color-mix(in oklab, var(--gestionar-green) 65%, transparent)",
                  }}
                />
                <span style={{ color: "var(--gestionar-green)" }}>En línea</span>
              </>
            ) : (
              <span className="text-white/45">Desconectado</span>
            )}
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label="Más opciones"
        className="flex size-10 min-h-10 min-w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/75 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--epic-violet-bright)]"
        style={{ touchAction: "manipulation" }}
      >
        <MoreVertical className="size-5" strokeWidth={1.85} />
      </button>
    </header>
  );
}
