import p1 from "@/assets/social/p1.jpg";
import p2 from "@/assets/social/p2.jpg";
import p3 from "@/assets/social/p3.jpg";
import p4 from "@/assets/social/p4.jpg";
import p5 from "@/assets/social/p5.jpg";
import p6 from "@/assets/social/p6.jpg";

export type MessagePreviewKind = "text" | "typing";
export type MessageReceipt = "sent" | "delivered" | "seen";

export type MessageThread = {
  id: string;
  name: string;
  age: number;
  photo: string;
  online?: boolean;
  preview: string;
  previewKind: MessagePreviewKind;
  time: string;
  unread?: number;
  highlighted?: boolean;
  receipt?: MessageReceipt;
  muted?: boolean;
};

export type PendingMatch = {
  id: string;
  name: string;
  age: number;
  photo: string;
  matchedAgo: string;
  commonCount: number;
  featured?: boolean;
};

export const INITIAL_MESSAGE_THREADS: MessageThread[] = [
  {
    id: "valentina",
    name: "Valentina",
    age: 24,
    photo: p1,
    online: true,
    preview: "Nos vemos en Epic?",
    previewKind: "text",
    time: "22:14",
    unread: 2,
    highlighted: true,
  },
  {
    id: "mica",
    name: "Mica",
    age: 23,
    photo: p5,
    online: true,
    preview: "Estoy llegando 😉",
    previewKind: "text",
    time: "21:47",
  },
  {
    id: "tomi",
    name: "Tomi",
    age: 25,
    photo: p2,
    online: true,
    preview: "Escribiendo",
    previewKind: "typing",
    time: "21:32",
  },
  {
    id: "sofi",
    name: "Sofi",
    age: 22,
    photo: p3,
    preview: "Dale, armemos previa",
    previewKind: "text",
    time: "20:38",
    receipt: "seen",
  },
  {
    id: "nacho",
    name: "Nacho",
    age: 27,
    photo: p4,
    preview: "Jajaja, buenísima noche 🔥",
    previewKind: "text",
    time: "19:55",
    muted: true,
  },
];

export const INITIAL_PENDING_MATCHES: PendingMatch[] = [
  {
    id: "camila",
    name: "Camila",
    age: 23,
    photo: p6,
    matchedAgo: "hace 5 min",
    commonCount: 3,
    featured: true,
  },
  {
    id: "luna",
    name: "Luna",
    age: 25,
    photo: p5,
    matchedAgo: "hace 18 min",
    commonCount: 2,
  },
];

export const MESSAGES_META = {
  unread: 2,
  availableUntil: "00:00",
};

export function unreadCountFromThreads(threads: MessageThread[]) {
  return threads.reduce((sum, thread) => sum + (thread.unread ?? 0), 0);
}

export function createThreadFromPending(pending: PendingMatch): MessageThread {
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return {
    id: pending.id,
    name: pending.name,
    age: pending.age,
    photo: pending.photo,
    preview: "Enviaste el primer mensaje",
    previewKind: "text",
    time,
    receipt: "sent",
  };
}
