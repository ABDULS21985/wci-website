"use client";

import {
  useEffect,
  useRef,
  useState,
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
  type JSX,
} from "react";
import { cn } from "@/components/ui/shared/lib/utils";

type AnimationType = "fade-up" | "fade-in" | "scale" | "slide-right" | "slide-left";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  /** Base animation type for children */
  animation?: AnimationType;
  /** Delay between each child animation in milliseconds */
  staggerDelay?: number;
  /** Initial delay before the first item animates */
  initialDelay?: number;
  /** Threshold for intersection observer (0-1) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Whether to animate only once */
  once?: boolean;
  /** Animation duration for each child */
  duration?: number;
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  /** Custom animation override for this item */
  animation?: AnimationType;
  /** Index position (set automatically by StaggerContainer) */
  index?: number;
  /** Stagger delay (set automatically by StaggerContainer) */
  staggerDelay?: number;
  /** Initial delay (set automatically by StaggerContainer) */
  initialDelay?: number;
  /** Whether parent container is visible */
  isContainerVisible?: boolean;
  /** Animation duration */
  duration?: number;
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

export function StaggerItem({
  children,
  className,
  animation = "fade-up",
  index = 0,
  staggerDelay = 100,
  initialDelay = 0,
  isContainerVisible = false,
  duration = 500,
}: StaggerItemProps) {
  // Track whether the stagger delay has completed
  const [hasDelayCompleted, setHasDelayCompleted] = useState(false);
  // Track the previous container visibility to detect changes
  const prevContainerVisible = useRef(isContainerVisible);

  // Separate effect to handle visibility reset (uses callback form to avoid sync setState)
  useEffect(() => {
    prevContainerVisible.current = isContainerVisible;
  }, [isContainerVisible]);

  // Effect to handle the delay timer when container becomes visible
  useEffect(() => {
    // Reset when container is not visible
    if (!isContainerVisible) {
      // Use timeout to avoid sync setState in effect
      const resetTimer = setTimeout(() => {
        setHasDelayCompleted(false);
      }, 0);
      return () => clearTimeout(resetTimer);
    }

    const totalDelay = initialDelay + index * staggerDelay;
    const timer = setTimeout(() => {
      setHasDelayCompleted(true);
    }, totalDelay);

    return () => clearTimeout(timer);
  }, [isContainerVisible, index, staggerDelay, initialDelay]);

  // Item is visible only when container is visible AND delay has completed
  const isVisible = isContainerVisible && hasDelayCompleted;

  const { initial, visible } = animationClasses[animation];

  return (
    <div
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
    </div>
  );
}

export function StaggerContainer({
  children,
  className,
  animation = "fade-up",
  staggerDelay = 100,
  initialDelay = 0,
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  once = true,
  duration = 500,
  as: Component = "div",
}: StaggerContainerProps) {
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
          setIsVisible(true);
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
  }, [threshold, rootMargin, once]);

  const DynamicComponent = Component as React.ElementType;

  // Clone children and inject animation props
  const enhancedChildren = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      // If child is a StaggerItem, pass props directly
      if (child.type === StaggerItem) {
        const staggerChild = child as ReactElement<StaggerItemProps>;
        return cloneElement(staggerChild, {
          index,
          staggerDelay,
          initialDelay,
          isContainerVisible: isVisible,
          animation: staggerChild.props.animation || animation,
          duration: staggerChild.props.duration || duration,
        });
      }

      // Otherwise, wrap in StaggerItem
      return (
        <StaggerItem
          key={index}
          index={index}
          staggerDelay={staggerDelay}
          initialDelay={initialDelay}
          isContainerVisible={isVisible}
          animation={animation}
          duration={duration}
        >
          {child}
        </StaggerItem>
      );
    }
    return child;
  });

  return (
    <DynamicComponent ref={ref} className={className}>
      {enhancedChildren}
    </DynamicComponent>
  );
}

export default StaggerContainer;
