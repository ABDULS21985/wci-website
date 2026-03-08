"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/components/ui/shared/lib/utils";

// Custom easing for premium feel
const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

type RevealMode = "character" | "word" | "line";

interface TextRevealProps {
  children: string;
  className?: string;
  /** Reveal mode: character-by-character, word-by-word, or line-by-line */
  mode?: RevealMode;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Duration for each item animation (in seconds) */
  duration?: number;
  /** Stagger delay between items (in seconds) */
  stagger?: number;
  /** Only animate once when in view */
  once?: boolean;
  /** Intersection threshold (0-1) */
  threshold?: number;
  /** Animation variant */
  variant?: "fadeUp" | "fadeIn" | "blur";
  /** HTML element to render as */
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
}

const itemVariants: Record<string, Variants> = {
  fadeUp: {
    hidden: {
      opacity: 0,
      y: 20,
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
  blur: {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
    },
  },
};

export function TextReveal({
  children,
  className,
  mode = "word",
  delay = 0,
  duration = 0.4,
  stagger = 0.03,
  once = true,
  threshold = 0.1,
  variant = "fadeUp",
  as = "p",
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // Split text based on mode
  const items = useMemo(() => {
    switch (mode) {
      case "character":
        return children.split("");
      case "word":
        return children.split(" ");
      case "line":
        return children.split("\n");
      default:
        return children.split(" ");
    }
  }, [children, mode]);

  // If user prefers reduced motion, render without animation
  if (shouldReduceMotion) {
    const Component = as;
    return <Component className={className}>{children}</Component>;
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const MotionComponent = motion[as];
  const selectedVariant = itemVariants[variant];

  return (
    <MotionComponent
      className={cn("overflow-hidden", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount: threshold,
      }}
      variants={containerVariants}
      aria-label={children}
    >
      {items.map((item, index) => (
        <motion.span
          key={`${item}-${index}`}
          className="inline-block"
          variants={selectedVariant}
          transition={{
            duration,
            ease: PREMIUM_EASE,
          }}
        >
          {item}
          {/* Add space after words and lines, but not characters */}
          {mode !== "character" && index < items.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </MotionComponent>
  );
}

// Preset components for common use cases
interface TextRevealPresetProps extends Omit<TextRevealProps, "mode"> {
  children: string;
}

export function CharacterReveal({ children, ...props }: TextRevealPresetProps) {
  return (
    <TextReveal mode="character" stagger={0.02} {...props}>
      {children}
    </TextReveal>
  );
}

export function WordReveal({ children, ...props }: TextRevealPresetProps) {
  return (
    <TextReveal mode="word" stagger={0.05} {...props}>
      {children}
    </TextReveal>
  );
}

export function LineReveal({ children, ...props }: TextRevealPresetProps) {
  return (
    <TextReveal mode="line" stagger={0.1} {...props}>
      {children}
    </TextReveal>
  );
}

// Heading variants with appropriate styling
interface HeadingRevealProps extends Omit<TextRevealProps, "as"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function HeadingReveal({
  children,
  level = 2,
  ...props
}: HeadingRevealProps) {
  const tag = `h${level}` as const;
  return (
    <TextReveal as={tag} mode="word" {...props}>
      {children}
    </TextReveal>
  );
}

export default TextReveal;
