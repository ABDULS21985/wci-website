"use client";

import Image from "next/image";
import {
    ShieldCheck,
    Building2,
    Users,
    CheckCircle,
    Briefcase,
    Star,
    Clock,
} from "lucide-react";

const stats = [
    {
        value: "50+",
        label: "Enterprise Clients",
        icon: Building2,
    },
    {
        value: "99%",
        label: "Client Satisfaction",
        icon: Star,
    },
    {
        value: "200+",
        label: "Projects Delivered",
        icon: CheckCircle,
    },
    {
        value: "10+",
        label: "Years Experience",
        icon: Clock,
    },
];

const certifications = [
    "ISO 27001",
    "ISO 42001",
    "QFC Licensed",
    "QCB Compliant",
    "NIST Framework",
];

interface ClientLogo {
    name: string;
    shortName: string;
    logo?: string;
    industry: string;
}

const clientLogos: ClientLogo[] = [
    {
        name: "Microsoft",
        shortName: "Microsoft",
        logo: "/partners/microsoft.webp",
        industry: "Technology Partner",
    },
    {
        name: "Google Cloud",
        shortName: "Google",
        logo: "/partners/google.webp",
        industry: "Cloud Partner",
    },
    {
        name: "NITDA Nigeria",
        shortName: "NITDA",
        logo: "/partners/NITDA.png",
        industry: "Government Agency",
    },
    {
        name: "NDIC Nigeria",
        shortName: "NDIC",
        logo: "/partners/ndic.png",
        industry: "Financial Regulator",
    },
    {
        name: "Lanasoft",
        shortName: "Lanasoft",
        logo: "/partners/Lanasoft.png",
        industry: "Technology Partner",
    },
    {
        name: "Qorebox",
        shortName: "Qorebox",
        logo: "/partners/qorebox.png",
        industry: "Enterprise Solutions",
    },
];

const clientTypes = [
    "Central Banks",
    "Financial Regulators",
    "Government Entities",
    "Enterprise Organizations",
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
                            TRUSTED BY INDUSTRY LEADERS
                        </h2>
                        <div className="w-12 h-0.5 bg-accent-orange"></div>
                    </div>
                </div>

                {/* Client Logo Grid */}
                <div className="mb-16 animate-fade-in-up delay-100">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
                        {clientLogos.map((client, index) => (
                            <div
                                key={index}
                                className="group flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-neutral-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="relative w-full h-12 flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                                    {client.logo ? (
                                        <Image
                                            src={client.logo}
                                            alt={client.name}
                                            width={100}
                                            height={48}
                                            className="h-10 w-auto object-contain"
                                        />
                                    ) : (
                                        <span className="text-lg font-bold text-neutral-700">
                                            {client.shortName}
                                        </span>
                                    )}
                                </div>
                                <span className="mt-3 text-[10px] font-medium text-neutral-500 tracking-wide text-center">
                                    {client.industry}
                                </span>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-sm text-neutral-500 mt-6">
                        Trusted by government agencies, financial institutions, and enterprises worldwide
                    </p>
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
                            Certifications & Compliance
                        </h4>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {certifications.map((cert, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-neutral-700 border border-neutral-200 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300"
                            >
                                <ShieldCheck className="inline-block h-4 w-4 text-primary mr-1.5 -mt-0.5" />
                                {cert}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Client Types */}
                <div className="text-center animate-fade-in-up delay-500">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Users className="h-6 w-6 text-primary" />
                        <h4 className="text-lg font-semibold text-neutral-900">
                            Industries We Serve
                        </h4>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {clientTypes.map((type, index) => (
                            <span
                                key={index}
                                className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-sm font-medium text-primary hover:bg-primary/10 transition-all duration-300"
                            >
                                <Briefcase className="h-4 w-4" />
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
