"use client";

import { LucideIcon } from "lucide-react";

export interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface FeatureGridProps {
    features: Feature[];
    columns?: 2 | 3;
    centered?: boolean;
}

export function FeatureGrid({
    features,
    columns = 3,
    centered = false,
}: FeatureGridProps) {
    const gridCols =
        columns === 2
            ? "md:grid-cols-2"
            : "md:grid-cols-2 lg:grid-cols-3";

    return (
        <div
            className={`grid grid-cols-1 ${gridCols} gap-6 md:gap-8 ${centered ? "max-w-4xl mx-auto" : ""}`}
        >
            {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                    <div
                        key={index}
                        className="group animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-500 border border-neutral-100 h-full">
                            {/* Icon Circle */}
                            <div className="relative mb-5">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/10 to-accent-orange/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:from-primary/20 group-hover:to-accent-orange/20">
                                    <Icon
                                        className="h-7 w-7 text-primary transition-all duration-300 group-hover:text-accent-orange"
                                        strokeWidth={1.5}
                                    />
                                </div>
                                {/* Decorative ring on hover */}
                                <div className="absolute inset-0 w-14 h-14 rounded-full border-2 border-transparent group-hover:border-accent-orange/30 transition-all duration-500 scale-0 group-hover:scale-125 opacity-0 group-hover:opacity-100"></div>
                            </div>

                            {/* Content */}
                            <h4 className="text-lg font-bold text-neutral-900 mb-2 transition-colors duration-300 group-hover:text-primary">
                                {feature.title}
                            </h4>
                            <p className="text-sm text-neutral-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
