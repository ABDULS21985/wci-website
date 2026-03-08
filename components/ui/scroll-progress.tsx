"use client";

import * as React from "react";
import { cn } from "@/components/ui/shared/lib/utils";

export interface ScrollProgressProps {
  /** Color of the progress bar */
  color?: string;
  /** Height of the progress bar in pixels */
  height?: number;
  /** Additional className for the container */
  className?: string;
  /** z-index value */
  zIndex?: number;
}

/**
 * Scroll Progress Indicator
 *
 * A thin progress bar fixed at the top of the viewport that fills
 * based on page scroll progress (0% at top, 100% at bottom).
 * Features a glowing right edge for visual polish.
 *
 * @example
 * <ScrollProgress />
 * <ScrollProgress color="#0D7377" height={3} />
 */
export function ScrollProgress({
  color = "#0D7377",
  height = 2,
  className,
  zIndex = 9999,
}: ScrollProgressProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (docHeight > 0) {
        const scrollPercent = (scrollTop / docHeight) * 100;
        setProgress(Math.min(100, Math.max(0, scrollPercent)));
      }
    };

    // Initial check
    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className={cn("fixed top-0 left-0 right-0 pointer-events-none", className)}
      style={{ zIndex }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className="h-full origin-left transition-transform duration-75 ease-out"
        style={{
          height: `${height}px`,
          backgroundColor: color,
          transform: `scaleX(${progress / 100})`,
          boxShadow:
            progress > 0
              ? `0 0 10px ${color}, 0 0 5px ${color}, 4px 0 8px ${color}`
              : "none",
        }}
      />
    </div>
  );
}

export default ScrollProgress;
