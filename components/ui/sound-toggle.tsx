"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/components/ui/shared/lib/utils";
import { useSound, useSoundOptional } from "../../providers/sound-provider";

// ============================================================================
// Types
// ============================================================================

interface SoundToggleProps {
  /** Additional CSS classes */
  className?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Show tooltip on hover */
  showTooltip?: boolean;
  /** Custom tooltip text when sound is off */
  tooltipOffText?: string;
  /** Custom tooltip text when sound is on */
  tooltipOnText?: string;
  /** Variant style */
  variant?: "default" | "ghost" | "outline";
}

// ============================================================================
// Size configurations
// ============================================================================

const sizes = {
  sm: {
    button: "h-8 w-8",
    icon: "h-4 w-4",
  },
  md: {
    button: "h-10 w-10",
    icon: "h-5 w-5",
  },
  lg: {
    button: "h-12 w-12",
    icon: "h-6 w-6",
  },
};

const variants = {
  default:
    "bg-white/10 border border-white/20 text-neutral-400 hover:bg-white/20 hover:text-white",
  ghost: "bg-transparent text-neutral-400 hover:bg-neutral-800 hover:text-white",
  outline:
    "bg-transparent border border-neutral-700 text-neutral-400 hover:border-primary hover:text-primary",
};

// ============================================================================
// Animation variants
// ============================================================================

const iconVariants: Variants = {
  initial: { scale: 0.5, opacity: 0, rotate: -90 },
  animate: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25,
    },
  },
  exit: {
    scale: 0.5,
    opacity: 0,
    rotate: 90,
    transition: {
      duration: 0.15,
    },
  },
};

const pulseVariants: Variants = {
  initial: { scale: 0, opacity: 0.5 },
  animate: {
    scale: 2,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const tooltipVariants: Variants = {
  initial: { opacity: 0, y: 8, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 4,
    scale: 0.98,
    transition: {
      duration: 0.15,
    },
  },
};

// ============================================================================
// Component
// ============================================================================

/**
 * SoundToggle - Toggle button for enabling/disabling UI sounds
 *
 * Features:
 * - Animated icon transition between on/off states
 * - Pulse effect on toggle
 * - Tooltip explaining the feature
 * - Multiple size variants
 * - Accessible with proper ARIA labels
 *
 * @example
 * ```tsx
 * // In footer or settings
 * <SoundToggle size="sm" showTooltip />
 *
 * // Custom styling
 * <SoundToggle variant="outline" className="my-custom-class" />
 * ```
 */
export function SoundToggle({
  className,
  size = "md",
  showTooltip = true,
  tooltipOffText = "Enable UI sounds",
  tooltipOnText = "Disable UI sounds",
  variant = "default",
}: SoundToggleProps) {
  const { isSoundEnabled, toggleSound } = useSound();
  const [showPulse, setShowPulse] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sizeConfig = sizes[size];

  const handleToggle = useCallback(() => {
    // Show pulse effect
    setShowPulse(true);
    setTimeout(() => setShowPulse(false), 600);

    toggleSound();
  }, [toggleSound]);

  return (
    <div className="relative inline-block">
      <motion.button
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative rounded-full flex items-center justify-center",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#062C2E]",
          sizeConfig.button,
          variants[variant],
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isSoundEnabled ? tooltipOnText : tooltipOffText}
        aria-pressed={isSoundEnabled}
        type="button"
      >
        {/* Pulse effect on toggle */}
        <AnimatePresence>
          {showPulse && (
            <motion.span
              className={cn(
                "absolute inset-0 rounded-full",
                isSoundEnabled ? "bg-primary" : "bg-neutral-500"
              )}
              variants={pulseVariants}
              initial="initial"
              animate="animate"
              exit="initial"
            />
          )}
        </AnimatePresence>

        {/* Icon with animation */}
        <AnimatePresence mode="wait" initial={false}>
          {isSoundEnabled ? (
            <motion.span
              key="on"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center justify-center"
            >
              <Volume2 className={cn(sizeConfig.icon, "text-primary")} />
            </motion.span>
          ) : (
            <motion.span
              key="off"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center justify-center"
            >
              <VolumeX className={sizeConfig.icon} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip */}
      {showTooltip && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              variants={tooltipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={cn(
                "absolute bottom-full left-1/2 -translate-x-1/2 mb-2",
                "px-3 py-1.5 rounded-md",
                "bg-neutral-900 border border-neutral-700",
                "text-xs text-white whitespace-nowrap",
                "pointer-events-none z-50"
              )}
              role="tooltip"
            >
              {isSoundEnabled ? tooltipOnText : tooltipOffText}
              {/* Arrow */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

// ============================================================================
// Optional variant that doesn't throw if outside provider
// ============================================================================

/**
 * SoundToggleOptional - Same as SoundToggle but renders nothing if outside SoundProvider
 *
 * Useful for components that may or may not have sound functionality
 */
export function SoundToggleOptional(props: SoundToggleProps) {
  const soundContext = useSoundOptional();

  // Don't render if no sound context available
  if (!soundContext) {
    return null;
  }

  return <SoundToggle {...props} />;
}
