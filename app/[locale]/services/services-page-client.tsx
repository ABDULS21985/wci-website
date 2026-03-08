"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    ChevronDown,
    Layers,
    Handshake,
    Building2,
    Shield,
    Award,
    CheckCircle,
    BadgeCheck,
    Sparkles,
    Brain,
    Code2,
    Headset,
    Target,
    Rocket,
    Network,
    TrendingDown,
    Settings2,
    Heart,
    Building,
    Cloud,
    ShieldAlert,
    Scale,
    PiggyBank,
    GraduationCap,
    Leaf,
    RotateCcw,
    SearchCheck,
    Landmark,
    Microscope,
    type LucideIcon,
    Filter,
    LayoutGrid,
    List,
} from "lucide-react";
import { Button } from "@/components/ui/shared/components";
import { cn } from "@/components/ui/shared/lib/utils";
import type { ServiceTower } from "@/types/services-global";
import {
    EngagementModels,
    IndustryPractices,
} from "@/components/services";
import { TrustIndicators, CTASection } from "@/components/shared";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
    Target,
    Rocket,
    Network,
    TrendingDown,
    Settings2,
    Heart,
    Sparkles,
    Brain,
    Building,
    Cloud,
    ShieldAlert,
    Scale,
    PiggyBank,
    GraduationCap,
    Leaf,
    Handshake,
    RotateCcw,
    SearchCheck,
    Code2,
    Headset,
    Landmark,
    Microscope,
    Shield,
};

// Service categories for filtering
const serviceCategories = [
    { id: "all", label: "All Services", icon: Layers },
    { id: "consulting", label: "Consulting", icon: Target },
    { id: "technology", label: "Technology", icon: Code2 },
    { id: "managed", label: "Managed Services", icon: Headset },
] as const;

// Map service towers to categories based on their code
function getCategoryForTower(code: string): string {
    const consultingCodes = ["STRATEGY", "TRANSFORM", "OPS-MODEL", "PERF-COST", "OPS-EXCEL", "CX-GROWTH", "CHANGE-HR"];
    const technologyCodes = ["DIGITAL", "AI-DATA", "EA-TECH", "CLOUD", "APP-DEV", "BLOCKCHAIN", "INNOVATION"];
    const managedCodes = ["CYBER", "RISK-COMPLY", "AUDIT", "FINANCE", "TALENT-L&D", "SUSTAIN", "RECOVER", "VENDOR"];

    if (consultingCodes.includes(code)) return "consulting";
    if (technologyCodes.includes(code)) return "technology";
    if (managedCodes.includes(code)) return "managed";
    return "consulting";
}

// Certification badges
const certificationBadges = [
    { name: "ISO 27001", description: "Information Security", icon: Shield },
    { name: "NIST CSF", description: "Cybersecurity Framework", icon: CheckCircle },
    { name: "SOC 2", description: "Service Organization Control", icon: Award },
    { name: "TOGAF", description: "Enterprise Architecture", icon: BadgeCheck },
];

interface ServicesPageClientProps {
    towers: ServiceTower[];
}

// Animated Counter Component
function AnimatedCounter({
    end,
    duration = 2000,
    suffix = "",
    prefix = "",
}: {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
}) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, end, duration]);

    return (
        <div ref={ref} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {prefix}
            {count}
            {suffix}
        </div>
    );
}

// Enhanced Service Card with hover effects
function EnhancedServiceCard({ tower }: { tower: ServiceTower }) {
    const IconComponent = iconMap[tower.icon] || Target;
    const serviceCount = tower.services?.length || 0;
    const accentColor = tower.accentColor || "#1E4DB7";

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
        >
            <Link
                href={`/services/${tower.slug}`}
                className="group relative block bg-white rounded-2xl border border-neutral-200/80 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1"
            >
                {/* Gradient background on hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 60%)`,
                    }}
                />

                {/* Featured Badge */}
                {tower.isFeatured && (
                    <div className="absolute top-4 right-4 z-10">
                        <span
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg"
                            style={{
                                backgroundColor: accentColor,
                                boxShadow: `0 4px 14px ${accentColor}40`,
                            }}
                        >
                            <Sparkles className="h-3 w-3" />
                            Featured
                        </span>
                    </div>
                )}

                {/* Card Content */}
                <div className="relative p-6">
                    {/* Icon */}
                    <div
                        className="relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 mb-4"
                        style={{ backgroundColor: `${accentColor}12` }}
                    >
                        <div
                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                            style={{ backgroundColor: `${accentColor}30` }}
                        />
                        <IconComponent
                            className="relative h-7 w-7 transition-colors duration-300"
                            style={{ color: accentColor }}
                            strokeWidth={1.5}
                        />
                    </div>

                    {/* Tower Code */}
                    <span
                        className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider mb-3 uppercase"
                        style={{
                            backgroundColor: `${accentColor}08`,
                            color: accentColor,
                        }}
                    >
                        {tower.code}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-neutral-900 mb-2 transition-colors duration-300 group-hover:text-primary leading-tight">
                        {tower.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-2">
                        {tower.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                        <div className="flex items-center gap-2">
                            <span
                                className="text-xl font-bold"
                                style={{ color: accentColor }}
                            >
                                {serviceCount}
                            </span>
                            <span className="text-xs text-neutral-500 font-medium">
                                Services
                            </span>
                        </div>

                        <div
                            className="flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                            style={{ color: accentColor }}
                        >
                            <span className="text-xs">Learn More</span>
                            <div
                                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                style={{ backgroundColor: `${accentColor}10` }}
                            >
                                <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom accent line */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{
                        background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}80 100%)`,
                    }}
                />
            </Link>
        </motion.div>
    );
}

// Stripe-style cursor gradient grid
function CursorGradientGrid({ children, className }: { children: React.ReactNode; className?: string }) {
    const gridRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!gridRef.current) return;
        const rect = gridRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    return (
        <div
            ref={gridRef}
            className={cn("relative", className)}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Cursor-following gradient */}
            <div
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                style={{
                    opacity: isHovering ? 1 : 0,
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(30, 77, 183, 0.06), transparent 40%)`,
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
}

export function ServicesPageClient({ towers }: ServicesPageClientProps) {
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // Filter towers based on category
    const filteredTowers = activeCategory === "all"
        ? towers
        : towers.filter((tower) => getCategoryForTower(tower.code) === activeCategory);

    // Stats
    const totalTowers = towers.length;
    const totalServices = towers.reduce((acc, tower) => acc + (tower.services?.length || 0), 0);

    const handleScrollToServices = () => {
        const servicesSection = document.getElementById("services-content");
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen">
            {/* Enhanced Hero Section */}
            <section className="relative w-full min-h-[90vh] bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden flex items-center">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Dot Pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
                            backgroundSize: "32px 32px",
                        }}
                    />

                    {/* Animated Gradient Orbs */}
                    <motion.div
                        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[100px]"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.2, 0.3],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                    />
                    <motion.div
                        className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-accent-orange/10 rounded-full blur-[80px]"
                        animate={{
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                            opacity: [0.1, 0.15, 0.1],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Geometric Grid */}
                    <svg
                        className="absolute inset-0 w-full h-full opacity-[0.02]"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern
                                id="hero-grid"
                                width="80"
                                height="80"
                                patternUnits="userSpaceOnUse"
                            >
                                <path
                                    d="M 80 0 L 0 0 0 80"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="1"
                                />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hero-grid)" />
                    </svg>
                </div>

                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        {/* Trust Badge */}
                        <motion.div
                            className="flex justify-center mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80 text-sm font-medium">
                                <span className="flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Enterprise-Grade Technology Services
                            </div>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.div
                            className="text-center mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4">
                                Enterprise{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent-orange">
                                    Technology Services
                                </span>
                            </h1>
                        </motion.div>

                        {/* Subheading with Stats */}
                        <motion.div
                            className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-center mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <span className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white font-semibold text-sm md:text-base">
                                {totalTowers} Service Towers
                            </span>
                            <span className="text-white/30">|</span>
                            <span className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white font-semibold text-sm md:text-base">
                                {totalServices}+ Specialized Services
                            </span>
                            <span className="text-white/30">|</span>
                            <span className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white font-semibold text-sm md:text-base">
                                5 Industry Practices
                            </span>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            className="text-lg md:text-xl text-white/70 text-center max-w-3xl mx-auto mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            From strategic advisory to cutting-edge technology implementation,
                            we deliver <span className="text-white font-medium">end-to-end consulting excellence</span> that
                            transforms enterprises and drives sustainable growth.
                        </motion.p>

                        {/* Animated Stats */}
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                <AnimatedCounter end={22} />
                                <div className="text-sm md:text-base text-white/50 mt-2">Service Towers</div>
                            </div>
                            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                <AnimatedCounter end={100} suffix="+" />
                                <div className="text-sm md:text-base text-white/50 mt-2">Services</div>
                            </div>
                            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                <AnimatedCounter end={5} />
                                <div className="text-sm md:text-base text-white/50 mt-2">Industries</div>
                            </div>
                            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                <AnimatedCounter end={50} suffix="+" />
                                <div className="text-sm md:text-base text-white/50 mt-2">Certifications</div>
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <Button
                                onClick={handleScrollToServices}
                                size="lg"
                                className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-full px-8 h-12 text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-white/10"
                            >
                                Explore Services
                                <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="border-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40 rounded-full px-8 h-12 text-base font-semibold transition-all duration-300"
                            >
                                <Link href="/contact">
                                    Contact Us
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Certification Badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <div className="text-center mb-4">
                                <span className="text-xs md:text-sm font-medium text-white/40 uppercase tracking-wider">
                                    Certified & Compliant
                                </span>
                            </div>
                            <div className="flex flex-wrap justify-center gap-3">
                                {certificationBadges.map((cert) => (
                                    <div
                                        key={cert.name}
                                        className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <cert.icon className="h-4 w-4 text-white/60 group-hover:text-primary" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-sm font-semibold text-white/90">{cert.name}</div>
                                            <div className="text-xs text-white/40 hidden sm:block">{cert.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        viewBox="0 0 1440 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-auto"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                            fill="white"
                        />
                    </svg>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/40"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-xs uppercase tracking-wider">Scroll</span>
                    <ChevronDown className="h-4 w-4" />
                </motion.div>
            </section>

            {/* Services Grid Section with Filters */}
            <section id="services-content" className="py-20 md:py-28 bg-gradient-to-b from-white to-neutral-50/50">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        className="max-w-4xl mx-auto text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent-orange to-transparent"></div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full">
                                <Layers className="h-4 w-4 text-primary" />
                                <span className="text-xs font-bold tracking-wider text-primary uppercase">
                                    Service Portfolio
                                </span>
                            </div>
                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent-orange to-transparent"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                            Our{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Service Towers
                            </span>
                        </h2>
                        <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
                            Comprehensive capabilities across {totalTowers} service towers,
                            designed to address your most critical business and
                            technology challenges.
                        </p>
                    </motion.div>

                    {/* Filter Bar */}
                    <motion.div
                        className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {/* Category Filters */}
                        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-neutral-100 rounded-2xl">
                            {serviceCategories.map((category) => {
                                const isActive = activeCategory === category.id;
                                const CategoryIcon = category.icon;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                                            isActive
                                                ? "bg-white text-primary shadow-sm shadow-primary/10"
                                                : "text-neutral-500 hover:text-neutral-700 hover:bg-white/50"
                                        )}
                                    >
                                        <CategoryIcon className="h-4 w-4" />
                                        {category.label}
                                        {isActive && (
                                            <span className="ml-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                                                {filteredTowers.length}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center gap-1 p-1.5 bg-neutral-100 rounded-xl">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={cn(
                                    "p-2.5 rounded-lg transition-all duration-300",
                                    viewMode === "grid"
                                        ? "bg-white text-primary shadow-sm"
                                        : "text-neutral-400 hover:text-neutral-600"
                                )}
                                aria-label="Grid view"
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={cn(
                                    "p-2.5 rounded-lg transition-all duration-300",
                                    viewMode === "list"
                                        ? "bg-white text-primary shadow-sm"
                                        : "text-neutral-400 hover:text-neutral-600"
                                )}
                                aria-label="List view"
                            >
                                <List className="h-4 w-4" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Cards Grid with Cursor Gradient */}
                    <CursorGradientGrid className="rounded-3xl p-2">
                        <motion.div
                            layout
                            className={cn(
                                viewMode === "grid"
                                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                    : "grid grid-cols-1 md:grid-cols-2 gap-4"
                            )}
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredTowers.map((tower) => (
                                    <EnhancedServiceCard key={tower.code} tower={tower} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </CursorGradientGrid>

                    {/* Empty State */}
                    {filteredTowers.length === 0 && (
                        <motion.div
                            className="text-center py-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-neutral-100 flex items-center justify-center">
                                <Filter className="h-10 w-10 text-neutral-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                No services found
                            </h3>
                            <p className="text-neutral-600 max-w-md mx-auto mb-4">
                                No services match the selected category. Try selecting a different filter.
                            </p>
                            <button
                                onClick={() => setActiveCategory("all")}
                                className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                View All Services
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* How We Engage Section */}
            <section className="py-20 md:py-28 bg-gradient-to-br from-neutral-50 via-white to-primary/5 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <motion.div
                        className="max-w-4xl mx-auto text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent-orange to-transparent"></div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-accent-orange/10 rounded-full">
                                <Handshake className="h-4 w-4 text-accent-orange" />
                                <span className="text-xs font-bold tracking-wider text-accent-orange uppercase">
                                    Engagement Options
                                </span>
                            </div>
                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent-orange to-transparent"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                            How We{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-red">
                                Engage
                            </span>
                        </h2>
                        <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
                            Flexible engagement models tailored to your needs,
                            timeline, and objectives.
                        </p>
                    </motion.div>

                    <EngagementModels />
                </div>
            </section>

            {/* Industry Practices Section */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        className="max-w-4xl mx-auto text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full">
                                <Building2 className="h-4 w-4 text-primary" />
                                <span className="text-xs font-bold tracking-wider text-primary uppercase">
                                    Industry Expertise
                                </span>
                            </div>
                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                            Industry{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Practices
                            </span>
                        </h2>
                        <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
                            Deep domain expertise across key industries, enabling
                            us to deliver contextually relevant solutions.
                        </p>
                    </motion.div>

                    <IndustryPractices />
                </div>
            </section>

            {/* Trust Indicators */}
            <TrustIndicators />

            {/* Custom Solution CTA Section */}
            <section className="py-20 md:py-28 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-orange/10 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80 text-sm font-medium mb-8">
                            <Sparkles className="h-4 w-4 text-accent-orange" />
                            Tailored Solutions
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Need a{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-red">
                                Custom Solution?
                            </span>
                        </h2>

                        <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                            Our experts can design a tailored engagement that addresses your
                            unique challenges. Let&apos;s discuss how we can help transform your organization.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-full px-8 h-14 text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-white/10"
                            >
                                <Link href="/contact">
                                    Schedule Consultation
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="border-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40 rounded-full px-8 h-14 text-base font-semibold transition-all duration-300"
                            >
                                <Link href="/resources/service-catalog">
                                    Download Service Catalog
                                </Link>
                            </Button>
                        </div>

                        {/* Quick Contact Info */}
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/60">
                            <a
                                href="mailto:connect@globaldigibit.com"
                                className="flex items-center gap-2 hover:text-white transition-colors"
                            >
                                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <ArrowRight className="h-4 w-4 rotate-[-45deg]" />
                                </span>
                                connect@globaldigibit.com
                            </a>
                            <a
                                href="tel:+97477953122"
                                className="flex items-center gap-2 hover:text-white transition-colors"
                            >
                                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <ArrowRight className="h-4 w-4 rotate-[-45deg]" />
                                </span>
                                +974 7795 3122
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
