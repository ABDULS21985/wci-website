"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Search, Lightbulb, Hammer, Rocket, LucideIcon } from "lucide-react";
import { gsap, useGSAP } from "@/providers/gsap-provider";

interface ProcessStepConfig {
    key: string;
    icon: LucideIcon;
    label: string;
}

const processStepConfigs: ProcessStepConfig[] = [
    { key: "step1", icon: Search, label: "Discover" },
    { key: "step2", icon: Lightbulb, label: "Strategize" },
    { key: "step3", icon: Hammer, label: "Build" },
    { key: "step4", icon: Rocket, label: "Deploy & Optimize" },
];

interface ProcessStep {
    title: string;
    description: string;
    icon: LucideIcon;
    label: string;
}

interface StepCardProps {
    step: ProcessStep;
    index: number;
    isLeft: boolean;
}

function StepCard({ step, index, isLeft }: StepCardProps) {
    const Icon = step.icon;

    return (
        <div
            className={`
                step-card opacity-0
                relative w-full max-w-md
                ${isLeft ? 'md:mr-auto md:pr-8 lg:pr-12' : 'md:ml-auto md:pl-8 lg:pl-12'}
            `}
            data-direction={isLeft ? 'left' : 'right'}
        >
            {/* Card Container */}
            <div className="
                relative overflow-hidden rounded-2xl p-6 md:p-8
                bg-white
                border border-neutral-100
                shadow-[0_4px_24px_rgba(30,77,183,0.08)]
                hover:shadow-[0_8px_40px_rgba(30,77,183,0.15)]
                transition-shadow duration-500
                group
            ">
                {/* Step Label Badge */}
                <div className="inline-flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold tracking-wider text-primary/60 uppercase">
                        Step {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-neutral-400">|</span>
                    <span className="text-xs font-semibold text-accent-orange">
                        {step.label}
                    </span>
                </div>

                {/* Icon */}
                <div className="
                    step-icon opacity-0
                    w-14 h-14 md:w-16 md:h-16 mb-5
                    rounded-xl
                    bg-gradient-to-br from-primary/5 to-accent-orange/5
                    flex items-center justify-center
                    group-hover:from-primary/10 group-hover:to-accent-orange/10
                    transition-all duration-500
                ">
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary group-hover:text-accent-orange transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="step-title opacity-0 text-lg md:text-xl font-bold text-neutral-900 mb-3 leading-tight">
                    {step.title}
                </h3>

                {/* Description */}
                <p className="step-desc opacity-0 text-sm md:text-base text-neutral-600 leading-relaxed">
                    {step.description}
                </p>

                {/* Bottom accent gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent-orange to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </div>
    );
}

interface TimelineNodeProps {
    index: number;
    icon: LucideIcon;
    label: string;
}

function TimelineNode({ index, icon: Icon, label }: TimelineNodeProps) {
    return (
        <div
            className="
                timeline-node
                absolute left-1/2 -translate-x-1/2
                flex flex-col items-center
                z-10
            "
            style={{ top: `${(index / 3) * 100}%` }}
        >
            {/* Glow effect behind node */}
            <div className="
                node-glow
                absolute w-16 h-16 md:w-20 md:h-20
                rounded-full
                bg-gradient-to-r from-[#1E4DB7] to-[#FFE63B]
                opacity-0
                blur-xl
                -z-10
            " />

            {/* Node circle */}
            <div className="
                node-circle
                w-10 h-10 md:w-12 md:h-12
                rounded-full
                bg-neutral-200
                border-4 border-white
                shadow-lg
                flex items-center justify-center
                transition-all duration-500
            ">
                <Icon className="w-4 h-4 md:w-5 md:h-5 text-neutral-400 node-icon transition-colors duration-300" />
            </div>

            {/* Label tooltip */}
            <div className="
                node-label
                absolute -bottom-8
                px-3 py-1
                bg-white
                rounded-full
                shadow-md
                border border-neutral-100
                opacity-0
                scale-90
                transition-all duration-300
                whitespace-nowrap
            ">
                <span className="text-xs font-semibold text-primary">{label}</span>
            </div>
        </div>
    );
}

export function ProcessSection() {
    const t = useTranslations("process");
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const timelineProgressRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Create translated process steps
    const processSteps: ProcessStep[] = processStepConfigs.map((config) => ({
        title: t(`steps.${config.key}.title`),
        description: t(`steps.${config.key}.description`),
        icon: config.icon,
        label: config.label,
    }));

    // GSAP Scroll Animations
    useGSAP(() => {
        if (!sectionRef.current || !timelineRef.current || !timelineProgressRef.current) return;

        const section = sectionRef.current;
        const timelineProgress = timelineProgressRef.current;
        const cards = section.querySelectorAll('.step-card');
        const nodes = section.querySelectorAll('.timeline-node');

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            // Show everything immediately for reduced motion users
            gsap.set(cards, { opacity: 1, x: 0 });
            gsap.set(nodes, { opacity: 1 });
            gsap.set(timelineProgress, { scaleY: 1 });
            gsap.set('.step-icon, .step-title, .step-desc', { opacity: 1, y: 0 });
            return;
        }

        // Timeline progress fill animation (scrub with scroll)
        gsap.to(timelineProgress, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top 60%",
                end: "bottom 40%",
                scrub: 0.5,
            },
        });

        // Animate each step card and node
        cards.forEach((card, index) => {
            const direction = card.getAttribute('data-direction');
            const xOffset = direction === 'left' ? -80 : 80;
            const node = nodes[index];

            // Card slide in animation
            gsap.fromTo(card,
                {
                    opacity: 0,
                    x: xOffset
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        end: "top 50%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Stagger content within card (icon -> title -> description)
            const cardIcon = card.querySelector('.step-icon');
            const cardTitle = card.querySelector('.step-title');
            const cardDesc = card.querySelector('.step-desc');

            const contentTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });

            contentTimeline
                .fromTo(cardIcon,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                )
                .fromTo(cardTitle,
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
                    "-=0.2"
                )
                .fromTo(cardDesc,
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
                    "-=0.2"
                );

            // Node activation animation
            if (node) {
                const nodeCircle = node.querySelector('.node-circle');
                const nodeGlow = node.querySelector('.node-glow');
                const nodeIcon = node.querySelector('.node-icon');
                const nodeLabel = node.querySelector('.node-label');

                gsap.to(nodeCircle, {
                    backgroundColor: "#1E4DB7",
                    scale: 1.1,
                    duration: 0.4,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                });

                gsap.to(nodeGlow, {
                    opacity: 0.6,
                    scale: 1.2,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                });

                gsap.to(nodeIcon, {
                    color: "#ffffff",
                    duration: 0.3,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                });

                gsap.to(nodeLabel, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                });
            }
        });

    }, { scope: sectionRef, dependencies: [] });

    // Header visibility animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (headerRef.current) {
            observer.observe(headerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-20 md:py-32 bg-white overflow-hidden"
        >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #1E4DB7 1px, transparent 0)`,
                backgroundSize: '48px 48px'
            }} />

            <div className="relative container max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-16 md:mb-24">
                    <div
                        className={`
                            inline-flex items-center gap-3 mb-6
                            transition-all duration-700
                            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                        `}
                    >
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent-orange" />
                        <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-primary uppercase">
                            {t("label")}
                        </span>
                        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent-orange" />
                    </div>

                    <h2
                        className={`
                            text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4
                            transition-all duration-700 delay-100
                            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                        `}
                    >
                        <span className="text-primary">{t("heading1")}</span>
                        <br />
                        <span className="bg-gradient-to-r from-accent-orange to-accent-red bg-clip-text text-transparent">
                            {t("heading2")}
                        </span>
                    </h2>

                    <p
                        className={`
                            max-w-2xl mx-auto text-neutral-600 text-base md:text-lg
                            transition-all duration-700 delay-200
                            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                        `}
                    >
                        {t("subtitle")}
                    </p>
                </div>

                {/* Desktop: Vertical Timeline with Alternating Cards */}
                <div className="hidden md:block relative">
                    {/* Timeline Container */}
                    <div
                        ref={timelineRef}
                        className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2"
                    >
                        {/* Background line (gray) */}
                        <div className="absolute inset-0 bg-neutral-200 rounded-full" />

                        {/* Progress fill (gradient) */}
                        <div
                            ref={timelineProgressRef}
                            className="absolute inset-0 rounded-full origin-top scale-y-0"
                            style={{
                                background: 'linear-gradient(180deg, #1E4DB7 0%, #FFE63B 100%)'
                            }}
                        />

                        {/* Timeline nodes */}
                        {processStepConfigs.map((config, index) => (
                            <TimelineNode
                                key={config.key}
                                index={index}
                                icon={config.icon}
                                label={config.label}
                            />
                        ))}
                    </div>

                    {/* Cards Container */}
                    <div className="relative space-y-24 lg:space-y-32">
                        {processSteps.map((step, index) => (
                            <div
                                key={index}
                                className="relative grid grid-cols-2 gap-8 lg:gap-16"
                            >
                                {/* Left side */}
                                <div className={index % 2 === 0 ? '' : 'order-2'}>
                                    {index % 2 === 0 && (
                                        <StepCard
                                            step={step}
                                            index={index}
                                            isLeft={true}
                                        />
                                    )}
                                </div>

                                {/* Right side */}
                                <div className={index % 2 === 0 ? 'order-2' : ''}>
                                    {index % 2 !== 0 && (
                                        <StepCard
                                            step={step}
                                            index={index}
                                            isLeft={false}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile: Timeline on Left with Cards */}
                <div className="md:hidden relative">
                    {/* Timeline on left edge */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5">
                        {/* Background line (gray) */}
                        <div className="absolute inset-0 bg-neutral-200 rounded-full" />

                        {/* Progress fill (gradient) */}
                        <div
                            className="timeline-progress-mobile absolute inset-0 rounded-full origin-top scale-y-0"
                            style={{
                                background: 'linear-gradient(180deg, #1E4DB7 0%, #FFE63B 100%)'
                            }}
                        />
                    </div>

                    {/* Cards */}
                    <div className="relative space-y-8 pl-12">
                        {processSteps.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Mobile node */}
                                <div className="
                                    absolute -left-12 top-6
                                    w-8 h-8
                                    rounded-full
                                    bg-white
                                    border-2 border-neutral-200
                                    shadow-sm
                                    flex items-center justify-center
                                    z-10
                                    mobile-node
                                ">
                                    {(() => {
                                        const Icon = step.icon;
                                        return <Icon className="w-4 h-4 text-neutral-400" />;
                                    })()}
                                </div>

                                {/* Card */}
                                <div className="
                                    step-card opacity-0
                                    relative overflow-hidden rounded-xl p-5
                                    bg-white
                                    border border-neutral-100
                                    shadow-[0_2px_16px_rgba(30,77,183,0.06)]
                                " data-direction="right">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-bold text-primary/60">
                                            Step {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="text-xs text-accent-orange font-semibold">
                                            {step.label}
                                        </span>
                                    </div>

                                    <h3 className="step-title opacity-0 text-base font-bold text-neutral-900 mb-2">
                                        {step.title}
                                    </h3>

                                    <p className="step-desc opacity-0 text-sm text-neutral-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
