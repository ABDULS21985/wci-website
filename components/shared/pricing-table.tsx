"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/shared/components";
import type { PricingTier } from "@/types/trustmehub";

interface PricingTableProps {
    tiers: PricingTier[];
    accentColor?: string;
}

export function PricingTable({
    tiers,
    accentColor = "#10B981",
}: PricingTableProps) {
    return (
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier, index) => (
                <div
                    key={tier.id}
                    className={`relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl animate-fade-in-up ${
                        tier.highlighted
                            ? "border-emerald-500 scale-105 z-10"
                            : "border-neutral-200 hover:border-neutral-300"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    {tier.highlighted && (
                        <div
                            className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-sm font-semibold"
                            style={{ backgroundColor: accentColor }}
                        >
                            Most Popular
                        </div>
                    )}

                    <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">
                            {tier.name}
                        </h3>
                        <div className="flex items-baseline justify-center gap-1">
                            <span className="text-4xl lg:text-5xl font-bold text-neutral-900">
                                {tier.price}
                            </span>
                            {tier.billingPeriod !== "custom" && (
                                <span className="text-neutral-500">/month</span>
                            )}
                        </div>
                        <p className="text-sm text-neutral-600 mt-2">
                            {tier.description}
                        </p>
                    </div>

                    <div
                        className="text-center py-3 px-4 rounded-lg mb-6"
                        style={{ backgroundColor: `${accentColor}15` }}
                    >
                        <span className="text-sm font-medium text-neutral-700">
                            {tier.verifications} verifications/month
                        </span>
                    </div>

                    <ul className="space-y-3 mb-8">
                        {tier.features.map((feature, featureIndex) => (
                            <li
                                key={featureIndex}
                                className="flex items-start gap-3"
                            >
                                <div
                                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                                    style={{ backgroundColor: `${accentColor}20` }}
                                >
                                    <Check
                                        className="w-3 h-3"
                                        style={{ color: accentColor }}
                                    />
                                </div>
                                <span className="text-sm text-neutral-700">
                                    {feature}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <Button
                        asChild
                        size="lg"
                        className={`w-full rounded-full ${
                            tier.highlighted
                                ? "text-white"
                                : "bg-neutral-900 hover:bg-neutral-800 text-white"
                        }`}
                        style={
                            tier.highlighted
                                ? { backgroundColor: accentColor }
                                : undefined
                        }
                    >
                        <Link href={tier.ctaHref}>{tier.ctaLabel}</Link>
                    </Button>
                </div>
            ))}
        </div>
    );
}
