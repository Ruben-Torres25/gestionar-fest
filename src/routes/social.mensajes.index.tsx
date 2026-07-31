import { createFileRoute } from "@tanstack/react-router";
import { MessagesPage } from "@/components/social/messages/MessagesPage";

export const Route = createFileRoute("/social/mensajes/")({
  head: () => ({
    meta: [
      { title: "Mensajes · GestionAR Social" },
      {
        name: "description",
        content: "Conversaciones activas de Epic Fest dentro de GestionAR Social.",
      },
      { property: "og:title", content: "Mensajes · GestionAR Social" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MessagesPage,
});
