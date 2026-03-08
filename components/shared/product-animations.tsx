'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/* Scroll-triggered animation wrapper                                  */
/* ------------------------------------------------------------------ */

type AnimateOnScrollProps = {
    children: ReactNode;
    className?: string;
    animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale' | 'fade-up-rotate';
    delay?: number;
    duration?: number;
    threshold?: number;
    once?: boolean;
};

const animationStyles: Record<string, { from: string; to: string }> = {
    'fade-up': {
        from: 'opacity-0 translate-y-8',
        to: 'opacity-100 translate-y-0',
    },
    'fade-in': {
        from: 'opacity-0',
        to: 'opacity-100',
    },
    'slide-left': {
        from: 'opacity-0 -translate-x-10',
        to: 'opacity-100 translate-x-0',
    },
    'slide-right': {
        from: 'opacity-0 translate-x-10',
        to: 'opacity-100 translate-x-0',
    },
    'scale': {
        from: 'opacity-0 scale-95',
        to: 'opacity-100 scale-100',
    },
    'fade-up-rotate': {
        from: 'opacity-0 translate-y-8 rotate-1',
        to: 'opacity-100 translate-y-0 rotate-0',
    },
};

export function AnimateOnScroll({
    children,
    className = '',
    animation = 'fade-up',
    delay = 0,
    duration = 700,
    threshold = 0.15,
    once = true,
}: AnimateOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.style.opacity = '1';
            el.style.transform = 'none';
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setTimeout(() => {
                        el.classList.remove(...animationStyles[animation]!.from.split(' '));
                        el.classList.add(...animationStyles[animation]!.to.split(' '));
                    }, delay);
                    if (once) observer.unobserve(el);
                } else if (!once) {
                    el.classList.remove(...animationStyles[animation]!.to.split(' '));
                    el.classList.add(...animationStyles[animation]!.from.split(' '));
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [animation, delay, threshold, once]);

    const style = animationStyles[animation]!;

    return (
        <div
            ref={ref}
            className={`${style.from} transition-all ${className}`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
        >
            {children}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Staggered children animation                                        */
/* ------------------------------------------------------------------ */

type StaggerProps = {
    children: ReactNode[];
    className?: string;
    childClassName?: string;
    animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';
    staggerDelay?: number;
    duration?: number;
    threshold?: number;
};

export function StaggerChildren({
    children,
    className = '',
    childClassName = '',
    animation = 'fade-up',
    staggerDelay = 100,
    duration = 600,
    threshold = 0.1,
}: StaggerProps) {
    return (
        <div className={className}>
            {children.map((child, idx) => (
                <AnimateOnScroll
                    key={idx}
                    animation={animation}
                    delay={idx * staggerDelay}
                    duration={duration}
                    threshold={threshold}
                    className={childClassName}
                >
                    {child}
                </AnimateOnScroll>
            ))}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Animated counter                                                    */
/* ------------------------------------------------------------------ */

type CountUpProps = {
    end: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
};

export function CountUp({ end, suffix = '', prefix = '', duration = 2000, className = '' }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.textContent = `${prefix}${end}${suffix}`;
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const start = 0;
                    const startTime = performance.now();

                    const animate = (currentTime: number) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // ease-out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.round(start + (end - start) * eased);
                        if (el) el.textContent = `${prefix}${current}${suffix}`;
                        if (progress < 1) requestAnimationFrame(animate);
                    };

                    requestAnimationFrame(animate);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [end, suffix, prefix, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}0{suffix}
        </span>
    );
}

/* ------------------------------------------------------------------ */
/* Floating decorative orbs using brand colors                         */
/* ------------------------------------------------------------------ */

type FloatingOrbsProps = {
    variant?: 'hero' | 'section';
};

export function FloatingOrbs({ variant = 'section' }: FloatingOrbsProps) {
    if (variant === 'hero') {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                {/* Primary blue orb */}
                <div
                    className="absolute w-[500px] h-[500px] rounded-full animate-float1 opacity-[0.07]"
                    style={{
                        background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                        top: '-10%',
                        right: '-5%',
                    }}
                />
                {/* Yellow accent orb */}
                <div
                    className="absolute w-[350px] h-[350px] rounded-full animate-float2 opacity-[0.08]"
                    style={{
                        background: 'radial-gradient(circle, var(--secondary-yellow) 0%, transparent 70%)',
                        bottom: '10%',
                        left: '-5%',
                    }}
                />
                {/* Orange accent orb */}
                <div
                    className="absolute w-[250px] h-[250px] rounded-full animate-float3 opacity-[0.06]"
                    style={{
                        background: 'radial-gradient(circle, var(--accent-orange) 0%, transparent 70%)',
                        top: '40%',
                        left: '30%',
                    }}
                />
                {/* Indigo BoaCRM orb */}
                <div
                    className="absolute w-[400px] h-[400px] rounded-full animate-float-slow opacity-[0.05]"
                    style={{
                        background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)',
                        top: '20%',
                        right: '20%',
                    }}
                />
            </div>
        );
    }

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div
                className="absolute w-[300px] h-[300px] rounded-full animate-float-slow opacity-[0.04]"
                style={{
                    background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                    top: '-5%',
                    right: '10%',
                }}
            />
            <div
                className="absolute w-[200px] h-[200px] rounded-full animate-float2 opacity-[0.05]"
                style={{
                    background: 'radial-gradient(circle, var(--accent-orange) 0%, transparent 70%)',
                    bottom: '5%',
                    left: '5%',
                }}
            />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Animated gradient line divider                                      */
/* ------------------------------------------------------------------ */

export function GradientDivider({ className = '' }: { className?: string }) {
    return (
        <div className={`relative h-px w-full max-w-4xl mx-auto overflow-hidden ${className}`}>
            <div
                className="absolute inset-0 animate-gradient-shift"
                style={{
                    background: 'linear-gradient(90deg, transparent, var(--primary), var(--secondary-yellow), var(--accent-orange), transparent)',
                    backgroundSize: '200% 100%',
                }}
            />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Pulsing dot indicator                                               */
/* ------------------------------------------------------------------ */

export function PulsingDot({ color = 'var(--primary)', size = 8 }: { color?: string; size?: number }) {
    return (
        <span className="relative inline-flex">
            <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-40"
                style={{ backgroundColor: color, width: size, height: size }}
            />
            <span
                className="relative inline-flex rounded-full"
                style={{ backgroundColor: color, width: size, height: size }}
            />
        </span>
    );
}
