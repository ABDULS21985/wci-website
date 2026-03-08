import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
    ContactHero,
    EnhancedContactForm,
    OfficeTabs,
    TrustIndicators,
    ContactMethods,
} from "../../../components/contact";
import { ArrowRight } from "lucide-react";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/shared/json-ld";
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
    title: "Contact Us | Women Connect International",
    description:
        "Get in touch with Women Connect International in Doha, Qatar. Reach out for partnerships, program inquiries, volunteer opportunities, or to learn how you can support diaspora women's empowerment.",
    openGraph: {
        title: "Contact Women Connect International",
        description:
            "Connect with WCI in Doha, Qatar for partnerships, programs, and support opportunities.",
        url: "https://womenconnectintl.org/contact",
    },
};

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <JsonLd data={generateLocalBusinessSchema()} />
            <JsonLd data={generateBreadcrumbSchema([
                { name: "Home", url: "/" },
                { name: "Contact", url: "/contact" },
            ])} />
            <div className="bg-white min-h-screen">
                {/* Skip to form link for accessibility */}
                <a
                    href="#contact-form"
                    className="skip-nav"
                >
                    Skip to contact form
                </a>

                {/* Premium Hero Section */}
                <ContactHero />

                {/* Main Content - Split Layout */}
                <section className="py-16 md:py-24" id="contact-form">
                    <div className="container mx-auto px-4 md:px-6 lg:px-8">
                        {/* Section Header */}
                        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                            <span className="overline text-xs font-bold tracking-wider text-primary uppercase mb-4 block">
                                Get in Touch
                            </span>
                            <h2 className="text-display text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                                How Can We{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-orange">
                                    Help You?
                                </span>
                            </h2>
                            <p className="text-lead text-lg text-neutral-600">
                                Choose your preferred way to connect. We typically respond within 2 hours during business hours.
                            </p>
                        </div>

                        {/* Split Layout: Form Left, Trust Right */}
                        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto">
                            {/* Left Column - Contact Form */}
                            <div className="lg:col-span-7">
                                <div className="lg:sticky lg:top-24">
                                    <EnhancedContactForm />
                                </div>
                            </div>

                            {/* Right Column - Trust Indicators */}
                            <div className="lg:col-span-5">
                                <div className="lg:sticky lg:top-24">
                                    <TrustIndicators />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Alternative Contact Methods */}
                <ContactMethods />

                {/* Office Locations - Tab-based */}
                <section className="py-16 md:py-24 bg-neutral-50">
                    <div className="container mx-auto px-4 md:px-6 lg:px-8">
                        <div className="max-w-6xl mx-auto">
                            <OfficeTabs />
                        </div>
                    </div>
                </section>

                {/* Premium CTA Section */}
                <section className="relative py-20 md:py-28 overflow-hidden">
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-secondary" />
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px',
                        }}
                    />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-orange/15 rounded-full blur-[120px]" />

                    <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                                Ready to Make a{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange via-secondary-yellow to-accent-yellow">
                                    Difference?
                                </span>
                            </h2>
                            <p className="text-lead text-lg text-white/60 mb-10 max-w-2xl mx-auto">
                                Join our growing community of partners and supporters empowering
                                diaspora women through resilience, skills, and leadership.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/programs"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-xl font-semibold hover:bg-neutral-100 transition-colors btn-press"
                                >
                                    Explore Our Programs
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/get-involved"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                                >
                                    Get Involved
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
