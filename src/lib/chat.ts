import p1 from "@/assets/social/p1.jpg";
import p2 from "@/assets/social/p2.jpg";
import p3 from "@/assets/social/p3.jpg";
import p4 from "@/assets/social/p4.jpg";
import p5 from "@/assets/social/p5.jpg";
import p6 from "@/assets/social/p6.jpg";
import type { MessageReceipt } from "@/lib/messages";
import { INITIAL_MESSAGE_THREADS, INITIAL_PENDING_MATCHES } from "@/lib/messages";
import { PROFILES } from "@/lib/social";
import { NEW_MATCHES, PREVIOUS_MATCHES } from "@/lib/matches";

export type ChatMessageSide = "incoming" | "outgoing";

export type ChatMessage = {
  id: string;
  side: ChatMessageSide;
  text: string;
  time: string;
  receipt?: MessageReceipt;
};

export type ChatParticipant = {
  id: string;
  name: string;
  age: number;
  photo: string;
  online?: boolean;
};

const PHOTO_BY_ID: Record<string, string> = {
  valentina: p1,
  tomi: p2,
  sofi: p3,
  nacho: p4,
  mica: p5,
  camila: p6,
  luna: p5,
};

const VALENTINA_MESSAGES: ChatMessage[] = [
  {
    id: "v1",
    side: "incoming",
    text: "Hola! Vas a Epic Fest?",
    time: "21:48",
  },
  {
    id: "v2",
    side: "outgoing",
    text: "Sí! Estoy re manija 🔥",
    time: "21:49",
    receipt: "seen",
  },
  {
    id: "v3",
    side: "incoming",
    text: "Jajaja mismo. ¿A qué hora llegás?",
    time: "21:52",
  },
  {
    id: "v4",
    side: "outgoing",
    text: "Tipo 23 hs. ¿Nos encontramos en la entrada?",
    time: "21:53",
    receipt: "seen",
  },
  {
    id: "v5",
    side: "incoming",
    text: "Dale! Yo voy a estar cerca del escenario principal 😊",
    time: "22:01",
  },
  {
    id: "v6",
    side: "outgoing",
    text: "Perfecto, te aviso cuando llegue 🚀",
    time: "22:03",
    receipt: "seen",
  },
  {
    id: "v7",
    side: "incoming",
    text: "Nos vemos en Epic?",
    time: "22:06",
  },
];

const CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  valentina: VALENTINA_MESSAGES,
  mica: [
    {
      id: "m1",
      side: "incoming",
      text: "Che, ¿salís temprano?",
      time: "21:30",
    },
    {
      id: "m2",
      side: "outgoing",
      text: "Sí, ya casi salgo",
      time: "21:35",
      receipt: "seen",
    },
    {
      id: "m3",
      side: "incoming",
      text: "Estoy llegando 😉",
      time: "21:47",
    },
  ],
  tomi: [
    {
      id: "t1",
      side: "outgoing",
      text: "¿Dónde estás?",
      time: "21:20",
      receipt: "delivered",
    },
    {
      id: "t2",
      side: "incoming",
      text: "En la fila del bar",
      time: "21:28",
    },
  ],
  sofi: [
    {
      id: "s1",
      side: "incoming",
      text: "¿Hacemos previa?",
      time: "20:20",
    },
    {
      id: "s2",
      side: "outgoing",
      text: "Dale, armemos previa",
      time: "20:38",
      receipt: "seen",
    },
  ],
  nacho: [
    {
      id: "n1",
      side: "incoming",
      text: "Qué locura la pista",
      time: "19:40",
    },
    {
      id: "n2",
      side: "outgoing",
      text: "Jajaja, buenísima noche 🔥",
      time: "19:55",
      receipt: "delivered",
    },
  ],
};

export function getChatParticipant(chatId: string): ChatParticipant | null {
  const fromThreads = INITIAL_MESSAGE_THREADS.find((t) => t.id === chatId);
  if (fromThreads) {
    return {
      id: fromThreads.id,
      name: fromThreads.name,
      age: fromThreads.age,
      photo: fromThreads.photo,
      online: fromThreads.online,
    };
  }

  const fromPending = INITIAL_PENDING_MATCHES.find((t) => t.id === chatId);
  if (fromPending) {
    return {
      id: fromPending.id,
      name: fromPending.name,
      age: fromPending.age,
      photo: fromPending.photo,
    };
  }

  const fromDiscover = PROFILES.find((p) => p.id === chatId);
  if (fromDiscover) {
    return {
      id: fromDiscover.id,
      name: fromDiscover.name,
      age: fromDiscover.age,
      photo: fromDiscover.photo,
      online: true,
    };
  }

  const fromNewMatch = NEW_MATCHES.find((m) => m.id === chatId);
  if (fromNewMatch) {
    return {
      id: fromNewMatch.id,
      name: fromNewMatch.name,
      age: 24,
      photo: fromNewMatch.photo,
      online: fromNewMatch.online,
    };
  }

  const fromPrevious = PREVIOUS_MATCHES.find((m) => m.id === chatId);
  if (fromPrevious) {
    return {
      id: fromPrevious.id,
      name: fromPrevious.name,
      age: 24,
      photo: fromPrevious.photo,
      online: fromPrevious.online,
    };
  }

  const photo = PHOTO_BY_ID[chatId];
  if (!photo) return null;

  return {
    id: chatId,
    name: chatId.charAt(0).toUpperCase() + chatId.slice(1),
    age: 24,
    photo,
  };
}

export function getChatMessages(chatId: string): ChatMessage[] {
  return CHAT_MESSAGES[chatId] ?? [
    {
      id: `${chatId}-1`,
      side: "outgoing",
      text: "Enviaste el primer mensaje",
      time: formatNowTime(),
      receipt: "sent",
    },
  ];
}

export function formatNowTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}
