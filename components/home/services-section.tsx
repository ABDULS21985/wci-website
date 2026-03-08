"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
    ArrowRight,
    GitBranch,
    ShieldCheck,
    Blocks,
    MessageSquare,
    LucideIcon
} from "lucide-react";

interface ServiceConfig {
    key: string;
    icon: LucideIcon;
    slug: string;
}

const serviceConfigs: ServiceConfig[] = [
    {
        key: "businessProcessManagement",
        icon: GitBranch,
        slug: "business-process-management",
    },
    {
        key: "cyberSecurity",
        icon: ShieldCheck,
        slug: "cyber-security",
    },
    {
        key: "blockchain",
        icon: Blocks,
        slug: "blockchain",
    },
    {
        key: "itConsultation",
        icon: MessageSquare,
        slug: "it-consultation",
    }
];

interface Service {
    name: string;
    description: string;
    icon: LucideIcon;
    slug: string;
}

function ServiceCard({ service, index, isVisible, learnMoreText }: {
    service: Service;
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
                // Grid-aware stagger: 0.08s between cards
                transitionDelay: `${index * 80}ms`
            }}
        >
            <Link
                href={`/services/${service.slug}`}
                className="group relative block h-full bg-white border border-[#E2E8F0] p-8 shadow-sm rounded-2xl overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    transition: 'all 0.35s ease-out',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    borderColor: isHovered ? '#1E4DB7' : '#E2E8F0',
                    boxShadow: isHovered
                        ? '0 20px 40px rgba(30, 77, 183, 0.1)'
                        : '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
            >
                {/* Accent bar at top - appears on hover with scaleX animation */}
                <div
                    className="absolute top-0 left-0 right-0 h-1 bg-[#1E4DB7] origin-left"
                    style={{
                        transition: 'transform 0.35s ease-out',
                        transform: isHovered ? 'scaleX(1)' : 'scaleX(0)'
                    }}
                />

                {/* Icon: 56x56px in a 64x64 circle with bg-#EEF2FF */}
                <div className="mb-6">
                    <div
                        className="rounded-full flex items-center justify-center"
                        style={{
                            width: '64px',
                            height: '64px',
                            backgroundColor: '#EEF2FF'
                        }}
                    >
                        <service.icon
                            className="text-primary"
                            style={{ width: '28px', height: '28px' }}
                            strokeWidth={1.5}
                        />
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 group-hover:text-primary motion-safe:transition-colors motion-safe:duration-300">
                    {service.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                </p>

                {/* CTA */}
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    <span>{learnMoreText}</span>
                    <ArrowRight className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-300 group-hover:translate-x-1" />
                </span>
            </Link>
        </div>
    );
}

export function ServicesSection() {
    const t = useTranslations("services");
    const sectionRef = useRef<HTMLElement>(null);
    // Use lazy initialization to check prefersReducedMotion
    const [isVisible, setIsVisible] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });

    // Create translated services array
    const services: Service[] = serviceConfigs.map((config) => ({
        name: t(`items.${config.key}.name`),
        description: t(`items.${config.key}.description`),
        icon: config.icon,
        slug: config.slug,
    }));

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Already visible if reduced motion is preferred (set via lazy init)
        if (prefersReducedMotion) {
            return;
        }

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
            {/* Background: subtle gradient #F8FAFC to #FFFFFF */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)'
                }}
                aria-hidden="true"
            />

            <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
                {/* Section Header with kicker, gradient headline, and subtext */}
                <div className={`text-center max-w-3xl mx-auto mb-16 motion-safe:transition-all motion-safe:duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {/* Kicker text */}
                    <span className="overline text-primary mb-4 block">{t("label")}</span>

                    {/* Headline with gradient highlight on key word */}
                    <h2 className="text-display mt-4 mb-6">
                        <span>{t("title").split(' ').slice(0, -1).join(' ')} </span>
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #1E4DB7 0%, #6366F1 100%)'
                            }}
                        >
                            {t("title").split(' ').slice(-1)[0]}
                        </span>
                    </h2>

                    {/* Subtext describing services */}
                    <p className="text-lead text-muted-foreground max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Services Grid: 4-col desktop, 2-col tablet, 1-col mobile with 24px gap */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={service.slug}
                                service={service}
                                index={index}
                                isVisible={isVisible}
                                learnMoreText={t("learnMore")}
                            />
                        ))}
                    </div>
                </div>

                {/* View All Services Button */}
                <div className={`flex justify-center mt-12 motion-safe:transition-all motion-safe:duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
                    <Link
                        href="/services"
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
