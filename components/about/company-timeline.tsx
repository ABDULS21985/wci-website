"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Rocket, Globe, Target, Award, Zap, LucideIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeUp } from "@/components/ui/animations/scroll-reveal";

// Register GSAP plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface TimelineMilestone {
    key: string;
    year: string;
    icon: LucideIcon;
    gradient: string;
    side: "left" | "right";
}

const milestones: TimelineMilestone[] = [
    {
        key: "foundation",
        year: "2014",
        icon: Rocket,
        gradient: "from-primary to-secondary",
        side: "left",
    },
    {
        key: "expansion",
        year: "2017",
        icon: Globe,
        gradient: "from-accent-orange to-accent-red",
        side: "right",
    },
    {
        key: "global",
        year: "2020",
        icon: Target,
        gradient: "from-accent-yellow to-accent-orange",
        side: "left",
    },
    {
        key: "innovation",
        year: "2023",
        icon: Award,
        gradient: "from-primary to-accent-orange",
        side: "right",
    },
    {
        key: "future",
        year: "2024+",
        icon: Zap,
        gradient: "from-accent-yellow to-primary",
        side: "left",
    },
];

/**
 * Hook to detect reduced motion preference
 */
function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handler = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return prefersReducedMotion;
}

/**
 * Timeline node component
 */
function TimelineNode({
    milestone,
    index,
    isInView,
}: {
    milestone: TimelineMilestone;
    index: number;
    isInView: boolean;
}) {
    const t = useTranslations("about");
    const nodeRef = useRef<HTMLDivElement>(null);
    const isNodeInView = useInView(nodeRef, { once: true, margin: "-100px" });
    const Icon = milestone.icon;

    const isLeft = milestone.side === "left";

    return (
        <div
            ref={nodeRef}
            className={`relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-8 items-center ${
                index !== milestones.length - 1 ? "pb-12 lg:pb-16" : ""
            }`}
        >
            {/* Left content (desktop) / Content (mobile) */}
            <motion.div
                className={`${
                    isLeft ? "lg:text-right lg:pr-8" : "lg:order-3 lg:pl-8"
                } order-2 lg:order-none`}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isNodeInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
                transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                <div
                    className={`bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-neutral-100 hover:shadow-xl hover:border-primary/20 transition-all duration-500 group ${
                        !isLeft ? "lg:hidden" : ""
                    }`}
                >
                    {/* Year badge */}
                    <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold mb-4 bg-gradient-to-r ${milestone.gradient} text-white`}
                    >
                        {milestone.year}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors duration-300">
                        {t(`timeline.milestones.${milestone.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-gray leading-relaxed">
                        {t(`timeline.milestones.${milestone.key}.description`)}
                    </p>
                </div>
            </motion.div>

            {/* Center node */}
            <div className="flex justify-center lg:order-2 order-1">
                <motion.div
                    className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${milestone.gradient} flex items-center justify-center shadow-lg z-10`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isNodeInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.1,
                    }}
                >
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />

                    {/* Pulse ring */}
                    <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${milestone.gradient} opacity-40`}
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.4, 0, 0.4],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>
            </div>

            {/* Right content (desktop only) */}
            <motion.div
                className={`hidden lg:block ${isLeft ? "lg:order-3 lg:pl-8" : "lg:pr-8"}`}
                initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                animate={isNodeInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? 50 : -50 }}
                transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {!isLeft && (
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-neutral-100 hover:shadow-xl hover:border-primary/20 transition-all duration-500 group">
                        {/* Year badge */}
                        <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold mb-4 bg-gradient-to-r ${milestone.gradient} text-white`}
                        >
                            {milestone.year}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors duration-300">
                            {t(`timeline.milestones.${milestone.key}.title`)}
                        </h3>

                        {/* Description */}
                        <p className="text-neutral-gray leading-relaxed">
                            {t(`timeline.milestones.${milestone.key}.description`)}
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export function CompanyTimeline() {
    const t = useTranslations("about");
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"],
    });

    // Smooth spring for line progress
    const lineProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Transform for line height (fills as you scroll)
    const lineHeight = useTransform(lineProgress, [0, 1], ["0%", "100%"]);

    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // GSAP alternative for more control (commented out, using Framer Motion instead)
    // useEffect(() => {
    //     if (prefersReducedMotion || !lineRef.current) return;
    //
    //     const ctx = gsap.context(() => {
    //         gsap.to(lineRef.current, {
    //             height: "100%",
    //             ease: "none",
    //             scrollTrigger: {
    //                 trigger: sectionRef.current,
    //                 start: "top center",
    //                 end: "bottom center",
    //                 scrub: 0.5,
    //             },
    //         });
    //     });
    //
    //     return () => ctx.revert();
    // }, [prefersReducedMotion]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-neutral-50"
            style={{ paddingBlock: "var(--section-padding-lg)" }}
        >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl" />
            </div>

            {/* Dot pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle, #1E4DB7 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="container relative z-10 mx-auto px-5 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
                    <FadeUp>
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent-orange" />
                            <span className="overline text-accent-orange">
                                {t("timeline.overline") || "Our Journey"}
                            </span>
                            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent-orange" />
                        </div>
                    </FadeUp>

                    <FadeUp delay={0.1}>
                        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                            <span className="text-neutral-900">{t("timeline.heading.part1") || "A Decade of"} </span>
                            <span className="bg-gradient-to-r from-accent-orange to-accent-red bg-clip-text text-transparent">
                                {t("timeline.heading.part2") || "Digital Excellence"}
                            </span>
                        </h2>
                    </FadeUp>

                    <FadeUp delay={0.2}>
                        <p className="text-lead text-neutral-gray max-w-2xl mx-auto">
                            {t("timeline.subheading") ||
                                "From humble beginnings to global recognition, our journey has been defined by innovation and commitment to excellence."}
                        </p>
                    </FadeUp>
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="relative max-w-5xl mx-auto">
                    {/* Center line - static background */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 -translate-x-1/2 hidden lg:block" />

                    {/* Center line - animated fill (scroll-driven) */}
                    <motion.div
                        ref={lineRef}
                        className="absolute left-1/2 top-0 w-1 -translate-x-1/2 hidden lg:block rounded-full overflow-hidden"
                        style={{
                            height: prefersReducedMotion ? "100%" : lineHeight,
                            background: "linear-gradient(180deg, #1E4DB7 0%, #FFE63B 50%, #F59A23 100%)",
                        }}
                    >
                        {/* Glowing tip */}
                        <motion.div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-yellow shadow-lg"
                            style={{
                                boxShadow: "0 0 20px rgba(255, 230, 59, 0.6)",
                            }}
                        />
                    </motion.div>

                    {/* Mobile line (left side) */}
                    <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-neutral-200 lg:hidden" />
                    <motion.div
                        className="absolute left-7 top-0 w-1 rounded-full overflow-hidden lg:hidden"
                        style={{
                            height: prefersReducedMotion ? "100%" : lineHeight,
                            background: "linear-gradient(180deg, #1E4DB7 0%, #FFE63B 50%, #F59A23 100%)",
                        }}
                    />

                    {/* Timeline nodes */}
                    <div className="relative space-y-0">
                        {milestones.map((milestone, index) => (
                            <TimelineNode
                                key={milestone.key}
                                milestone={milestone}
                                index={index}
                                isInView={isInView}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
