"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
    ArrowRight,
    Heart,
    BookOpen,
    UserCheck,
    BarChart3,
    LucideIcon,
    Sparkles,
} from "lucide-react";

interface ModuleConfig {
    key: string;
    icon: LucideIcon;
    gradient: string;
}

const moduleConfigs: ModuleConfig[] = [
    {
        key: "companion",
        icon: Heart,
        gradient: "linear-gradient(135deg, #C2185B 0%, #E91E8C 100%)",
    },
    {
        key: "learning",
        icon: BookOpen,
        gradient: "linear-gradient(135deg, #0D7377 0%, #14A3A8 100%)",
    },
    {
        key: "mentoring",
        icon: UserCheck,
        gradient: "linear-gradient(135deg, #E8A317 0%, #F59A23 100%)",
    },
    {
        key: "dashboard",
        icon: BarChart3,
        gradient: "linear-gradient(135deg, #095456 0%, #0D7377 100%)",
    },
];

export function PlatformSection() {
    const t = useTranslations("products");
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });

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
            style={{ backgroundColor: '#062C2E' }}
        >
            {/* Subtle pattern overlay */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, #0D7377 0%, transparent 50%), radial-gradient(circle at 80% 50%, #C2185B 0%, transparent 50%)'
                }}
                aria-hidden="true"
            />

            <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <div className={`text-center max-w-3xl mx-auto mb-16 motion-safe:transition-all motion-safe:duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Sparkles className="h-4 w-4 text-[#E8A317]" />
                        <span className="overline text-[#E8A317]">{t("label")}</span>
                    </div>

                    <h2 className="text-display text-white mt-4 mb-6">
                        {t("title")}
                    </h2>

                    <p className="text-lead text-gray-300 max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Platform Modules Grid */}
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {moduleConfigs.map((config, index) => {
                            const Icon = config.icon;
                            return (
                                <div
                                    key={config.key}
                                    className={`group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 motion-safe:transition-all motion-safe:duration-500 hover:bg-white/10 hover:border-white/20 ${
                                        isVisible
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-10'
                                    }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    {/* Icon with gradient background */}
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                                        style={{ background: config.gradient }}
                                    >
                                        <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                                    </div>

                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        {t(`items.${config.key}.name`)}
                                    </h3>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                        {t(`items.${config.key}.description`)}
                                    </p>

                                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-gray-300">
                                        {t(`items.${config.key}.badge`)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <div className={`flex justify-center mt-12 motion-safe:transition-all motion-safe:duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
                    <Link
                        href="/platform"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E8A317] text-white font-medium hover:bg-[#D49615] motion-safe:transition-colors"
                    >
                        <span>{t("exploreAll")}</span>
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
