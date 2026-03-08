"use client";

import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    MessageCircle,
    Calendar,
    ArrowRight,
    Clock,
} from "lucide-react";
import { easings, staggers } from "@/lib/motion-config";

// ============================================================================
// Types
// ============================================================================

interface ContactMethod {
    id: string;
    icon: React.ElementType;
    title: string;
    description: string;
    action: string;
    href: string;
    isExternal?: boolean;
    color: string;
    bgColor: string;
    hoverBgColor: string;
    badge?: string;
}

// ============================================================================
// Contact Methods Data
// ============================================================================

const contactMethods: ContactMethod[] = [
    {
        id: "email",
        icon: Mail,
        title: "Email Us",
        description: "Send us a detailed message and we'll respond within 2 business hours",
        action: "connect@globaldigibit.com",
        href: "mailto:connect@globaldigibit.com",
        color: "text-primary",
        bgColor: "bg-primary/10",
        hoverBgColor: "group-hover:bg-primary",
        badge: "Most Popular",
    },
    {
        id: "phone",
        icon: Phone,
        title: "Call Us",
        description: "Speak directly with our team for urgent inquiries",
        action: "+234 816 177 8448",
        href: "tel:+2348161778448",
        color: "text-secondary",
        bgColor: "bg-secondary/10",
        hoverBgColor: "group-hover:bg-secondary",
    },
    {
        id: "whatsapp",
        icon: MessageCircle,
        title: "WhatsApp",
        description: "Quick chat support for instant responses",
        action: "Start a conversation",
        href: "https://wa.me/2348161778448",
        isExternal: true,
        color: "text-[#25D366]",
        bgColor: "bg-[#25D366]/10",
        hoverBgColor: "group-hover:bg-[#25D366]",
        badge: "Fastest",
    },
    {
        id: "schedule",
        icon: Calendar,
        title: "Schedule a Call",
        description: "Book a 30-minute consultation with our experts",
        action: "Pick a time",
        href: "https://calendly.com/globaldigibit",
        isExternal: true,
        color: "text-accent-orange",
        bgColor: "bg-accent-orange/10",
        hoverBgColor: "group-hover:bg-accent-orange",
    },
];

// ============================================================================
// Contact Method Card Component
// ============================================================================

interface ContactMethodCardProps {
    method: ContactMethod;
    index: number;
}

function ContactMethodCard({ method, index }: ContactMethodCardProps) {
    const Icon = method.icon;

    return (
        <motion.a
            href={method.href}
            target={method.isExternal ? "_blank" : undefined}
            rel={method.isExternal ? "noopener noreferrer" : undefined}
            className="group relative bg-white rounded-2xl border border-neutral-200 p-6 transition-all duration-300 hover:border-neutral-300 hover:shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: index * staggers.normal,
                ease: easings.outExpo,
            }}
            whileHover={{ y: -4 }}
        >
            {/* Badge */}
            {method.badge && (
                <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary-yellow/20 text-secondary-yellow-dark">
                        {method.badge}
                    </span>
                </div>
            )}

            {/* Icon */}
            <div
                className={`
                    w-14 h-14 rounded-2xl ${method.bgColor} ${method.hoverBgColor}
                    flex items-center justify-center mb-5
                    transition-all duration-300
                    group-hover:scale-110 group-hover:shadow-lg
                `}
            >
                <Icon
                    className={`h-7 w-7 ${method.color} group-hover:text-white transition-colors duration-300`}
                />
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                {method.title}
            </h3>
            <p className="text-sm text-neutral-500 mb-4 leading-relaxed">
                {method.description}
            </p>

            {/* Action */}
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-900">
                    {method.action}
                </span>
                <motion.div
                    className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-primary transition-colors"
                    whileHover={{ x: 4 }}
                >
                    <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-white transition-colors" />
                </motion.div>
            </div>

            {/* Hover gradient overlay */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 80% 20%, rgba(30, 77, 183, 0.05), transparent 50%)",
                }}
            />
        </motion.a>
    );
}

// ============================================================================
// Main Contact Methods Component
// ============================================================================

export function ContactMethods() {
    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: easings.outExpo }}
                >
                    <span className="text-xs font-bold tracking-wider text-primary uppercase mb-2 block">
                        Reach Out
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                        Choose Your Preferred{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-orange">
                            Contact Method
                        </span>
                    </h2>
                    <p className="text-neutral-500 max-w-2xl mx-auto">
                        We&apos;re available through multiple channels to ensure you can reach us
                        in the way that&apos;s most convenient for you.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {contactMethods.map((method, index) => (
                        <ContactMethodCard key={method.id} method={method} index={index} />
                    ))}
                </div>

                {/* Response Time Note */}
                <motion.div
                    className="flex items-center justify-center gap-2 mt-10 text-sm text-neutral-500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <Clock className="h-4 w-4" />
                    <span>Average response time: 2 hours during business hours (9 AM - 6 PM)</span>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================================================
// Alternative: Compact Contact Strip Component
// ============================================================================

export function ContactStrip() {
    return (
        <section className="border-t border-neutral-200 bg-neutral-50">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-4">
                        {contactMethods.map((method, index) => {
                            const Icon = method.icon;
                            return (
                                <motion.a
                                    key={method.id}
                                    href={method.href}
                                    target={method.isExternal ? "_blank" : undefined}
                                    rel={method.isExternal ? "noopener noreferrer" : undefined}
                                    className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.1,
                                        ease: easings.outExpo,
                                    }}
                                >
                                    <div
                                        className={`
                                            w-10 h-10 rounded-xl ${method.bgColor}
                                            flex items-center justify-center
                                            group-hover:scale-110 transition-transform duration-300
                                        `}
                                    >
                                        <Icon className={`h-5 w-5 ${method.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-neutral-500">{method.title}</p>
                                        <p className="font-semibold text-neutral-900 text-sm truncate">
                                            {method.action}
                                        </p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-neutral-300 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                                </motion.a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
