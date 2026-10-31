import type { Locale } from "@/lib/i18n";

/** Legal pages: append ?lang=en when site locale is English */
export function legalPageHref(path: "/terms" | "/privacy", locale: Locale): string {
  return locale === "en" ? `${path}?lang=en` : path;
}

export function localeFromSearchParam(
  lang: string | null | undefined
): Locale | null {
  if (lang === "en" || lang === "ko") return lang;
  return null;
}
