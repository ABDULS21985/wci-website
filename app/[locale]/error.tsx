"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "../../components/ui/button";
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
   LOCALE ERROR PAGE
   Handles errors within the [locale] route
   Integrates with next-intl for translations
   =========================================== */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Locale error caught:", error);
  }, [error]);

  const handleCopyError = async () => {
    const errorText = `Error: ${error.message}\nDigest: ${error.digest || "N/A"}`;
    await navigator.clipboard.writeText(errorText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orb */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-10 bg-gradient-to-r from-error to-error-dark"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "pulse-scale 4s ease-in-out infinite",
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--error) 1px, transparent 1px),
              linear-gradient(to bottom, var(--error) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content */}
      <div className="max-w-lg w-full text-center relative z-10">
        {/* Animated Error Icon */}
        <div className="relative mx-auto w-28 h-28 mb-10">
          {/* Pulsing background */}
          <div className="absolute inset-0 rounded-full bg-error/20 animate-pulse-scale" />
          {/* Rotating ring */}
          <div className="absolute inset-3 rounded-full border-2 border-dashed border-error/40 animate-spin-slow" />
          {/* Inner rotating ring (opposite direction) */}
          <div
            className="absolute inset-5 rounded-full border border-error/30"
            style={{
              animation: "spin 20s linear infinite reverse",
            }}
          />
          {/* Icon container */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-error to-error-dark flex items-center justify-center shadow-xl shadow-error/30">
            <AlertTriangle className="w-9 h-9 text-white animate-bounce-subtle" />
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-fluid-3xl font-bold text-foreground mb-4 animate-fade-in-up">
          {t("title", { defaultValue: "Something went wrong!" })}
        </h1>

        {/* Error Description */}
        <p className="text-neutral-gray text-lg mb-8 animate-fade-in-up delay-100">
          {t("description", {
            defaultValue:
              "We apologize for the inconvenience. An unexpected error has occurred. Please try again or contact support if the problem persists.",
          })}
        </p>

        {/* Error Details Card */}
        <div className="mb-8 animate-fade-in-up delay-200">
          <div className="bg-surface-1 rounded-2xl p-5 border border-border shadow-sm">
            {/* Error Digest */}
            {error.digest && (
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
                <span className="text-sm text-neutral-gray">Error ID:</span>
                <code className="text-sm font-mono text-foreground bg-surface-2 px-2 py-1 rounded">
                  {error.digest}
                </code>
              </div>
            )}

            {/* Error Message Toggle */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between text-sm text-neutral-gray hover:text-foreground transition-colors"
            >
              <span>
                {t("showDetails", { defaultValue: "Technical details" })}
              </span>
              {showDetails ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {/* Error Details */}
            {showDetails && (
              <div className="mt-3 relative">
                <div className="bg-surface-2 rounded-xl p-4 text-left">
                  <p className="text-sm text-neutral-gray font-mono break-words">
                    {error.message || "An unknown error occurred"}
                  </p>
                </div>
                <button
                  onClick={handleCopyError}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-surface-3 hover:bg-surface-4 transition-colors"
                  aria-label="Copy error details"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-gray" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
          <Button
            onClick={reset}
            variant="primary"
            size="lg"
            leftIcon={<RefreshCw className="w-5 h-5" />}
            className="press-effect"
          >
            {t("tryAgain", { defaultValue: "Try Again" })}
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              {t("goHome", { defaultValue: "Go Home" })}
            </Link>
          </Button>
        </div>

        {/* Contact Support Link */}
        <div className="mt-8 animate-fade-in-up delay-400">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-neutral-gray hover:text-primary transition-colors group"
          >
            <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {t("contactSupport", { defaultValue: "Contact Support" })}
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
