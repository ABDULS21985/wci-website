"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface Partner {
    name: string;
    description: string;
    category: "cloud" | "security" | "blockchain" | "enterprise";
    logo?: string;
    initials: string;
}

const partners: Partner[] = [
    {
        name: "Microsoft Azure",
        description: "Cloud infrastructure and AI services partner",
        category: "cloud",
        initials: "MS",
    },
    {
        name: "AWS",
        description: "Cloud computing and serverless solutions",
        category: "cloud",
        initials: "AWS",
    },
    {
        name: "Hyperledger",
        description: "Enterprise blockchain framework partner",
        category: "blockchain",
        initials: "HL",
    },
    {
        name: "Palo Alto Networks",
        description: "Advanced cybersecurity solutions",
        category: "security",
        initials: "PA",
    },
    {
        name: "IBM",
        description: "Enterprise AI and hybrid cloud solutions",
        category: "enterprise",
        initials: "IBM",
    },
    {
        name: "CrowdStrike",
        description: "Endpoint security and threat intelligence",
        category: "security",
        initials: "CS",
    },
];

const categoryColors: Record<string, string> = {
    cloud: "from-blue-500/20 to-blue-600/10",
    security: "from-red-500/20 to-red-600/10",
    blockchain: "from-purple-500/20 to-purple-600/10",
    enterprise: "from-green-500/20 to-green-600/10",
};

export function PartnersGrid() {
    return (
        <section className="w-full py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in-up">
                        <div className="w-12 h-0.5 bg-accent-orange"></div>
                        <h2 className="text-xs md:text-sm font-bold tracking-wider text-gray-600 uppercase">
                            TECHNOLOGY PARTNERS
                        </h2>
                        <div className="w-12 h-0.5 bg-accent-orange"></div>
                    </div>

                    <div className="space-y-2 mb-8 animate-fade-in-up delay-100">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e3a8a] leading-tight">
                            Strategic Partnerships
                        </h3>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-orange leading-tight">
                            Driving Innovation
                        </h3>
                    </div>

                    <p className="text-lg text-neutral-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
                        We partner with industry-leading technology providers to deliver best-in-class solutions for our clients.
                    </p>
                </div>

                {/* Partners Grid */}
                <div className="max-w-[1000px] mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                        {partners.map((partner, index) => (
                            <div
                                key={partner.name}
                                className="group animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-neutral-100 h-full">
                                    {/* Logo Area */}
                                    <div
                                        className={`relative p-8 flex items-center justify-center bg-gradient-to-br ${categoryColors[partner.category]} group-hover:scale-105 transition-transform duration-500`}
                                    >
                                        <div className="w-20 h-20 rounded-xl bg-white shadow-lg flex items-center justify-center">
                                            <span className="text-xl font-bold text-primary">
                                                {partner.initials}
                                            </span>
                                        </div>

                                        {/* Hover Link */}
                                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                                                <ExternalLink className="h-4 w-4 text-primary" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h4 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors duration-300">
                                            {partner.name}
                                        </h4>
                                        <p className="text-sm text-neutral-600 leading-relaxed">
                                            {partner.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Partner Program CTA */}
                <div className="text-center mt-12 animate-fade-in-up delay-500">
                    <p className="text-neutral-600 mb-4">
                        Interested in becoming a technology partner?
                    </p>
                    <Link
                        href="/contact?subject=partnership"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-secondary text-white rounded-full font-semibold transition-all duration-300 hover:scale-105"
                    >
                        Partner With Us
                        <ExternalLink className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
