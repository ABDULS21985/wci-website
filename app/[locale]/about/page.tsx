import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
    AboutHero,
    KeyMetricsBar,
    MissionVisionSection,
    CompanyTimeline,
    TeamSection,
    GlobalPresenceSection,
    AboutCtaSection,
} from "../../../components/about";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
    title: "About Us | Global Digitalbit Limited",
    description: "Learn about Global Digitalbit Limited - a pioneering IT company dedicated to improving lives through technology. Discover our mission, vision, and commitment to excellence in data analytics, AI, cybersecurity, and CBDC solutions.",
    openGraph: {
        title: "About Global Digitalbit Limited",
        description: "Pioneering IT company serving local and international clients with excellence and innovation in technology solutions.",
        url: "https://globaldigibit.com/about",
    },
};

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-white">
            {/* 1. Full-viewport Hero with parallax split layout */}
            <AboutHero />

            {/* 2. Key Metrics Bar - brand gradient with animated counters */}
            <KeyMetricsBar />

            {/* 3. Mission/Vision/Values - 3 cards with hover glow */}
            <MissionVisionSection />

            {/* 4. Company Timeline - scroll-driven line drawing animation */}
            <CompanyTimeline />

            {/* 5. Team Section - grayscale-to-color photos with modal */}
            <TeamSection />

            {/* 6. Global Presence - dot-grid map with pulsing markers */}
            <GlobalPresenceSection />

            {/* 7. Final CTA Section */}
            <AboutCtaSection />
        </main>
    );
}
