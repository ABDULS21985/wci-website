"use client";

import * as React from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/components/ui/shared/lib/utils";

export interface BackToTopProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Scroll threshold multiplier of viewport height before showing (default: 2) */
  viewportMultiplier?: number;
  /** Scroll behavior */
  behavior?: ScrollBehavior;
  /** Custom icon */
  icon?: React.ReactNode;
}

/**
 * Back to Top Button
 *
 * A fixed button that appears after scrolling 2x viewport height.
 * Features a spring entrance animation (respects prefers-reduced-motion),
 * RTL-aware positioning (bottom-right for LTR, bottom-left for RTL),
 * and branded hover states.
 *
 * @example
 * <BackToTop />
 * <BackToTop viewportMultiplier={1.5} />
 */
export function BackToTop({
  viewportMultiplier = 2,
  behavior = "smooth",
  icon,
  className,
  ...props
}: BackToTopProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isRtl, setIsRtl] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  // Detect RTL and reduced motion preference
  React.useEffect(() => {
    // Check document direction for RTL
    const checkRtl = () => {
      const dir = document.documentElement.getAttribute("dir");
      setIsRtl(dir === "rtl");
    };

    // Check reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    motionQuery.addEventListener("change", handleMotionChange);
    checkRtl();

    // Observe dir attribute changes
    const observer = new MutationObserver(checkRtl);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      observer.disconnect();
    };
  }, []);

  // Handle scroll visibility - show after 2x viewport height
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = window.innerHeight * viewportMultiplier;
      setIsVisible(scrollY > threshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [viewportMultiplier]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : behavior,
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        // Position: bottom-right for LTR, bottom-left for RTL
        "fixed bottom-6 z-50",
        isRtl ? "left-6" : "right-6",
        // Size: 48px circle
        "h-12 w-12 rounded-full",
        // Default state: #1E4DB7 background, white icon
        "bg-[#1E4DB7] text-white",
        // Shadow
        "shadow-lg",
        // Flex center for icon
        "flex items-center justify-center",
        // Hover state: #FFE63B background, dark icon
        "hover:bg-[#FFE63B] hover:text-neutral-900",
        "hover:shadow-xl",
        // Focus state
        "focus:outline-none focus:ring-2 focus:ring-[#1E4DB7] focus:ring-offset-2",
        // Active state
        "active:scale-95",
        // Transition for hover effects
        "transition-colors duration-200",
        // Visibility and animation
        isVisible
          ? prefersReducedMotion
            ? "opacity-100 pointer-events-auto"
            : "opacity-100 pointer-events-auto animate-spring-in"
          : prefersReducedMotion
            ? "opacity-0 pointer-events-none"
            : "opacity-0 pointer-events-none scale-0",
        className
      )}
      style={
        !prefersReducedMotion
          ? {
              // Spring animation for entrance
              transition: isVisible
                ? "opacity 0.2s ease-out, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease"
                : "opacity 0.2s ease-out, transform 0.3s ease-in, background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
              transform: isVisible ? "scale(1)" : "scale(0)",
            }
          : undefined
      }
      {...props}
    >
      {icon || <ChevronUp className="h-6 w-6" aria-hidden="true" />}
    </button>
  );
}

export default BackToTop;
