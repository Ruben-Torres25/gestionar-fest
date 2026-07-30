import { createFileRoute } from "@tanstack/react-router";

import { GaAppShell } from "@/components/ga/GaAppShell";
import { GaBottomNav } from "@/components/ga/GaBottomNav";
import { GaPartySelector } from "@/components/ga/GaPartySelector";

export const Route = createFileRoute("/fiestas")({
  head: () => ({
    meta: [
      { title: "Seleccioná una fiesta · GestionAR Business" },
      {
        name: "description",
        content: "Elegí la fiesta a la que querés acceder.",
      },
    ],
  }),
  component: FiestasPage,
});

/** Demo: accessible without prior login — no soft-guard redirect. */
function FiestasPage() {
  return (
    <GaAppShell footer={<GaBottomNav active="destacados" />}>
      <GaPartySelector />
    </GaAppShell>
  );
}
