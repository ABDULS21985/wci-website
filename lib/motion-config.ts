/**
 * Centralized Motion Configuration
 * Single source of truth for all animation constants across the app
 */

// ============================================================================
// Types
// ============================================================================

export type EasingArray = [number, number, number, number];

export interface SpringTransition {
  type: "spring";
  stiffness: number;
  damping: number;
  mass: number;
}

export interface TweenTransition {
  type: "tween";
  ease: EasingArray;
  duration: number;
}

export type TransitionPreset = SpringTransition | TweenTransition;

export interface AnimationVariant {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit?: Record<string, unknown>;
}

export interface ResponsiveAnimationConfig {
  duration: number;
  distance: number;
  blur: number;
  scale: number;
  stagger: number;
}

// ============================================================================
// Easing Curves
// ============================================================================

export const easings = {
  /** Smooth deceleration - great for entrances */
  outExpo: [0.16, 1, 0.3, 1] as EasingArray,
  /** Slightly faster deceleration */
  outQuart: [0.25, 1, 0.5, 1] as EasingArray,
  /** Overshoots slightly - adds playfulness */
  outBack: [0.34, 1.56, 0.64, 1] as EasingArray,
  /** Dramatic acceleration and deceleration */
  inOutQuint: [0.86, 0, 0.07, 1] as EasingArray,
  /** Spring-like bounce feel */
  spring: [0.22, 1.36, 0.42, 0.99] as EasingArray,
} as const;

// ============================================================================
// Duration Constants (in seconds for Framer Motion)
// ============================================================================

export const durations = {
  /** 100ms - Micro-interactions, button states */
  instant: 0.1,
  /** 200ms - Small UI feedback */
  micro: 0.2,
  /** 300ms - Quick transitions */
  fast: 0.3,
  /** 500ms - Standard animations */
  normal: 0.5,
  /** 700ms - Deliberate, noticeable animations */
  slow: 0.7,
  /** 1000ms - Hero sections, important reveals */
  dramatic: 1.0,
  /** 1400ms - Full-page transitions, cinematic effects */
  cinematic: 1.4,
} as const;

// ============================================================================
// Stagger Amounts (in seconds)
// ============================================================================

export const staggers = {
  /** 30ms - Rapid-fire list items */
  tight: 0.03,
  /** 60ms - Standard stagger for most use cases */
  normal: 0.06,
  /** 100ms - More noticeable cascade effect */
  relaxed: 0.1,
  /** 150ms - Dramatic reveal sequences */
  dramatic: 0.15,
} as const;

// ============================================================================
// Transition Presets
// ============================================================================

export const transitions = {
  /** Balanced spring - good for most interactive elements */
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  } as SpringTransition,

  /** Bouncy spring - playful interactions, toggles */
  springBouncy: {
    type: "spring",
    stiffness: 400,
    damping: 25,
    mass: 0.6,
  } as SpringTransition,

  /** Gentle spring - subtle movements, hover states */
  springGentle: {
    type: "spring",
    stiffness: 180,
    damping: 22,
    mass: 1,
  } as SpringTransition,

  /** Smooth tween - elegant entrances and exits */
  smooth: {
    type: "tween",
    ease: easings.outExpo,
    duration: durations.slow,
  } as TweenTransition,

  /** Fast tween - quick UI responses */
  fast: {
    type: "tween",
    ease: easings.outQuart,
    duration: durations.fast,
  } as TweenTransition,

  /** Dramatic tween - hero sections, important reveals */
  dramatic: {
    type: "tween",
    ease: easings.inOutQuint,
    duration: durations.dramatic,
  } as TweenTransition,
} as const;

// ============================================================================
// Page Transition Variants
// ============================================================================

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: easings.outExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
    transition: {
      duration: 0.35,
    },
  },
} as const;

// ============================================================================
// Animation Presets
// ============================================================================

export const animationPresets = {
  /** Fade up from below - great for content reveals */
  fadeUp: {
    initial: {
      opacity: 0,
      y: 24,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.normal,
        ease: easings.outExpo,
      },
    },
    exit: {
      opacity: 0,
      y: -12,
      transition: {
        duration: durations.fast,
      },
    },
  },

  /** Simple fade - subtle presence changes */
  fadeIn: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: durations.normal,
        ease: easings.outQuart,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: durations.fast,
      },
    },
  },

  /** Scale in - modals, popovers, focus elements */
  scaleIn: {
    initial: {
      opacity: 0,
      scale: 0.92,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: durations.normal,
        ease: easings.outBack,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: durations.fast,
      },
    },
  },

  /** Slide from left - navigation, sidebars */
  slideLeft: {
    initial: {
      opacity: 0,
      x: -32,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: durations.normal,
        ease: easings.outExpo,
      },
    },
    exit: {
      opacity: 0,
      x: -16,
      transition: {
        duration: durations.fast,
      },
    },
  },

  /** Slide from right - complementary to slideLeft */
  slideRight: {
    initial: {
      opacity: 0,
      x: 32,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: durations.normal,
        ease: easings.outExpo,
      },
    },
    exit: {
      opacity: 0,
      x: 16,
      transition: {
        duration: durations.fast,
      },
    },
  },

  /** Slide up - bottom sheets, toasts */
  slideUp: {
    initial: {
      opacity: 0,
      y: 32,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.normal,
        ease: easings.outExpo,
      },
    },
    exit: {
      opacity: 0,
      y: 16,
      transition: {
        duration: durations.fast,
      },
    },
  },

  /** Slide down - dropdowns, menus */
  slideDown: {
    initial: {
      opacity: 0,
      y: -16,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.fast,
        ease: easings.outExpo,
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: {
        duration: durations.micro,
      },
    },
  },

  /** Blur in - premium feel for hero content */
  blurIn: {
    initial: {
      opacity: 0,
      filter: "blur(12px)",
    },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: durations.slow,
        ease: easings.outExpo,
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(6px)",
      transition: {
        duration: durations.fast,
      },
    },
  },
} as const;

// ============================================================================
// Responsive Animation Scaling
// ============================================================================

type Breakpoint = "mobile" | "tablet" | "desktop";

const responsiveMultipliers: Record<Breakpoint, ResponsiveAnimationConfig> = {
  mobile: {
    duration: 0.8, // 20% faster on mobile
    distance: 0.6, // 40% less movement
    blur: 0.5, // 50% less blur
    scale: 0.95, // Closer to 1 (less dramatic)
    stagger: 0.7, // 30% faster stagger
  },
  tablet: {
    duration: 0.9,
    distance: 0.8,
    blur: 0.75,
    scale: 0.97,
    stagger: 0.85,
  },
  desktop: {
    duration: 1,
    distance: 1,
    blur: 1,
    scale: 1,
    stagger: 1,
  },
};

/**
 * Get responsive animation values based on breakpoint
 * Reduces animation intensity on smaller devices for better performance and UX
 */
export function getResponsiveAnimation(breakpoint: Breakpoint): ResponsiveAnimationConfig {
  return responsiveMultipliers[breakpoint];
}

/**
 * Scale a duration value for the given breakpoint
 */
export function scaleDuration(duration: number, breakpoint: Breakpoint): number {
  return duration * responsiveMultipliers[breakpoint].duration;
}

/**
 * Scale a distance/translation value for the given breakpoint
 */
export function scaleDistance(distance: number, breakpoint: Breakpoint): number {
  return distance * responsiveMultipliers[breakpoint].distance;
}

/**
 * Scale a blur value for the given breakpoint
 */
export function scaleBlur(blur: number, breakpoint: Breakpoint): number {
  return blur * responsiveMultipliers[breakpoint].blur;
}

/**
 * Scale a stagger value for the given breakpoint
 */
export function scaleStagger(stagger: number, breakpoint: Breakpoint): number {
  return stagger * responsiveMultipliers[breakpoint].stagger;
}

/**
 * Create responsive animation variants based on a base preset
 */
export function createResponsiveVariants(
  preset: keyof typeof animationPresets,
  breakpoint: Breakpoint
) {
  const baseVariant = animationPresets[preset];
  const multipliers = responsiveMultipliers[breakpoint];

  const scaleValue = (value: unknown, type: keyof ResponsiveAnimationConfig): unknown => {
    if (typeof value === "number") {
      return value * multipliers[type];
    }
    return value;
  };

  const scaleTransition = (transition: Record<string, unknown> | undefined) => {
    if (!transition) return undefined;
    return {
      ...transition,
      duration: transition.duration
        ? (transition.duration as number) * multipliers.duration
        : undefined,
    };
  };

  return {
    initial: {
      ...baseVariant.initial,
      y: scaleValue((baseVariant.initial as Record<string, unknown>).y, "distance"),
      x: scaleValue((baseVariant.initial as Record<string, unknown>).x, "distance"),
    },
    animate: {
      ...baseVariant.animate,
      transition: scaleTransition(
        baseVariant.animate.transition as Record<string, unknown> | undefined
      ),
    },
    exit: baseVariant.exit
      ? {
        ...baseVariant.exit,
        y: scaleValue((baseVariant.exit as Record<string, unknown>).y, "distance"),
        x: scaleValue((baseVariant.exit as Record<string, unknown>).x, "distance"),
        transition: scaleTransition(
          baseVariant.exit.transition as Record<string, unknown> | undefined
        ),
      }
      : undefined,
  };
}

// ============================================================================
// Stagger Container Helper
// ============================================================================

/**
 * Create stagger container variants for parent elements
 */
export function createStaggerContainer(
  staggerAmount: keyof typeof staggers | number = "normal",
  delayChildren: number = 0
) {
  const stagger = typeof staggerAmount === "number" ? staggerAmount : staggers[staggerAmount];

  return {
    initial: {},
    animate: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
    exit: {
      transition: {
        staggerChildren: stagger * 0.5,
        staggerDirection: -1,
      },
    },
  };
}

// ============================================================================
// Scroll-triggered Animation Helpers
// ============================================================================

export const scrollTriggerDefaults = {
  /** Default viewport options for scroll-triggered animations */
  viewport: {
    once: true,
    amount: 0.2,
    margin: "-50px",
  },
  /** Viewport options for elements that should animate every time */
  viewportRepeat: {
    once: false,
    amount: 0.3,
  },
} as const;

// ============================================================================
// Reduced Motion Support
// ============================================================================

/**
 * Get animation values respecting reduced motion preferences
 * Returns minimal/no animation values when user prefers reduced motion
 */
export function getReducedMotionVariants(preset: keyof typeof animationPresets) {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: durations.fast },
    },
    exit: {
      opacity: 0,
      transition: { duration: durations.micro },
    },
  };
}

/**
 * Check if animations should be reduced
 * Use this with useReducedMotion() hook from Framer Motion
 */
export const reducedMotionConfig = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: durations.fast },
} as const;
