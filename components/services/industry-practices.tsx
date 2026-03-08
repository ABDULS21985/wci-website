"use client";

import Link from "next/link";
import {
    Building2,
    Landmark,
    Heart,
    Wifi,
    Zap,
    ArrowRight,
    CheckCircle2,
    type LucideIcon,
} from "lucide-react";
import type { IndustryPractice } from "@/types/services-global";
import { industryPractices as defaultIndustryPractices } from "@/data/services-global";

// Icon mapping for string-based icon references
const iconMap: Record<string, LucideIcon> = {
    Building2,
    Landmark,
    Heart,
    Wifi,
    Zap,
};

interface IndustryPracticesProps {
    practices?: IndustryPractice[];
    className?: string;
}

export function IndustryPractices({
    practices = defaultIndustryPractices,
    className = "",
}: IndustryPracticesProps) {
    // Sort practices by displayOrder
    const sortedPractices = [...practices].sort(
        (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
    );

    return (
        <div className={`w-full ${className}`}>
            {/* Industry Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPractices.map((practice, index) => (
                    <IndustryPracticeCard
                        key={practice.code}
                        practice={practice}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}

interface IndustryPracticeCardProps {
    practice: IndustryPractice;
    index: number;
}

function IndustryPracticeCard({ practice, index }: IndustryPracticeCardProps) {
    const IconComponent = iconMap[practice.icon] || Landmark;
    const accentColor = practice.accentColor || "#1E4DB7";

    return (
        <div
            className="group relative bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Gradient top border */}
            <div
                className="h-1.5"
                style={{
                    background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}60 100%)`,
                }}
            />

            {/* Card Header with Icon */}
            <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                            style={{ backgroundColor: `${accentColor}10` }}
                        >
                            {/* Glow effect */}
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                                style={{ backgroundColor: `${accentColor}25` }}
                            />
                            <IconComponent
                                className="relative h-7 w-7"
                                style={{ color: accentColor }}
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>

                    {/* Industry Code Badge */}
                    <span
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-lg"
                        style={{
                            backgroundColor: accentColor,
                            boxShadow: `0 4px 14px ${accentColor}30`,
                        }}
                    >
                        {practice.code}
                    </span>
                </div>

                {/* Practice Name */}
                <h3 className="text-xl font-bold text-neutral-900 mb-3 transition-colors duration-300 group-hover:text-primary">
                    {practice.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                    {practice.description}
                </p>
            </div>

            {/* Key Offerings Section */}
            {practice.keyOfferings && practice.keyOfferings.length > 0 && (
                <div className="px-6 pb-4">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                        Key Offerings
                    </p>
                    <ul className="space-y-2">
                        {practice.keyOfferings.slice(0, 4).map((offering, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-neutral-700"
                            >
                                <CheckCircle2
                                    className="flex-shrink-0 h-4 w-4 mt-0.5"
                                    style={{ color: accentColor }}
                                />
                                <span>{offering}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Sub-Sectors Tags */}
            {practice.subSectors && practice.subSectors.length > 0 && (
                <div className="px-6 pb-4">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                        Sub-Sectors
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {practice.subSectors.slice(0, 4).map((sector, i) => (
                            <span
                                key={i}
                                className="inline-block px-3 py-1 bg-neutral-100 rounded-lg text-xs text-neutral-600 font-medium"
                            >
                                {sector}
                            </span>
                        ))}
                        {practice.subSectors.length > 4 && (
                            <span
                                className="inline-block px-3 py-1 rounded-lg text-xs font-medium"
                                style={{
                                    backgroundColor: `${accentColor}10`,
                                    color: accentColor,
                                }}
                            >
                                +{practice.subSectors.length - 4} more
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50">
                <Link
                    href="/contact"
                    className="flex items-center justify-between text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                    style={{ color: accentColor }}
                >
                    <span>Learn More</span>
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${accentColor}10` }}
                    >
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </Link>
            </div>

            {/* Bottom accent line */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{
                    background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}60 100%)`,
                }}
            />
        </div>
    );
}
