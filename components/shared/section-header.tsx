"use client";

interface SectionHeaderProps {
    label: string;
    title: string;
    accentTitle?: string;
    description?: string;
    centered?: boolean;
}

export function SectionHeader({
    label,
    title,
    accentTitle,
    description,
    centered = false,
}: SectionHeaderProps) {
    return (
        <div className={centered ? "text-center" : ""}>
            <div
                className={`flex items-center gap-3 mb-6 animate-fade-in-up ${centered ? "justify-center" : ""}`}
            >
                <div className="w-12 h-0.5 bg-accent-orange"></div>
                <h2 className="text-xs md:text-sm font-bold tracking-wider text-gray-600 uppercase">
                    {label}
                </h2>
                {centered && <div className="w-12 h-0.5 bg-accent-orange"></div>}
            </div>

            <div className="space-y-2 mb-8 md:mb-12 animate-fade-in-up delay-100">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e3a8a] leading-tight">
                    {title}
                </h3>
                {accentTitle && (
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-orange leading-tight">
                        {accentTitle}
                    </h3>
                )}
            </div>

            {description && (
                <p className="text-lg text-neutral-600 max-w-3xl animate-fade-in-up delay-200 mb-8 md:mb-12">
                    {description}
                </p>
            )}
        </div>
    );
}
