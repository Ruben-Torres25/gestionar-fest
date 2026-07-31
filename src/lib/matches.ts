import p1 from "@/assets/social/p1.jpg";
import p2 from "@/assets/social/p2.jpg";
import p3 from "@/assets/social/p3.jpg";
import p4 from "@/assets/social/p4.jpg";
import p5 from "@/assets/social/p5.jpg";

export type MatchRing = "blue" | "violet";

export type NewMatch = {
  id: string;
  name: string;
  photo: string;
  ring: MatchRing;
  online?: boolean;
  status: string;
  statusAccent?: string;
  tag: string;
  tagIcon: "zap" | "chat";
  cta: "filled" | "outline";
};

export type PreviousMatch = {
  id: string;
  name: string;
  photo: string;
  ring: MatchRing;
  online?: boolean;
  preview: string;
  time: string;
  unread?: number;
};

export const NEW_MATCHES: NewMatch[] = [
  {
    id: "valentina",
    name: "Valentina",
    photo: p1,
    ring: "blue",
    online: true,
    status: "Match hace",
    statusAccent: "5 min",
    tag: "Electrónica",
    tagIcon: "zap",
    cta: "filled",
  },
  {
    id: "mica",
    name: "Mica",
    photo: p5,
    ring: "violet",
    status: "Todavía no hablaron",
    tag: "Buena charla",
    tagIcon: "chat",
    cta: "outline",
  },
  {
    id: "tomi",
    name: "Tomi",
    photo: p2,
    ring: "violet",
    status: "Match reciente",
    tag: "After",
    tagIcon: "zap",
    cta: "outline",
  },
];

export const PREVIOUS_MATCHES: PreviousMatch[] = [
  {
    id: "luli",
    name: "Luli",
    photo: p3,
    ring: "violet",
    preview: "Nos vemos en Epic?",
    time: "22:14",
    unread: 2,
  },
  {
    id: "nacho",
    name: "Nacho",
    photo: p4,
    ring: "blue",
    online: true,
    preview: "Jajaja, buenísima noche 🔥",
    time: "21:47",
  },
  {
    id: "sofi",
    name: "Sofi",
    photo: p5,
    ring: "violet",
    preview: "Vos también! ✨",
    time: "20:38",
  },
];

export const MATCHES_META = {
  newCount: NEW_MATCHES.length,
};
