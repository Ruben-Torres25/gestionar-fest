import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/social/mensajes")({
  component: MensajesLayout,
});

function MensajesLayout() {
  return <Outlet />;
}
