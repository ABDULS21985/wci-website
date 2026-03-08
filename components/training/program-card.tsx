"use client";

import { ArrowRight, Clock, Users, Award } from "lucide-react";
import { TrainingProgram, ProgramCategory } from "./training-data";

interface ProgramCardProps {
    program: TrainingProgram;
    index?: number;
}

const categoryColors: Record<ProgramCategory, { bg: string; text: string; badge: string }> = {
    executive: {
        bg: "bg-primary/10",
        text: "text-primary",
        badge: "bg-primary text-white",
    },
    technical: {
        bg: "bg-accent-orange/10",
        text: "text-accent-orange",
        badge: "bg-accent-orange text-white",
    },
    compliance: {
        bg: "bg-green-500/10",
        text: "text-green-600",
        badge: "bg-green-600 text-white",
    },
};

const categoryLabels: Record<ProgramCategory, string> = {
    executive: "Executive",
    technical: "Technical",
    compliance: "Compliance",
};

export function ProgramCard({ program, index = 0 }: ProgramCardProps) {
    const colors = categoryColors[program.category];
    const Icon = program.icon;

    return (
        <div
            className="group relative animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-neutral-100 h-full flex flex-col">
                {/* Header with Icon */}
                <div className={`relative p-6 ${colors.bg} flex items-start justify-between`}>
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-white shadow-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Icon className={`h-7 w-7 ${colors.text}`} strokeWidth={1.5} />
                    </div>

                    {/* Category Badge */}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                        {categoryLabels[program.category]}
                    </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-neutral-900 mb-2 transition-colors duration-300 group-hover:text-primary">
                        {program.title}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-neutral-600">
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-accent-orange" />
                            <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4 text-primary" />
                            <span className="truncate max-w-[150px]">{program.audience}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-2">
                        {program.description}
                    </p>

                    {/* Outcomes */}
                    <div className="flex-1">
                        <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                            Key Outcomes
                        </h4>
                        <ul className="space-y-1.5">
                            {program.outcomes.slice(0, 3).map((outcome, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-neutral-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-orange mt-1.5 flex-shrink-0"></span>
                                    <span className="line-clamp-1">{outcome}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Certification Badge */}
                    {program.certification && (
                        <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-accent-yellow/10 rounded-lg">
                            <Award className="h-4 w-4 text-accent-orange" />
                            <span className="text-xs font-medium text-neutral-700">
                                {program.certification}
                            </span>
                        </div>
                    )}

                    {/* Learn More Button */}
                    <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-100 hover:bg-primary text-neutral-700 hover:text-white rounded-lg transition-all duration-300 group/btn">
                        <span className="text-sm font-medium">Learn More</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    );
}
