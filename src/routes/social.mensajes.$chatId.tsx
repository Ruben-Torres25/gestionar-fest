import { createFileRoute } from "@tanstack/react-router";
import { ChatPage } from "@/components/social/chat/ChatPage";
import { getChatParticipant } from "@/lib/chat";

export const Route = createFileRoute("/social/mensajes/$chatId")({
  head: ({ params }) => {
    const participant = getChatParticipant(params.chatId);
    const title = participant
      ? `${participant.name} · Chat · GestionAR Social`
      : "Chat · GestionAR Social";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: "Chat individual de Epic Fest dentro de GestionAR Social.",
        },
        { property: "og:title", content: title },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ChatRoute,
});

function ChatRoute() {
  const { chatId } = Route.useParams();
  return <ChatPage chatId={chatId} />;
}
