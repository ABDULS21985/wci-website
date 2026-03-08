"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/shared/components";
import type { ServiceCategory as ServiceCategoryType } from "@/types/services";
import { ServiceCard } from "./service-card";

interface ServiceCategoryProps {
    category: ServiceCategoryType;
    accentColor?: string;
}

export function ServiceCategory({
    category,
    accentColor = "#1E4DB7",
}: ServiceCategoryProps) {
    return (
        <section
            id={category.id}
            className="w-full py-16 md:py-20 scroll-mt-24"
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Category Header */}
                <div className="mb-10 animate-fade-in-up">
                    <div className="flex items-center gap-4 mb-4">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${accentColor}15` }}
                        >
                            <Award
                                className="h-7 w-7"
                                style={{ color: accentColor }}
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a]">
                                {category.name}
                            </h2>
                        </div>
                    </div>
                    <p className="text-lg text-neutral-600 max-w-4xl">
                        {category.description}
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                    {category.services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            accentColor={accentColor}
                            index={index}
                        />
                    ))}
                </div>

                {/* Certifications/Frameworks Section */}
                {(category.certifications || category.frameworks) && (
                    <div
                        className="p-6 md:p-8 bg-gradient-to-br from-neutral-50 to-white rounded-xl border border-neutral-100 shadow-sm animate-fade-in-up"
                        style={{ animationDelay: "300ms" }}
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <CheckCircle
                                className="h-5 w-5"
                                style={{ color: accentColor }}
                            />
                            <h3 className="text-lg font-semibold text-neutral-900">
                                {category.certifications
                                    ? "Certifications & Frameworks"
                                    : "Focus Areas & Platforms"}
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {(category.certifications || category.frameworks || []).map(
                                (item, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm font-medium text-neutral-700 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                                    >
                                        {item}
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                )}

                {/* CTA Button */}
                <div
                    className="mt-10 text-center animate-fade-in-up"
                    style={{ animationDelay: "400ms" }}
                >
                    <Button
                        asChild
                        size="lg"
                        className="rounded-full px-8 h-12 text-base font-semibold transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: accentColor }}
                    >
                        <Link href="/contact">
                            Inquire About {category.shortName} Services
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
