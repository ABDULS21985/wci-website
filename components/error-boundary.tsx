"use client";

import { Component, ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/components/ui/shared/lib/utils";
import { Button } from "./ui/button";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
} from "lucide-react";

/* ===========================================
   ERROR BOUNDARY COMPONENT
   =========================================== */

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <DefaultErrorFallback
            error={this.state.error}
            reset={this.handleReset}
          />
        )
      );
    }

    return this.props.children;
  }
}

/* ===========================================
   DEFAULT ERROR FALLBACK COMPONENT
   =========================================== */

interface DefaultErrorFallbackProps {
  error?: Error;
  reset?: () => void;
  showDetails?: boolean;
  className?: string;
}

export function DefaultErrorFallback({
  error,
  reset,
  showDetails = true,
  className,
}: DefaultErrorFallbackProps) {
  const [showStack, setShowStack] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyError = async () => {
    if (error) {
      const errorText = `Error: ${error.message}\n\nStack Trace:\n${error.stack || "No stack trace available"}`;
      await navigator.clipboard.writeText(errorText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={cn(
        "min-h-[50vh] flex items-center justify-center px-4 py-12",
        className
      )}
    >
      <div className="max-w-lg w-full text-center">
        {/* Animated Error Icon */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          {/* Pulsing background */}
          <div className="absolute inset-0 rounded-full bg-error/20 animate-pulse-scale" />
          {/* Rotating ring */}
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-error/40 animate-spin-slow" />
          {/* Icon container */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-error to-error-dark flex items-center justify-center shadow-lg shadow-error/30">
            <AlertTriangle className="w-8 h-8 text-white animate-bounce-subtle" />
          </div>
        </div>

        {/* Error Title */}
        <h2 className="text-fluid-2xl font-bold text-foreground mb-3 animate-fade-in">
          Oops! Something went wrong
        </h2>

        {/* Error Description */}
        <p className="text-neutral-gray mb-6 animate-fade-in delay-100">
          We encountered an unexpected error. Don&apos;t worry, our team has been
          notified and we&apos;re working to fix it.
        </p>

        {/* Error Message (if available) */}
        {showDetails && error?.message && (
          <div className="mb-6 animate-fade-in delay-200">
            <div className="bg-surface-1 rounded-xl p-4 border border-border">
              <p className="text-sm text-neutral-gray font-mono break-words">
                {error.message}
              </p>

              {/* Stack Trace Toggle */}
              {error.stack && (
                <button
                  onClick={() => setShowStack(!showStack)}
                  className="mt-3 flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors mx-auto"
                >
                  {showStack ? (
                    <>
                      <ChevronUp className="w-3 h-3" />
                      Hide details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3" />
                      Show details
                    </>
                  )}
                </button>
              )}

              {/* Stack Trace */}
              {showStack && error.stack && (
                <div className="mt-3 relative">
                  <pre className="text-xs text-left text-neutral-gray font-mono bg-surface-2 rounded-lg p-3 overflow-x-auto max-h-48 overflow-y-auto">
                    {error.stack}
                  </pre>
                  <button
                    onClick={handleCopyError}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-surface-3 hover:bg-surface-4 transition-colors"
                    aria-label="Copy error details"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-success" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-neutral-gray" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in delay-300">
          {reset && (
            <Button
              onClick={reset}
              variant="primary"
              size="lg"
              leftIcon={<RefreshCw className="w-4 h-4" />}
              className="press-effect"
            >
              Try Again
            </Button>
          )}
          <Button
            asChild
            variant="secondary"
            size="lg"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Report Error Link */}
        <div className="mt-6 animate-fade-in delay-400">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm text-neutral-gray hover:text-primary transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Report this issue
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ===========================================
   COMPACT ERROR FALLBACK
   For use in smaller sections/components
   =========================================== */

interface CompactErrorFallbackProps {
  error?: Error;
  reset?: () => void;
  message?: string;
  className?: string;
}

export function CompactErrorFallback({
  error,
  reset,
  message = "Something went wrong",
  className,
}: CompactErrorFallbackProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-6 rounded-xl bg-surface-1 border border-border",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mb-3">
        <AlertTriangle className="w-6 h-6 text-error" />
      </div>
      <p className="text-sm font-medium text-foreground mb-1">{message}</p>
      {error?.message && (
        <p className="text-xs text-neutral-gray mb-3 max-w-xs text-center">
          {error.message}
        </p>
      )}
      {reset && (
        <Button onClick={reset} variant="ghost" size="sm">
          <RefreshCw className="w-3 h-3 mr-1" />
          Retry
        </Button>
      )}
    </div>
  );
}

/* ===========================================
   ASYNC BOUNDARY WRAPPER
   Combines Error Boundary with Suspense
   =========================================== */

interface AsyncBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export function AsyncBoundary({
  children,
  errorFallback,
  onError,
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary fallback={errorFallback} onError={onError}>
      {children}
    </ErrorBoundary>
  );
}

/* ===========================================
   ERROR MESSAGE COMPONENT
   Simple inline error display
   =========================================== */

interface ErrorMessageProps {
  message: string;
  className?: string;
  variant?: "default" | "destructive" | "warning";
}

export function ErrorMessage({
  message,
  className,
  variant = "destructive",
}: ErrorMessageProps) {
  const variantStyles = {
    default: "bg-surface-1 text-foreground border-border",
    destructive: "bg-error-light text-error-dark border-error/20",
    warning: "bg-warning-light text-warning-dark border-warning/20",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-3 rounded-lg border text-sm animate-shake",
        variantStyles[variant],
        className
      )}
      role="alert"
    >
      <AlertTriangle className="w-4 h-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

/* ===========================================
   USE ERROR HANDLER HOOK
   For programmatic error handling
   =========================================== */

export function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null);

  const handleError = (err: Error | string) => {
    const error = typeof err === "string" ? new Error(err) : err;
    setError(error);
    console.error("Error handled:", error);
  };

  const clearError = () => {
    setError(null);
  };

  const resetError = () => {
    setError(null);
  };

  // Re-throw error to be caught by error boundary
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return {
    error,
    handleError,
    clearError,
    resetError,
  };
}

export default ErrorBoundary;
