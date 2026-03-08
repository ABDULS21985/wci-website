"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Brain, Blocks, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/shared/components";

const categoryQuickLinks = [
    {
        id: "cybersecurity",
        name: "Cybersecurity",
        icon: ShieldCheck,
    },
    {
        id: "ai-data",
        name: "AI & Data",
        icon: Brain,
    },
    {
        id: "blockchain",
        name: "Blockchain",
        icon: Blocks,
    },
    {
        id: "it-governance",
        name: "IT Governance",
        icon: ClipboardCheck,
    },
];

interface ServiceHeroProps {
    onCategoryClick?: (categoryId: string) => void;
}

export function ServiceHero({ onCategoryClick }: ServiceHeroProps) {
    const handleCategoryClick = (categoryId: string) => {
        if (onCategoryClick) {
            onCategoryClick(categoryId);
        }
    };

    return (
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-primary/5 via-white to-accent-orange/5 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent-orange/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Header with orange line */}
                    <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in-up">
                        <div className="w-12 h-0.5 bg-accent-orange"></div>
                        <span className="text-xs md:text-sm font-bold tracking-wider text-gray-600 uppercase">
                            OUR SERVICES
                        </span>
                        <div className="w-12 h-0.5 bg-accent-orange"></div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2 mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1e3a8a] leading-tight">
                            Enterprise Services
                        </h1>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-accent-orange leading-tight">
                            Expert Advisory
                        </h2>
                    </div>

                    {/* Description */}
                    <p
                        className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mb-10 animate-fade-in-up"
                        style={{ animationDelay: "200ms" }}
                    >
                        Comprehensive technology consulting services designed to transform your
                        organization. From cybersecurity and AI strategy to blockchain implementation
                        and IT governance, we deliver results that matter.
                    </p>

                    {/* Category Quick Links */}
                    <div
                        className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 animate-fade-in-up"
                        style={{ animationDelay: "300ms" }}
                    >
                        {categoryQuickLinks.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className="group flex items-center gap-2 px-4 md:px-6 py-3 bg-white rounded-full shadow-md hover:shadow-xl border border-neutral-100 transition-all duration-300 hover:border-primary/20 hover:-translate-y-1"
                            >
                                <category.icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-accent-orange" />
                                <span className="text-sm md:text-base font-medium text-neutral-700 group-hover:text-primary transition-colors duration-300">
                                    {category.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
                        style={{ animationDelay: "400ms" }}
                    >
                        <Button
                            asChild
                            size="lg"
                            className="bg-primary hover:bg-secondary text-white rounded-full px-8 h-12 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            <Link href="/contact">
                                Schedule Consultation
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center border-2 border-neutral-900 bg-transparent text-neutral-900 hover:bg-neutral-900 hover:text-white rounded-full px-8 h-12 text-base font-semibold transition-all duration-300"
                        >
                            View Our Products
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
