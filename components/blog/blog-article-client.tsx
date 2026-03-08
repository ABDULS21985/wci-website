"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    ChevronRight,
    User,
    Twitter,
    Linkedin,
    Link2,
    ArrowRight,
    Mail,
    FileText,
} from "lucide-react";
import { cn } from "@/components/ui/shared/lib/utils";
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
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
      <span className="relative drop-shadow-sm">{initials}</span>
    </div>
  );
}

interface BlogArticleClientProps {
    post: BlogPostWithRelations;
    relatedPosts: BlogPostWithRelations[];
}

interface Heading {
    id: string;
    text: string;
    level: number;
}

// Helper function to generate ID from text
function generateId(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}

// Enhanced Markdown Content Renderer with prose styling
function EnhancedMarkdownContent({ content }: { content: string }) {
    const processContent = (text: string) => {
        const parts = text.split(/(```[\s\S]*?```)/);
        let isFirstParagraph = true;

        return parts.map((part, index) => {
            // Handle code blocks
            if (part.startsWith("```")) {
                const match = part.match(/```(\w*)\n?([\s\S]*?)```/);
                if (match) {
                    const language = match[1] || "text";
                    const code = match[2].trim();
                    return (
                        <div key={index} className="relative group my-8">
                            {/* Language badge */}
                            {language && language !== "text" && (
                                <div className="absolute top-0 right-0 px-3 py-1 bg-neutral-700 text-neutral-300 text-xs font-mono rounded-bl-lg rounded-tr-xl">
                                    {language}
                                </div>
                            )}
                            <pre className="bg-neutral-900 text-neutral-100 rounded-2xl p-6 overflow-x-auto text-sm leading-relaxed font-mono border border-neutral-800 shadow-lg">
                                <code className={`language-${language}`}>{code}</code>
                            </pre>
                        </div>
                    );
                }
            }

            // Process regular markdown
            const lines = part.split("\n");
            return lines.map((line, lineIndex) => {
                const key = `${index}-${lineIndex}`;

                // Empty line
                if (!line.trim()) {
                    return null;
                }

                // Headers
                if (line.startsWith("### ")) {
                    const text = line.slice(4);
                    const id = generateId(text);
                    return (
                        <h3
                            key={key}
                            id={id}
                            className="text-xl md:text-2xl font-bold text-neutral-900 mt-12 mb-4 scroll-mt-28 group"
                        >
                            <span className="bg-gradient-to-r from-[#1E4DB7] to-[#143A8F] bg-clip-text text-transparent">
                                {text}
                            </span>
                        </h3>
                    );
                }
                if (line.startsWith("## ")) {
                    const text = line.slice(3);
                    const id = generateId(text);
                    return (
                        <h2
                            key={key}
                            id={id}
                            className="text-2xl md:text-3xl font-bold text-neutral-900 mt-16 mb-6 scroll-mt-28 pb-3 border-b border-neutral-200"
                        >
                            {text}
                        </h2>
                    );
                }

                // Blockquotes with enhanced styling
                if (line.startsWith("> ")) {
                    return (
                        <blockquote
                            key={key}
                            className="relative my-8 pl-6 py-4 border-l-4 border-[#F59A23] bg-gradient-to-r from-[#F59A23]/5 to-transparent rounded-r-lg"
                        >
                            <div className="absolute -left-3 -top-3 text-4xl text-[#F59A23]/30 font-serif">
                                &ldquo;
                            </div>
                            <p className="text-lg italic text-neutral-700 leading-relaxed">
                                {line.slice(2)}
                            </p>
                        </blockquote>
                    );
                }

                // Unordered lists with bold items
                if (line.startsWith("- **")) {
                    const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
                    if (match) {
                        return (
                            <li key={key} className="flex items-start gap-4 my-3 ml-1">
                                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#1E4DB7] to-[#F59A23] mt-2.5 flex-shrink-0" />
                                <span className="text-neutral-700 leading-relaxed">
                                    <strong className="text-neutral-900 font-semibold">
                                        {match[1]}
                                    </strong>
                                    {match[2] && `: ${match[2]}`}
                                </span>
                            </li>
                        );
                    }
                }
                if (line.startsWith("- ")) {
                    return (
                        <li key={key} className="flex items-start gap-4 my-3 ml-1">
                            <span className="w-2 h-2 rounded-full bg-[#1E4DB7] mt-2.5 flex-shrink-0" />
                            <span className="text-neutral-700 leading-relaxed">
                                {processInlineMarkdown(line.slice(2))}
                            </span>
                        </li>
                    );
                }

                // Numbered lists with bold items
                const numberedMatch = line.match(/^(\d+)\.\s+\*\*(.+?)\*\*:?\s*(.*)/);
                if (numberedMatch) {
                    return (
                        <li key={key} className="flex items-start gap-4 my-4 ml-1">
                            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1E4DB7] to-[#143A8F] text-white text-sm flex items-center justify-center flex-shrink-0 font-bold shadow-md">
                                {numberedMatch[1]}
                            </span>
                            <span className="text-neutral-700 leading-relaxed pt-0.5">
                                <strong className="text-neutral-900 font-semibold">
                                    {numberedMatch[2]}
                                </strong>
                                {numberedMatch[3] && `: ${numberedMatch[3]}`}
                            </span>
                        </li>
                    );
                }

                const simpleNumberedMatch = line.match(/^(\d+)\.\s+(.*)/);
                if (simpleNumberedMatch) {
                    return (
                        <li key={key} className="flex items-start gap-4 my-4 ml-1">
                            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1E4DB7] to-[#143A8F] text-white text-sm flex items-center justify-center flex-shrink-0 font-bold shadow-md">
                                {simpleNumberedMatch[1]}
                            </span>
                            <span className="text-neutral-700 leading-relaxed pt-0.5">
                                {processInlineMarkdown(simpleNumberedMatch[2])}
                            </span>
                        </li>
                    );
                }

                // Horizontal rule
                if (line === "---") {
                    return (
                        <div key={key} className="my-12 flex items-center gap-4">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
                            <div className="w-2 h-2 rounded-full bg-neutral-300" />
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
                        </div>
                    );
                }

                // Regular paragraphs with drop cap on first
                if (line.trim()) {
                    const shouldDropCap = isFirstParagraph;
                    if (isFirstParagraph) {
                        isFirstParagraph = false;
                    }

                    if (shouldDropCap) {
                        const firstChar = line.trim().charAt(0);
                        const restOfParagraph = line.trim().slice(1);
                        return (
                            <p
                                key={key}
                                className="text-neutral-700 leading-[1.8] my-6 text-lg first-letter:text-5xl first-letter:font-bold first-letter:text-[#1E4DB7] first-letter:float-left first-letter:mr-3 first-letter:mt-1"
                            >
                                {processInlineMarkdown(line)}
                            </p>
                        );
                    }

                    return (
                        <p
                            key={key}
                            className="text-neutral-700 leading-[1.8] my-6 text-lg"
                        >
                            {processInlineMarkdown(line)}
                        </p>
                    );
                }

                return null;
            });
        });
    };

    // Process inline markdown (bold, italic, links, inline code)
    const processInlineMarkdown = (text: string) => {
        // Handle inline code
        text = text.replace(
            /`([^`]+)`/g,
            '<code class="bg-[#1E4DB7]/10 text-[#1E4DB7] px-2 py-0.5 rounded-md text-sm font-mono font-medium">$1</code>'
        );
        // Handle bold
        text = text.replace(
            /\*\*([^*]+)\*\*/g,
            '<strong class="font-semibold text-neutral-900">$1</strong>'
        );
        // Handle italic
        text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");

        return <span dangerouslySetInnerHTML={{ __html: text }} />;
    };

    return (
        <div className="prose-custom max-w-none">{processContent(content)}</div>
    );
}

// Sticky TOC Sidebar Component
function StickyTOCSidebar({
    headings,
    activeId,
    onHeadingClick,
    minLevel = 2,
}: {
    headings: Heading[];
    activeId: string;
    onHeadingClick: (id: string) => void;
    minLevel?: number;
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (headings.length < 3) return null;

    return (
        <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white rounded-2xl border border-neutral-100 shadow-lg overflow-hidden"
                >
                    {/* Header */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-neutral-50 to-white hover:from-neutral-100 hover:to-neutral-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#1E4DB7]/10 flex items-center justify-center">
                                <BookOpen className="h-4 w-4 text-[#1E4DB7]" />
                            </div>
                            <span className="text-sm font-bold text-neutral-800">
                                Table of Contents
                            </span>
                        </div>
                        <motion.div
                            animate={{ rotate: isCollapsed ? -90 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronRight className="h-4 w-4 text-neutral-400" />
                        </motion.div>
                    </button>

                    {/* Navigation */}
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <nav className="p-4 pt-0">
                                    {/* Progress indicator */}
                                    <div className="mb-4">
                                        <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-[#1E4DB7] to-[#F59A23]"
                                                style={{
                                                    width: `${((headings.findIndex((h) => h.id === activeId) + 1) / headings.length) * 100}%`,
                                                }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                        <p className="text-xs text-neutral-500 mt-2 text-center">
                                            {headings.findIndex((h) => h.id === activeId) + 1} of{" "}
                                            {headings.length} sections
                                        </p>
                                    </div>

                                    {/* Heading links */}
                                    <ul className="space-y-1 border-l-2 border-neutral-100">
                                        {headings.map((heading, index) => (
                                            <motion.li
                                                key={heading.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.03 }}
                                            >
                                                <button
                                                    onClick={() => onHeadingClick(heading.id)}
                                                    className={cn(
                                                        "w-full text-left text-sm py-2 px-4 transition-all duration-200 -ml-[2px] border-l-2",
                                                        activeId === heading.id
                                                            ? "text-[#1E4DB7] font-medium border-[#1E4DB7] bg-[#1E4DB7]/5"
                                                            : "text-neutral-600 hover:text-neutral-900 border-transparent hover:border-neutral-300"
                                                    )}
                                                    style={{
                                                        paddingLeft: `${(heading.level - minLevel) * 12 + 16}px`,
                                                    }}
                                                >
                                                    <span className="line-clamp-2 leading-snug">
                                                        {heading.text}
                                                    </span>
                                                </button>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Tags Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-6 bg-white rounded-2xl border border-neutral-100 shadow-lg p-5"
                >
                    <h4 className="text-sm font-bold text-neutral-800 mb-3 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#F59A23]" />
                        Related Topics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {["AI", "Digital Transformation", "GCC", "Enterprise"].map(
                            (tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-[#1E4DB7]/5 text-[#1E4DB7] text-xs font-medium rounded-full hover:bg-[#1E4DB7]/10 transition-colors cursor-pointer"
                                >
                                    #{tag}
                                </span>
                            )
                        )}
                    </div>
                </motion.div>
            </div>
        </aside>
    );
}

// Author Bio Section
function AuthorBioSection({ author }: { author: BlogPostWithRelations["author"] }) {
    if (!author) return null;

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-16 pt-12 border-t border-neutral-200"
        >
            <div className="bg-gradient-to-br from-[#1E4DB7]/5 via-white to-[#F59A23]/5 rounded-3xl p-8 md:p-10 border border-neutral-100 shadow-lg">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Author Avatar */}
                    <div className="flex-shrink-0">
                        <CartoonAvatar name={author.name} size="lg" />
                    </div>

                    {/* Author Info */}
                    <div className="flex-1">
                        <p className="text-sm text-[#F59A23] font-bold uppercase tracking-wider mb-2">
                            About the Author
                        </p>
                        <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-1">
                            {author.name}
                        </h3>
                        <p className="text-[#1E4DB7] font-semibold mb-4">{author.role}</p>
                        {author.bio && (
                            <p className="text-neutral-600 leading-relaxed mb-6">
                                {author.bio}
                            </p>
                        )}

                        {/* Social Links & CTA */}
                        <div className="flex flex-wrap items-center gap-4">
                            {author.socialLinks?.twitter && (
                                <a
                                    href={author.socialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-[#1DA1F2] hover:text-white text-neutral-600 flex items-center justify-center transition-all duration-300"
                                >
                                    <Twitter className="h-5 w-5" />
                                </a>
                            )}
                            {author.socialLinks?.linkedin && (
                                <a
                                    href={author.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-[#0A66C2] hover:text-white text-neutral-600 flex items-center justify-center transition-all duration-300"
                                >
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            )}
                            {author.socialLinks?.email && (
                                <a
                                    href={`mailto:${author.socialLinks.email}`}
                                    className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-[#F59A23] hover:text-white text-neutral-600 flex items-center justify-center transition-all duration-300"
                                >
                                    <Mail className="h-5 w-5" />
                                </a>
                            )}

                            <Link
                                href={`/blogs?author=${author.slug}`}
                                className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E4DB7] hover:bg-[#143A8F] text-white font-semibold rounded-xl transition-all duration-300 group"
                            >
                                More by {author.name.split(" ")[0]}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

// Related Articles Section
function RelatedArticlesSection({
    posts,
}: {
    posts: BlogPostWithRelations[];
}) {
    if (posts.length === 0) return null;

    return (
        <section className="mt-20 pt-16 border-t border-neutral-200">
            <div className="text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-3 mb-4"
                >
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#1E4DB7]" />
                    <span className="text-sm font-bold tracking-wider text-neutral-500 uppercase">
                        Continue Reading
                    </span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#1E4DB7]" />
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-4xl font-bold text-neutral-900"
                >
                    Related{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E4DB7] to-[#F59A23]">
                        Articles
                    </span>
                </motion.h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link
                            href={`/blogs/${post.slug}`}
                            className="group block bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-md hover:shadow-xl transition-all duration-500"
                        >
                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                <Image
                                    src={post.featuredImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute top-4 left-4">
                                    <span
                                        className="px-3 py-1 text-white text-xs font-semibold uppercase rounded-full"
                                        style={{
                                            backgroundColor:
                                                post.category?.accentColor || "#1E4DB7",
                                        }}
                                    >
                                        {post.category?.name}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-neutral-900 line-clamp-2 group-hover:text-[#1E4DB7] transition-colors mb-3">
                                    {post.title}
                                </h3>
                                <p className="text-neutral-600 text-sm line-clamp-2 mb-4">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-neutral-500">
                                        {post.readingTime} min read
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1E4DB7] group-hover:text-[#F59A23] transition-colors">
                                        Read More
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </div>

                            {/* Hover accent line */}
                            <div className="h-1 bg-gradient-to-r from-[#1E4DB7] to-[#F59A23] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </Link>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}

// Main Blog Article Client Component
export function BlogArticleClient({
    post,
    relatedPosts,
}: BlogArticleClientProps) {
    const articleRef = useRef<HTMLElement>(null);
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    // Extract headings from content
    useEffect(() => {
        if (!post.content) return;

        const headingRegex = /^(#{2,3})\s+(.+)$/gm;
        const extractedHeadings: Heading[] = [];
        let match;

        while ((match = headingRegex.exec(post.content)) !== null) {
            const level = match[1].length;
            const text = match[2].trim();
            const id = generateId(text);
            extractedHeadings.push({ id, text, level });
        }

        setHeadings(extractedHeadings);
        if (extractedHeadings.length > 0) {
            setActiveId(extractedHeadings[0].id);
        }
    }, [post.content]);

    // Scroll spy for active heading
    useEffect(() => {
        if (headings.length === 0) return;

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150;
            let currentHeading = headings[0]?.id || "";

            for (const heading of headings) {
                const element = document.getElementById(heading.id);
                if (element) {
                    const { top } = element.getBoundingClientRect();
                    const absoluteTop = top + window.scrollY;

                    if (absoluteTop <= scrollPosition) {
                        currentHeading = heading.id;
                    }
                }
            }

            setActiveId(currentHeading);
        };

        let ticking = false;
        const throttledHandleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", throttledHandleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", throttledHandleScroll);
        };
    }, [headings]);

    // Smooth scroll to heading
    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({
                top,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="w-full py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Sticky TOC Sidebar - Desktop Only */}
                    <StickyTOCSidebar
                        headings={headings}
                        activeId={activeId}
                        onHeadingClick={scrollToHeading}
                    />

                    {/* Main Article Content */}
                    <article
                        ref={articleRef}
                        className={cn(
                            "lg:col-span-9",
                            headings.length < 3 && "lg:col-span-8 lg:col-start-3"
                        )}
                        data-content
                    >
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-wrap gap-2 mb-10"
                            >
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="px-4 py-1.5 bg-[#1E4DB7]/10 text-[#1E4DB7] text-sm font-medium rounded-full hover:bg-[#1E4DB7]/20 transition-colors cursor-pointer"
                                    >
                                        #{tag.name}
                                    </span>
                                ))}
                            </motion.div>
                        )}

                        {/* Article Body with Prose Typography */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="max-w-[75ch] mx-auto lg:mx-0"
                            style={{
                                // Optimal reading width: 65-75 characters
                                maxWidth: "75ch",
                            }}
                        >
                            {post.content ? (
                                <EnhancedMarkdownContent content={post.content} />
                            ) : (
                                <p className="text-neutral-600 text-lg">
                                    No content available.
                                </p>
                            )}
                        </motion.div>

                        {/* Author Bio */}
                        <AuthorBioSection author={post.author} />

                        {/* Related Articles */}
                        <RelatedArticlesSection posts={relatedPosts} />
                    </article>
                </div>
            </div>
        </section>
    );
}
