"use client";

import { useEffect, useRef, useState, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ============================================
// TYPES
// ============================================

interface ScrollAnimationOptions {
    trigger?: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    once?: boolean;
    toggleActions?: string;
}

interface FadeInOptions extends ScrollAnimationOptions {
    y?: number;
    x?: number;
    duration?: number;
    delay?: number;
    ease?: string;
}

interface StaggerOptions extends ScrollAnimationOptions {
    y?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
}

interface ParallaxOptions {
    speed?: number;
    direction?: "up" | "down";
}

// ============================================
// REDUCED MOTION HOOK
// ============================================

export function usePrefersReducedMotion(): boolean {
    // Use lazy initialization to get initial value without triggering sync setState
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        const handler = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return prefersReducedMotion;
}

// ============================================
// FADE IN ON SCROLL
// ============================================

export function useScrollFadeIn<T extends HTMLElement>(
    options: FadeInOptions = {}
): RefObject<T | null> {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const {
            y = 40,
            x = 0,
            duration = 0.8,
            delay = 0,
            ease = "power2.out",
            start = "top 85%",
            once = true,
            toggleActions = "play none none none",
        } = options;

        // Set initial state
        gsap.set(element, {
            opacity: 0,
            y,
            x,
        });

        // Create animation
        const animation = gsap.to(element, {
            opacity: 1,
            y: 0,
            x: 0,
            duration,
            delay,
            ease,
            scrollTrigger: {
                trigger: element,
                start,
                toggleActions,
                once,
            },
        });

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [options]);

    return elementRef;
}

// ============================================
// STAGGER CHILDREN ON SCROLL
// ============================================

export function useScrollStagger<T extends HTMLElement>(
    options: StaggerOptions = {}
): RefObject<T | null> {
    const containerRef = useRef<T>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const {
            y = 30,
            stagger = 0.1,
            duration = 0.6,
            ease = "power2.out",
            start = "top 85%",
            once = true,
        } = options;

        const children = container.children;
        if (children.length === 0) return;

        // Set initial state for all children
        gsap.set(children, {
            opacity: 0,
            y,
        });

        // Create staggered animation
        const animation = gsap.to(children, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease,
            scrollTrigger: {
                trigger: container,
                start,
                once,
            },
        });

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, [options]);

    return containerRef;
}

// ============================================
// PARALLAX EFFECT
// ============================================

export function useParallax<T extends HTMLElement>(
    options: ParallaxOptions = {}
): RefObject<T | null> {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const { speed = 0.5, direction = "up" } = options;
        const yDistance = direction === "up" ? -100 * speed : 100 * speed;

        const animation = gsap.to(element, {
            y: yDistance,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [options]);

    return elementRef;
}

// ============================================
// REVEAL ON SCROLL (CLIP PATH)
// ============================================

export function useScrollReveal<T extends HTMLElement>(
    direction: "up" | "down" | "left" | "right" = "up"
): RefObject<T | null> {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const clipPaths: Record<string, { from: string; to: string }> = {
            up: { from: "inset(100% 0 0 0)", to: "inset(0 0 0 0)" },
            down: { from: "inset(0 0 100% 0)", to: "inset(0 0 0 0)" },
            left: { from: "inset(0 100% 0 0)", to: "inset(0 0 0 0)" },
            right: { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0)" },
        };

        const { from, to } = clipPaths[direction];

        gsap.set(element, { clipPath: from });

        const animation = gsap.to(element, {
            clipPath: to,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                once: true,
            },
        });

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [direction]);

    return elementRef;
}

// ============================================
// COUNTER ANIMATION ON SCROLL
// ============================================

export function useScrollCounter(
    endValue: number,
    options: {
        duration?: number;
        start?: string;
        suffix?: string;
        prefix?: string;
    } = {}
): RefObject<HTMLElement | null> {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            element.textContent = `${options.prefix || ""}${endValue}${options.suffix || ""}`;
            return;
        }

        const { duration = 2, start = "top 80%", suffix = "", prefix = "" } = options;

        const obj = { value: 0 };

        const animation = gsap.to(obj, {
            value: endValue,
            duration,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start,
                once: true,
            },
            onUpdate: () => {
                element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
            },
        });

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [endValue, options]);

    return elementRef;
}

// ============================================
// HORIZONTAL SCROLL SECTION
// ============================================

export function useHorizontalScroll<T extends HTMLElement>(): {
    containerRef: RefObject<T | null>;
    trackRef: RefObject<HTMLElement | null>;
} {
    const containerRef = useRef<T>(null);
    const trackRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const totalWidth = track.scrollWidth - container.offsetWidth;

        const animation = gsap.to(track, {
            x: -totalWidth,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: `+=${totalWidth}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            },
        });

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return { containerRef, trackRef };
}

// ============================================
// SCROLL PROGRESS
// ============================================

export function useScrollProgress(): RefObject<HTMLElement | null> {
    const progressRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = progressRef.current;
        if (!element) return;

        const animation = gsap.to(element, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3,
            },
        });

        return () => {
            animation.kill();
        };
    }, []);

    return progressRef;
}

// ============================================
// UTILITY: REFRESH SCROLL TRIGGERS
// ============================================

export function refreshScrollTriggers(): void {
    ScrollTrigger.refresh();
}

// ============================================
// UTILITY: KILL ALL SCROLL TRIGGERS
// ============================================

export function killAllScrollTriggers(): void {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
