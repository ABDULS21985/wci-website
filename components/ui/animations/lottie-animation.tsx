"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { cn } from "@/components/ui/shared/lib/utils";

// Types for Lottie animation data
export interface LottieAnimationData {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd: number;
  assets: unknown[];
  layers: unknown[];
  [key: string]: unknown;
}

export interface LottieAnimationRef {
  play: () => void;
  pause: () => void;
  stop: () => void;
  setSpeed: (speed: number) => void;
  goToAndPlay: (frame: number, isFrame?: boolean) => void;
  goToAndStop: (frame: number, isFrame?: boolean) => void;
  setDirection: (direction: 1 | -1) => void;
  getDuration: (inFrames?: boolean) => number | undefined;
  destroy: () => void;
}

export interface LottieAnimationProps {
  /** Animation source - URL string or JSON object */
  src: string | LottieAnimationData;
  /** Enable loop playback */
  loop?: boolean;
  /** Start playing automatically */
  autoplay?: boolean;
  /** Playback speed multiplier */
  speed?: number;
  /** Additional CSS classes */
  className?: string;
  /** Pause animation when not in viewport */
  pauseOnInvisible?: boolean;
  /** Play once when element scrolls into view */
  playOnceOnReveal?: boolean;
  /** Intersection observer threshold (0-1) */
  threshold?: number;
  /** Intersection observer root margin */
  rootMargin?: string;
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Callback when animation loops */
  onLoopComplete?: () => void;
  /** Callback when animation enters frame */
  onEnterFrame?: (frame: number) => void;
  /** Callback when animation data is loaded */
  onDataReady?: () => void;
  /** Callback when animation is ready to play */
  onDOMLoaded?: () => void;
  /** Initial segment to play [startFrame, endFrame] */
  initialSegment?: [number, number];
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** ARIA role */
  ariaRole?: string;
  /** Show static fallback for reduced motion preference */
  respectReducedMotion?: boolean;
  /** Frame to show when animation is static (reduced motion) */
  staticFrame?: number;
  /** Custom styles */
  style?: React.CSSProperties;
}

/**
 * Hook to detect user's reduced motion preference
 */
function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook to detect if element is in viewport using IntersectionObserver
 */
function useIntersectionObserver(
  ref: React.RefObject<Element | null>,
  options: {
    threshold?: number;
    rootMargin?: string;
    enabled?: boolean;
  } = {}
): boolean {
  const { threshold = 0.1, rootMargin = "0px", enabled = true } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin, enabled]);

  return isIntersecting;
}

/**
 * LottieAnimation Component
 *
 * A wrapper around lottie-react with viewport detection, accessibility support,
 * and common configurations for premium animations.
 *
 * @example
 * // Hero illustration - looping at 0.7x speed
 * <LottieAnimation
 *   src="/animations/hero.json"
 *   loop
 *   autoplay
 *   speed={0.7}
 *   className="w-full h-auto"
 * />
 *
 * @example
 * // Service icon - play once on scroll reveal
 * <LottieAnimation
 *   src="/animations/service-icon.json"
 *   playOnceOnReveal
 *   className="w-16 h-16"
 * />
 *
 * @example
 * // Empty state - gentle looping
 * <LottieAnimation
 *   src={emptyStateData}
 *   loop
 *   autoplay
 *   speed={0.5}
 *   pauseOnInvisible
 * />
 */
export const LottieAnimation = forwardRef<LottieAnimationRef, LottieAnimationProps>(
  function LottieAnimation(
    {
      src,
      loop = false,
      autoplay = true,
      speed = 1,
      className,
      pauseOnInvisible = true,
      playOnceOnReveal = false,
      threshold = 0.1,
      rootMargin = "0px 0px -50px 0px",
      onComplete,
      onLoopComplete,
      onEnterFrame,
      onDataReady,
      onDOMLoaded,
      initialSegment,
      ariaLabel = "Animation",
      ariaRole = "img",
      respectReducedMotion = true,
      staticFrame = 0,
      style,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const [animationData, setAnimationData] = useState<LottieAnimationData | null>(
      typeof src === "object" ? src : null
    );
    const [isLoading, setIsLoading] = useState(typeof src === "string");
    const [error, setError] = useState<string | null>(null);
    const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

    const prefersReducedMotion = useReducedMotion();
    const shouldReduceMotion = respectReducedMotion && prefersReducedMotion;

    const isInViewport = useIntersectionObserver(containerRef, {
      threshold,
      rootMargin,
      enabled: pauseOnInvisible || playOnceOnReveal,
    });

    // Expose animation controls via ref
    useImperativeHandle(ref, () => ({
      play: () => lottieRef.current?.play(),
      pause: () => lottieRef.current?.pause(),
      stop: () => lottieRef.current?.stop(),
      setSpeed: (newSpeed: number) => lottieRef.current?.setSpeed(newSpeed),
      goToAndPlay: (frame: number, isFrame = true) =>
        lottieRef.current?.goToAndPlay(frame, isFrame),
      goToAndStop: (frame: number, isFrame = true) =>
        lottieRef.current?.goToAndStop(frame, isFrame),
      setDirection: (direction: 1 | -1) =>
        lottieRef.current?.setDirection(direction),
      getDuration: (inFrames = false) => lottieRef.current?.getDuration(inFrames),
      destroy: () => lottieRef.current?.destroy(),
    }));

    // Load animation data from URL
    useEffect(() => {
      if (typeof src !== "string") {
        setAnimationData(src);
        setIsLoading(false);
        return;
      }

      const loadAnimation = async () => {
        try {
          setIsLoading(true);
          setError(null);

          const response = await fetch(src);
          if (!response.ok) {
            throw new Error(`Failed to load animation: ${response.statusText}`);
          }

          const data = await response.json();
          setAnimationData(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load animation");
        } finally {
          setIsLoading(false);
        }
      };

      loadAnimation();
    }, [src]);

    // Handle viewport visibility
    useEffect(() => {
      if (!lottieRef.current || shouldReduceMotion) return;

      if (pauseOnInvisible && !playOnceOnReveal) {
        if (isInViewport) {
          lottieRef.current.play();
        } else {
          lottieRef.current.pause();
        }
      }
    }, [isInViewport, pauseOnInvisible, playOnceOnReveal, shouldReduceMotion]);

    // Handle play once on reveal
    useEffect(() => {
      if (!lottieRef.current || shouldReduceMotion || !playOnceOnReveal) return;

      if (isInViewport && !hasPlayedOnce) {
        lottieRef.current.play();
        setHasPlayedOnce(true);
      }
    }, [isInViewport, playOnceOnReveal, hasPlayedOnce, shouldReduceMotion]);

    // Set playback speed
    useEffect(() => {
      if (lottieRef.current && speed !== 1) {
        lottieRef.current.setSpeed(speed);
      }
    }, [speed]);

    // Handle completion callback
    const handleComplete = useCallback(() => {
      onComplete?.();
    }, [onComplete]);

    // Handle loop completion
    const handleLoopComplete = useCallback(() => {
      onLoopComplete?.();
    }, [onLoopComplete]);

    // Handle enter frame
    const handleEnterFrame = useCallback(
      (event: unknown) => {
        if (event && typeof event === "object" && "currentTime" in event) {
          const frameEvent = event as { currentTime: number; totalTime: number };
          onEnterFrame?.(Math.floor(frameEvent.currentTime));
        }
      },
      [onEnterFrame]
    );

    // Handle data ready
    const handleDataReady = useCallback(() => {
      onDataReady?.();

      // If reduced motion, stop at static frame
      if (shouldReduceMotion && lottieRef.current) {
        lottieRef.current.goToAndStop(staticFrame, true);
      }

      // If play once on reveal, pause initially
      if (playOnceOnReveal && lottieRef.current && !isInViewport) {
        lottieRef.current.pause();
      }
    }, [onDataReady, shouldReduceMotion, staticFrame, playOnceOnReveal, isInViewport]);

    // Handle DOM loaded
    const handleDOMLoaded = useCallback(() => {
      onDOMLoaded?.();
    }, [onDOMLoaded]);

    // Memoize lottie options
    const lottieOptions = useMemo(
      () => ({
        animationData,
        loop: shouldReduceMotion ? false : loop,
        autoplay: shouldReduceMotion ? false : (playOnceOnReveal ? false : autoplay),
        initialSegment,
        renderer: "svg" as const,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
          progressiveLoad: true,
        },
      }),
      [animationData, loop, autoplay, initialSegment, shouldReduceMotion, playOnceOnReveal]
    );

    if (isLoading) {
      return (
        <div
          ref={containerRef}
          className={cn("flex items-center justify-center", className)}
          style={style}
          role={ariaRole}
          aria-label={`${ariaLabel} loading`}
        >
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded w-full h-full min-h-[100px]" />
        </div>
      );
    }

    if (error) {
      return (
        <div
          ref={containerRef}
          className={cn("flex items-center justify-center text-gray-400", className)}
          style={style}
          role="alert"
          aria-label={`Animation error: ${error}`}
        >
          <span className="sr-only">{error}</span>
        </div>
      );
    }

    if (!animationData) {
      return null;
    }

    return (
      <div
        ref={containerRef}
        className={cn("relative", className)}
        style={style}
        role={ariaRole}
        aria-label={ariaLabel}
      >
        <Lottie
          lottieRef={lottieRef}
          {...lottieOptions}
          onComplete={handleComplete}
          onLoopComplete={handleLoopComplete}
          onEnterFrame={handleEnterFrame}
          onDataReady={handleDataReady}
          onDOMLoaded={handleDOMLoaded}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }
);

export default LottieAnimation;
