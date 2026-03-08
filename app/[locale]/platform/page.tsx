import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing, Link } from "@/i18n/routing";
import {
    ArrowRight,
    Heart,
    BookOpen,
    Users,
    BarChart,
    Shield,
    Lock,
    Eye,
    Sparkles,
    CheckCircle,
    Layers,
    Globe,
    Database,
    Fingerprint,
    Scale,
    type LucideIcon,
} from "lucide-react";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
    title: "Platform | Women Connect International",
    description:
        "Discover WCI's AI-enabled empowerment platform: Emotional Support Companion, Learning Management Hub, AI Mentor Matching Engine, and Humanitarian Transparency Dashboard.",
    openGraph: {
        title: "Platform | Women Connect International",
        description:
            "An integrated, AI-powered platform designed to deliver holistic support to displaced women -- from emotional wellness to skills training, mentoring, and transparent impact tracking.",
        url: "https://womenconnectintl.org/platform",
    },
};

type Props = {
    params: Promise<{ locale: string }>;
};

interface PlatformModule {
    title: string;
    tagline: string;
    description: string;
    icon: LucideIcon;
    color: string;
    features: string[];
}

const modules: PlatformModule[] = [
    {
        title: "Emotional Support Companion",
        tagline: "24/7 multilingual psychosocial support",
        description:
            "An AI-powered conversational companion that provides culturally sensitive emotional support, guided wellness exercises, mood tracking, and crisis de-escalation -- available anytime, in any language.",
        icon: Heart,
        color: "#C2185B",
        features: [
            "Trauma-informed conversational AI",
            "Guided breathing and mindfulness exercises",
            "Daily mood tracking and sentiment analysis",
            "Automated crisis escalation to human counsellors",
            "Available in 8+ languages including Arabic, Somali, and Tigrinya",
            "Offline-capable for low-connectivity environments",
        ],
    },
    {
        title: "Learning Management Hub",
        tagline: "Adaptive, personalised skills training",
        description:
            "A comprehensive learning platform that delivers digital literacy, vocational training, and financial education through AI-adaptive pathways tailored to each learner's pace, level, and goals.",
        icon: BookOpen,
        color: "#0D7377",
        features: [
            "AI-adaptive learning pathways",
            "Bite-sized microlearning modules",
            "Progress tracking and certification",
            "Peer-to-peer learning forums",
            "Offline content download for field use",
            "Skill assessments with personalised recommendations",
        ],
    },
    {
        title: "AI Mentor Matching Engine",
        tagline: "Intelligent connections that transform lives",
        description:
            "A sophisticated matching algorithm that pairs displaced women with mentors from the global diaspora and professional community based on goals, industry, language, cultural background, and availability.",
        icon: Users,
        color: "#E8A317",
        features: [
            "Multi-dimensional compatibility scoring",
            "Structured 6-month mentoring frameworks",
            "In-app messaging and video calling",
            "Milestone tracking and progress reports",
            "Mentor training and onboarding modules",
            "Feedback loops for continuous match improvement",
        ],
    },
    {
        title: "Humanitarian Transparency Dashboard",
        tagline: "End-to-end accountability for every dollar",
        description:
            "A blockchain-integrated dashboard that tracks fund flows from donation to beneficiary impact in real time, providing donors, partners, and programme managers with unprecedented transparency.",
        icon: BarChart,
        color: "#0D7377",
        features: [
            "Blockchain-verified financial transactions",
            "Real-time fund allocation visualisations",
            "Beneficiary impact metrics and stories",
            "Donor-specific impact reports",
            "Open data API for partner integrations",
            "Independent audit trail generation",
        ],
    },
];

const governancePrinciples = [
    {
        title: "Data Sovereignty",
        description:
            "Beneficiary data belongs to beneficiaries. We implement strict data localisation, consent-based collection, and the right to erasure.",
        icon: Database,
    },
    {
        title: "Algorithmic Fairness",
        description:
            "All AI models are regularly audited for bias across ethnicity, language, and disability. We publish bias reports publicly.",
        icon: Scale,
    },
    {
        title: "Privacy by Design",
        description:
            "End-to-end encryption, anonymised analytics, and minimal data collection principles are embedded in every feature from day one.",
        icon: Lock,
    },
    {
        title: "Informed Consent",
        description:
            "Multilingual, accessible consent flows ensure every user understands how their data is used before they share it.",
        icon: Fingerprint,
    },
    {
        title: "Transparency",
        description:
            "We publish our data governance policies, AI model cards, and privacy impact assessments openly for public scrutiny.",
        icon: Eye,
    },
    {
        title: "Do No Harm",
        description:
            "Every feature undergoes a humanitarian protection review to ensure it cannot be weaponised or cause unintended harm to vulnerable users.",
        icon: Shield,
    },
];

export default async function PlatformPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-white">
            {/* Hero Section */}
            <section className="w-full relative overflow-hidden py-20 md:py-32">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0D7377] via-[#0A5C5F] to-[#085456]" />
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full bg-[#E8A317]/10 blur-[150px]" />
                <div className="absolute -bottom-32 left-0 w-[400px] h-[400px] rounded-full bg-[#C2185B]/10 blur-[120px]" />

                <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8">
                            <Sparkles className="h-4 w-4 text-[#E8A317]" />
                            AI-Enabled Empowerment Technology
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            The WCI{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8A317] to-[#C2185B]">
                                Platform
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
                            An integrated, AI-powered platform purpose-built to deliver holistic
                            support to displaced women -- from emotional wellness and skills
                            training to mentoring and transparent humanitarian impact.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
                            <div className="flex items-center gap-2">
                                <Layers className="h-4 w-4 text-[#E8A317]" />
                                <span>4 Integrated Modules</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-[#C2185B]" />
                                <span>8+ Languages</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-[#E8A317]" />
                                <span>Privacy by Design</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Platform Modules Section */}
            <section className="w-full py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                        <span className="text-xs font-bold tracking-wider text-[#0D7377] uppercase mb-4 block">
                            Platform Modules
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            Four Powerful{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D7377] to-[#C2185B]">
                                Modules
                            </span>
                        </h2>
                        <p className="text-lg text-neutral-600">
                            Each module is designed to work independently or as part of the
                            integrated platform, ensuring flexible deployment across diverse
                            humanitarian contexts.
                        </p>
                    </div>

                    <div className="space-y-12 max-w-6xl mx-auto">
                        {modules.map((module, index) => {
                            const Icon = module.icon;
                            const isReversed = index % 2 !== 0;
                            return (
                                <div
                                    key={module.title}
                                    className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                                        isReversed ? "lg:direction-rtl" : ""
                                    }`}
                                >
                                    {/* Content side */}
                                    <div className={isReversed ? "lg:order-2" : ""}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                                style={{
                                                    backgroundColor: `${module.color}12`,
                                                }}
                                            >
                                                <Icon
                                                    className="h-6 w-6"
                                                    style={{ color: module.color }}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-neutral-900">
                                                    {module.title}
                                                </h3>
                                                <p
                                                    className="text-sm font-medium"
                                                    style={{ color: module.color }}
                                                >
                                                    {module.tagline}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-neutral-600 leading-relaxed mb-6">
                                            {module.description}
                                        </p>

                                        <div className="space-y-3">
                                            {module.features.map((feature) => (
                                                <div
                                                    key={feature}
                                                    className="flex items-center gap-3 text-sm text-neutral-600"
                                                >
                                                    <CheckCircle
                                                        className="h-4 w-4 flex-shrink-0"
                                                        style={{ color: module.color }}
                                                    />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Visual card side */}
                                    <div className={isReversed ? "lg:order-1" : ""}>
                                        <div
                                            className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
                                            style={{
                                                background: `linear-gradient(135deg, ${module.color}08 0%, ${module.color}15 100%)`,
                                            }}
                                        >
                                            <div
                                                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl"
                                                style={{
                                                    backgroundColor: `${module.color}15`,
                                                }}
                                            />

                                            {/* Module visual representation */}
                                            <div className="relative z-10">
                                                <div className="flex items-center justify-center mb-6">
                                                    <div
                                                        className="w-20 h-20 rounded-2xl flex items-center justify-center"
                                                        style={{
                                                            backgroundColor: `${module.color}18`,
                                                        }}
                                                    >
                                                        <Icon
                                                            className="h-10 w-10"
                                                            style={{ color: module.color }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Feature pills */}
                                                <div className="flex flex-wrap justify-center gap-2">
                                                    {module.features.slice(0, 4).map((feature) => (
                                                        <span
                                                            key={feature}
                                                            className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-white shadow-sm border border-neutral-100 text-neutral-700"
                                                        >
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Stats */}
                                                <div className="grid grid-cols-2 gap-4 mt-6">
                                                    <div
                                                        className="text-center p-3 rounded-lg bg-white/60 backdrop-blur-sm"
                                                    >
                                                        <div
                                                            className="text-xl font-bold"
                                                            style={{ color: module.color }}
                                                        >
                                                            {module.features.length}
                                                        </div>
                                                        <div className="text-xs text-neutral-500">
                                                            Key Features
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="text-center p-3 rounded-lg bg-white/60 backdrop-blur-sm"
                                                    >
                                                        <div
                                                            className="text-xl font-bold"
                                                            style={{ color: module.color }}
                                                        >
                                                            AI
                                                        </div>
                                                        <div className="text-xs text-neutral-500">
                                                            Powered
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Architecture Overview */}
            <section className="w-full py-16 md:py-24 bg-neutral-50">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                        <span className="text-xs font-bold tracking-wider text-[#0D7377] uppercase mb-4 block">
                            Built for Impact
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            Platform{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D7377] to-[#E8A317]">
                                Architecture
                            </span>
                        </h2>
                        <p className="text-lg text-neutral-600">
                            Designed for humanitarian contexts with offline capability,
                            multilingual support, and deployment flexibility.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                title: "Cloud-Native & Offline-Ready",
                                description:
                                    "Progressive Web App architecture ensures the platform works in low-connectivity field environments while syncing to the cloud when connected.",
                                icon: Globe,
                            },
                            {
                                title: "Modular Microservices",
                                description:
                                    "Each module operates independently, allowing partners to deploy only the components they need for their specific context.",
                                icon: Layers,
                            },
                            {
                                title: "Interoperable APIs",
                                description:
                                    "Open APIs enable integration with existing humanitarian information systems, CRM platforms, and reporting frameworks.",
                                icon: Database,
                            },
                        ].map((item) => {
                            const ItemIcon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    className="bg-white rounded-xl p-6 shadow-md border border-neutral-100"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[#0D7377]/10 flex items-center justify-center mb-4">
                                        <ItemIcon className="h-6 w-6 text-[#0D7377]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-neutral-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Data Governance & Ethics Section */}
            <section className="w-full py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                        <span className="text-xs font-bold tracking-wider text-[#C2185B] uppercase mb-4 block">
                            Responsible AI
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            Data Governance &{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C2185B] to-[#0D7377]">
                                Ethics
                            </span>
                        </h2>
                        <p className="text-lg text-neutral-600">
                            Working with vulnerable populations demands the highest standards of
                            data protection, algorithmic fairness, and ethical AI. Our governance
                            framework ensures technology serves, never harms.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {governancePrinciples.map((principle) => {
                            const PrincipleIcon = principle.icon;
                            return (
                                <div
                                    key={principle.title}
                                    className="bg-white rounded-xl p-6 shadow-md border border-neutral-100 hover:shadow-lg transition-shadow"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[#C2185B]/10 flex items-center justify-center mb-4">
                                        <PrincipleIcon className="h-6 w-6 text-[#C2185B]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                                        {principle.title}
                                    </h3>
                                    <p className="text-sm text-neutral-600 leading-relaxed">
                                        {principle.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Coming Soon CTA */}
            <section className="w-full py-16 md:py-24 bg-gradient-to-br from-[#0D7377] via-[#0A5C5F] to-[#085456] relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: "32px 32px",
                    }}
                />
                <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full bg-[#E8A317]/10 blur-[120px]" />

                <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8A317]/20 text-[#E8A317] text-sm font-semibold mb-8">
                            <Sparkles className="h-4 w-4" />
                            Coming Soon
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Be Part of the{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8A317] to-[#C2185B]">
                                Platform Launch
                            </span>
                        </h2>
                        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                            We are currently in development with our pilot partners. Join our
                            early access list to be notified when the platform launches, or reach
                            out to explore partnership opportunities.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8A317] text-white rounded-xl font-semibold hover:bg-[#d4940f] transition-colors"
                            >
                                Request Early Access
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/get-involved"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                            >
                                Partner With Us
                            </Link>
                        </div>

                        <p className="text-white/50 text-sm mt-8">
                            Pilot launch expected Q3 2026 with select partner organisations
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
