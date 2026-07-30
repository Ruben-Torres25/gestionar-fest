const STORAGE_KEY = "ga-mock-session";

export type GaMockSession = {
  email: string | null;
  remember: boolean;
  selectedPartyId: string | null;
  /** Purchased ticket tier id (general | vip | supervip) */
  ticketTierId: string | null;
};

const EMPTY_SESSION: GaMockSession = {
  email: null,
  remember: false,
  selectedPartyId: null,
  ticketTierId: null,
};

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof sessionStorage !== "undefined";
}

export function getSession(): GaMockSession {
  if (!canUseStorage()) return { ...EMPTY_SESSION };

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_SESSION };
    const parsed = JSON.parse(raw) as Partial<GaMockSession>;
    return {
      email: parsed.email ?? null,
      remember: Boolean(parsed.remember),
      selectedPartyId: parsed.selectedPartyId ?? null,
      ticketTierId: parsed.ticketTierId ?? null,
    };
  } catch {
    return { ...EMPTY_SESSION };
  }
}

export function setSession(patch: Partial<GaMockSession>): GaMockSession {
  const next = { ...getSession(), ...patch };
  if (canUseStorage()) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}

export function clearSession(): void {
  if (canUseStorage()) {
    sessionStorage.removeItem(STORAGE_KEY);
  }
}
