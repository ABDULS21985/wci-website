"use client";

import * as React from "react";
import { gsap } from "gsap";
import { cn } from "@/components/ui/shared/lib/utils";

// ============================================================================
// Types
// ============================================================================

export type CursorState = "default" | "link" | "image" | "button" | "active";

interface CursorContextValue {
  /** Current cursor state */
  cursorState: CursorState;
  /** Set cursor state */
  setCursorState: (state: CursorState) => void;
  /** Image hover label text */
  cursorLabel: string;
  /** Set cursor label for image hover */
  setCursorLabel: (label: string) => void;
  /** Whether custom cursor is enabled */
  isEnabled: boolean;
  /** Enable/disable custom cursor */
  setEnabled: (enabled: boolean) => void;
}

// ============================================================================
// Context
// ============================================================================

const CursorContext = React.createContext<CursorContextValue | null>(null);

// ============================================================================
// Provider
// ============================================================================

interface CursorProviderProps {
  children: React.ReactNode;
  /** Default label for image hover state */
  defaultImageLabel?: string;
}

/**
 * CursorProvider - Manages global cursor state
 *
 * Wrap your app with this provider to enable custom cursor functionality.
 * The custom cursor only renders on devices with fine pointer (mouse).
 *
 * @example
 * <CursorProvider>
 *   <App />
 * </CursorProvider>
 */
export function CursorProvider({
  children,
  defaultImageLabel = "View",
}: CursorProviderProps) {
  const [cursorState, setCursorState] = React.useState<CursorState>("default");
  const [cursorLabel, setCursorLabel] = React.useState(defaultImageLabel);
  const [isEnabled, setEnabled] = React.useState(true);

  const value = React.useMemo(
    () => ({
      cursorState,
      setCursorState,
      cursorLabel,
      setCursorLabel,
      isEnabled,
      setEnabled,
    }),
    [cursorState, cursorLabel, isEnabled]
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * useCursor - Access cursor context
 *
 * @example
 * const { cursorState, setCursorState } = useCursor();
 */
export function useCursor(): CursorContextValue {
  const context = React.useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}

/**
 * useCursorHover - Apply cursor hover state to an element
 *
 * Returns event handlers to attach to your element for cursor state changes.
 *
 * @example
 * const hoverProps = useCursorHover("link");
 * <a {...hoverProps}>Link</a>
 *
 * @example
 * // With custom image label
 * const imageHoverProps = useCursorHover("image", "Preview");
 * <img {...imageHoverProps} />
 */
export function useCursorHover(
  state: CursorState,
  label?: string
): {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
} {
  const context = React.useContext(CursorContext);

  const onMouseEnter = React.useCallback(() => {
    if (!context) return;
    context.setCursorState(state);
    if (label && state === "image") {
      context.setCursorLabel(label);
    }
  }, [context, state, label]);

  const onMouseLeave = React.useCallback(() => {
    if (!context) return;
    context.setCursorState("default");
  }, [context]);

  const onMouseDown = React.useCallback(() => {
    if (!context) return;
    context.setCursorState("active");
  }, [context]);

  const onMouseUp = React.useCallback(() => {
    if (!context) return;
    context.setCursorState(state);
  }, [context, state]);

  return { onMouseEnter, onMouseLeave, onMouseDown, onMouseUp };
}

// ============================================================================
// Custom Cursor Component
// ============================================================================

interface CustomCursorProps {
  /** Additional className for outer ring */
  ringClassName?: string;
  /** Additional className for inner dot */
  dotClassName?: string;
}

/**
 * CustomCursor - A smooth animated cursor for desktop devices
 *
 * Features:
 * - Outer ring (40px) with 80ms delay using GSAP quickTo
 * - Inner dot (6px) with instant tracking
 * - Multiple states: default, link, image, button, active
 * - Only renders on devices with fine pointer (mouse)
 * - Respects prefers-reduced-motion
 *
 * @example
 * // In layout.tsx
 * <CursorProvider>
 *   <CustomCursor />
 *   <App />
 * </CursorProvider>
 */
export function CustomCursor({ ringClassName, dotClassName }: CustomCursorProps) {
  const ringRef = React.useRef<HTMLDivElement>(null);
  const dotRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLSpanElement>(null);

  const [isVisible, setIsVisible] = React.useState(false);
  const [hasFinePointer, setHasFinePointer] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  // Use context if available, fallback to internal state
  const context = React.useContext(CursorContext);
  const [internalState, setInternalState] = React.useState<CursorState>("default");
  const [internalLabel, setInternalLabel] = React.useState("View");

  const cursorState = context?.cursorState ?? internalState;
  const cursorLabel = context?.cursorLabel ?? internalLabel;
  const isEnabled = context?.isEnabled ?? true;

  // GSAP quickTo refs for smooth animation
  const ringXTo = React.useRef<gsap.QuickToFunc | null>(null);
  const ringYTo = React.useRef<gsap.QuickToFunc | null>(null);
  const dotXTo = React.useRef<gsap.QuickToFunc | null>(null);
  const dotYTo = React.useRef<gsap.QuickToFunc | null>(null);

  // Detect fine pointer (mouse) capability
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setHasFinePointer(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setHasFinePointer(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Detect reduced motion preference
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Initialize GSAP quickTo for smooth cursor following
  React.useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion || !isEnabled) return;
    if (!ringRef.current || !dotRef.current) return;

    // Ring follows with 80ms delay (0.08s duration)
    ringXTo.current = gsap.quickTo(ringRef.current, "x", {
      duration: 0.08,
      ease: "power2.out",
    });
    ringYTo.current = gsap.quickTo(ringRef.current, "y", {
      duration: 0.08,
      ease: "power2.out",
    });

    // Dot follows instantly (very short duration for smoothness)
    dotXTo.current = gsap.quickTo(dotRef.current, "x", {
      duration: 0.01,
      ease: "none",
    });
    dotYTo.current = gsap.quickTo(dotRef.current, "y", {
      duration: 0.01,
      ease: "none",
    });

    return () => {
      ringXTo.current = null;
      ringYTo.current = null;
      dotXTo.current = null;
      dotYTo.current = null;
    };
  }, [hasFinePointer, prefersReducedMotion, isEnabled]);

  // Mouse move handler
  React.useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion || !isEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Update positions using quickTo
      ringXTo.current?.(clientX);
      ringYTo.current?.(clientY);
      dotXTo.current?.(clientX);
      dotYTo.current?.(clientY);

      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [hasFinePointer, prefersReducedMotion, isEnabled, isVisible]);

  // Auto-detect hoverable elements
  React.useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion || !isEnabled) return;
    if (context) return; // Skip auto-detection if using context

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for data attributes first
      if (target.closest("[data-cursor-image]")) {
        const imageElement = target.closest("[data-cursor-image]") as HTMLElement;
        setInternalState("image");
        setInternalLabel(imageElement.getAttribute("data-cursor-label") || "View");
        return;
      }

      if (target.closest("[data-cursor-button]")) {
        setInternalState("button");
        return;
      }

      if (target.closest("[data-cursor-link]")) {
        setInternalState("link");
        return;
      }

      // Auto-detect by element type
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest('[role="link"]')
      ) {
        // Differentiate between buttons and links
        if (
          target.closest("button") ||
          target.closest('[role="button"]')
        ) {
          setInternalState("button");
        } else {
          setInternalState("link");
        }
        return;
      }

      // Reset to default
      setInternalState("default");
    };

    document.addEventListener("mouseover", handleElementHover, { passive: true });

    return () => {
      document.removeEventListener("mouseover", handleElementHover);
    };
  }, [hasFinePointer, prefersReducedMotion, isEnabled, context]);

  // Handle mousedown/mouseup for active state
  React.useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion || !isEnabled) return;
    if (context) return; // Skip if using context

    const handleMouseDown = () => {
      setInternalState("active");
    };

    const handleMouseUp = () => {
      setInternalState("default");
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [hasFinePointer, prefersReducedMotion, isEnabled, context]);

  // Apply cursor:none to body when custom cursor is active
  React.useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion || !isEnabled) {
      document.body.style.cursor = "";
      return;
    }

    document.body.style.cursor = "none";

    // Also hide cursor on all interactive elements
    const style = document.createElement("style");
    style.id = "custom-cursor-styles";
    style.textContent = `
      @media (pointer: fine) {
        *, *::before, *::after {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = "";
      const existingStyle = document.getElementById("custom-cursor-styles");
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [hasFinePointer, prefersReducedMotion, isEnabled]);

  // Don't render on touch devices or with reduced motion
  if (!hasFinePointer || prefersReducedMotion || !isEnabled) {
    return null;
  }

  // Calculate styles based on cursor state
  const getRingStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      width: 40,
      height: 40,
      transition: "transform 0.15s ease-out, opacity 0.15s ease-out, background-color 0.15s ease-out, border-color 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out",
    };

    switch (cursorState) {
      case "link":
        return {
          ...baseStyles,
          transform: "translate(-50%, -50%) scale(1.5)",
        };
      case "image":
        return {
          ...baseStyles,
          width: 80,
          height: 80,
          transform: "translate(-50%, -50%) scale(1)",
        };
      case "button":
        return {
          ...baseStyles,
          transform: "translate(-50%, -50%) scale(0.75)",
        };
      case "active":
        return {
          ...baseStyles,
          transform: "translate(-50%, -50%) scale(0.8)",
        };
      default:
        return {
          ...baseStyles,
          transform: "translate(-50%, -50%) scale(1)",
        };
    }
  };

  const getDotStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      width: 6,
      height: 6,
      transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
    };

    switch (cursorState) {
      case "image":
        return {
          ...baseStyles,
          opacity: 0,
          transform: "translate(-50%, -50%) scale(0)",
        };
      case "active":
        return {
          ...baseStyles,
          transform: "translate(-50%, -50%) scale(0.8)",
        };
      default:
        return {
          ...baseStyles,
          transform: "translate(-50%, -50%) scale(1)",
        };
    }
  };

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={cn(
          "fixed top-0 left-0 z-[9999] pointer-events-none",
          "rounded-full border-[2px]",
          "will-change-transform",
          isVisible ? "opacity-100" : "opacity-0",
          // Use mix-blend-difference for default/link states so it's visible on any background
          (cursorState === "default" || cursorState === "link" || cursorState === "active") && "mix-blend-difference border-white",
          // For button state, use brand color
          cursorState === "button" && "border-[#0D7377] bg-[#0D7377]/20",
          // For image state, use solid white bg
          cursorState === "image" && "border-transparent bg-white shadow-lg",
          ringClassName
        )}
        style={getRingStyles()}
      >
        {/* Label for image state */}
        {cursorState === "image" && (
          <span
            ref={labelRef}
            className="absolute inset-0 flex items-center justify-center text-xs font-medium text-neutral-900 uppercase tracking-wider"
          >
            {cursorLabel}
          </span>
        )}
      </div>

      {/* Inner Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={cn(
          "fixed top-0 left-0 z-[9999] pointer-events-none",
          "rounded-full",
          "will-change-transform",
          isVisible ? "opacity-100" : "opacity-0",
          // Use mix-blend-difference for visibility on any background
          (cursorState === "default" || cursorState === "link" || cursorState === "active") && "mix-blend-difference bg-white",
          // For button state, use brand color
          cursorState === "button" && "bg-[#0D7377]",
          dotClassName
        )}
        style={getDotStyles()}
      />
    </>
  );
}

// ============================================================================
// Desktop-Only Wrapper
// ============================================================================

interface CustomCursorWrapperProps extends CustomCursorProps {
  /** Children to wrap (optional) */
  children?: React.ReactNode;
}

/**
 * CustomCursorWrapper - Conditionally renders CustomCursor on desktop only
 *
 * This component handles the client-side detection and only mounts
 * the cursor on devices with fine pointer capability.
 *
 * @example
 * // In layout.tsx
 * <CustomCursorWrapper />
 */
export function CustomCursorWrapper({
  children,
  ...cursorProps
}: CustomCursorWrapperProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <>
      <CustomCursor {...cursorProps} />
      {children}
    </>
  );
}

export default CustomCursor;
