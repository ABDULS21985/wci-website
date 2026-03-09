"use client";

import {
    ShieldCheck,
    Heart,
    Users,
    CheckCircle,
    Globe,
    Star,
    Award,
} from "lucide-react";

const stats = [
    {
        value: "500+",
        label: "Women Empowered",
        icon: Heart,
    },
    {
        value: "98%",
        label: "Positive Life Change",
        icon: Star,
    },
    {
        value: "15+",
        label: "Countries Reached",
        icon: Globe,
    },
    {
        value: "50+",
        label: "Mentors & Facilitators",
        icon: Users,
    },
];

const certifications = [
    "Registered NGO",
    "C.R. No: 237930",
    "Evidence-Based Programs",
    "Ethical AI Practices",
    "Data Privacy Compliant",
];

const communityTypes = [
    "Diaspora Women",
    "Mental Health Professionals",
    "NGO Partners",
    "Corporate Sponsors",
];

export function TrustIndicators() {
    return (
        <section className="w-full py-16 md:py-24 bg-neutral-50">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in-up">
                        <div className="w-12 h-0.5 bg-accent-orange"></div>
                        <h2 className="text-xs md:text-sm font-bold tracking-wider text-gray-600 uppercase">
                            TRUSTED BY OUR COMMUNITY
                        </h2>
                        <div className="w-12 h-0.5 bg-accent-orange"></div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center animate-fade-in-up bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                                <stat.icon className="h-7 w-7 text-primary" />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-neutral-600">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Certifications */}
                <div className="text-center mb-12 animate-fade-in-up delay-300">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                        <h4 className="text-lg font-semibold text-neutral-900">
                            Credentials & Standards
                        </h4>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {certifications.map((cert, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-neutral-700 border border-neutral-200 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300"
                            >
                                <CheckCircle className="inline-block h-4 w-4 text-primary mr-1.5 -mt-0.5" />
                                {cert}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Community Types */}
                <div className="text-center animate-fade-in-up delay-500">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Users className="h-6 w-6 text-primary" />
                        <h4 className="text-lg font-semibold text-neutral-900">
                            Our Community
                        </h4>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {communityTypes.map((type, index) => (
                            <span
                                key={index}
                                className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-sm font-medium text-primary hover:bg-primary/10 transition-all duration-300"
                            >
                                <Award className="h-4 w-4" />
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
