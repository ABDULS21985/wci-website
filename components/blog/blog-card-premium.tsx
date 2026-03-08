"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Calendar, Clock, Eye, ArrowRight, Bookmark, Share2 } from "lucide-react";
import type { BlogPostWithRelations } from "@/data/blog";

// Get initials from name
function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

// Cartoon-style avatar component with gradient
function CartoonAvatar({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md" | "lg";
}) {
  const initials = getInitials(name);
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };
  const gradients = [
    "from-blue-500 via-blue-600 to-indigo-600",
    "from-orange-400 via-orange-500 to-red-500",
    "from-emerald-400 via-emerald-500 to-teal-600",
    "from-purple-500 via-purple-600 to-pink-500",
    "from-amber-400 via-orange-500 to-red-500",
  ];
  const gradient = gradients[name.length % gradients.length];

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/30 relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
      <span className="relative drop-shadow-sm">{initials}</span>
    </div>
  );
}

interface BlogCardPremiumProps {
  post: BlogPostWithRelations;
  variant?: "default" | "featured" | "horizontal" | "minimal";
  index?: number;
  showActions?: boolean;
  className?: string;
}

export function BlogCardPremium({
  post,
  variant = "default",
  index = 0,
  showActions = false,
  className = "",
}: BlogCardPremiumProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for gradient effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse position
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Parallax effect for image
  const imageX = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const imageY = useTransform(springY, [-0.5, 0.5], [10, -10]);

  // Gradient mask position
  const gradientX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const gradientY = useTransform(springY, [-0.5, 0.5], [0, 100]);
  const gradientBackground = useMotionTemplate`radial-gradient(300px circle at ${gradientX}% ${gradientY}%, rgba(30, 77, 183, 0.15), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const categoryColor = post.category?.accentColor || "#1E4DB7";
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
  } as const;

  // Horizontal variant
  if (variant === "horizontal") {
    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`group relative ${className}`}
      >
        <Link href={`/blogs/${post.slug}`} className="block">
          <div className="relative flex flex-col md:flex-row gap-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
            {/* Gradient overlay on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: gradientBackground }}
            />

            {/* Image Section */}
            <div className="relative md:w-2/5 h-56 md:h-auto overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{
                  x: imageX,
                  y: imageY,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute top-4 left-4 z-10"
              >
                <span
                  className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white rounded-lg shadow-lg"
                  style={{
                    backgroundColor: categoryColor,
                    boxShadow: `0 4px 14px ${categoryColor}40`,
                  }}
                >
                  {post.category?.name}
                </span>
              </motion.div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent md:bg-gradient-to-l md:from-white/80 md:dark:from-neutral-900/80 md:via-white/40 md:dark:via-neutral-900/40 md:to-transparent" />
            </div>

            {/* Content Section */}
            <div className="relative flex-1 p-6 md:py-8 flex flex-col justify-center">
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#1E4DB7] dark:group-hover:text-[#F59A23] transition-colors duration-300">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed mb-5 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Meta and Author */}
              <div className="flex items-center justify-between">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <CartoonAvatar name={post.author.name} size="md" />
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                {/* Reading time and views */}
                <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingTime} min
                  </span>
                  {post.viewsCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {formatViews(post.viewsCount)}
                    </span>
                  )}
                </div>
              </div>

              {/* Animated Arrow */}
              <motion.div
                className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                initial={{ x: -20, opacity: 0 }}
                animate={isHovered ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: categoryColor }}
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </motion.div>
            </div>

            {/* Bottom accent line */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#1E4DB7] to-[#F59A23]"
              initial={{ width: 0 }}
              animate={isHovered ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </Link>
      </motion.div>
    );
  }

  // Featured variant
  if (variant === "featured") {
    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`group relative ${className}`}
      >
        <Link href={`/blogs/${post.slug}`} className="block">
          <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-xl">
            {/* Background Image with Parallax */}
            <motion.div
              className="absolute inset-0"
              style={{
                x: imageX,
                y: imageY,
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Animated gradient on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#1E4DB7]/30 to-[#F59A23]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              {/* Top badges */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                {/* Category */}
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="px-4 py-2 text-sm font-bold uppercase tracking-wider text-white rounded-xl shadow-lg"
                  style={{
                    backgroundColor: categoryColor,
                    boxShadow: `0 4px 20px ${categoryColor}50`,
                  }}
                >
                  {post.category?.name}
                </motion.span>

                {/* Featured badge */}
                {post.isFeatured && (
                  <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="px-4 py-2 bg-amber-500/90 backdrop-blur-sm text-white text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg"
                  >
                    Featured
                  </motion.span>
                )}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
              >
                {post.title}
              </motion.h2>

              {/* Excerpt */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-white/80 mb-6 line-clamp-2 max-w-3xl"
              >
                {post.excerpt}
              </motion.p>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-between"
              >
                {/* Author and Meta */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <CartoonAvatar name={post.author.name} size="lg" />
                    <div>
                      <p className="text-white font-semibold">{post.author.name}</p>
                      <p className="text-white/60 text-sm">{post.author.role}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center gap-4 pl-4 border-l border-white/20 text-white/70 text-sm">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {formattedDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {post.readingTime} min read
                    </span>
                  </div>
                </div>

                {/* Read More */}
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-white font-semibold hidden md:block">Read Article</span>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Minimal variant
  if (variant === "minimal") {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className={`group ${className}`}
      >
        <Link href={`/blogs/${post.slug}`} className="flex gap-4 p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
          {/* Image */}
          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <span
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: categoryColor }}
            >
              {post.category?.name}
            </span>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white mt-1 line-clamp-2 group-hover:text-[#1E4DB7] dark:group-hover:text-[#F59A23] transition-colors">
              {post.title}
            </h3>
            <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime} min
              </span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative ${className}`}
    >
      <Link href={`/blogs/${post.slug}`} className="block">
        <div className="relative bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
            style={{ background: gradientBackground }}
          />

          {/* Image Section */}
          <div className="relative h-52 md:h-56 overflow-hidden">
            <motion.div
              className="absolute inset-[-10px]"
              style={{
                x: imageX,
                y: imageY,
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="absolute top-4 left-4 z-20"
            >
              <span
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white rounded-lg shadow-lg"
                style={{
                  backgroundColor: categoryColor,
                  boxShadow: `0 4px 14px ${categoryColor}40`,
                }}
              >
                {post.category?.name}
              </span>
            </motion.div>

            {/* Action buttons */}
            {showActions && (
              <motion.div
                className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ y: -10 }}
                animate={isHovered ? { y: 0 } : { y: -10 }}
              >
                <button className="w-8 h-8 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                  <Bookmark className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                  <Share2 className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                </button>
              </motion.div>
            )}

            {/* Reading time badge */}
            <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span className="text-white text-xs font-medium">{post.readingTime} min read</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="relative p-6 z-10">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag.id}
                    className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-[10px] text-neutral-600 dark:text-neutral-400 font-medium"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#1E4DB7] dark:group-hover:text-[#F59A23] transition-colors duration-300">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
              {/* Author */}
              <div className="flex items-center gap-2.5">
                <CartoonAvatar name={post.author.name} size="sm" />
                <div>
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {post.author.name}
                  </span>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formattedDate}
                </span>
                {post.viewsCount > 0 && (
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {formatViews(post.viewsCount)}
                  </span>
                )}
              </div>
            </div>

            {/* Read More Arrow */}
            <motion.div
              className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100"
              initial={{ x: -10 }}
              animate={isHovered ? { x: 0 } : { x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: categoryColor }}
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#1E4DB7] to-[#F59A23]"
            initial={{ width: 0 }}
            animate={isHovered ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </Link>
    </motion.div>
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
