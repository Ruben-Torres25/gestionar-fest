import { createFileRoute } from "@tanstack/react-router";
import { MatchesPage } from "@/components/social/matches/MatchesPage";

export const Route = createFileRoute("/social/matches")({
  head: () => ({
    meta: [
      { title: "Hice match con... · GestionAR Social" },
      {
        name: "description",
        content: "Nuevos matches y conversaciones de Epic Fest dentro de GestionAR Social.",
      },
      { property: "og:title", content: "Hice match con... · GestionAR Social" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MatchesPage,
});
