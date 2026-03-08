"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/shared/components";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// ============================================
// HOOKS
// ============================================

function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handler = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return prefersReducedMotion;
}

// ============================================
// LINE-BY-LINE TEXT REVEAL
// ============================================

function AnimatedHeadline({ lines, prefersReducedMotion }: { lines: string[]; prefersReducedMotion: boolean }) {
    if (prefersReducedMotion) {
        return (
            <>
                {lines.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                ))}
            </>
        );
    }

    return (
        <>
            {lines.map((line, lineIndex) => (
                <motion.span
                    key={lineIndex}
                    className="block overflow-hidden"
                    initial={{ clipPath: "inset(0 0 100% 0)" }}
                    animate={{ clipPath: "inset(0 0 0 0)" }}
                    transition={{
                        duration: 0.6,
                        delay: 0.3 + lineIndex * 0.15,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {line}
                </motion.span>
            ))}
        </>
    );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function PremiumHero() {
    const heroRef = useRef<HTMLElement>(null);
    const prefersReducedMotion = useReducedMotion();

    return (
        <section
            ref={heroRef}
            className="relative w-full min-h-[75vh] overflow-hidden flex items-center bg-white"
            aria-label="Hero section"
        >
            {/* Background - subtle gradient only, no orbs */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {/* Very subtle primary gradient - 5% opacity max */}
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Text Content */}
                    <div className="max-w-xl">
                        {/* Overline */}
                        <motion.span
                            className="overline text-primary mb-6 block"
                            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Global Digitalbit Limited
                        </motion.span>

                        {/* Main Headline - using text-display class */}
                        <h1 className="text-display text-neutral-900 mb-6">
                            <AnimatedHeadline
                                lines={["Transforming", "Businesses Through", "Technology"]}
                                prefersReducedMotion={prefersReducedMotion}
                            />
                        </h1>

                        {/* Subtitle */}
                        <motion.p
                            className="text-lead text-neutral-gray mb-8"
                            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            We help enterprises accelerate digital transformation through AI, cybersecurity,
                            and data analytics solutions. Serving clients across 50+ countries with over
                            a decade of proven excellence.
                        </motion.p>

                        {/* CTA Buttons - One primary, one outline */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                        >
                            <Button
                                asChild
                                size="lg"
                                className="btn-press bg-primary hover:bg-primary/90 text-white rounded-lg px-8"
                            >
                                <Link href="/services">
                                    Explore Services
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="btn-press border-2 border-neutral-300 text-neutral-900 hover:border-primary hover:text-primary rounded-lg px-8"
                            >
                                <Link href="/contact">
                                    Contact Us
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Trust indicators - minimal */}
                        <motion.div
                            className="mt-12 pt-8 border-t border-neutral-200"
                            initial={prefersReducedMotion ? {} : { opacity: 0 }}
                            animate={prefersReducedMotion ? {} : { opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                        >
                            <div className="flex items-center gap-8">
                                <div>
                                    <div className="text-2xl font-semibold text-neutral-900">500+</div>
                                    <div className="text-sm text-neutral-gray">Projects Delivered</div>
                                </div>
                                <div className="w-px h-12 bg-neutral-200" />
                                <div>
                                    <div className="text-2xl font-semibold text-neutral-900">50+</div>
                                    <div className="text-sm text-neutral-gray">Countries Served</div>
                                </div>
                                <div className="w-px h-12 bg-neutral-200" />
                                <div>
                                    <div className="text-2xl font-semibold text-neutral-900">10+</div>
                                    <div className="text-sm text-neutral-gray">Years Experience</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Visual Element */}
                    <motion.div
                        className="relative hidden lg:block"
                        initial={prefersReducedMotion ? {} : { opacity: 0, x: 40 }}
                        animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="relative aspect-square max-w-lg mx-auto">
                            {/* Main Image */}
                            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=800&fit=crop"
                                    alt="Digital transformation team collaboration"
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                {/* Subtle overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                            </div>

                            {/* Floating accent card - minimal design */}
                            <motion.div
                                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-neutral-100"
                                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.0 }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-neutral-900">Enterprise Ready</div>
                                        <div className="text-xs text-neutral-gray">ISO 27001 Certified</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Second floating card */}
                            <motion.div
                                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 border border-neutral-100"
                                initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
                                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white"
                                            />
                                        ))}
                                    </div>
                                    <div className="text-xs">
                                        <div className="font-medium text-neutral-900">Global Team</div>
                                        <div className="text-neutral-gray">100+ Experts</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default PremiumHero;
