"use client";

import * as React from "react";
import { cn } from "@/components/ui/shared/lib/utils";
import { useTranslations } from "next-intl";

const COOKIE_CONSENT_KEY = "cookie-consent";

export interface CookieConsentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Callback when user accepts cookies */
  onAccept?: () => void;
  /** Callback when user declines cookies */
  onDecline?: () => void;
  /** Privacy policy link */
  privacyPolicyUrl?: string;
}

/**
 * Cookie Consent Banner
 *
 * A fixed bottom banner that displays a cookie consent message
 * with Accept and Decline buttons. Stores preference in localStorage.
 *
 * @example
 * <CookieConsent
 *   onAccept={() => console.log("Accepted")}
 *   onDecline={() => console.log("Declined")}
 *   privacyPolicyUrl="/privacy"
 * />
 */
export function CookieConsent({
  onAccept,
  onDecline,
  privacyPolicyUrl,
  className,
  ...props
}: CookieConsentProps) {
  const t = useTranslations("cookieConsent");
  const tCommon = useTranslations("common");
  const [isVisible, setIsVisible] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  // Check localStorage on mount
  React.useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay for slide-up animation
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Trigger animation after visibility
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
    onAccept?.();
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
    onDecline?.();
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("title")}
      aria-live="polite"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-white dark:bg-neutral-900 shadow-lg border-t border-neutral-200 dark:border-neutral-700",
        "transform transition-transform duration-300 ease-out",
        isAnimating ? "translate-y-0" : "translate-y-full",
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Message */}
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-3xl">
            {t("description")}
            {privacyPolicyUrl && (
              <>
                {" "}
                <a
                  href={privacyPolicyUrl}
                  className="text-primary hover:underline underline-offset-2"
                >
                  {tCommon("learnMore")}
                </a>
              </>
            )}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDecline}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg",
                "text-neutral-600 dark:text-neutral-300",
                "bg-neutral-100 dark:bg-neutral-800",
                "hover:bg-neutral-200 dark:hover:bg-neutral-700",
                "transition-colors duration-200"
              )}
            >
              {t("rejectAll")}
            </button>
            <button
              onClick={handleAccept}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg",
                "text-white",
                "bg-primary hover:bg-primary/90",
                "transition-colors duration-200"
              )}
            >
              {t("acceptAll")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
