import { createFileRoute } from "@tanstack/react-router";
import { SocialHome } from "@/components/social/SocialHome";

export const Route = createFileRoute("/social/")({
  head: () => ({
    meta: [
      { title: "GestionAR Social" },
      {
        name: "description",
        content:
          "Prototipo visual del módulo social de GestionAR Business: descubrí personas que también van a Epic Fest.",
      },
      { property: "og:title", content: "GestionAR Social" },
      {
        property: "og:description",
        content: "La previa también se vive acá: experiencia social del evento Epic Fest.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SocialHome,
});