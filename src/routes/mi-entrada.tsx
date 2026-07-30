import { createFileRoute } from "@tanstack/react-router";

import { EpicTicketPass } from "@/components/epic/EpicTicketPass";

export const Route = createFileRoute("/mi-entrada")({
  head: () => ({
    meta: [
      { title: "Tu Entrada · Epic Fest" },
      {
        name: "description",
        content: "Mostrá tu código QR en el ingreso de Epic Fest.",
      },
    ],
  }),
  component: MiEntradaPage,
});

function MiEntradaPage() {
  return <EpicTicketPass />;
}
