"use client";

import { PageTransitionWrapper } from "../ui/animations/page-transition";
import { ReactNode } from "react";

interface PageContentWrapperProps {
  children: ReactNode;
}

/**
 * Client-side wrapper for page content that handles page transitions.
 * This component wraps the main content area and provides:
 * - Smooth page transitions with blur/fade effects
 * - NProgress-style loading bar during navigation
 * - Reduced motion support for accessibility
 */
export function PageContentWrapper({ children }: PageContentWrapperProps) {
  return <PageTransitionWrapper>{children}</PageTransitionWrapper>;
}
