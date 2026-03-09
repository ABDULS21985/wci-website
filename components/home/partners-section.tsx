"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Heart, BookOpen, Globe, HandHeart, Landmark, GraduationCap, LucideIcon } from "lucide-react";

interface PartnerType {
    name: string;
    icon: LucideIcon;
    color: string;
    bgColor: string;
}

const partnerTypes: PartnerType[] = [
    { name: "Diaspora Associations", icon: Globe, color: "#0D7377", bgColor: "rgba(13, 115, 119, 0.08)" },
    { name: "Mental Health Professionals", icon: Heart, color: "#C2185B", bgColor: "rgba(194, 24, 91, 0.08)" },
    { name: "Women's NGOs", icon: Users, color: "#E8A317", bgColor: "rgba(232, 163, 23, 0.08)" },
    { name: "CSR Partners", icon: HandHeart, color: "#095456", bgColor: "rgba(9, 84, 86, 0.08)" },
    { name: "Training Institutions", icon: BookOpen, color: "#F59A23", bgColor: "rgba(245, 154, 35, 0.08)" },
    { name: "Government Bodies", icon: Landmark, color: "#0D7377", bgColor: "rgba(13, 115, 119, 0.08)" },
    { name: "Academic Partners", icon: GraduationCap, color: "#C2185B", bgColor: "rgba(194, 24, 91, 0.08)" },
];

function PartnerBadge({ partner }: { partner: PartnerType }) {
    const Icon = partner.icon;
    return (
        <div
            className="group flex items-center gap-3 px-6 py-3.5 rounded-full border border-neutral-200/80 bg-white shadow-sm transition-all duration-400 hover:shadow-md hover:border-neutral-300 hover:scale-[1.03] cursor-default flex-shrink-0"
        >
            <div
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-sm"
                style={{ backgroundColor: partner.bgColor }}
            >
                <Icon
                    className="w-4.5 h-4.5 transition-colors duration-300"
                    style={{ color: partner.color }}
                    strokeWidth={2}
                />
            </div>
            <span className="text-sm font-semibold text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300 whitespace-nowrap">
                {partner.name}
            </span>
        </div>
    );
}

export function PartnersSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Double the partners for seamless loop
    const marqueePartners = [...partnerTypes, ...partnerTypes];

    return (
        <section
            ref={sectionRef}
            className="w-full py-14 md:py-20 bg-gradient-to-b from-white via-neutral-50/50 to-white relative overflow-hidden"
        >
            {/* Subtle top/bottom border gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

            {/* Fade edges for marquee */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-8">
                <div
                    className={`text-center transition-all duration-700 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                    <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
                        OUR ECOSYSTEM
                    </span>
                    <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
                        Working alongside trusted partners across the diaspora ecosystem
                    </p>
                </div>
            </div>

            {/* Infinite Marquee */}
            <div
                className={`relative transition-all duration-1000 ${
                    isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "300ms" }}
            >
                <div
                    className="flex gap-4 md:gap-6 animate-marquee"
                    style={{
                        width: "max-content",
                    }}
                >
                    {marqueePartners.map((partner, index) => (
                        <PartnerBadge key={`${partner.name}-${index}`} partner={partner} />
                    ))}
                </div>
            </div>
        </section>
    );
}
