import { createFileRoute, redirect } from "@tanstack/react-router";

/** App entry always opens GestionAR login. */
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/login" });
  },
});
