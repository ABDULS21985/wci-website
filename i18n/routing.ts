import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
});

// Lightweight wrappers around Next.js navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

// RTL locales
export const rtlLocales: Locale[] = ["ar"];

// Check if locale is RTL
export function isRtlLocale(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

// Get direction for locale
export function getDirection(locale: Locale): "ltr" | "rtl" {
  return isRtlLocale(locale) ? "rtl" : "ltr";
}

// Locale metadata for display
export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

// Locale flags (ISO country codes)
export const localeFlags: Record<Locale, string> = {
  en: "GB",
  ar: "QA",
};
