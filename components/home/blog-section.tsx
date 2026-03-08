"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const blogPosts = [
  {
    title: "Consulting Project",
    excerpt:
      "Dynamically target high-payoff intellectual capital for customized technologies. Objectively integrate emerging core competencies before process-centric...",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2670&auto=format&fit=crop",
    date: "4 APR",
    category: "NEWS",
    slug: "consulting-project",
    readTime: 5,
  },
  {
    title: "Prepare for a new job",
    excerpt:
      "Compellingly embrace empowered e-business after user friendly intellectual capital. Interactively actualize front-end processes with effective...",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
    date: "2 APR",
    category: "PROJECTS",
    slug: "prepare-for-new-job",
    readTime: 4,
  },
  {
    title: "Latest Client",
    excerpt:
      "Progressively maintain extensive infomediaries via extensible niches. Dramatically disseminate standardized metrics after resource-leveling...",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop",
    date: "19 MAR",
    category: "ANNOUNCEMENTS",
    slug: "latest-client",
    readTime: 6,
  },
];

// Animation variants
const featuredVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

const secondaryContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const secondaryItemVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const featuredPost = blogPosts[0];
  const secondaryPosts = blogPosts.slice(1);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-white"
    >
      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-blue-600 mb-3"
            >
              INSIGHTS
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900"
            >
              Latest from Our Experts
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 md:mt-0"
          >
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300"
            >
              View All Articles
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        {/* 60/40 Split Layout */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Featured Post - Left (60%) */}
          <motion.div
            variants={featuredVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <FeaturedBlogCard post={featuredPost} />
          </motion.div>

          {/* Secondary Posts - Right (40%) */}
          <motion.div
            variants={secondaryContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {secondaryPosts.map((post) => (
              <motion.div key={post.slug} variants={secondaryItemVariants}>
                <SecondaryBlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Featured Blog Card Component - Large card with image overlay
function FeaturedBlogCard({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block h-full">
      <div className="relative h-full min-h-[400px] md:min-h-[500px] lg:min-h-[540px] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm transition-shadow duration-300 ease-out hover:shadow-xl">
        {/* Image with zoom effect */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
          {/* Gradient overlay - darker on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent transition-opacity duration-300 ease-out group-hover:from-slate-900/95 group-hover:via-slate-900/50" />
        </div>

        {/* Category Badge */}
        <div className="absolute top-6 left-6 z-10">
          <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg">
            {post.category}
          </span>
        </div>

        {/* Content overlaid at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
          {/* Date and Read Time */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-white/80 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/80 text-sm">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight transition-colors duration-300 group-hover:text-blue-200">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-3 text-white/70 text-base md:text-lg line-clamp-2 max-w-2xl">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}

// Secondary Blog Card Component - Horizontal layout with accent line hover
function SecondaryBlogCard({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <div className="relative flex gap-4 md:gap-5 p-4 rounded-xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:border-slate-300">
        {/* Accent line on hover - left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 origin-top transition-transform duration-300 ease-out scale-y-0 group-hover:scale-y-100" />

        {/* Thumbnail Image */}
        <div className="relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center min-w-0 flex-1 py-1">
          {/* Category Badge */}
          <span className="inline-block self-start px-2.5 py-1 mb-2 bg-slate-100 text-slate-600 text-[10px] font-semibold uppercase tracking-wider rounded-full transition-colors duration-300 group-hover:bg-blue-50 group-hover:text-blue-600">
            {post.category}
          </span>

          {/* Title */}
          <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-blue-600">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-1.5 text-slate-500 text-sm line-clamp-2 hidden md:block">
            {post.excerpt}
          </p>

          {/* Date */}
          <div className="flex items-center gap-3 mt-2 text-slate-400 text-xs">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime} min</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
