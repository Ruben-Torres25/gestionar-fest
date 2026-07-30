import { createFileRoute } from "@tanstack/react-router";
import { DiscoverPage } from "@/components/social/discover/DiscoverPage";

export const Route = createFileRoute("/social/descubrir")({
  head: () => ({
    meta: [
      { title: "Descubrir personas · GestionAR Social" },
      {
        name: "description",
        content:
          "Descubrí asistentes simulados de Epic Fest con tarjetas, pulso social y conexiones dentro de GestionAR Social.",
      },
      { property: "og:title", content: "Descubrir personas · GestionAR Social" },
      {
        property: "og:description",
        content: "Perfiles verificados simulados, afinidades por energía y conexión dentro de Epic Fest.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DiscoverPage,
});