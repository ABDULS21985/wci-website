"use client";

import { useEffect, useRef, useState, type ReactNode, type JSX } from "react";
import { cn } from "@/components/ui/shared/lib/utils";

type AnimationType = "fade-up" | "fade-in" | "scale" | "slide-right" | "slide-left";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  /** Delay in milliseconds before animation starts */
  delay?: number;
  /** Threshold for intersection observer (0-1) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Whether to animate only once or every time element enters viewport */
  once?: boolean;
  /** Custom duration in milliseconds */
  duration?: number;
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

const animationClasses: Record<AnimationType, { initial: string; visible: string }> = {
  "fade-up": {
    initial: "opacity-0 translate-y-5",
    visible: "opacity-100 translate-y-0",
  },
  "fade-in": {
    initial: "opacity-0",
    visible: "opacity-100",
  },
  scale: {
    initial: "opacity-0 scale-95",
    visible: "opacity-100 scale-100",
  },
  "slide-right": {
    initial: "opacity-0 translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  "slide-left": {
    initial: "opacity-0 -translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
};

export function AnimatedSection({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  once = true,
  duration = 500,
  as: Component = "div",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Use lazy initialization to check prefersReducedMotion
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Already visible if reduced motion is preferred (set via lazy init)
    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay before setting visible
          setTimeout(() => {
            setIsVisible(true);
          }, delay);

          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, threshold, rootMargin, once]);

  const { initial, visible } = animationClasses[animation];
  const DynamicComponent = Component as React.ElementType;

  return (
    <DynamicComponent
      ref={ref}
      className={cn(
        "transition-all",
        isVisible ? visible : initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </DynamicComponent>
  );
}

export default AnimatedSection;
