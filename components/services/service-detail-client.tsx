"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    List,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Menu,
    X,
    ArrowRight,
    Phone,
    MessageCircle,
    Search,
    ClipboardCheck,
    Target,
    Rocket,
    TrendingUp,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/shared/components";

import {
    Lightbulb,
    Users,
    Shield,
    Workflow,
} from "lucide-react";

// Icon map for components - used to convert string names to components
const iconMap: Record<string, LucideIcon> = {
    Search,
    ClipboardCheck,
    Target,
    Rocket,
    TrendingUp,
    Lightbulb,
    Users,
    Shield,
    Workflow,
};

// ============================================================================
// Heading Interface for TOC
// ============================================================================
interface Heading {
    id: string;
    text: string;
    level: number;
}

// ============================================================================
// Sticky Sidebar TOC Component
// ============================================================================
interface ServiceTOCProps {
    headings: Heading[];
    accentColor: string;
}

export function ServiceTOC({ headings, accentColor }: ServiceTOCProps) {
    const [activeId, setActiveId] = useState<string>("");

    // Scroll spy - track active heading
    useEffect(() => {
        if (headings.length === 0) return;

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 120;
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
    }, [headings]);

    const scrollToHeading = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({
                top,
                behavior: "smooth",
            });
        }
    }, []);

    if (headings.length === 0) {
        return null;
    }

    const progressPercent =
        headings.length > 0
            ? ((headings.findIndex((h) => h.id === activeId) + 1) / headings.length) * 100
            : 0;

    return (
        <aside className="hidden lg:block sticky top-24 w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-5">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-100">
                    <List className="w-4 h-4" style={{ color: accentColor }} />
                    <span className="text-sm font-semibold text-neutral-700">
                        On this page
                    </span>
                </div>

                {/* Headings */}
                <nav>
                    <ul className="space-y-1">
                        {headings.map((heading, index) => (
                            <motion.li
                                key={heading.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <button
                                    onClick={() => scrollToHeading(heading.id)}
                                    className={`
                                        w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200
                                        ${
                                            activeId === heading.id
                                                ? "font-medium border-l-2"
                                                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border-l-2 border-transparent"
                                        }
                                    `}
                                    style={{
                                        paddingLeft: `${(heading.level - 2) * 12 + 12}px`,
                                        color: activeId === heading.id ? accentColor : undefined,
                                        backgroundColor:
                                            activeId === heading.id ? `${accentColor}10` : undefined,
                                        borderColor:
                                            activeId === heading.id ? accentColor : "transparent",
                                    }}
                                >
                                    <span className="line-clamp-2">{heading.text}</span>
                                </button>
                            </motion.li>
                        ))}
                    </ul>
                </nav>

                {/* Progress indicator */}
                <div className="mt-4 pt-4 border-t border-neutral-100">
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                backgroundColor: accentColor,
                                width: `${progressPercent}%`,
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <p className="text-xs text-neutral-500 mt-2 text-center">
                        {headings.findIndex((h) => h.id === activeId) + 1} of{" "}
                        {headings.length} sections
                    </p>
                </div>
            </div>
        </aside>
    );
}

// ============================================================================
// Mobile TOC Floating Button
// ============================================================================
interface MobileTOCProps {
    headings: Heading[];
    accentColor: string;
}

export function MobileTOC({ headings, accentColor }: MobileTOCProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeId, setActiveId] = useState<string>("");

    // Scroll spy
    useEffect(() => {
        if (headings.length === 0) return;

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 120;
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
    }, [headings]);

    const scrollToHeading = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({
                top,
                behavior: "smooth",
            });
        }
        setIsOpen(false);
    }, []);

    if (headings.length === 0) return null;

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed left-4 top-24 z-40 w-12 h-12 rounded-full shadow-lg flex items-center justify-center bg-white border border-neutral-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open table of contents"
            >
                <Menu className="w-5 h-5 text-neutral-700" />
            </motion.button>

            {/* Mobile TOC Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="lg:hidden fixed inset-0 bg-black/50 z-50"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl"
                        >
                            <div className="p-5">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <List
                                            className="w-5 h-5"
                                            style={{ color: accentColor }}
                                        />
                                        <span className="font-semibold text-neutral-900">
                                            On this page
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                                        aria-label="Close"
                                    >
                                        <X className="w-5 h-5 text-neutral-600" />
                                    </button>
                                </div>

                                {/* Headings */}
                                <nav className="overflow-y-auto max-h-[calc(100vh-120px)]">
                                    <ul className="space-y-1">
                                        {headings.map((heading) => (
                                            <li key={heading.id}>
                                                <button
                                                    onClick={() => scrollToHeading(heading.id)}
                                                    className={`
                                                        w-full text-left py-3 px-4 rounded-lg transition-all duration-200
                                                        ${
                                                            activeId === heading.id
                                                                ? "font-medium"
                                                                : "text-neutral-600 hover:bg-neutral-50"
                                                        }
                                                    `}
                                                    style={{
                                                        paddingLeft: `${(heading.level - 2) * 12 + 16}px`,
                                                        color:
                                                            activeId === heading.id
                                                                ? accentColor
                                                                : undefined,
                                                        backgroundColor:
                                                            activeId === heading.id
                                                                ? `${accentColor}10`
                                                                : undefined,
                                                    }}
                                                >
                                                    {heading.text}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

// ============================================================================
// Callout Box Component
// ============================================================================
interface CalloutBoxProps {
    title: string;
    children: React.ReactNode;
    icon?: string; // Icon name as string, mapped in component
    accentColor: string;
    variant?: "info" | "tip" | "warning";
}

export function CalloutBox({
    title,
    children,
    icon,
    accentColor,
    variant = "info",
}: CalloutBoxProps) {
    const Icon = icon ? iconMap[icon] : null;
    return (
        <div
            className="rounded-xl p-6 border-l-4 bg-gradient-to-r"
            style={{
                borderColor: accentColor,
                backgroundImage: `linear-gradient(to right, ${accentColor}08, transparent)`,
            }}
        >
            <div className="flex items-start gap-4">
                {Icon && (
                    <div
                        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${accentColor}15` }}
                    >
                        <Icon className="w-5 h-5" style={{ color: accentColor }} />
                    </div>
                )}
                <div className="flex-1">
                    <h4
                        className="font-semibold text-lg mb-2"
                        style={{ color: accentColor }}
                    >
                        {title}
                    </h4>
                    <div className="text-neutral-700 leading-relaxed">{children}</div>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// Horizontal Stepped Process Component
// ============================================================================
export interface ProcessStep {
    number: number;
    title: string;
    description: string;
    icon?: string; // Icon name as string, mapped in component
}

interface HorizontalProcessProps {
    steps: ProcessStep[];
    accentColor: string;
    title?: string;
    subtitle?: string;
}

export function HorizontalProcess({
    steps,
    accentColor,
    title,
    subtitle,
}: HorizontalProcessProps) {
    const [activeStep, setActiveStep] = useState(0);

    // Track scroll position to highlight active step
    useEffect(() => {
        const handleScroll = () => {
            const processSection = document.getElementById("process-section");
            if (!processSection) return;

            const rect = processSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate which step should be active based on scroll position
            if (rect.top < viewportHeight * 0.5 && rect.bottom > viewportHeight * 0.3) {
                const progress = Math.max(
                    0,
                    Math.min(1, (viewportHeight * 0.5 - rect.top) / (rect.height * 0.6))
                );
                const stepIndex = Math.min(
                    steps.length - 1,
                    Math.floor(progress * steps.length)
                );
                setActiveStep(stepIndex);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [steps.length]);

    return (
        <div id="process-section" className="w-full">
            {/* Header */}
            {(title || subtitle) && (
                <div className="text-center mb-12">
                    {title && (
                        <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                            {title}
                        </h3>
                    )}
                    {subtitle && (
                        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            {/* Desktop Steps - Horizontal */}
            <div className="hidden md:block">
                <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute top-8 left-0 right-0 h-1 bg-neutral-200 rounded-full" />
                    <motion.div
                        className="absolute top-8 left-0 h-1 rounded-full"
                        style={{ backgroundColor: accentColor }}
                        initial={{ width: "0%" }}
                        animate={{
                            width: `${((activeStep + 1) / steps.length) * 100}%`,
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />

                    {/* Steps */}
                    <div className="relative grid gap-4" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
                        {steps.map((step, index) => {
                            const isActive = index <= activeStep;
                            const isCurrent = index === activeStep;
                            const StepIcon = step.icon ? iconMap[step.icon] : null;

                            return (
                                <motion.div
                                    key={step.number}
                                    className="flex flex-col items-center text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {/* Step Circle */}
                                    <motion.div
                                        className={`
                                            relative z-10 w-16 h-16 rounded-full flex items-center justify-center
                                            transition-all duration-300 shadow-md
                                            ${isCurrent ? "scale-110" : ""}
                                        `}
                                        style={{
                                            backgroundColor: isActive ? accentColor : "#fff",
                                            border: `2px solid ${isActive ? accentColor : "#e5e7eb"}`,
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {StepIcon ? (
                                            <StepIcon
                                                className="w-6 h-6"
                                                style={{ color: isActive ? "#fff" : "#9ca3af" }}
                                            />
                                        ) : (
                                            <span
                                                className="text-xl font-bold"
                                                style={{ color: isActive ? "#fff" : "#9ca3af" }}
                                            >
                                                {step.number}
                                            </span>
                                        )}
                                    </motion.div>

                                    {/* Step Content */}
                                    <div className="mt-4">
                                        <h4
                                            className={`font-semibold text-base mb-2 transition-colors duration-300 ${
                                                isActive
                                                    ? "text-neutral-900"
                                                    : "text-neutral-400"
                                            }`}
                                        >
                                            {step.title}
                                        </h4>
                                        <p
                                            className={`text-sm leading-relaxed transition-colors duration-300 ${
                                                isActive
                                                    ? "text-neutral-600"
                                                    : "text-neutral-400"
                                            }`}
                                        >
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile Steps - Vertical */}
            <div className="md:hidden space-y-6">
                {steps.map((step, index) => {
                    const isActive = index <= activeStep;
                    const StepIcon = step.icon ? iconMap[step.icon] : null;

                    return (
                        <motion.div
                            key={step.number}
                            className="flex gap-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Step Circle + Line */}
                            <div className="flex flex-col items-center">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0"
                                    style={{
                                        backgroundColor: isActive ? accentColor : "#fff",
                                        border: `2px solid ${isActive ? accentColor : "#e5e7eb"}`,
                                    }}
                                >
                                    {StepIcon ? (
                                        <StepIcon
                                            className="w-5 h-5"
                                            style={{ color: isActive ? "#fff" : "#9ca3af" }}
                                        />
                                    ) : (
                                        <span
                                            className="text-lg font-bold"
                                            style={{ color: isActive ? "#fff" : "#9ca3af" }}
                                        >
                                            {step.number}
                                        </span>
                                    )}
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className="w-0.5 flex-1 min-h-[40px] mt-2"
                                        style={{
                                            backgroundColor: isActive ? accentColor : "#e5e7eb",
                                        }}
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 pb-4">
                                <h4
                                    className={`font-semibold text-lg mb-1 ${
                                        isActive ? "text-neutral-900" : "text-neutral-400"
                                    }`}
                                >
                                    {step.title}
                                </h4>
                                <p
                                    className={`text-sm leading-relaxed ${
                                        isActive ? "text-neutral-600" : "text-neutral-400"
                                    }`}
                                >
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

// ============================================================================
// Case Study Card Component
// ============================================================================
interface CaseStudyCardProps {
    slug: string;
    title: string;
    client: string;
    industry: string;
    thumbnail: string;
    excerpt: string;
    metrics: { value: string; label: string }[];
    accentColor: string;
}

export function CaseStudyCard({
    slug,
    title,
    client,
    industry,
    thumbnail,
    excerpt,
    metrics,
    accentColor,
}: CaseStudyCardProps) {
    return (
        <Link href={`/case-studies/${slug}`}>
            <motion.div
                className="group bg-white rounded-2xl shadow-md border border-neutral-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -4 }}
            >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                        <span
                            className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                            style={{ backgroundColor: accentColor }}
                        >
                            {industry}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                        {client}
                    </p>
                    <h4 className="font-bold text-lg text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                    </h4>
                    <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
                        {excerpt}
                    </p>

                    {/* Metrics */}
                    <div className="flex gap-4 pt-4 border-t border-neutral-100">
                        {metrics.slice(0, 2).map((metric, index) => (
                            <div key={index} className="flex-1">
                                <div
                                    className="text-lg font-bold"
                                    style={{ color: accentColor }}
                                >
                                    {metric.value}
                                </div>
                                <div className="text-xs text-neutral-500">
                                    {metric.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

// ============================================================================
// Floating Mobile CTA Bar
// ============================================================================
interface FloatingMobileCTAProps {
    serviceSlug: string;
    accentColor: string;
    ctaText?: string;
}

export function FloatingMobileCTA({
    serviceSlug,
    accentColor,
    ctaText = "Get Started",
}: FloatingMobileCTAProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 400px
            const shouldShow = window.scrollY > 400;
            setIsVisible(shouldShow);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-2xl"
                >
                    <div className="flex items-center gap-3">
                        {/* Quick Contact Icons */}
                        <a
                            href="https://wa.me/97477953122"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-md hover:bg-green-600 transition-colors"
                            aria-label="WhatsApp"
                        >
                            <MessageCircle className="w-5 h-5 text-white" />
                        </a>
                        <a
                            href="tel:+97477953122"
                            className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center shadow-sm hover:bg-neutral-200 transition-colors"
                            aria-label="Call"
                        >
                            <Phone className="w-5 h-5 text-neutral-700" />
                        </a>

                        {/* Main CTA Button */}
                        <Button
                            asChild
                            size="lg"
                            className="flex-1 rounded-full h-12 text-base font-semibold shadow-lg hover:scale-[1.02] transition-transform"
                            style={{ backgroundColor: accentColor }}
                        >
                            <Link href={`/contact?service=${serviceSlug}`}>
                                {ctaText}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ============================================================================
// Feature List with Icons
// ============================================================================
interface FeatureItem {
    icon: string; // Icon name as string, mapped in component
    title: string;
    description: string;
}

interface FeatureListProps {
    features: FeatureItem[];
    accentColor: string;
    columns?: 2 | 3;
}

export function FeatureList({ features, accentColor, columns = 2 }: FeatureListProps) {
    return (
        <div
            className={`grid gap-6 ${
                columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
            }`}
        >
            {features.map((feature, index) => {
                const Icon = iconMap[feature.icon];
                return (
                    <motion.div
                        key={index}
                        className="flex gap-4 p-5 bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div
                            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${accentColor}15` }}
                        >
                            <Icon
                                className="w-6 h-6"
                                style={{ color: accentColor }}
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold text-neutral-900 mb-1">
                                {feature.title}
                            </h4>
                            <p className="text-sm text-neutral-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}

// ============================================================================
// Technology/Tool Logos Grid
// ============================================================================
interface TechLogoGridProps {
    technologies: string[];
    accentColor: string;
}

export function TechLogoGrid({ technologies, accentColor }: TechLogoGridProps) {
    return (
        <div className="flex flex-wrap gap-3">
            {technologies.map((tech, index) => (
                <motion.div
                    key={index}
                    className="px-4 py-2 bg-white rounded-lg border border-neutral-200 text-sm font-medium text-neutral-700 hover:border-neutral-300 hover:shadow-sm transition-all"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{
                        scale: 1.05,
                        borderColor: accentColor,
                    }}
                >
                    {tech}
                </motion.div>
            ))}
        </div>
    );
}

// ============================================================================
// Section Header Component
// ============================================================================
interface SectionHeaderProps {
    id: string;
    title: string;
    subtitle?: string;
    accentColor: string;
}

export function SectionHeader({ id, title, subtitle, accentColor }: SectionHeaderProps) {
    return (
        <div id={id} className="scroll-mt-28 mb-8">
            <div className="flex items-center gap-3 mb-3">
                <div
                    className="w-1 h-8 rounded-full"
                    style={{ backgroundColor: accentColor }}
                />
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                    {title}
                </h2>
            </div>
            {subtitle && (
                <p className="text-lg text-neutral-600 ml-5">{subtitle}</p>
            )}
        </div>
    );
}
