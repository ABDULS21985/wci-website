"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import type { BlogPostWithRelations } from "@/data/blog";

// Get initials from name
function getInitials(name: string): string {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
        return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
}

// Cartoon-style avatar with gradient and initials
function CartoonAvatar({ name }: { name: string }) {
    const initials = getInitials(name);
    const gradients = [
        "from-blue-500 via-blue-600 to-indigo-600",
        "from-orange-400 via-orange-500 to-red-500",
        "from-emerald-400 via-emerald-500 to-teal-600",
        "from-purple-500 via-purple-600 to-pink-500",
        "from-amber-400 via-orange-500 to-red-500",
    ];
    const gradient = gradients[name.length % gradients.length];

    return (
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-xs shadow-md ring-2 ring-white relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
            <span className="relative drop-shadow-sm">{initials}</span>
        </div>
    );
}


interface BlogCardSimpleProps {
    post: BlogPostWithRelations;
    variant?: "default" | "compact" | "horizontal";
}

export function BlogCardSimple({ post, variant = "default" }: BlogCardSimpleProps) {
    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "";

    if (variant === "compact") {
        return (
            <Link
                href={`/blogs/${post.slug}`}
                className="group flex gap-4 p-4 bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
                {/* Image */}
                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-[#F59A23] uppercase tracking-wide">
                        {post.category?.name}
                    </span>
                    <h3 className="text-sm font-bold text-neutral-900 mt-1 line-clamp-2 group-hover:text-[#1E4DB7] transition-colors">
                        {post.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readingTime} min
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    if (variant === "horizontal") {
        return (
            <Link
                href={`/blogs/${post.slug}`}
                className="group flex flex-col sm:flex-row gap-5 bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
                {/* Image */}
                <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col justify-center">
                    <span className="text-xs font-semibold text-[#1E4DB7] uppercase tracking-wide">
                        {post.category?.name}
                    </span>
                    <h3 className="text-lg font-bold text-neutral-900 mt-2 line-clamp-2 group-hover:text-[#1E4DB7] transition-colors">
                        {post.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
                        {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {formattedDate}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {post.readingTime} min read
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    // Default variant
    return (
        <Link
            href={`/blogs/${post.slug}`}
            className="group flex flex-col bg-white rounded-xl border border-neutral-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in-up"
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#1E4DB7] text-white text-xs font-semibold uppercase rounded-full">
                    {post.category?.name}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="text-lg font-bold text-neutral-900 line-clamp-2 group-hover:text-[#1E4DB7] transition-colors">
                    {post.title}
                </h3>
                <p className="text-sm text-neutral-600 mt-2 line-clamp-2 flex-1">
                    {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
                    <div className="flex items-center gap-2">
                        <CartoonAvatar name={post.author?.name || "DigiAfrika"} />
                        <div className="text-xs">
                            <p className="font-semibold text-neutral-900">{post.author?.name || "DigiAfrika"}</p>
                            <p className="text-neutral-500">{formattedDate}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-neutral-500">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readingTime} min
                    </div>
                </div>

                {/* Read More */}
                <div className="flex items-center gap-2 mt-4 text-sm font-semibold text-[#1E4DB7] group-hover:text-[#F59A23] transition-colors">
                    Read More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
}
