"use client";

import * as React from "react";
import { cn } from "@/components/ui/shared/lib/utils";

/* ===========================================
   BASE SKELETON COMPONENT
   =========================================== */
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Animation style */
  animation?: "pulse" | "shimmer" | "none";
  /** Border radius preset */
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

const roundedClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

function Skeleton({
  className,
  animation = "pulse",
  rounded = "md",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-muted",
        roundedClasses[rounded],
        animation === "pulse" && "animate-pulse",
        animation === "shimmer" && "animate-shimmer",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

/* ===========================================
   SKELETON TEXT
   =========================================== */
interface SkeletonTextProps extends SkeletonProps {
  /** Number of lines */
  lines?: number;
  /** Width of the last line (percentage or CSS value) */
  lastLineWidth?: string;
  /** Gap between lines */
  gap?: "sm" | "md" | "lg";
}

const gapClasses = {
  sm: "space-y-1",
  md: "space-y-2",
  lg: "space-y-3",
};

function SkeletonText({
  className,
  lines = 3,
  lastLineWidth = "60%",
  gap = "md",
  animation = "pulse",
  rounded = "sm",
  ...props
}: SkeletonTextProps) {
  return (
    <div className={cn(gapClasses[gap], className)} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          animation={animation}
          rounded={rounded}
          className="h-4"
          style={{
            width: index === lines - 1 ? lastLineWidth : "100%",
          }}
        />
      ))}
    </div>
  );
}

/* ===========================================
   SKELETON AVATAR
   =========================================== */
interface SkeletonAvatarProps extends SkeletonProps {
  /** Size of the avatar */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const avatarSizes = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

function SkeletonAvatar({
  className,
  size = "md",
  animation = "pulse",
  ...props
}: SkeletonAvatarProps) {
  return (
    <Skeleton
      className={cn(avatarSizes[size], className)}
      animation={animation}
      rounded="full"
      {...props}
    />
  );
}

/* ===========================================
   SKELETON BUTTON
   =========================================== */
interface SkeletonButtonProps extends SkeletonProps {
  /** Button size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Full width button */
  fullWidth?: boolean;
}

const buttonSizes = {
  sm: "h-8 w-20",
  md: "h-10 w-24",
  lg: "h-12 w-32",
  xl: "h-14 w-40",
};

function SkeletonButton({
  className,
  size = "md",
  fullWidth = false,
  animation = "pulse",
  rounded = "lg",
  ...props
}: SkeletonButtonProps) {
  return (
    <Skeleton
      className={cn(
        buttonSizes[size],
        fullWidth && "w-full",
        className
      )}
      animation={animation}
      rounded={rounded}
      {...props}
    />
  );
}

/* ===========================================
   SKELETON IMAGE
   =========================================== */
interface SkeletonImageProps extends SkeletonProps {
  /** Aspect ratio */
  aspectRatio?: "square" | "video" | "portrait" | "wide";
}

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

function SkeletonImage({
  className,
  aspectRatio = "video",
  animation = "pulse",
  rounded = "lg",
  ...props
}: SkeletonImageProps) {
  return (
    <Skeleton
      className={cn(
        "w-full",
        aspectRatioClasses[aspectRatio],
        className
      )}
      animation={animation}
      rounded={rounded}
      {...props}
    />
  );
}

/* ===========================================
   SKELETON CARD
   =========================================== */
interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show image placeholder */
  showImage?: boolean;
  /** Show avatar */
  showAvatar?: boolean;
  /** Number of text lines */
  textLines?: number;
  /** Show footer */
  showFooter?: boolean;
  /** Animation style */
  animation?: "pulse" | "shimmer" | "none";
}

function SkeletonCard({
  className,
  showImage = true,
  showAvatar = false,
  textLines = 3,
  showFooter = false,
  animation = "pulse",
  ...props
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4 space-y-4",
        className
      )}
      {...props}
    >
      {/* Image */}
      {showImage && (
        <SkeletonImage animation={animation} rounded="md" />
      )}

      {/* Header with optional avatar */}
      {showAvatar && (
        <div className="flex items-center gap-3">
          <SkeletonAvatar animation={animation} size="md" />
          <div className="flex-1 space-y-2">
            <Skeleton animation={animation} className="h-4 w-3/4" />
            <Skeleton animation={animation} className="h-3 w-1/2" />
          </div>
        </div>
      )}

      {/* Title (if no avatar) */}
      {!showAvatar && (
        <Skeleton animation={animation} className="h-6 w-3/4" />
      )}

      {/* Content */}
      <SkeletonText animation={animation} lines={textLines} />

      {/* Footer */}
      {showFooter && (
        <div className="flex items-center justify-between pt-2">
          <Skeleton animation={animation} className="h-4 w-20" />
          <SkeletonButton animation={animation} size="sm" />
        </div>
      )}
    </div>
  );
}

/* ===========================================
   SKELETON LIST ITEM
   =========================================== */
interface SkeletonListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show avatar/icon */
  showAvatar?: boolean;
  /** Show secondary action */
  showAction?: boolean;
  /** Animation style */
  animation?: "pulse" | "shimmer" | "none";
}

function SkeletonListItem({
  className,
  showAvatar = true,
  showAction = false,
  animation = "pulse",
  ...props
}: SkeletonListItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4",
        className
      )}
      {...props}
    >
      {showAvatar && <SkeletonAvatar animation={animation} size="md" />}
      <div className="flex-1 space-y-2">
        <Skeleton animation={animation} className="h-4 w-3/4" />
        <Skeleton animation={animation} className="h-3 w-1/2" />
      </div>
      {showAction && <Skeleton animation={animation} className="h-8 w-8 rounded-full" />}
    </div>
  );
}

/* ===========================================
   SKELETON TABLE
   =========================================== */
interface SkeletonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of rows */
  rows?: number;
  /** Number of columns */
  columns?: number;
  /** Show header */
  showHeader?: boolean;
  /** Animation style */
  animation?: "pulse" | "shimmer" | "none";
}

function SkeletonTable({
  className,
  rows = 5,
  columns = 4,
  showHeader = true,
  animation = "pulse",
  ...props
}: SkeletonTableProps) {
  return (
    <div
      className={cn(
        "w-full border border-border rounded-lg overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Header */}
      {showHeader && (
        <div className="flex gap-4 p-4 bg-muted/50 border-b border-border">
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton
              key={`header-${index}`}
              animation={animation}
              className="h-4 flex-1"
            />
          ))}
        </div>
      )}

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className={cn(
            "flex gap-4 p-4",
            rowIndex !== rows - 1 && "border-b border-border"
          )}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              animation={animation}
              className="h-4 flex-1"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ===========================================
   SKELETON FORM
   =========================================== */
interface SkeletonFormProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of fields */
  fields?: number;
  /** Show submit button */
  showButton?: boolean;
  /** Animation style */
  animation?: "pulse" | "shimmer" | "none";
}

function SkeletonForm({
  className,
  fields = 3,
  showButton = true,
  animation = "pulse",
  ...props
}: SkeletonFormProps) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="space-y-2">
          {/* Label */}
          <Skeleton animation={animation} className="h-4 w-24" />
          {/* Input */}
          <Skeleton animation={animation} className="h-10 w-full" rounded="lg" />
        </div>
      ))}

      {showButton && (
        <SkeletonButton
          animation={animation}
          size="lg"
          fullWidth
        />
      )}
    </div>
  );
}

/* ===========================================
   SKELETON STATS
   =========================================== */
interface SkeletonStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of stat items */
  count?: number;
  /** Animation style */
  animation?: "pulse" | "shimmer" | "none";
}

function SkeletonStats({
  className,
  count = 4,
  animation = "pulse",
  ...props
}: SkeletonStatsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-4",
        className
      )}
      {...props}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="p-4 rounded-lg border border-border space-y-2"
        >
          <Skeleton animation={animation} className="h-8 w-16" />
          <Skeleton animation={animation} className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonImage,
  SkeletonCard,
  SkeletonListItem,
  SkeletonTable,
  SkeletonForm,
  SkeletonStats,
};
