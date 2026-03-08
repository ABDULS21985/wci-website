"use client";

import * as React from "react";
import { cn } from "@/components/ui/shared/lib/utils";

/* ===========================================
   PREMIUM SKELETON BASE COMPONENT
   With advanced shimmer effects
   =========================================== */

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "default" | "circular" | "text" | "rectangular";
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export function PremiumSkeleton({
  className,
  variant = "default",
  width,
  height,
  animate = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-zinc-200 dark:bg-zinc-800",
        variant === "circular" && "rounded-full",
        variant === "text" && "rounded h-4",
        variant === "rectangular" && "rounded-lg",
        variant === "default" && "rounded-lg",
        // Reduced motion: disable shimmer
        "motion-reduce:animate-none",
        className
      )}
      style={{ width, height }}
      aria-busy="true"
      aria-label="Loading"
      role="status"
      {...props}
    >
      {animate && (
        <div
          className={cn(
            "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent",
            "animate-[shimmer-slide_2s_infinite]",
            "motion-reduce:hidden"
          )}
        />
      )}
    </div>
  );
}

/* ===========================================
   CARD SKELETON
   For product/blog cards
   =========================================== */

interface CardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  showImage?: boolean;
  showMeta?: boolean;
  showButton?: boolean;
  animate?: boolean;
}

export function CardSkeleton({
  className,
  showImage = true,
  showMeta = true,
  showButton = true,
  animate = true,
  ...props
}: CardSkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden",
        className
      )}
      aria-busy="true"
      aria-label="Loading card"
      role="status"
      {...props}
    >
      {/* Image placeholder */}
      {showImage && (
        <PremiumSkeleton
          variant="rectangular"
          className="w-full aspect-video rounded-none"
          animate={animate}
        />
      )}

      <div className="p-5 space-y-4">
        {/* Meta info (date, category) */}
        {showMeta && (
          <div className="flex items-center gap-3">
            <PremiumSkeleton variant="text" width="80px" animate={animate} />
            <PremiumSkeleton variant="text" width="60px" animate={animate} />
          </div>
        )}

        {/* Title */}
        <PremiumSkeleton variant="text" className="h-6 w-3/4" animate={animate} />

        {/* Description */}
        <div className="space-y-2">
          <PremiumSkeleton variant="text" className="w-full" animate={animate} />
          <PremiumSkeleton variant="text" className="w-full" animate={animate} />
          <PremiumSkeleton variant="text" className="w-2/3" animate={animate} />
        </div>

        {/* Button/CTA */}
        {showButton && (
          <PremiumSkeleton
            variant="rectangular"
            className="h-10 w-28 mt-4"
            animate={animate}
          />
        )}
      </div>
    </div>
  );
}

/* ===========================================
   TEXT SKELETON
   For paragraphs with multiple lines
   =========================================== */

interface TextSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  lastLineWidth?: string;
  lineHeight?: string;
  gap?: "sm" | "md" | "lg";
  animate?: boolean;
}

const gapClasses = {
  sm: "space-y-1.5",
  md: "space-y-2.5",
  lg: "space-y-3.5",
};

export function TextSkeleton({
  className,
  lines = 3,
  lastLineWidth = "60%",
  lineHeight = "16px",
  gap = "md",
  animate = true,
  ...props
}: TextSkeletonProps) {
  return (
    <div
      className={cn(gapClasses[gap], className)}
      aria-busy="true"
      aria-label="Loading text"
      role="status"
      {...props}
    >
      {Array.from({ length: lines }).map((_, index) => (
        <PremiumSkeleton
          key={index}
          variant="text"
          style={{
            width: index === lines - 1 ? lastLineWidth : "100%",
            height: lineHeight,
          }}
          animate={animate}
        />
      ))}
    </div>
  );
}

/* ===========================================
   AVATAR SKELETON
   Circular with optional name beside it
   =========================================== */

interface AvatarSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showName?: boolean;
  showSubtext?: boolean;
  animate?: boolean;
}

const avatarSizes = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

export function AvatarSkeleton({
  className,
  size = "md",
  showName = true,
  showSubtext = false,
  animate = true,
  ...props
}: AvatarSkeletonProps) {
  return (
    <div
      className={cn("flex items-center gap-3", className)}
      aria-busy="true"
      aria-label="Loading user"
      role="status"
      {...props}
    >
      <PremiumSkeleton
        variant="circular"
        className={avatarSizes[size]}
        animate={animate}
      />
      {(showName || showSubtext) && (
        <div className="space-y-2 flex-1">
          {showName && (
            <PremiumSkeleton variant="text" className="h-4 w-24" animate={animate} />
          )}
          {showSubtext && (
            <PremiumSkeleton variant="text" className="h-3 w-32" animate={animate} />
          )}
        </div>
      )}
    </div>
  );
}

/* ===========================================
   TABLE ROW SKELETON
   For data tables
   =========================================== */

interface TableRowSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  showCheckbox?: boolean;
  showAvatar?: boolean;
  showActions?: boolean;
  animate?: boolean;
}

export function TableRowSkeleton({
  className,
  columns = 4,
  showCheckbox = false,
  showAvatar = false,
  showActions = false,
  animate = true,
  ...props
}: TableRowSkeletonProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800",
        className
      )}
      aria-busy="true"
      aria-label="Loading row"
      role="status"
      {...props}
    >
      {/* Checkbox */}
      {showCheckbox && (
        <PremiumSkeleton
          variant="rectangular"
          className="h-4 w-4 rounded"
          animate={animate}
        />
      )}

      {/* Avatar */}
      {showAvatar && (
        <PremiumSkeleton
          variant="circular"
          className="h-8 w-8 flex-shrink-0"
          animate={animate}
        />
      )}

      {/* Data columns */}
      {Array.from({ length: columns }).map((_, index) => (
        <PremiumSkeleton
          key={index}
          variant="text"
          className={cn(
            "h-4",
            index === 0 ? "w-40 flex-shrink-0" : "flex-1"
          )}
          animate={animate}
        />
      ))}

      {/* Actions */}
      {showActions && (
        <div className="flex items-center gap-2 flex-shrink-0">
          <PremiumSkeleton
            variant="rectangular"
            className="h-8 w-8 rounded"
            animate={animate}
          />
          <PremiumSkeleton
            variant="rectangular"
            className="h-8 w-8 rounded"
            animate={animate}
          />
        </div>
      )}
    </div>
  );
}

/* ===========================================
   HERO SKELETON
   For hero section loading states
   =========================================== */

interface HeroSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  showBadge?: boolean;
  showButtons?: boolean;
  showImage?: boolean;
  animate?: boolean;
}

export function HeroSkeleton({
  className,
  showBadge = true,
  showButtons = true,
  showImage = true,
  animate = true,
  ...props
}: HeroSkeletonProps) {
  return (
    <div
      className={cn(
        "w-full py-16 md:py-24 lg:py-32",
        className
      )}
      aria-busy="true"
      aria-label="Loading hero section"
      role="status"
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content side */}
          <div className="space-y-6">
            {/* Badge */}
            {showBadge && (
              <PremiumSkeleton
                variant="rectangular"
                className="h-8 w-40 rounded-full"
                animate={animate}
              />
            )}

            {/* Heading */}
            <div className="space-y-3">
              <PremiumSkeleton variant="text" className="h-12 w-full" animate={animate} />
              <PremiumSkeleton variant="text" className="h-12 w-4/5" animate={animate} />
            </div>

            {/* Subheading */}
            <div className="space-y-2">
              <PremiumSkeleton variant="text" className="h-5 w-full" animate={animate} />
              <PremiumSkeleton variant="text" className="h-5 w-3/4" animate={animate} />
            </div>

            {/* Buttons */}
            {showButtons && (
              <div className="flex flex-wrap gap-4 pt-4">
                <PremiumSkeleton
                  variant="rectangular"
                  className="h-12 w-36"
                  animate={animate}
                />
                <PremiumSkeleton
                  variant="rectangular"
                  className="h-12 w-32"
                  animate={animate}
                />
              </div>
            )}

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <PremiumSkeleton
                    variant="circular"
                    className="h-5 w-5"
                    animate={animate}
                  />
                  <PremiumSkeleton variant="text" className="h-4 w-16" animate={animate} />
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          {showImage && (
            <div className="relative">
              <PremiumSkeleton
                variant="rectangular"
                className="w-full aspect-[4/3] rounded-2xl"
                animate={animate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===========================================
   PRODUCT CARD SKELETON
   Specific to e-commerce product cards
   =========================================== */

interface ProductCardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  showBadge?: boolean;
  showRating?: boolean;
  showPrice?: boolean;
  showButton?: boolean;
  animate?: boolean;
}

export function ProductCardSkeleton({
  className,
  showBadge = true,
  showRating = true,
  showPrice = true,
  showButton = true,
  animate = true,
  ...props
}: ProductCardSkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden group",
        className
      )}
      aria-busy="true"
      aria-label="Loading product"
      role="status"
      {...props}
    >
      {/* Product image */}
      <div className="relative aspect-square">
        <PremiumSkeleton
          variant="rectangular"
          className="w-full h-full rounded-none"
          animate={animate}
        />
        {/* Badge overlay */}
        {showBadge && (
          <div className="absolute top-3 left-3">
            <PremiumSkeleton
              variant="rectangular"
              className="h-6 w-16 rounded-full"
              animate={animate}
            />
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <PremiumSkeleton variant="text" className="h-3 w-20" animate={animate} />

        {/* Title */}
        <PremiumSkeleton variant="text" className="h-5 w-3/4" animate={animate} />

        {/* Rating */}
        {showRating && (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <PremiumSkeleton
                  key={i}
                  variant="rectangular"
                  className="h-4 w-4 rounded"
                  animate={animate}
                />
              ))}
            </div>
            <PremiumSkeleton variant="text" className="h-3 w-12" animate={animate} />
          </div>
        )}

        {/* Price */}
        {showPrice && (
          <div className="flex items-center gap-2 pt-1">
            <PremiumSkeleton variant="text" className="h-6 w-20" animate={animate} />
            <PremiumSkeleton variant="text" className="h-4 w-14 opacity-50" animate={animate} />
          </div>
        )}

        {/* Add to cart button */}
        {showButton && (
          <PremiumSkeleton
            variant="rectangular"
            className="h-10 w-full mt-3"
            animate={animate}
          />
        )}
      </div>
    </div>
  );
}

/* ===========================================
   BLOG POST SKELETON
   For blog post cards
   =========================================== */

interface BlogPostSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "horizontal" | "vertical";
  showAuthor?: boolean;
  showReadTime?: boolean;
  animate?: boolean;
}

export function BlogPostSkeleton({
  className,
  variant = "vertical",
  showAuthor = true,
  showReadTime = true,
  animate = true,
  ...props
}: BlogPostSkeletonProps) {
  if (variant === "horizontal") {
    return (
      <div
        className={cn(
          "flex gap-6 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900",
          className
        )}
        aria-busy="true"
        aria-label="Loading blog post"
        role="status"
        {...props}
      >
        {/* Thumbnail */}
        <PremiumSkeleton
          variant="rectangular"
          className="w-48 h-32 flex-shrink-0 rounded-lg"
          animate={animate}
        />

        {/* Content */}
        <div className="flex-1 space-y-3 py-1">
          {/* Category & date */}
          <div className="flex items-center gap-3">
            <PremiumSkeleton variant="text" className="h-4 w-16" animate={animate} />
            <PremiumSkeleton variant="text" className="h-4 w-20" animate={animate} />
          </div>

          {/* Title */}
          <PremiumSkeleton variant="text" className="h-6 w-3/4" animate={animate} />

          {/* Excerpt */}
          <PremiumSkeleton variant="text" className="h-4 w-full" animate={animate} />

          {/* Author */}
          {showAuthor && (
            <div className="flex items-center gap-2 pt-2">
              <PremiumSkeleton variant="circular" className="h-6 w-6" animate={animate} />
              <PremiumSkeleton variant="text" className="h-4 w-24" animate={animate} />
              {showReadTime && (
                <>
                  <span className="text-zinc-300 dark:text-zinc-700">|</span>
                  <PremiumSkeleton variant="text" className="h-4 w-16" animate={animate} />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden",
        className
      )}
      aria-busy="true"
      aria-label="Loading blog post"
      role="status"
      {...props}
    >
      {/* Featured image */}
      <PremiumSkeleton
        variant="rectangular"
        className="w-full aspect-video rounded-none"
        animate={animate}
      />

      <div className="p-5 space-y-4">
        {/* Category & date */}
        <div className="flex items-center gap-3">
          <PremiumSkeleton variant="text" className="h-4 w-16" animate={animate} />
          <PremiumSkeleton variant="text" className="h-4 w-24" animate={animate} />
        </div>

        {/* Title */}
        <PremiumSkeleton variant="text" className="h-6 w-full" animate={animate} />

        {/* Excerpt */}
        <div className="space-y-2">
          <PremiumSkeleton variant="text" className="w-full" animate={animate} />
          <PremiumSkeleton variant="text" className="w-2/3" animate={animate} />
        </div>

        {/* Author */}
        {showAuthor && (
          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <PremiumSkeleton variant="circular" className="h-8 w-8" animate={animate} />
              <PremiumSkeleton variant="text" className="h-4 w-28" animate={animate} />
            </div>
            {showReadTime && (
              <PremiumSkeleton variant="text" className="h-4 w-16" animate={animate} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ===========================================
   STATS CARD SKELETON
   For dashboard stats
   =========================================== */

interface StatsCardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  showIcon?: boolean;
  showTrend?: boolean;
  animate?: boolean;
}

export function StatsCardSkeleton({
  className,
  showIcon = true,
  showTrend = true,
  animate = true,
  ...props
}: StatsCardSkeletonProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900",
        className
      )}
      aria-busy="true"
      aria-label="Loading stats"
      role="status"
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          {/* Label */}
          <PremiumSkeleton variant="text" className="h-4 w-24" animate={animate} />

          {/* Value */}
          <PremiumSkeleton variant="text" className="h-8 w-32" animate={animate} />

          {/* Trend */}
          {showTrend && (
            <div className="flex items-center gap-2">
              <PremiumSkeleton variant="text" className="h-4 w-12" animate={animate} />
              <PremiumSkeleton variant="text" className="h-4 w-20" animate={animate} />
            </div>
          )}
        </div>

        {/* Icon */}
        {showIcon && (
          <PremiumSkeleton
            variant="rectangular"
            className="h-12 w-12 rounded-lg flex-shrink-0"
            animate={animate}
          />
        )}
      </div>
    </div>
  );
}

/* ===========================================
   NAV SKELETON
   For navigation/menu loading
   =========================================== */

interface NavSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: number;
  showLogo?: boolean;
  showButton?: boolean;
  animate?: boolean;
}

export function NavSkeleton({
  className,
  items = 5,
  showLogo = true,
  showButton = true,
  animate = true,
  ...props
}: NavSkeletonProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800",
        className
      )}
      aria-busy="true"
      aria-label="Loading navigation"
      role="status"
      {...props}
    >
      {/* Logo */}
      {showLogo && (
        <PremiumSkeleton
          variant="rectangular"
          className="h-8 w-32"
          animate={animate}
        />
      )}

      {/* Nav items */}
      <div className="flex items-center gap-6">
        {Array.from({ length: items }).map((_, i) => (
          <PremiumSkeleton
            key={i}
            variant="text"
            className="h-4 w-16"
            animate={animate}
          />
        ))}
      </div>

      {/* CTA button */}
      {showButton && (
        <PremiumSkeleton
          variant="rectangular"
          className="h-10 w-28"
          animate={animate}
        />
      )}
    </div>
  );
}

/* ===========================================
   GRID SKELETON
   For grid layouts
   =========================================== */

interface GridSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: number;
  columns?: 2 | 3 | 4;
  itemComponent?: React.ComponentType<{ animate?: boolean }>;
  animate?: boolean;
}

export function GridSkeleton({
  className,
  items = 6,
  columns = 3,
  itemComponent: ItemComponent = ProductCardSkeleton,
  animate = true,
  ...props
}: GridSkeletonProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div
      className={cn("grid gap-6", gridCols[columns], className)}
      aria-busy="true"
      aria-label="Loading grid"
      role="status"
      {...props}
    >
      {Array.from({ length: items }).map((_, i) => (
        <ItemComponent key={i} animate={animate} />
      ))}
    </div>
  );
}

/* ===========================================
   SIDEBAR SKELETON
   For sidebars/aside content
   =========================================== */

interface SidebarSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  showProfile?: boolean;
  menuItems?: number;
  animate?: boolean;
}

export function SidebarSkeleton({
  className,
  showProfile = true,
  menuItems = 6,
  animate = true,
  ...props
}: SidebarSkeletonProps) {
  return (
    <div
      className={cn(
        "w-64 p-4 space-y-6 border-r border-zinc-200 dark:border-zinc-800 h-full",
        className
      )}
      aria-busy="true"
      aria-label="Loading sidebar"
      role="status"
      {...props}
    >
      {/* Logo */}
      <PremiumSkeleton
        variant="rectangular"
        className="h-8 w-32"
        animate={animate}
      />

      {/* Profile */}
      {showProfile && (
        <div className="flex items-center gap-3 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <PremiumSkeleton variant="circular" className="h-10 w-10" animate={animate} />
          <div className="space-y-2">
            <PremiumSkeleton variant="text" className="h-4 w-24" animate={animate} />
            <PremiumSkeleton variant="text" className="h-3 w-16" animate={animate} />
          </div>
        </div>
      )}

      {/* Menu items */}
      <div className="space-y-2">
        {Array.from({ length: menuItems }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-2">
            <PremiumSkeleton
              variant="rectangular"
              className="h-5 w-5 rounded"
              animate={animate}
            />
            <PremiumSkeleton variant="text" className="h-4 w-28" animate={animate} />
          </div>
        ))}
      </div>
    </div>
  );
}
