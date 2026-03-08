"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, leftIcon, rightIcon, ...props }, ref) => {
        return (
            <div className="relative flex items-center w-full">
                {leftIcon && (
                    <div className="absolute left-3 text-muted-foreground flex items-center justify-center">
                        {leftIcon}
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-lg border border-primary bg-transparent px-3 py-2 text-sm text-neutral-600 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        leftIcon && "pl-10",
                        rightIcon && "pr-10",
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                {rightIcon && (
                    <div className="absolute right-3 text-muted-foreground flex items-center justify-center">
                        {rightIcon}
                    </div>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
