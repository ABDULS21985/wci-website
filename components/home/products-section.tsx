"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import {
    ArrowRight,
    Shield,
    Globe,
    Link2,
    BarChart3,
    Building2,
    LucideIcon,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

interface ProductConfig {
    key: string;
    image: string;
    slug: string;
    icon: LucideIcon;
}

const productConfigs: ProductConfig[] = [
    {
        key: "trustMe",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop",
        slug: "digitrust",
        icon: Shield,
    },
    {
        key: "digiGate",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2670&auto=format&fit=crop",
        slug: "digigate",
        icon: Link2,
    },
    {
        key: "digiTrack",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        slug: "digitrack",
        icon: BarChart3,
    },
    {
        key: "trustMeHub",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2670&auto=format&fit=crop",
        slug: "trustmehub",
        icon: Globe,
    },
    {
        key: "boaCRM",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2670&auto=format&fit=crop",
        slug: "boacrm",
        icon: Building2,
    }
];

interface Product {
    name: string;
    description: string;
    image: string;
    slug: string;
    icon: LucideIcon;
    badge: string;
}

interface CardProps {
    product: Product;
    index: number;
    isVisible: boolean;
    learnMoreText: string;
}

function ProductCard({ product, index, isVisible, learnMoreText }: CardProps) {
    const IconComponent = product.icon;

    return (
        <div
            className={`flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3 motion-safe:transition-all motion-safe:duration-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[60px]"
            }`}
            style={{
                transitionDelay: `${index * 120}ms`
            }}
        >
            <Link
                href={`/products/${product.slug}`}
                className="group block h-full rounded-2xl overflow-hidden bg-[#1E293B] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40 transition-all duration-[350ms] ease-out"
            >
                {/* Image Container - Top 60% */}
                <div className="relative h-0 pb-[60%] overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-[350ms] ease-out group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-[rgba(255,230,59,0.15)] text-[#FFE63B]">
                            {product.badge}
                        </span>
                    </div>

                    {/* Icon */}
                    <div className="absolute bottom-4 right-4">
                        <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <IconComponent
                                className="w-5 h-5 text-[#FFE63B]"
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>
                </div>

                {/* Content - Bottom 40% */}
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#FFE63B] transition-colors duration-300">
                        {product.name}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                        {product.description}
                    </p>

                    {/* CTA */}
                    <div className="mt-4 flex items-center gap-2 text-[#FFE63B] text-sm font-medium">
                        <span>{learnMoreText}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>
            </Link>
        </div>
    );
}

export function ProductsSection() {
    const t = useTranslations("products");
    const sectionRef = useRef<HTMLElement>(null);
    // Use lazy initialization to check prefersReducedMotion
    const [isVisible, setIsVisible] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });

    // Embla Carousel setup
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        dragFree: true,
        containScroll: "trimSnaps",
    });

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    // Create translated products array
    const products: Product[] = productConfigs.map((config) => ({
        name: t(`items.${config.key}.name`),
        description: t(`items.${config.key}.description`),
        image: config.image,
        slug: config.slug,
        icon: config.icon,
        badge: t(`items.${config.key}.badge`),
    }));

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Already visible if reduced motion is preferred (set via lazy init)
        if (prefersReducedMotion) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-24 md:py-32 overflow-hidden bg-[#0F172A]"
        >
            {/* Subtle gradient overlay for depth */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-[#FFE63B]/[0.02] via-transparent to-[#FFE63B]/[0.01]"
                aria-hidden="true"
            />

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
                {/* Header */}
                <div className={`max-w-3xl mb-12 md:mb-16 motion-safe:transition-all motion-safe:duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[rgba(255,230,59,0.15)] text-[#FFE63B] mb-4">
                        {t("label")}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-lg text-slate-400">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Embla Carousel */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -mx-3">
                            {products.map((product, index) => (
                                <ProductCard
                                    key={product.slug}
                                    product={product}
                                    index={index}
                                    isVisible={isVisible}
                                    learnMoreText={t("learnMore")}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between mt-8">
                        {/* Previous Button */}
                        <button
                            onClick={scrollPrev}
                            disabled={!canScrollPrev}
                            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFE63B] focus:ring-offset-2 focus:ring-offset-[#0F172A] ${
                                canScrollPrev
                                    ? "border-slate-600 bg-slate-800/50 text-slate-300 hover:text-white hover:border-[#FFE63B] hover:bg-[#FFE63B]/10"
                                    : "border-slate-700/50 bg-slate-900/30 text-slate-600 cursor-not-allowed"
                            }`}
                            aria-label="Previous products"
                        >
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>

                        {/* Dot Indicators */}
                        <div
                            className="flex justify-center gap-2"
                            role="tablist"
                            aria-label="Product slides"
                        >
                            {scrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollTo(index)}
                                    role="tab"
                                    aria-selected={index === selectedIndex}
                                    aria-label={`Go to slide ${index + 1}`}
                                    className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFE63B] focus:ring-offset-2 focus:ring-offset-[#0F172A] ${
                                        index === selectedIndex
                                            ? "w-8 bg-[#FFE63B]"
                                            : "w-2 bg-slate-600 hover:bg-slate-500"
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={scrollNext}
                            disabled={!canScrollNext}
                            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFE63B] focus:ring-offset-2 focus:ring-offset-[#0F172A] ${
                                canScrollNext
                                    ? "border-slate-600 bg-slate-800/50 text-slate-300 hover:text-white hover:border-[#FFE63B] hover:bg-[#FFE63B]/10"
                                    : "border-slate-700/50 bg-slate-900/30 text-slate-600 cursor-not-allowed"
                            }`}
                            aria-label="Next products"
                        >
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                {/* Explore All Products CTA */}
                <div className={`flex justify-center mt-16 motion-safe:transition-all motion-safe:duration-500 motion-safe:delay-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FFE63B] text-[#0F172A] font-semibold hover:bg-[#FFE63B]/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-[#FFE63B]/20"
                    >
                        <span>{t("exploreAll")}</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
