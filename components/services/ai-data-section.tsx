"use client";

import Link from "next/link";
import {
    Brain,
    ArrowRight,
    Sparkles,
    TrendingUp,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/shared/components";
import { getServiceCategoryById } from "@/data/services";
import { ServiceCard } from "./service-card";

const ACCENT_COLOR = "#F59A23";

const focusAreas = [
    "RegTech Applications",
    "Fraud Detection",
    "Customer Analytics",
    "Process Automation",
];

const capabilities = [
    {
        icon: Sparkles,
        title: "Predictive Analytics",
        description: "Data-driven insights",
    },
    {
        icon: TrendingUp,
        title: "ML Operations",
        description: "Production-ready AI",
    },
    {
        icon: Zap,
        title: "Process Automation",
        description: "Intelligent workflows",
    },
];

export function AIDataSection() {
    const category = getServiceCategoryById("ai-data");

    if (!category) return null;

    return (
        <section
            id="ai-data"
            className="w-full py-16 md:py-24 bg-white scroll-mt-20"
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 animate-fade-in-up">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-0.5 bg-accent-orange"></div>
                        <span className="text-xs md:text-sm font-bold tracking-wider text-gray-600 uppercase">
                            AI & Data Advisory
                        </span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                    style={{ backgroundColor: `${ACCENT_COLOR}15` }}
                                >
                                    <Brain
                                        className="h-8 w-8"
                                        style={{ color: ACCENT_COLOR }}
                                    />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a]">
                                    {category.name}
                                </h2>
                            </div>
                            <p className="text-lg text-neutral-600 max-w-3xl">
                                {category.description}
                            </p>
                        </div>

                        {/* Quick Capabilities */}
                        <div className="flex flex-wrap lg:flex-nowrap gap-4">
                            {capabilities.map((capability, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-accent-orange/5 to-accent-yellow/5 rounded-xl border border-accent-orange/10 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <capability.icon className="h-5 w-5 text-accent-orange" />
                                    <div>
                                        <p className="text-sm font-semibold text-neutral-900">
                                            {capability.title}
                                        </p>
                                        <p className="text-xs text-neutral-500">
                                            {capability.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                    {category.services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            accentColor={ACCENT_COLOR}
                            index={index}
                        />
                    ))}
                </div>

                {/* Focus Areas Section */}
                <div
                    className="p-6 md:p-8 bg-gradient-to-br from-accent-orange/5 to-accent-yellow/5 rounded-2xl border border-accent-orange/10 animate-fade-in-up"
                    style={{ animationDelay: "350ms" }}
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <Sparkles className="h-5 w-5 text-accent-orange" />
                                <h3 className="text-lg font-bold text-neutral-900">
                                    Focus Areas
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {focusAreas.map((area, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-white border border-accent-orange/20 rounded-full text-sm font-medium text-neutral-700 shadow-sm"
                                    >
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <Button
                            asChild
                            size="lg"
                            className="rounded-full px-8 h-12 text-base font-semibold bg-accent-orange hover:bg-accent-red transition-all duration-300 hover:scale-105"
                        >
                            <Link href="/contact">
                                Start AI Journey
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
