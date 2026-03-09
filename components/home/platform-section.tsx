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
    glowColor: string;
}

const moduleConfigs: ModuleConfig[] = [
    {
        key: "companion",
        icon: Heart,
        gradient: "linear-gradient(135deg, #C2185B 0%, #E91E8C 100%)",
        glowColor: "rgba(194, 24, 91, 0.3)",
    },
    {
        key: "learning",
        icon: BookOpen,
        gradient: "linear-gradient(135deg, #0D7377 0%, #14A3A8 100%)",
        glowColor: "rgba(13, 115, 119, 0.3)",
    },
    {
        key: "mentoring",
        icon: UserCheck,
        gradient: "linear-gradient(135deg, #E8A317 0%, #F59A23 100%)",
        glowColor: "rgba(232, 163, 23, 0.3)",
    },
    {
        key: "dashboard",
        icon: BarChart3,
        gradient: "linear-gradient(135deg, #095456 0%, #0D7377 100%)",
        glowColor: "rgba(13, 115, 119, 0.3)",
    },
];

function ModuleCard({
    config,
    index,
    isVisible,
    t,
}: {
    config: ModuleConfig;
    index: number;
    isVisible: boolean;
    t: ReturnType<typeof useTranslations>;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = config.icon;

    return (
        <div
            className={`group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden motion-safe:transition-all motion-safe:duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Hover glow effect */}
            <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(circle at 30% 30%, ${config.glowColor} 0%, transparent 70%)`,
                }}
            />

            {/* Card shine effect on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 55%, transparent 60%)",
                    transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
                    transition: "transform 0.8s ease, opacity 0.5s ease",
                }}
            />

            <div className="relative p-8">
                {/* Module number */}
                <div className="absolute top-6 right-6 text-4xl font-black text-white/[0.04] select-none">
                    0{index + 1}
                </div>

                {/* Icon with gradient background and glow */}
                <div className="relative w-14 h-14 mb-6">
                    <div
                        className="absolute inset-0 rounded-xl blur-lg transition-opacity duration-400"
                        style={{
                            background: config.gradient,
                            opacity: isHovered ? 0.4 : 0,
                        }}
                    />
                    <div
                        className="relative w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ background: config.gradient }}
                    >
                        <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 transition-colors duration-300">
                    {t(`items.${config.key}.name`)}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                    {t(`items.${config.key}.description`)}
                </p>

                {/* Badge */}
                <span
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300"
                    style={{
                        backgroundColor: isHovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                        color: isHovered ? "#fff" : "rgba(255,255,255,0.6)",
                        borderWidth: "1px",
                        borderColor: isHovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
                    }}
                >
                    <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: config.gradient }}
                    />
                    {t(`items.${config.key}.badge`)}
                </span>
            </div>

            {/* Bottom gradient border on hover */}
            <div
                className="absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-500"
                style={{
                    background: config.gradient,
                    opacity: isHovered ? 1 : 0,
                }}
            />
        </div>
    );
}

export function PlatformSection() {
    const t = useTranslations("products");
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
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
            style={{ backgroundColor: "#062C2E" }}
        >
            {/* Background patterns */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 20% 50%, #0D7377 0%, transparent 50%), radial-gradient(circle at 80% 50%, #C2185B 0%, transparent 50%)",
                }}
                aria-hidden="true"
            />
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <div
                    className={`text-center max-w-3xl mx-auto mb-16 motion-safe:transition-all motion-safe:duration-700 ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Sparkles className="h-4 w-4 text-[#E8A317]" />
                        <span className="overline text-[#E8A317]">
                            {t("label")}
                        </span>
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
                        {moduleConfigs.map((config, index) => (
                            <ModuleCard
                                key={config.key}
                                config={config}
                                index={index}
                                isVisible={isVisible}
                                t={t}
                            />
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div
                    className={`flex justify-center mt-14 motion-safe:transition-all motion-safe:duration-500 ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: "500ms" }}
                >
                    <Link
                        href="/platform"
                        className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#E8A317] text-[#062C2E] font-semibold hover:bg-[#FFD700] motion-safe:transition-all duration-300 hover:shadow-lg hover:shadow-[#E8A317]/25 hover:scale-[1.02]"
                    >
                        <span>{t("exploreAll")}</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
