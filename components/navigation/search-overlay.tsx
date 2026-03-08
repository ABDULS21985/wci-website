"use client";

import { useState, useEffect, useCallback } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, Package, Briefcase, BookOpen, ArrowRight, Clock, TrendingUp } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

// ============================================
// TYPES
// ============================================

interface SearchResult {
    id: string;
    title: string;
    description: string;
    href: string;
    type: "service" | "product" | "page" | "blog";
    breadcrumb?: string;
}

// ============================================
// DATA - Would normally come from API/search index
// ============================================

const allResults: SearchResult[] = [
    // Services
    { id: "s1", title: "Cybersecurity Services", description: "Protect your digital assets with enterprise security", href: "/services/cybersecurity", type: "service", breadcrumb: "Services" },
    { id: "s2", title: "Cloud & Infrastructure", description: "Scalable cloud solutions for modern businesses", href: "/services/cloud-infrastructure", type: "service", breadcrumb: "Services" },
    { id: "s3", title: "Data & AI", description: "Harness the power of data analytics and AI", href: "/services/data-ai", type: "service", breadcrumb: "Services" },
    { id: "s4", title: "Digital Strategy", description: "Transform your business with digital innovation", href: "/services/digital-strategy", type: "service", breadcrumb: "Services" },
    // Products
    { id: "p1", title: "TrustMeHub", description: "Trust & compliance management platform", href: "/products/trustmehub", type: "product", breadcrumb: "Products" },
    { id: "p2", title: "BoaCRM", description: "Customer relations management suite", href: "/products/boacrm", type: "product", breadcrumb: "Products" },
    { id: "p3", title: "DigiTrack", description: "Asset tracking & logistics platform", href: "/products/digitrack", type: "product", breadcrumb: "Products" },
    // Pages
    { id: "pg1", title: "About Us", description: "Learn about Global Digitalbit", href: "/about", type: "page", breadcrumb: "Company" },
    { id: "pg2", title: "Contact", description: "Get in touch with our team", href: "/contact", type: "page", breadcrumb: "Company" },
    { id: "pg3", title: "Careers", description: "Join our growing team", href: "/careers", type: "page", breadcrumb: "Company" },
    { id: "pg4", title: "Case Studies", description: "See our work and client success stories", href: "/case-studies", type: "page", breadcrumb: "Company" },
    { id: "pg5", title: "Industries", description: "Industries we serve and specialize in", href: "/industries", type: "page", breadcrumb: "Company" },
    // Case Studies
    { id: "cs1", title: "CBDC Implementation", description: "Central Bank Digital Currency for 50M citizens", href: "/case-studies/central-bank-digital-currency-implementation", type: "page", breadcrumb: "Case Studies" },
    { id: "cs2", title: "Cybersecurity Transformation", description: "Enterprise security for 80M subscribers", href: "/case-studies/enterprise-cybersecurity-transformation", type: "page", breadcrumb: "Case Studies" },
    { id: "cs3", title: "AI Healthcare Analytics", description: "Reducing hospital readmissions by 35%", href: "/case-studies/ai-powered-healthcare-analytics", type: "page", breadcrumb: "Case Studies" },
    // Blog/Insights
    { id: "b1", title: "Digital Transformation Trends 2024", description: "Key trends shaping enterprise technology", href: "/blogs/digital-transformation-trends", type: "blog", breadcrumb: "Insights" },
    { id: "b2", title: "Cybersecurity Best Practices", description: "Essential security measures for businesses", href: "/blogs/cybersecurity-best-practices", type: "blog", breadcrumb: "Insights" },
];

const trendingTopics = [
    "Cybersecurity",
    "CBDC",
    "AI Analytics",
    "Digital Transformation",
];

const quickLinks = [
    { title: "Services", href: "/services" },
    { title: "Products", href: "/products" },
    { title: "Case Studies", href: "/case-studies" },
    { title: "Contact", href: "/contact" },
];

// ============================================
// SEARCH OVERLAY COMPONENT
// ============================================

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState<string[]>(() => {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem("recentSearches");
        return stored ? JSON.parse(stored) : [];
    });
    const router = useRouter();
    const t = useTranslations("search");
    const tCommon = useTranslations("common");

    // Save search to recent
    const saveRecentSearch = useCallback((search: string) => {
        const updated = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
    }, [recentSearches]);

    // Filter results based on query
    const filteredResults = query.length > 0
        ? allResults.filter(
            result =>
                result.title.toLowerCase().includes(query.toLowerCase()) ||
                result.description.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    // Group results by type
    const groupedResults = filteredResults.reduce((acc, result) => {
        if (!acc[result.type]) acc[result.type] = [];
        acc[result.type].push(result);
        return acc;
    }, {} as Record<string, SearchResult[]>);

    // Handle result selection
    const handleSelect = useCallback((href: string, title: string) => {
        saveRecentSearch(title);
        onClose();
        router.push(href);
    }, [saveRecentSearch, onClose, router]);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "service": return <Briefcase className="w-4 h-4" />;
            case "product": return <Package className="w-4 h-4" />;
            case "page": return <FileText className="w-4 h-4" />;
            case "blog": return <BookOpen className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case "service": return "Services";
            case "product": return "Products";
            case "page": return "Pages";
            case "blog": return "Insights";
            default: return type;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-white/95 backdrop-blur-xl"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Search Dialog */}
                    <motion.div
                        className="relative w-full max-w-2xl mx-4"
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Command
                            className="rounded-2xl border border-neutral-200 bg-white shadow-2xl overflow-hidden"
                            shouldFilter={false}
                        >
                            {/* Search Input */}
                            <div className="flex items-center gap-3 px-6 py-4 border-b border-neutral-200">
                                <Search className="w-5 h-5 text-neutral-400" />
                                <Command.Input
                                    value={query}
                                    onValueChange={setQuery}
                                    placeholder={t("placeholder")}
                                    className="flex-1 text-lg bg-transparent outline-none placeholder:text-neutral-400"
                                    autoFocus
                                />
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                                    aria-label={tCommon("close")}
                                >
                                    <X className="w-5 h-5 text-neutral-400" />
                                </button>
                            </div>

                            {/* Results List */}
                            <Command.List className="max-h-[60vh] overflow-y-auto p-4">
                                {query.length === 0 ? (
                                    <>
                                        {/* Recent Searches */}
                                        {recentSearches.length > 0 && (
                                            <div className="mb-6">
                                                <h3 className="flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wide mb-3 px-2">
                                                    <Clock className="w-3 h-3" /> {t("recentSearches")}
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {recentSearches.map((search, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setQuery(search)}
                                                            className="px-3 py-1.5 text-sm bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                                                        >
                                                            {search}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Trending Topics */}
                                        <div className="mb-6">
                                            <h3 className="flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wide mb-3 px-2">
                                                <TrendingUp className="w-3 h-3" /> {t("trending")}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {trendingTopics.map((topic, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setQuery(topic)}
                                                        className="px-3 py-1.5 text-sm bg-primary/5 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                    >
                                                        {topic}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Quick Links */}
                                        <div>
                                            <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-3 px-2">
                                                {t("quickLinks")}
                                            </h3>
                                            <div className="grid grid-cols-2 gap-2">
                                                {quickLinks.map((link) => (
                                                    <Command.Item
                                                        key={link.href}
                                                        onSelect={() => handleSelect(link.href, link.title)}
                                                        className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors data-[selected=true]:bg-neutral-50"
                                                    >
                                                        <span className="text-sm font-medium">{link.title}</span>
                                                        <ArrowRight className="w-4 h-4 text-neutral-400" />
                                                    </Command.Item>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : filteredResults.length === 0 ? (
                                    <Command.Empty className="py-12 text-center text-neutral-500">
                                        {t("noResults")} &ldquo;{query}&rdquo;
                                    </Command.Empty>
                                ) : (
                                    <>
                                        {Object.entries(groupedResults).map(([type, results]) => (
                                            <Command.Group
                                                key={type}
                                                heading={
                                                    <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2 px-2">
                                                        {getTypeLabel(type)}
                                                    </h3>
                                                }
                                                className="mb-4"
                                            >
                                                {results.map((result) => (
                                                    <Command.Item
                                                        key={result.id}
                                                        value={result.title}
                                                        onSelect={() => handleSelect(result.href, result.title)}
                                                        className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors data-[selected=true]:bg-neutral-50"
                                                    >
                                                        <span className="flex-shrink-0 p-2 rounded-lg bg-neutral-100 text-neutral-600">
                                                            {getTypeIcon(type)}
                                                        </span>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-medium text-neutral-900 truncate">
                                                                    {result.title}
                                                                </span>
                                                                {result.breadcrumb && (
                                                                    <span className="text-xs text-neutral-400">
                                                                        / {result.breadcrumb}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-neutral-500 mt-0.5 truncate">
                                                                {result.description}
                                                            </p>
                                                        </div>
                                                        <ArrowRight className="flex-shrink-0 w-4 h-4 text-neutral-400" />
                                                    </Command.Item>
                                                ))}
                                            </Command.Group>
                                        ))}
                                    </>
                                )}
                            </Command.List>

                            {/* Footer */}
                            <div className="flex items-center justify-between px-6 py-3 border-t border-neutral-200 bg-neutral-50 text-xs text-neutral-500">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-white border rounded text-[10px]">↑</kbd>
                                        <kbd className="px-1.5 py-0.5 bg-white border rounded text-[10px]">↓</kbd>
                                        navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-white border rounded text-[10px]">↵</kbd>
                                        select
                                    </span>
                                </div>
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white border rounded text-[10px]">esc</kbd>
                                    close
                                </span>
                            </div>
                        </Command>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ============================================
// SEARCH TRIGGER HOOK
// ============================================

export function useSearchShortcut(onOpen: () => void) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd+K or Ctrl+K
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                onOpen();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onOpen]);
}
