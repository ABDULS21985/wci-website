"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
    Facebook,
    Twitter,
    Linkedin,
    Mail,
    Loader2,
    Send,
    Phone,
    MapPin,
    ArrowUp,
    Check,
    ChevronDown,
    ArrowRight,
    Eye,
} from "lucide-react";
import { Button, Input } from "@/components/ui/shared/components";
import { Link } from "@/i18n/routing";
import { motion, useScroll, useInView, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { LanguageSwitcher } from "./language-switcher";

// Social links with brand colors for hover effects
const socialLinks = [
    {
        icon: Facebook,
        href: "https://www.facebook.com/globaldigibit",
        label: "Facebook",
        hoverClass: "hover:bg-[#1877F2] hover:border-[#1877F2]",
    },
    {
        icon: Twitter,
        href: "https://x.com/digibitsoltn",
        label: "Twitter",
        hoverClass: "hover:bg-[#1DA1F2] hover:border-[#1DA1F2]",
    },
    {
        icon: Linkedin,
        href: "https://www.linkedin.com/company/digibit-solutions",
        label: "LinkedIn",
        hoverClass: "hover:bg-[#0A66C2] hover:border-[#0A66C2]",
    },
];

// Footer link data
const servicesLinks = [
    { name: "cybersecurity", href: "/services#cybersecurity" },
    { name: "aiData", href: "/services#ai-data" },
    { name: "blockchain", href: "/services#blockchain" },
    { name: "itGovernance", href: "/services#it-governance" },
    { name: "consulting", href: "/services" },
    { name: "training", href: "/services/training" },
] as const;

const productsLinks = [
    { name: "digigate", href: "/products/digigate" },
    { name: "digitrust", href: "/products/digitrust" },
    { name: "digitrack", href: "/products/digitrack" },
    { name: "trustmehub", href: "/products/trustmehub" },
    { name: "boacrm", href: "/products/boacrm" },
] as const;

const companyLinks = [
    { name: "about", href: "/about" },
    { name: "caseStudies", href: "/case-studies" },
    { name: "industries", href: "/industries" },
    { name: "insights", href: "/blogs" },
    { name: "careers", href: "/careers" },
] as const;

const contactLinks = [
    { name: "getInTouch", href: "/contact" },
    { name: "scheduleCall", href: "/contact?booking=true" },
    { name: "support", href: "/contact#support" },
] as const;

// Animation variants for stagger effect
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
} as const;

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut" as const,
        },
    },
} as const;

// Newsletter form states
type NewsletterState = "idle" | "loading" | "success" | "error";

// Animated Link component with underline effect and adequate touch targets
function AnimatedLink({
    href,
    children,
    className = ""
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <Link
            href={href}
            className={`relative text-neutral-400 hover:text-white transition-colors duration-300 block w-full lg:w-fit font-medium group text-sm py-3 lg:py-1 min-h-[44px] lg:min-h-0 flex items-center ${className}`}
        >
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
        </Link>
    );
}

// Newsletter Input with floating label
function NewsletterInput({
    value,
    onChange,
    placeholder,
    disabled,
    hasError,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    disabled: boolean;
    hasError: boolean;
}) {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value.length > 0;

    return (
        <div className="relative flex-1">
            <motion.label
                className={`absolute left-3 pointer-events-none transition-colors duration-200 ${isFocused || hasValue
                    ? "text-xs text-primary"
                    : "text-sm text-neutral-500"
                    }`}
                initial={false}
                animate={{
                    y: isFocused || hasValue ? -8 : 8,
                    scale: isFocused || hasValue ? 0.85 : 1,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                {placeholder}
            </motion.label>
            <motion.div
                animate={hasError ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
            >
                <Input
                    type="email"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    className={`bg-white/5 border-neutral-700 rounded-lg text-white focus-visible:ring-primary focus-visible:border-primary text-sm h-10 pt-3 ${hasError ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500" : ""
                        }`}
                />
            </motion.div>
        </div>
    );
}

// Back to Top Button with progress ring and bounce animation - mobile optimized
function BackToTop() {
    const { scrollYProgress } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setIsVisible(latest > 0.1);
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-4 md:bottom-8 md:right-8 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-[#FFE63B] text-[#0A1628] shadow-lg z-50 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFE63B] focus:ring-offset-2 focus:ring-offset-[#0A1628] touch-manipulation"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                    }}
                    whileHover={{
                        scale: 1.1,
                        y: [0, -4, 0],
                        transition: {
                            y: {
                                repeat: Infinity,
                                duration: 0.6,
                                ease: "easeInOut"
                            }
                        }
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Back to top"
                >
                    <svg className="absolute w-12 h-12 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
                        <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            opacity="0.2"
                        />
                        <motion.circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            style={{
                                pathLength: scrollYProgress,
                                strokeDasharray: "1 1",
                            }}
                        />
                    </svg>
                    <ArrowUp className="w-5 h-5 relative z-10" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

// Social Link with grayscale by default, full color on hover - 44x44px minimum touch target
function SocialLink({
    href,
    icon: Icon,
    label,
    hoverClass,
}: {
    href: string;
    icon: typeof Facebook;
    label: string;
    hoverClass: string;
}) {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`min-h-[44px] min-w-[44px] h-11 w-11 rounded-full bg-white/10 border border-white/20 text-neutral-400 flex items-center justify-center transition-all duration-300 hover:text-white touch-manipulation ${hoverClass}`}
                aria-label={label}
            >
                <Icon className="h-5 w-5" />
            </a>
        </motion.div>
    );
}

// Mobile accordion column component with adequate touch targets
function AccordionColumn({
    title,
    children,
    defaultOpen = false,
}: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-neutral-800 lg:border-0">
            {/* Mobile accordion header - full width with minimum 44px touch target */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full min-h-[48px] py-4 lg:hidden text-left touch-manipulation active:bg-white/5 transition-colors"
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
            >
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                    {title}
                </h3>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-2 -mr-2"
                >
                    <ChevronDown className="h-5 w-5 text-neutral-400" />
                </motion.div>
            </button>

            {/* Desktop title (always visible) */}
            <h3 className="hidden lg:block text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {title}
            </h3>

            {/* Mobile accordion content */}
            <div
                className="lg:hidden overflow-hidden"
                id={`accordion-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
            >
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            <div className="pb-4">
                                {children}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Desktop content (always visible) */}
            <div className="hidden lg:block">
                {children}
            </div>
        </div>
    );
}

// Pre-Footer CTA Band Component
function PreFooterCTA() {
    const t = useTranslations("footer.preFooter");
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#0F172A] to-[#0A1628] relative overflow-hidden"
        >
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFE63B]/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                        {t("headline")}
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-300 mb-8 md:mb-10 max-w-2xl mx-auto">
                        {t("subtext")}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4 sm:px-0">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="bg-[#FFE63B] hover:bg-[#FFD700] text-[#0A1628] font-semibold px-8 h-12 min-h-[48px] rounded-lg transition-all duration-300 w-full sm:w-auto touch-manipulation"
                            >
                                <Link href="/contact" className="flex items-center justify-center gap-2">
                                    {t("primaryCta")}
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto"
                        >
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="border-2 border-white text-white hover:bg-white hover:text-[#0A1628] font-semibold px-8 h-12 min-h-[48px] rounded-lg transition-all duration-300 bg-transparent w-full sm:w-auto touch-manipulation"
                            >
                                <Link href="/case-studies" className="flex items-center justify-center gap-2">
                                    <Eye className="h-5 w-5" />
                                    {t("secondaryCta")}
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export function Footer() {
    const [email, setEmail] = useState("");
    const [newsletterState, setNewsletterState] = useState<NewsletterState>("idle");
    const t = useTranslations("footer");
    const tLanguage = useTranslations();

    const footerRef = useRef<HTMLElement>(null);
    const isInView = useInView(footerRef, { once: true, margin: "-100px" });

    const handleSubscribe = async () => {
        if (!email || !email.includes("@")) {
            setNewsletterState("error");
            setTimeout(() => setNewsletterState("idle"), 2000);
            return;
        }

        setNewsletterState("loading");

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Simulate success (in real app, handle actual API response)
        setNewsletterState("success");

        // Reset after showing success
        setTimeout(() => {
            setNewsletterState("idle");
            setEmail("");
        }, 3000);
    };

    const isLoading = newsletterState === "loading";
    const isSuccess = newsletterState === "success";
    const hasError = newsletterState === "error";

    return (
        <>
            {/* Pre-Footer CTA Band */}
            <PreFooterCTA />

            {/* Subtle gradient line separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* Main Footer */}
            <motion.footer
                ref={footerRef}
                className="w-full bg-[#0A1628] pt-12 md:pt-16 pb-8 text-neutral-400"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <div className="container mx-auto px-4 md:px-6">
                    {/* 5-Column Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">

                        {/* Brand Column - Always expanded */}
                        <motion.div className="lg:col-span-1 space-y-6" variants={itemVariants}>
                            <Link href="/" className="inline-block">
                                <Image
                                    src="/logo/digibit.png"
                                    alt="Digibit Logo"
                                    width={150}
                                    height={50}
                                    className="h-10 w-auto object-contain brightness-0 invert"
                                />
                            </Link>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                {t("description")}
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center text-neutral-400 hover:text-white transition-colors">
                                    <Phone className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                                    <span>+234 (0) 816 177 8448</span>
                                </div>
                                <div className="flex items-center text-neutral-400 hover:text-white transition-colors">
                                    <Mail className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                                    <span>connect@globaldigibit.com</span>
                                </div>
                                <div className="flex items-start text-neutral-400">
                                    <MapPin className="h-4 w-4 mr-3 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-xs">Abuja, Nigeria | Doha, Qatar</span>
                                </div>
                            </div>

                            {/* Social Icons */}
                            <div className="flex gap-3 pt-2">
                                {socialLinks.map((social) => (
                                    <SocialLink
                                        key={social.label}
                                        href={social.href}
                                        icon={social.icon}
                                        label={social.label}
                                        hoverClass={social.hoverClass}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Services Column */}
                        <motion.div variants={itemVariants} className="lg:col-span-1">
                            <AccordionColumn title={t("services.title")}>
                                <ul className="space-y-3">
                                    {servicesLinks.map((link) => (
                                        <li key={link.name}>
                                            <AnimatedLink href={link.href}>
                                                {t(`services.${link.name}`)}
                                            </AnimatedLink>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionColumn>
                        </motion.div>

                        {/* Products Column */}
                        <motion.div variants={itemVariants} className="lg:col-span-1">
                            <AccordionColumn title={t("products.title")}>
                                <ul className="space-y-3">
                                    {productsLinks.map((link) => (
                                        <li key={link.name}>
                                            <AnimatedLink href={link.href}>
                                                {t(`products.${link.name}`)}
                                            </AnimatedLink>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionColumn>
                        </motion.div>

                        {/* Company Column */}
                        <motion.div variants={itemVariants} className="lg:col-span-1">
                            <AccordionColumn title={t("company.title")}>
                                <ul className="space-y-3">
                                    {companyLinks.map((link) => (
                                        <li key={link.name}>
                                            <AnimatedLink href={link.href}>
                                                {t(`company.${link.name}`)}
                                            </AnimatedLink>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionColumn>
                        </motion.div>

                        {/* Contact / Newsletter Column */}
                        <motion.div variants={itemVariants} className="lg:col-span-1">
                            <AccordionColumn title={t("contact.title")} defaultOpen={true}>
                                <ul className="space-y-3 mb-6">
                                    {contactLinks.map((link) => (
                                        <li key={link.name}>
                                            <AnimatedLink href={link.href}>
                                                {t(`contact.${link.name}`)}
                                            </AnimatedLink>
                                        </li>
                                    ))}
                                </ul>

                                {/* Newsletter */}
                                <div className="pt-4 border-t border-neutral-800">
                                    <h4 className="text-sm font-semibold text-white mb-3">{t("newsletter.title")}</h4>
                                    <p className="text-xs text-neutral-500 mb-4">
                                        {t("newsletter.description")}
                                    </p>
                                    <div className="flex gap-2 items-center w-full">
                                        <NewsletterInput
                                            value={email}
                                            onChange={setEmail}
                                            placeholder={t("newsletter.placeholder")}
                                            disabled={isLoading || isSuccess}
                                            hasError={hasError}
                                        />
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Button
                                                onClick={handleSubscribe}
                                                disabled={isLoading || isSuccess}
                                                size="icon"
                                                className={`shrink-0 h-11 w-11 min-h-[44px] min-w-[44px] transition-all duration-300 touch-manipulation ${isSuccess ? "bg-green-500 hover:bg-green-500" : "bg-primary hover:bg-primary/90"
                                                    }`}
                                            >
                                                <AnimatePresence mode="wait">
                                                    {isLoading ? (
                                                        <motion.div
                                                            key="loading"
                                                            initial={{ opacity: 0, rotate: 0 }}
                                                            animate={{ opacity: 1, rotate: 360 }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{ rotate: { repeat: Infinity, duration: 1 } }}
                                                        >
                                                            <Loader2 className="h-4 w-4" />
                                                        </motion.div>
                                                    ) : isSuccess ? (
                                                        <motion.div
                                                            key="success"
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0 }}
                                                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                                        >
                                                            <Check className="h-4 w-4" />
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div
                                                            key="send"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                        >
                                                            <Send className="h-4 w-4" />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </Button>
                                        </motion.div>
                                    </div>
                                    {/* Success/Error message */}
                                    <AnimatePresence>
                                        {isSuccess && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="text-xs text-green-400 mt-2"
                                            >
                                                {t("newsletter.success")}
                                            </motion.p>
                                        )}
                                        {hasError && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="text-xs text-red-400 mt-2"
                                            >
                                                {t("newsletter.error")}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </AccordionColumn>
                        </motion.div>
                    </div>

                    {/* Bottom Bar */}
                    <motion.div
                        className="border-t border-neutral-800 pt-8 mt-8"
                        variants={itemVariants}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            {/* Copyright */}
                            <p className="text-sm text-neutral-500 order-3 md:order-1">
                                &copy; {new Date().getFullYear()} {t("copyright")}
                            </p>

                            {/* Language Switcher (compact) */}
                            <div className="order-1 md:order-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-neutral-500">{tLanguage("language")}:</span>
                                    <LanguageSwitcher
                                        variant="compact"
                                        showFlag={true}
                                        showName={false}
                                        align="center"
                                        className="text-neutral-400 hover:text-white"
                                    />
                                </div>
                            </div>

                            {/* Legal Links */}
                            <div className="flex gap-6 order-2 md:order-3">
                                <AnimatedLink href="/privacy-policy" className="text-neutral-500 hover:text-white">
                                    {t("privacyPolicy")}
                                </AnimatedLink>
                                <AnimatedLink href="/terms-of-service" className="text-neutral-500 hover:text-white">
                                    {t("termsOfService")}
                                </AnimatedLink>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.footer>

            {/* Back to Top Button */}
            <BackToTop />
        </>
    );
}
