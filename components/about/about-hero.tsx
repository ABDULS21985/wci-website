"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook to detect reduced motion preference
 */
function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
        if (typeof window === "undefined") return false;
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

/**
 * Line-by-line text reveal animation with gradient highlight on key words
 */
function AnimatedHeadline({
    lines,
    prefersReducedMotion,
}: {
    lines: { text: string; hasGradient?: boolean }[];
    prefersReducedMotion: boolean;
}) {
    if (prefersReducedMotion) {
        return (
            <>
                {lines.map((line, i) => (
                    <span key={i} className="block">
                        {line.hasGradient ? (
                            <span className="bg-gradient-to-r from-accent-yellow via-accent-orange to-accent-red bg-clip-text text-transparent">
                                {line.text}
                            </span>
                        ) : (
                            line.text
                        )}
                    </span>
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
                        duration: 0.7,
                        delay: 0.4 + lineIndex * 0.2,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {line.hasGradient ? (
                        <motion.span
                            className="bg-gradient-to-r from-accent-yellow via-accent-orange to-accent-red bg-clip-text text-transparent"
                            initial={{ backgroundSize: "0% 100%" }}
                            animate={{ backgroundSize: "100% 100%" }}
                            transition={{
                                duration: 0.8,
                                delay: 0.8 + lineIndex * 0.2,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            {line.text}
                        </motion.span>
                    ) : (
                        line.text
                    )}
                </motion.span>
            ))}
        </>
    );
}

/**
 * Parallax Image Layer - moves at different speeds for depth
 */
function ParallaxImage({
    src,
    alt,
    className,
    parallaxSpeed = 0.5,
    scrollYProgress,
    zIndex = 0,
    priority = false,
}: {
    src: string;
    alt: string;
    className?: string;
    parallaxSpeed?: number;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
    zIndex?: number;
    priority?: boolean;
}) {
    const y = useTransform(scrollYProgress, [0, 1], [0, parallaxSpeed * 100]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <motion.div
            className={className}
            style={{ y, scale, zIndex, position: "relative" }}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                priority={priority}
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </motion.div>
    );
}

export function AboutHero() {
    const heroRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const t = useTranslations("about");

    // Mouse parallax for images
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    // Scroll-based parallax
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    // Transform values for exit animation
    const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Handle mouse move for parallax
    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (prefersReducedMotion) return;
            const rect = heroRef.current?.getBoundingClientRect();
            if (rect) {
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                mouseX.set((e.clientX - centerX) / 30);
                mouseY.set((e.clientY - centerY) / 30);
            }
        },
        [mouseX, mouseY, prefersReducedMotion]
    );

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    // GSAP scroll exit animation
    useEffect(() => {
        if (prefersReducedMotion || !heroRef.current || !contentRef.current) return;

        const ctx = gsap.context(() => {
            // Hero exit animation
            gsap.to(contentRef.current, {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                },
                y: -60,
                opacity: 0,
            });
        });

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    const headlineLines = [
        { text: t("hero.heading.line1"), hasGradient: false },
        { text: t("hero.heading.line2"), hasGradient: true },
    ];

    return (
        <section
            ref={heroRef}
            className="relative w-full min-h-[100dvh] overflow-hidden flex items-center"
            aria-label="About hero section"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background gradient base - Layer 0 */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0D2137] to-[#0A1628]" />

            {/* Split layout container */}
            <div className="absolute inset-0 grid lg:grid-cols-2">
                {/* Left side - dark gradient for text readability */}
                <div className="relative bg-gradient-to-r from-[#0A1628] via-[#0A1628]/95 to-[#0A1628]/80 lg:to-transparent" />

                {/* Right side - overlapping images with parallax */}
                <div className="relative hidden lg:block overflow-hidden">
                    {/* Image Layer 1 - Background (slowest parallax) */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            x: useTransform(springMouseX, (v) => v * 0.5),
                            y: useTransform(springMouseY, (v) => v * 0.5),
                        }}
                    >
                        <ParallaxImage
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop"
                            alt="Modern office interior"
                            className="absolute top-0 right-0 w-[80%] h-[70%] rounded-bl-3xl overflow-hidden"
                            parallaxSpeed={0.3}
                            scrollYProgress={scrollYProgress}
                            zIndex={1}
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0A1628]/40 to-[#0A1628]/90" />
                    </motion.div>

                    {/* Image Layer 2 - Middle depth */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            x: useTransform(springMouseX, (v) => v * 0.8),
                            y: useTransform(springMouseY, (v) => v * 0.8),
                        }}
                    >
                        <ParallaxImage
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
                            alt="Team collaboration"
                            className="absolute bottom-[10%] left-[5%] w-[55%] h-[50%] rounded-2xl overflow-hidden shadow-2xl shadow-primary/30"
                            parallaxSpeed={0.5}
                            scrollYProgress={scrollYProgress}
                            zIndex={2}
                        />
                    </motion.div>

                    {/* Image Layer 3 - Foreground (fastest parallax) */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            x: useTransform(springMouseX, (v) => v * 1.2),
                            y: useTransform(springMouseY, (v) => v * 1.2),
                        }}
                    >
                        <ParallaxImage
                            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2670&auto=format&fit=crop"
                            alt="Technology workspace"
                            className="absolute top-[25%] right-[10%] w-[40%] h-[35%] rounded-2xl overflow-hidden shadow-2xl shadow-accent-orange/20"
                            parallaxSpeed={0.7}
                            scrollYProgress={scrollYProgress}
                            zIndex={3}
                        />
                    </motion.div>

                    {/* Gradient overlays for depth */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0A1628]/30 to-[#0A1628]/90 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 via-transparent to-transparent z-10" />
                </div>
            </div>

            {/* Mobile background image */}
            <div className="absolute inset-0 lg:hidden">
                <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
                    alt="Team collaboration at Global Digitalbit"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/80 via-primary/60 to-[#0A1628]/90" />
            </div>

            {/* Vignette overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse at center, transparent 0%, rgba(10, 22, 40, 0.4) 100%)",
            }} />

            {/* Content */}
            <motion.div
                ref={contentRef}
                className="relative z-20 container mx-auto px-5 sm:px-6 lg:px-8 py-20"
                style={{
                    y: prefersReducedMotion ? 0 : contentY,
                    opacity: prefersReducedMotion ? 1 : contentOpacity,
                }}
            >
                <div className="max-w-2xl lg:max-w-3xl">
                    {/* Kicker text */}
                    <motion.span
                        className="inline-flex items-center gap-3 text-accent-yellow text-xs md:text-sm font-bold tracking-[0.15em] uppercase mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="w-10 h-0.5 bg-gradient-to-r from-accent-yellow to-accent-orange" />
                        {t("hero.kicker") || "Enterprise Technology Partners"}
                    </motion.span>

                    {/* Main heading - Large with gradient text */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
                        <AnimatedHeadline lines={headlineLines} prefersReducedMotion={prefersReducedMotion} />
                    </h1>

                    {/* Subheadline */}
                    <motion.p
                        className="text-lg md:text-xl text-white/70 max-w-xl mb-10 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {t("hero.subtitle")}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <a
                            href="/contact"
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent-yellow text-[#0A1628] font-bold rounded-xl overflow-hidden transition-all duration-300 hover:bg-accent-orange hover:shadow-lg hover:shadow-accent-yellow/30"
                        >
                            <span className="relative z-10">{t("hero.cta.primary") || "Get in Touch"}</span>
                            <svg
                                className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a
                            href="/services"
                            className="group inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-semibold rounded-xl transition-all duration-300 hover:border-white/80 hover:bg-white/5"
                        >
                            <span>{t("hero.cta.secondary") || "Our Services"}</span>
                            <svg
                                className="w-5 h-5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
            >
                <span className="text-xs uppercase tracking-[0.1em] text-white/40">
                    {t("hero.scroll") || "Scroll to explore"}
                </span>
                <motion.div
                    className="w-6 h-10 rounded-full border border-white/30 flex justify-center pt-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-white/60"
                        animate={{ y: [0, 16, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
