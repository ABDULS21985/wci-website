"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/components/ui/shared/lib/utils";
import { useTranslations } from "next-intl";

export interface BreadcrumbItem {
  /** Display label for the breadcrumb */
  label: string;
  /** URL for the breadcrumb link (optional for last item) */
  href?: string;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Custom separator element */
  separator?: React.ReactNode;
  /** Show home icon for first item */
  showHomeIcon?: boolean;
}

/**
 * Breadcrumbs Component
 *
 * A simple breadcrumb navigation component following the
 * Home > Section > Page pattern.
 *
 * @example
 * <Breadcrumbs
 *   items={[
 *     { label: "Home", href: "/" },
 *     { label: "Products", href: "/products" },
 *     { label: "Current Product" }
 *   ]}
 * />
 */
export function Breadcrumbs({
  items,
  separator,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showHomeIcon = false,
  className,
  ...props
}: BreadcrumbsProps) {
  const tNav = useTranslations("navigation");

  // Apply translations to item labels if they match known keys
  const translatedItems = items.map((item) => {
    // Check if the label is "Home" and translate it
    if (item.label === "Home") {
      return { ...item, label: tNav("home") };
    }
    return item;
  });

  if (!translatedItems || translatedItems.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-sm", className)}
      {...props}
    >
      <ol className="flex items-center flex-wrap gap-1">
        {translatedItems.map((item, index) => {
          const isLast = index === translatedItems.length - 1;
          const isFirst = index === 0;

          return (
            <li key={index} className="flex items-center">
              {/* Separator (not before first item) */}
              {!isFirst && (
                <span
                  className="mx-2 text-neutral-400"
                  aria-hidden="true"
                >
                  {separator || <ChevronRight className="h-4 w-4" />}
                </span>
              )}

              {/* Breadcrumb link or text */}
              {isLast || !item.href ? (
                <span
                  className="text-neutral-600 font-medium"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "text-neutral-500 hover:text-primary transition-colors",
                    "hover:underline underline-offset-2"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
