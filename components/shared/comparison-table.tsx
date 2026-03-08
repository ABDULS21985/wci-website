"use client";

import {
    Clock,
    DollarSign,
    ShieldCheck,
    TrendingUp,
    Lock,
    Globe,
    type LucideIcon,
} from "lucide-react";
import type { ComparisonMetric } from "@/types/trustmehub";

const iconMap: Record<string, LucideIcon> = {
    Clock,
    DollarSign,
    ShieldCheck,
    TrendingUp,
    Lock,
    Globe,
};

interface ComparisonTableProps {
    metrics: ComparisonMetric[];
    leftLabel?: string;
    rightLabel?: string;
    accentColor?: string;
}

export function ComparisonTable({
    metrics,
    leftLabel = "Traditional",
    rightLabel = "TrustMeHub",
    accentColor = "#10B981",
}: ComparisonTableProps) {
    return (
        <div className="w-full">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                {/* Header */}
                <div className="grid grid-cols-4 bg-neutral-50 border-b border-neutral-200">
                    <div className="p-4 lg:p-6 font-semibold text-neutral-900">
                        Metric
                    </div>
                    <div className="p-4 lg:p-6 font-semibold text-neutral-600 text-center">
                        {leftLabel}
                    </div>
                    <div
                        className="p-4 lg:p-6 font-semibold text-center text-white"
                        style={{ backgroundColor: accentColor }}
                    >
                        {rightLabel}
                    </div>
                    <div className="p-4 lg:p-6 font-semibold text-neutral-900 text-center">
                        Improvement
                    </div>
                </div>

                {/* Rows */}
                {metrics.map((metric, index) => {
                    const Icon = iconMap[metric.icon] || Clock;
                    return (
                        <div
                            key={index}
                            className={`grid grid-cols-4 ${
                                index !== metrics.length - 1
                                    ? "border-b border-neutral-100"
                                    : ""
                            } hover:bg-neutral-50 transition-colors`}
                        >
                            <div className="p-4 lg:p-6 flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${accentColor}15` }}
                                >
                                    <Icon
                                        className="w-5 h-5"
                                        style={{ color: accentColor }}
                                    />
                                </div>
                                <span className="font-medium text-neutral-900">
                                    {metric.metric}
                                </span>
                            </div>
                            <div className="p-4 lg:p-6 flex flex-col items-center justify-center text-center">
                                <span className="text-lg font-semibold text-red-600">
                                    {metric.traditional.value}
                                </span>
                                {metric.traditional.detail && (
                                    <span className="text-xs text-neutral-500 mt-1">
                                        {metric.traditional.detail}
                                    </span>
                                )}
                            </div>
                            <div
                                className="p-4 lg:p-6 flex flex-col items-center justify-center text-center"
                                style={{ backgroundColor: `${accentColor}08` }}
                            >
                                <span
                                    className="text-lg font-semibold"
                                    style={{ color: accentColor }}
                                >
                                    {metric.trustmehub.value}
                                </span>
                                {metric.trustmehub.detail && (
                                    <span className="text-xs text-neutral-500 mt-1">
                                        {metric.trustmehub.detail}
                                    </span>
                                )}
                            </div>
                            <div className="p-4 lg:p-6 flex items-center justify-center">
                                <span
                                    className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    {metric.improvement}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {metrics.map((metric, index) => {
                    const Icon = iconMap[metric.icon] || Clock;
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-neutral-200 p-4 animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${accentColor}15` }}
                                >
                                    <Icon
                                        className="w-5 h-5"
                                        style={{ color: accentColor }}
                                    />
                                </div>
                                <span className="font-semibold text-neutral-900">
                                    {metric.metric}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-red-50 rounded-lg">
                                    <div className="text-xs text-neutral-500 mb-1">
                                        {leftLabel}
                                    </div>
                                    <div className="text-lg font-semibold text-red-600">
                                        {metric.traditional.value}
                                    </div>
                                </div>
                                <div
                                    className="text-center p-3 rounded-lg"
                                    style={{ backgroundColor: `${accentColor}15` }}
                                >
                                    <div className="text-xs text-neutral-500 mb-1">
                                        {rightLabel}
                                    </div>
                                    <div
                                        className="text-lg font-semibold"
                                        style={{ color: accentColor }}
                                    >
                                        {metric.trustmehub.value}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 text-center">
                                <span
                                    className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    {metric.improvement}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
