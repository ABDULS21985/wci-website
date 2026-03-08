"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Headphones, Award, Quote, Star, CheckCircle } from "lucide-react";

const testimonials = [
    {
        quote:
            "Global Digibit's expertise in blockchain solutions transformed our credential verification process. Their response time and technical depth are exceptional.",
        author: "Dr. Amina Ibrahim",
        role: "Chief Technology Officer",
        company: "West African Development Bank",
        rating: 5,
        avatar: "AI",
    },
    {
        quote:
            "From the first contact to implementation, their team demonstrated exceptional professionalism and delivered beyond our expectations.",
        author: "Mohammed Al-Rashid",
        role: "Director of Digital Transformation",
        company: "Qatar Finance Authority",
        rating: 5,
        avatar: "MA",
    },
];

const certifications = [
    {
        icon: Shield,
        title: "ISO 27001",
        subtitle: "Information Security",
    },
    {
        icon: Lock,
        title: "GDPR",
        subtitle: "Data Protection",
    },
    {
        icon: Award,
        title: "SOC 2 Type II",
        subtitle: "Security Controls",
    },
];

const commitments = [
    { label: "Same-day response for urgent inquiries", icon: CheckCircle },
    { label: "Dedicated account manager assigned", icon: CheckCircle },
    { label: "NDA available upon request", icon: CheckCircle },
    { label: "Free initial consultation", icon: CheckCircle },
];

export function TrustIndicators() {
    return (
        <div className="space-y-8">
            {/* Testimonial Card */}
            <motion.div
                className="relative bg-secondary rounded-2xl p-6 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />

                <div className="relative">
                    <Quote className="h-8 w-8 text-primary/40 mb-4" />
                    <p className="text-white/80 text-sm leading-relaxed mb-6">
                        &quot;{testimonials[0].quote}&quot;
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-semibold">
                            {testimonials[0].avatar}
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-medium text-sm">
                                {testimonials[0].author}
                            </p>
                            <p className="text-white/50 text-xs">
                                {testimonials[0].role}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-0.5 mt-4 pt-4 border-t border-white/10">
                        {[...Array(testimonials[0].rating)].map((_, i) => (
                            <Star
                                key={i}
                                className="h-4 w-4 text-secondary-yellow fill-secondary-yellow"
                            />
                        ))}
                        <span className="ml-2 text-xs text-white/50">5.0 Rating</span>
                    </div>
                </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            >
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                    Certifications
                </h4>
                <div className="grid grid-cols-3 gap-3">
                    {certifications.map((cert) => (
                        <div
                            key={cert.title}
                            className="group bg-neutral-50 hover:bg-white rounded-xl p-4 text-center transition-all duration-300 hover:shadow-lg border border-transparent hover:border-neutral-200"
                        >
                            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-white group-hover:bg-primary/5 flex items-center justify-center transition-colors">
                                <cert.icon className="h-5 w-5 text-primary" />
                            </div>
                            <p className="text-xs font-semibold text-neutral-900">
                                {cert.title}
                            </p>
                            <p className="text-[10px] text-neutral-500 mt-0.5">
                                {cert.subtitle}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Our Commitment */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            >
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                    Our Commitment
                </h4>
                <div className="space-y-3">
                    {commitments.map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center gap-3 text-sm text-neutral-600"
                        >
                            <item.icon className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Support Badge */}
            <motion.div
                className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Headphones className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="font-semibold">Priority Support</p>
                        <p className="text-xs text-white/70">For enterprise clients</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                    <div>
                        <div className="text-2xl font-bold">24/7</div>
                        <div className="text-xs text-white/70">Availability</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">&lt;2h</div>
                        <div className="text-xs text-white/70">Response Time</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
