import { createFileRoute } from "@tanstack/react-router";

import { GaAuthShell } from "@/components/ga/GaAuthShell";
import { GaRegistroForm } from "@/components/ga/GaRegistroForm";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Crear cuenta · GestionAR Business" },
      {
        name: "description",
        content: "Registrate como invitado en GestionAR Business.",
      },
    ],
  }),
  component: RegistroPage,
});

function RegistroPage() {
  return (
    <GaAuthShell>
      <GaRegistroForm />
    </GaAuthShell>
  );
}
