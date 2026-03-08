"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

interface MetricItem {
    value: number;
    suffix: string;
    labelKey: string;
    description?: string;
}

// 5 key metrics as per the spec
const metrics: MetricItem[] = [
    { value: 500, suffix: "+", labelKey: "metrics.projects", description: "Across every major industry" },
    { value: 50, suffix: "+", labelKey: "metrics.countries", description: "From Lagos to Doha and beyond" },
    { value: 99, suffix: "%", labelKey: "metrics.satisfaction", description: "Measured. Verified. Maintained." },
    { value: 15, suffix: "+", labelKey: "metrics.years", description: "Of digital excellence" },
    { value: 200, suffix: "+", labelKey: "metrics.experts", description: "Certified professionals" },
];

/**
 * Animated counter using requestAnimationFrame
 * Uses easeOutExpo for smooth deceleration
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

function MetricCounter({
    metric,
    index,
    isVisible,
    label,
    description,
}: {
    metric: MetricItem;
    index: number;
    isVisible: boolean;
    label: string;
    description: string;
}) {
    const count = useAnimatedCounter(metric.value, 2000, isVisible);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative text-center group px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Number */}
            <motion.div
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tabular-nums mb-2 transition-colors duration-300"
                style={{
                    color: isHovered ? "#FFE63B" : "white",
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.3s ease-out, color 0.3s ease-out",
                }}
            >
                {formatNumber(count)}{metric.suffix}
            </motion.div>

            {/* Label */}
            <p className="text-white/90 text-sm md:text-base font-medium mb-1">{label}</p>

            {/* Description - shows on hover */}
            <motion.p
                className="text-white/50 text-xs absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -5 }}
                transition={{ duration: 0.2 }}
            >
                {description}
            </motion.p>
        </motion.div>
    );
}

export function KeyMetricsBar() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
    const t = useTranslations("about");

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden"
            aria-label="Key metrics"
        >
            {/* Brand gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#1E4DB7] to-secondary" />

            {/* Subtle pattern overlay */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: "24px 24px",
                }}
            />

            {/* Animated gradient shimmer */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{
                    x: ["-100%", "100%"],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Glowing accents */}
            <div className="absolute top-0 left-1/4 w-96 h-32 bg-accent-yellow/10 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-accent-orange/10 blur-3xl" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Metrics grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
                    {metrics.map((metric, index) => (
                        <div
                            key={metric.labelKey}
                            className={`relative ${
                                index < metrics.length - 1
                                    ? "lg:border-r lg:border-white/20"
                                    : ""
                            } ${
                                // Hide middle divider on 3-col layout
                                index === 2 ? "sm:border-r-0 lg:border-r" : ""
                            }`}
                        >
                            <MetricCounter
                                metric={metric}
                                index={index}
                                isVisible={isInView}
                                label={t(metric.labelKey)}
                                description={t(`${metric.labelKey}Desc`) || metric.description || ""}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom accent line */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-yellow via-accent-orange to-accent-red"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
            />
        </section>
    );
}
