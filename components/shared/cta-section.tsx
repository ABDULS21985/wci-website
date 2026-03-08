"use client";

import Link from "next/link";
import {
    ArrowRight,
    MessageCircle,
    Calendar,
    Mail,
    Phone,
    FileText,
    Download,
    Send,
} from "lucide-react";
import { Button } from "@/components/ui/shared/components";

interface CTASectionProps {
    title?: string;
    accentTitle?: string;
    description?: string;
    primaryCTA?: {
        label: string;
        href: string;
    };
    secondaryCTA?: {
        label: string;
        href: string;
    };
    showContactOptions?: boolean;
    showThreeColumnLayout?: boolean;
}

const resources = [
    {
        title: "Product Brochure",
        description: "Overview of our solutions",
        icon: FileText,
    },
    {
        title: "Case Studies",
        description: "Success stories from clients",
        icon: FileText,
    },
    {
        title: "Technical Specs",
        description: "Detailed specifications",
        icon: Download,
    },
];

export function CTASection({
    title = "Ready to Transform",
    accentTitle = "Your Business?",
    description = "Schedule a consultation with our experts to discuss how our products and services can accelerate your digital transformation journey.",
    primaryCTA = {
        label: "Schedule Consultation",
        href: "/contact",
    },
    secondaryCTA = {
        label: "View All Services",
        href: "/services",
    },
    showContactOptions = true,
    showThreeColumnLayout = false,
}: CTASectionProps) {
    if (showThreeColumnLayout) {
        return (
            <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary to-secondary">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in-up">
                            {title}{" "}
                            <span className="text-accent-orange">{accentTitle}</span>
                        </h2>
                        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto animate-fade-in-up delay-100">
                            {description}
                        </p>
                    </div>

                    {/* Three Column Layout */}
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                        {/* Column 1: Contact Form Preview */}
                        <div
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-fade-in-up"
                            style={{ animationDelay: "100ms" }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-accent-orange/20 flex items-center justify-center">
                                    <Send className="h-5 w-5 text-accent-orange" />
                                </div>
                                <h3 className="text-lg font-semibold text-white">
                                    Quick Contact
                                </h3>
                            </div>

                            <div className="space-y-3 mb-4">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:border-accent-orange transition-colors"
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:border-accent-orange transition-colors"
                                />
                                <textarea
                                    placeholder="Your Message"
                                    rows={2}
                                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:border-accent-orange transition-colors resize-none"
                                />
                            </div>

                            <Button
                                asChild
                                className="w-full bg-accent-orange hover:bg-accent-red text-white rounded-lg"
                            >
                                <Link href="/contact">
                                    Send Message
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        {/* Column 2: Consultation Booking */}
                        <div
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-fade-in-up"
                            style={{ animationDelay: "200ms" }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-accent-orange/20 flex items-center justify-center">
                                    <Calendar className="h-5 w-5 text-accent-orange" />
                                </div>
                                <h3 className="text-lg font-semibold text-white">
                                    Book a Meeting
                                </h3>
                            </div>

                            <p className="text-white/70 text-sm mb-6">
                                Schedule a free 30-minute consultation with our experts to discuss your requirements.
                            </p>

                            <Button
                                asChild
                                className="w-full bg-white text-primary hover:bg-neutral-100 rounded-lg mb-4"
                            >
                                <Link href="/contact?booking=true">
                                    Schedule Consultation
                                    <Calendar className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>

                            {/* Contact Options */}
                            <div className="space-y-3 pt-4 border-t border-white/20">
                                <a
                                    href="https://wa.me/97477953122"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors text-sm"
                                >
                                    <MessageCircle className="h-4 w-4 text-green-400" />
                                    <span>+974 7795 3122</span>
                                </a>
                                <a
                                    href="mailto:connect@globaldigibit.com"
                                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors text-sm"
                                >
                                    <Mail className="h-4 w-4 text-accent-orange" />
                                    <span>connect@globaldigibit.com</span>
                                </a>
                                <a
                                    href="tel:+97477953122"
                                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors text-sm"
                                >
                                    <Phone className="h-4 w-4 text-blue-400" />
                                    <span>Call Us Directly</span>
                                </a>
                            </div>
                        </div>

                        {/* Column 3: Resource Downloads */}
                        <div
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-fade-in-up"
                            style={{ animationDelay: "300ms" }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-accent-orange/20 flex items-center justify-center">
                                    <Download className="h-5 w-5 text-accent-orange" />
                                </div>
                                <h3 className="text-lg font-semibold text-white">
                                    Resources
                                </h3>
                            </div>

                            <p className="text-white/70 text-sm mb-4">
                                Download our resources to learn more about our solutions.
                            </p>

                            <div className="space-y-3">
                                {resources.map((resource, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
                                    >
                                        <resource.icon className="h-5 w-5 text-accent-orange" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-white group-hover:text-accent-orange transition-colors">
                                                {resource.title}
                                            </p>
                                            <p className="text-xs text-white/60">
                                                {resource.description}
                                            </p>
                                        </div>
                                        <Download className="h-4 w-4 text-white/40 group-hover:text-accent-orange transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Original single-column CTA layout
    return (
        <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary to-secondary">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in-up">
                        {title}{" "}
                        <span className="text-accent-orange">{accentTitle}</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/80 mb-10 animate-fade-in-up delay-100">
                        {description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up delay-200">
                        <Button
                            asChild
                            size="lg"
                            className="bg-accent-orange hover:bg-accent-red text-white rounded-full px-8 h-12 text-base font-semibold transition-all duration-300 hover:scale-105"
                        >
                            <Link href={primaryCTA.href}>
                                {primaryCTA.label}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="border-2 border-white text-white hover:bg-white hover:text-primary rounded-full px-8 h-12 text-base font-semibold transition-all duration-300"
                        >
                            <Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
                        </Button>
                    </div>

                    {showContactOptions && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in-up delay-300">
                            <a
                                href="https://wa.me/97477953122"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 text-white/80 hover:text-white transition-colors"
                            >
                                <MessageCircle className="h-5 w-5" />
                                <span>+974 7795 3122</span>
                            </a>
                            <a
                                href="mailto:connect@globaldigibit.com"
                                className="flex items-center justify-center gap-3 text-white/80 hover:text-white transition-colors"
                            >
                                <Mail className="h-5 w-5" />
                                <span>connect@globaldigibit.com</span>
                            </a>
                            <Link
                                href="/contact"
                                className="flex items-center justify-center gap-3 text-white/80 hover:text-white transition-colors"
                            >
                                <Calendar className="h-5 w-5" />
                                <span>Book a Meeting</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
