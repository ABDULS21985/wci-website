"use client";

import {
    Clock,
    CheckCircle2,
    Zap,
    Rocket,
    Headset,
    GraduationCap,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/components/ui/shared/lib/utils";
import { engagementModels as defaultModels } from "@/data/services-global";
import type { EngagementModel } from "@/types/services-global";
import Link from "next/link";

// Map icon string names to actual lucide-react components
const iconMap: Record<string, LucideIcon> = {
    Zap,
    Rocket,
    Headset,
    GraduationCap,
};

interface EngagementModelsProps {
    models?: EngagementModel[];
    highlightedModel?: string;
    className?: string;
}

export function EngagementModels({
    models = defaultModels,
    highlightedModel,
    className,
}: EngagementModelsProps) {
    return (
        <div className={cn("w-full", className)}>
            {/* Engagement Models Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {models.map((model, index) => {
                    const IconComponent = iconMap[model.icon] || Zap;
                    const isHighlighted = highlightedModel === model.code;
                    const accentColor = model.accentColor || "#1E4DB7";

                    return (
                        <div
                            key={model.code}
                            className={cn(
                                "group relative bg-white rounded-2xl overflow-hidden",
                                "border shadow-sm hover:shadow-2xl transition-all duration-500",
                                "animate-fade-in-up",
                                isHighlighted
                                    ? "ring-2 ring-offset-2 border-transparent"
                                    : "border-neutral-100 hover:border-neutral-200"
                            )}
                            style={{
                                animationDelay: `${index * 100}ms`,
                                ...(isHighlighted && { ringColor: accentColor }),
                            }}
                        >
                            {/* Gradient Header */}
                            <div
                                className="relative h-2"
                                style={{
                                    background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}80 100%)`,
                                }}
                            />

                            {/* Highlighted Badge */}
                            {isHighlighted && (
                                <div
                                    className="absolute top-6 right-4 px-3 py-1 rounded-full text-xs font-bold text-white z-10"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    Recommended
                                </div>
                            )}

                            <div className="p-6">
                                {/* Icon */}
                                <div className="relative mb-5">
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                                        style={{ backgroundColor: `${accentColor}10` }}
                                    >
                                        {/* Glow effect */}
                                        <div
                                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                                            style={{ backgroundColor: `${accentColor}25` }}
                                        />
                                        <IconComponent
                                            className="relative h-8 w-8"
                                            style={{ color: accentColor }}
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                </div>

                                {/* Name */}
                                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors duration-300">
                                    {model.name}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-neutral-600 leading-relaxed mb-5">
                                    {model.description}
                                </p>

                                {/* Duration Badge */}
                                <div
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-5"
                                    style={{ backgroundColor: `${accentColor}08` }}
                                >
                                    <Clock
                                        className="h-4 w-4"
                                        style={{ color: accentColor }}
                                    />
                                    <span
                                        className="text-sm font-semibold"
                                        style={{ color: accentColor }}
                                    >
                                        {model.durationRange}
                                    </span>
                                </div>

                                {/* Typical Outputs */}
                                <div className="pt-5 border-t border-neutral-100">
                                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                                        Typical Outputs
                                    </p>
                                    <ul className="space-y-3">
                                        {model.typicalOutputs?.map((output, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-3 text-sm text-neutral-700"
                                            >
                                                <div
                                                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                                                    style={{ backgroundColor: `${accentColor}10` }}
                                                >
                                                    <CheckCircle2
                                                        className="h-3 w-3"
                                                        style={{ color: accentColor }}
                                                    />
                                                </div>
                                                <span>{output}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Bottom gradient line on hover */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                                style={{
                                    background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}60 100%)`,
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            {/* CTA Row */}
            <div className="mt-12 text-center">
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary/5 hover:bg-primary/10 text-primary font-semibold rounded-xl hover:gap-3 transition-all duration-300"
                >
                    Discuss your engagement requirements
                    <ArrowRight className="h-5 w-5" />
                </Link>
            </div>
        </div>
    );
}
