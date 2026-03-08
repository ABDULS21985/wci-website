"use client";

import { useEffect, useState, useRef } from "react";
import {
    Layers,
    Globe,
    Sparkles,
    BarChart3,
} from "lucide-react";

const features = [
    {
        icon: Layers,
        title: "Holistic Approach",
        description: "We integrate psychosocial resilience, economic empowerment, and leadership development into one coherent pathway. No fragmented interventions - just connected, lasting impact.",
        proof: "4 integrated program pillars working together",
        delay: 0,
    },
    {
        icon: Globe,
        title: "Diaspora-Focused",
        description: "Built by and for African women in the diaspora. We understand the unique challenges of migration, isolation, and cross-border caregiving because we've lived them.",
        proof: "Founded by diaspora women with 9+ years in psychosocial practice",
        delay: 100,
    },
    {
        icon: Sparkles,
        title: "Technology-Enabled",
        description: "Our AI-powered platform scales empowerment across borders with guided wellbeing check-ins, mentor matching, and structured learning - without replacing the human connection.",
        proof: "4 AI-enabled platform modules for cross-border delivery",
        delay: 200,
    },
    {
        icon: BarChart3,
        title: "Measurable Impact",
        description: "Every contribution is tracked, every project is verified, and every outcome is measured. Our transparency dashboard ensures accountability at every step.",
        proof: "Real-time impact tracking and milestone reporting",
        delay: 300,
    },
];

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
            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div
                    className={`mb-16 text-center max-w-4xl mx-auto transition-all duration-700 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                >
                    <span
                        className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
                        style={{ color: "#0D7377" }}
                    >
                        WHY WCI
                    </span>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        What Makes Us Different
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-700 ${
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-[30px]"
                            }`}
                            style={{ transitionDelay: `${feature.delay}ms` }}
                        >
                            <div className="group relative h-full">
                                <div
                                    className="relative h-full p-6 md:p-8 bg-white rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                                    style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}
                                >
                                    <div
                                        className="absolute left-0 top-0 bottom-0 w-1 origin-top transition-transform duration-500 group-hover:scale-y-100"
                                        style={{ backgroundColor: "#0D7377", transform: "scaleY(0.3)" }}
                                    />

                                    <div className="flex gap-4 md:gap-6">
                                        <div
                                            className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: "rgba(13, 115, 119, 0.1)" }}
                                        >
                                            <feature.icon
                                                className="w-6 h-6 md:w-7 md:h-7"
                                                style={{ color: "#0D7377" }}
                                                strokeWidth={1.5}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3">
                                                {feature.description}
                                            </p>
                                            <div
                                                className="inline-flex items-center text-sm font-semibold"
                                                style={{ color: "#0D7377" }}
                                            >
                                                <span className="mr-2">&rarr;</span>
                                                {feature.proof}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
