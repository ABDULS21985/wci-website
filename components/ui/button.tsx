"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/components/ui/shared/lib/utils";
import { Loader2 } from "lucide-react";

/* ===========================================
   ENHANCED BUTTON VARIANTS

   Variants:
   - primary: Gradient background with hover effect
   - secondary: Outline style with border
   - ghost: Text only, subtle hover
   - destructive: Error/danger actions
   - link: Underlined link style
   Sizes:
   - sm: 32px height
   - md: 40px height (default)
   - lg: 48px height
   - xl: 56px height
   - icon: Square button for icons
   =========================================== */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap font-medium",
    "rounded-lg text-sm",
    "ring-offset-background",
    "transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    // Micro-interaction: press feedback
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary: Gradient with hover transition
        primary: [
          "bg-gradient-to-r from-primary to-secondary",
          "text-white",
          "shadow-md shadow-primary/20",
          "hover:from-[#2558C8] hover:to-[#1945A0]",
          "hover:shadow-lg hover:shadow-primary/30",
          "hover:-translate-y-0.5",
        ].join(" "),

        // Secondary: Outline style
        secondary: [
          "border-2 border-primary",
          "bg-transparent",
          "text-primary",
          "hover:bg-primary hover:text-white",
          "hover:shadow-md hover:shadow-primary/20",
        ].join(" "),

        // Ghost: Text only, minimal
        ghost: [
          "bg-transparent",
          "text-foreground",
          "hover:bg-neutral-light",
          "hover:text-primary",
        ].join(" "),

        // Destructive: Error actions
        destructive: [
          "bg-destructive",
          "text-destructive-foreground",
          "hover:bg-destructive/90",
          "shadow-md shadow-destructive/20",
        ].join(" "),

        // Link: Underlined text
        link: [
          "text-primary",
          "underline-offset-4",
          "hover:underline",
          "active:scale-100", // Override press effect for links
        ].join(" "),

        // Outline: Similar to secondary but lighter
        outline: [
          "border border-input",
          "bg-background",
          "hover:bg-accent hover:text-accent-foreground",
        ].join(" "),

        // Accent: Orange gradient
        accent: [
          "bg-gradient-to-r from-accent-orange to-accent-red",
          "text-white",
          "shadow-md shadow-accent-orange/20",
          "hover:from-[#FFA940] hover:to-[#F07D35]",
          "hover:shadow-lg hover:shadow-accent-orange/30",
          "hover:-translate-y-0.5",
        ].join(" "),
      },
      size: {
        sm: "h-9 px-3 text-xs rounded-md", // 36px - slightly increased for touch
        md: "h-11 px-4 text-sm", // 44px - meets touch target minimum
        lg: "h-12 px-6 text-base", // 48px
        xl: "h-14 px-8 text-lg font-semibold", // 56px
        icon: "h-11 w-11 p-0", // 44px - meets touch target minimum
        "icon-sm": "h-9 w-9 p-0", // 36px - increased from 32px
        "icon-lg": "h-12 w-12 p-0", // 48px
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      rounded: "default",
    },
  }
);

/* ===========================================
   LOADING SPINNER
   =========================================== */
function ButtonSpinner({ className }: { className?: string }) {
  return (
    <Loader2
      className={cn("animate-spin", className)}
      aria-hidden="true"
    />
  );
}

/* ===========================================
   BUTTON COMPONENT
   =========================================== */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child component (for Next.js Link, etc.) */
  asChild?: boolean;
  /** Show loading state with spinner */
  isLoading?: boolean;
  /** Loading text to display */
  loadingText?: string;
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      rounded,
      asChild = false,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = isLoading || disabled;

    // Determine spinner size based on button size
    const spinnerSize = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
      xl: "h-6 w-6",
      icon: "h-4 w-4",
      "icon-sm": "h-3 w-3",
      "icon-lg": "h-5 w-5",
    }[size || "md"];

    // For asChild (e.g., wrapping Next.js Link), render simplified version
    if (asChild) {
      return (
        <Comp
          className={cn(
            buttonVariants({ variant, size, fullWidth, rounded, className })
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, fullWidth, rounded, className }),
          isLoading && "cursor-wait"
        )}
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {/* Loading state */}
        {isLoading && (
          <>
            <ButtonSpinner className={spinnerSize} />
            {loadingText && <span>{loadingText}</span>}
            {!loadingText && children}
          </>
        )}

        {/* Normal state */}
        {!isLoading && (
          <>
            {leftIcon && (
              <span className="inline-flex shrink-0">{leftIcon}</span>
            )}
            {children}
            {rightIcon && (
              <span className="inline-flex shrink-0">{rightIcon}</span>
            )}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

/* ===========================================
   BUTTON GROUP
   =========================================== */
interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  /** Orientation of the button group */
  orientation?: "horizontal" | "vertical";
  /** Whether buttons should be attached */
  attached?: boolean;
}

function ButtonGroup({
  children,
  className,
  orientation = "horizontal",
  attached = false,
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex",
        orientation === "vertical" ? "flex-col" : "flex-row",
        attached && orientation === "horizontal" && "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:-ml-px",
        attached && orientation === "vertical" && "[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>*:not(:first-child)]:-mt-px",
        !attached && "gap-2",
        className
      )}
      role="group"
    >
      {children}
    </div>
  );
}

/* ===========================================
   ICON BUTTON
   =========================================== */
interface IconButtonProps
  extends Omit<ButtonProps, "leftIcon" | "rightIcon" | "children"> {
  /** Icon to display */
  icon: React.ReactNode;
  /** Accessible label for the button */
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = "icon", ...props }, ref) => {
    return (
      <Button ref={ref} size={size} {...props}>
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

export { Button, ButtonGroup, IconButton, buttonVariants };
