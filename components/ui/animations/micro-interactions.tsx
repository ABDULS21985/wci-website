"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/components/ui/shared/lib/utils";

/* ===========================================
   PRESS EFFECT WRAPPER
   =========================================== */
interface PressEffectProps {
  children: ReactNode;
  className?: string;
  /** Scale value when pressed (default: 0.98) */
  scale?: number;
  /** Whether the effect is disabled */
  disabled?: boolean;
}

export function PressEffect({
  children,
  className,
  scale = 0.98,
  disabled = false,
}: PressEffectProps) {
  return (
    <div
      className={cn(
        "transition-transform duration-150",
        !disabled && "active:scale-[var(--press-scale)]",
        className
      )}
      style={{ "--press-scale": scale } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/* ===========================================
   HOVER LIFT EFFECT
   =========================================== */
interface HoverLiftProps {
  children: ReactNode;
  className?: string;
  /** Lift distance in pixels (default: 4) */
  lift?: number;
  /** Whether the effect is disabled */
  disabled?: boolean;
}

export function HoverLift({
  children,
  className,
  lift = 4,
  disabled = false,
}: HoverLiftProps) {
  return (
    <div
      className={cn(
        "transition-all duration-300",
        !disabled &&
          "hover:-translate-y-[var(--lift)] hover:shadow-lg",
        className
      )}
      style={
        {
          "--lift": `${lift}px`,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

/* ===========================================
   HOVER SCALE EFFECT
   =========================================== */
interface HoverScaleProps {
  children: ReactNode;
  className?: string;
  /** Scale value on hover (default: 1.02) */
  scale?: number;
  /** Whether the effect is disabled */
  disabled?: boolean;
}

export function HoverScale({
  children,
  className,
  scale = 1.02,
  disabled = false,
}: HoverScaleProps) {
  return (
    <div
      className={cn(
        "transition-transform duration-300",
        !disabled && "hover:scale-[var(--hover-scale)]",
        className
      )}
      style={
        {
          "--hover-scale": scale,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

/* ===========================================
   HOVER GLOW EFFECT
   =========================================== */
interface HoverGlowProps {
  children: ReactNode;
  className?: string;
  /** Glow color (default: primary) */
  color?: string;
  /** Glow intensity (default: 0.3) */
  intensity?: number;
  /** Whether the effect is disabled */
  disabled?: boolean;
}

export function HoverGlow({
  children,
  className,
  color = "30, 77, 183", // RGB values for primary
  intensity = 0.3,
  disabled = false,
}: HoverGlowProps) {
  return (
    <div
      className={cn(
        "transition-shadow duration-300",
        !disabled && "hover:shadow-[0_0_20px_var(--glow-color)]",
        className
      )}
      style={
        {
          "--glow-color": `rgba(${color}, ${intensity})`,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

/* ===========================================
   INTERACTIVE CARD
   =========================================== */
interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  /** Enable press effect */
  pressEffect?: boolean;
  /** Enable lift on hover */
  hoverLift?: boolean;
  /** Enable scale on hover */
  hoverScale?: boolean;
  /** Enable glow on hover */
  hoverGlow?: boolean;
  /** Whether interactions are disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
}

export function InteractiveCard({
  children,
  className,
  pressEffect = true,
  hoverLift = true,
  hoverScale = false,
  hoverGlow = false,
  disabled = false,
  onClick,
}: InteractiveCardProps) {
  return (
    <div
      className={cn(
        "transition-all duration-300 cursor-pointer",
        pressEffect && !disabled && "active:scale-[0.98]",
        hoverLift && !disabled && "hover:-translate-y-1 hover:shadow-lg",
        hoverScale && !disabled && "hover:scale-[1.02]",
        hoverGlow && !disabled && "hover:shadow-[0_0_20px_rgba(30,77,183,0.2)]",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onClick={disabled ? undefined : onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onKeyDown={
        onClick && !disabled
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

/* ===========================================
   RIPPLE BUTTON (Material-style ripple)
   =========================================== */
interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Ripple color */
  rippleColor?: string;
}

export const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ children, className, rippleColor = "rgba(255, 255, 255, 0.3)", onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: ${rippleColor};
        transform: scale(0);
        animation: ripple-effect 0.6s linear;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
      `;

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);

      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        onClick={handleClick}
        {...props}
      >
        {children}
        <style jsx global>{`
          @keyframes ripple-effect {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `}</style>
      </button>
    );
  }
);

RippleButton.displayName = "RippleButton";

/* ===========================================
   PULSE INDICATOR
   =========================================== */
interface PulseIndicatorProps {
  className?: string;
  /** Color of the pulse */
  color?: "primary" | "success" | "warning" | "error" | "info";
  /** Size of the indicator */
  size?: "sm" | "md" | "lg";
}

const pulseColors = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  info: "bg-info",
};

const pulseSizes = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

export function PulseIndicator({
  className,
  color = "primary",
  size = "md",
}: PulseIndicatorProps) {
  return (
    <span className={cn("relative flex", pulseSizes[size], className)}>
      <span
        className={cn(
          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
          pulseColors[color]
        )}
      />
      <span
        className={cn(
          "relative inline-flex rounded-full h-full w-full",
          pulseColors[color]
        )}
      />
    </span>
  );
}

/* ===========================================
   TYPING INDICATOR
   =========================================== */
interface TypingIndicatorProps {
  className?: string;
}

export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 bg-neutral-gray rounded-full animate-bounce"
          style={{
            animationDelay: `${i * 150}ms`,
            animationDuration: "0.6s",
          }}
        />
      ))}
    </div>
  );
}

const MicroInteractions = {
  PressEffect,
  HoverLift,
  HoverScale,
  HoverGlow,
  InteractiveCard,
  RippleButton,
  PulseIndicator,
  TypingIndicator,
};

export default MicroInteractions;
