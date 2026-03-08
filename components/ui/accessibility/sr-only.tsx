import { ReactNode } from "react";

interface SrOnlyProps {
    children: ReactNode;
    as?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    id?: string;
    className?: string;
}

/**
 * Screen Reader Only Component
 * Visually hides content while keeping it accessible to screen readers.
 * Useful for providing additional context that sighted users don't need.
 *
 * @example
 * <SrOnly>This text is only visible to screen readers</SrOnly>
 *
 * @example
 * <SrOnly as="h2" id="form-title">Contact Form</SrOnly>
 */
export function SrOnly({ children, as: Component = "span", id, className = "" }: SrOnlyProps) {
    return (
        <Component
            id={id}
            className={`sr-only ${className}`.trim()}
        >
            {children}
        </Component>
    );
}

/**
 * Focus-visible Screen Reader Only Component
 * Content is hidden until focused, then becomes visible.
 * Perfect for skip links and other keyboard-only navigation.
 */
interface SrOnlyFocusableProps {
    children: ReactNode;
    className?: string;
}

export function SrOnlyFocusable({ children, className = "" }: SrOnlyFocusableProps) {
    return (
        <span className={`sr-only-focusable ${className}`.trim()}>
            {children}
        </span>
    );
}
