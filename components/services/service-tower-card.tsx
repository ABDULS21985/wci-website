"use client";

import Link from "next/link";
import {
    Target,
    Rocket,
    Network,
    TrendingDown,
    Settings2,
    Heart,
    Sparkles,
    Brain,
    Building,
    Cloud,
    ShieldAlert,
    Scale,
    PiggyBank,
    GraduationCap,
    Leaf,
    Handshake,
    RotateCcw,
    SearchCheck,
    Code2,
    Headset,
    Landmark,
    Microscope,
    ArrowRight,
    Shield,
    type LucideIcon,
} from "lucide-react";
import type { ServiceTower } from "@/types/services-global";

// Comprehensive icon map for all 22 service towers
const iconMap: Record<string, LucideIcon> = {
    Target,
    Rocket,
    Network,
    TrendingDown,
    Settings2,
    Heart,
    Sparkles,
    Brain,
    Building,
    Cloud,
    ShieldAlert,
    Scale,
    PiggyBank,
    GraduationCap,
    Leaf,
    Handshake,
    RotateCcw,
    SearchCheck,
    Code2,
    Headset,
    Landmark,
    Microscope,
    Shield,
};

interface ServiceTowerCardProps {
    tower: ServiceTower;
    showServiceCount?: boolean;
    variant?: "default" | "compact" | "featured";
}

export function ServiceTowerCard({
    tower,
    showServiceCount = true,
    variant = "default",
}: ServiceTowerCardProps) {
    const IconComponent = iconMap[tower.icon] || Target;
    const serviceCount = tower.services?.length || 0;
    const accentColor = tower.accentColor || "#1E4DB7";

    if (variant === "compact") {
        return (
            <Link
                href={`/services/${tower.slug}`}
                className="group relative flex items-center gap-4 p-4 bg-white rounded-xl border border-neutral-100 hover:border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300"
            >
                <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${accentColor}12` }}
                >
                    <IconComponent
                        className="h-6 w-6"
                        style={{ color: accentColor }}
                        strokeWidth={1.5}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-neutral-900 truncate group-hover:text-primary transition-colors">
                        {tower.shortName}
                    </h3>
                    <p className="text-sm text-neutral-500">{serviceCount} services</p>
                </div>
                <ArrowRight
                    className="h-5 w-5 text-neutral-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
                />
            </Link>
        );
    }

    return (
        <Link
            href={`/services/${tower.slug}`}
            className="group relative block bg-white rounded-2xl border border-neutral-100/80 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-neutral-200/50 transition-all duration-500"
        >
            {/* Gradient background on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(135deg, ${accentColor}05 0%, transparent 50%)`,
                }}
            />

            {/* Featured Badge */}
            {tower.isFeatured && (
                <div className="absolute top-4 right-4 z-10">
                    <span
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg"
                        style={{
                            backgroundColor: accentColor,
                            boxShadow: `0 4px 14px ${accentColor}40`,
                        }}
                    >
                        <Sparkles className="h-3 w-3" />
                        Featured
                    </span>
                </div>
            )}

            {/* Card Header with Icon */}
            <div className="relative p-6 pb-4">
                <div className="relative">
                    {/* Icon container with glow effect */}
                    <div
                        className="relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                        style={{ backgroundColor: `${accentColor}10` }}
                    >
                        <div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                            style={{ backgroundColor: `${accentColor}30` }}
                        />
                        <IconComponent
                            className="relative h-8 w-8 transition-colors duration-300"
                            style={{ color: accentColor }}
                            strokeWidth={1.5}
                        />
                    </div>
                </div>
            </div>

            {/* Card Content */}
            <div className="relative p-6 pt-2">
                {/* Tower Code Badge */}
                <span
                    className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider mb-3 uppercase"
                    style={{
                        backgroundColor: `${accentColor}08`,
                        color: accentColor,
                    }}
                >
                    {tower.code}
                </span>

                {/* Tower Name */}
                <h3 className="text-lg font-bold text-neutral-900 mb-2 transition-colors duration-300 group-hover:text-primary leading-tight">
                    {tower.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-2">
                    {tower.description}
                </p>

                {/* Certifications/Frameworks Preview */}
                {(tower.certifications?.length || tower.frameworks?.length) ? (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {[...(tower.certifications || []), ...(tower.frameworks || [])]
                            .slice(0, 3)
                            .map((item, i) => (
                                <span
                                    key={i}
                                    className="inline-block px-2 py-0.5 bg-neutral-100 rounded text-[10px] text-neutral-600 font-medium"
                                >
                                    {item}
                                </span>
                            ))}
                        {(tower.certifications?.length || 0) + (tower.frameworks?.length || 0) > 3 && (
                            <span
                                className="inline-block px-2 py-0.5 rounded text-[10px] font-medium"
                                style={{
                                    backgroundColor: `${accentColor}10`,
                                    color: accentColor,
                                }}
                            >
                                +{(tower.certifications?.length || 0) + (tower.frameworks?.length || 0) - 3}
                            </span>
                        )}
                    </div>
                ) : null}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    {showServiceCount && (
                        <div className="flex items-center gap-2">
                            <span
                                className="text-2xl font-bold"
                                style={{ color: accentColor }}
                            >
                                {serviceCount}
                            </span>
                            <span className="text-xs text-neutral-500 font-medium">
                                {serviceCount === 1 ? "Service" : "Services"}
                            </span>
                        </div>
                    )}

                    {/* Arrow indicator */}
                    <div
                        className="flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                        style={{ color: accentColor }}
                    >
                        <span>Explore</span>
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                            style={{ backgroundColor: `${accentColor}10` }}
                        >
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom accent line with gradient */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{
                    background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}80 100%)`,
                }}
            />
        </Link>
    );
}
