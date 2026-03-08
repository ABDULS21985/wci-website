"use client";

import { useState } from "react";
import {
    Map,
    FileText,
    Search,
    CheckSquare,
    Building,
    UserCheck,
    AlertTriangle,
    Compass,
    Database,
    LineChart,
    Scale,
    GitMerge,
    GraduationCap,
    ClipboardList,
    Code,
    ShieldAlert,
    Network,
    Presentation,
    Coins,
    LayoutGrid,
    Cog,
    AlertCircle,
    Users,
    FileSearch,
    Eye,
    ChevronDown,
    CheckCircle2,
    type LucideIcon,
} from "lucide-react";
import type { Service } from "@/types/services";

const iconMap: Record<string, LucideIcon> = {
    Map,
    FileText,
    Search,
    CheckSquare,
    Building,
    UserCheck,
    AlertTriangle,
    Compass,
    Database,
    LineChart,
    Scale,
    GitMerge,
    GraduationCap,
    ClipboardList,
    Code,
    ShieldAlert,
    Network,
    Presentation,
    Coins,
    LayoutGrid,
    Cog,
    AlertCircle,
    Users,
    FileSearch,
    Eye,
};

interface ServiceCardProps {
    service: Service;
    accentColor?: string;
    index?: number;
}

export function ServiceCard({
    service,
    accentColor = "#1E4DB7",
    index = 0,
}: ServiceCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const IconComponent = iconMap[service.icon] || FileText;
    const hasDeliverables = service.deliverables && service.deliverables.length > 0;

    return (
        <div
            className={`
                group bg-white rounded-xl border shadow-md
                hover:shadow-2xl transition-all duration-500
                animate-fade-in-up cursor-pointer
                ${isExpanded ? "border-primary/30 ring-2 ring-primary/10" : "border-neutral-100"}
            `}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => hasDeliverables && setIsExpanded(!isExpanded)}
        >
            {/* Card Header */}
            <div className="p-5">
                <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                        style={{ backgroundColor: `${accentColor}15` }}
                    >
                        <IconComponent
                            className="h-6 w-6 transition-colors duration-300"
                            style={{ color: accentColor }}
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-neutral-900 text-base mb-2 group-hover:text-primary transition-colors duration-300">
                            {service.name}
                        </h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                            {service.description}
                        </p>
                    </div>

                    {/* Expand Indicator */}
                    {hasDeliverables && (
                        <div className="flex-shrink-0">
                            <ChevronDown
                                className={`h-5 w-5 text-neutral-400 transition-transform duration-300 ${
                                    isExpanded ? "rotate-180" : ""
                                }`}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Expandable Deliverables Section */}
            {hasDeliverables && (
                <div
                    className={`
                        overflow-hidden transition-all duration-500 ease-in-out
                        ${isExpanded ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
                    `}
                >
                    <div className="px-5 pb-5 pt-0">
                        <div className="pt-4 border-t border-neutral-100">
                            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                                Key Deliverables
                            </p>
                            <div className="space-y-2">
                                {service.deliverables?.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 text-sm text-neutral-700"
                                    >
                                        <CheckCircle2
                                            className="h-4 w-4 flex-shrink-0"
                                            style={{ color: accentColor }}
                                        />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Collapsed Deliverables Preview */}
            {hasDeliverables && !isExpanded && (
                <div className="px-5 pb-4">
                    <div className="flex flex-wrap gap-1.5">
                        {service.deliverables?.slice(0, 3).map((item, i) => (
                            <span
                                key={i}
                                className="inline-block px-2.5 py-1 bg-neutral-100 rounded-md text-xs text-neutral-600 font-medium"
                            >
                                {item}
                            </span>
                        ))}
                        {service.deliverables && service.deliverables.length > 3 && (
                            <span
                                className="inline-block px-2.5 py-1 rounded-md text-xs font-medium"
                                style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                            >
                                +{service.deliverables.length - 3} more
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
