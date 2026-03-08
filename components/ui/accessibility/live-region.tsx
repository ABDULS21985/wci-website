"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";

type Politeness = "polite" | "assertive" | "off";

interface LiveRegionProps {
    /** The content to announce to screen readers */
    children?: ReactNode;
    /**
     * Politeness level for the announcement
     * - "polite": Waits for user to finish current task (default)
     * - "assertive": Interrupts current task immediately
     * - "off": Disables announcements
     */
    politeness?: Politeness;
    /** Additional CSS classes */
    className?: string;
    /** Whether the region is atomic (announces entire content on change) */
    atomic?: boolean;
    /** Which parts are relevant for announcements */
    relevant?: "additions" | "removals" | "text" | "all" | "additions text";
    /** Optional ID for the live region */
    id?: string;
}

/**
 * Live Region Component for Dynamic Announcements
 * Creates an ARIA live region that announces content changes to screen readers.
 *
 * @example
 * // For status updates
 * <LiveRegion politeness="polite">
 *   {isLoading ? "Loading..." : "Content loaded"}
 * </LiveRegion>
 *
 * @example
 * // For error messages
 * <LiveRegion politeness="assertive">
 *   {errorMessage}
 * </LiveRegion>
 */
export function LiveRegion({
    children,
    politeness = "polite",
    className = "",
    atomic = true,
    relevant = "additions text",
    id,
}: LiveRegionProps) {
    return (
        <div
            id={id}
            role="status"
            aria-live={politeness}
            aria-atomic={atomic}
            aria-relevant={relevant}
            className={`sr-only ${className}`.trim()}
        >
            {children}
        </div>
    );
}

interface UseAnnouncerOptions {
    politeness?: Politeness;
    /** How long to keep the announcement visible (ms) */
    clearDelay?: number;
}

interface UseAnnouncerReturn {
    /** The current announcement to display */
    announcement: string;
    /** Function to make a new announcement */
    announce: (message: string) => void;
    /** Function to clear the current announcement */
    clear: () => void;
}

/**
 * Hook for programmatic announcements
 * Provides a function to announce messages to screen readers.
 *
 * @example
 * function MyComponent() {
 *   const { announcement, announce } = useAnnouncer();
 *
 *   const handleSubmit = async () => {
 *     announce("Submitting form...");
 *     await submitForm();
 *     announce("Form submitted successfully!");
 *   };
 *
 *   return (
 *     <>
 *       <LiveRegion>{announcement}</LiveRegion>
 *       <form onSubmit={handleSubmit}>...</form>
 *     </>
 *   );
 * }
 */
export function useAnnouncer({
    clearDelay = 1000
}: UseAnnouncerOptions = {}): UseAnnouncerReturn {
    const [announcement, setAnnouncement] = useState("");

    const announce = useCallback((message: string) => {
        // Clear first to ensure screen readers detect the change
        setAnnouncement("");
        // Use requestAnimationFrame to ensure the DOM updates
        requestAnimationFrame(() => {
            setAnnouncement(message);
        });
    }, []);

    const clear = useCallback(() => {
        setAnnouncement("");
    }, []);

    useEffect(() => {
        if (announcement && clearDelay > 0) {
            const timer = setTimeout(() => {
                setAnnouncement("");
            }, clearDelay);
            return () => clearTimeout(timer);
        }
    }, [announcement, clearDelay]);

    return { announcement, announce, clear };
}

interface AnnouncerProps {
    /** Children function receiving the announce function */
    children: (announce: (message: string) => void) => ReactNode;
    /** Politeness level */
    politeness?: Politeness;
}

/**
 * Announcer Component with Render Props
 * Provides announcement functionality via render props pattern.
 *
 * @example
 * <Announcer>
 *   {(announce) => (
 *     <button onClick={() => announce("Item added to cart!")}>
 *       Add to Cart
 *     </button>
 *   )}
 * </Announcer>
 */
export function Announcer({ children, politeness = "polite" }: AnnouncerProps) {
    const { announcement, announce } = useAnnouncer();

    return (
        <>
            <LiveRegion politeness={politeness}>{announcement}</LiveRegion>
            {children(announce)}
        </>
    );
}
