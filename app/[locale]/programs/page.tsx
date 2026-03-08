import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing, Link } from "@/i18n/routing";
import {
    ArrowRight,
    Heart,
    Laptop,
    Users,
    Eye,
    Sparkles,
    Target,
    Globe,
    CheckCircle,
} from "lucide-react";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
    title: "Programs | Women Connect International",
    description:
        "Explore WCI's four program pillars: Psychosocial Resilience, Digital & Economic Empowerment, Mentoring & Leadership, and Transparent Humanitarian Impact. Empowering displaced women through holistic, tech-enabled support.",
    openGraph: {
        title: "Programs | Women Connect International",
        description:
            "Four integrated program pillars empowering displaced women through psychosocial support, digital skills, mentoring, and transparent humanitarian action.",
        url: "https://womenconnectintl.org/programs",
    },
};

type Props = {
    params: Promise<{ locale: string }>;
};

const programs = [
    {
        slug: "psychosocial-resilience",
        title: "Psychosocial Resilience",
        subtitle: "Healing minds, restoring hope",
        description:
            "Culturally sensitive mental health and psychosocial support designed to help displaced women process trauma, build emotional resilience, and reclaim agency over their lives.",
        icon: Heart,
        color: "#C2185B",
        highlights: [
            "Trauma-informed group therapy",
            "Peer support circles",
            "AI emotional wellness companion",
            "Crisis intervention pathways",
        ],
    },
    {
        slug: "economic-empowerment",
        title: "Digital & Economic Empowerment",
        subtitle: "Skills for self-sufficiency",
        description:
            "Comprehensive digital literacy and economic empowerment programs that equip women with the tools, skills, and networks to generate sustainable livelihoods.",
        icon: Laptop,
        color: "#0D7377",
        highlights: [
            "Digital literacy bootcamps",
            "Micro-enterprise incubation",
            "Financial literacy workshops",
            "E-commerce marketplace training",
        ],
    },
    {
        slug: "leadership-mentoring",
        title: "Mentoring & Leadership",
        subtitle: "Growing tomorrow's leaders",
        description:
            "Structured mentorship and leadership development connecting displaced women with experienced professionals from the diaspora and global community.",
        icon: Users,
        color: "#E8A317",
        highlights: [
            "AI-powered mentor matching",
            "Leadership development cohorts",
            "Public speaking workshops",
            "Community organising training",
        ],
    },
    {
        slug: "humanitarian-impact",
        title: "Transparent Humanitarian Impact",
        subtitle: "Accountability through technology",
        description:
            "Blockchain-enabled transparency and real-time impact tracking that ensures every dollar reaches the women it is intended for, with measurable outcomes.",
        icon: Eye,
        color: "#0D7377",
        highlights: [
            "Real-time impact dashboards",
            "Blockchain-verified fund tracking",
            "Beneficiary feedback loops",
            "Open data reporting",
        ],
    },
];

export default async function ProgramsPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-white">
            {/* Hero Section */}
            <section className="w-full relative overflow-hidden py-20 md:py-32">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0D7377] via-[#0D7377]/90 to-[#0A5C5F]" />
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: "32px 32px",
                    }}
                />
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#E8A317]/15 blur-[120px]" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#C2185B]/10 blur-[120px]" />

                <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8">
                            <Sparkles className="h-4 w-4 text-[#E8A317]" />
                            Holistic Empowerment Framework
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Our{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8A317] to-[#C2185B]">
                                Programs
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
                            Four integrated pillars that address the full spectrum of challenges
                            faced by displaced women -- from emotional healing to economic
                            independence, leadership development, and transparent impact.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-[#E8A317]" />
                                <span>Multi-country reach</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-[#C2185B]" />
                                <span>Evidence-based approach</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-[#E8A317]" />
                                <span>AI-enabled delivery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Grid */}
            <section className="w-full py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                        <span className="text-xs font-bold tracking-wider text-[#0D7377] uppercase mb-4 block">
                            Four Pillars of Impact
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            Integrated Program{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D7377] to-[#C2185B]">
                                Pillars
                            </span>
                        </h2>
                        <p className="text-lg text-neutral-600">
                            Each pillar is designed to reinforce the others, creating a
                            comprehensive support ecosystem that empowers women from crisis to
                            self-sufficiency.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {programs.map((program, index) => {
                            const Icon = program.icon;
                            return (
                                <Link
                                    key={program.slug}
                                    href={`/programs/${program.slug}`}
                                    className="group relative bg-white rounded-2xl border border-neutral-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    {/* Top accent bar */}
                                    <div
                                        className="h-1.5 w-full"
                                        style={{ backgroundColor: program.color }}
                                    />

                                    <div className="p-8">
                                        {/* Icon and title */}
                                        <div className="flex items-start gap-4 mb-5">
                                            <div
                                                className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                                style={{ backgroundColor: `${program.color}12` }}
                                            >
                                                <Icon
                                                    className="h-7 w-7"
                                                    style={{ color: program.color }}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-[#0D7377] transition-colors">
                                                    {program.title}
                                                </h3>
                                                <p
                                                    className="text-sm font-medium mt-0.5"
                                                    style={{ color: program.color }}
                                                >
                                                    {program.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-neutral-600 mb-6 leading-relaxed">
                                            {program.description}
                                        </p>

                                        {/* Highlights */}
                                        <div className="grid grid-cols-2 gap-2 mb-6">
                                            {program.highlights.map((highlight) => (
                                                <div
                                                    key={highlight}
                                                    className="flex items-center gap-2 text-sm text-neutral-600"
                                                >
                                                    <CheckCircle
                                                        className="h-4 w-4 flex-shrink-0"
                                                        style={{ color: program.color }}
                                                    />
                                                    <span>{highlight}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <div className="flex items-center gap-2 text-sm font-semibold text-[#0D7377] group-hover:gap-3 transition-all">
                                            Learn more
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Impact Stats Bar */}
            <section className="w-full py-16 bg-neutral-50">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
                        {[
                            { value: "4", label: "Program Pillars" },
                            { value: "12+", label: "Active Cohorts" },
                            { value: "500+", label: "Women Supported" },
                            { value: "6", label: "Countries Reached" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div className="text-3xl md:text-4xl font-bold text-[#0D7377]">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-neutral-600 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full py-16 md:py-24 bg-gradient-to-br from-[#0D7377] to-[#0A5C5F]">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Make a{" "}
                            <span className="text-[#E8A317]">Difference?</span>
                        </h2>
                        <p className="text-lg text-white/80 mb-10">
                            Whether you want to support a program, volunteer as a mentor, or
                            partner with us, there is a place for you in our mission.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/get-involved"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8A317] text-white rounded-xl font-semibold hover:bg-[#d4940f] transition-colors"
                            >
                                Get Involved
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
