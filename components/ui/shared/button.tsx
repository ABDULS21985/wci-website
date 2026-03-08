"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-white hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                // Premium variants
                gradient:
                    "bg-gradient-to-r from-primary via-indigo-500 to-purple-500 text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all",
                glass:
                    "bg-white/70 dark:bg-black/50 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg hover:bg-white/80 dark:hover:bg-black/60",
                glow:
                    "bg-primary text-white shadow-[0_0_20px_rgba(30,77,183,0.5)] hover:shadow-[0_0_30px_rgba(30,77,183,0.7)] transition-shadow",
                "outline-gradient":
                    "relative bg-transparent border-2 border-transparent [background:linear-gradient(white,white),linear-gradient(135deg,#1E4DB7,#6366F1,#8B5CF6)] [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] text-primary hover:text-white hover:[background:linear-gradient(135deg,#1E4DB7,#6366F1,#8B5CF6)]",
            },
            size: {
                default: "h-10 px-6 py-2",
                sm: "h-9 rounded-lg px-3",
                lg: "h-11 rounded-lg px-8",
                icon: "h-10 w-10",
                // Premium size
                "2xl": "h-16 px-12 text-lg rounded-2xl font-semibold",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    /** Adds a moving shine effect on hover */
    shine?: boolean;
    /** Adds a subtle pulse animation */
    pulse?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            asChild = false,
            isLoading = false,
            leftIcon,
            rightIcon,
            shine = false,
            pulse = false,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";

        // Build effect classes
        const effectClasses = cn(
            shine && "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:before:animate-[shimmer_1.5s_infinite]",
            pulse && "animate-pulse"
        );

        if (asChild) {
            return (
                <Comp
                    className={cn(buttonVariants({ variant, size, className }), effectClasses)}
                    ref={ref}
                    disabled={isLoading || disabled}
                    {...props}
                >
                    {children}
                </Comp>
            )
        }

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }), effectClasses)}
                ref={ref}
                disabled={isLoading || disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
