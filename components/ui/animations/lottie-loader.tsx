"use client";

import React, { useMemo } from "react";
import Lottie from "lottie-react";
import { cn } from "@/components/ui/shared/lib/utils";

// Brand colors for the loader animation
const BRAND_PRIMARY = "#3B82F6"; // blue-500
const BRAND_SECONDARY = "#60A5FA"; // blue-400
const BRAND_ACCENT = "#93C5FD"; // blue-300

export type LottieLoaderSize = "sm" | "md" | "lg" | "xl";

export interface LottieLoaderProps {
  /** Size variant */
  size?: LottieLoaderSize;
  /** Additional CSS classes */
  className?: string;
  /** Custom animation data (optional, uses default if not provided) */
  animationData?: object;
  /** Loading text for accessibility */
  loadingText?: string;
  /** Show loading text visually */
  showText?: boolean;
  /** Custom color override */
  color?: string;
}

const sizeClasses: Record<LottieLoaderSize, { container: string; text: string }> = {
  sm: { container: "w-6 h-6", text: "text-xs" },
  md: { container: "w-10 h-10", text: "text-sm" },
  lg: { container: "w-16 h-16", text: "text-base" },
  xl: { container: "w-24 h-24", text: "text-lg" },
};

/**
 * Generate a brand-colored loading animation data
 * This creates a simple spinning circle animation with brand colors
 */
function generateLoadingAnimation(primaryColor = BRAND_PRIMARY, secondaryColor = BRAND_SECONDARY): object {
  return {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 60,
    w: 100,
    h: 100,
    nm: "Loading",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Spinner",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: {
            a: 1,
            k: [
              { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] },
              { t: 60, s: [360] },
            ],
          },
          p: { a: 0, k: [50, 50, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                d: 1,
                ty: "el",
                s: { a: 0, k: [80, 80] },
                p: { a: 0, k: [0, 0] },
                nm: "Circle",
              },
              {
                ty: "st",
                c: { a: 0, k: hexToRgb(secondaryColor) },
                o: { a: 0, k: 30 },
                w: { a: 0, k: 8 },
                lc: 2,
                lj: 2,
                nm: "Stroke BG",
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
              },
            ],
            nm: "Background Circle",
          },
          {
            ty: "gr",
            it: [
              {
                ty: "el",
                d: 1,
                s: { a: 0, k: [80, 80] },
                p: { a: 0, k: [0, 0] },
                nm: "Arc",
              },
              {
                ty: "st",
                c: { a: 0, k: hexToRgb(primaryColor) },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 8 },
                lc: 2,
                lj: 2,
                nm: "Stroke",
              },
              {
                ty: "tm",
                s: { a: 0, k: 0 },
                e: { a: 0, k: 25 },
                o: { a: 0, k: 0 },
                m: 1,
                nm: "Trim Paths",
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
              },
            ],
            nm: "Active Arc",
          },
        ],
        ip: 0,
        op: 60,
        st: 0,
      },
    ],
    markers: [],
  };
}

/**
 * Convert hex color to RGB array for Lottie
 */
function hexToRgb(hex: string): [number, number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return [
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255,
      1,
    ];
  }
  return [0.231, 0.51, 0.965, 1]; // Default blue
}

/**
 * LottieLoader Component
 *
 * A brand-colored loading animation using Lottie for smooth, scalable loading states.
 *
 * @example
 * // Small inline loader
 * <LottieLoader size="sm" />
 *
 * @example
 * // Medium loader with text
 * <LottieLoader size="md" showText loadingText="Loading data..." />
 *
 * @example
 * // Large page loader
 * <LottieLoader size="lg" className="mx-auto" />
 *
 * @example
 * // Custom animation
 * <LottieLoader animationData={customLoadingAnimation} size="xl" />
 */
export function LottieLoader({
  size = "md",
  className,
  animationData,
  loadingText = "Loading...",
  showText = false,
  color,
}: LottieLoaderProps) {
  const sizeConfig = sizeClasses[size];

  const defaultAnimation = useMemo(() => {
    if (color) {
      return generateLoadingAnimation(color, color);
    }
    return generateLoadingAnimation();
  }, [color]);

  const animation = animationData || defaultAnimation;

  return (
    <div
      className={cn(
        "inline-flex flex-col items-center justify-center gap-2",
        className
      )}
      role="status"
      aria-label={loadingText}
    >
      <div className={cn(sizeConfig.container)}>
        <Lottie
          animationData={animation}
          loop
          autoplay
          renderer="svg"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      {showText && (
        <span
          className={cn(
            "text-gray-500 dark:text-gray-400 font-medium",
            sizeConfig.text
          )}
        >
          {loadingText}
        </span>
      )}
      <span className="sr-only">{loadingText}</span>
    </div>
  );
}

/**
 * Full-page loading overlay
 */
export function LottieLoaderOverlay({
  loadingText = "Loading...",
  size = "lg",
}: Pick<LottieLoaderProps, "loadingText" | "size">) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={loadingText}
    >
      <LottieLoader size={size} showText loadingText={loadingText} />
    </div>
  );
}

/**
 * Inline loading state for buttons and small areas
 */
export function LottieLoaderInline({
  className,
  color = BRAND_PRIMARY,
}: {
  className?: string;
  color?: string;
}) {
  return (
    <LottieLoader
      size="sm"
      className={cn("inline-flex", className)}
      color={color}
    />
  );
}

export default LottieLoader;
