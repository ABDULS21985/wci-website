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
}

const programConfigs: ProgramConfig[] = [
    {
        key: "resilience",
        icon: Heart,
        slug: "psychosocial-resilience",
        color: "#C2185B",
    },
    {
        key: "economic",
        icon: Laptop,
        slug: "economic-empowerment",
        color: "#0D7377",
    },
    {
        key: "leadership",
        icon: Users,
        slug: "leadership-mentoring",
        color: "#E8A317",
    },
    {
        key: "impact",
        icon: BarChart3,
        slug: "humanitarian-impact",
        color: "#095456",
    }
];

interface Program {
    name: string;
    description: string;
    icon: LucideIcon;
    slug: string;
    color: string;
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
                    transition: 'all 0.35s ease-out',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    borderColor: isHovered ? program.color : '#E2E8F0',
                    boxShadow: isHovered
                        ? `0 20px 40px ${program.color}1a`
                        : '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
            >
                {/* Accent bar at top */}
                <div
                    className="absolute top-0 left-0 right-0 h-1 origin-left"
                    style={{
                        backgroundColor: program.color,
                        transition: 'transform 0.35s ease-out',
                        transform: isHovered ? 'scaleX(1)' : 'scaleX(0)'
                    }}
                />

                {/* Icon */}
                <div className="mb-6">
                    <div
                        className="rounded-full flex items-center justify-center"
                        style={{
                            width: '64px',
                            height: '64px',
                            backgroundColor: `${program.color}15`
                        }}
                    >
                        <program.icon
                            style={{ width: '28px', height: '28px', color: program.color }}
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
                <span className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: program.color }}>
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

                <div className={`flex justify-center mt-12 motion-safe:transition-all motion-safe:duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
                    <Link
                        href="/programs"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 motion-safe:transition-colors btn-press"
                    >
                        <span>{t("viewAll")}</span>
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
