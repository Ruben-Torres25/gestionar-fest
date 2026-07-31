import p1 from "@/assets/social/p1.jpg";
import p2 from "@/assets/social/p2.jpg";
import p3 from "@/assets/social/p3.jpg";
import p4 from "@/assets/social/p4.jpg";
import p5 from "@/assets/social/p5.jpg";
import p6 from "@/assets/social/p6.jpg";
import { GA_LOGO_COMPLETO, GA_LOGO_MARK } from "@/lib/ga-assets";

/** Local GA mark (Lovable CDN URLs in *.asset.json do not resolve on Vite). */
export const GESTIONAR_LOGO = GA_LOGO_COMPLETO;
export const GESTIONAR_ISOTYPE = GA_LOGO_MARK;

/** Sampled / brand-locked colors for GestionAR wordmark. */
export const GA_MARK_BLUE = "rgba(81, 165, 211, 1)";
export const GA_MARK_GREEN = "rgba(93, 164, 100, 1)";

export type TicketTier = "General" | "VIP" | "SuperVIP";

export type SocialProfile = {
  id: string;
  name: string;
  age: number;
  gender: "Mujer" | "Hombre";
  photo: string;
  tier: TicketTier;
  verified: boolean;
  phrase: string;
  tags: string[];
  affinity: string;
  matches?: boolean;
};

export const TIER_STYLE: Record<TicketTier, { color: string; glow: string }> = {
  General: { color: "var(--social-blue)", glow: "var(--social-blue)" },
  VIP: { color: "var(--epic-violet-bright)", glow: "var(--epic-violet)" },
  SuperVIP: { color: "var(--social-gold)", glow: "var(--social-gold)" },
};

export const PROFILES: SocialProfile[] = [
  {
    id: "valentina",
    name: "Valentina",
    age: 24,
    gender: "Mujer",
    photo: p1,
    tier: "VIP",
    verified: true,
    phrase: "Bailar hasta tarde, buena charla y conocer gente nueva.",
    tags: ["Electrónica", "Buena charla", "Va con amigas"],
    affinity: "Coinciden en 3 energías",
    matches: true,
  },
  {
    id: "tomas",
    name: "Tomás",
    age: 27,
    gender: "Hombre",
    photo: p2,
    tier: "General",
    verified: true,
    phrase: "Vengo por el line up, me quedo por la gente.",
    tags: ["Techno", "Primera vez", "Tranqui"],
    affinity: "Energía similar para esta noche",
  },
  {
    id: "juana",
    name: "Juana",
    age: 22,
    gender: "Mujer",
    photo: p3,
    tier: "SuperVIP",
    verified: true,
    phrase: "Si suena buen house, no me muevo de la pista.",
    tags: ["House", "Pista siempre", "Después seguimos"],
    affinity: "Comparten el mismo ritmo",
  },
  {
    id: "matias",
    name: "Matías",
    age: 29,
    gender: "Hombre",
    photo: p4,
    tier: "VIP",
    verified: true,
    phrase: "Buena birra, buena charla y after si el cuerpo aguanta.",
    tags: ["Afters", "Charla larga", "Va solo"],
    affinity: "Afinidad alta",
  },
  {
    id: "camila",
    name: "Camila",
    age: 26,
    gender: "Mujer",
    photo: p5,
    tier: "General",
    verified: true,
    phrase: "Me gusta la previa tanto como la noche.",
    tags: ["Previa", "Fotos", "Buena onda"],
    affinity: "Coinciden en 2 energías",
  },
  {
    id: "nico",
    name: "Nico",
    age: 25,
    gender: "Hombre",
    photo: p6,
    tier: "VIP",
    verified: true,
    phrase: "Vengo a escuchar fuerte y hablar bajito.",
    tags: ["Melódico", "Cerca de cabina", "Va con amigos"],
    affinity: "Energía similar para esta noche",
  },
];

export const LIVE_STATS = {
  active: 98,
  connections: 12,
  until: "07:00",
};

export const QUICK_ACCESS_META = {
  connections: 3,
  messages: 2,
};

/** Mock current guest profile for match overlays. */
export const CURRENT_USER = {
  name: "Rubén",
  photo: p6,
} as const;
