/* eslint-disable @typescript-eslint/no-require-imports */
const { getRequestConfig } = require("next-intl/server");

module.exports = getRequestConfig(async ({ requestLocale }) => {
  const locales = ["en", "ar", "fr", "es", "pt"];
  const defaultLocale = "en";

  let locale = await requestLocale;

  if (!locale || !locales.includes(locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
