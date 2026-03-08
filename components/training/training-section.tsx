"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, GraduationCap, Briefcase, Code, Scale } from "lucide-react";
import { ProgramCard } from "./program-card";
import {
    ProgramCategory,
    categoryInfo,
    getProgramsByCategory,
} from "./training-data";

const categoryTabs: { id: ProgramCategory; label: string; icon: typeof GraduationCap }[] = [
    { id: "executive", label: "Executive Programs", icon: Briefcase },
    { id: "technical", label: "Technical Programs", icon: Code },
    { id: "compliance", label: "Compliance Training", icon: Scale },
];

export function TrainingSection() {
    const [activeCategory, setActiveCategory] = useState<ProgramCategory>("executive");
    const programs = getProgramsByCategory(activeCategory);
    const currentCategoryInfo = categoryInfo[activeCategory];

    return (
        <section className="w-full py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Header with orange line */}
                <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
                    <div className="w-12 h-0.5 bg-accent-orange"></div>
                    <h2 className="text-xs md:text-sm font-bold tracking-wider text-gray-600 uppercase">
                        TRAINING ACADEMY
                    </h2>
                </div>

                {/* Title */}
                <div className="space-y-2 mb-8 animate-fade-in-up">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e3a8a] leading-tight">
                        Build Your Team&apos;s
                    </h3>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-orange leading-tight">
                        Capabilities
                    </h3>
                </div>

                {/* Description */}
                <p className="text-lg text-neutral-600 max-w-3xl mb-10 animate-fade-in-up delay-100">
                    Empower your workforce with industry-leading training programs designed for Qatar and the GCC region. From executive workshops to hands-on technical certifications.
                </p>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-3 mb-10 animate-fade-in-up delay-200">
                    {categoryTabs.map((tab) => {
                        const isActive = activeCategory === tab.id;
                        const TabIcon = tab.icon;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveCategory(tab.id)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                                    isActive
                                        ? "bg-primary text-white shadow-lg"
                                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                }`}
                            >
                                <TabIcon className={`h-4 w-4 ${isActive ? "text-white" : "text-primary"}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Category Description */}
                <p className="text-neutral-600 mb-8 animate-fade-in-up">
                    {currentCategoryInfo.description}
                </p>

                {/* Programs Grid */}
                <div className="max-w-[1200px] mx-auto mb-12">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {programs.map((program, index) => (
                            <ProgramCard key={program.id} program={program} index={index} />
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center animate-fade-in-up delay-300">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-primary/5 to-accent-orange/5 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <GraduationCap className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-neutral-900">
                                    Looking for custom training?
                                </p>
                                <p className="text-sm text-neutral-600">
                                    We design tailored programs for your organization
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/contact?subject=training"
                            className="flex items-center gap-2 px-6 py-3 bg-accent-orange hover:bg-accent-red text-white rounded-full font-semibold transition-all duration-300 hover:scale-105"
                        >
                            Inquire Now
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
