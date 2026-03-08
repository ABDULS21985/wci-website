"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState, useCallback, createContext, useContext, useRef } from "react";

// Custom easing as specified in mega-prompt
const TRANSITION_EASE = [0.16, 1, 0.3, 1] as const;
const EXIT_DURATION = 0.2; // 200ms for exit animations
const ENTER_DURATION = 0.35; // 350ms for enter animations

// Loading indicator color
const LOADING_BAR_COLOR = "#1E4DB7";

// ============================================
// Page Transition Variants
// ============================================

// Default page transition variants with blur effect
// Using transition property inside variants for different enter/exit durations
const defaultPageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: ENTER_DURATION,
      ease: TRANSITION_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
    transition: {
      duration: EXIT_DURATION,
      ease: TRANSITION_EASE,
    },
  },
};

// Reduced motion variants (simple fade only)
const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.15 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

// Legacy variants for backward compatibility
const legacyVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  },
  // New default variant with blur
  blur: defaultPageVariants,
};

// ============================================
// Loading Progress Bar Context
// ============================================

interface LoadingContextValue {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextValue>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

// ============================================
// NProgress-style Loading Bar Component
// ============================================

interface LoadingBarProps {
  isLoading: boolean;
}

function LoadingBar({ isLoading }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const prevIsLoading = useRef(isLoading);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    // Only trigger on state change
    if (isLoading && !prevIsLoading.current) {
      // Started loading
      setVisible(true);
      setProgress(0);

      // Simulate progress that slows down as it approaches 90%
      intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          // Slow down as we approach 90%
          const increment = Math.max(0.5, (90 - prev) * 0.1);
          return Math.min(90, prev + increment);
        });
      }, 100);
    } else if (!isLoading && prevIsLoading.current) {
      // Finished loading
      setProgress(100);
      // Hide after completion animation
      timeoutId = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    }

    prevIsLoading.current = isLoading;

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page loading progress"
    >
      <motion.div
        className="h-full relative"
        style={{
          background: LOADING_BAR_COLOR,
        }}
        initial={{ width: "0%", opacity: 1 }}
        animate={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
        transition={{
          width: {
            duration: prefersReducedMotion ? 0 : 0.2,
            ease: "easeOut",
          },
          opacity: {
            duration: prefersReducedMotion ? 0 : 0.3,
            delay: progress === 100 ? 0.1 : 0,
          },
        }}
      >
        {/* Glowing right edge */}
        <div
          className="absolute right-0 top-0 h-full w-24"
          style={{
            background: `linear-gradient(to right, transparent, ${LOADING_BAR_COLOR})`,
            boxShadow: `0 0 10px ${LOADING_BAR_COLOR}, 0 0 20px ${LOADING_BAR_COLOR}`,
            opacity: prefersReducedMotion ? 0 : 1,
          }}
        />
        {/* Additional glow effect at tip */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            background: LOADING_BAR_COLOR,
            boxShadow: `0 0 8px 4px ${LOADING_BAR_COLOR}`,
            opacity: prefersReducedMotion ? 0 : 0.8,
          }}
        />
      </motion.div>
    </div>
  );
}

// ============================================
// Page Transition Wrapper Component
// ============================================

interface PageTransitionWrapperProps {
  children: ReactNode;
}

export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(false);
  const prevPathname = useRef(pathname);

  // Detect route changes
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      setIsLoading(true);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  const handleAnimationComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Select variants based on reduced motion preference
  const variants = prefersReducedMotion ? reducedMotionVariants : defaultPageVariants;

  const contextValue: LoadingContextValue = {
    isLoading,
    startLoading: () => setIsLoading(true),
    stopLoading: () => setIsLoading(false),
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      <LoadingBar isLoading={isLoading} />
      <AnimatePresence mode="wait" onExitComplete={handleAnimationComplete}>
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          onAnimationStart={(definition) => {
            if (definition === "exit") {
              // Start loading when exit animation begins
              setIsLoading(true);
            }
          }}
          style={{ willChange: prefersReducedMotion ? "auto" : "opacity, transform, filter" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </LoadingContext.Provider>
  );
}

// ============================================
// Legacy PageTransition Component (backward compatible)
// ============================================

interface PageTransitionProps {
  children: ReactNode;
  /** Animation variant */
  variant?: "fade" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scale" | "blur";
  /** Animation duration in seconds */
  duration?: number;
  /** Disable animation (useful for reduced motion) */
  disabled?: boolean;
}

export function PageTransition({
  children,
  variant = "blur",
  duration,
  disabled = false,
}: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  // Skip animation if disabled or user prefers reduced motion
  if (disabled) {
    return <>{children}</>;
  }

  // Use reduced motion variants if user prefers
  const selectedVariant = prefersReducedMotion
    ? reducedMotionVariants
    : legacyVariants[variant];

  // Determine duration based on variant type
  const enterDuration = duration ?? ENTER_DURATION;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={selectedVariant.initial}
        animate={selectedVariant.animate}
        exit={selectedVariant.exit}
        transition={{
          duration: prefersReducedMotion ? 0 : enterDuration,
          ease: TRANSITION_EASE,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================
// Exports
// ============================================

export { LoadingBar };
export default PageTransition;
