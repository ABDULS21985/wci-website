// =============================================================================
// Scroll Direction Hook
// =============================================================================
// Detects scroll direction with performance optimizations and jitter prevention
// Uses requestAnimationFrame for smooth detection and passive event listeners

import { useState, useEffect, useCallback, useRef } from "react";

export type ScrollDirection = "up" | "down" | null;

export interface ScrollState {
    /** Current scroll direction: "up", "down", or null (at top) */
    direction: ScrollDirection;
    /** Current scroll position in pixels */
    scrollY: number;
    /** Whether the user has scrolled past the threshold */
    isScrolled: boolean;
    /** Whether the header should be hidden (scrolled down past hide threshold) */
    isHidden: boolean;
}

export interface UseScrollDirectionOptions {
    /** Minimum scroll distance (in pixels) before changing direction to prevent jitter. Default: 10 */
    threshold?: number;
    /** Scroll position (in pixels) after which the header can be hidden. Default: 400 */
    hideThreshold?: number;
    /** Scroll position (in pixels) to consider "scrolled" state. Default: 50 */
    scrolledThreshold?: number;
}

/**
 * Hook to detect scroll direction with performance optimizations
 *
 * @example
 * ```tsx
 * const { direction, isScrolled, isHidden } = useScrollDirection({
 *   threshold: 10,
 *   hideThreshold: 400,
 *   scrolledThreshold: 50,
 * });
 *
 * // direction: "up" | "down" | null
 * // isScrolled: true when scrolled past scrolledThreshold
 * // isHidden: true when scrolled down past hideThreshold
 * ```
 */
export function useScrollDirection({
    threshold = 10,
    hideThreshold = 400,
    scrolledThreshold = 50,
}: UseScrollDirectionOptions = {}): ScrollState {
    const [scrollState, setScrollState] = useState<ScrollState>({
        direction: null,
        scrollY: 0,
        isScrolled: false,
        isHidden: false,
    });

    const lastScrollY = useRef(0);
    const lastDirection = useRef<ScrollDirection>(null);
    const ticking = useRef(false);

    const updateScrollState = useCallback(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY.current;

        // Determine direction only if delta exceeds threshold (prevents jitter)
        let newDirection = lastDirection.current;
        if (Math.abs(scrollDelta) >= threshold) {
            newDirection = scrollDelta > 0 ? "down" : "up";
            lastDirection.current = newDirection;
            lastScrollY.current = currentScrollY;
        }

        // At top of page, reset direction
        if (currentScrollY <= 0) {
            newDirection = null;
            lastDirection.current = null;
        }

        const isScrolled = currentScrollY > scrolledThreshold;

        // Header is hidden when:
        // - Scrolling down AND
        // - Past the hide threshold
        const isHidden = newDirection === "down" && currentScrollY > hideThreshold;

        setScrollState({
            direction: newDirection,
            scrollY: currentScrollY,
            isScrolled,
            isHidden,
        });

        ticking.current = false;
    }, [threshold, hideThreshold, scrolledThreshold]);

    const handleScroll = useCallback(() => {
        if (!ticking.current) {
            // Use requestAnimationFrame for smooth, performant updates
            window.requestAnimationFrame(updateScrollState);
            ticking.current = true;
        }
    }, [updateScrollState]);

    useEffect(() => {
        // Initialize state
        lastScrollY.current = window.scrollY;
        updateScrollState();

        // Add passive event listener for better scroll performance
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll, updateScrollState]);

    return scrollState;
}

export default useScrollDirection;
