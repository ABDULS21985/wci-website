import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Heart,
    Laptop,
    Users,
    Eye,
    Target,
    Lightbulb,
    TrendingUp,
    MessageCircle,
    BookOpen,
    Shield,
    BarChart,
    Globe,
    Handshake,
    GraduationCap,
    Sparkles,
    type LucideIcon,
} from "lucide-react";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

/* ---------- Program Data ---------- */

interface ProgramData {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    icon: LucideIcon;
    color: string;
    overview: string[];
    activities: {
        title: string;
        description: string;
        icon: LucideIcon;
    }[];
    outcomes: string[];
    ctaTitle: string;
    ctaDescription: string;
}

const programsData: Record<string, ProgramData> = {
    "psychosocial-resilience": {
        slug: "psychosocial-resilience",
        title: "Psychosocial Resilience",
        subtitle: "Healing minds, restoring hope",
        description:
            "Culturally sensitive mental health and psychosocial support designed to help displaced women process trauma, build emotional resilience, and reclaim agency over their lives.",
        icon: Heart,
        color: "#C2185B",
        overview: [
            "Displacement and conflict leave deep psychological scars. Our Psychosocial Resilience program addresses the emotional and mental health needs of displaced women through evidence-based, culturally grounded interventions.",
            "We combine traditional healing practices with modern psychological science, delivered by trained facilitators who understand the lived experience of displacement. Our AI-enabled Emotional Support Companion extends care beyond in-person sessions, providing 24/7 crisis support and guided exercises.",
            "Each cohort progresses through a structured 12-week journey from crisis stabilisation to long-term resilience building, with personalised pathways based on individual needs assessments.",
        ],
        activities: [
            {
                title: "Trauma-Informed Group Therapy",
                description:
                    "Facilitated group sessions using narrative exposure therapy and cognitive behavioural techniques adapted for displaced populations.",
                icon: MessageCircle,
            },
            {
                title: "Peer Support Circles",
                description:
                    "Community-based support groups where women share experiences, build solidarity, and develop coping strategies together.",
                icon: Users,
            },
            {
                title: "AI Emotional Wellness Companion",
                description:
                    "24/7 multilingual chatbot providing guided breathing exercises, mood tracking, crisis de-escalation, and warm referrals to human counsellors.",
                icon: Sparkles,
            },
            {
                title: "Mindfulness & Body-Based Practices",
                description:
                    "Yoga, meditation, and somatic experiencing sessions designed to help women reconnect with their bodies and regulate stress responses.",
                icon: Heart,
            },
            {
                title: "Family Resilience Workshops",
                description:
                    "Parenting support and family communication workshops addressing intergenerational trauma and strengthening family bonds.",
                icon: Handshake,
            },
            {
                title: "Crisis Intervention Pathways",
                description:
                    "Rapid-response protocols connecting women in acute distress with qualified mental health professionals and safe spaces.",
                icon: Shield,
            },
        ],
        outcomes: [
            "70% reduction in self-reported PTSD symptoms after 12 weeks",
            "85% of participants report improved emotional regulation",
            "90% completion rate across all cohorts",
            "Active peer support networks sustained beyond program completion",
            "Validated psychometric improvements on WHO-5 wellbeing index",
            "Reduced social isolation through community reintegration",
        ],
        ctaTitle: "Support Healing Journeys",
        ctaDescription:
            "Help us extend psychosocial support to more displaced women. Your contribution funds trained facilitators, safe spaces, and our AI wellness companion.",
    },
    "economic-empowerment": {
        slug: "economic-empowerment",
        title: "Digital & Economic Empowerment",
        subtitle: "Skills for self-sufficiency",
        description:
            "Comprehensive digital literacy and economic empowerment programs that equip women with the tools, skills, and networks to generate sustainable livelihoods.",
        icon: Laptop,
        color: "#0D7377",
        overview: [
            "Economic independence is the foundation of lasting empowerment. Our Digital & Economic Empowerment program bridges the digital divide and creates pathways to sustainable livelihoods for displaced women.",
            "We deliver progressive training that takes women from basic digital literacy to advanced skills in areas like e-commerce, digital marketing, data entry, and content creation. Each participant receives a personalised learning pathway through our AI-powered Learning Management Hub.",
            "Beyond skills training, we provide micro-enterprise incubation support, seed funding facilitation, and market access through partnerships with e-commerce platforms and local businesses.",
        ],
        activities: [
            {
                title: "Digital Literacy Bootcamps",
                description:
                    "Foundational training in smartphone and computer use, internet navigation, online safety, and essential productivity tools.",
                icon: Laptop,
            },
            {
                title: "Vocational Skills Training",
                description:
                    "Specialised tracks in e-commerce, digital marketing, graphic design, data entry, and virtual assistance.",
                icon: GraduationCap,
            },
            {
                title: "Micro-Enterprise Incubation",
                description:
                    "Business planning, financial management, and market access support for women launching small businesses.",
                icon: TrendingUp,
            },
            {
                title: "Financial Literacy Workshops",
                description:
                    "Budgeting, saving, mobile money, and responsible borrowing education to build financial confidence.",
                icon: BarChart,
            },
            {
                title: "AI-Powered Learning Pathways",
                description:
                    "Personalised, self-paced learning modules delivered through our platform with adaptive assessments and progress tracking.",
                icon: Sparkles,
            },
            {
                title: "Market Linkage & Networking",
                description:
                    "Connections to buyers, platforms, and professional networks that help women monetise their new skills.",
                icon: Globe,
            },
        ],
        outcomes: [
            "80% of graduates gain income-generating activities within 3 months",
            "Average 45% increase in household income for participants",
            "200+ micro-enterprises launched through the incubation track",
            "95% digital literacy proficiency rate post-training",
            "Partnerships with 15+ e-commerce platforms for market access",
            "60% of graduates report improved financial decision-making",
        ],
        ctaTitle: "Invest in Economic Freedom",
        ctaDescription:
            "Sponsor a digital skills cohort or support micro-enterprise seed funding. Every investment creates ripple effects across families and communities.",
    },
    "leadership-mentoring": {
        slug: "leadership-mentoring",
        title: "Mentoring & Leadership",
        subtitle: "Growing tomorrow's leaders",
        description:
            "Structured mentorship and leadership development connecting displaced women with experienced professionals from the diaspora and global community.",
        icon: Users,
        color: "#E8A317",
        overview: [
            "Leadership is not born -- it is cultivated. Our Mentoring & Leadership program identifies women with leadership potential and provides them with the skills, networks, and confidence to become changemakers in their communities.",
            "Using our AI Mentor Matching Engine, we pair participants with mentors from the global diaspora and professional community based on goals, industry interests, language, and cultural background. Each mentoring relationship follows a structured 6-month framework with clear milestones.",
            "Beyond one-on-one mentoring, we run leadership cohorts that develop public speaking, community organising, advocacy, and project management skills. Graduates form an alumni network that continues to support and inspire future cohorts.",
        ],
        activities: [
            {
                title: "AI-Powered Mentor Matching",
                description:
                    "Intelligent pairing of mentees with mentors based on multi-dimensional compatibility including goals, industry, language, and availability.",
                icon: Sparkles,
            },
            {
                title: "Leadership Development Cohorts",
                description:
                    "12-week intensive programs covering strategic thinking, decision-making, conflict resolution, and team leadership.",
                icon: Target,
            },
            {
                title: "Public Speaking & Advocacy",
                description:
                    "Training in storytelling, public speaking, media engagement, and policy advocacy to amplify women's voices.",
                icon: MessageCircle,
            },
            {
                title: "Community Organising Training",
                description:
                    "Practical skills for mobilising communities, running campaigns, and creating sustainable grassroots organisations.",
                icon: Users,
            },
            {
                title: "Project Management Skills",
                description:
                    "Planning, execution, monitoring, and evaluation frameworks that prepare women to lead impactful projects.",
                icon: BookOpen,
            },
            {
                title: "Alumni Leadership Network",
                description:
                    "A growing network of program graduates who mentor new cohorts, share opportunities, and collaborate on initiatives.",
                icon: Handshake,
            },
        ],
        outcomes: [
            "150+ mentoring pairs formed with 92% satisfaction rate",
            "65% of graduates take on formal leadership roles in their communities",
            "40+ community-led initiatives launched by program alumni",
            "85% of mentors commit to additional mentoring cycles",
            "Alumni network spanning 12 countries and growing",
            "3 graduates elected to local governance positions",
        ],
        ctaTitle: "Become a Mentor",
        ctaDescription:
            "Share your expertise and experience with a displaced woman building her leadership journey. Mentoring takes just 2 hours per month and transforms lives.",
    },
    "humanitarian-impact": {
        slug: "humanitarian-impact",
        title: "Transparent Humanitarian Impact",
        subtitle: "Accountability through technology",
        description:
            "Blockchain-enabled transparency and real-time impact tracking that ensures every dollar reaches the women it is intended for, with measurable outcomes.",
        icon: Eye,
        color: "#0D7377",
        overview: [
            "Trust is the currency of humanitarian work. Our Transparent Humanitarian Impact program leverages blockchain technology and real-time data analytics to create unprecedented accountability in how funds are raised, allocated, and spent.",
            "Every donation is tracked from receipt to beneficiary impact through our Humanitarian Transparency Dashboard. Donors see exactly where their money goes, programme managers get real-time insights, and beneficiaries have a voice in how resources are used.",
            "We publish open data reports, conduct independent impact evaluations, and maintain beneficiary feedback loops that continuously improve programme delivery. This approach has set a new standard for transparency in the humanitarian sector.",
        ],
        activities: [
            {
                title: "Real-Time Impact Dashboards",
                description:
                    "Live visualisations showing fund allocation, programme reach, beneficiary progress, and outcome metrics accessible to all stakeholders.",
                icon: BarChart,
            },
            {
                title: "Blockchain Fund Tracking",
                description:
                    "Immutable, verifiable records of every financial transaction from donor to programme delivery, eliminating opacity in fund management.",
                icon: Shield,
            },
            {
                title: "Beneficiary Feedback Loops",
                description:
                    "Regular surveys, focus groups, and digital feedback channels ensuring women's voices shape programme design and resource allocation.",
                icon: MessageCircle,
            },
            {
                title: "Open Data Reporting",
                description:
                    "Quarterly published reports with granular data on spending, outcomes, and lessons learned, available to the public.",
                icon: BookOpen,
            },
            {
                title: "Independent Impact Evaluations",
                description:
                    "Third-party evaluations using rigorous methodologies including randomised controlled trials and longitudinal studies.",
                icon: Lightbulb,
            },
            {
                title: "Donor Engagement Portal",
                description:
                    "Personalised dashboards for donors showing the specific impact of their contributions with stories, data, and direct beneficiary updates.",
                icon: Eye,
            },
        ],
        outcomes: [
            "100% of funds tracked end-to-end via blockchain",
            "98% donor satisfaction rate with transparency reporting",
            "40% increase in repeat donations attributed to trust",
            "Zero unaccounted fund diversions since inception",
            "Real-time dashboards used by 50+ partner organisations",
            "Published 12 open data impact reports",
        ],
        ctaTitle: "Fund with Confidence",
        ctaDescription:
            "See exactly where your money goes. Our transparent model means every contribution is tracked, verified, and reported in real time.",
    },
};

const programSlugs = [
    "psychosocial-resilience",
    "economic-empowerment",
    "leadership-mentoring",
    "humanitarian-impact",
];

export async function generateStaticParams() {
    return programSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const program = programsData[slug];

    if (!program) {
        return { title: "Program Not Found" };
    }

    return {
        title: `${program.title} | Women Connect International`,
        description: program.description,
        openGraph: {
            title: `${program.title} - Women Connect International`,
            description: program.description,
            url: `https://womenconnectintl.org/programs/${slug}`,
        },
    };
}

export default async function ProgramDetailPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const program = programsData[slug];

    if (!program) {
        notFound();
    }

    const Icon = program.icon;

    // Find adjacent programs for navigation
    const currentIndex = programSlugs.indexOf(slug);
    const prevProgram =
        currentIndex > 0 ? programsData[programSlugs[currentIndex - 1]] : null;
    const nextProgram =
        currentIndex < programSlugs.length - 1
            ? programsData[programSlugs[currentIndex + 1]]
            : null;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section
                className="w-full py-16 md:py-24 overflow-hidden relative"
                style={{
                    background: `linear-gradient(135deg, ${program.color} 0%, ${program.color}dd 50%, ${program.color}bb 100%)`,
                }}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl"
                        style={{ backgroundColor: `${program.color}40` }}
                    />
                    <div
                        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl"
                        style={{ backgroundColor: `${program.color}30` }}
                    />
                </div>

                <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                    {/* Back Link */}
                    <Link
                        href="/programs"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        All Programs
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                    <Icon className="h-8 w-8 text-white" />
                                </div>
                                <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                                    {program.subtitle}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                {program.title}
                            </h1>

                            <p className="text-xl text-white/90 mb-8">
                                {program.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/get-involved"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-neutral-900 rounded-full font-semibold hover:bg-neutral-100 transition-colors"
                                >
                                    Support This Program
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                                <a
                                    href="#activities"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-neutral-900 transition-colors"
                                >
                                    Explore Activities
                                </a>
                            </div>
                        </div>

                        <div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                                <div className="text-center mb-6">
                                    <div className="text-5xl font-bold text-white mb-2">
                                        {program.outcomes.length}
                                    </div>
                                    <div className="text-white/80">
                                        Key Outcomes Tracked
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-3 bg-white/5 rounded-lg">
                                        <div className="text-2xl font-bold text-white">
                                            {program.activities.length}
                                        </div>
                                        <div className="text-sm text-white/70">
                                            Core Activities
                                        </div>
                                    </div>
                                    <div className="text-center p-3 bg-white/5 rounded-lg">
                                        <div className="text-2xl font-bold text-white">12</div>
                                        <div className="text-sm text-white/70">
                                            Week Program
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <div
                                className="w-1.5 h-8 rounded-full"
                                style={{ backgroundColor: program.color }}
                            />
                            <h2 className="text-3xl font-bold text-neutral-900">
                                Overview
                            </h2>
                        </div>

                        <div className="prose prose-lg max-w-none space-y-6">
                            {program.overview.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className="text-lg text-neutral-700 leading-relaxed"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Highlight callout */}
                        <div
                            className="mt-10 rounded-2xl p-8 border-l-4"
                            style={{
                                backgroundColor: `${program.color}08`,
                                borderLeftColor: program.color,
                            }}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${program.color}15` }}
                                >
                                    <Lightbulb
                                        className="h-5 w-5"
                                        style={{ color: program.color }}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-neutral-900 mb-2">
                                        Our Approach
                                    </h3>
                                    <p className="text-neutral-600 leading-relaxed">
                                        Every aspect of this program is co-designed with the women
                                        it serves. We use participatory design methods, continuous
                                        feedback loops, and culturally sensitive delivery to ensure
                                        relevance and effectiveness across diverse displacement
                                        contexts.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Activities Section */}
            <section id="activities" className="py-16 md:py-24 bg-neutral-50 scroll-mt-20">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 md:mb-16">
                            <span
                                className="text-xs font-bold tracking-wider uppercase mb-4 block"
                                style={{ color: program.color }}
                            >
                                What We Do
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                                Core Activities
                            </h2>
                            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                                Each activity is carefully designed to build upon the others,
                                creating a comprehensive support journey for participants.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {program.activities.map((activity, index) => {
                                const ActivityIcon = activity.icon;
                                return (
                                    <div
                                        key={activity.title}
                                        className="bg-white rounded-xl p-6 shadow-md border border-neutral-100 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                            style={{ backgroundColor: `${program.color}12` }}
                                        >
                                            <ActivityIcon
                                                className="h-6 w-6"
                                                style={{ color: program.color }}
                                            />
                                        </div>
                                        <h3 className="text-lg font-bold text-neutral-900 mb-2">
                                            {activity.title}
                                        </h3>
                                        <p className="text-sm text-neutral-600 leading-relaxed">
                                            {activity.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Outcomes Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12 md:mb-16">
                            <span
                                className="text-xs font-bold tracking-wider uppercase mb-4 block"
                                style={{ color: program.color }}
                            >
                                Measurable Results
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                                Program Outcomes
                            </h2>
                            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                                We track rigorous outcome metrics to ensure our programs deliver
                                real, lasting impact for every participant.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {program.outcomes.map((outcome, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-5 bg-white rounded-xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
                                >
                                    <div
                                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: `${program.color}15` }}
                                    >
                                        <CheckCircle
                                            className="h-5 w-5"
                                            style={{ color: program.color }}
                                        />
                                    </div>
                                    <span className="text-neutral-700 leading-relaxed">
                                        {outcome}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="py-16 md:py-24"
                style={{
                    background: `linear-gradient(135deg, ${program.color} 0%, ${program.color}cc 100%)`,
                }}
            >
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            {program.ctaTitle}
                        </h2>
                        <p className="text-lg text-white/80 mb-10">
                            {program.ctaDescription}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/get-involved"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-xl font-semibold hover:bg-neutral-100 transition-colors"
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

            {/* Adjacent Program Navigation */}
            <section className="py-12 border-t border-neutral-100">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto flex items-center justify-between">
                        {prevProgram ? (
                            <Link
                                href={`/programs/${prevProgram.slug}`}
                                className="group flex items-center gap-3 text-neutral-600 hover:text-[#0D7377] transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                                <div className="text-right">
                                    <div className="text-xs text-neutral-400 uppercase tracking-wider">
                                        Previous
                                    </div>
                                    <div className="font-semibold">
                                        {prevProgram.title}
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div />
                        )}

                        <Link
                            href="/programs"
                            className="text-sm font-medium text-[#0D7377] hover:underline hidden md:block"
                        >
                            View All Programs
                        </Link>

                        {nextProgram ? (
                            <Link
                                href={`/programs/${nextProgram.slug}`}
                                className="group flex items-center gap-3 text-neutral-600 hover:text-[#0D7377] transition-colors"
                            >
                                <div>
                                    <div className="text-xs text-neutral-400 uppercase tracking-wider">
                                        Next
                                    </div>
                                    <div className="font-semibold">
                                        {nextProgram.title}
                                    </div>
                                </div>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : (
                            <div />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
