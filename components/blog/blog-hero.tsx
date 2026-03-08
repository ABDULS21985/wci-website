"use client";

import { useState } from "react";
import {
    Search,
    Newspaper,
    BookOpen,
    Users,
    Tag,
    TrendingUp,
    Sparkles,
} from "lucide-react";

interface BlogHeroProps {
    stats?: {
        totalArticles: number;
        categories: number;
        expertAuthors: number;
    };
    categories?: string[];
    onSearch?: (query: string) => void;
    onCategoryChange?: (category: string) => void;
    selectedCategory?: string;
}

const defaultStats = {
    totalArticles: 150,
    categories: 8,
    expertAuthors: 25,
};

const defaultCategories = [
    "All",
    "Technology",
    "AI & Data",
    "Cybersecurity",
    "Blockchain",
    "Digital Transformation",
    "Governance",
    "Industry Insights",
];

export function BlogHero({
    stats = defaultStats,
    categories = defaultCategories,
    onSearch,
    onCategoryChange,
    selectedCategory = "All",
}: BlogHeroProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState(selectedCategory);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.(searchQuery);
    };

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        onCategoryChange?.(category);
    };

    return (
        <section className="relative w-full min-h-[70vh] bg-gradient-to-br from-[#1E4DB7] via-[#143A8F] to-[#1E4DB7] overflow-hidden flex items-center">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Dot Pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Animated Gradient Orbs */}
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#F59A23]/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#143A8F]/40 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-[#E86A1D]/10 rounded-full blur-3xl animate-pulse delay-500" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F59A23]/5 rounded-full blur-3xl" />

                {/* Geometric Lines */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-5"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern
                            id="blog-grid-pattern"
                            width="60"
                            height="60"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 60 0 L 0 0 0 60"
                                fill="none"
                                stroke="white"
                                strokeWidth="1"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#blog-grid-pattern)" />
                </svg>
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Badge */}
                    <div className="flex justify-center mb-8 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium">
                            <Sparkles className="h-4 w-4 text-[#F59A23]" />
                            Thought Leadership & Expert Analysis
                        </div>
                    </div>

                    {/* Main Heading */}
                    <div
                        className="text-center mb-6 animate-fade-in-up"
                        style={{ animationDelay: "100ms" }}
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
                            Insights &{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59A23] to-[#E86A1D]">
                                Innovation
                            </span>
                        </h1>
                    </div>

                    {/* Subheading */}
                    <p
                        className="text-lg md:text-xl text-white/80 text-center max-w-3xl mx-auto mb-10 animate-fade-in-up"
                        style={{ animationDelay: "200ms" }}
                    >
                        Explore cutting-edge perspectives on{" "}
                        <span className="text-white font-semibold">technology trends</span>,{" "}
                        <span className="text-[#F59A23] font-semibold">industry insights</span>, and{" "}
                        <span className="text-white font-semibold">digital transformation strategies</span>{" "}
                        from our team of experts.
                    </p>

                    {/* Search Bar */}
                    <div
                        className="max-w-2xl mx-auto mb-10 animate-fade-in-up"
                        style={{ animationDelay: "300ms" }}
                    >
                        <form onSubmit={handleSearch} className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#F59A23]/20 to-[#E86A1D]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative flex items-center">
                                <div className="absolute left-5 text-white/50 group-hover:text-white/70 transition-colors">
                                    <Search className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search articles, topics, or authors..."
                                    className="w-full pl-14 pr-32 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:border-[#F59A23]/50 focus:bg-white/15 transition-all duration-300"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 px-6 py-2 bg-gradient-to-r from-[#F59A23] to-[#E86A1D] hover:from-[#E86A1D] hover:to-[#F59A23] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#F59A23]/25"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Category Filter Pills */}
                    <div
                        className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 animate-fade-in-up"
                        style={{ animationDelay: "400ms" }}
                    >
                        {categories.map((category, index) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`
                                    group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                                    ${
                                        activeCategory === category
                                            ? "bg-gradient-to-r from-[#F59A23] to-[#E86A1D] text-white shadow-lg shadow-[#F59A23]/25"
                                            : "bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:bg-white/20 hover:text-white hover:border-white/30"
                                    }
                                `}
                                style={{ animationDelay: `${400 + index * 50}ms` }}
                            >
                                <span className="flex items-center gap-2">
                                    {category === "All" && <Tag className="h-3.5 w-3.5" />}
                                    {category === "Technology" && <TrendingUp className="h-3.5 w-3.5" />}
                                    {category}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Stats Row */}
                    <div
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto animate-fade-in-up"
                        style={{ animationDelay: "500ms" }}
                    >
                        <div className="group text-center p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-3 group-hover:bg-[#F59A23]/20 transition-colors">
                                <Newspaper className="h-6 w-6 text-[#F59A23]" />
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                {stats.totalArticles}+
                            </div>
                            <div className="text-sm text-white/60">Total Articles</div>
                        </div>

                        <div className="group text-center p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-3 group-hover:bg-[#F59A23]/20 transition-colors">
                                <BookOpen className="h-6 w-6 text-[#F59A23]" />
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                {stats.categories}
                            </div>
                            <div className="text-sm text-white/60">Categories</div>
                        </div>

                        <div className="group text-center p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-3 group-hover:bg-[#F59A23]/20 transition-colors">
                                <Users className="h-6 w-6 text-[#F59A23]" />
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                {stats.expertAuthors}+
                            </div>
                            <div className="text-sm text-white/60">Expert Authors</div>
                        </div>
                    </div>
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
        </section>
    );
}
