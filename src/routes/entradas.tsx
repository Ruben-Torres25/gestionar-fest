import { createFileRoute } from "@tanstack/react-router";

import { EpicTicketSelector } from "@/components/epic/EpicTicketSelector";

export const Route = createFileRoute("/entradas")({
  head: () => ({
    meta: [
      { title: "Seleccioná tu entrada · Epic Fest" },
      {
        name: "description",
        content: "Elegí el tipo de entrada para Epic Fest.",
      },
    ],
  }),
  component: EntradasPage,
});

function EntradasPage() {
  return <EpicTicketSelector />;
}
