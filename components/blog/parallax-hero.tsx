"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Eye,
    Tag,
    User,
} from "lucide-react";
import type { BlogPostWithRelations } from "@/data/blog";

// Get initials from name
function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

// Cartoon-style avatar with gradient
function CartoonAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = getInitials(name);
  const sizeClasses = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-12 h-12 text-base" };
  const gradients = [
    "from-blue-500 via-blue-600 to-indigo-600",
    "from-orange-400 via-orange-500 to-red-500",
    "from-emerald-400 via-emerald-500 to-teal-600",
    "from-purple-500 via-purple-600 to-pink-500",
    "from-amber-400 via-orange-500 to-red-500",
  ];
  const gradient = gradients[name.length % gradients.length];
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/30 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
      <span className="relative drop-shadow-sm">{initials}</span>
    </div>
  );
}

interface ParallaxHeroProps {
    post: BlogPostWithRelations;
    locale?: string;
}

export function ParallaxHero({ post, locale = "en" }: ParallaxHeroProps) {
    const heroRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Scroll progress for parallax effect
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    // Parallax transforms - disabled on mobile for performance
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "30%"]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1 : 1.15]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

    // Smooth spring physics for parallax
    const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 30 });
    const smoothImageScale = useSpring(imageScale, { stiffness: 100, damping: 30 });
    const smoothContentY = useSpring(contentY, { stiffness: 100, damping: 30 });
    const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

    const formattedDate = new Date(post.publishedAt).toLocaleDateString(
        locale === "ar" ? "ar-QA" : "en-US",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    return (
        <section
            ref={heroRef}
            className="relative w-full min-h-[70vh] md:min-h-[85vh] overflow-hidden"
        >
            {/* Background Image with Parallax */}
            {post.featuredImage && (
                <motion.div
                    className="absolute inset-0"
                    style={{
                        y: smoothImageY,
                        scale: smoothImageScale,
                    }}
                >
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    {/* Multi-layer Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1E4DB7]/40 via-transparent to-transparent" />
                    {/* Vignette Effect */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
                        }}
                    />
                </motion.div>
            )}

            {/* Content Container with Parallax */}
            <motion.div
                className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 h-full flex flex-col justify-end pb-12 md:pb-16 lg:pb-20 pt-32"
                style={{
                    y: smoothContentY,
                    opacity: smoothOpacity,
                }}
            >
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-all duration-300 group w-fit"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                        <span className="text-sm font-medium">Back to Insights</span>
                    </Link>
                </motion.div>

                {/* Category Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-6"
                >
                    <span
                        className="inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold uppercase tracking-wider rounded-full shadow-lg"
                        style={{
                            backgroundColor: post.category?.accentColor || "#F59A23",
                        }}
                    >
                        <Tag className="h-4 w-4" />
                        {post.category?.name || "Article"}
                    </span>
                </motion.div>

                {/* Title with word reveal animation */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 max-w-5xl leading-[1.1] tracking-tight"
                >
                    {post.title}
                </motion.h1>

                {/* Excerpt */}
                {post.excerpt && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl leading-relaxed"
                    >
                        {post.excerpt}
                    </motion.p>
                )}

                {/* Meta Info Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-wrap items-center gap-4 md:gap-6"
                >
                    {/* Author */}
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                        <CartoonAvatar name={post.author?.name || "DigiAfrika"} size="lg" />
                        <div>
                            <p className="text-white font-semibold text-sm">
                                {post.author?.name || "DigiAfrika"}
                            </p>
                            <p className="text-white/70 text-xs">
                                {post.author?.role || "Team"}
                            </p>
                        </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-white/80 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{formattedDate}</span>
                    </div>

                    {/* Reading Time */}
                    <div className="flex items-center gap-2 text-white/80 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{post.readingTime} min read</span>
                    </div>

                    {/* Views */}
                    {post.viewsCount > 0 && (
                        <div className="flex items-center gap-2 text-white/80 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm">
                                {post.viewsCount.toLocaleString()} views
                            </span>
                        </div>
                    )}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                <span className="text-white/50 text-xs uppercase tracking-wider">
                    Scroll to read
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
                >
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                </motion.div>
            </motion.div>
        </section>
    );
}
