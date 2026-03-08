"use client";

import { useRef } from "react";
import Image from "next/image";
import { Globe, Award, Rocket, Target, LucideIcon } from "lucide-react";
import { FadeUp, SlideLeft, ScrollReveal } from "@/components/ui/animations/scroll-reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

interface Milestone {
    key: string;
    year: string;
    icon: LucideIcon;
    color: string;
}

const milestones: Milestone[] = [
    {
        key: "foundation",
        year: "2014",
        icon: Rocket,
        color: "from-primary to-secondary",
    },
    {
        key: "expansion",
        year: "2017",
        icon: Globe,
        color: "from-accent-orange to-secondary-yellow",
    },
    {
        key: "global",
        year: "2020",
        icon: Target,
        color: "from-accent-orange to-accent-red",
    },
    {
        key: "innovation",
        year: "2024",
        icon: Award,
        color: "from-primary to-secondary",
    },
];

export function OurStorySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("about");

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden"
            style={{ paddingBlock: "var(--section-padding-md)" }}
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

            {/* Floating decorative elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent-orange/10 rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-secondary-yellow/10 to-primary/10 rounded-full blur-3xl opacity-50" />

            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle, #1E4DB7 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
            }} />

            <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left column - Content */}
                    <div className="space-y-8">
                        {/* Section label */}
                        <FadeUp>
                            <div className="inline-flex items-center gap-3 group">
                                <div className="relative">
                                    <div className="w-12 h-0.5 bg-gradient-to-r from-accent-orange to-accent-red transition-all duration-500 group-hover:w-16" />
                                    <div className="absolute top-0 left-0 w-12 h-0.5 bg-gradient-to-r from-accent-orange to-accent-red blur-sm opacity-50" />
                                </div>
                                <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-neutral-gray uppercase">
                                    {t("story.overline")}
                                </span>
                            </div>
                        </FadeUp>

                        {/* Heading */}
                        <FadeUp delay={0.1}>
                            <div className="space-y-2">
                                <h2 className="font-bold leading-[1.1] tracking-tight" style={{ fontSize: "var(--font-size-5xl)" }}>
                                    <span className="block text-secondary">{t("story.heading.line1")}</span>
                                    <span className="bg-gradient-to-r from-accent-orange via-accent-red to-accent-orange bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">
                                        {t("story.heading.line2")}
                                    </span>
                                </h2>
                            </div>
                        </FadeUp>

                        {/* Description */}
                        <FadeUp delay={0.2}>
                            <div className="space-y-5 text-base md:text-lg text-neutral-gray leading-relaxed">
                                <p>
                                    {t.rich("story.description.para1", {
                                        company: (chunks) => <span className="font-semibold text-foreground">{chunks}</span>
                                    })}
                                </p>
                                <p>
                                    {t.rich("story.description.para2", {
                                        highlight: (chunks) => <span className="font-medium text-primary">{chunks}</span>
                                    })}
                                </p>
                            </div>
                        </FadeUp>

                        {/* Timeline milestones */}
                        <div className="space-y-4 pt-4">
                            {milestones.map((milestone, index) => {
                                const Icon = milestone.icon;
                                return (
                                    <ScrollReveal
                                        key={milestone.key}
                                        variant="slideRight"
                                        delay={0.3 + index * 0.1}
                                    >
                                        <div className="group flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-neutral-light/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-500">
                                            <div className={`flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-br ${milestone.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className={`text-sm font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                                                        {milestone.year}
                                                    </span>
                                                    <div className="h-px flex-1 bg-neutral-light/50" />
                                                    <span className="text-sm font-semibold text-foreground">
                                                        {t(`story.milestones.${milestone.key}.title`)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-neutral-gray leading-relaxed">
                                                    {t(`story.milestones.${milestone.key}.description`)}
                                                </p>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right column - Image */}
                    <SlideLeft delay={0.3}>
                        <div className="relative lg:h-[700px]">
                            {/* Layered background */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent-orange/20 rounded-3xl blur-2xl opacity-60" />
                            <div className="absolute -inset-2 bg-white/50 rounded-3xl" />

                            {/* Main image */}
                            <motion.div
                                ref={imageRef}
                                className="relative h-[400px] md:h-[500px] lg:h-full rounded-2xl overflow-hidden shadow-2xl shadow-neutral-black/20"
                                style={{ y: imageY }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent z-10" />
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/20 via-transparent to-primary/20 z-10 mix-blend-overlay" />
                                <Image
                                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2670&auto=format&fit=crop"
                                    alt="Global Digitalbit team at work"
                                    fill
                                    className="object-cover scale-110"
                                />

                                {/* Floating badge */}
                                <div className="absolute bottom-6 left-6 right-6 z-20">
                                    <div className="glass bg-white/90 backdrop-blur-md rounded-xl p-5 shadow-xl border border-white/50">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                                                <Globe className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground">{t("story.badge.title")}</p>
                                                <p className="text-sm text-neutral-gray">{t("story.badge.subtitle")}</p>
                                            </div>
                                            <div className="ml-auto">
                                                <Award className="w-8 h-8 text-secondary-yellow" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative frame */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-primary/30 rounded-tr-3xl" />
                            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-accent-orange/30 rounded-bl-3xl" />

                            {/* Floating accents */}
                            <div className="absolute -top-6 left-1/4 w-12 h-12 bg-gradient-to-br from-secondary-yellow to-accent-orange rounded-xl rotate-12 animate-float shadow-lg shadow-accent-orange/30" />
                            <div className="absolute -bottom-8 right-1/4 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl -rotate-12 animate-float-delay-2 shadow-lg shadow-primary/30" />
                        </div>
                    </SlideLeft>
                </div>
            </div>
        </section>
    );
}
