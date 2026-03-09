"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Heart, BookOpen, Globe, HandHeart, LucideIcon } from "lucide-react";

interface PartnerType {
    name: string;
    icon: LucideIcon;
    color: string;
}

const partnerTypes: PartnerType[] = [
    { name: "Diaspora Associations", icon: Globe, color: "#0D7377" },
    { name: "Mental Health Professionals", icon: Heart, color: "#C2185B" },
    { name: "Women's NGOs", icon: Users, color: "#E8A317" },
    { name: "CSR Partners", icon: HandHeart, color: "#095456" },
    { name: "Training Institutions", icon: BookOpen, color: "#F59A23" },
];

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

    return (
        <section
            ref={sectionRef}
            className="w-full py-12 md:py-16 bg-white relative overflow-hidden"
        >
            {/* Subtle top/bottom border gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <p
                    className={`text-center text-sm font-medium text-neutral-gray mb-8 tracking-wide transition-all duration-700 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                    Working alongside trusted partners across the diaspora ecosystem
                </p>

                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {partnerTypes.map((partner, index) => {
                        const Icon = partner.icon;
                        return (
                            <div
                                key={partner.name}
                                className={`group flex items-center gap-3 px-5 py-3 rounded-full bg-neutral-50 border border-neutral-200 transition-all duration-500 hover:shadow-lg hover:scale-[1.03] cursor-default ${
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                }`}
                                style={{
                                    transitionDelay: `${index * 100}ms`,
                                }}
                            >
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: `${partner.color}15` }}
                                >
                                    <Icon
                                        className="w-4 h-4 transition-colors duration-300"
                                        style={{ color: partner.color }}
                                        strokeWidth={2}
                                    />
                                </div>
                                <span className="text-sm font-semibold text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300">
                                    {partner.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
