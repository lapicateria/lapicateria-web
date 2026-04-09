export type CookieConsentStatus = "accepted" | "rejected" | "customized";

export type CookieConsent = {
  status: CookieConsentStatus;
  analytics: boolean;
  updatedAt: string;
};

export const COOKIE_CONSENT_KEY = "lp_cookie_consent";
export const COOKIE_CONSENT_EVENT = "lp-cookie-consent-updated";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;
let cachedConsent: CookieConsent | null = null;
let cachedConsentRaw: string | null = null;

export function createConsent(
  status: CookieConsentStatus,
  analytics: boolean,
): CookieConsent {
  return {
    status,
    analytics,
    updatedAt: new Date().toISOString(),
  };
}

export function readStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") {
    return null;
  }

  const localValue = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  const rawValue = localValue ?? readCookie(COOKIE_CONSENT_KEY);

  if (!rawValue) {
    cachedConsent = null;
    cachedConsentRaw = null;
    return null;
  }

  if (cachedConsentRaw === rawValue) {
    return cachedConsent;
  }

  const parsed = parseConsent(rawValue);

  if (!parsed) {
    cachedConsent = null;
    cachedConsentRaw = null;
    return null;
  }

  const nextRaw = JSON.stringify(parsed);
  if (cachedConsent && cachedConsentRaw === nextRaw) {
    return cachedConsent;
  }

  cachedConsent = parsed;
  cachedConsentRaw = nextRaw;

  return cachedConsent;
}

export function writeStoredConsent(consent: CookieConsent) {
  if (typeof window === "undefined") {
    return;
  }

  const value = JSON.stringify(consent);
  cachedConsent = consent;
  cachedConsentRaw = value;
  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  document.cookie = `${COOKIE_CONSENT_KEY}=${encodeURIComponent(value)}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`;
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: consent }));
}

export function hasAnalyticsConsent(consent: CookieConsent | null) {
  return Boolean(consent?.analytics);
}

function parseConsent(raw: string): CookieConsent | null {
  try {
    const parsed = JSON.parse(raw) as CookieConsent;
    if (
      !parsed ||
      !["accepted", "rejected", "customized"].includes(parsed.status) ||
      typeof parsed.analytics !== "boolean"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function readCookie(name: string) {
  const prefix = `${name}=`;
  const rawValue = document.cookie
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(prefix))
    ?.slice(prefix.length);

  if (!rawValue) {
    return null;
  }

  try {
    return decodeURIComponent(rawValue);
  } catch {
    return rawValue;
  }
}
