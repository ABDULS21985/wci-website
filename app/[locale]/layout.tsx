import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";
import { routing, getDirection, type Locale } from "../../i18n/routing";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { SkipLink } from "../../components/ui/accessibility";
import { ScrollProgress } from "../../components/ui/scroll-progress";
import { BackToTop } from "../../components/ui/back-to-top";
import { CursorProvider, CustomCursorWrapper } from "../../components/ui/custom-cursor";
import { QueryProvider } from "../../providers/query-provider";
import { GSAPProvider } from "../../providers/gsap-provider";
import { SoundProvider } from "../../providers/sound-provider";
import { GoogleAnalytics } from "../../components/analytics";
import { JsonLd } from "../../components/shared/json-ld";
import { generateOrganizationSchema } from "../../lib/schema";
import { PageContentWrapper } from "../../components/layout/page-content-wrapper";
import "../globals.css";

// Noto Sans Arabic for RTL support
const notoSansArabic = localFont({
  src: [
    { path: "../../fonts/NotoSansArabic-Light.ttf", weight: "300", style: "normal" },
    { path: "../../fonts/NotoSansArabic-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/NotoSansArabic-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../fonts/NotoSansArabic-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../fonts/NotoSansArabic-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-noto-arabic",
  display: "swap",
});

const aptos = localFont({
  src: [
    { path: "../../fonts/Aptos-Light.ttf", weight: "300", style: "normal" },
    { path: "../../fonts/Aptos-Light-Italic.ttf", weight: "300", style: "italic" },
    { path: "../../fonts/Aptos.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/Aptos-Italic.ttf", weight: "400", style: "italic" },
    { path: "../../fonts/Aptos-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../fonts/Aptos-SemiBold-Italic.ttf", weight: "600", style: "italic" },
    { path: "../../fonts/Aptos-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../fonts/Aptos-Bold-Italic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-aptos",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}


export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side
  const messages = await getMessages();
  const direction = getDirection(locale as Locale);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd data={generateOrganizationSchema()} />
      </head>
      <body
        suppressHydrationWarning
        className={`${aptos.variable} ${notoSansArabic.variable} antialiased flex flex-col min-h-screen font-sans`}
      >
        <GoogleAnalytics />
        <QueryProvider>
          <GSAPProvider>
            <SoundProvider>
              <NextIntlClientProvider messages={messages}>
                {/* Custom Cursor - Desktop Only */}
                <CursorProvider>
                  <CustomCursorWrapper />
                </CursorProvider>

                {/* Skip Navigation Link for WCAG 2.1 AA Compliance */}
                <SkipLink href="#main-content">Skip to main content</SkipLink>

                {/* Scroll Progress Indicator */}
                <ScrollProgress />

                <Navbar />
                <main
                  id="main-content"
                  className="flex-1"
                  tabIndex={-1}
                  role="main"
                  aria-label="Main content"
                >
                  <PageContentWrapper>
                    {children}
                  </PageContentWrapper>
                </main>
                <Footer />

                {/* Back to Top Button */}
                <BackToTop />
              </NextIntlClientProvider>
            </SoundProvider>
          </GSAPProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
