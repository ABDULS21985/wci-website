"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ShieldCheck,
    Brain,
    Blocks,
    Scale,
    ArrowRight,
    CheckCircle,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent, Button } from "@/components/ui/shared/components";
import { serviceCategories } from "@/data/services";
import { ServiceCard } from "./service-card";

const categoryIcons = {
    cybersecurity: ShieldCheck,
    "ai-data": Brain,
    blockchain: Blocks,
    "it-governance": Scale,
};

const categoryColors = {
    cybersecurity: "#1E4DB7",
    "ai-data": "#F59A23",
    blockchain: "#E86A1D",
    "it-governance": "#143A8F",
};

export function ServiceCategoryTabs() {
    const [activeTab, setActiveTab] = useState(serviceCategories[0].id);

    return (
        <section
            id="services"
            className="w-full py-16 md:py-24 bg-white scroll-mt-20"
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-12 h-0.5 bg-accent-orange"></div>
                        <span className="text-xs md:text-sm font-bold tracking-wider text-gray-600 uppercase">
                            Service Portfolio
                        </span>
                        <div className="w-12 h-0.5 bg-accent-orange"></div>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-4">
                        Comprehensive Advisory Services
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Expert guidance across cybersecurity, AI, blockchain,
                        and IT governance
                    </p>
                </div>

                {/* Tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <TabsList className="w-full flex flex-wrap justify-center gap-2 md:gap-3 mb-10 bg-transparent p-0 animate-fade-in-up delay-100">
                        {serviceCategories.map((category) => {
                            const IconComponent =
                                categoryIcons[
                                    category.id as keyof typeof categoryIcons
                                ] || ShieldCheck;
                            return (
                                <TabsTrigger
                                    key={category.id}
                                    value={category.id}
                                    className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full border-2 border-neutral-200 bg-white text-neutral-600 text-sm data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:border-primary/50"
                                >
                                    <IconComponent className="h-4 w-4" />
                                    <span className="hidden sm:inline font-medium">
                                        {category.shortName}
                                    </span>
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>

                    {serviceCategories.map((category) => {
                        const accentColor =
                            categoryColors[
                                category.id as keyof typeof categoryColors
                            ] || "#1E4DB7";

                        return (
                            <TabsContent
                                key={category.id}
                                value={category.id}
                                className="mt-0 focus-visible:outline-none"
                            >
                                <div
                                    id={category.id}
                                    className="scroll-mt-24"
                                >
                                    {/* Category Header */}
                                    <div className="mb-8 animate-fade-in-up">
                                        <h3 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-3">
                                            {category.name}
                                        </h3>
                                        <p className="text-neutral-600 max-w-3xl">
                                            {category.description}
                                        </p>
                                    </div>

                                    {/* Services Grid */}
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                        {category.services.map(
                                            (service, index) => (
                                                <ServiceCard
                                                    key={service.id}
                                                    service={service}
                                                    accentColor={accentColor}
                                                    index={index}
                                                />
                                            )
                                        )}
                                    </div>

                                    {/* Certifications/Frameworks */}
                                    {(category.certifications ||
                                        category.frameworks) && (
                                        <div className="p-6 bg-neutral-50 rounded-xl animate-fade-in-up delay-200">
                                            <h4 className="text-sm font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-primary" />
                                                {category.certifications
                                                    ? "Certifications & Frameworks"
                                                    : "Focus Areas"}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {(
                                                    category.certifications ||
                                                    category.frameworks ||
                                                    []
                                                ).map((item, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-sm text-neutral-700"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <div className="mt-8 text-center animate-fade-in-up delay-300">
                                        <Button
                                            asChild
                                            className="rounded-full px-6"
                                            style={{
                                                backgroundColor: accentColor,
                                            }}
                                        >
                                            <Link href="/contact">
                                                Inquire About {category.shortName}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>
                        );
                    })}
                </Tabs>
            </div>
        </section>
    );
}
