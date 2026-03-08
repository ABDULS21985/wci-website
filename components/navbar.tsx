"use client";

import Image from "next/image";
import { Menu, X, Search, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/shared/components";
import { cn } from "@/components/ui/shared/components";
import { Link, usePathname } from "@/i18n/routing";
import { LanguageSwitcher } from "./language-switcher";
import { SearchOverlay, useSearchShortcut } from "./navigation/search-overlay";
import { useScrollDirection } from "@/hooks/use-scroll-direction";

// ============================================
// TYPES
// ============================================

interface NavItem {
    name: string;
    href: string;
}

// ============================================
// DATA - WCI Navigation Items
// ============================================

const navItems: NavItem[] = [
    { name: "about", href: "/about" },
    { name: "programs", href: "/programs" },
    { name: "platform", href: "/platform" },
    { name: "getInvolved", href: "/get-involved" },
    { name: "insights", href: "/blogs" },
    { name: "contact", href: "/contact" },
] as const;

// Mobile menu items
const mobileNavItems: NavItem[] = [
    { name: "about", href: "/about" },
    { name: "programs", href: "/programs" },
    { name: "platform", href: "/platform" },
    { name: "getInvolved", href: "/get-involved" },
    { name: "insights", href: "/blogs" },
    { name: "contact", href: "/contact" },
];

// ============================================
// ANIMATION VARIANTS
// ============================================

const mobileMenuVariants = {
    closed: {
        opacity: 0,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
    },
    open: {
        opacity: 1,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
    },
};

const mobileItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.1 + i * 0.05,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    }),
};

// ============================================
// NAV LINK COMPONENT (for non-mega menu items)
// ============================================

function NavLink({
    href,
    isActive,
    isTransparent,
    children,
}: {
    href: string;
    isActive: boolean;
    isTransparent?: boolean;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className={cn(
                "relative py-2 text-sm font-medium transition-colors duration-300",
                isTransparent
                    ? isActive
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                    : isActive
                        ? "text-primary"
                        : "text-neutral-600 hover:text-primary"
            )}
        >
            {children}
            <motion.span
                className={cn(
                    "absolute bottom-0 start-0 h-0.5",
                    isTransparent ? "bg-white" : "bg-primary"
                )}
                initial={false}
                animate={{ width: isActive ? "100%" : "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
        </Link>
    );
}

// ============================================
// MAIN NAVBAR COMPONENT
// ============================================

export function Navbar() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const t = useTranslations("navigation");
    const tCommon = useTranslations("common");
    const tLanguage = useTranslations();

    // Scroll direction detection with performance optimizations
    // - Uses requestAnimationFrame for smooth detection
    // - 10px threshold to prevent jitter
    // - Hides header when scrolling down past 400px
    const { isScrolled, isHidden } = useScrollDirection({
        threshold: 10,
        hideThreshold: 400,
        scrolledThreshold: 50,
    });

    // Search shortcut (Cmd+K / Ctrl+K)
    useSearchShortcut(() => setIsSearchOpen(true));

    // Determine if header should be transparent (at top, not scrolled)
    const isTransparent = !isScrolled;

    // Determine if header should be hidden (scrolling down past threshold)
    const shouldHide = isHidden && !isMobileOpen;

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileOpen]);

    const isPathActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <>
            <motion.header
                className={cn(
                    "fixed inset-x-0 top-0 z-40 w-full transition-all duration-300 ease-out motion-reduce:transition-none",
                    // State 1: Transparent (at top, no scroll)
                    isTransparent && "bg-transparent border-b border-transparent",
                    // State 2: Scrolled - frosted glass effect
                    isScrolled && "bg-white/80 backdrop-blur-xl saturate-150 shadow-sm border-b border-neutral-200/50"
                )}
                initial={false}
                animate={{
                    y: shouldHide ? "-100%" : "0%",
                    borderColor: isScrolled ? "rgba(229, 229, 229, 0.5)" : "transparent",
                }}
                transition={{
                    y: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    borderColor: { duration: 0.3 },
                }}
            >
                <div className="container mx-auto px-5 sm:px-6 lg:px-8">
                    <motion.div
                        className="flex items-center justify-between"
                        initial={false}
                        animate={{
                            height: isScrolled ? "64px" : "80px",
                        }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <motion.div
                                initial={false}
                                animate={{ scale: isScrolled ? 0.9 : 1 }}
                                transition={{ duration: 0.3 }}
                                className="motion-reduce:transform-none"
                            >
                                <Image
                                    src="/logo/wci-logo.jpeg"
                                    alt="Women Connect International"
                                    width={120}
                                    height={40}
                                    className={cn(
                                        "h-9 w-auto object-contain transition-all duration-300",
                                        isTransparent && "brightness-0 invert"
                                    )}
                                    priority
                                />
                            </motion.div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex flex-1 justify-center">
                            <nav className="flex items-center gap-8" role="navigation" aria-label="Main navigation">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.href}
                                        href={item.href}
                                        isActive={isPathActive(item.href)}
                                        isTransparent={isTransparent}
                                    >
                                        {t(item.name)}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>

                        {/* Desktop Right Side - Search, Language, CTA */}
                        <div className="hidden lg:flex items-center gap-4">
                            {/* Search Button */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors",
                                    isTransparent
                                        ? "text-white/80 hover:text-white bg-white/10 hover:bg-white/20"
                                        : "text-neutral-500 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200"
                                )}
                                aria-label={tCommon("search")}
                            >
                                <Search className="w-4 h-4" />
                                <span className="hidden xl:inline">{tCommon("search")}</span>
                                <kbd className={cn(
                                    "hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium rounded",
                                    isTransparent
                                        ? "bg-white/20 border border-white/30"
                                        : "bg-white border border-neutral-200"
                                )}>
                                    <span className="text-xs">⌘</span>K
                                </kbd>
                            </button>

                            <LanguageSwitcher variant="dropdown" showName={false} showFlag={true} isTransparent={isTransparent} />

                            <Button
                                asChild
                                className={cn(
                                    "btn-press rounded-lg",
                                    isTransparent
                                        ? "bg-white text-primary hover:bg-white/90"
                                        : "bg-primary hover:bg-primary/90 text-white"
                                )}
                            >
                                <Link href="/contact">{t("getStarted")}</Link>
                            </Button>
                        </div>

                        {/* Mobile Right Side - Search and Menu */}
                        <div className="lg:hidden flex items-center gap-1">
                            {/* Mobile Search Button - 44x44px touch target */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className={cn(
                                    "min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors rounded-lg",
                                    isTransparent
                                        ? "text-white/80 hover:text-white hover:bg-white/10"
                                        : "text-neutral-600 hover:text-primary hover:bg-neutral-100"
                                )}
                                aria-label={tCommon("search")}
                            >
                                <Search className="w-5 h-5" />
                            </button>
                            {/* Mobile Menu Button (Hamburger) - 44x44px touch target */}
                            <Button
                                variant="ghost"
                                onClick={() => setIsMobileOpen(true)}
                                aria-label="Open menu"
                                aria-expanded={isMobileOpen}
                                className={cn(
                                    "min-w-[44px] min-h-[44px] w-11 h-11 p-0",
                                    isTransparent && "text-white hover:text-white hover:bg-white/10"
                                )}
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </div>
                    </motion.div>
                </div>

            </motion.header>

            {/* Full-Screen Mobile Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 lg:hidden"
                        variants={mobileMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                    >
                        {/* Background */}
                        <div className="absolute inset-0 bg-white" />

                        {/* Content */}
                        <div className="relative flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 h-16 border-b border-neutral-200">
                                {/* Logo - 44px touch target */}
                                <Link
                                    href="/"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="min-h-[44px] flex items-center"
                                >
                                    <Image
                                        src="/logo/wci-logo.jpeg"
                                        alt="Women Connect International"
                                        width={120}
                                        height={40}
                                        className="h-8 w-auto object-contain"
                                    />
                                </Link>
                                {/* Close Button - 44x44px touch target */}
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsMobileOpen(false)}
                                    aria-label="Close menu"
                                    className="min-w-[44px] min-h-[44px] w-11 h-11 p-0"
                                >
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile navigation">
                                <ul className="space-y-1">
                                    {mobileNavItems.map((item, i) => (
                                        <motion.li
                                            key={item.href}
                                            custom={i}
                                            variants={mobileItemVariants}
                                            initial="closed"
                                            animate="open"
                                        >
                                            {/* Mobile Nav Link - minimum 48px touch target for better mobile UX */}
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsMobileOpen(false)}
                                                className={cn(
                                                    "flex items-center justify-between px-4 min-h-[48px] text-lg font-medium rounded-xl transition-colors",
                                                    isPathActive(item.href)
                                                        ? "text-primary bg-primary/5"
                                                        : "text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100"
                                                )}
                                            >
                                                {t(item.name)}
                                                <ChevronRight className="w-5 h-5 text-neutral-400 flex-shrink-0" aria-hidden="true" />
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* CTA Button - prominent, full-width with 48px minimum height */}
                                <motion.div
                                    className="mt-6 pt-6 border-t border-neutral-200"
                                    custom={mobileNavItems.length}
                                    variants={mobileItemVariants}
                                    initial="closed"
                                    animate="open"
                                >
                                    <Button
                                        asChild
                                        size="lg"
                                        className="w-full btn-press bg-primary hover:bg-primary/90 active:bg-primary/80 text-white rounded-xl min-h-[48px] h-14 text-lg font-semibold shadow-lg"
                                    >
                                        <Link href="/contact" onClick={() => setIsMobileOpen(false)}>
                                            {t("getStarted")}
                                        </Link>
                                    </Button>
                                </motion.div>
                            </nav>

                            {/* Footer */}
                            <motion.div
                                className="px-5 py-6 border-t border-neutral-200 bg-neutral-50"
                                custom={mobileNavItems.length + 1}
                                variants={mobileItemVariants}
                                initial="closed"
                                animate="open"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-neutral-500">{tLanguage("language")}</span>
                                    <LanguageSwitcher variant="buttons" showName={true} showFlag={true} />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
