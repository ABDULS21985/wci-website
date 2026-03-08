"use client";

import { useRef, useCallback, useState } from "react";
import { Eye, Target, Heart, LucideIcon } from "lucide-react";
import { FadeUp } from "@/components/ui/animations/scroll-reveal";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

interface CardData {
    key: "mission" | "vision" | "values";
    icon: LucideIcon;
    gradient: string;
    glowColor: string;
    accentColor: string;
}

const cards: CardData[] = [
    {
        key: "mission",
        icon: Target,
        gradient: "from-primary to-secondary",
        glowColor: "rgba(30, 77, 183, 0.4)",
        accentColor: "primary",
    },
    {
        key: "vision",
        icon: Eye,
        gradient: "from-accent-orange to-accent-red",
        glowColor: "rgba(245, 154, 35, 0.4)",
        accentColor: "accent-orange",
    },
    {
        key: "values",
        icon: Heart,
        gradient: "from-accent-yellow to-accent-orange",
        glowColor: "rgba(255, 230, 59, 0.4)",
        accentColor: "accent-yellow",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
};

/**
 * Interactive card with hover glow effect
 */
function GlowCard({ card, children }: { card: CardData; children: React.ReactNode }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const springMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    const glowX = useTransform(springMouseX, (v) => `${v}px`);
    const glowY = useTransform(springMouseY, (v) => `${v}px`);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            const rect = cardRef.current?.getBoundingClientRect();
            if (rect) {
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            }
        },
        [mouseX, mouseY]
    );

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className="group relative h-full"
            variants={cardVariants}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Glow effect - follows cursor */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(400px circle at ${glowX.get()} ${glowY.get()}, ${card.glowColor}, transparent 50%)`,
                    left: glowX,
                    top: glowY,
                    transform: "translate(-50%, -50%)",
                    width: "200%",
                    height: "200%",
                }}
            />

            {/* Border glow on hover */}
            <div
                className={`absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px] bg-gradient-to-br ${card.gradient}`}
            />

            {/* Card content */}
            <div className="relative h-full p-8 md:p-10 lg:p-12 rounded-2xl bg-white border border-neutral-200 group-hover:border-transparent transition-all duration-500 overflow-hidden">
                {/* Shine sweep on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

                {/* Top accent bar */}
                <motion.div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: "left" }}
                />

                {children}
            </div>
        </motion.div>
    );
}

export function MissionVisionSection() {
    const t = useTranslations("about");

    // Values declarations per mega-prompt spec
    const valuesDeclarations = [
        { key: "build", text: t("values.declarations.build") || "We Build What We Recommend" },
        { key: "complexity", text: t("values.declarations.complexity") || "Complexity Is Our Comfort Zone" },
        { key: "security", text: t("values.declarations.security") || "Security Is Non-Negotiable" },
    ];

    return (
        <section
            className="relative w-full overflow-hidden bg-white"
            style={{ paddingBlock: "var(--section-padding-lg)" }}
        >
            {/* Subtle background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-orange/5 rounded-full blur-3xl" />
            </div>

            {/* Dot pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
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
                            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-primary" />
                            <span className="overline text-primary">{t("missionVision.overline")}</span>
                            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-primary" />
                        </div>
                    </FadeUp>

                    <FadeUp delay={0.1}>
                        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                            {t("missionVision.heading")}
                        </h2>
                    </FadeUp>

                    <FadeUp delay={0.2}>
                        <p className="text-lead text-neutral-gray max-w-2xl mx-auto">
                            {t("missionVision.subheading")}
                        </p>
                    </FadeUp>
                </div>

                {/* Cards grid - 3 side by side */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <GlowCard key={card.key} card={card}>
                                {/* Icon */}
                                <div className="relative mb-6">
                                    <div
                                        className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                                    >
                                        <Icon className="h-8 w-8 text-white" />
                                    </div>
                                </div>

                                {/* Label */}
                                <span
                                    className={`overline text-${card.accentColor} mb-4 block`}
                                >
                                    {t(`${card.key}.title`)}
                                </span>

                                {/* Heading */}
                                <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4">
                                    {t(`${card.key}.heading`)}
                                </h3>

                                {/* Description */}
                                <p className="text-neutral-gray leading-relaxed mb-6">
                                    {t(`${card.key}.description`)}
                                </p>

                                {/* Values declarations - only for values card */}
                                {card.key === "values" && (
                                    <div className="space-y-3 pt-4 border-t border-neutral-100">
                                        {valuesDeclarations.map((declaration, idx) => (
                                            <div
                                                key={declaration.key}
                                                className="flex items-center gap-3 text-sm"
                                            >
                                                <div
                                                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.gradient}`}
                                                />
                                                <span className="font-medium text-neutral-700">
                                                    {declaration.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </GlowCard>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
