"use client";

import { useState, useMemo, useCallback } from "react";
import { cn } from "@/components/ui/shared/lib/utils";
import {
    Search,
    Grid3X3,
    LayoutList,
    ChevronDown,
    Clock,
    TrendingUp,
    Flame,
    Filter,
    X,
    FileText,
    Sparkles,
} from "lucide-react";
import { BlogCard } from "./blog-card";
import type {
    BlogPost,
    BlogCategory,
    BlogSortOption,
    BlogViewMode,
} from "@/types/blog";

// =============================================================================
// Types
// =============================================================================

interface BlogGridProps {
    posts: BlogPost[];
    categories: BlogCategory[];
    showFilters?: boolean;
    showFeatured?: boolean;
    initialCategory?: string;
    className?: string;
}

// =============================================================================
// Constants
// =============================================================================

const POSTS_PER_PAGE = 9;

const SORT_OPTIONS: { value: BlogSortOption; label: string; icon: typeof Clock }[] = [
    { value: "latest", label: "Latest", icon: Clock },
    { value: "popular", label: "Popular", icon: TrendingUp },
    { value: "trending", label: "Trending", icon: Flame },
];

// =============================================================================
// Component
// =============================================================================

export function BlogGrid({
    posts,
    categories,
    showFilters = true,
    showFeatured = true,
    initialCategory = "all",
    className,
}: BlogGridProps) {
    // -------------------------------------------------------------------------
    // Refs
    // -------------------------------------------------------------------------
    // Capture a stable time reference for trending calculation
    // Using lazy initialization to avoid impure function warning
    const [trendingTime] = useState(() => Date.now());

    // -------------------------------------------------------------------------
    // State
    // -------------------------------------------------------------------------
    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortBy, setSortBy] = useState<BlogSortOption>("latest");
    const [viewMode, setViewMode] = useState<BlogViewMode>("grid");
    const [showSortDropdown, setShowSortDropdown] = useState<boolean>(false);
    const [visibleCount, setVisibleCount] = useState<number>(POSTS_PER_PAGE);
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

    // -------------------------------------------------------------------------
    // Derived Data
    // -------------------------------------------------------------------------

    // Get featured posts (top 2 by views or marked as featured)
    const featuredPosts = useMemo(() => {
        if (!showFeatured) return [];
        return posts
            .filter((post) => post.status === "published")
            .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
            .slice(0, 2);
    }, [posts, showFeatured]);

    // Filter and sort posts
    const filteredPosts = useMemo(() => {
        let result = [...posts];

        // Exclude featured posts from main grid if showing featured section
        if (showFeatured && featuredPosts.length > 0) {
            const featuredIds = new Set(featuredPosts.map((p) => p.id));
            result = result.filter((post) => !featuredIds.has(post.id));
        }

        // Filter by category
        if (selectedCategory !== "all") {
            result = result.filter(
                (post) => post.category?.slug === selectedCategory
            );
        }

        // Filter by search query (title & excerpt)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(
                (post) =>
                    post.title.toLowerCase().includes(query) ||
                    (post.excerpt && post.excerpt.toLowerCase().includes(query))
            );
        }

        // Sort posts
        switch (sortBy) {
            case "latest":
                result.sort((a, b) => {
                    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
                    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
                    return dateB - dateA;
                });
                break;
            case "popular":
                result.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
                break;
            case "trending": {
                // Trending: combination of recency and views
                // Use stable time reference from state to avoid impure function calls
                const now = trendingTime;
                const dayMs = 24 * 60 * 60 * 1000;
                result.sort((a, b) => {
                    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
                    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
                    const ageA = Math.max(dayMs, dateA ? (now - dateA) : dayMs * 365);
                    const ageB = Math.max(dayMs, dateB ? (now - dateB) : dayMs * 365);
                    const scoreA = (a.viewsCount || 0) / (ageA / dayMs);
                    const scoreB = (b.viewsCount || 0) / (ageB / dayMs);
                    return scoreB - scoreA;
                });
                break;
            }
        }

        return result;
    }, [posts, selectedCategory, searchQuery, sortBy, showFeatured, featuredPosts, trendingTime]);

    // Visible posts (for pagination)
    const visiblePosts = useMemo(() => {
        return filteredPosts.slice(0, visibleCount);
    }, [filteredPosts, visibleCount]);

    const hasMore = visibleCount < filteredPosts.length;
    const totalResults = filteredPosts.length;
    const isFiltered = selectedCategory !== "all" || searchQuery.trim() !== "";

    // -------------------------------------------------------------------------
    // Handlers
    // -------------------------------------------------------------------------

    const handleLoadMore = useCallback(() => {
        setVisibleCount((prev) => prev + POSTS_PER_PAGE);
    }, []);

    const handleClearFilters = useCallback(() => {
        setSelectedCategory("all");
        setSearchQuery("");
        setSortBy("latest");
    }, []);

    const handleSortChange = useCallback((value: BlogSortOption) => {
        setSortBy(value);
        setShowSortDropdown(false);
    }, []);

    // -------------------------------------------------------------------------
    // Render
    // -------------------------------------------------------------------------

    return (
        <div className={cn("w-full", className)}>
            {/* ================================================================
                Featured Posts Section
            ================================================================ */}
            {showFeatured && featuredPosts.length > 0 && (
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-neutral-900">
                                Featured Posts
                            </h2>
                            <p className="text-sm text-neutral-500">
                                Our most popular articles
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {featuredPosts.map((post, index) => (
                            <div
                                key={post.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <BlogCard post={post} variant="featured" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ================================================================
                Filters Section
            ================================================================ */}
            {showFilters && (
                <div className="mb-8 space-y-6">
                    {/* Top Row: Search, Sort, View Toggle */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                        {/* Search Input */}
                        <div className="relative w-full lg:w-96">
                            <div
                                className={cn(
                                    "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200",
                                    isSearchFocused ? "text-primary" : "text-neutral-400"
                                )}
                            >
                                <Search className="h-5 w-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                className={cn(
                                    "w-full pl-12 pr-4 py-3 bg-white rounded-xl border text-sm",
                                    "placeholder:text-neutral-400 text-neutral-900",
                                    "transition-all duration-300",
                                    "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                                    isSearchFocused
                                        ? "border-primary shadow-lg shadow-primary/5"
                                        : "border-neutral-200 hover:border-neutral-300"
                                )}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 transition-colors"
                                >
                                    <X className="h-4 w-4 text-neutral-400" />
                                </button>
                            )}
                        </div>

                        {/* Right Controls: Sort & View Toggle */}
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            {/* Sort Dropdown */}
                            <div className="relative flex-1 lg:flex-none">
                                <button
                                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                                    className={cn(
                                        "flex items-center justify-between gap-3 w-full lg:w-auto px-4 py-3 bg-white rounded-xl border text-sm font-medium",
                                        "transition-all duration-300",
                                        showSortDropdown
                                            ? "border-primary ring-2 ring-primary/20"
                                            : "border-neutral-200 hover:border-neutral-300"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        {(() => {
                                            const option = SORT_OPTIONS.find((o) => o.value === sortBy);
                                            const Icon = option?.icon || Clock;
                                            return (
                                                <>
                                                    <Icon className="h-4 w-4 text-neutral-500" />
                                                    <span className="text-neutral-700">
                                                        {option?.label || "Sort"}
                                                    </span>
                                                </>
                                            );
                                        })()}
                                    </div>
                                    <ChevronDown
                                        className={cn(
                                            "h-4 w-4 text-neutral-400 transition-transform duration-200",
                                            showSortDropdown && "rotate-180"
                                        )}
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {showSortDropdown && (
                                    <>
                                        {/* Backdrop */}
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setShowSortDropdown(false)}
                                        />
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-neutral-200 shadow-xl shadow-neutral-200/50 py-2 z-20 animate-fade-in">
                                            {SORT_OPTIONS.map((option) => {
                                                const Icon = option.icon;
                                                return (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => handleSortChange(option.value)}
                                                        className={cn(
                                                            "flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors",
                                                            sortBy === option.value
                                                                ? "bg-primary/5 text-primary font-medium"
                                                                : "text-neutral-700 hover:bg-neutral-50"
                                                        )}
                                                    >
                                                        <Icon className="h-4 w-4" />
                                                        {option.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* View Toggle */}
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
                                    <Grid3X3 className="h-4 w-4" />
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
                                    <LayoutList className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="flex flex-wrap items-center gap-2">
                        {/* All Categories */}
                        <button
                            onClick={() => setSelectedCategory("all")}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                                selectedCategory === "all"
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                    : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                            )}
                        >
                            <Filter className="h-4 w-4" />
                            All
                            <span
                                className={cn(
                                    "ml-1 px-1.5 py-0.5 rounded-md text-xs font-semibold",
                                    selectedCategory === "all"
                                        ? "bg-white/20 text-white"
                                        : "bg-neutral-100 text-neutral-500"
                                )}
                            >
                                {posts.length}
                            </span>
                        </button>

                        {/* Category Pills */}
                        {categories.map((category) => {
                            const postCount = posts.filter(
                                (p) => p.category?.slug === category.slug
                            ).length;
                            const categoryColor = category.color || "#1E4DB7";
                            const isActive = selectedCategory === category.slug;

                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.slug)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                                        isActive
                                            ? "text-white shadow-md"
                                            : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                                    )}
                                    style={
                                        isActive
                                            ? {
                                                  backgroundColor: categoryColor,
                                                  boxShadow: `0 4px 14px ${categoryColor}30`,
                                              }
                                            : undefined
                                    }
                                >
                                    {category.name}
                                    <span
                                        className={cn(
                                            "px-1.5 py-0.5 rounded-md text-xs font-semibold",
                                            isActive
                                                ? "bg-white/20 text-white"
                                                : "bg-neutral-100 text-neutral-500"
                                        )}
                                    >
                                        {postCount}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Filters Summary */}
                    {isFiltered && (
                        <div className="flex items-center gap-3 pt-2">
                            <span className="text-sm text-neutral-500">
                                {totalResults} {totalResults === 1 ? "result" : "results"} found
                            </span>
                            <button
                                onClick={handleClearFilters}
                                className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                            >
                                <X className="h-4 w-4" />
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ================================================================
                Posts Grid/List
            ================================================================ */}
            {visiblePosts.length > 0 ? (
                <>
                    <div
                        className={cn(
                            viewMode === "grid"
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                : "grid grid-cols-1 gap-4"
                        )}
                    >
                        {visiblePosts.map((post, index) => (
                            <div
                                key={post.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <BlogCard
                                    post={post}
                                    variant={viewMode === "list" ? "compact" : "default"}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Load More / Pagination */}
                    {hasMore && (
                        <div className="flex justify-center mt-12">
                            <button
                                onClick={handleLoadMore}
                                className={cn(
                                    "group flex items-center gap-3 px-8 py-4 bg-white rounded-xl border border-neutral-200",
                                    "text-neutral-700 font-semibold text-sm",
                                    "hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/10",
                                    "transition-all duration-300"
                                )}
                            >
                                <span>Load More Articles</span>
                                <span className="px-2 py-1 bg-neutral-100 group-hover:bg-primary/10 rounded-lg text-xs font-semibold transition-colors">
                                    {filteredPosts.length - visibleCount} remaining
                                </span>
                            </button>
                        </div>
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
                <div className="text-center py-20">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-neutral-100 flex items-center justify-center">
                        <FileText className="h-10 w-10 text-neutral-400" />
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
                        <button
                            onClick={handleClearFilters}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                        >
                            <X className="h-4 w-4" />
                            Clear All Filters
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default BlogGrid;
