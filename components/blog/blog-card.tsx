"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Calendar,
    Clock,
    Eye,
    User,
    ArrowRight,
} from "lucide-react";
import type { BlogPost } from "@/types/blog";

// Get initials from name (first letter of first and last name)
function getInitials(name: string): string {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
        return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
}

// Cartoon-style avatar with gradient background and initials
function CartoonAvatar({
    name,
    size = "md",
    color
}: {
    name: string;
    size?: "sm" | "md" | "lg";
    color: string;
}) {
    const initials = getInitials(name);
    const sizeClasses = {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
    };

    // Generate a consistent gradient based on name
    const gradients = [
        "from-blue-500 via-blue-600 to-indigo-600",
        "from-orange-400 via-orange-500 to-red-500",
        "from-emerald-400 via-emerald-500 to-teal-600",
        "from-purple-500 via-purple-600 to-pink-500",
        "from-amber-400 via-orange-500 to-red-500",
        "from-cyan-400 via-blue-500 to-indigo-600",
    ];
    const gradientIndex = name.length % gradients.length;
    const gradient = gradients[gradientIndex];

    return (
        <div
            className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white relative overflow-hidden`}
        >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
            {/* Initials */}
            <span className="relative drop-shadow-sm">{initials}</span>
        </div>
    );
}

interface BlogCardProps {
    post: BlogPost;
    variant?: "default" | "featured" | "compact";
    showAuthor?: boolean;
    showTags?: boolean;
    className?: string;
}

export function BlogCard({
    post,
    variant = "default",
    showAuthor = true,
    showTags = true,
    className = "",
}: BlogCardProps) {
    const categoryColor = post.category?.color || "#1E4DB7";
    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          })
        : "";

    // Compact variant - horizontal layout
    if (variant === "compact") {
        return (
            <Link
                href={`/blog/${post.slug}`}
                className={`group relative flex gap-4 bg-white rounded-xl border border-neutral-100 hover:border-neutral-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up ${className}`}
            >
                {/* Image */}
                <div className="relative flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 overflow-hidden">
                    {post.featuredImage ? (
                        <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                            <span className="text-neutral-400 text-4xl font-bold">
                                {post.title.charAt(0)}
                            </span>
                        </div>
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1 p-4 pr-5 flex flex-col justify-center min-w-0">
                    {/* Category Badge */}
                    {post.category && (
                        <span
                            className="inline-flex self-start px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider mb-2 text-white"
                            style={{ backgroundColor: categoryColor }}
                        >
                            {post.category.name}
                        </span>
                    )}

                    {/* Title */}
                    <h3 className="font-semibold text-neutral-900 text-sm sm:text-base line-clamp-2 mb-2 transition-colors duration-300 group-hover:text-[#1E4DB7]">
                        {post.title}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                        {formattedDate && (
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formattedDate}
                            </span>
                        )}
                        {post.readingTime && (
                            <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.readingTime} min
                            </span>
                        )}
                    </div>
                </div>

                {/* Arrow indicator */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                    <ArrowRight
                        className="h-5 w-5"
                        style={{ color: categoryColor }}
                    />
                </div>

                {/* Bottom accent line */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{
                        background: `linear-gradient(90deg, ${categoryColor} 0%, ${categoryColor}80 100%)`,
                    }}
                />
            </Link>
        );
    }

    // Featured variant - larger, more prominent
    if (variant === "featured") {
        return (
            <Link
                href={`/blog/${post.slug}`}
                className={`group relative block bg-white rounded-2xl border border-neutral-100/80 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-neutral-200/50 transition-all duration-500 animate-fade-in-up ${className}`}
            >
                {/* Glow effect on hover */}
                <div
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                    style={{ backgroundColor: `${categoryColor}15` }}
                />

                {/* Featured Image - larger for featured variant */}
                <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
                    {post.featuredImage ? (
                        <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                            <span className="text-neutral-300 text-7xl font-bold">
                                {post.title.charAt(0)}
                            </span>
                        </div>
                    )}

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Category Badge - positioned on image */}
                    {post.category && (
                        <div className="absolute top-4 left-4">
                            <span
                                className="inline-flex px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white shadow-lg"
                                style={{
                                    backgroundColor: categoryColor,
                                    boxShadow: `0 4px 14px ${categoryColor}40`,
                                }}
                            >
                                {post.category.name}
                            </span>
                        </div>
                    )}

                    {/* Title overlay on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 line-clamp-2 drop-shadow-lg">
                            {post.title}
                        </h3>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                    {/* Full excerpt for featured */}
                    {post.excerpt && (
                        <p className="text-neutral-600 leading-relaxed mb-5 line-clamp-3">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Tags */}
                    {showTags && post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                            {post.tags.slice(0, 4).map((tag) => (
                                <span
                                    key={tag.id}
                                    className="inline-block px-2.5 py-1 bg-neutral-100 rounded-lg text-xs text-neutral-600 font-medium hover:bg-neutral-200 transition-colors"
                                >
                                    #{tag.name}
                                </span>
                            ))}
                            {post.tags.length > 4 && (
                                <span
                                    className="inline-block px-2.5 py-1 rounded-lg text-xs font-medium"
                                    style={{
                                        backgroundColor: `${categoryColor}10`,
                                        color: categoryColor,
                                    }}
                                >
                                    +{post.tags.length - 4}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Footer with author and meta */}
                    <div className="flex items-center justify-between pt-5 border-t border-neutral-100">
                        {/* Author Info */}
                        {showAuthor && post.author && (
                            <div className="flex items-center gap-3">
                                <CartoonAvatar name={post.author.name} size="md" color={categoryColor} />
                                <div>
                                    <p className="text-sm font-semibold text-neutral-900">
                                        {post.author.name}
                                    </p>
                                    {post.author.role && (
                                        <p className="text-xs text-neutral-500">
                                            {post.author.role}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-xs text-neutral-500">
                            {formattedDate && (
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {formattedDate}
                                </span>
                            )}
                            {post.readingTime && (
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5" />
                                    {post.readingTime} min read
                                </span>
                            )}
                            {post.viewsCount !== undefined && post.viewsCount > 0 && (
                                <span className="flex items-center gap-1.5">
                                    <Eye className="h-3.5 w-3.5" />
                                    {formatViews(post.viewsCount)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom accent line with gradient */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{
                        background: `linear-gradient(90deg, ${categoryColor} 0%, #F59A23 100%)`,
                    }}
                />
            </Link>
        );
    }

    // Default variant
    return (
        <Link
            href={`/blog/${post.slug}`}
            className={`group relative block bg-white rounded-2xl border border-neutral-100/80 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-neutral-200/50 transition-all duration-500 animate-fade-in-up ${className}`}
        >
            {/* Glow effect on hover */}
            <div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                style={{ backgroundColor: `${categoryColor}15` }}
            />

            {/* Gradient background on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(135deg, ${categoryColor}05 0%, transparent 50%)`,
                }}
            />

            {/* Featured Image */}
            <div className="relative h-48 sm:h-52 overflow-hidden">
                {post.featuredImage ? (
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                        <span className="text-neutral-300 text-6xl font-bold">
                            {post.title.charAt(0)}
                        </span>
                    </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                {post.category && (
                    <div className="absolute top-4 left-4">
                        <span
                            className="inline-flex px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white shadow-lg"
                            style={{
                                backgroundColor: categoryColor,
                                boxShadow: `0 4px 14px ${categoryColor}40`,
                            }}
                        >
                            {post.category.name}
                        </span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="relative p-6">
                {/* Title */}
                <h3 className="text-lg font-bold text-neutral-900 mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-[#1E4DB7] leading-tight">
                    {post.title}
                </h3>

                {/* Excerpt - 2-3 lines clamped */}
                {post.excerpt && (
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                    </p>
                )}

                {/* Tags as small pills */}
                {showTags && post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag.id}
                                className="inline-block px-2 py-0.5 bg-neutral-100 rounded text-[10px] text-neutral-600 font-medium"
                            >
                                #{tag.name}
                            </span>
                        ))}
                        {post.tags.length > 3 && (
                            <span
                                className="inline-block px-2 py-0.5 rounded text-[10px] font-medium"
                                style={{
                                    backgroundColor: `${categoryColor}10`,
                                    color: categoryColor,
                                }}
                            >
                                +{post.tags.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    {/* Author Info */}
                    {showAuthor && post.author ? (
                        <div className="flex items-center gap-2.5">
                            <CartoonAvatar name={post.author.name} size="sm" color={categoryColor} />
                            <span className="text-sm font-medium text-neutral-700">
                                {post.author.name}
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                            <User className="h-3.5 w-3.5" />
                            <span>DigiAfrika</span>
                        </div>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                        {formattedDate && (
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formattedDate}
                            </span>
                        )}
                        {post.readingTime && (
                            <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.readingTime}m
                            </span>
                        )}
                        {post.viewsCount !== undefined && post.viewsCount > 0 && (
                            <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {formatViews(post.viewsCount)}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom accent line with gradient */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{
                    background: `linear-gradient(90deg, ${categoryColor} 0%, #F59A23 100%)`,
                }}
            />
        </Link>
    );
}

// Helper function to format view counts
function formatViews(views: number): string {
    if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
}
