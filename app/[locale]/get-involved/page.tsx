import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing, Link } from "@/i18n/routing";
import {
    ArrowRight,
    Handshake,
    Heart,
    Users,
    Building,
    Globe,
    Brain,
    GraduationCap,
    DollarSign,
    Sparkles,
    CheckCircle,
    MessageCircle,
    type LucideIcon,
} from "lucide-react";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
    title: "Get Involved | Women Connect International",
    description:
        "Join WCI's mission to empower displaced women. Partner with us, donate, volunteer as a mentor, or explore corporate social responsibility partnerships.",
    openGraph: {
        title: "Get Involved | Women Connect International",
        description:
            "Multiple pathways to make a difference: partner, donate, volunteer, or engage your corporation in empowering displaced women worldwide.",
        url: "https://womenconnectintl.org/get-involved",
    },
};

type Props = {
    params: Promise<{ locale: string }>;
};

interface InvolvementSection {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: LucideIcon;
    color: string;
    audiences: {
        label: string;
        icon: LucideIcon;
    }[];
    offerings: string[];
    ctaLabel: string;
    ctaHref: string;
}

const sections: InvolvementSection[] = [
    {
        id: "partners",
        title: "Partners",
        subtitle: "Collaborate for greater impact",
        description:
            "We partner with diaspora associations, NGOs, mental health professionals, academic institutions, and humanitarian organisations to extend our reach and deepen our impact. Together, we can create holistic support ecosystems that no single organisation can deliver alone.",
        icon: Handshake,
        color: "#0D7377",
        audiences: [
            { label: "Diaspora Associations", icon: Globe },
            { label: "NGOs & INGOs", icon: Users },
            { label: "Mental Health Professionals", icon: Brain },
            { label: "Academic Institutions", icon: GraduationCap },
        ],
        offerings: [
            "Joint program design and co-delivery",
            "Shared access to WCI's AI-enabled platform",
            "Co-branded research and impact publications",
            "Referral pathways and beneficiary support networks",
            "Capacity building and knowledge exchange",
            "Grant co-application and fundraising collaboration",
        ],
        ctaLabel: "Explore Partnership",
        ctaHref: "/contact?type=partnership",
    },
    {
        id: "donors",
        title: "Donors",
        subtitle: "Fund transformation with full transparency",
        description:
            "Your financial support directly powers our programs -- and thanks to our blockchain-enabled transparency dashboard, you can see exactly where every dollar goes. Fund entire cohorts, sponsor specific programs, or contribute to our general fund with complete confidence.",
        icon: Heart,
        color: "#C2185B",
        audiences: [
            { label: "Individual Donors", icon: Heart },
            { label: "Foundations & Trusts", icon: Building },
            { label: "Government Aid Agencies", icon: Globe },
            { label: "Impact Investors", icon: DollarSign },
        ],
        offerings: [
            "Fund a full 12-week program cohort for 25 women",
            "Sponsor a specific program pillar",
            "Support the AI platform development",
            "Contribute to emergency psychosocial response fund",
            "Real-time blockchain-verified impact tracking",
            "Named recognition and personalised impact reports",
        ],
        ctaLabel: "Support Our Mission",
        ctaHref: "/contact?type=donation",
    },
    {
        id: "volunteers",
        title: "Volunteers",
        subtitle: "Share your skills, change a life",
        description:
            "We need dedicated volunteers to serve as mentors, workshop facilitators, content creators, and trainers. Whether you have 2 hours per month or 20, there is a meaningful role for you in our mission to empower displaced women.",
        icon: Users,
        color: "#E8A317",
        audiences: [
            { label: "Mentors", icon: MessageCircle },
            { label: "Workshop Facilitators", icon: GraduationCap },
            { label: "Trainers & Educators", icon: Brain },
            { label: "Technical Volunteers", icon: Sparkles },
        ],
        offerings: [
            "One-on-one mentoring matched by our AI engine",
            "Group facilitation for resilience and skills workshops",
            "Content development for our learning platform",
            "Translation and localisation support",
            "Technical volunteering on our platform",
            "Comprehensive onboarding and ongoing support",
        ],
        ctaLabel: "Volunteer With Us",
        ctaHref: "/contact?type=volunteer",
    },
    {
        id: "corporations",
        title: "Corporations",
        subtitle: "CSR with measurable impact",
        description:
            "Align your corporate social responsibility with real, measurable humanitarian outcomes. Our corporate partnership model offers employee engagement, skills-based volunteering, and transparent impact reporting that your stakeholders can trust.",
        icon: Building,
        color: "#0D7377",
        audiences: [
            { label: "CSR & ESG Teams", icon: Building },
            { label: "Employee Engagement", icon: Users },
            { label: "Tech Companies", icon: Sparkles },
            { label: "Financial Institutions", icon: DollarSign },
        ],
        offerings: [
            "Employee mentoring and skills-based volunteering programs",
            "Sponsored technology cohorts bearing your brand",
            "ESG-aligned impact metrics and reporting",
            "Joint advocacy and awareness campaigns",
            "Platform co-development and technology grants",
            "Tax-efficient giving structures",
        ],
        ctaLabel: "Discuss CSR Partnership",
        ctaHref: "/contact?type=corporate",
    },
];

export default async function GetInvolvedPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-white">
            {/* Hero Section */}
            <section className="w-full relative overflow-hidden py-20 md:py-32">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0D7377] via-[#0A5C5F] to-[#085456]" />
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: "32px 32px",
                    }}
                />
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#E8A317]/15 blur-[120px]" />
                <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#C2185B]/10 blur-[120px]" />

                <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8">
                            <Sparkles className="h-4 w-4 text-[#E8A317]" />
                            Join the Movement
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Get{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8A317] to-[#C2185B]">
                                Involved
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
                            There are many ways to be part of our mission to empower displaced
                            women. Whether you are an organisation, donor, volunteer, or
                            corporation, we have a meaningful pathway for you.
                        </p>

                        {/* Quick nav pills */}
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors text-sm font-medium"
                                >
                                    <section.icon className="h-4 w-4" />
                                    {section.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Involvement Sections */}
            {sections.map((section, index) => {
                const SectionIcon = section.icon;
                const isAlt = index % 2 !== 0;
                return (
                    <section
                        key={section.id}
                        id={section.id}
                        className={`w-full py-16 md:py-24 scroll-mt-20 ${
                            isAlt ? "bg-neutral-50" : "bg-white"
                        }`}
                    >
                        <div className="container mx-auto px-4 md:px-6 lg:px-8">
                            <div className="max-w-6xl mx-auto">
                                <div className="grid lg:grid-cols-2 gap-12 items-start">
                                    {/* Content side */}
                                    <div className={isAlt ? "lg:order-2" : ""}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                                style={{
                                                    backgroundColor: `${section.color}12`,
                                                }}
                                            >
                                                <SectionIcon
                                                    className="h-6 w-6"
                                                    style={{ color: section.color }}
                                                />
                                            </div>
                                            <div>
                                                <h2 className="text-3xl font-bold text-neutral-900">
                                                    {section.title}
                                                </h2>
                                                <p
                                                    className="text-sm font-medium"
                                                    style={{ color: section.color }}
                                                >
                                                    {section.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-neutral-600 leading-relaxed mb-8 text-lg">
                                            {section.description}
                                        </p>

                                        {/* Target audiences */}
                                        <div className="mb-8">
                                            <h3 className="text-sm font-bold tracking-wider text-neutral-400 uppercase mb-4">
                                                Who We Are Looking For
                                            </h3>
                                            <div className="grid grid-cols-2 gap-3">
                                                {section.audiences.map((audience) => {
                                                    const AudienceIcon = audience.icon;
                                                    return (
                                                        <div
                                                            key={audience.label}
                                                            className="flex items-center gap-2 text-sm text-neutral-700"
                                                        >
                                                            <AudienceIcon
                                                                className="h-4 w-4 flex-shrink-0"
                                                                style={{ color: section.color }}
                                                            />
                                                            <span>{audience.label}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <Link
                                            href={section.ctaHref}
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
                                            style={{ backgroundColor: section.color }}
                                        >
                                            {section.ctaLabel}
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>

                                    {/* Offerings card side */}
                                    <div className={isAlt ? "lg:order-1" : ""}>
                                        <div
                                            className="rounded-2xl p-8 border"
                                            style={{
                                                backgroundColor: `${section.color}04`,
                                                borderColor: `${section.color}15`,
                                            }}
                                        >
                                            <h3 className="text-lg font-bold text-neutral-900 mb-6">
                                                What We Offer
                                            </h3>
                                            <div className="space-y-4">
                                                {section.offerings.map((offering) => (
                                                    <div
                                                        key={offering}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <div
                                                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                                                            style={{
                                                                backgroundColor: `${section.color}15`,
                                                            }}
                                                        >
                                                            <CheckCircle
                                                                className="h-4 w-4"
                                                                style={{ color: section.color }}
                                                            />
                                                        </div>
                                                        <span className="text-neutral-700 leading-relaxed">
                                                            {offering}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* Impact numbers */}
            <section className="w-full py-16 bg-neutral-50">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                            Together We Have Achieved
                        </h2>
                        <p className="text-neutral-600">
                            The impact of our community of partners, donors, volunteers, and
                            corporate allies.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
                        {[
                            { value: "30+", label: "Partner Organisations" },
                            { value: "500+", label: "Women Empowered" },
                            { value: "150+", label: "Active Mentors" },
                            { value: "12", label: "Countries Reached" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div className="text-3xl md:text-4xl font-bold text-[#0D7377]">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-neutral-600 mt-1">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="w-full py-16 md:py-24 bg-gradient-to-br from-[#0D7377] to-[#0A5C5F] relative overflow-hidden">
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
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Not Sure Where to{" "}
                            <span className="text-[#E8A317]">Start?</span>
                        </h2>
                        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                            We would love to hear from you. Tell us about yourself and what you
                            are passionate about, and we will help you find the best way to
                            contribute.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8A317] text-white rounded-xl font-semibold hover:bg-[#d4940f] transition-colors"
                            >
                                Contact Us
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/programs"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                            >
                                Explore Our Programs
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
