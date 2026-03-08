"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  /**
   * Content to extract headings from (HTML string or markdown)
   */
  content?: string;
  /**
   * Array of heading elements to use (alternative to content)
   */
  headings?: Heading[];
  /**
   * Minimum heading level to include (1-6)
   */
  minLevel?: number;
  /**
   * Maximum heading level to include (1-6)
   */
  maxLevel?: number;
  /**
   * Offset for scroll position calculation (in pixels)
   */
  scrollOffset?: number;
  /**
   * Show collapse/expand toggle
   */
  collapsible?: boolean;
  /**
   * Start collapsed
   */
  defaultCollapsed?: boolean;
  /**
   * Variant: 'default' | 'floating' | 'sidebar'
   */
  variant?: "default" | "floating" | "sidebar";
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function TableOfContents({
  content,
  headings: providedHeadings,
  minLevel = 2,
  maxLevel = 4,
  scrollOffset = 100,
  collapsible = true,
  defaultCollapsed = false,
  variant = "default",
  className = "",
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>(providedHeadings || []);
  const [activeId, setActiveId] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  // Extract headings from content or DOM (only when headings are NOT provided as props)
  useEffect(() => {
    // If headings are provided as props, don't extract from DOM
    if (providedHeadings) {
      return;
    }

    // Extract headings from the DOM (article content)
    const extractHeadings = () => {
      const article = document.querySelector("article, .prose, [data-content]");
      if (!article) return;

      const headingSelectors = [];
      for (let i = minLevel; i <= maxLevel; i++) {
        headingSelectors.push(`h${i}`);
      }

      const elements = article.querySelectorAll(headingSelectors.join(", "));
      const extractedHeadings: Heading[] = [];

      elements.forEach((element) => {
        const id = element.id || generateId(element.textContent || "");
        if (!element.id) {
          element.id = id;
        }

        extractedHeadings.push({
          id,
          text: element.textContent || "",
          level: parseInt(element.tagName.charAt(1)),
        });
      });

      setHeadings(extractedHeadings);
    };

    // Delay extraction to ensure content is rendered
    const timer = setTimeout(extractHeadings, 100);
    return () => clearTimeout(timer);
  }, [content, providedHeadings, minLevel, maxLevel]);

  // Scroll spy - track active heading
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + scrollOffset;

      // Find the heading that is currently in view
      let currentHeading = headings[0]?.id || "";

      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element) {
          const { top } = element.getBoundingClientRect();
          const absoluteTop = top + window.scrollY;

          if (absoluteTop <= scrollPosition) {
            currentHeading = heading.id;
          }
        }
      }

      setActiveId(currentHeading);
    };

    // Throttle scroll handler
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [headings, scrollOffset]);

  // Smooth scroll to heading
  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  }, []);

  if (headings.length === 0) {
    return null;
  }

  // Floating variant
  if (variant === "floating") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block ${className}`}
      >
        <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-4 max-w-xs">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              <List className="w-4 h-4" />
              <span>On this page</span>
            </div>
            {collapsible && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
              >
                {isCollapsed ? (
                  <ChevronDown className="w-4 h-4 text-neutral-500" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-neutral-500" />
                )}
              </button>
            )}
          </div>

          {/* Headings */}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <ul className="space-y-1">
                  {headings.map((heading, index) => (
                    <motion.li
                      key={heading.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => scrollToHeading(heading.id)}
                        className={`
                          w-full text-left text-sm py-1.5 px-3 rounded-lg transition-all duration-200
                          ${heading.level > minLevel ? `ml-${(heading.level - minLevel) * 3}` : ""}
                          ${
                            activeId === heading.id
                              ? "bg-gradient-to-r from-[#1E4DB7]/10 to-[#F59A23]/10 text-[#1E4DB7] dark:text-[#F59A23] font-medium border-l-2 border-[#1E4DB7]"
                              : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          }
                        `}
                        style={{
                          paddingLeft: `${(heading.level - minLevel) * 12 + 12}px`,
                        }}
                      >
                        <span className="line-clamp-1">{heading.text}</span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Progress indicator */}
          <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700">
            <div className="h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#1E4DB7] to-[#F59A23]"
                style={{
                  width: `${((headings.findIndex((h) => h.id === activeId) + 1) / headings.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 text-center">
              {headings.findIndex((h) => h.id === activeId) + 1} of {headings.length} sections
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Sidebar variant
  if (variant === "sidebar") {
    return (
      <aside className={`sticky top-24 ${className}`}>
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-5">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            <List className="w-4 h-4 text-[#1E4DB7]" />
            <span>Table of Contents</span>
          </div>

          {/* Headings */}
          <nav>
            <ul className="space-y-1 border-l-2 border-neutral-200 dark:border-neutral-700">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => scrollToHeading(heading.id)}
                    className={`
                      w-full text-left text-sm py-2 transition-all duration-200
                      ${
                        activeId === heading.id
                          ? "text-[#1E4DB7] dark:text-[#F59A23] font-medium -ml-[2px] border-l-2 border-[#1E4DB7] dark:border-[#F59A23]"
                          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 border-l-2 border-transparent -ml-[2px]"
                      }
                    `}
                    style={{
                      paddingLeft: `${(heading.level - minLevel) * 12 + 16}px`,
                    }}
                  >
                    <span className="line-clamp-2">{heading.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    );
  }

  // Default variant
  return (
    <div className={`bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden ${className}`}>
      {/* Header */}
      <button
        onClick={() => collapsible && setIsCollapsed(!isCollapsed)}
        className={`
          w-full flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800
          ${collapsible ? "cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700" : "cursor-default"}
          transition-colors
        `}
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          <List className="w-4 h-4 text-[#1E4DB7]" />
          <span>Table of Contents</span>
          <span className="px-2 py-0.5 bg-[#1E4DB7]/10 text-[#1E4DB7] text-xs font-medium rounded-full">
            {headings.length}
          </span>
        </div>
        {collapsible && (
          <motion.div
            animate={{ rotate: isCollapsed ? 0 : 90 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4 text-neutral-500" />
          </motion.div>
        )}
      </button>

      {/* Headings */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <nav className="p-4 pt-2">
              <ul className="space-y-1">
                {headings.map((heading, index) => (
                  <motion.li
                    key={heading.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <button
                      onClick={() => scrollToHeading(heading.id)}
                      className={`
                        group w-full flex items-center gap-2 text-sm py-2 px-3 rounded-lg transition-all duration-200
                        ${
                          activeId === heading.id
                            ? "bg-gradient-to-r from-[#1E4DB7]/10 to-[#F59A23]/10 text-[#1E4DB7] dark:text-[#F59A23] font-medium"
                            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        }
                      `}
                      style={{
                        paddingLeft: `${(heading.level - minLevel) * 16 + 12}px`,
                      }}
                    >
                      {activeId === heading.id && (
                        <motion.span
                          layoutId="active-indicator"
                          className="w-1.5 h-1.5 rounded-full bg-[#1E4DB7] dark:bg-[#F59A23] flex-shrink-0"
                        />
                      )}
                      <span className="line-clamp-1 text-left">{heading.text}</span>
                      <ChevronRight
                        className={`
                          w-3 h-3 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity
                          ${activeId === heading.id ? "text-[#1E4DB7] dark:text-[#F59A23]" : "text-neutral-400"}
                        `}
                      />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper function to generate ID from text
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Export a hook for custom implementations
export function useTableOfContents(options?: {
  minLevel?: number;
  maxLevel?: number;
  scrollOffset?: number;
}) {
  const { minLevel = 2, maxLevel = 4, scrollOffset = 100 } = options || {};
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const extractHeadings = () => {
      const article = document.querySelector("article, .prose, [data-content]");
      if (!article) return;

      const headingSelectors = [];
      for (let i = minLevel; i <= maxLevel; i++) {
        headingSelectors.push(`h${i}`);
      }

      const elements = article.querySelectorAll(headingSelectors.join(", "));
      const extractedHeadings: Heading[] = [];

      elements.forEach((element) => {
        const id = element.id || generateId(element.textContent || "");
        if (!element.id) {
          element.id = id;
        }

        extractedHeadings.push({
          id,
          text: element.textContent || "",
          level: parseInt(element.tagName.charAt(1)),
        });
      });

      setHeadings(extractedHeadings);
    };

    const timer = setTimeout(extractHeadings, 100);
    return () => clearTimeout(timer);
  }, [minLevel, maxLevel]);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + scrollOffset;
      let currentHeading = headings[0]?.id || "";

      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element) {
          const { top } = element.getBoundingClientRect();
          const absoluteTop = top + window.scrollY;

          if (absoluteTop <= scrollPosition) {
            currentHeading = heading.id;
          }
        }
      }

      setActiveId(currentHeading);
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [headings, scrollOffset]);

  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  }, []);

  return { headings, activeId, scrollToHeading };
}
