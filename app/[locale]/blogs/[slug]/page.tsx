import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/shared/components";
import { CTASection } from "@/components/shared";
import {
    ParallaxHero,
    ReadingProgress,
    StickyShareBar,
    BlogArticleClient,
} from "@/components/blog";
import {
    blogPosts,
    getPostWithRelations,
    getPostsByCategory,
    blogCategories,
    type BlogPostWithRelations,
} from "@/data/blog";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostWithRelations(slug);

    if (!post) {
        return {
            title: "Blog Post Not Found",
        };
    }

    return {
        title: `${post.title} | Women Connect International`,
        description: post.excerpt,
        keywords: [
            post.category.name.toLowerCase(),
            ...post.tags.map((tag) => tag.name.toLowerCase()),
            "blog",
            "insights",
            "women connect international",
        ],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://womenconnectintl.org/blogs/${slug}`,
            images: post.featuredImage ? [{ url: post.featuredImage }] : undefined,
            type: "article",
            publishedTime: post.publishedAt,
            authors: [post.author.name],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: post.featuredImage ? [post.featuredImage] : undefined,
        },
    };
}

export default async function BlogDetailPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const post = getPostWithRelations(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getPostsByCategory(post.categoryId).filter(p => p.slug !== post.slug).slice(0, 3);
    const shareUrl = `https://womenconnectintl.org/blogs/${slug}`;

    return (
        <div className="min-h-screen bg-white">
            {/* Reading Progress Bar - Fixed at top */}
            <ReadingProgress height={3} showPercentage={false} />

            {/* Sticky Share Bar - Left side on desktop, bottom on mobile */}
            <StickyShareBar
                url={shareUrl}
                title={post.title}
                description={post.excerpt}
                showAfter={500}
            />

            {/* Parallax Hero Section */}
            <ParallaxHero post={post as BlogPostWithRelations} locale={locale} />

            {/* Main Article Content with TOC Sidebar */}
            <BlogArticleClient
                post={post as BlogPostWithRelations}
                relatedPosts={relatedPosts as BlogPostWithRelations[]}
            />

            {/* Newsletter CTA Section */}
            <section className="w-full py-20 md:py-28 bg-gradient-to-br from-[#0D7377] via-[#095456] to-[#0D7377] relative overflow-hidden">
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
                        <div className="flex justify-center mb-8">
                            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-fade-in-up">
                                <Mail className="h-10 w-10 text-white" />
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in-up">
                            Stay Ahead with{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59A23] to-[#C2185B]">
                                Expert Insights
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-white/80 mb-10 animate-fade-in-up">
                            Subscribe to our newsletter and receive the latest articles,
                            industry insights, and exclusive content directly in your inbox.
                        </p>

                        {/* Newsletter Form */}
                        <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto animate-fade-in-up">
                            <div className="flex-1 relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#F59A23]/20 to-[#C2185B]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="relative w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:border-[#F59A23]/50 focus:bg-white/15 transition-all duration-300"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="px-8 py-4 bg-gradient-to-r from-[#F59A23] to-[#C2185B] hover:from-[#C2185B] hover:to-[#F59A23] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#F59A23]/25"
                            >
                                Subscribe
                            </Button>
                        </form>

                        {/* Trust Message */}
                        <p className="text-sm text-white/60 mt-6 animate-fade-in-up">
                            Join our growing community. No spam, unsubscribe anytime.
                        </p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <CTASection
                title="Have Questions?"
                accentTitle="Let's Talk"
                description="Our team is ready to support you on your journey toward resilience, empowerment, and leadership."
                primaryCTA={{
                    label: "Contact Us",
                    href: "/contact",
                }}
                secondaryCTA={{
                    label: "Our Programs",
                    href: "/programs",
                }}
                showContactOptions={true}
            />
        </div>
    );
}
