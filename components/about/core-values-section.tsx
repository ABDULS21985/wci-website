"use client";

import {
    Lightbulb,
    Shield,
    Heart,
    Users,
    Zap,
    TrendingUp,
    LucideIcon,
} from "lucide-react";
import { FadeUp } from "@/components/ui/animations/scroll-reveal";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface ValueItem {
    icon: LucideIcon;
    key: string;
}

const coreValues: ValueItem[] = [
    { icon: Lightbulb, key: "innovation" },
    { icon: Shield, key: "reliability" },
    { icon: Heart, key: "integrity" },
    { icon: Users, key: "teamwork" },
    { icon: Zap, key: "excellence" },
    { icon: TrendingUp, key: "growth" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

export function CoreValuesSection() {
    const t = useTranslations("about");

    return (
        <section className="w-full relative overflow-hidden bg-neutral-50" style={{ paddingBlock: "var(--section-padding-md)" }}>
            {/* Single subtle background element - 10% opacity max */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20 max-w-4xl mx-auto">
                    <FadeUp>
                        <span className="overline text-primary mb-4 block">{t("values.overline")}</span>
                    </FadeUp>

                    <FadeUp delay={0.1}>
                        <h2 className="text-neutral-900 mb-4">
                            {t("values.heading")}
                        </h2>
                    </FadeUp>

                    <FadeUp delay={0.2}>
                        <p className="text-lead text-neutral-gray max-w-2xl mx-auto">
                            {t("values.subheading")}
                        </p>
                    </FadeUp>
                </div>

                {/* Values grid - 3 columns on desktop */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {coreValues.map((value) => {
                        const Icon = value.icon;
                        return (
                            <motion.div
                                key={value.key}
                                className="group relative"
                                variants={cardVariants}
                            >
                                <div className="card-interactive relative h-full p-8 md:p-10 rounded-2xl bg-white border border-neutral-200 hover:border-primary/30">
                                    {/* Icon - simple solid circle background */}
                                    <div className="relative mb-6">
                                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
                                            <Icon className="h-7 w-7 text-primary" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-neutral-900 mb-3">
                                        {t(`values.${value.key}.title`)}
                                    </h3>
                                    <p className="text-neutral-gray text-sm md:text-base leading-relaxed">
                                        {t(`values.${value.key}.desc`)}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
