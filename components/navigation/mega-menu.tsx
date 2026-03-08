"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Shield, Database, Cloud, Brain, Lock, Code, Headphones, Monitor, Building2, BadgeCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/components/ui/shared/components";
import Image from "next/image";

// ============================================
// TYPES
// ============================================

interface MenuItem {
    title: string;
    description: string;
    href: string;
    icon?: React.ReactNode;
}

interface MenuColumn {
    title: string;
    items: MenuItem[];
}

interface FeaturedContent {
    title: string;
    description: string;
    href: string;
    image: string;
    label: string;
}

interface MegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
    menuType: "services" | "products";
}

// ============================================
// DATA
// ============================================

const servicesColumns: MenuColumn[] = [
    {
        title: "Consulting",
        items: [
            { title: "Digital Strategy", description: "Transform your business digitally", href: "/services/digital-strategy", icon: <Building2 className="w-4 h-4" /> },
            { title: "Business Process", description: "Optimize operations and workflows", href: "/services/business-process", icon: <Monitor className="w-4 h-4" /> },
            { title: "Risk & Compliance", description: "Navigate regulatory requirements", href: "/services/risk-compliance", icon: <Shield className="w-4 h-4" /> },
            { title: "ISO 42001 AIMS", description: "AI Management System certification", href: "/services/iso-42001", icon: <BadgeCheck className="w-4 h-4" /> },
        ],
    },
    {
        title: "Technology",
        items: [
            { title: "Cloud & Infrastructure", description: "Scalable cloud solutions", href: "/services/cloud-infrastructure", icon: <Cloud className="w-4 h-4" /> },
            { title: "Cybersecurity", description: "Protect your digital assets", href: "/services/cybersecurity", icon: <Lock className="w-4 h-4" /> },
            { title: "Data & AI", description: "Harness the power of data", href: "/services/data-ai", icon: <Brain className="w-4 h-4" /> },
            { title: "Software Development", description: "Custom software solutions", href: "/services/software-development", icon: <Code className="w-4 h-4" /> },
        ],
    },
    {
        title: "Managed Services",
        items: [
            { title: "24/7 Monitoring", description: "Round-the-clock system oversight", href: "/services/monitoring", icon: <Monitor className="w-4 h-4" /> },
            { title: "Managed Detection", description: "Proactive threat detection", href: "/services/managed-detection", icon: <Shield className="w-4 h-4" /> },
            { title: "IT Outsourcing", description: "Complete IT management", href: "/services/it-outsourcing", icon: <Headphones className="w-4 h-4" /> },
        ],
    },
];

const servicesFeatured: FeaturedContent = {
    title: "CBDC Implementation Success",
    description: "How we helped a central bank modernize currency infrastructure for 50M citizens.",
    href: "/case-studies/central-bank-digital-currency-implementation",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    label: "Case Study",
};

const productsItems: MenuItem[] = [
    { title: "TrustMeHub", description: "Trust & compliance management platform", href: "/products/trustmehub", icon: <Shield className="w-5 h-5 text-trustmehub" /> },
    { title: "BoaCRM", description: "Customer relations management suite", href: "/products/boacrm", icon: <Database className="w-5 h-5 text-boacrm" /> },
    { title: "DigiTrack", description: "Asset tracking & logistics", href: "/products/digitrack", icon: <Monitor className="w-5 h-5 text-primary" /> },
    { title: "DigiTrust", description: "Digital identity verification", href: "/products/digitrust", icon: <Lock className="w-5 h-5 text-primary" /> },
    { title: "DigiGate", description: "API gateway & lifecycle management", href: "/products/digigate", icon: <Building2 className="w-5 h-5 text-primary" /> },
];

const productsFeatured: FeaturedContent = {
    title: "TrustMeHub 2.0 Launch",
    description: "Discover the new features in our flagship compliance platform.",
    href: "/products/trustmehub",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    label: "New Release",
};

// ============================================
// ANIMATION VARIANTS
// ============================================

const menuVariants = {
    hidden: {
        opacity: 0,
        y: -8,
        transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] as const },
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
    },
};

// ============================================
// MEGA MENU COMPONENT
// ============================================

export function MegaMenu({ isOpen, onClose, menuType }: MegaMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Handle mouse leave with delay
    const handleMouseLeave = useCallback(() => {
        closeTimeoutRef.current = setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    const handleMouseEnter = useCallback(() => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    }, []);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={menuRef}
                    className="absolute top-full left-0 right-0 w-full bg-white border-b border-neutral-200 shadow-xl z-50 pt-2"
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    role="menu"
                    aria-label={`${menuType} menu`}
                >
                    {/* Invisible bridge zone to prevent gap between trigger and menu */}
                    <div className="absolute -top-8 left-0 right-0 h-8" />
                    <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-8">
                        {menuType === "services" ? (
                            <ServicesMenu onClose={onClose} />
                        ) : (
                            <ProductsMenu onClose={onClose} />
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ============================================
// SERVICES MENU
// ============================================

function ServicesMenu({ onClose }: { onClose: () => void }) {
    return (
        <div className="grid grid-cols-4 gap-8">
            {/* Three columns of services */}
            {servicesColumns.map((column) => (
                <div key={column.title}>
                    <h3 className="overline text-neutral-500 mb-4">{column.title}</h3>
                    <ul className="space-y-1" role="menu">
                        {column.items.map((item) => (
                            <li key={item.href} role="menuitem">
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                                >
                                    <span className="flex-shrink-0 mt-0.5 text-primary">{item.icon}</span>
                                    <div>
                                        <span className="block text-sm font-medium text-neutral-900 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </span>
                                        <span className="block text-xs text-neutral-500 mt-0.5">
                                            {item.description}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {/* Featured column */}
            <div className="border-l border-neutral-200 pl-8">
                <h3 className="overline text-neutral-500 mb-4">Featured</h3>
                <Link
                    href={servicesFeatured.href}
                    onClick={onClose}
                    className="group block rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                    <div className="relative h-32 w-full">
                        <Image
                            src={servicesFeatured.image}
                            alt={servicesFeatured.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 25vw"
                        />
                        <div className="absolute top-2 left-2">
                            <span className="text-xs font-medium bg-primary text-white px-2 py-1 rounded">
                                {servicesFeatured.label}
                            </span>
                        </div>
                    </div>
                    <div className="p-4 bg-neutral-50">
                        <h4 className="text-sm font-medium text-neutral-900 group-hover:text-primary transition-colors mb-1">
                            {servicesFeatured.title}
                        </h4>
                        <p className="text-xs text-neutral-500">{servicesFeatured.description}</p>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-2 group-hover:gap-2 transition-all">
                            Read <ChevronRight className="w-3 h-3" />
                        </span>
                    </div>
                </Link>

                <Link
                    href="/services"
                    onClick={onClose}
                    className="link-animated inline-flex items-center gap-1 text-sm font-medium text-primary mt-6"
                >
                    View All Services <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}

// ============================================
// PRODUCTS MENU
// ============================================

function ProductsMenu({ onClose }: { onClose: () => void }) {
    return (
        <div className="grid grid-cols-4 gap-8">
            {/* Products grid - spans 3 columns */}
            <div className="col-span-3">
                <div className="grid grid-cols-3 gap-4">
                    {productsItems.map((product) => (
                        <Link
                            key={product.href}
                            href={product.href}
                            onClick={onClose}
                            className="group flex items-start gap-4 p-4 rounded-xl border border-neutral-200 hover:border-primary/30 hover:bg-neutral-50 transition-all"
                        >
                            <span className="flex-shrink-0 p-2 rounded-lg bg-neutral-100 group-hover:bg-white transition-colors">
                                {product.icon}
                            </span>
                            <div>
                                <span className="block text-sm font-medium text-neutral-900 group-hover:text-primary transition-colors">
                                    {product.title}
                                </span>
                                <span className="block text-xs text-neutral-500 mt-1">
                                    {product.description}
                                </span>
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Learn More <ChevronRight className="w-3 h-3" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <Link
                    href="/products"
                    onClick={onClose}
                    className="link-animated inline-flex items-center gap-1 text-sm font-medium text-primary mt-6"
                >
                    View All Products <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Featured column */}
            <div className="border-l border-neutral-200 pl-8">
                <h3 className="overline text-neutral-500 mb-4">Featured</h3>
                <Link
                    href={productsFeatured.href}
                    onClick={onClose}
                    className="group block rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                    <div className="relative h-32 w-full">
                        <Image
                            src={productsFeatured.image}
                            alt={productsFeatured.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 25vw"
                        />
                        <div className="absolute top-2 left-2">
                            <span className="text-xs font-medium bg-accent-orange text-white px-2 py-1 rounded">
                                {productsFeatured.label}
                            </span>
                        </div>
                    </div>
                    <div className="p-4 bg-neutral-50">
                        <h4 className="text-sm font-medium text-neutral-900 group-hover:text-primary transition-colors mb-1">
                            {productsFeatured.title}
                        </h4>
                        <p className="text-xs text-neutral-500">{productsFeatured.description}</p>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-2 group-hover:gap-2 transition-all">
                            Read <ChevronRight className="w-3 h-3" />
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

// ============================================
// MEGA MENU TRIGGER
// ============================================

interface MegaMenuTriggerProps {
    label: string;
    isActive: boolean;
    isOpen: boolean;
    isTransparent?: boolean;
    onClick: () => void;
}

export function MegaMenuTrigger({
    label,
    isActive,
    isOpen,
    isTransparent,
    onClick,
}: MegaMenuTriggerProps) {
    return (
        <button
            className={cn(
                "relative flex items-center gap-1 py-2 text-sm font-medium transition-colors duration-300",
                isTransparent
                    ? isActive || isOpen
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                    : isActive || isOpen
                        ? "text-primary"
                        : "text-neutral-600 hover:text-primary"
            )}
            onClick={onClick}
            aria-expanded={isOpen}
            aria-haspopup="menu"
        >
            {label}
            <ChevronDown
                className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isOpen && "rotate-180"
                )}
            />
            <motion.span
                className={cn(
                    "absolute bottom-0 start-0 h-0.5",
                    isTransparent ? "bg-white" : "bg-primary"
                )}
                initial={false}
                animate={{ width: isActive || isOpen ? "100%" : "0%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
        </button>
    );
}
