"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
    ArrowRight,
    Heart,
    Laptop,
    Users,
    BarChart3,
    LucideIcon
} from "lucide-react";

interface ProgramConfig {
    key: string;
    icon: LucideIcon;
    slug: string;
    color: string;
    gradient: string;
}

const programConfigs: ProgramConfig[] = [
    {
        key: "resilience",
        icon: Heart,
        slug: "psychosocial-resilience",
        color: "#C2185B",
        gradient: "linear-gradient(135deg, #C2185B 0%, #E91E8C 100%)",
    },
    {
        key: "economic",
        icon: Laptop,
        slug: "economic-empowerment",
        color: "#0D7377",
        gradient: "linear-gradient(135deg, #0D7377 0%, #14A3A8 100%)",
    },
    {
        key: "leadership",
        icon: Users,
        slug: "leadership-mentoring",
        color: "#E8A317",
        gradient: "linear-gradient(135deg, #E8A317 0%, #F59A23 100%)",
    },
    {
        key: "impact",
        icon: BarChart3,
        slug: "humanitarian-impact",
        color: "#095456",
        gradient: "linear-gradient(135deg, #095456 0%, #0D7377 100%)",
    }
];

interface Program {
    name: string;
    description: string;
    icon: LucideIcon;
    slug: string;
    color: string;
    gradient: string;
}

function ProgramCard({ program, index, isVisible, learnMoreText }: {
    program: Program;
    index: number;
    isVisible: boolean;
    learnMoreText: string;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`motion-safe:transition-all motion-safe:duration-500 ${
                isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-10 scale-[0.95]'
            }`}
            style={{
                transitionDelay: `${index * 80}ms`
            }}
        >
            <Link
                href={`/programs/${program.slug}`}
                className="group relative block h-full bg-white border border-[#E2E8F0] p-8 shadow-sm rounded-2xl overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    borderColor: isHovered ? `${program.color}40` : '#E2E8F0',
                    boxShadow: isHovered
                        ? `0 20px 40px ${program.color}15, 0 8px 16px rgba(0,0,0,0.04)`
                        : '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
            >
                {/* Accent bar at top */}
                <div
                    className="absolute top-0 left-0 right-0 h-1 origin-left"
                    style={{
                        background: program.gradient,
                        transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                        transform: isHovered ? 'scaleX(1)' : 'scaleX(0)'
                    }}
                />

                {/* Step number watermark */}
                <div
                    className="absolute top-4 right-6 text-6xl font-black select-none transition-opacity duration-300"
                    style={{ color: isHovered ? `${program.color}08` : '#f1f5f9' }}
                >
                    0{index + 1}
                </div>

                {/* Icon */}
                <div className="mb-6 relative">
                    {/* Icon glow on hover */}
                    <div
                        className="absolute inset-0 rounded-2xl blur-xl transition-opacity duration-400"
                        style={{
                            background: program.gradient,
                            opacity: isHovered ? 0.15 : 0,
                            transform: "scale(1.5)",
                        }}
                    />
                    <div
                        className="relative rounded-2xl flex items-center justify-center transition-all duration-400"
                        style={{
                            width: '64px',
                            height: '64px',
                            background: isHovered ? program.gradient : `${program.color}10`,
                        }}
                    >
                        <program.icon
                            style={{
                                width: '28px',
                                height: '28px',
                                color: isHovered ? '#fff' : program.color,
                                transition: 'color 0.3s ease',
                            }}
                            strokeWidth={1.5}
                        />
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 motion-safe:transition-colors motion-safe:duration-300"
                    style={{ color: isHovered ? program.color : undefined }}
                >
                    {program.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {program.description}
                </p>

                {/* CTA */}
                <span
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300"
                    style={{ color: program.color }}
                >
                    <span
                        className="h-0.5 rounded-full transition-all duration-300"
                        style={{
                            backgroundColor: program.color,
                            width: isHovered ? "20px" : "12px",
                        }}
                    />
                    <span>{learnMoreText}</span>
                    <ArrowRight className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-300 group-hover:translate-x-1" />
                </span>
            </Link>
        </div>
    );
}

export function ProgramsSection() {
    const t = useTranslations("services");
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });

    const programs: Program[] = programConfigs.map((config) => ({
        name: t(`items.${config.key}.name`),
        description: t(`items.${config.key}.description`),
        icon: config.icon,
        slug: config.slug,
        color: config.color,
        gradient: config.gradient,
    }));

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-20 md:py-28 overflow-hidden"
        >
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)'
                }}
                aria-hidden="true"
            />

            <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
                <div className={`text-center max-w-3xl mx-auto mb-16 motion-safe:transition-all motion-safe:duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="overline text-primary mb-4 block">{t("label")}</span>

                    <h2 className="text-display mt-4 mb-6">
                        <span>{t("title").split(' ').slice(0, -1).join(' ')} </span>
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #0D7377 0%, #C2185B 100%)'
                            }}
                        >
                            {t("title").split(' ').slice(-1)[0]}
                        </span>
                    </h2>

                    <p className="text-lead text-muted-foreground max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {programs.map((program, index) => (
                            <ProgramCard
                                key={program.slug}
                                program={program}
                                index={index}
                                isVisible={isVisible}
                                learnMoreText={t("learnMore")}
                            />
                        ))}
                    </div>
                </div>

                <div className={`flex justify-center mt-14 motion-safe:transition-all motion-safe:duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
                    <Link
                        href="/programs"
                        className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 motion-safe:transition-all duration-300 btn-press hover:shadow-lg hover:shadow-primary/25"
                    >
                        <span>{t("viewAll")}</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
