"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const stats = [
    { value: "50+", label: "Enterprise Clients" },
    { value: "2-4h", label: "Response Time" },
    { value: "99.9%", label: "Client Satisfaction" },
];

export function ContactHero() {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
            {/* Premium Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-secondary" />

            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Gradient Accent - Top Right */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-orange/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />

            {/* Gradient Accent - Bottom Left */}
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 py-20 md:py-32">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Content */}
                    <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                    {/* Overline */}
                    <motion.div
                        className="flex justify-center lg:justify-start mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 motion-safe:animate-ping" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                            </span>
                            <span className="text-sm font-medium text-white/80 tracking-wide">
                                Available for new projects
                            </span>
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        className="text-display text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-center lg:text-left text-white mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                    >
                        Let&apos;s Start a{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange via-secondary-yellow to-accent-yellow">
                            Conversation
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        className="text-lead text-lg md:text-xl text-white/60 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
                    >
                        Whether you&apos;re exploring digital transformation or ready to launch,
                        our team is here to guide your journey.
                    </motion.p>

                    {/* Stats Row */}
                    <motion.div
                        className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12 mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                    >
                        {stats.map((stat, index) => (
                            <div key={stat.label} className="text-center lg:text-left">
                                <motion.div
                                    className="text-3xl md:text-4xl font-bold text-white mb-1"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.4 + index * 0.1,
                                        ease: [0.22, 1, 0.36, 1] as const
                                    }}
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-sm text-white/50 font-medium tracking-wide">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Get in Touch CTA Button */}
                    <motion.div
                        className="flex justify-center lg:justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <a
                            href="#contact-form"
                            className="group relative inline-flex flex-col items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-orange to-secondary-yellow rounded-2xl shadow-lg shadow-accent-orange/30 hover:shadow-xl hover:shadow-accent-orange/40 hover:scale-105 transition-all duration-300"
                        >
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-accent-orange to-secondary-yellow rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />

                            <span className="relative text-sm font-bold tracking-widest uppercase text-white drop-shadow-md">
                                Get in Touch
                            </span>
                            <motion.div
                                className="relative"
                                animate={{ y: [0, 6, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <ArrowDown className="h-6 w-6 text-white drop-shadow-md" />
                            </motion.div>
                        </a>
                    </motion.div>
                    </div>

                    {/* Right: Illustration */}
                    <motion.div
                        className="hidden lg:block relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                    >
                        <div className="relative max-w-lg mx-auto">
                            {/* Decorative glow */}
                            <div className="absolute -inset-8 bg-gradient-to-br from-accent-orange/30 via-secondary-yellow/20 to-primary/20 rounded-full blur-3xl opacity-60" />

                            {/* SVG Illustration - Business Conversation */}
                            <svg
                                viewBox="0 0 500 400"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="relative w-full h-auto drop-shadow-2xl"
                            >
                                {/* Table */}
                                <ellipse cx="250" cy="320" rx="180" ry="30" fill="white" fillOpacity="0.1" />
                                <rect x="70" y="240" width="360" height="80" rx="8" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.2" strokeWidth="2" />

                                {/* Table items */}
                                <rect x="150" y="255" width="60" height="40" rx="4" fill="#F59A23" fillOpacity="0.3" />
                                <rect x="290" y="255" width="60" height="40" rx="4" fill="#1E4DB7" fillOpacity="0.3" />

                                {/* Person 1 - Left (Professional woman) */}
                                <g className="animate-pulse" style={{ animationDuration: '3s' }}>
                                    {/* Body */}
                                    <path d="M120 240 C120 180, 80 180, 80 140 C80 100, 120 80, 140 80 C160 80, 200 100, 200 140 C200 180, 160 180, 160 240" fill="#1E4DB7" />
                                    {/* Head with hijab */}
                                    <circle cx="140" cy="70" r="35" fill="#F5D0C5" />
                                    <path d="M105 55 C105 30, 140 20, 175 55 C175 75, 175 90, 140 100 C105 90, 105 75, 105 55" fill="#1E4DB7" />
                                    {/* Face */}
                                    <circle cx="130" cy="65" r="3" fill="#333" />
                                    <circle cx="150" cy="65" r="3" fill="#333" />
                                    <path d="M135 78 Q140 82, 145 78" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
                                    {/* Arm gesturing */}
                                    <motion.path
                                        d="M160 160 Q200 140, 220 180"
                                        stroke="#F5D0C5"
                                        strokeWidth="16"
                                        strokeLinecap="round"
                                        fill="none"
                                        animate={{ d: ["M160 160 Q200 140, 220 180", "M160 160 Q200 130, 230 170", "M160 160 Q200 140, 220 180"] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </g>

                                {/* Person 2 - Right (Client) */}
                                <g>
                                    {/* Body */}
                                    <path d="M340 240 C340 180, 300 180, 300 140 C300 100, 340 80, 360 80 C380 80, 420 100, 420 140 C420 180, 380 180, 380 240" fill="#F59A23" />
                                    {/* Head */}
                                    <circle cx="360" cy="70" r="32" fill="#E8C4A0" />
                                    {/* Hair */}
                                    <path d="M328 55 C328 35, 360 25, 392 55 C392 45, 380 40, 360 40 C340 40, 328 45, 328 55" fill="#4A3728" />
                                    {/* Face */}
                                    <circle cx="350" cy="65" r="3" fill="#333" />
                                    <circle cx="370" cy="65" r="3" fill="#333" />
                                    <path d="M355 78 Q360 82, 365 78" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
                                    {/* Arm */}
                                    <motion.path
                                        d="M300 160 Q280 180, 270 200"
                                        stroke="#E8C4A0"
                                        strokeWidth="14"
                                        strokeLinecap="round"
                                        fill="none"
                                        animate={{ d: ["M300 160 Q280 180, 270 200", "M300 160 Q275 175, 265 195", "M300 160 Q280 180, 270 200"] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    />
                                </g>

                                {/* Speech bubbles */}
                                <motion.g
                                    animate={{ opacity: [0.5, 1, 0.5], y: [0, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <rect x="180" y="30" width="80" height="35" rx="17" fill="white" fillOpacity="0.9" />
                                    <polygon points="200,65 210,65 195,80" fill="white" fillOpacity="0.9" />
                                    <circle cx="200" cy="47" r="4" fill="#1E4DB7" />
                                    <circle cx="215" cy="47" r="4" fill="#1E4DB7" />
                                    <circle cx="230" cy="47" r="4" fill="#1E4DB7" />
                                </motion.g>

                                <motion.g
                                    animate={{ opacity: [0.5, 1, 0.5], y: [0, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                >
                                    <rect x="320" y="10" width="70" height="30" rx="15" fill="white" fillOpacity="0.9" />
                                    <polygon points="340,40 350,40 335,52" fill="white" fillOpacity="0.9" />
                                    <circle cx="340" cy="25" r="3" fill="#F59A23" />
                                    <circle cx="355" cy="25" r="3" fill="#F59A23" />
                                    <circle cx="370" cy="25" r="3" fill="#F59A23" />
                                </motion.g>

                                {/* Floating elements */}
                                <motion.circle
                                    cx="50" cy="150"
                                    r="8"
                                    fill="#F59A23"
                                    fillOpacity="0.6"
                                    animate={{ y: [0, -15, 0], opacity: [0.4, 0.8, 0.4] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.circle
                                    cx="450" cy="180"
                                    r="6"
                                    fill="#1E4DB7"
                                    fillOpacity="0.6"
                                    animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                />
                                <motion.rect
                                    x="460" y="100"
                                    width="12" height="12"
                                    rx="2"
                                    fill="#FFE63B"
                                    fillOpacity="0.5"
                                    animate={{ rotate: [0, 180, 360], opacity: [0.3, 0.7, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.rect
                                    x="30" y="220"
                                    width="10" height="10"
                                    rx="2"
                                    fill="#10B981"
                                    fillOpacity="0.5"
                                    animate={{ rotate: [0, -180, -360], opacity: [0.3, 0.7, 0.3] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                />
                            </svg>

                            {/* Floating badge */}
                            <motion.div
                                className="absolute -bottom-2 left-4 px-4 py-3 bg-white rounded-xl shadow-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-orange to-accent-red flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-neutral-900">Let&apos;s Talk</div>
                                        <div className="text-xs text-neutral-500">We&apos;re ready to help</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
