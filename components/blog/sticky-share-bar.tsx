"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Twitter,
    Linkedin,
    Facebook,
    Link2,
    Mail,
    Share2,
    Check,
    X,
} from "lucide-react";
import { cn } from "@/components/ui/shared/lib/utils";

interface StickyShareBarProps {
    url: string;
    title: string;
    description?: string;
    /** Scroll threshold to show the bar (in pixels) */
    showAfter?: number;
    /** Additional classes */
    className?: string;
}

const socialPlatforms = [
    {
        name: "Twitter",
        icon: Twitter,
        getUrl: (url: string, title: string) =>
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        color: "#1DA1F2",
        hoverClass: "hover:bg-[#1DA1F2] hover:border-[#1DA1F2]",
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        getUrl: (url: string) =>
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        color: "#0A66C2",
        hoverClass: "hover:bg-[#0A66C2] hover:border-[#0A66C2]",
    },
    {
        name: "Facebook",
        icon: Facebook,
        getUrl: (url: string) =>
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        color: "#1877F2",
        hoverClass: "hover:bg-[#1877F2] hover:border-[#1877F2]",
    },
    {
        name: "Email",
        icon: Mail,
        getUrl: (url: string, title: string, description?: string) =>
            `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description || title}\n\n${url}`)}`,
        color: "#F59A23",
        hoverClass: "hover:bg-[#F59A23] hover:border-[#F59A23]",
    },
];

export function StickyShareBar({
    url,
    title,
    description,
    showAfter = 400,
    className,
}: StickyShareBarProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Check for mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Show/hide based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const shouldShow = window.scrollY > showAfter;
            setIsVisible(shouldShow);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [showAfter]);

    // Copy link to clipboard
    const copyToClipboard = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    }, [url]);

    // Desktop version - fixed left sidebar
    if (!isMobile) {
        return (
            <AnimatePresence>
                {isVisible && (
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                            "fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3",
                            className
                        )}
                    >
                        {/* Share label */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1 writing-vertical-lr rotate-180"
                            style={{ writingMode: "vertical-rl" }}
                        >
                            Share
                        </motion.div>

                        {/* Share buttons */}
                        <div className="flex flex-col items-center gap-2 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-neutral-200/50">
                            {socialPlatforms.map((platform, index) => (
                                <motion.a
                                    key={platform.name}
                                    href={platform.getUrl(url, title, description)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                    className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center",
                                        "bg-neutral-100 border border-neutral-200",
                                        "text-neutral-600 hover:text-white",
                                        "transition-all duration-300",
                                        platform.hoverClass
                                    )}
                                    title={`Share on ${platform.name}`}
                                >
                                    <platform.icon className="h-4 w-4" />
                                </motion.a>
                            ))}

                            {/* Divider */}
                            <div className="w-6 h-px bg-neutral-200 my-1" />

                            {/* Copy link button */}
                            <motion.button
                                onClick={copyToClipboard}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.35 }}
                                className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    "border transition-all duration-300",
                                    isCopied
                                        ? "bg-green-500 border-green-500 text-white"
                                        : "bg-neutral-100 border-neutral-200 text-neutral-600 hover:bg-[#0D7377] hover:border-[#0D7377] hover:text-white"
                                )}
                                title={isCopied ? "Copied!" : "Copy link"}
                            >
                                {isCopied ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Link2 className="h-4 w-4" />
                                )}
                            </motion.button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        );
    }

    // Mobile version - fixed bottom bar with expandable menu
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                        "fixed bottom-0 left-0 right-0 z-40 lg:hidden",
                        className
                    )}
                >
                    {/* Expanded menu */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="bg-white border-t border-neutral-200 shadow-lg"
                            >
                                <div className="container mx-auto px-4 py-4">
                                    <div className="flex items-center justify-center gap-3">
                                        {socialPlatforms.map((platform) => (
                                            <a
                                                key={platform.name}
                                                href={platform.getUrl(url, title, description)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={cn(
                                                    "w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1",
                                                    "bg-neutral-100 border border-neutral-200",
                                                    "text-neutral-600 hover:text-white",
                                                    "transition-all duration-300",
                                                    platform.hoverClass
                                                )}
                                            >
                                                <platform.icon className="h-5 w-5" />
                                            </a>
                                        ))}
                                        <button
                                            onClick={copyToClipboard}
                                            className={cn(
                                                "w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1",
                                                "border transition-all duration-300",
                                                isCopied
                                                    ? "bg-green-500 border-green-500 text-white"
                                                    : "bg-neutral-100 border-neutral-200 text-neutral-600 hover:bg-[#0D7377] hover:border-[#0D7377] hover:text-white"
                                            )}
                                        >
                                            {isCopied ? (
                                                <Check className="h-5 w-5" />
                                            ) : (
                                                <Link2 className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Toggle bar */}
                    <div className="bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-lg safe-area-inset-bottom">
                        <div className="container mx-auto px-4 py-3">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="w-full flex items-center justify-center gap-2 text-neutral-700 font-medium"
                            >
                                {isExpanded ? (
                                    <>
                                        <X className="h-5 w-5" />
                                        <span>Close</span>
                                    </>
                                ) : (
                                    <>
                                        <Share2 className="h-5 w-5" />
                                        <span>Share this article</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
