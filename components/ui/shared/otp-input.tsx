"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface OtpInputProps {
    length?: number;
    value?: string;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    disabled?: boolean;
    className?: string;
    error?: boolean;
}

const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>(
    (
        {
            length = 6,
            value = "",
            onChange,
            onComplete,
            disabled = false,
            className,
            error = false,
        },
        ref
    ) => {
        const [otp, setOtp] = React.useState<string[]>(
            Array(length).fill("")
        );
        const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

        // Initialize refs array
        React.useEffect(() => {
            inputRefs.current = inputRefs.current.slice(0, length);
        }, [length]);

        // Update internal state when value prop changes
        React.useEffect(() => {
            if (value !== undefined) {
                const newOtp = value.split("").slice(0, length);
                while (newOtp.length < length) {
                    newOtp.push("");
                }
                setOtp(newOtp);
            }
        }, [value, length]);

        // Focus first input on mount
        React.useEffect(() => {
            if (!disabled && inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }
        }, [disabled]);

        const handleChange = (index: number, newValue: string) => {
            // Only allow digits
            const digit = newValue.replace(/[^0-9]/g, "");

            if (digit.length > 1) {
                // Handle paste
                handlePaste(digit, index);
                return;
            }

            const newOtp = [...otp];
            newOtp[index] = digit;
            setOtp(newOtp);

            // Notify parent
            const otpString = newOtp.join("");
            onChange?.(otpString);

            // Auto-advance to next input
            if (digit && index < length - 1) {
                inputRefs.current[index + 1]?.focus();
            }

            // Check if complete
            if (newOtp.every((val) => val !== "")) {
                onComplete?.(newOtp.join(""));
            }
        };

        const handleKeyDown = (
            index: number,
            e: React.KeyboardEvent<HTMLInputElement>
        ) => {
            // Handle backspace
            if (e.key === "Backspace") {
                e.preventDefault();
                const newOtp = [...otp];

                if (otp[index]) {
                    // Clear current box
                    newOtp[index] = "";
                    setOtp(newOtp);
                    onChange?.(newOtp.join(""));
                } else if (index > 0) {
                    // Move to previous box and clear it
                    newOtp[index - 1] = "";
                    setOtp(newOtp);
                    onChange?.(newOtp.join(""));
                    inputRefs.current[index - 1]?.focus();
                }
            }

            // Handle arrow keys
            if (e.key === "ArrowLeft" && index > 0) {
                e.preventDefault();
                inputRefs.current[index - 1]?.focus();
            }

            if (e.key === "ArrowRight" && index < length - 1) {
                e.preventDefault();
                inputRefs.current[index + 1]?.focus();
            }

            // Handle delete key
            if (e.key === "Delete") {
                e.preventDefault();
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
                onChange?.(newOtp.join(""));
            }
        };

        const handlePaste = (pastedData: string, startIndex: number) => {
            const digits = pastedData.replace(/[^0-9]/g, "").split("");
            const newOtp = [...otp];

            digits.forEach((digit, i) => {
                const index = startIndex + i;
                if (index < length) {
                    newOtp[index] = digit;
                }
            });

            setOtp(newOtp);
            onChange?.(newOtp.join(""));

            // Focus the next empty input or the last input
            const nextEmptyIndex = newOtp.findIndex((val) => val === "");
            const focusIndex =
                nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
            inputRefs.current[focusIndex]?.focus();

            // Check if complete
            if (newOtp.every((val) => val !== "")) {
                onComplete?.(newOtp.join(""));
            }
        };

        const handleFocus = (index: number) => {
            inputRefs.current[index]?.select();
        };

        return (
            <div
                ref={ref}
                className={cn("flex gap-2 justify-center", className)}
                role="group"
                aria-label="OTP input"
            >
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onFocus={() => handleFocus(index)}
                        disabled={disabled}
                        className={cn(
                            "w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-semibold",
                            "rounded-lg border-2 transition-all duration-200",
                            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            error
                                ? "border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500"
                                : "border-zinc-300 dark:border-zinc-600",
                            digit
                                ? "bg-primary/5 dark:bg-primary/10 border-primary"
                                : "bg-white dark:bg-zinc-800",
                            "text-zinc-900 dark:text-white"
                        )}
                        aria-label={`Digit ${index + 1} of ${length}`}
                    />
                ))}
            </div>
        );
    }
);

OtpInput.displayName = "OtpInput";

export { OtpInput };
