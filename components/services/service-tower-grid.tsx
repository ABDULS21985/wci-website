"use client";

import { cn } from "@/components/ui/shared/lib/utils";
import { Layers, Briefcase, Sparkles, Grid3X3, LayoutList, Filter } from "lucide-react";
import { ServiceTowerCard } from "./service-tower-card";
import type { ServiceTower } from "@/types/services-global";
import { useState } from "react";

interface ServiceTowerGridProps {
    towers: ServiceTower[];
    layout?: "grid" | "list";
    showStats?: boolean;
    showFilters?: boolean;
    className?: string;
}

export function ServiceTowerGrid({
    towers,
    layout: initialLayout = "grid",
    showStats = true,
    showFilters = false,
    className,
}: ServiceTowerGridProps) {
    const [layout, setLayout] = useState<"grid" | "list">(initialLayout);
    const [filter, setFilter] = useState<"all" | "featured">("all");

    // Calculate stats
    const totalTowers = towers.length;
    const totalServices = towers.reduce(
        (acc, tower) => acc + (tower.services?.length || 0),
        0
    );
    const featuredCount = towers.filter((t) => t.isFeatured).length;

    // Filter towers
    const filteredTowers = filter === "featured"
        ? towers.filter((t) => t.isFeatured)
        : towers;

    const isGrid = layout === "grid";

    return (
        <div className={cn("w-full", className)}>
            {/* Stats & Controls Section */}
            {(showStats || showFilters) && (
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
                    {/* Stats Cards */}
                    {showStats && (
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="group flex items-center gap-4 px-5 py-4 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-lg hover:border-neutral-200 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Layers className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-neutral-900">
                                        {totalTowers}
                                    </p>
                                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
                                        Service Towers
                                    </p>
                                </div>
                            </div>

                            <div className="group flex items-center gap-4 px-5 py-4 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-lg hover:border-neutral-200 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-orange/20 to-accent-orange/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Briefcase className="h-6 w-6 text-accent-orange" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-neutral-900">
                                        {totalServices}+
                                    </p>
                                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
                                        Total Services
                                    </p>
                                </div>
                            </div>

                            <div className="group flex items-center gap-4 px-5 py-4 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-lg hover:border-neutral-200 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Sparkles className="h-6 w-6 text-purple-500" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-neutral-900">
                                        {featuredCount}
                                    </p>
                                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
                                        Featured
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Filter & Layout Controls */}
                    {showFilters && (
                        <div className="flex items-center gap-3">
                            {/* Filter Toggle */}
                            <div className="flex items-center gap-2 p-1.5 bg-neutral-100 rounded-xl">
                                <button
                                    onClick={() => setFilter("all")}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                                        filter === "all"
                                            ? "bg-white text-neutral-900 shadow-sm"
                                            : "text-neutral-500 hover:text-neutral-700"
                                    )}
                                >
                                    <Filter className="h-4 w-4" />
                                    All
                                </button>
                                <button
                                    onClick={() => setFilter("featured")}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                                        filter === "featured"
                                            ? "bg-white text-neutral-900 shadow-sm"
                                            : "text-neutral-500 hover:text-neutral-700"
                                    )}
                                >
                                    <Sparkles className="h-4 w-4" />
                                    Featured
                                </button>
                            </div>

                            {/* Layout Toggle */}
                            <div className="flex items-center gap-1 p-1.5 bg-neutral-100 rounded-xl">
                                <button
                                    onClick={() => setLayout("grid")}
                                    className={cn(
                                        "p-2.5 rounded-lg transition-all duration-300",
                                        isGrid
                                            ? "bg-white text-primary shadow-sm"
                                            : "text-neutral-400 hover:text-neutral-600"
                                    )}
                                    aria-label="Grid view"
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setLayout("list")}
                                    className={cn(
                                        "p-2.5 rounded-lg transition-all duration-300",
                                        !isGrid
                                            ? "bg-white text-primary shadow-sm"
                                            : "text-neutral-400 hover:text-neutral-600"
                                    )}
                                    aria-label="List view"
                                >
                                    <LayoutList className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Tower Grid/List */}
            {filteredTowers.length > 0 ? (
                <div
                    className={cn(
                        isGrid
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            : "grid grid-cols-1 md:grid-cols-2 gap-4"
                    )}
                >
                    {filteredTowers.map((tower, index) => (
                        <div
                            key={tower.code}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <ServiceTowerCard
                                tower={tower}
                                showServiceCount={true}
                                variant={isGrid ? "default" : "compact"}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-neutral-100 flex items-center justify-center">
                        <Layers className="h-10 w-10 text-neutral-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        No service towers found
                    </h3>
                    <p className="text-neutral-600 max-w-md mx-auto">
                        {filter === "featured"
                            ? "No featured service towers available. Try viewing all towers."
                            : "No service towers are currently available."}
                    </p>
                    {filter === "featured" && (
                        <button
                            onClick={() => setFilter("all")}
                            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                            View All Towers
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default ServiceTowerGrid;
