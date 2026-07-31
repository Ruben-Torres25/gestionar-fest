export type MockParty = {
  id: string;
  name: string;
  dateLabel: string;
  venue: string;
  /** Optional square thumbnail for list rows */
  imageUrl?: string;
};

/** Set to `true` to exercise the empty-state UI on `/fiestas`. */
export const USE_EMPTY_PARTIES = false;

const SEEDED_PARTIES: MockParty[] = [
  {
    id: "epic-fest",
    name: "EPIC FEST | OLAVARRÍA",
    dateLabel: "sáb, 1 ago 2026 · 23:30 hs",
    venue: "Salón Aurora | Olavarría",
    imageUrl: "/epic/logo.png",
  },
  {
    id: "neon-vibes",
    name: "NEON VIBES | AZUL",
    dateLabel: "sáb, 8 ago 2026 · 23:00 hs",
    venue: "Club del Fuerte | Azul",
    imageUrl: "/ga/party-neon-vibes.png",
  },
  {
    id: "sunset-club",
    name: "SUNSET CLUB | TANDIL",
    dateLabel: "sáb, 15 ago 2026 · 22:30 hs",
    venue: "Complejo Skyline | Tandil",
    imageUrl: "/ga/party-sunset-club.png",
  },
];

export function getMockParties(): MockParty[] {
  return USE_EMPTY_PARTIES ? [] : SEEDED_PARTIES;
}
