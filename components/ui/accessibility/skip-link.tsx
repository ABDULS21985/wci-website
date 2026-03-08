"use client";

import { useTranslations } from "next-intl";

interface SkipLinkProps {
    href?: string;
    children?: React.ReactNode;
}

/**
 * Skip Link Component for WCAG 2.1 AA Compliance
 * Provides a way for keyboard users to skip repetitive navigation
 * and go directly to main content.
 *
 * The link is visually hidden until focused via keyboard navigation.
 *
 * @example
 * // In layout.tsx
 * <SkipLink />
 * <Navbar />
 * <main id="main-content">...</main>
 *
 * @example
 * // Custom target
 * <SkipLink href="#article-content">Skip to article</SkipLink>
 */
export function SkipLink({
    href = "#main-content",
    children
}: SkipLinkProps) {
    const t = useTranslations("accessibility");

    return (
        <a
            href={href}
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary transition-all"
        >
            {children || t("skipToContent")}
        </a>
    );
}
