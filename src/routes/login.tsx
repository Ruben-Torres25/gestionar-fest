import { createFileRoute } from "@tanstack/react-router";

import { GaAuthShell } from "@/components/ga/GaAuthShell";
import { GaLoginForm } from "@/components/ga/GaLoginForm";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Ingresar · GestionAR Business" },
      {
        name: "description",
        content: "Accedé a tu cuenta GestionAR Business para continuar.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <GaAuthShell>
      <GaLoginForm />
    </GaAuthShell>
  );
}
