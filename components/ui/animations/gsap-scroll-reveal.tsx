"use client";

import { useEffect, useRef, ReactNode, ElementType, Ref } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ============================================
// TYPES
// ============================================

interface GSAPFadeUpProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
    as?: ElementType;
}

interface GSAPStaggerContainerProps {
    children: ReactNode;
    className?: string;
    stagger?: number;
    duration?: number;
    y?: number;
}

interface GSAPRevealProps {
    children: ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
}

interface GSAPCounterProps {
    end: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

// ============================================
// GSAP FADE UP COMPONENT
// ============================================

export function GSAPFadeUp({
    children,
    className = "",
    delay = 0,
    duration = 0.8,
    y = 40,
    as: Component = "div",
}: GSAPFadeUpProps) {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            gsap.set(element, { opacity: 1, y: 0 });
            return;
        }

        // Set initial state
        gsap.set(element, { opacity: 0, y });

        // Create animation
        const animation = gsap.to(element, {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: "power2.out",
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
    }, [delay, duration, y]);

    return <Component ref={elementRef as Ref<HTMLElement>} className={className}>{children}</Component>;
}

// ============================================
// GSAP STAGGER CONTAINER
// ============================================

export function GSAPStaggerContainer({
    children,
    className = "",
    stagger = 0.1,
    duration = 0.6,
    y = 30,
}: GSAPStaggerContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            gsap.set(container.children, { opacity: 1, y: 0 });
            return;
        }

        const children = container.children;
        if (children.length === 0) return;

        // Set initial state
        gsap.set(children, { opacity: 0, y });

        // Create staggered animation
        const animation = gsap.to(children, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease: "power2.out",
            scrollTrigger: {
                trigger: container,
                start: "top 85%",
                once: true,
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
    }, [stagger, duration, y]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}

// ============================================
// GSAP REVEAL (CLIP PATH)
// ============================================

export function GSAPReveal({
    children,
    className = "",
    direction = "up",
    duration = 1,
}: GSAPRevealProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            gsap.set(element, { clipPath: "inset(0 0 0 0)" });
            return;
        }

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
            duration,
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
    }, [direction, duration]);

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
}

// ============================================
// GSAP COUNTER
// ============================================

export function GSAPCounter({
    end,
    suffix = "",
    prefix = "",
    duration = 2,
    className = "",
}: GSAPCounterProps) {
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            element.textContent = `${prefix}${end}${suffix}`;
            return;
        }

        const obj = { value: 0 };

        const animation = gsap.to(obj, {
            value: end,
            duration,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
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
    }, [end, suffix, prefix, duration]);

    return (
        <span ref={elementRef} className={className}>
            {prefix}0{suffix}
        </span>
    );
}

// ============================================
// GSAP PARALLAX IMAGE
// ============================================

interface GSAPParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    speed?: number;
    children?: ReactNode;
}

export function GSAPParallaxImage({
    src,
    alt,
    className = "",
    speed = 0.3,
    children,
}: GSAPParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const image = imageRef.current;
        if (!container || !image) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const yDistance = 100 * speed;

        gsap.set(image, { y: -yDistance / 2 });

        const animation = gsap.to(image, {
            y: yDistance / 2,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
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
    }, [speed]);

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            <div
                ref={imageRef}
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                role="img"
                aria-label={alt}
            />
            {children}
        </div>
    );
}

// ============================================
// GSAP SPLIT TEXT (LINE BY LINE REVEAL)
// ============================================

interface GSAPSplitTextProps {
    children: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    delay?: number;
    stagger?: number;
}

export function GSAPSplitText({
    children,
    className = "",
    as: Component = "p",
    delay = 0,
    stagger = 0.15,
}: GSAPSplitTextProps) {
    const containerRef = useRef<HTMLElement>(null);

    // Split text into lines (preserving words)
    const lines = children.split("\n").filter(Boolean);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            gsap.set(container.children, { clipPath: "inset(0 0 0 0)" });
            return;
        }

        const lineElements = container.children;

        // Set initial state
        gsap.set(lineElements, { clipPath: "inset(0 0 100% 0)" });

        // Create staggered animation
        const animation = gsap.to(lineElements, {
            clipPath: "inset(0 0 0 0)",
            duration: 0.6,
            delay,
            stagger,
            ease: "power2.out",
            scrollTrigger: {
                trigger: container,
                start: "top 85%",
                once: true,
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
    }, [delay, stagger]);

    return (
        <Component ref={containerRef as unknown as Ref<never>} className={className}>
            {lines.map((line, index) => (
                <span key={index} className="block overflow-hidden">
                    <span className="block">{line}</span>
                </span>
            ))}
        </Component>
    );
}
