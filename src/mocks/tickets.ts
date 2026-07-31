export type MockTicketTier = {
  id: string;
  name: string;
  description: string;
  priceLabel: string;
  icon: "ticket" | "star" | "gem";
  badgeLabel: string;
};

export const MOCK_EVENT_SUMMARY = {
  name: "EPIC FEST",
  venue: "Salón Aurora · Olavarría",
  dateLabel: "sáb, 1 ago 2026 · 23:30 hs",
  logoUrl: "/epic/logo.png",
  bearUrl: "/ga/party-epic-fest-suit.png",
} as const;

export const MOCK_TICKET_TIERS: MockTicketTier[] = [
  {
    id: "general",
    name: "General",
    description: "Acceso al evento",
    priceLabel: "$ 18.000",
    icon: "ticket",
    badgeLabel: "Entrada General",
  },
  {
    id: "vip",
    name: "VIP",
    description: "Acceso preferencial + zona VIP",
    priceLabel: "$ 25.000",
    icon: "star",
    badgeLabel: "Entrada VIP",
  },
  {
    id: "supervip",
    name: "SuperVIP",
    description: "Acceso premium + beneficios exclusivos",
    priceLabel: "$ 30.000",
    icon: "gem",
    badgeLabel: "Entrada SuperVIP",
  },
];

export const MOCK_TICKET_HOLDER = {
  name: "Rubén Torres",
  dni: "38.123.456",
  ticketId: "EPF-2026-000184",
} as const;

export function getTicketTier(id: string | null | undefined) {
  return MOCK_TICKET_TIERS.find((t) => t.id === id) ?? MOCK_TICKET_TIERS[0];
}
