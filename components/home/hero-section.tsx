"use client";

import { useState, useEffect, useCallback, useId, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/shared/components";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { LiveRegion, SrOnly } from "../ui/accessibility";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const slideConfigs = [
    {
        id: 1,
        key: "slide1",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: 2,
        key: "slide2",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: 3,
        key: "slide3",
        image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2669&auto=format&fit=crop",
    },
];

const statConfigs = [
    { value: 500, suffix: "+", key: "projectsDelivered" },
    { value: 50, suffix: "+", key: "globalClients" },
    { value: 10, suffix: "+", key: "yearsExperience" },
    { value: 99, suffix: "%", key: "clientSatisfaction" },
];

// Ken Burns zoom duration constants
const KEN_BURNS_DURATION = 7; // seconds for normal zoom
const KEN_BURNS_TRANSITION_DURATION = 0.8; // seconds for transition zoom

function useCountUp(end: number, duration: number = 2000, startCounting: boolean = false) {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (!startCounting) return;

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            countRef.current = Math.floor(easeOutQuart * end);
            setCount(countRef.current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, startCounting]);

    return count;
}

function AnimatedCounter({
    value,
    suffix,
    labelKey,
    delay,
    isVisible,
    t,
}: {
    value: number;
    suffix: string;
    labelKey: string;
    delay: number;
    isVisible: boolean;
    t: (key: string) => string;
}) {
    const [startCounting, setStartCounting] = useState(false);
    const count = useCountUp(value, 2000, startCounting);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => setStartCounting(true), delay);
            return () => clearTimeout(timer);
        }
    }, [isVisible, delay]);

    return (

        <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2 tabular-nums tracking-tight">

                <span className="inline-block transition-transform duration-300 group-hover:scale-110">
                    {count}
                    {suffix}
                </span>
            </div>

            <div className="text-sm md:text-base text-white/60 font-medium">
                {t(`stats.${labelKey}`)}
            </div>
        </div>
    );
}

export function HeroSection() {
    const t = useTranslations("hero");
    const [currentSlide, setCurrentSlide] = useState(0);
    const [previousSlide, setPreviousSlide] = useState<number | null>(null);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [statsVisible, setStatsVisible] = useState(false);
    const [entranceComplete, setEntranceComplete] = useState(false);

    // Touch/swipe state for mobile navigation
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const heroRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const kickerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const highlightRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const slideImagesRef = useRef<(HTMLDivElement | null)[]>([]);

    // GSAP quickTo for smooth mouse parallax
    const quickToXRef = useRef<gsap.QuickToFunc | null>(null);
    const quickToYRef = useRef<gsap.QuickToFunc | null>(null);

    const carouselId = useId();
    const carouselLabelId = `${carouselId}-label`;
    const carouselContentId = `${carouselId}-content`;
    const liveRegionId = `${carouselId}-live`;

    // Create translated slides array
    const slides = slideConfigs.map((config) => ({
        id: config.id,
        tagline: t(`slides.${config.key}.tagline`),
        title: t(`slides.${config.key}.title`),
        highlight: t(`slides.${config.key}.highlight`),
        description: t(`slides.${config.key}.description`),
        image: config.image,
        primaryCTA: t(`slides.${config.key}.primaryCTA`),
        secondaryCTA: t(`slides.${config.key}.secondaryCTA`),
    }));

    // Create translated stats array
    const stats = statConfigs.map((config) => ({
        value: config.value,
        suffix: config.suffix,
        labelKey: config.key,
    }));

    // GSAP entrance choreography timeline
    useGSAP(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            setEntranceComplete(true);
            return;
        }

        const tl = gsap.timeline({
            onComplete: () => {
                setEntranceComplete(true);
            }
        });

        // Set initial states
        gsap.set([kickerRef.current, subtextRef.current, ctaRef.current, statsRef.current, scrollIndicatorRef.current], {
            opacity: 0,
            y: 20,
        });

        // Set headline words initial state
        if (headlineRef.current) {
            const words = headlineRef.current.querySelectorAll('.hero-word');
            gsap.set(words, { opacity: 0, y: 30 });
        }

        // Set highlight initial state
        if (highlightRef.current) {
            const highlightSpan = highlightRef.current.querySelector('.hero-highlight');
            gsap.set(highlightSpan, { opacity: 0, y: 20, scale: 0.95 });
            const gradientSweep = highlightRef.current.querySelector('.gradient-sweep');
            if (gradientSweep) {
                gsap.set(gradientSweep, { scaleX: 0, transformOrigin: 'left center' });
            }
        }

        // t=0.0s: Kicker fades up
        tl.to(kickerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
        }, 0);

        // t=0.15s: Headline word-by-word reveal
        if (headlineRef.current) {
            const words = headlineRef.current.querySelectorAll('.hero-word');
            tl.to(words, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
            }, 0.15);
        }

        // t=0.5s: Highlight text reveal
        if (highlightRef.current) {
            const highlightSpan = highlightRef.current.querySelector('.hero-highlight');
            tl.to(highlightSpan, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
            }, 0.5);
        }

        // t=0.7s: Gradient highlight sweeps across
        if (highlightRef.current) {
            const gradientSweep = highlightRef.current.querySelector('.gradient-sweep');
            if (gradientSweep) {
                tl.to(gradientSweep, {
                    scaleX: 1,
                    duration: 0.6,
                    ease: "power2.inOut",
                }, 0.7);
            }
        }

        // t=0.8s: Subtext fades up
        tl.to(subtextRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
        }, 0.8);

        // t=1.0s: CTA buttons scale in
        tl.to(ctaRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
        }, 1.0);

        // t=1.2s: Stats bar rises from bottom
        tl.to(statsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
                setStatsVisible(true);
            }
        }, 1.2);

        // t=1.5s: Scroll indicator fades in and starts bouncing
        tl.to(scrollIndicatorRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
        }, 1.5);

        return () => {
            tl.kill();
        };
    }, { scope: heroRef });

    // Hero exit animation with ScrollTrigger
    useGSAP(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        // Wait for entrance to complete before setting up exit
        if (!entranceComplete) return;

        const exitTl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            }
        });

        // Background: scale 1.08 → 1.2, opacity 1 → 0
        if (backgroundRef.current) {
            exitTl.to(backgroundRef.current, {
                scale: 1.2,
                opacity: 0,
                ease: "none",
            }, 0);
        }

        // Headline: y 0 → -60px, opacity 1 → 0
        if (headlineRef.current) {
            exitTl.to(headlineRef.current, {
                y: -60,
                opacity: 0,
                ease: "none",
            }, 0);
        }

        if (highlightRef.current) {
            exitTl.to(highlightRef.current, {
                y: -60,
                opacity: 0,
                ease: "none",
            }, 0);
        }

        // Stats: y 0 → 30px, opacity 1 → 0
        if (statsRef.current) {
            exitTl.to(statsRef.current, {
                y: 30,
                opacity: 0,
                ease: "none",
            }, 0);
        }

        return () => {
            exitTl.kill();
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === heroRef.current) {
                    trigger.kill();
                }
            });
        };
    }, { scope: heroRef, dependencies: [entranceComplete] });

    // Enhanced mouse parallax with gsap.quickTo
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion || !backgroundRef.current) return;

        // Initialize quickTo for smooth 60fps interpolation
        quickToXRef.current = gsap.quickTo(backgroundRef.current, "x", { duration: 0.6, ease: "power2.out" });
        quickToYRef.current = gsap.quickTo(backgroundRef.current, "y", { duration: 0.6, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
            if (!heroRef.current) return;
            const rect = heroRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

            // Background shifts ±15px based on cursor
            if (quickToXRef.current && quickToYRef.current) {
                quickToXRef.current(x * 15);
                quickToYRef.current(y * 15);
            }

            // Update mouse position for other elements (decorative orbs)
            setMousePosition({ x: x * 20, y: y * 20 });
        };

        const hero = heroRef.current;
        if (hero) {
            hero.addEventListener("mousemove", handleMouseMove);
            return () => hero.removeEventListener("mousemove", handleMouseMove);
        }
    }, []);

    // Ken Burns zoom effect on slide images
    useGSAP(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        slideImagesRef.current.forEach((img, index) => {
            if (!img) return;

            if (index === currentSlide) {
                // Current slide: zoom from 1.0 to 1.08 over 7 seconds
                gsap.killTweensOf(img);
                gsap.fromTo(img,
                    { scale: previousSlide !== null ? 1.04 : 1.0 },
                    {
                        scale: 1.08,
                        duration: KEN_BURNS_DURATION,
                        ease: "none",
                    }
                );
            } else if (index === previousSlide && previousSlide !== null) {
                // Previous slide: zoom faster to 1.12 while fading out
                gsap.killTweensOf(img);
                gsap.to(img, {
                    scale: 1.12,
                    duration: KEN_BURNS_TRANSITION_DURATION,
                    ease: "power1.in",
                });
            }
        });
    }, { dependencies: [currentSlide, previousSlide] });


    const changeSlide = useCallback((newIndex: number) => {
        setIsTransitioning(true);
        setPreviousSlide(currentSlide);
        setTimeout(() => {
            setCurrentSlide(newIndex);
            setTimeout(() => {
                setIsTransitioning(false);
                setPreviousSlide(null);
            }, 50);
        }, 400);
    }, [currentSlide]);

    const nextSlide = useCallback(() => {
        changeSlide((currentSlide + 1) % slides.length);
    }, [currentSlide, changeSlide, slides.length]);

    const prevSlide = useCallback(() => {
        changeSlide((currentSlide - 1 + slides.length) % slides.length);
    }, [currentSlide, changeSlide, slides.length]);

    const goToSlide = (index: number) => {
        if (index !== currentSlide) {
            changeSlide(index);
            setIsAutoPlaying(false);
        }
    };

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            switch (e.key) {
                case "ArrowLeft":
                    e.preventDefault();
                    setIsAutoPlaying(false);
                    prevSlide();
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    setIsAutoPlaying(false);
                    nextSlide();
                    break;
                case "Home":
                    e.preventDefault();
                    setIsAutoPlaying(false);
                    changeSlide(0);
                    break;
                case "End":
                    e.preventDefault();
                    setIsAutoPlaying(false);
                    changeSlide(slides.length - 1);
                    break;
            }
        },
        [nextSlide, prevSlide, changeSlide, slides.length]
    );

    // Touch/swipe handlers for mobile navigation
    const minSwipeDistance = 50;

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    }, []);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }, []);

    const onTouchEnd = useCallback(() => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            // Next slide
            setIsAutoPlaying(false);
            nextSlide();
        } else if (isRightSwipe) {
            // Previous slide
            setIsAutoPlaying(false);
            prevSlide();
        }
    }, [touchStart, touchEnd, nextSlide, prevSlide]);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 6000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    const slide = slides[currentSlide];

    return (
        <section
            ref={heroRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Hero slideshow showcasing Global Digitalbit services"
            aria-labelledby={carouselLabelId}
            className="relative w-full min-h-screen overflow-hidden touch-pan-y"
            onKeyDown={handleKeyDown}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <SrOnly as="h2" id={carouselLabelId}>
                {t("carouselLabel")}
            </SrOnly>

            <LiveRegion id={liveRegionId} politeness="polite">
                {`Slide ${currentSlide + 1} of ${slides.length}: ${slide.title} ${slide.highlight}`}
            </LiveRegion>

            {/* Background with Subtle Gradient - Enhanced with gsap.quickTo parallax */}
            <div
                ref={backgroundRef}
                className="absolute inset-0 will-change-transform"
                style={{ scale: 1.08 }} // Initial scale for Ken Burns effect
                aria-hidden="true"
            >

                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary" />
                {/* Dot Pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
                {/* Animations defined in globals.css */}
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                {/* Large gradient orb - top right */}
                <div

                    className="absolute -top-40 -right-40 w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl animate-pulse"
                    style={{

                        transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                    }}
                />

                {/* Medium gradient orb - bottom left */}
                <div

                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/40 rounded-full blur-3xl animate-pulse"
                    style={{
                        animationDelay: "1000ms",

                        transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
                    }}
                />

                {/* Small gradient orb - center */}
                <div

                    className="absolute top-1/3 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"
                />

                {/* Accent orb */}
                <div

                    className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-accent-orange/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "500ms" }}
                />

                {/* Geometric Lines */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-5"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern
                            id="hero-grid-pattern"
                            width="60"
                            height="60"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 60 0 L 0 0 0 60"
                                fill="none"
                                stroke="white"
                                strokeWidth="1"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
                </svg>


                {/* Animations defined in globals.css */}
            </div>

            {/* Main Content */}
            <div
                ref={contentRef}
                id={carouselContentId}
                className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-40 md:pt-48 lg:pt-44 pb-32"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${currentSlide + 1} of ${slides.length}`}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[60vh]">
                    {/* Text Content */}
                    <div
                        className={`space-y-6 sm:space-y-8 transition-all duration-500 ${isTransitioning ? "opacity-0 translate-x-[-20px]" : "opacity-100 translate-x-0"
                            }`}
                    >
                        {/* Kicker/Tagline - GSAP animated */}
                        <div ref={kickerRef} className="overflow-hidden opacity-0">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                                <span className="flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-xs sm:text-sm font-medium tracking-[0.2em] text-white/90">
                                    {slide.tagline}
                                </span>
                            </div>
                        </div>

                        {/* Title with GSAP word-by-word animation */}
                        <div className="space-y-2">
                            <h1
                                ref={headlineRef}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight hero-text-glossy"
                            >
                                {slide.title.split(" ").map((word, index) => (
                                    <span key={index} className="inline-block overflow-hidden mr-[0.25em]">
                                        <span className="hero-word inline-block opacity-0 [text-shadow:0_1px_0_rgba(255,255,255,0.5),0_2px_10px_rgba(255,255,255,0.3)]">{word}</span>
                                    </span>
                                ))}
                            </h1>
                            <h2
                                ref={highlightRef}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight relative"
                            >
                                <span className="hero-highlight inline-block relative opacity-0">
                                    <span className="hero-gradient-text animate-gradient-shift">
                                        {slide.highlight}
                                    </span>
                                    {/* Gradient sweep effect */}
                                    <span
                                        className="gradient-sweep absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                                        style={{ transform: 'scaleX(0)' }}
                                        aria-hidden="true"
                                    />
                                </span>
                            </h2>
                        </div>

                        {/* Subtext - GSAP animated */}
                        <p
                            ref={subtextRef}
                            className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-xl opacity-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                        >
                            {slide.description}
                        </p>

                        {/* CTA Buttons - GSAP animated with back.out ease */}
                        <div
                            ref={ctaRef}
                            className="flex flex-col sm:flex-row gap-4 pt-4 opacity-0"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="group relative bg-accent-orange hover:bg-accent-red text-white rounded-full px-8 sm:px-10 h-12 sm:h-14 text-base font-semibold shadow-lg shadow-accent-orange/25 transition-all duration-300 hover:scale-105 overflow-hidden"
                            >
                                <Link href="/services">
                                    <span className="relative z-10">{slide.primaryCTA}</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                </Link>
                            </Button>

                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-primary rounded-full px-8 sm:px-10 h-12 sm:h-14 text-base font-semibold transition-all duration-300 hover:scale-105"

                            >
                                {slide.secondaryCTA}
                            </Link>
                        </div>
                    </div>

                    {/* Image with mouse-follow effect */}
                    <div
                        ref={imageRef}
                        className={`relative transition-all duration-500 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                            }`}
                        style={{
                            transform: `perspective(1000px) rotateY(${mousePosition.x * 0.3}deg) rotateX(${mousePosition.y * -0.3}deg)`,
                            transition: isTransitioning ? "opacity 0.5s, transform 0.5s" : "transform 0.1s ease-out",
                        }}
                    >
                        <div className="relative w-full max-w-lg mx-auto aspect-square">
                            {/* Glow effect behind image */}
                            <div

                                className="absolute inset-0 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] bg-gradient-to-br from-accent-orange/40 to-secondary/30 blur-3xl scale-110 opacity-60"

                                style={{
                                    transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                                }}
                                aria-hidden="true"
                            />

                            {/* Decorative rings */}
                            <div
                                className="absolute inset-0 rounded-full border border-primary/10 scale-125"
                                style={{ animation: "pulse 4s ease-in-out infinite" }}
                                aria-hidden="true"
                            />
                            <div
                                className="absolute inset-0 rounded-full border border-primary/5 scale-150"
                                style={{ animation: "pulse 4s ease-in-out infinite 1s" }}
                                aria-hidden="true"
                            />

                            {/* Main image container with Ken Burns zoom effect */}
                            <div className="relative z-10 w-full h-full rounded-[30%_70%_70%_30%/30%_30%_70%_70%] overflow-hidden shadow-2xl shadow-primary/20 border border-primary/20">
                                {slides.map((s, index) => (
                                    <div
                                        key={s.id}
                                        ref={(el) => { slideImagesRef.current[index] = el; }}
                                        className="absolute inset-0 will-change-transform"
                                        style={{
                                            opacity: currentSlide === index || previousSlide === index ? 1 : 0,
                                            zIndex: currentSlide === index ? 1 : 0,
                                            transition: `opacity ${KEN_BURNS_TRANSITION_DURATION}s ease-out`,
                                        }}
                                    >
                                        <Image
                                            src={s.image}
                                            alt={`${s.title} ${s.highlight}`}
                                            fill
                                            className="object-cover"
                                            priority={index === 0}
                                            sizes="(max-width: 768px) 100vw, 512px"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
                                    </div>
                                ))}
                            </div>

                            {/* Floating accent elements */}
                            <div
                                className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-accent-orange to-secondary-yellow opacity-80 blur-sm pointer-events-none"
                                style={{
                                    transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`,
                                    animation: "bounce 3s ease-in-out infinite",
                                }}
                                aria-hidden="true"
                            />
                            <div
                                className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary opacity-80 blur-sm pointer-events-none"
                                style={{
                                    transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                                    animation: "bounce 3s ease-in-out infinite 1.5s",
                                }}
                                aria-hidden="true"
                            />
                        </div>

                        {/* Animations defined in globals.css */}
                    </div>
                </div>

                {/* Stats Section - GSAP animated */}
                <div
                    ref={statsRef}
                    id="hero-stats"
                    className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 pt-8 sm:pt-12 border-t border-primary/20 opacity-0"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
                        {stats.map((stat, index) => (
                            <AnimatedCounter
                                key={stat.labelKey}
                                value={stat.value}
                                suffix={stat.suffix}
                                labelKey={stat.labelKey}
                                delay={index * 150}
                                isVisible={statsVisible}
                                t={t}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Navigation Arrows - Visible on all screen sizes with responsive sizing */}
            <button
                onClick={() => {
                    setIsAutoPlaying(false);
                    prevSlide();
                }}
                className="flex absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full bg-white/10 md:bg-white/5 hover:bg-white/20 md:hover:bg-white/10 backdrop-blur-sm border border-white/20 md:border-white/10 items-center justify-center transition-all duration-300 hover:scale-110 hover:border-white/30 md:hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2 focus:ring-offset-primary group active:scale-95"
                aria-label="Previous slide"
                aria-controls={carouselContentId}
            >
                <ChevronLeft
                    className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white md:text-primary group-hover:text-white md:group-hover:text-primary transition-colors"
                    aria-hidden="true"
                />
            </button>
            <button
                onClick={() => {
                    setIsAutoPlaying(false);
                    nextSlide();
                }}
                className="flex absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full bg-white/10 md:bg-white/5 hover:bg-white/20 md:hover:bg-white/10 backdrop-blur-sm border border-white/20 md:border-white/10 items-center justify-center transition-all duration-300 hover:scale-110 hover:border-white/30 md:hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2 focus:ring-offset-primary group active:scale-95"
                aria-label="Next slide"
                aria-controls={carouselContentId}
            >
                <ChevronRight
                    className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white md:text-primary group-hover:text-white md:group-hover:text-primary transition-colors"
                    aria-hidden="true"
                />
            </button>

            {/* Slide Indicators - Vertical pills on desktop, horizontal on mobile */}
            <div
                className="absolute z-20
                    bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4
                    md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:left-auto md:right-8 lg:right-12 md:flex-col md:gap-3"
                role="tablist"
                aria-label="Slide navigation"
            >
                {slides.map((slideItem, index) => (
                    <button
                        key={slideItem.id}
                        onClick={() => goToSlide(index)}
                        role="tab"
                        aria-selected={currentSlide === index}
                        aria-controls={carouselContentId}
                        aria-label={`Go to slide ${index + 1}: ${slideItem.title} ${slideItem.highlight}`}
                        tabIndex={currentSlide === index ? 0 : -1}
                        className={`relative rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[#FFE63B] focus:ring-offset-2 focus:ring-offset-primary
                            h-2 ${currentSlide === index ? "w-12 sm:w-16 bg-[#FFE63B]" : "w-2 bg-white/30 hover:bg-white/50"}
                            md:w-2 ${currentSlide === index ? "md:h-10" : "md:h-5"} ${currentSlide === index ? "md:bg-[#FFE63B]" : "md:bg-white/30 md:hover:bg-white/50"}`}
                    >
                        {currentSlide === index && (
                            <span
                                className="absolute inset-0 rounded-full bg-primary/30 md:hidden"
                                style={{
                                    animation: "progress 6s linear forwards",
                                }}
                            />
                        )}
                        {/* Vertical progress indicator for desktop */}
                        {currentSlide === index && (
                            <span
                                className="hidden md:block absolute inset-x-0 bottom-0 rounded-full bg-primary/30"
                                style={{
                                    animation: "progressVertical 6s linear forwards",
                                }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Pause/Play Button */}
            <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}

                className="absolute bottom-24 sm:bottom-28 right-4 sm:right-8 z-20 p-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-110 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2 focus:ring-offset-primary group"
                aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                aria-pressed={!isAutoPlaying}
            >
                {isAutoPlaying ? (
                    <Pause className="h-4 w-4 text-primary group-hover:text-primary transition-colors" aria-hidden="true" />
                ) : (
                    <Play className="h-4 w-4 text-primary group-hover:text-primary transition-colors" aria-hidden="true" />
                )}
                <SrOnly>{isAutoPlaying ? "Pause slideshow" : "Play slideshow"}</SrOnly>
            </button>

            {/* Scroll Indicator - GSAP animated */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-0"
                aria-hidden="true"
            >
                <span className="text-xs text-white/40 uppercase tracking-widest font-medium">{t("scroll")}</span>
                <div className="relative w-6 h-10 rounded-full border-2 border-white/20 flex justify-center">
                    <div
                        className="w-1 h-2 bg-primary/60 rounded-full mt-2"
                        style={{
                            animation: entranceComplete ? "scrollIndicator 2s ease-in-out infinite" : "none",
                        }}
                    />
                </div>
                <ChevronDown
                    className="w-5 h-5 text-primary/60"
                    style={{
                        animation: entranceComplete ? "bounceDown 2s ease-in-out infinite" : "none",
                    }}
                />
            </div>


        </section>
    );
}
