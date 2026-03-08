"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Shield, Award, CheckCircle, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/shared/components";

interface ServiceHeroGlobalProps {
    stats?: {
        serviceTowers: number;
        services: number;
        industries: number;
        certifications: number;
    };
}

const defaultStats = {
    serviceTowers: 22,
    services: 100,
    industries: 5,
    certifications: 50,
};

const certificationBadges = [
    { name: "ISO 27001", description: "Information Security" },
    { name: "NIST CSF", description: "Cybersecurity Framework" },
    { name: "SOC 2", description: "Service Organization Control" },
    { name: "TOGAF", description: "Enterprise Architecture" },
];

function AnimatedCounter({
    end,
    duration = 2000,
    suffix = "",
    prefix = "",
}: {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
}) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, end, duration]);

    return (
        <div ref={ref} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {prefix}
            {count}
            {suffix}
        </div>
    );
}

export function ServiceHeroGlobal({ stats = defaultStats }: ServiceHeroGlobalProps) {
    const handleScrollToServices = () => {
        const servicesSection = document.getElementById("services-content");
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative w-full min-h-[90vh] bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden flex items-center">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Dot Pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
                {/* Animated Gradient Orbs */}
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/40 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-accent-orange/10 rounded-full blur-3xl animate-pulse delay-500" />
                {/* Geometric Lines */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-5"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern
                            id="grid-pattern"
                            width="60"
                            height="60"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 60 0 L 0 0 0 60"
                                fill="none"
                                stroke="white"
                                strokeWidth="1"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Trust Badge */}
                    <div className="flex justify-center mb-8 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium">
                            <span className="flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Enterprise-Grade Consulting Services
                        </div>
                    </div>

                    {/* Main Heading */}
                    <div className="text-center mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
                            Global Consulting &{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-secondary-yellow">
                                Technology Services
                            </span>
                        </h1>
                    </div>

                    {/* Subheading with Stats Preview */}
                    <div
                        className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-center mb-8 animate-fade-in-up"
                        style={{ animationDelay: "200ms" }}
                    >
                        <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold text-sm md:text-base">
                            22 Service Towers
                        </span>
                        <span className="text-white/40">|</span>
                        <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold text-sm md:text-base">
                            100+ Specialized Services
                        </span>
                        <span className="text-white/40">|</span>
                        <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold text-sm md:text-base">
                            5 Industry Practices
                        </span>
                    </div>

                    {/* Description */}
                    <p
                        className="text-lg md:text-xl text-white/80 text-center max-w-3xl mx-auto mb-12 animate-fade-in-up"
                        style={{ animationDelay: "300ms" }}
                    >
                        Digibit combines <span className="text-white font-semibold">strategy-led transformation</span>,{" "}
                        <span className="text-accent-orange font-semibold">technology delivery excellence</span>, and{" "}
                        <span className="text-white font-semibold">deep risk & cyber expertise</span> to help enterprises
                        navigate the complexities of digital transformation with confidence.
                    </p>

                    {/* Animated Stats Section */}
                    <div
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 animate-fade-in-up"
                        style={{ animationDelay: "400ms" }}
                    >
                        <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                            <AnimatedCounter end={stats.serviceTowers} />
                            <div className="text-sm md:text-base text-white/60 mt-2">Service Towers</div>
                        </div>
                        <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                            <AnimatedCounter end={stats.services} suffix="+" />
                            <div className="text-sm md:text-base text-white/60 mt-2">Services</div>
                        </div>
                        <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                            <AnimatedCounter end={stats.industries} />
                            <div className="text-sm md:text-base text-white/60 mt-2">Industries</div>
                        </div>
                        <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                            <AnimatedCounter end={stats.certifications} suffix="+" />
                            <div className="text-sm md:text-base text-white/60 mt-2">Certifications</div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up"
                        style={{ animationDelay: "500ms" }}
                    >
                        <Button
                            onClick={handleScrollToServices}
                            size="lg"
                            className="bg-accent-orange hover:bg-accent-red text-white rounded-full px-8 h-12 text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-accent-orange/25"
                        >
                            Explore Services
                            <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
                        </Button>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary rounded-full px-8 h-12 text-base font-semibold transition-all duration-300"
                        >
                            Contact Us
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>

                    {/* Trust Badges / Certifications */}
                    <div
                        className="animate-fade-in-up"
                        style={{ animationDelay: "600ms" }}
                    >
                        <div className="text-center mb-4">
                            <span className="text-xs md:text-sm font-medium text-white/60 uppercase tracking-wider">
                                Certified & Compliant
                            </span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                            {certificationBadges.map((cert, index) => (
                                <div
                                    key={cert.name}
                                    className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-default"
                                    style={{ animationDelay: `${600 + index * 100}ms` }}
                                >
                                    <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-accent-orange/20 transition-colors">
                                        {index === 0 && <Shield className="h-4 w-4 text-white/80" />}
                                        {index === 1 && <CheckCircle className="h-4 w-4 text-white/80" />}
                                        {index === 2 && <Award className="h-4 w-4 text-white/80" />}
                                        {index === 3 && <BadgeCheck className="h-4 w-4 text-white/80" />}
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-semibold text-white">{cert.name}</div>
                                        <div className="text-xs text-white/50 hidden sm:block">{cert.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        fill="white"
                    />
                </svg>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/60 animate-bounce">
                <span className="text-xs uppercase tracking-wider">Scroll</span>
                <ChevronDown className="h-4 w-4" />
            </div>
        </section>
    );
}
