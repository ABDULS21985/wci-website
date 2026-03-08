"use client";

import Link from "next/link";
import {
    ShieldCheck,
    ArrowRight,
    CheckCircle,
    Shield,
    Lock,
    Eye,
} from "lucide-react";
import { Button } from "@/components/ui/shared/components";
import { getServiceCategoryById } from "@/data/services";
import { ServiceCard } from "./service-card";

const ACCENT_COLOR = "#1E4DB7";

const certifications = [
    "ISO 27001",
    "NIST CSF",
    "QCB Framework",
    "Qatar NIA",
];

const highlights = [
    {
        icon: Shield,
        title: "Defense in Depth",
        description: "Multi-layered security approach",
    },
    {
        icon: Lock,
        title: "Zero Trust",
        description: "Verify every access request",
    },
    {
        icon: Eye,
        title: "Threat Intelligence",
        description: "Proactive threat detection",
    },
];

export function CybersecuritySection() {
    const category = getServiceCategoryById("cybersecurity");

    if (!category) return null;

    return (
        <section
            id="cybersecurity"
            className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-neutral-50 scroll-mt-20"
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 animate-fade-in-up">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-0.5 bg-accent-orange"></div>
                        <span className="text-xs md:text-sm font-bold tracking-wider text-gray-600 uppercase">
                            Security Advisory
                        </span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                    style={{ backgroundColor: `${ACCENT_COLOR}15` }}
                                >
                                    <ShieldCheck
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

                        {/* Quick Highlights */}
                        <div className="flex flex-wrap lg:flex-nowrap gap-4">
                            {highlights.map((highlight, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-sm border border-neutral-100 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <highlight.icon className="h-5 w-5 text-accent-orange" />
                                    <div>
                                        <p className="text-sm font-semibold text-neutral-900">
                                            {highlight.title}
                                        </p>
                                        <p className="text-xs text-neutral-500">
                                            {highlight.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
                    {category.services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            accentColor={ACCENT_COLOR}
                            index={index}
                        />
                    ))}
                </div>

                {/* Certifications Section */}
                <div
                    className="p-6 md:p-8 bg-white rounded-2xl border border-neutral-100 shadow-md animate-fade-in-up"
                    style={{ animationDelay: "400ms" }}
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-bold text-neutral-900">
                                    Certifications & Frameworks
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {certifications.map((cert, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-primary/5 border border-primary/20 rounded-full text-sm font-medium text-primary"
                                    >
                                        {cert}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <Button
                            asChild
                            size="lg"
                            className="rounded-full px-8 h-12 text-base font-semibold bg-primary hover:bg-secondary transition-all duration-300 hover:scale-105"
                        >
                            <Link href="/contact">
                                Get Security Assessment
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
