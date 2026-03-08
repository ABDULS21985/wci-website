"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// ============================================
// DATA & TYPES
// ============================================

const testimonialKeys = [
    "testimonial1",
    "testimonial2",
    "testimonial3",
    "testimonial4",
    "testimonial5",
    "testimonial6",
];

// Key metrics for each testimonial (to display the bold stat)
const testimonialMetrics: Record<string, string> = {
    testimonial1: "40% efficiency increase",
    testimonial2: "99.9% uptime achieved",
    testimonial3: "3x faster decisions",
    testimonial4: "Zero security incidents",
    testimonial5: "95% team certified",
    testimonial6: "100% compliance rate",
};

// Star ratings for each testimonial
const testimonialRatings: Record<string, number> = {
    testimonial1: 5,
    testimonial2: 5,
    testimonial3: 5,
    testimonial4: 5,
    testimonial5: 5,
    testimonial6: 5,
};

// ============================================
// HOOKS
// ============================================

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

// Generate initials from author name
function getInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

// ============================================
// SUB-COMPONENTS
// ============================================

// Animated Star Rating Component
function AnimatedStars({
    rating,
    isActive,
    prefersReducedMotion
}: {
    rating: number;
    isActive: boolean;
    prefersReducedMotion: boolean;
}) {
    return (
        <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
            {[...Array(5)].map((_, index) => (
                <motion.div
                    key={index}
                    initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0 }}
                    animate={
                        prefersReducedMotion
                            ? {}
                            : isActive
                                ? { opacity: 1, scale: 1 }
                                : { opacity: 0, scale: 0 }
                    }
                    transition={{
                        duration: 0.3,
                        delay: isActive ? 0.4 + index * 0.1 : 0,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <Star
                        className={`w-5 h-5 ${
                            index < rating
                                ? "fill-[#FFE63B] text-[#FFE63B]"
                                : "fill-transparent text-white/30"
                        }`}
                    />
                </motion.div>
            ))}
        </div>
    );
}

// Decorative Quote Mark
function QuoteMark({
    isActive,
    prefersReducedMotion
}: {
    isActive: boolean;
    prefersReducedMotion: boolean;
}) {
    return (
        <motion.div
            className="absolute -top-8 -left-4 md:-top-12 md:-left-8 select-none pointer-events-none"
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.5 }}
            animate={
                prefersReducedMotion
                    ? {}
                    : isActive
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.5 }
            }
            transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
            aria-hidden="true"
        >
            <span
                className="text-[120px] md:text-[180px] font-serif leading-none"
                style={{ color: "rgba(255, 230, 59, 0.15)" }}
            >
                &ldquo;
            </span>
        </motion.div>
    );
}

// Floating Decorative Elements
function FloatingElements() {
    return (
        <>
            {/* Top right decorative circle */}
            <div
                className="absolute top-20 right-[10%] w-64 h-64 rounded-full opacity-[0.03] blur-3xl"
                style={{ background: "linear-gradient(135deg, #FFE63B 0%, #FFD700 100%)" }}
                aria-hidden="true"
            />
            {/* Bottom left decorative circle */}
            <div
                className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full opacity-[0.02] blur-3xl"
                style={{ background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)" }}
                aria-hidden="true"
            />
            {/* Small accent dots */}
            <div
                className="absolute top-1/4 left-[15%] w-2 h-2 rounded-full bg-[#FFE63B] opacity-20"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-1/3 right-[20%] w-1.5 h-1.5 rounded-full bg-[#FFE63B] opacity-15"
                aria-hidden="true"
            />
        </>
    );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function TestimonialsSection() {
    const t = useTranslations("testimonials");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const prefersReducedMotion = useReducedMotion();
    const [isInView, setIsInView] = useState(false);

    // Create translated testimonials array
    const testimonials = testimonialKeys.map((key) => ({
        key,
        quote: t(`items.${key}.quote`),
        author: t(`items.${key}.author`),
        role: t(`items.${key}.role`),
        company: t(`items.${key}.company`),
        metric: testimonialMetrics[key],
        rating: testimonialRatings[key],
    }));

    // Intersection observer for in-view detection
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Auto-advance carousel every 8 seconds
    useEffect(() => {
        if (prefersReducedMotion) return;

        const startTimer = () => {
            timerRef.current = setInterval(() => {
                setDirection(1);
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            }, 8000);
        };

        startTimer();

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [testimonials.length, prefersReducedMotion]);

    // Reset timer on manual navigation
    const resetTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        if (!prefersReducedMotion) {
            timerRef.current = setInterval(() => {
                setDirection(1);
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            }, 8000);
        }
    }, [testimonials.length, prefersReducedMotion]);

    const goToNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        resetTimer();
    }, [testimonials.length, resetTimer]);

    const goToPrevious = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        resetTimer();
    }, [testimonials.length, resetTimer]);

    const goToSlide = useCallback((index: number) => {
        if (index === currentIndex) return;
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
        resetTimer();
    }, [currentIndex, resetTimer]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            switch (e.key) {
                case "ArrowLeft":
                    e.preventDefault();
                    goToPrevious();
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    goToNext();
                    break;
            }
        },
        [goToNext, goToPrevious]
    );

    const currentTestimonial = testimonials[currentIndex];

    // Animation variants for testimonial cards
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
        }),
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden"
            style={{ backgroundColor: "#0F172A" }}
            role="region"
            aria-label="Client testimonials"
            onKeyDown={handleKeyDown}
        >
            {/* Gradient Overlay Background */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(135deg, rgba(15, 23, 42, 1) 0%, rgba(30, 41, 59, 0.8) 50%, rgba(15, 23, 42, 1) 100%)",
                }}
                aria-hidden="true"
            />

            {/* Subtle top gradient line */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255, 230, 59, 0.3) 50%, transparent 100%)",
                }}
                aria-hidden="true"
            />

            {/* Floating Decorative Elements */}
            <FloatingElements />

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16 md:mb-20"
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                    animate={prefersReducedMotion ? {} : isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span
                        className="inline-block text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-4"
                        style={{ color: "#FFE63B" }}
                    >
                        {t("label") || "Testimonials"}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                        {t("title")}
                    </h2>
                </motion.div>

                {/* Cinematic Quote Card */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Large Decorative Quote Mark */}
                        <QuoteMark isActive={isInView} prefersReducedMotion={prefersReducedMotion} />

                        {/* Card Container */}
                        <div
                            className="relative rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16"
                            style={{
                                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                                backdropFilter: "blur(20px)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                        >
                            {/* AnimatePresence for smooth transitions */}
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={prefersReducedMotion ? {} : slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.3 },
                                    }}
                                >
                                    {/* Star Rating */}
                                    <div className="mb-6 md:mb-8">
                                        <AnimatedStars
                                            rating={currentTestimonial.rating}
                                            isActive={isInView}
                                            prefersReducedMotion={prefersReducedMotion}
                                        />
                                    </div>

                                    {/* Quote Text */}
                                    <motion.blockquote
                                        className="mb-8 md:mb-10"
                                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                                        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        <p className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed font-light">
                                            &ldquo;{currentTestimonial.quote}&rdquo;
                                        </p>
                                    </motion.blockquote>

                                    {/* Key Metric Badge */}
                                    <motion.div
                                        className="mb-8"
                                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                                        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.3 }}
                                    >
                                        <span
                                            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold"
                                            style={{
                                                background: "rgba(255, 230, 59, 0.15)",
                                                color: "#FFE63B",
                                                border: "1px solid rgba(255, 230, 59, 0.3)",
                                            }}
                                        >
                                            {currentTestimonial.metric}
                                        </span>
                                    </motion.div>

                                    {/* Author Attribution */}
                                    <motion.footer
                                        className="flex items-center gap-4"
                                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
                                        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.4 }}
                                    >
                                        {/* Avatar */}
                                        <div
                                            className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                                            style={{
                                                background: "linear-gradient(135deg, #FFE63B 0%, #FFD700 100%)",
                                            }}
                                        >
                                            <span className="text-lg md:text-xl font-bold text-[#0F172A]">
                                                {getInitials(currentTestimonial.author)}
                                            </span>
                                        </div>

                                        {/* Name and Role */}
                                        <div>
                                            <cite className="not-italic">
                                                <p className="text-lg md:text-xl font-semibold text-white">
                                                    {currentTestimonial.author}
                                                </p>
                                                <p className="text-sm md:text-base text-white/60">
                                                    {currentTestimonial.role}, {currentTestimonial.company}
                                                </p>
                                            </cite>
                                        </div>
                                    </motion.footer>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-between mt-8 md:mt-12">
                            {/* Previous Button */}
                            <button
                                onClick={goToPrevious}
                                className="group w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFE63B] focus:ring-offset-2 focus:ring-offset-[#0F172A]"
                                style={{
                                    background: "rgba(255, 255, 255, 0.05)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                }}
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft
                                    className="h-5 w-5 md:h-6 md:w-6 text-white/60 group-hover:text-white transition-colors"
                                    aria-hidden="true"
                                />
                            </button>

                            {/* Dots Navigation */}
                            <div
                                className="flex justify-center gap-2 md:gap-3"
                                role="tablist"
                                aria-label="Testimonial slides"
                            >
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        role="tab"
                                        aria-selected={index === currentIndex}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                        className="relative h-2 md:h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFE63B] focus:ring-offset-2 focus:ring-offset-[#0F172A]"
                                        style={{
                                            width: index === currentIndex ? "2rem" : "0.5rem",
                                            background: index === currentIndex
                                                ? "#FFE63B"
                                                : "rgba(255, 255, 255, 0.2)",
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={goToNext}
                                className="group w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFE63B] focus:ring-offset-2 focus:ring-offset-[#0F172A]"
                                style={{
                                    background: "rgba(255, 255, 255, 0.05)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                }}
                                aria-label="Next testimonial"
                            >
                                <ChevronRight
                                    className="h-5 w-5 md:h-6 md:w-6 text-white/60 group-hover:text-white transition-colors"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>

                        {/* Auto-advance indicator */}
                        {!prefersReducedMotion && (
                            <div className="mt-6 flex justify-center">
                                <div
                                    className="h-0.5 rounded-full overflow-hidden"
                                    style={{
                                        width: "120px",
                                        background: "rgba(255, 255, 255, 0.1)",
                                    }}
                                >
                                    <motion.div
                                        className="h-full"
                                        style={{ background: "#FFE63B" }}
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{
                                            duration: 8,
                                            ease: "linear",
                                            repeat: Infinity,
                                        }}
                                        key={currentIndex}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Subtle bottom gradient line */}
            <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255, 230, 59, 0.2) 50%, transparent 100%)",
                }}
                aria-hidden="true"
            />
        </section>
    );
}
