"use client";

import { useEffect, useState, useRef } from "react";
import {
    Layers,
    Globe,
    Sparkles,
    BarChart3,
    LucideIcon,
} from "lucide-react";

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
    proof: string;
    color: string;
    gradient: string;
    delay: number;
}

const features: Feature[] = [
    {
        icon: Layers,
        title: "Holistic Approach",
        description: "We integrate psychosocial resilience, economic empowerment, and leadership development into one coherent pathway. No fragmented interventions — just connected, lasting impact.",
        proof: "4 integrated program pillars working together",
        color: "#0D7377",
        gradient: "linear-gradient(135deg, #0D7377 0%, #14A3A8 100%)",
        delay: 0,
    },
    {
        icon: Globe,
        title: "Diaspora-Focused",
        description: "Built by and for African women in the diaspora. We understand the unique challenges of migration, isolation, and cross-border caregiving because we've lived them.",
        proof: "Founded by diaspora women with 9+ years experience",
        color: "#C2185B",
        gradient: "linear-gradient(135deg, #C2185B 0%, #E91E8C 100%)",
        delay: 100,
    },
    {
        icon: Sparkles,
        title: "Technology-Enabled",
        description: "Our AI-powered platform scales empowerment across borders with guided wellbeing check-ins, mentor matching, and structured learning — without replacing the human connection.",
        proof: "4 AI-enabled platform modules for cross-border delivery",
        color: "#E8A317",
        gradient: "linear-gradient(135deg, #E8A317 0%, #F59A23 100%)",
        delay: 200,
    },
    {
        icon: BarChart3,
        title: "Measurable Impact",
        description: "Every contribution is tracked, every project is verified, and every outcome is measured. Our transparency dashboard ensures accountability at every step.",
        proof: "Real-time impact tracking and milestone reporting",
        color: "#095456",
        gradient: "linear-gradient(135deg, #095456 0%, #0D7377 100%)",
        delay: 300,
    },
];

function FeatureCard({ feature, index, isVisible }: { feature: Feature; index: number; isVisible: boolean }) {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = feature.icon;

    return (
        <div
            className={`transition-all duration-700 ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-[30px]"
            }`}
            style={{ transitionDelay: `${feature.delay}ms` }}
        >
            <div
                className="group relative h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className="relative h-full p-7 md:p-8 bg-white rounded-2xl overflow-hidden transition-all duration-400"
                    style={{
                        boxShadow: isHovered
                            ? `0 20px 40px -12px ${feature.color}20, 0 8px 16px -8px rgba(0,0,0,0.06)`
                            : "0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)",
                        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                        border: `1px solid ${isHovered ? feature.color + '30' : '#E2E8F0'}`,
                    }}
                >
                    {/* Top accent line */}
                    <div
                        className="absolute top-0 left-0 right-0 h-1 origin-left transition-transform duration-500"
                        style={{
                            background: feature.gradient,
                            transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                        }}
                    />

                    {/* Step number */}
                    <div
                        className="absolute top-6 right-6 text-5xl font-black select-none transition-opacity duration-300"
                        style={{ color: isHovered ? `${feature.color}12` : '#f1f5f9' }}
                    >
                        0{index + 1}
                    </div>

                    <div className="relative flex flex-col gap-5">
                        {/* Icon with gradient background */}
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-400 shadow-sm"
                            style={{
                                background: isHovered ? feature.gradient : `${feature.color}10`,
                            }}
                        >
                            <Icon
                                className="w-6 h-6 transition-colors duration-400"
                                style={{ color: isHovered ? "#fff" : feature.color }}
                                strokeWidth={1.8}
                            />
                        </div>

                        <div>
                            <h3
                                className="text-lg md:text-xl font-bold mb-2.5 transition-colors duration-300"
                                style={{ color: isHovered ? feature.color : "#0f172a" }}
                            >
                                {feature.title}
                            </h3>
                            <p className="text-neutral-600 text-sm md:text-[15px] leading-relaxed mb-4">
                                {feature.description}
                            </p>

                            {/* Proof badge */}
                            <div
                                className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300"
                                style={{ color: feature.color }}
                            >
                                <span
                                    className="h-0.5 rounded-full transition-all duration-300"
                                    style={{
                                        backgroundColor: feature.color,
                                        width: isHovered ? "24px" : "16px",
                                    }}
                                />
                                {feature.proof}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function WhyChooseUsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full py-20 md:py-32 relative overflow-hidden"
            style={{ backgroundColor: "#F8FAFC" }}
        >
            {/* Subtle dot pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "radial-gradient(circle, #0D7377 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div
                    className={`mb-16 text-center max-w-4xl mx-auto transition-all duration-700 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                >
                    <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-4 text-primary">
                        <span className="w-8 h-0.5 bg-primary rounded-full" />
                        WHY WCI
                        <span className="w-8 h-0.5 bg-primary rounded-full" />
                    </span>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                        What Makes Us{" "}
                        <span className="bg-gradient-to-r from-primary to-accent-red bg-clip-text text-transparent">
                            Different
                        </span>
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        We combine the heart of grassroots support with the scale of technology to create lasting change.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            feature={feature}
                            index={index}
                            isVisible={isVisible}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
