"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
    Search,
    Calendar,
    Clock,
    Eye,
    User,
    ArrowRight,
    TrendingUp,
    Filter,
    X,
    Loader2,
    ChevronUp,
} from "lucide-react";
import type { BlogPost, BlogCategory } from "@/types/blog";

// =============================================================================
// Types
// =============================================================================

interface BlogListingEnhancedProps {
    posts: BlogPost[];
    categories: BlogCategory[];
    featuredPost?: BlogPost | null;
}

// =============================================================================
// Constants
// =============================================================================

const POSTS_PER_PAGE = 9;

const CATEGORY_COLORS: Record<string, string> = {
    all: "#1E4DB7",
    technology: "#1E4DB7",
    "ai-data": "#7C3AED",
    cybersecurity: "#DC2626",
    "digital-transformation": "#F59A23",
    "industry-insights": "#059669",
    "case-studies": "#E86A1D",
};

// =============================================================================
// Animation Variants
// =============================================================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 15,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.95,
        transition: {
            duration: 0.2,
        },
    },
};

const filterVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 },
    },
};

// =============================================================================
// Helper Functions
// =============================================================================

function formatDate(dateString: string | null | undefined): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatViews(views: number): string {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
}

function getCategoryColor(slug: string): string {
    return CATEGORY_COLORS[slug] || "#1E4DB7";
}

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
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
      <span className="relative drop-shadow-sm">{initials}</span>
    </div>
  );
}

// =============================================================================
// Featured Hero Card Component
// =============================================================================

function FeaturedHeroCard({ post }: { post: BlogPost }) {
    const categoryColor = post.category?.color || getCategoryColor(post.category?.slug || "");

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mb-16"
        >
            <Link href={`/blogs/${post.slug}`} className="group block">
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl">
                    {/* Background Image */}
                    <Image
                        src={post.featuredImage || "/images/blog/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `linear-gradient(135deg, ${categoryColor}20 0%, transparent 50%)`,
                        }}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
                        {/* Top Badges */}
                        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                            {/* Featured Badge */}
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F59A23] to-[#E86A1D] text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-lg"
                            >
                                <TrendingUp className="h-4 w-4" />
                                Featured
                            </motion.span>

                            {/* Category Badge */}
                            {post.category && (
                                <motion.span
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="px-4 py-2 bg-white/20 backdrop-blur-md text-white text-sm font-semibold uppercase tracking-wider rounded-full border border-white/30"
                                >
                                    {post.category.name}
                                </motion.span>
                            )}
                        </div>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight line-clamp-3 group-hover:text-[#F59A23] transition-colors duration-300"
                        >
                            {post.title}
                        </motion.h2>

                        {/* Excerpt */}
                        {post.excerpt && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-white/80 text-base md:text-lg mb-6 line-clamp-2 max-w-3xl"
                            >
                                {post.excerpt}
                            </motion.p>
                        )}

                        {/* Footer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-wrap items-center justify-between gap-4"
                        >
                            {/* Author and Meta */}
                            <div className="flex items-center gap-4">
                                {post.author && (
                                    <div className="flex items-center gap-3">
                                        <CartoonAvatar name={post.author.name} size="lg" />
                                        <div>
                                            <p className="text-white font-semibold">{post.author.name}</p>
                                            {post.author.role && (
                                                <p className="text-white/60 text-sm">{post.author.role}</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="hidden md:flex items-center gap-4 pl-4 border-l border-white/20 text-white/70 text-sm">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="h-4 w-4" />
                                        {formatDate(post.publishedAt)}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="h-4 w-4" />
                                        {post.readingTime} min read
                                    </span>
                                    {post.viewsCount > 0 && (
                                        <span className="flex items-center gap-1.5">
                                            <Eye className="h-4 w-4" />
                                            {formatViews(post.viewsCount)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Read More */}
                            <div className="flex items-center gap-3 text-white font-semibold group-hover:gap-4 transition-all duration-300">
                                <span className="hidden sm:inline">Read Article</span>
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#F59A23] transition-colors duration-300">
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1E4DB7] via-[#F59A23] to-[#E86A1D] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
            </Link>
        </motion.div>
    );
}

// =============================================================================
// Article Card Component
// =============================================================================

function ArticleCard({ post, index }: { post: BlogPost; index: number }) {
    const categoryColor = post.category?.color || getCategoryColor(post.category?.slug || "");

    return (
        <motion.div
            layout
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="group"
        >
            <Link href={`/blogs/${post.slug}`} className="block h-full">
                <div className="relative h-full bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-neutral-200/50 transition-all duration-500">
                    {/* Glow effect on hover */}
                    <div
                        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                        style={{ backgroundColor: `${categoryColor}20` }}
                    />

                    {/* Image Section */}
                    <div className="relative h-48 md:h-52 overflow-hidden">
                        <Image
                            src={post.featuredImage || "/images/blog/placeholder.jpg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Category Badge */}
                        {post.category && (
                            <div className="absolute top-4 left-4 z-10">
                                <span
                                    className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white rounded-lg shadow-lg"
                                    style={{
                                        backgroundColor: categoryColor,
                                        boxShadow: `0 4px 14px ${categoryColor}40`,
                                    }}
                                >
                                    {post.category.name}
                                </span>
                            </div>
                        )}

                        {/* Reading time badge */}
                        <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-white" />
                            <span className="text-white text-xs font-medium">{post.readingTime} min</span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="relative p-5 md:p-6">
                        {/* Title */}
                        <h3 className="text-lg font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-[#1E4DB7] transition-colors duration-300 leading-tight">
                            {post.title}
                        </h3>

                        {/* Excerpt */}
                        {post.excerpt && (
                            <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-2">
                                {post.excerpt}
                            </p>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                            {/* Author Info */}
                            {post.author ? (
                                <div className="flex items-center gap-2.5">
                                    <CartoonAvatar name={post.author.name} size="sm" />
                                    <span className="text-sm font-medium text-neutral-700">
                                        {post.author.name}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                                    <User className="h-3.5 w-3.5" />
                                    <span>Global Digibit</span>
                                </div>
                            )}

                            {/* Date */}
                            <div className="flex items-center gap-1 text-xs text-neutral-500">
                                <Calendar className="h-3 w-3" />
                                {formatDate(post.publishedAt)}
                            </div>
                        </div>
                    </div>

                    {/* Bottom accent line */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                        style={{
                            background: `linear-gradient(90deg, ${categoryColor} 0%, #F59A23 100%)`,
                        }}
                    />
                </div>
            </Link>
        </motion.div>
    );
}

// =============================================================================
// Category Filter Bar Component
// =============================================================================

function CategoryFilterBar({
    categories,
    selectedCategory,
    onCategoryChange,
    postCounts,
}: {
    categories: BlogCategory[];
    selectedCategory: string;
    onCategoryChange: (slug: string) => void;
    postCounts: Record<string, number>;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
        >
            <LayoutGroup>
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    {/* All Categories */}
                    <motion.button
                        layout
                        layoutId="category-all"
                        onClick={() => onCategoryChange("all")}
                        className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                            selectedCategory === "all"
                                ? "text-white shadow-lg"
                                : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                        }`}
                        style={
                            selectedCategory === "all"
                                ? {
                                      backgroundColor: CATEGORY_COLORS.all,
                                      boxShadow: `0 4px 14px ${CATEGORY_COLORS.all}30`,
                                  }
                                : undefined
                        }
                    >
                        <Filter className="h-4 w-4" />
                        All
                        <span
                            className={`px-1.5 py-0.5 rounded-md text-xs font-semibold ${
                                selectedCategory === "all"
                                    ? "bg-white/20 text-white"
                                    : "bg-neutral-100 text-neutral-500"
                            }`}
                        >
                            {postCounts.all || 0}
                        </span>
                    </motion.button>

                    {/* Category Pills */}
                    {categories.map((category) => {
                        const isActive = selectedCategory === category.slug;
                        const categoryColor = category.color || getCategoryColor(category.slug);
                        const count = postCounts[category.slug] || 0;

                        return (
                            <motion.button
                                key={category.id}
                                layout
                                layoutId={`category-${category.id}`}
                                onClick={() => onCategoryChange(category.slug)}
                                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                    isActive
                                        ? "text-white shadow-lg"
                                        : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                                }`}
                                style={
                                    isActive
                                        ? {
                                              backgroundColor: categoryColor,
                                              boxShadow: `0 4px 14px ${categoryColor}30`,
                                          }
                                        : undefined
                                }
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {category.name}
                                <span
                                    className={`px-1.5 py-0.5 rounded-md text-xs font-semibold ${
                                        isActive
                                            ? "bg-white/20 text-white"
                                            : "bg-neutral-100 text-neutral-500"
                                    }`}
                                >
                                    {count}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </LayoutGroup>
        </motion.div>
    );
}

// =============================================================================
// Search Bar Component
// =============================================================================

function SearchBar({
    searchQuery,
    onSearchChange,
    onClear,
}: {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    onClear: () => void;
}) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative w-full max-w-md mb-8"
        >
            <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    isFocused ? "text-[#1E4DB7]" : "text-neutral-400"
                }`}
            >
                <Search className="h-5 w-5" />
            </div>
            <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`w-full pl-12 pr-10 py-3.5 bg-white rounded-xl border text-sm placeholder:text-neutral-400 text-neutral-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1E4DB7]/20 focus:border-[#1E4DB7] ${
                    isFocused
                        ? "border-[#1E4DB7] shadow-lg shadow-[#1E4DB7]/5"
                        : "border-neutral-200 hover:border-neutral-300"
                }`}
            />
            <AnimatePresence>
                {searchQuery && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={onClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 transition-colors"
                    >
                        <X className="h-4 w-4 text-neutral-400" />
                    </motion.button>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// =============================================================================
// Load More Button Component
// =============================================================================

function LoadMoreButton({
    onClick,
    isLoading,
    remaining,
}: {
    onClick: () => void;
    isLoading: boolean;
    remaining: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-12"
        >
            <motion.button
                onClick={onClick}
                disabled={isLoading}
                className="group flex items-center gap-3 px-8 py-4 bg-white rounded-xl border border-neutral-200 text-neutral-700 font-semibold text-sm hover:border-[#1E4DB7] hover:text-[#1E4DB7] hover:shadow-lg hover:shadow-[#1E4DB7]/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Loading...</span>
                    </>
                ) : (
                    <>
                        <span>Load More Articles</span>
                        <span className="px-2 py-1 bg-neutral-100 group-hover:bg-[#1E4DB7]/10 rounded-lg text-xs font-semibold transition-colors">
                            {remaining} remaining
                        </span>
                    </>
                )}
            </motion.button>
        </motion.div>
    );
}

// =============================================================================
// Scroll To Top Button Component
// =============================================================================

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 800);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-[#1E4DB7] text-white rounded-full shadow-lg shadow-[#1E4DB7]/30 flex items-center justify-center hover:bg-[#143A8F] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronUp className="h-5 w-5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

// =============================================================================
// Main Component
// =============================================================================

export function BlogListingEnhanced({
    posts,
    categories,
    featuredPost,
}: BlogListingEnhancedProps) {
    const gridRef = useRef<HTMLDivElement>(null);

    // State
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [visibleCount, setVisibleCount] = useState<number>(POSTS_PER_PAGE);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Calculate post counts by category
    const postCounts = useMemo(() => {
        const counts: Record<string, number> = { all: posts.length };
        categories.forEach((cat) => {
            counts[cat.slug] = posts.filter((p) => p.category?.slug === cat.slug).length;
        });
        return counts;
    }, [posts, categories]);

    // Filter posts
    const filteredPosts = useMemo(() => {
        let result = [...posts];

        // Exclude featured post from grid
        if (featuredPost) {
            result = result.filter((p) => p.id !== featuredPost.id);
        }

        // Filter by category
        if (selectedCategory !== "all") {
            result = result.filter((p) => p.category?.slug === selectedCategory);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(query) ||
                    (p.excerpt && p.excerpt.toLowerCase().includes(query))
            );
        }

        // Sort by published date (newest first)
        result.sort((a, b) => {
            const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            return dateB - dateA;
        });

        return result;
    }, [posts, featuredPost, selectedCategory, searchQuery]);

    // Visible posts
    const visiblePosts = useMemo(() => {
        return filteredPosts.slice(0, visibleCount);
    }, [filteredPosts, visibleCount]);

    const hasMore = visibleCount < filteredPosts.length;
    const totalResults = filteredPosts.length;
    const isFiltered = selectedCategory !== "all" || searchQuery.trim() !== "";

    // Handlers
    const handleCategoryChange = useCallback((slug: string) => {
        setSelectedCategory(slug);
        setVisibleCount(POSTS_PER_PAGE);
        // Smooth scroll to grid
        if (gridRef.current) {
            const yOffset = -100;
            const y = gridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    }, []);

    const handleLoadMore = useCallback(() => {
        setIsLoading(true);
        // Simulate loading delay for better UX
        setTimeout(() => {
            setVisibleCount((prev) => prev + POSTS_PER_PAGE);
            setIsLoading(false);
        }, 400);
    }, []);

    const handleClearFilters = useCallback(() => {
        setSelectedCategory("all");
        setSearchQuery("");
        setVisibleCount(POSTS_PER_PAGE);
    }, []);

    const handleSearchChange = useCallback((value: string) => {
        setSearchQuery(value);
        setVisibleCount(POSTS_PER_PAGE);
    }, []);

    return (
        <div className="w-full">
            {/* Featured Hero Card */}
            {featuredPost && <FeaturedHeroCard post={featuredPost} />}

            {/* Filter Section */}
            <div ref={gridRef} className="mb-8">
                {/* Search Bar */}
                <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    onClear={() => setSearchQuery("")}
                />

                {/* Category Filter Bar */}
                <CategoryFilterBar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    postCounts={postCounts}
                />

                {/* Results Count */}
                {isFiltered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <span className="text-sm text-neutral-500">
                            {totalResults} {totalResults === 1 ? "result" : "results"} found
                        </span>
                        <button
                            onClick={handleClearFilters}
                            className="flex items-center gap-1.5 text-sm text-[#1E4DB7] hover:text-[#143A8F] font-medium transition-colors"
                        >
                            <X className="h-4 w-4" />
                            Clear filters
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Article Grid */}
            {visiblePosts.length > 0 ? (
                <>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {visiblePosts.map((post, index) => (
                                <ArticleCard key={post.id} post={post} index={index} />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Load More Button */}
                    {hasMore && (
                        <LoadMoreButton
                            onClick={handleLoadMore}
                            isLoading={isLoading}
                            remaining={filteredPosts.length - visibleCount}
                        />
                    )}

                    {/* Results Count */}
                    <div className="flex justify-center mt-8">
                        <p className="text-sm text-neutral-500">
                            Showing {visiblePosts.length} of {filteredPosts.length} articles
                        </p>
                    </div>
                </>
            ) : (
                /* Empty State */
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20"
                >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-neutral-100 flex items-center justify-center">
                        <Search className="h-10 w-10 text-neutral-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        No articles found
                    </h3>
                    <p className="text-neutral-600 max-w-md mx-auto mb-6">
                        {isFiltered
                            ? "We couldn't find any articles matching your filters. Try adjusting your search or browse all articles."
                            : "No articles are currently available. Check back soon for new content."}
                    </p>
                    {isFiltered && (
                        <motion.button
                            onClick={handleClearFilters}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E4DB7] text-white rounded-xl font-medium hover:bg-[#143A8F] transition-colors shadow-md shadow-[#1E4DB7]/20"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <X className="h-4 w-4" />
                            Clear All Filters
                        </motion.button>
                    )}
                </motion.div>
            )}

            {/* Scroll To Top Button */}
            <ScrollToTopButton />
        </div>
    );
}

export default BlogListingEnhanced;
