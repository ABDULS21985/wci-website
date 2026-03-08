"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useTransition, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/shared/components";
import { cn } from "@/components/ui/shared/components";
import { motion, AnimatePresence } from "framer-motion";
import {
  locales,
  localeNames,
  localeFlags,
  isRtlLocale,
  type Locale,
} from "../i18n/routing";

// Country flag component using emoji flags
function CountryFlag({ code, className }: { code: string; className?: string }) {
  // Convert country code to flag emoji
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <span className={cn("text-lg leading-none", className)} role="img" aria-label={`${code} flag`}>
      {getFlagEmoji(code)}
    </span>
  );
}

// Animation variants for dropdown
const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const,
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: "easeIn" as const,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const,
    },
  },
} as const;

interface LanguageSwitcherProps {
  /** Display variant */
  variant?: "dropdown" | "buttons" | "compact";
  /** Show locale name */
  showName?: boolean;
  /** Show country flag */
  showFlag?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Alignment for dropdown menu */
  align?: "start" | "center" | "end";
  /** Whether the navbar is in transparent state */
  isTransparent?: boolean;
}

export function LanguageSwitcher({
  variant = "dropdown",
  showName = true,
  showFlag = true,
  className,
  align = "end",
  isTransparent = false,
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common");
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  // Function to switch locale
  const switchLocale = (newLocale: Locale) => {
    // Remove the current locale prefix from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

    // Navigate to the new locale path
    startTransition(() => {
      router.push(`/${newLocale}${pathWithoutLocale}`);
      router.refresh();
    });

    setIsOpen(false);
  };

  // Dropdown variant (default) - Custom animated dropdown
  if (variant === "dropdown") {
    return (
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-2 px-3 h-11",
            isPending && "opacity-50 pointer-events-none",
            isTransparent && "text-white/80 hover:text-white hover:bg-white/10",
            className
          )}
          aria-label={t("selectLanguage")}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          {showFlag && (
            <motion.span
              key={locale}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <CountryFlag code={localeFlags[locale]} />
            </motion.span>
          )}
          {showName && (
            <motion.span
              key={locale}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:inline text-sm font-medium"
            >
              {localeNames[locale]}
            </motion.span>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "absolute z-50 mt-2 w-48 rounded-md bg-white dark:bg-neutral-800 shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                align === "start" && "left-0",
                align === "center" && "left-1/2 -translate-x-1/2",
                align === "end" && "right-0"
              )}
              role="listbox"
              aria-label={t("selectLanguage")}
            >
              {locales.map((loc) => {
                const isActive = loc === locale;
                const isRtl = isRtlLocale(loc);

                return (
                  <motion.button
                    key={loc}
                    variants={itemVariants}
                    onClick={() => switchLocale(loc)}
                    className={cn(
                      "w-full flex items-center justify-between gap-3 px-4 min-h-[44px] py-3 text-sm cursor-pointer transition-colors duration-150",
                      "hover:bg-neutral-100 dark:hover:bg-neutral-700 active:bg-neutral-200 dark:active:bg-neutral-600",
                      isActive && "bg-primary/10 dark:bg-primary/20",
                      isRtl && "flex-row-reverse text-right"
                    )}
                    disabled={isPending}
                    role="option"
                    aria-selected={isActive}
                    whileHover={{ x: isRtl ? -4 : 4 }}
                    transition={{ duration: 0.1 }}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-3",
                        isRtl && "flex-row-reverse"
                      )}
                    >
                      {showFlag && (
                        <motion.span
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <CountryFlag code={localeFlags[loc]} />
                        </motion.span>
                      )}
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {localeNames[loc]}
                      </span>
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      >
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Buttons variant (horizontal list of buttons) - used in mobile menu footer
  if (variant === "buttons") {
    return (
      <div
        className={cn("flex items-center gap-2 flex-wrap", className)}
        role="radiogroup"
        aria-label={t("selectLanguage")}
      >
        {locales.map((loc) => {
          const isActive = loc === locale;

          return (
            <motion.div
              key={loc}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={isActive ? "default" : "ghost"}
                onClick={() => switchLocale(loc)}
                disabled={isPending || isActive}
                className={cn(
                  "flex items-center gap-2 px-4 min-h-[44px] h-11 min-w-[44px] transition-all",
                  isActive && "bg-primary text-white",
                  !isActive && "hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200"
                )}
                role="radio"
                aria-checked={isActive}
              >
                {showFlag && <CountryFlag code={localeFlags[loc]} className="text-base" />}
                {showName && (
                  <span className="text-sm font-medium">{localeNames[loc]}</span>
                )}
              </Button>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Compact variant (icon only with animated dropdown) - mobile optimized with adequate touch targets
  if (variant === "compact") {
    return (
      <div className="relative" ref={dropdownRef}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "h-11 w-11 min-h-[44px] min-w-[44px] touch-manipulation",
              isPending && "opacity-50 pointer-events-none",
              className
            )}
            aria-label={t("selectLanguage")}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Globe className="h-5 w-5" />
            </motion.div>
          </Button>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "absolute z-50 mt-2 w-44 rounded-md bg-white dark:bg-neutral-800 shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                align === "start" && "left-0",
                align === "center" && "left-1/2 -translate-x-1/2",
                align === "end" && "right-0"
              )}
              role="listbox"
              aria-label={t("selectLanguage")}
            >
              {locales.map((loc) => {
                const isActive = loc === locale;
                const isRtl = isRtlLocale(loc);

                return (
                  <motion.button
                    key={loc}
                    variants={itemVariants}
                    onClick={() => switchLocale(loc)}
                    className={cn(
                      "w-full flex items-center justify-between gap-2 px-4 min-h-[44px] py-3 text-sm cursor-pointer transition-colors duration-150 touch-manipulation",
                      "hover:bg-neutral-100 dark:hover:bg-neutral-700 active:bg-neutral-200 dark:active:bg-neutral-600",
                      isActive && "bg-primary/10 dark:bg-primary/20",
                      isRtl && "flex-row-reverse text-right"
                    )}
                    disabled={isPending}
                    role="option"
                    aria-selected={isActive}
                    whileHover={{ x: isRtl ? -4 : 4 }}
                    transition={{ duration: 0.1 }}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-2",
                        isRtl && "flex-row-reverse"
                      )}
                    >
                      <motion.span
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <CountryFlag code={localeFlags[loc]} className="text-base" />
                      </motion.span>
                      <span className="text-neutral-900 dark:text-neutral-100">{localeNames[loc]}</span>
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      >
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return null;
}

// Export a simple hook to get the current locale info
export function useLocaleInfo() {
  const locale = useLocale() as Locale;

  return {
    locale,
    localeName: localeNames[locale],
    localeFlag: localeFlags[locale],
    isRtl: isRtlLocale(locale),
    direction: isRtlLocale(locale) ? "rtl" : "ltr",
  } as const;
}

export default LanguageSwitcher;
