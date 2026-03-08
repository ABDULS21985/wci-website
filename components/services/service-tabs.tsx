"use client";

import { useState, useRef, useEffect } from "react";
import { ShieldCheck, Brain, Blocks, ClipboardCheck, type LucideIcon } from "lucide-react";

interface Tab {
    id: string;
    name: string;
    shortName: string;
    icon: LucideIcon;
}

const tabs: Tab[] = [
    {
        id: "cybersecurity",
        name: "Cybersecurity & Risk",
        shortName: "Cybersecurity",
        icon: ShieldCheck,
    },
    {
        id: "ai-data",
        name: "AI & Data Strategy",
        shortName: "AI & Data",
        icon: Brain,
    },
    {
        id: "blockchain",
        name: "Blockchain & DLT",
        shortName: "Blockchain",
        icon: Blocks,
    },
    {
        id: "it-governance",
        name: "IT Governance",
        shortName: "IT Governance",
        icon: ClipboardCheck,
    },
];

interface ServiceTabsProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export function ServiceTabs({ activeTab, onTabChange }: ServiceTabsProps) {
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
        const activeTabElement = tabsRef.current[activeIndex];

        if (activeTabElement && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const tabRect = activeTabElement.getBoundingClientRect();

            setIndicatorStyle({
                left: tabRect.left - containerRect.left,
                width: tabRect.width,
            });
        }
    }, [activeTab]);

    return (
        <div className="w-full bg-white sticky top-16 z-30 shadow-sm">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div
                    ref={containerRef}
                    className="relative flex items-center justify-start md:justify-center overflow-x-auto scrollbar-hide py-2"
                >
                    <div className="flex items-center gap-2 md:gap-4 min-w-max px-2">
                        {tabs.map((tab, index) => {
                            const isActive = activeTab === tab.id;
                            const Icon = tab.icon;

                            return (
                                <button
                                    key={tab.id}
                                    ref={(el) => {
                                        tabsRef.current[index] = el;
                                    }}
                                    onClick={() => onTabChange(tab.id)}
                                    className={`
                                        group flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg
                                        transition-all duration-300 whitespace-nowrap
                                        ${
                                            isActive
                                                ? "text-primary bg-primary/5"
                                                : "text-neutral-600 hover:text-primary hover:bg-neutral-50"
                                        }
                                    `}
                                >
                                    <Icon
                                        className={`h-5 w-5 transition-all duration-300 ${
                                            isActive
                                                ? "text-accent-orange"
                                                : "text-neutral-400 group-hover:text-primary"
                                        }`}
                                    />
                                    <span className="hidden md:inline text-sm font-medium">
                                        {tab.name}
                                    </span>
                                    <span className="md:hidden text-sm font-medium">
                                        {tab.shortName}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Animated Underline Indicator */}
                    <div
                        className="absolute bottom-0 h-0.5 bg-accent-orange transition-all duration-300 ease-out"
                        style={{
                            left: indicatorStyle.left,
                            width: indicatorStyle.width,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
