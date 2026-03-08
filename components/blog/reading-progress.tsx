"use client";

import { motion, useScroll, useSpring } from "framer-motion";

interface ReadingProgressProps {
  /**
   * Color of the progress bar - defaults to primary gradient
   */
  color?: string;
  /**
   * Height of the progress bar in pixels
   */
  height?: number;
  /**
   * Show percentage indicator
   */
  showPercentage?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function ReadingProgress({
  color,
  height = 4,
  showPercentage = false,
  className = "",
}: ReadingProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className={`fixed top-0 left-0 right-0 origin-left z-50 ${className}`}
        style={{
          scaleX,
          height: `${height}px`,
          background: color || "linear-gradient(90deg, #1E4DB7 0%, #F59A23 100%)",
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 blur-sm opacity-50"
          style={{
            background: color || "linear-gradient(90deg, #1E4DB7 0%, #F59A23 100%)",
          }}
        />
      </motion.div>

      {/* Optional percentage indicator */}
      {showPercentage && (
        <motion.div
          className="fixed top-4 right-4 z-50 px-3 py-1.5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md rounded-full shadow-lg border border-neutral-200 dark:border-neutral-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            {/* Using motion value to display percentage */}
            <ProgressPercentage progress={scrollYProgress} />
          </motion.span>
        </motion.div>
      )}
    </>
  );
}

// Separate component for percentage display
function ProgressPercentage({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return progress.on("change", (value) => {
      setPercentage(Math.round(value * 100));
    });
  }, [progress]);

  return <>{percentage}%</>;
}

// We need to import useState and useEffect for the percentage component
import { useState, useEffect } from "react";

// Alternative minimal version for simpler use cases
export function ReadingProgressMinimal() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E4DB7] to-[#F59A23] origin-left z-50"
      style={{ scaleX }}
    />
  );
}
