"use client";

import { useCallback, useRef } from "react";
import { ArrowRight, MessageSquare, Phone } from "lucide-react";
import { Link } from "@/i18n/routing";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ScaleIn } from "@/components/ui/animations/scroll-reveal";
import { useTranslations } from "next-intl";

export function AboutCtaSection() {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const t = useTranslations("about");

    const cursorX = useTransform(mouseX, [-300, 300], ["40%", "60%"]);
    const cursorY = useTransform(mouseY, [-300, 300], ["40%", "60%"]);
    const springCursorX = useSpring(cursorX, { stiffness: 100, damping: 30 });
    const springCursorY = useSpring(cursorY, { stiffness: 100, damping: 30 });

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set(e.clientX - rect.left - rect.width / 2);
            mouseY.set(e.clientY - rect.top - rect.height / 2);
        }
    }, [mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    return (
        <section
            className="relative w-full overflow-hidden"
            style={{ paddingBlock: "var(--section-padding-md)" }}
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />

            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
                <ScaleIn>
                    <motion.div
                        ref={cardRef}
                        className="relative max-w-5xl mx-auto"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Animated gradient border */}
                        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-primary via-accent-orange to-secondary opacity-30 blur-[1px]" />

                        <div className="relative p-8 md:p-12 lg:p-16 rounded-3xl bg-white border border-neutral-light/50 overflow-hidden shadow-lg shadow-primary/5">
                            {/* Mouse-tracking radial glow */}
                            <motion.div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: `radial-gradient(600px circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(30, 77, 183, 0.06), transparent 40%)`,
                                    // @ts-expect-error CSS custom properties
                                    "--cursor-x": springCursorX,
                                    "--cursor-y": springCursorY,
                                }}
                            />

                            {/* Subtle dot pattern */}
                            <div
                                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                                style={{
                                    backgroundImage: `radial-gradient(circle, #1E4DB7 1px, transparent 1px)`,
                                    backgroundSize: "24px 24px",
                                }}
                            />

                            {/* Floating orbs */}
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
                            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-orange/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

                            <div className="relative z-10 text-center">
                                <h2 className="font-bold text-secondary mb-4" style={{ fontSize: "var(--font-size-4xl)" }}>
                                    {t("cta.heading.part1")}{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-red">
                                        {t("cta.heading.part2")}
                                    </span>
                                </h2>
                                <p className="text-neutral-gray text-lg md:text-xl max-w-2xl mx-auto mb-10">
                                    {t("cta.description")}
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    {/* Primary CTA */}
                                    <div className="inline-block relative group">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-accent-orange to-accent-red rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                                        <Link
                                            href="/contact"
                                            className="relative px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-accent-orange to-accent-red hover:from-accent-red hover:to-accent-orange rounded-full text-white font-bold text-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent-orange/30 overflow-hidden"
                                        >
                                            {/* Shimmer sweep */}
                                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                            <MessageSquare className="w-5 h-5 relative z-10" />
                                            <span className="relative z-10">{t("cta.primaryButton")}</span>
                                            <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                                        </Link>
                                    </div>

                                    {/* Secondary CTA */}
                                    <Link
                                        href="/services"
                                        className="inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 border-2 border-primary/20 hover:border-primary hover:bg-primary hover:text-white rounded-full text-primary font-bold text-lg transition-all duration-300 hover:scale-105"
                                    >
                                        <Phone className="w-5 h-5" />
                                        {t("cta.secondaryButton")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </ScaleIn>
            </div>
        </section>
    );
}
