import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Target,
    Award,
    Layers,
    Shield,
    Brain,
    Blocks,
    Scale,
    Rocket,
    Cloud,
    Map,
    Search,
    FileText,
    CheckSquare,
    Building,
    UserCheck,
    AlertTriangle,
    Compass,
    Database,
    LineChart,
    GitMerge,
    GraduationCap,
    ClipboardList,
    Code,
    Code2,
    ShieldAlert,
    Network,
    Presentation,
    Coins,
    LayoutGrid,
    Cog,
    AlertCircle,
    Users,
    FileSearch,
    Eye,
    CloudCog,
    Bot,
    Heart,
    Link2,
    Truck,
    UserPlus,
    Handshake,
    Lightbulb,
    Workflow,
    RefreshCw,
    Zap,
    Activity,
    Globe,
    Smartphone,
    Server,
    BarChart,
    Palette,
    Settings,
    Settings2,
    TrendingUp,
    TrendingDown,
    Route,
    FileCheck,
    ClipboardCheck,
    Lock,
    ListChecks,
    UserCog,
    Sparkles,
    PiggyBank,
    Leaf,
    RotateCcw,
    SearchCheck,
    Headset,
    Landmark,
    Microscope,
    Gauge,
    PlayCircle,
    Bell,
    LayoutDashboard,
    Boxes,
    GitBranch,
    Plug,
    Wrench,
    TestTube2,
    PieChart,
    DollarSign,
    Laptop,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/shared/components";
import { CTASection } from "@/components/shared";
import { ServiceTowerCard } from "@/components/services";
import {
    serviceTowers,
    getServiceTowerBySlug,
    getRelatedTowers,
} from "@/data/services-global";
import { caseStudies } from "@/data/case-studies";
import {
    ServiceTOC,
    MobileTOC,
    HorizontalProcess,
    CaseStudyCard,
    FloatingMobileCTA,
    CalloutBox,
    FeatureList,
    TechLogoGrid,
    SectionHeader,
    type ProcessStep,
} from "@/components/services/service-detail-client";

// Icon map for tower icons - all 22 service towers
const towerIconMap: Record<string, LucideIcon> = {
    // Core icons
    Target,
    Rocket,
    Network,
    TrendingDown,
    Settings2,
    Heart,
    Sparkles,
    Brain,
    Building,
    Cloud,
    ShieldAlert,
    Scale,
    PiggyBank,
    GraduationCap,
    Leaf,
    Handshake,
    RotateCcw,
    SearchCheck,
    Code2,
    Headset,
    Landmark,
    Microscope,
    Activity,
    // Aliases
    ShieldCheck: Shield,
    Shield,
    Blocks,
    Layers,
    Code,
    CheckCircle,
    Bot,
    Link: Link2,
    Database,
    Users,
    Workflow,
    Truck,
    FileCheck,
    UserPlus,
    Lightbulb,
};

// Icon map for service icons
const serviceIconMap: Record<string, LucideIcon> = {
    Map,
    Search,
    FileText,
    CheckSquare,
    Building,
    UserCheck,
    AlertTriangle,
    Compass,
    Database,
    LineChart,
    GitMerge,
    GraduationCap,
    ClipboardList,
    Code,
    ShieldAlert,
    Network,
    Presentation,
    Coins,
    LayoutGrid,
    Cog,
    AlertCircle,
    Users,
    FileSearch,
    Eye,
    CloudCog,
    Target: Target,
    Scale: Scale,
    Bot,
    Heart,
    Link: Link2,
    Zap,
    Activity,
    Globe,
    Smartphone,
    Server,
    BarChart,
    Palette,
    Settings,
    TrendingUp,
    Route,
    ClipboardCheck,
    Lock,
    ListChecks,
    UserCog,
    RefreshCw,
    Award,
    Layers,
    Cloud,
    Shield,
    Headset,
    Brain,
    Gauge,
    GitBranch,
    PlayCircle,
    LayoutDashboard,
    Bell,
    Boxes,
    Plug,
    Wrench,
    TestTube2,
    PieChart,
    DollarSign,
    Laptop,
    Rocket,
    Sparkles,
    Lightbulb,
};

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
    return serviceTowers
        .filter((tower) => tower.isActive !== false)
        .map((tower) => ({
            slug: tower.slug,
        }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const tower = getServiceTowerBySlug(slug);

    if (!tower) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: `${tower.name} | Global Digitalbit Limited`,
        description: tower.description,
        keywords: [
            tower.shortName.toLowerCase(),
            "advisory services",
            "consulting",
            "qatar",
            "gcc",
            ...(tower.certifications || []).map((c) => c.toLowerCase()),
            ...(tower.frameworks || []).map((f) => f.toLowerCase()),
        ],
        openGraph: {
            title: `${tower.name} - Global Digitalbit`,
            description: tower.description,
            url: `https://globaldigibit.com/services/${slug}`,
        },
    };
}

// Default process steps for service delivery
// Icons are passed as string names and mapped in the client component
const getDefaultProcessSteps = (towerName: string): ProcessStep[] => [
    {
        number: 1,
        title: "Discovery",
        description: "We analyze your current state, challenges, and objectives through stakeholder interviews and documentation review.",
        icon: "Search",
    },
    {
        number: 2,
        title: "Assessment",
        description: "Comprehensive evaluation of gaps, risks, and opportunities against industry best practices and frameworks.",
        icon: "ClipboardCheck",
    },
    {
        number: 3,
        title: "Strategy",
        description: "Develop a tailored roadmap with prioritized initiatives, timelines, and resource requirements.",
        icon: "Target",
    },
    {
        number: 4,
        title: "Implementation",
        description: "Execute the plan with dedicated experts, regular checkpoints, and adaptive delivery.",
        icon: "Rocket",
    },
    {
        number: 5,
        title: "Optimization",
        description: "Continuous improvement through monitoring, feedback loops, and knowledge transfer.",
        icon: "TrendingUp",
    },
];

export default async function ServiceTowerPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const tower = getServiceTowerBySlug(slug);

    if (!tower) {
        notFound();
    }

    const TowerIcon = towerIconMap[tower.icon] || Shield;
    const relatedTowers = getRelatedTowers(slug, 3);
    const hasCertificationsOrFrameworks =
        (tower.certifications && tower.certifications.length > 0) ||
        (tower.frameworks && tower.frameworks.length > 0);

    // Get related case studies (matching by service keywords)
    const relatedCaseStudies = caseStudies
        .filter((cs) =>
            cs.services.some(
                (s) =>
                    tower.shortName.toLowerCase().includes(s.toLowerCase()) ||
                    s.toLowerCase().includes(tower.shortName.toLowerCase().split(" ")[0])
            )
        )
        .slice(0, 3);

    // Fallback to featured case studies if no direct match
    const displayCaseStudies =
        relatedCaseStudies.length > 0
            ? relatedCaseStudies
            : caseStudies.filter((cs) => cs.featured).slice(0, 3);

    // Generate process steps
    const processSteps = getDefaultProcessSteps(tower.shortName);

    // Build TOC headings
    const tocHeadings = [
        { id: "overview", text: "Overview", level: 2 },
        ...(tower.scope ? [{ id: "scope", text: "Scope", level: 2 }] : []),
        ...(tower.typicalOutcomes && tower.typicalOutcomes.length > 0
            ? [{ id: "outcomes", text: "Typical Outcomes", level: 2 }]
            : []),
        { id: "services", text: "Our Services", level: 2 },
        { id: "process", text: "Our Approach", level: 2 },
        ...(hasCertificationsOrFrameworks
            ? [{ id: "expertise", text: "Certifications & Frameworks", level: 2 }]
            : []),
        ...(displayCaseStudies.length > 0
            ? [{ id: "case-studies", text: "Related Case Studies", level: 2 }]
            : []),
        ...(relatedTowers.length > 0
            ? [{ id: "related", text: "Related Services", level: 2 }]
            : []),
    ];

    // Key features for the service - icons passed as string names
    const keyFeatures = [
        {
            icon: "Target",
            title: "Strategic Alignment",
            description: "Every engagement starts with understanding your business objectives and measuring success accordingly.",
        },
        {
            icon: "Users",
            title: "Expert Team",
            description: "Certified consultants with deep industry experience and proven methodologies.",
        },
        {
            icon: "Shield",
            title: "Risk Management",
            description: "Proactive identification and mitigation of risks throughout the engagement.",
        },
        {
            icon: "Workflow",
            title: "Agile Delivery",
            description: "Flexible, iterative approach that adapts to changing requirements and priorities.",
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section
                className="w-full py-16 md:py-24 overflow-hidden relative"
                style={{
                    background: `linear-gradient(135deg, ${tower.accentColor} 0%, ${tower.accentColor}dd 50%, ${tower.accentColor}bb 100%)`,
                }}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl"
                        style={{ backgroundColor: `${tower.accentColor}40` }}
                    />
                    <div
                        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl"
                        style={{ backgroundColor: `${tower.accentColor}30` }}
                    />
                </div>

                <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                    {/* Back Link */}
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        All Services
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
                                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                    <TowerIcon className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                                        {tower.code}
                                    </span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up delay-100">
                                {tower.name}
                            </h1>

                            <p className="text-xl text-white/90 mb-8 animate-fade-in-up delay-200">
                                {tower.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-full px-8"
                                >
                                    <Link href={`/contact?service=${tower.slug}`}>
                                        Get Started
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-white text-white hover:bg-white hover:text-neutral-900 rounded-full px-8"
                                >
                                    <Link href="#services">
                                        Explore Services
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        <div className="animate-fade-in-up delay-200">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                                <div className="text-center mb-6">
                                    <div className="text-5xl font-bold text-white mb-2">
                                        {tower.services.filter((s) => s.isActive !== false).length}
                                    </div>
                                    <div className="text-white/80">
                                        Specialized Services
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-3 bg-white/5 rounded-lg">
                                        <div className="text-2xl font-bold text-white">
                                            {tower.certifications?.length || 0}
                                        </div>
                                        <div className="text-sm text-white/70">
                                            Certifications
                                        </div>
                                    </div>
                                    <div className="text-center p-3 bg-white/5 rounded-lg">
                                        <div className="text-2xl font-bold text-white">
                                            {tower.frameworks?.length || 0}
                                        </div>
                                        <div className="text-sm text-white/70">
                                            Frameworks
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Area with TOC Sidebar */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
                <div className="flex gap-8">
                    {/* Sticky TOC Sidebar - Desktop */}
                    <ServiceTOC headings={tocHeadings} accentColor={tower.accentColor} />

                    {/* Mobile TOC */}
                    <MobileTOC headings={tocHeadings} accentColor={tower.accentColor} />

                    {/* Main Content */}
                    <div className="flex-1 max-w-4xl">
                        {/* Overview Section */}
                        <section className="mb-16">
                            <SectionHeader
                                id="overview"
                                title="Overview"
                                accentColor={tower.accentColor}
                            />
                            <div className="prose prose-lg max-w-none">
                                <p className="text-lg text-neutral-700 leading-relaxed mb-8">
                                    {tower.description}
                                </p>

                                {/* Key Value Proposition Callout */}
                                <CalloutBox
                                    title="Why Choose Our Services"
                                    icon="Lightbulb"
                                    accentColor={tower.accentColor}
                                >
                                    <p>
                                        Our {tower.shortName.toLowerCase()} experts bring decades of combined experience,
                                        industry-recognized certifications, and a proven track record of delivering
                                        measurable business outcomes. We work as an extension of your team to ensure
                                        successful outcomes.
                                    </p>
                                </CalloutBox>
                            </div>

                            {/* Key Features */}
                            <div className="mt-10">
                                <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                                    What Sets Us Apart
                                </h3>
                                <FeatureList
                                    features={keyFeatures}
                                    accentColor={tower.accentColor}
                                    columns={2}
                                />
                            </div>
                        </section>

                        {/* Scope Section */}
                        {tower.scope && (
                            <section className="mb-16">
                                <SectionHeader
                                    id="scope"
                                    title="Scope"
                                    subtitle="What our services cover"
                                    accentColor={tower.accentColor}
                                />
                                <div className="bg-white rounded-2xl p-8 shadow-md border border-neutral-100">
                                    <p className="text-lg text-neutral-700 leading-relaxed">
                                        {tower.scope}
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Typical Outcomes Section */}
                        {tower.typicalOutcomes && tower.typicalOutcomes.length > 0 && (
                            <section className="mb-16">
                                <SectionHeader
                                    id="outcomes"
                                    title="Typical Outcomes"
                                    subtitle="What you can expect from our engagement"
                                    accentColor={tower.accentColor}
                                />
                                <div className="grid md:grid-cols-2 gap-4">
                                    {tower.typicalOutcomes.map((outcome, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 p-5 bg-white rounded-xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
                                        >
                                            <div
                                                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                                                style={{ backgroundColor: `${tower.accentColor}15` }}
                                            >
                                                <CheckCircle
                                                    className="h-5 w-5"
                                                    style={{ color: tower.accentColor }}
                                                />
                                            </div>
                                            <span className="text-neutral-700 leading-relaxed">
                                                {outcome}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Services Grid Section */}
                        <section id="services" className="scroll-mt-28 mb-16">
                            <SectionHeader
                                id="services-header"
                                title={`${tower.shortName} Services`}
                                subtitle={`Explore our comprehensive range of ${tower.shortName.toLowerCase()} services`}
                                accentColor={tower.accentColor}
                            />

                            <div className="grid md:grid-cols-2 gap-6">
                                {tower.services
                                    .filter((service) => service.isActive !== false)
                                    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
                                    .map((service, index) => {
                                        const ServiceIcon = serviceIconMap[service.icon] || FileText;
                                        return (
                                            <div
                                                key={service.slug}
                                                className="group bg-white rounded-xl border border-neutral-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in-up"
                                                style={{ animationDelay: `${index * 100}ms` }}
                                            >
                                                {/* Card Header */}
                                                <div
                                                    className="relative p-6 pb-4"
                                                    style={{ backgroundColor: `${tower.accentColor}08` }}
                                                >
                                                    {service.isFeatured && (
                                                        <div
                                                            className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold text-white"
                                                            style={{ backgroundColor: tower.accentColor }}
                                                        >
                                                            Featured
                                                        </div>
                                                    )}
                                                    <div
                                                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm transition-all duration-300 group-hover:scale-110"
                                                    >
                                                        <ServiceIcon
                                                            className="h-6 w-6"
                                                            style={{ color: tower.accentColor }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Card Content */}
                                                <div className="p-6 pt-4">
                                                    <h3 className="font-bold text-neutral-900 text-lg mb-2 group-hover:text-primary transition-colors">
                                                        {service.name}
                                                    </h3>
                                                    <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                                                        {service.description}
                                                    </p>

                                                    {/* Deliverables */}
                                                    {service.deliverables && service.deliverables.length > 0 && (
                                                        <div className="pt-4 border-t border-neutral-100">
                                                            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                                                                Key Deliverables
                                                            </p>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {service.deliverables
                                                                    ?.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
                                                                    .slice(0, 3)
                                                                    .map((deliverable) => (
                                                                        <span
                                                                            key={deliverable.id ?? deliverable.name}
                                                                            className="inline-block px-2.5 py-1 bg-neutral-100 rounded-md text-xs text-neutral-600 font-medium"
                                                                        >
                                                                            {deliverable.name}
                                                                        </span>
                                                                    ))}
                                                                {service.deliverables.length > 3 && (
                                                                    <span
                                                                        className="inline-block px-2.5 py-1 rounded-md text-xs font-medium"
                                                                        style={{
                                                                            backgroundColor: `${tower.accentColor}15`,
                                                                            color: tower.accentColor,
                                                                        }}
                                                                    >
                                                                        +{service.deliverables.length - 3} more
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </section>

                        {/* Horizontal Process Section */}
                        <section id="process" className="scroll-mt-28 mb-16">
                            <SectionHeader
                                id="process-header"
                                title="Our Approach"
                                subtitle="How we deliver successful outcomes"
                                accentColor={tower.accentColor}
                            />
                            <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-8 md:p-10 border border-neutral-100">
                                <HorizontalProcess
                                    steps={processSteps}
                                    accentColor={tower.accentColor}
                                />
                            </div>
                        </section>

                        {/* Certifications & Frameworks Section */}
                        {hasCertificationsOrFrameworks && (
                            <section id="expertise" className="scroll-mt-28 mb-16">
                                <SectionHeader
                                    id="expertise-header"
                                    title="Certifications & Frameworks"
                                    subtitle="Industry-recognized expertise our team brings"
                                    accentColor={tower.accentColor}
                                />

                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Certifications */}
                                    {tower.certifications && tower.certifications.length > 0 && (
                                        <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-100">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div
                                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                    style={{ backgroundColor: `${tower.accentColor}15` }}
                                                >
                                                    <Award
                                                        className="h-5 w-5"
                                                        style={{ color: tower.accentColor }}
                                                    />
                                                </div>
                                                <h3 className="text-lg font-bold text-neutral-900">
                                                    Certifications
                                                </h3>
                                            </div>
                                            <TechLogoGrid
                                                technologies={tower.certifications}
                                                accentColor={tower.accentColor}
                                            />
                                        </div>
                                    )}

                                    {/* Frameworks */}
                                    {tower.frameworks && tower.frameworks.length > 0 && (
                                        <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-100">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div
                                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                    style={{ backgroundColor: `${tower.accentColor}15` }}
                                                >
                                                    <Layers
                                                        className="h-5 w-5"
                                                        style={{ color: tower.accentColor }}
                                                    />
                                                </div>
                                                <h3 className="text-lg font-bold text-neutral-900">
                                                    Frameworks
                                                </h3>
                                            </div>
                                            <TechLogoGrid
                                                technologies={tower.frameworks}
                                                accentColor={tower.accentColor}
                                            />
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Related Case Studies Section */}
                        {displayCaseStudies.length > 0 && (
                            <section id="case-studies" className="scroll-mt-28 mb-16">
                                <SectionHeader
                                    id="case-studies-header"
                                    title="Related Case Studies"
                                    subtitle="See how we have helped organizations like yours"
                                    accentColor={tower.accentColor}
                                />

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {displayCaseStudies.map((caseStudy) => (
                                        <CaseStudyCard
                                            key={caseStudy.id}
                                            slug={caseStudy.slug}
                                            title={caseStudy.title}
                                            client={caseStudy.client}
                                            industry={caseStudy.industry}
                                            thumbnail={caseStudy.thumbnail}
                                            excerpt={caseStudy.excerpt}
                                            metrics={caseStudy.metrics}
                                            accentColor={tower.accentColor}
                                        />
                                    ))}
                                </div>

                                <div className="text-center mt-8">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="lg"
                                        className="rounded-full"
                                    >
                                        <Link href="/case-studies">
                                            View All Case Studies
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </section>
                        )}

                        {/* Related Towers Section */}
                        {relatedTowers.length > 0 && (
                            <section id="related" className="scroll-mt-28 mb-16">
                                <SectionHeader
                                    id="related-header"
                                    title="Related Service Towers"
                                    subtitle={`Explore other services that complement ${tower.shortName}`}
                                    accentColor={tower.accentColor}
                                />

                                <div className="grid md:grid-cols-3 gap-6">
                                    {relatedTowers.map((related, index) => (
                                        <div
                                            key={related.id}
                                            className="animate-fade-in-up"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <ServiceTowerCard
                                                tower={related}
                                                showServiceCount={true}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="text-center mt-8">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="lg"
                                        className="rounded-full"
                                    >
                                        <Link href="/services">
                                            View All Services
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>

            <CTASection
                title={`Ready to Get Started with ${tower.shortName}?`}
                description={`Schedule a consultation with our ${tower.shortName.toLowerCase()} experts to discuss how we can help your organization.`}
                primaryCTA={{
                    label: "Schedule Consultation",
                    href: `/contact?service=${tower.slug}`,
                }}
                secondaryCTA={{
                    label: "View All Services",
                    href: "/services",
                }}
            />

            {/* Floating Mobile CTA */}
            <FloatingMobileCTA
                serviceSlug={tower.slug}
                accentColor={tower.accentColor}
                ctaText="Get Started"
            />
        </div>
    );
}
