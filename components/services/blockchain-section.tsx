"use client";

import Link from "next/link";
import {
    Blocks,
    ArrowRight,
    Link2,
    FileCheck,
    Coins,
} from "lucide-react";
import { Button } from "@/components/ui/shared/components";
import { getServiceCategoryById } from "@/data/services";
import { ServiceCard } from "./service-card";

const ACCENT_COLOR = "#E86A1D";

const platforms = [
    "Hyperledger Fabric",
    "Ethereum",
    "R3 Corda",
];

const features = [
    {
        icon: Link2,
        title: "Immutable Records",
        description: "Tamper-proof data",
    },
    {
        icon: FileCheck,
        title: "Smart Contracts",
        description: "Automated agreements",
    },
    {
        icon: Coins,
        title: "Tokenization",
        description: "Digital asset creation",
    },
];

export function BlockchainSection() {
    const category = getServiceCategoryById("blockchain");

    if (!category) return null;

    return (
        <section
            id="blockchain"
            className="w-full py-16 md:py-24 bg-gradient-to-b from-neutral-50 to-white scroll-mt-20"
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 animate-fade-in-up">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-0.5 bg-accent-orange"></div>
                        <span className="text-xs md:text-sm font-bold tracking-wider text-gray-600 uppercase">
                            Blockchain & DLT
                        </span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                    style={{ backgroundColor: `${ACCENT_COLOR}15` }}
                                >
                                    <Blocks
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

                        {/* Quick Features */}
                        <div className="flex flex-wrap lg:flex-nowrap gap-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-sm border border-neutral-100 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <feature.icon
                                        className="h-5 w-5"
                                        style={{ color: ACCENT_COLOR }}
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-neutral-900">
                                            {feature.title}
                                        </p>
                                        <p className="text-xs text-neutral-500">
                                            {feature.description}
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

                {/* Platforms Section */}
                <div
                    className="p-6 md:p-8 bg-white rounded-2xl border border-neutral-100 shadow-md animate-fade-in-up"
                    style={{ animationDelay: "350ms" }}
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <Blocks
                                    className="h-5 w-5"
                                    style={{ color: ACCENT_COLOR }}
                                />
                                <h3 className="text-lg font-bold text-neutral-900">
                                    Platform Expertise
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {platforms.map((platform, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 rounded-full text-sm font-medium text-white"
                                        style={{ backgroundColor: ACCENT_COLOR }}
                                    >
                                        {platform}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <Button
                            asChild
                            size="lg"
                            className="rounded-full px-8 h-12 text-base font-semibold transition-all duration-300 hover:scale-105"
                            style={{ backgroundColor: ACCENT_COLOR }}
                        >
                            <Link href="/contact">
                                Explore DLT Solutions
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
