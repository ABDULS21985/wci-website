"use client";

import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
}

interface GSAPProviderProps {
  children: ReactNode;
}

/**
 * GSAPProvider - Initializes GSAP plugins and respects user motion preferences
 *
 * This provider:
 * - Registers ScrollTrigger and ScrollToPlugin globally
 * - Respects prefers-reduced-motion media query
 * - Provides consistent GSAP configuration across the app
 */
export function GSAPProvider({ children }: GSAPProviderProps) {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Configure GSAP based on motion preference
    if (prefersReducedMotion) {
      // Disable all GSAP animations for users who prefer reduced motion
      gsap.globalTimeline.timeScale(0);
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });
    } else {
      // Standard configuration
      gsap.config({
        autoSleep: 60,
        force3D: true,
        nullTargetWarn: false,
      });

      // ScrollTrigger defaults
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
      });

      // Set default ease for smooth enterprise feel
      gsap.defaults({
        ease: "power2.out",
        duration: 0.5,
      });
    }

    // Listen for changes in motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        gsap.globalTimeline.timeScale(0);
      } else {
        gsap.globalTimeline.timeScale(1);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}

// Export GSAP and plugins for use in components
export { gsap, ScrollTrigger, ScrollToPlugin, useGSAP };
