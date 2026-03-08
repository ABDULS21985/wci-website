"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const partners = [
    { name: "Lanasoft", logo: "/partners/Lanasoft.png" },
    { name: "NITDA", logo: "/partners/NITDA.png" },
    { name: "Google", logo: "/partners/google.webp" },
    { name: "Microsoft", logo: "/partners/microsoft.webp" },
    { name: "Qorebox", logo: "/partners/qorebox.png" },
];

export function PartnersSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
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

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Duplicate partners array for seamless loop (4x for smooth infinite scroll)
    const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-12 md:py-16 overflow-hidden bg-[#F8FAFC]"
        >
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top decorative line */}
                <div
                    className={`absolute top-0 left-1/2 -translate-x-1/2 h-px bg-slate-200 transition-transform duration-800 ease-out ${
                        isVisible ? "w-full scale-x-100" : "w-full scale-x-0"
                    }`}
                    style={{ transformOrigin: "center" }}
                    aria-hidden="true"
                />

                {/* Section Header */}
                <div
                    className={`text-center mb-10 transition-all duration-500 ease-out ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-[15px]"
                    }`}
                >
                    <span
                        className="block text-[14px] uppercase tracking-[0.08em] text-[#64748B] font-medium"
                    >
                        Trusted by industry leaders across 50+ countries
                    </span>
                </div>

                {/* Logo Marquee Container */}
                <div
                    className={`relative overflow-hidden transition-all duration-500 ease-out ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Fade edges */}
                    <div
                        className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none"
                        aria-hidden="true"
                    />
                    <div
                        className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none"
                        aria-hidden="true"
                    />

                    {/* Scrolling logos container */}
                    <div
                        className={`flex items-center gap-16 md:gap-20 ${
                            isPaused ? "animate-marquee-paused" : "animate-marquee"
                        }`}
                        style={{
                            width: "fit-content",
                        }}
                    >
                        {duplicatedPartners.map((partner, index) => (
                            <div
                                key={`${partner.name}-${index}`}
                                className="group flex-shrink-0 h-8 md:h-9 relative"
                                style={{ minWidth: "100px" }}
                            >
                                <div className="relative w-auto h-full grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        width={120}
                                        height={36}
                                        className="h-full w-auto object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom decorative line */}
                <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-slate-200 transition-transform duration-800 ease-out ${
                        isVisible ? "w-full scale-x-100" : "w-full scale-x-0"
                    }`}
                    style={{ transformOrigin: "center" }}
                    aria-hidden="true"
                />
            </div>
        </section>
    );
}
