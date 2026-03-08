"use client";

import { useEffect, useState, useRef } from "react";
import { LucideIcon } from "lucide-react";

export interface Stat {
    value: string;
    numericValue?: number;
    label: string;
    icon: LucideIcon;
    suffix?: string;
    prefix?: string;
}

interface StatsSectionProps {
    stats: Stat[];
    title?: string;
    subtitle?: string;
    darkBackground?: boolean;
    animateOnScroll?: boolean;
}

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, start]);

    return count;
}

function AnimatedStat({
    stat,
    index,
    isVisible,
    darkBackground,
}: {
    stat: Stat;
    index: number;
    isVisible: boolean;
    darkBackground: boolean;
}) {
    const Icon = stat.icon;
    const numericValue = stat.numericValue ?? parseFloat(stat.value.replace(/[^0-9.]/g, ""));
    const count = useCountUp(numericValue, 2000, isVisible);

    const displayValue = stat.numericValue
        ? `${stat.prefix || ""}${count}${stat.suffix || ""}`
        : stat.value;

    return (
        <div
            className={`text-center animate-fade-in-up ${darkBackground ? "text-white" : ""}`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${
                    darkBackground ? "bg-white/10" : "bg-primary/10"
                }`}
            >
                <Icon
                    className={`h-7 w-7 ${darkBackground ? "text-accent-orange" : "text-primary"}`}
                />
            </div>
            <div
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-2 ${
                    darkBackground ? "text-white" : "text-primary"
                }`}
            >
                {displayValue}
            </div>
            <div
                className={`text-sm md:text-base ${
                    darkBackground ? "text-white/70" : "text-neutral-600"
                }`}
            >
                {stat.label}
            </div>
        </div>
    );
}

export function StatsSection({
    stats,
    title,
    subtitle,
    darkBackground = false,
    animateOnScroll = true,
}: StatsSectionProps) {
    const [isVisible, setIsVisible] = useState(!animateOnScroll);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!animateOnScroll) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [animateOnScroll]);

    return (
        <section
            ref={sectionRef}
            className={`w-full py-16 md:py-24 ${
                darkBackground
                    ? "bg-gradient-to-br from-primary to-secondary"
                    : "bg-neutral-50"
            }`}
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Optional Header */}
                {(title || subtitle) && (
                    <div className="text-center mb-12">
                        {title && (
                            <h2
                                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in-up ${
                                    darkBackground ? "text-white" : "text-[#1e3a8a]"
                                }`}
                            >
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p
                                className={`text-lg max-w-2xl mx-auto animate-fade-in-up delay-100 ${
                                    darkBackground ? "text-white/80" : "text-neutral-600"
                                }`}
                            >
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <AnimatedStat
                            key={index}
                            stat={stat}
                            index={index}
                            isVisible={isVisible}
                            darkBackground={darkBackground}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
