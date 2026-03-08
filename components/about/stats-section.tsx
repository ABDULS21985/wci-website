"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

interface StatItem {
    value: number;
    suffix: string;
    labelKey: string;
}

// Reduced to 4 key stats for single row display
const stats: StatItem[] = [
    { value: 500, suffix: "+", labelKey: "stats.projects" },
    { value: 50, suffix: "+", labelKey: "stats.countries" },
    { value: 10, suffix: "+", labelKey: "stats.years" },
    { value: 99, suffix: "%", labelKey: "stats.satisfaction" },
];

/**
 * Animated counter using requestAnimationFrame
 * Uses Math.round for smoother transitions and easeOutExpo for enterprise feel
 */
function useAnimatedCounter(end: number, duration: number = 2000, startCounting: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startCounting) return;
        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // easeOutExpo for smooth deceleration
            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.round(easeOutExpo * end));
            if (progress < 1) animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, startCounting]);

    return count;
}

/**
 * Format number with locale-appropriate separators
 */
function formatNumber(num: number): string {
    return num.toLocaleString();
}

function StatCard({ stat, index, isVisible, label }: { stat: StatItem; index: number; isVisible: boolean; label: string }) {
    const count = useAnimatedCounter(stat.value, 2000, isVisible);

    return (
        <motion.div
            className="relative text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <div className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white tabular-nums mb-2">
                {formatNumber(count)}{stat.suffix}
            </div>
            <p className="text-white/80 text-sm md:text-base font-medium">{label}</p>
        </motion.div>
    );
}

export function StatsSection() {
    const gridRef = useRef<HTMLDivElement>(null);
    const isGridInView = useInView(gridRef, { once: true, amount: 0.3 });
    const t = useTranslations("about");

    return (
        <section
            className="w-full relative overflow-hidden bg-primary"
            style={{ paddingBlock: "var(--section-padding-md)" }}
        >
            <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
                {/* Stats in single row with dividers */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 max-w-5xl mx-auto"
                >
                    {stats.map((stat, index) => (
                        <div
                            key={stat.labelKey}
                            className={`relative ${
                                index < stats.length - 1 ? "md:border-r md:border-white/20" : ""
                            }`}
                        >
                            <StatCard
                                stat={stat}
                                index={index}
                                isVisible={isGridInView}
                                label={t(stat.labelKey)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
