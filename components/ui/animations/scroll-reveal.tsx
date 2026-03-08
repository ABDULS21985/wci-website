"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import React, { ReactNode, useMemo } from "react";
import { cn } from "@/components/ui/shared/lib/utils";

// Custom easing for premium feel
const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

type AnimationVariant = "fadeUp" | "fadeIn" | "scaleIn" | "slideLeft" | "slideRight";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Animation variant */
  variant?: AnimationVariant;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Animation duration (in seconds) */
  duration?: number;
  /** Intersection threshold (0-1) */
  threshold?: number;
  /** Only animate once */
  once?: boolean;
  /** Custom viewport margin */
  margin?: string;
  /** HTML element to render as */
  as?: keyof React.JSX.IntrinsicElements;
}

const animationVariants: Record<AnimationVariant, Variants> = {
  fadeUp: {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
  fadeIn: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },
  scaleIn: {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  },
  slideLeft: {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  },
  slideRight: {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  },
};

export function ScrollReveal({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
  margin = "0px 0px -50px 0px",
  as = "div",
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const MotionComponent = useMemo(() => {
    return motion[as as keyof typeof motion] as typeof motion.div;
  }, [as]);

  // If user prefers reduced motion, render without animation
  if (shouldReduceMotion) {
    const Component = as;
    return <Component className={className}>{children}</Component>;
  }

  const selectedVariant = animationVariants[variant];

  return (
    <MotionComponent
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount: threshold,
        margin,
      }}
      variants={selectedVariant}
      transition={{
        duration,
        delay,
        ease: PREMIUM_EASE,
      }}
    >
      {children}
    </MotionComponent>
  );
}

// Preset components for common use cases
export function FadeUp({
  children,
  ...props
}: Omit<ScrollRevealProps, "variant">) {
  return (
    <ScrollReveal variant="fadeUp" {...props}>
      {children}
    </ScrollReveal>
  );
}

export function FadeIn({
  children,
  ...props
}: Omit<ScrollRevealProps, "variant">) {
  return (
    <ScrollReveal variant="fadeIn" {...props}>
      {children}
    </ScrollReveal>
  );
}

export function ScaleIn({
  children,
  ...props
}: Omit<ScrollRevealProps, "variant">) {
  return (
    <ScrollReveal variant="scaleIn" {...props}>
      {children}
    </ScrollReveal>
  );
}

export function SlideLeft({
  children,
  ...props
}: Omit<ScrollRevealProps, "variant">) {
  return (
    <ScrollReveal variant="slideLeft" {...props}>
      {children}
    </ScrollReveal>
  );
}

export function SlideRight({
  children,
  ...props
}: Omit<ScrollRevealProps, "variant">) {
  return (
    <ScrollReveal variant="slideRight" {...props}>
      {children}
    </ScrollReveal>
  );
}

export default ScrollReveal;
