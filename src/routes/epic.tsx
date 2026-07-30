import { createFileRoute } from "@tanstack/react-router";
import { EpicLanding } from "@/components/epic/EpicLanding";

export const Route = createFileRoute("/epic")({
  head: () => ({
    meta: [
      { title: "Epic Fest · La noche está por comenzar" },
      {
        name: "description",
        content:
          "Cuenta regresiva oficial de Epic Fest: una fiesta premium nocturna. Descubrí la experiencia antes de que empiece la noche.",
      },
      { property: "og:title", content: "Epic Fest · La noche está por comenzar" },
      {
        property: "og:description",
        content: "Cuenta regresiva oficial de Epic Fest, la fiesta premium que empieza desde tu celular.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EpicPage,
});

function EpicPage() {
  return <EpicLanding />;
}
