import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
    ArrowRight,
    GraduationCap,
    Users,
    Award,
    Calendar,
    MapPin,
    CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/shared/components";
import { TrainingSection } from "@/components/training/training-section";
import { CTASection } from "@/components/shared";

export const metadata: Metadata = {
    title: "Training Academy | Digibit",
    description:
        "Build your team's capabilities with industry-leading training programs. Executive workshops, technical certifications, and compliance training designed for Qatar and the GCC region.",
    openGraph: {
        title: "Training Academy | Digibit",
        description:
            "Empower your workforce with expert-led training in AI, cybersecurity, blockchain, and IT governance.",
        url: "https://globaldigibit.com/training",
    },
};

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function TrainingPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary to-secondary overflow-hidden relative">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in-up">
                            <div className="w-12 h-0.5 bg-accent-orange"></div>
                            <span className="text-xs md:text-sm font-bold tracking-wider text-white/80 uppercase">
                                Training Academy
                            </span>
                            <div className="w-12 h-0.5 bg-accent-orange"></div>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up delay-100">
                            Build Your Team&apos;s
                            <span className="text-accent-orange">
                                {" "}
                                Capabilities
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
                            Empower your workforce with industry-leading training programs
                            designed for Qatar and the GCC region. From executive
                            workshops to hands-on technical certifications.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
                            <Button
                                asChild
                                size="lg"
                                className="bg-accent-orange hover:bg-accent-red text-white rounded-full px-8 h-12"
                            >
                                <Link href="#programs">
                                    Explore Programs
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="border-2 border-white text-white hover:bg-white hover:text-primary rounded-full px-8 h-12"
                            >
                                <Link href="/contact?subject=training">
                                    Request Custom Training
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="w-full py-12 bg-white border-b border-neutral-100">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center animate-fade-in-up">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                                <GraduationCap className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-3xl font-bold text-primary mb-1">12+</div>
                            <div className="text-sm text-neutral-600">Training Programs</div>
                        </div>
                        <div className="text-center animate-fade-in-up delay-100">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-orange/10 mb-3">
                                <Users className="h-6 w-6 text-accent-orange" />
                            </div>
                            <div className="text-3xl font-bold text-primary mb-1">500+</div>
                            <div className="text-sm text-neutral-600">Professionals Trained</div>
                        </div>
                        <div className="text-center animate-fade-in-up delay-200">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 mb-3">
                                <Award className="h-6 w-6 text-secondary" />
                            </div>
                            <div className="text-3xl font-bold text-primary mb-1">8</div>
                            <div className="text-sm text-neutral-600">Certifications Offered</div>
                        </div>
                        <div className="text-center animate-fade-in-up delay-300">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-3xl font-bold text-primary mb-1">GCC</div>
                            <div className="text-sm text-neutral-600">Regional Coverage</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Training Programs Section */}
            <section id="programs" className="scroll-mt-20">
                <TrainingSection />
            </section>

            {/* Why Choose Our Training Section */}
            <section className="w-full py-16 md:py-24 bg-neutral-50">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
                        <div className="w-12 h-0.5 bg-accent-orange"></div>
                        <span className="text-xs md:text-sm font-bold tracking-wider text-gray-600 uppercase">
                            Why Choose Us
                        </span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-in-up delay-100">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e3a8a] leading-tight mb-4">
                                Training That
                            </h2>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-orange leading-tight mb-6">
                                Delivers Results
                            </h2>
                            <p className="text-lg text-neutral-600 mb-8">
                                Our training programs are designed by industry practitioners
                                with real-world experience. We focus on practical skills
                                that your team can apply immediately.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "Expert instructors with industry experience",
                                    "Hands-on labs and real-world case studies",
                                    "Flexible delivery: on-site, virtual, or hybrid",
                                    "Customizable content for your organization",
                                    "Post-training support and resources",
                                    "Industry-recognized certifications",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-accent-orange flex-shrink-0 mt-0.5" />
                                        <span className="text-neutral-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-4 animate-fade-in-up delay-200">
                            <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-100">
                                <Calendar className="h-8 w-8 text-primary mb-4" />
                                <h3 className="font-semibold text-neutral-900 mb-2">
                                    Flexible Scheduling
                                </h3>
                                <p className="text-sm text-neutral-600">
                                    Programs available on-demand or scheduled to fit your
                                    team&apos;s availability.
                                </p>
                            </div>
                            <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-100">
                                <Users className="h-8 w-8 text-accent-orange mb-4" />
                                <h3 className="font-semibold text-neutral-900 mb-2">
                                    Custom Programs
                                </h3>
                                <p className="text-sm text-neutral-600">
                                    Tailored training designed specifically for your
                                    organization&apos;s needs.
                                </p>
                            </div>
                            <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-100">
                                <Award className="h-8 w-8 text-secondary mb-4" />
                                <h3 className="font-semibold text-neutral-900 mb-2">
                                    Certifications
                                </h3>
                                <p className="text-sm text-neutral-600">
                                    Industry-recognized credentials that validate your
                                    team&apos;s expertise.
                                </p>
                            </div>
                            <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-100">
                                <MapPin className="h-8 w-8 text-primary mb-4" />
                                <h3 className="font-semibold text-neutral-900 mb-2">
                                    Regional Focus
                                </h3>
                                <p className="text-sm text-neutral-600">
                                    Content tailored for Qatar and GCC regulatory
                                    requirements.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTASection
                title="Ready to Upskill Your Team?"
                description="Contact us to discuss your training needs. We offer customized programs, group discounts, and flexible scheduling options."
                primaryCTA={{
                    label: "Request Training Quote",
                    href: "/contact?subject=training",
                }}
                secondaryCTA={{
                    label: "View Training Calendar",
                    href: "/contact?subject=training-calendar",
                }}
            />
        </div>
    );
}
