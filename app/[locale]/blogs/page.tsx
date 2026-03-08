import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
    Newspaper,
    Mail,
    Send,
    Sparkles,
} from "lucide-react";
import { BlogHero, BlogListingEnhanced } from "@/components/blog";
import { CTASection, TrustIndicators } from "@/components/shared";
import { blogPosts, blogCategories, blogAuthors, getFeaturedPosts } from "@/data/blog";
import type { BlogPost, BlogCategory, BlogPostStatus } from "@/types/blog";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/shared/json-ld";
import { generateBreadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

// =============================================================================
// Metadata
// =============================================================================

export const metadata: Metadata = {
    title: "Blog & Insights | Global Digibit Limited",
    description:
        "Explore thought leadership, industry insights, and expert analysis on digital transformation, cybersecurity, AI, blockchain, and enterprise technology from Global Digibit Limited.",
    keywords: [
        "technology blog",
        "digital transformation insights",
        "cybersecurity articles",
        "AI thought leadership",
        "blockchain analysis",
        "enterprise technology",
        "IT consulting insights",
        "CBDC",
        "data analytics",
    ],
    openGraph: {
        title: "Blog & Insights | Global Digibit Limited",
        description:
            "Explore thought leadership, industry insights, and expert analysis on digital transformation, cybersecurity, AI, blockchain, and enterprise technology.",
        url: "https://globaldigibit.com/blogs",
        siteName: "Global Digibit Limited",
        type: "website",
        images: [
            {
                url: "https://globaldigibit.com/og-blog.jpg",
                width: 1200,
                height: 630,
                alt: "Global Digibit Blog & Insights",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog & Insights | Global Digibit Limited",
        description:
            "Explore thought leadership and expert analysis on digital transformation, cybersecurity, AI, and blockchain.",
    },
};

// =============================================================================
// Types
// =============================================================================

type Props = {
    params: Promise<{ locale: string }>;
};

// =============================================================================
// Helper Functions
// =============================================================================

function getCategoryColor(slug: string): string {
    const colors: Record<string, string> = {
        technology: "#1E4DB7",
        "ai-data": "#7C3AED",
        cybersecurity: "#DC2626",
        blockchain: "#059669",
        "digital-transformation": "#F59A23",
        governance: "#0891B2",
        "industry-insights": "#9333EA",
        "case-studies": "#E86A1D",
    };
    return colors[slug] || "#1E4DB7";
}

// Transform data format to match component types
function transformToTypedPost(post: (typeof blogPosts)[0]): BlogPost {
    const categoryData = blogCategories.find(
        (c) => c.id === post.categoryId
    );
    const authorData = blogAuthors.find(
        (a) => a.id === post.authorId
    );

    return {
        id: post.id,
        authorId: post.authorId,
        categoryId: post.categoryId || null,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content || null,
        featuredImage: post.featuredImage,
        status: post.status as BlogPostStatus,
        publishedAt: post.publishedAt,
        viewsCount: post.viewsCount || 0,
        readingTime: post.readingTime,
        author: authorData
            ? {
                id: authorData.id,
                name: authorData.name,
                avatar: authorData.avatar,
                bio: authorData.bio,
                role: authorData.role,
            }
            : undefined,
        category: categoryData
            ? {
                id: categoryData.id,
                name: categoryData.name,
                slug: categoryData.slug,
                color: getCategoryColor(categoryData.slug),
            }
            : null,
    };
}

function transformCategory(cat: (typeof blogCategories)[0]): BlogCategory {
    return {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        color: getCategoryColor(cat.slug),
        sortOrder: 1,
        isActive: true,
    };
}

// =============================================================================
// Page Component
// =============================================================================

export default async function BlogsPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    // Get featured post (first one)
    const featuredPosts = getFeaturedPosts(1);
    const featuredPost = featuredPosts.length > 0 ? transformToTypedPost(featuredPosts[0]) : null;

    const allPosts = blogPosts;
    const categories = blogCategories;

    // Transform posts for typed components
    const typedPosts = allPosts.map(transformToTypedPost);
    const typedCategories = categories.map(transformCategory);

    return (
        <>
            <JsonLd data={generateBreadcrumbSchema([
                { name: "Home", url: "/" },
                { name: "Blog & Insights", url: "/blogs" },
            ])} />
            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <BlogHero
                    stats={{
                        totalArticles: allPosts.length,
                        categories: categories.length,
                        expertAuthors: 25,
                    }}
                    categories={[
                        "All",
                        ...categories.map((c) => c.name),
                    ]}
                />

                {/* Main Blog Content Section */}
                <section className="py-16 md:py-24 bg-gradient-to-b from-white via-neutral-50/30 to-white">
                    <div className="container mx-auto px-4 md:px-6 lg:px-8">
                        {/* Section Header */}
                        <div className="max-w-4xl mx-auto text-center mb-12">
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#1E4DB7] to-transparent"></div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-[#1E4DB7]/5 rounded-full">
                                    <Newspaper className="h-4 w-4 text-[#1E4DB7]" />
                                    <span className="text-xs font-bold tracking-wider text-[#1E4DB7] uppercase">
                                        Expert Insights
                                    </span>
                                </div>
                                <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#1E4DB7] to-transparent"></div>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
                                Explore Our{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E4DB7] to-[#143A8F]">
                                    Latest Articles
                                </span>
                            </h2>
                            <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                                Discover cutting-edge perspectives on technology trends, industry insights,
                                and digital transformation strategies from our team of experts.
                            </p>
                        </div>

                        {/* Enhanced Blog Listing */}
                        <div className="max-w-7xl mx-auto">
                            <BlogListingEnhanced
                                posts={typedPosts}
                                categories={typedCategories}
                                featuredPost={featuredPost}
                            />
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="py-20 md:py-28 bg-gradient-to-br from-[#1E4DB7] via-[#143A8F] to-[#1E4DB7] relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
                                backgroundSize: "40px 40px",
                            }}
                        />
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#F59A23]/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            {/* Icon */}
                            <div className="flex justify-center mb-8 animate-fade-in-up">
                                <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                    <Mail className="h-10 w-10 text-white" />
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                                Stay Ahead with{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59A23] to-[#E86A1D]">
                                    Expert Insights
                                </span>
                            </h2>

                            {/* Description */}
                            <p className="text-lg md:text-xl text-white/80 mb-10 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                                Subscribe to our newsletter and receive the latest articles,
                                industry insights, and exclusive content directly in your inbox.
                            </p>

                            {/* Newsletter Form */}
                            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                                <div className="flex-1 relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#F59A23]/20 to-[#E86A1D]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="relative w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:border-[#F59A23]/50 focus:bg-white/15 transition-all duration-300"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-gradient-to-r from-[#F59A23] to-[#E86A1D] hover:from-[#E86A1D] hover:to-[#F59A23] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#F59A23]/25 flex items-center justify-center gap-2"
                                >
                                    Subscribe
                                    <Send className="h-5 w-5" />
                                </button>
                            </form>

                            {/* Trust Message */}
                            <p className="text-sm text-white/60 mt-6 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                                Join 5,000+ professionals. No spam, unsubscribe anytime.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Trust Indicators */}
                <TrustIndicators />

                {/* CTA Section */}
                <CTASection
                    title="Ready to Transform"
                    accentTitle="Your Business?"
                    description="Schedule a consultation with our experts to discuss how our products and services can accelerate your digital transformation journey."
                    primaryCTA={{
                        label: "Schedule Consultation",
                        href: "/contact",
                    }}
                    secondaryCTA={{
                        label: "View Our Services",
                        href: "/services",
                    }}
                />
            </div>
        </>
    );
}
