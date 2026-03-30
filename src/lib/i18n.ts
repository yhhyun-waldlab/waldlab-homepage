/**
 * Simple i18n utility for Wald Lab homepage.
 *
 * This is a lightweight implementation for initial development.
 * To upgrade to full next-intl routing:
 *   1. Install: npm install next-intl
 *   2. Add middleware.ts with createMiddleware
 *   3. Wrap app with NextIntlClientProvider
 *   4. Replace useTranslation with useTranslations from 'next-intl'
 */

export type Locale = "ko" | "en";

export const defaultLocale: Locale = "ko";
export const locales: Locale[] = ["ko", "en"];

export const localeLabels: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
};

type Messages = Record<string, unknown>;

const cachedMessages: Record<Locale, Messages> = {} as Record<Locale, Messages>;

export async function loadMessages(locale: Locale): Promise<Messages> {
  if (cachedMessages[locale]) return cachedMessages[locale];
  const messages = await import(`@/messages/${locale}.json`);
  cachedMessages[locale] = messages.default;
  return messages.default;
}

/**
 * Resolve a nested key like "nav.platform" from a messages object.
 */
function resolvePath(obj: Messages, path: string): string {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return path;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : path;
}

export function createTranslator(messages: Messages) {
  return function t(key: string, params?: Record<string, string | number>): string {
    let value = resolvePath(messages, key);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(`{${k}}`, String(v));
      });
    }
    return value;
  };
}
