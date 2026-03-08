"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Heart, BookOpen, Globe, HandHeart } from "lucide-react";

const partnerTypes = [
    { name: "Diaspora Associations", icon: Globe },
    { name: "Mental Health Professionals", icon: Heart },
    { name: "Women's NGOs", icon: Users },
    { name: "CSR Partners", icon: HandHeart },
    { name: "Training Institutions", icon: BookOpen },
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
            className="w-full py-16 bg-[#F8FAFC] border-y border-gray-100"
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <p
                    className={`text-center text-sm font-medium text-gray-500 mb-8 transition-all duration-700 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                    Working alongside trusted partners across the diaspora ecosystem
                </p>

                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    {partnerTypes.map((partner, index) => {
                        const Icon = partner.icon;
                        return (
                            <div
                                key={partner.name}
                                className={`flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-gray-200 shadow-sm transition-all duration-500 hover:shadow-md hover:border-[#0D7377]/30 ${
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                }`}
                                style={{ transitionDelay: `${index * 80}ms` }}
                            >
                                <Icon className="w-5 h-5 text-[#0D7377]" strokeWidth={1.5} />
                                <span className="text-sm font-medium text-gray-700">{partner.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
