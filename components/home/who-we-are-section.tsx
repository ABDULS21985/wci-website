"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
    Heart,
    Users,
    Globe,
    Shield,
    Sparkles,
    ArrowRight,
} from "lucide-react";

function useAnimatedCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(!startOnView);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!startOnView) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [startOnView, hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;
        let startTime: number;
        let animationFrame: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));
            if (progress < 1) animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, hasStarted]);

    return { count, ref };
}

function useInView(threshold: number = 0.2) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
            { threshold, rootMargin: "-50px" }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);
    return { ref, isInView };
}

function AnimatedHeadline({ children, className = "", delay = 0, isInView = false }: {
    children: string; className?: string; delay?: number; isInView?: boolean;
}) {
    const words = children.split(" ");
    return (
        <span className={className}>
            {words.map((word, index) => (
                <span key={index} className="inline-block overflow-hidden">
                    <span
                        className="inline-block transition-all duration-700"
                        style={{
                            transform: isInView ? "translateY(0)" : "translateY(100%)",
                            opacity: isInView ? 1 : 0,
                            transitionDelay: `${delay + index * 80}ms`,
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        {word}
                    </span>
                    {index < words.length - 1 && "\u00A0"}
                </span>
            ))}
        </span>
    );
}

function EmpowermentVisual({ isInView }: { isInView: boolean }) {
    const [nodes, setNodes] = useState<Array<{ x: number; y: number; delay: number }>>([]);

    useEffect(() => {
        const newNodes = [];
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const radius = 35 + Math.random() * 10;
            newNodes.push({
                x: 50 + Math.cos(angle) * radius,
                y: 50 + Math.sin(angle) * radius,
                delay: i * 100,
            });
        }
        setNodes(newNodes);
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div
                className="absolute w-[85%] h-[85%] rounded-full transition-all duration-1000"
                style={{
                    background: "radial-gradient(circle, rgba(13, 115, 119, 0.1) 0%, transparent 70%)",
                    transform: isInView ? "scale(1)" : "scale(0.8)",
                    opacity: isInView ? 1 : 0,
                }}
            />

            <div
                className="relative w-[70%] h-[70%] rounded-full overflow-hidden transition-all duration-1000"
                style={{
                    background: "linear-gradient(135deg, #0D7377 0%, #095456 50%, #063E40 100%)",
                    boxShadow: "0 25px 50px -12px rgba(13, 115, 119, 0.4), inset 0 -20px 40px rgba(0,0,0,0.3)",
                    transform: isInView ? "scale(1) rotate(0deg)" : "scale(0.8) rotate(-10deg)",
                    opacity: isInView ? 1 : 0,
                }}
            >
                <div className="absolute inset-0">
                    {[20, 40, 60, 80].map((top) => (
                        <div key={`lat-${top}`} className="absolute w-full border-t border-white/10" style={{ top: `${top}%` }} />
                    ))}
                    {[25, 50, 75].map((left) => (
                        <div key={`long-${left}`} className="absolute h-full border-l border-white/10" style={{ left: `${left}%` }} />
                    ))}
                </div>
                <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)" }}
                />
            </div>

            {nodes.map((node, index) => (
                <div
                    key={index}
                    className="absolute w-3 h-3 rounded-full transition-all duration-500"
                    style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        background: index % 3 === 0 ? "#E8A317" : index % 3 === 1 ? "#C2185B" : "#0D7377",
                        boxShadow: `0 0 10px ${index % 3 === 0 ? "#E8A317" : index % 3 === 1 ? "#C2185B" : "#0D7377"}`,
                        transform: isInView ? "scale(1)" : "scale(0)",
                        opacity: isInView ? 1 : 0,
                        transitionDelay: `${600 + node.delay}ms`,
                    }}
                />
            ))}

            <svg className="absolute inset-0 w-full h-full" style={{ opacity: isInView ? 0.4 : 0, transition: "opacity 1s ease-out 0.8s" }}>
                {nodes.slice(0, 6).map((node, index) => {
                    const nextNode = nodes[(index + 3) % nodes.length];
                    return (
                        <line key={index} x1={`${node.x}%`} y1={`${node.y}%`} x2={`${nextNode.x}%`} y2={`${nextNode.y}%`}
                            stroke="url(#wciLineGradient)" strokeWidth="1" strokeDasharray="4 4" />
                    );
                })}
                <defs>
                    <linearGradient id="wciLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#E8A317" />
                        <stop offset="100%" stopColor="#C2185B" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

function MiniStatCard({ icon: Icon, value, suffix, label, delay, isInView }: {
    icon: typeof Heart; value: number; suffix: string; label: string; delay: number; isInView: boolean;
}) {
    const { count, ref } = useAnimatedCounter(value, 2000);
    return (
        <div
            ref={ref}
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg border border-neutral-light/50 transition-all duration-700"
            style={{
                transform: isInView ? "scale(1) translateY(0)" : "scale(0.9) translateY(20px)",
                opacity: isInView ? 1 : 0,
                transitionDelay: `${delay}ms`,
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
        >
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-[#095456] text-white shadow-lg shadow-primary/25">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">{count}{suffix}</div>
                <div className="text-sm text-neutral-gray font-medium">{label}</div>
            </div>
        </div>
    );
}

function FocusBadge({ icon: Icon, label, delay, isInView }: {
    icon: typeof Shield; label: string; delay: number; isInView: boolean;
}) {
    return (
        <div
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-neutral-light shadow-md transition-all duration-500"
            style={{
                transform: isInView ? "translateY(0)" : "translateY(20px)",
                opacity: isInView ? 1 : 0,
                transitionDelay: `${delay}ms`,
            }}
        >
            <Icon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
    );
}

export function WhoWeAreSection() {
    const [scrollY, setScrollY] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const { ref: contentRef, isInView } = useInView(0.2);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    setScrollY((window.innerHeight - rect.top) * 0.08);
                }
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const stats = [
        { icon: Heart, value: 500, suffix: "+", label: "Women Supported" },
        { icon: Globe, value: 15, suffix: "+", label: "Countries Reached" },
    ];

    const focusAreas = [
        { icon: Shield, label: "Trauma-Informed" },
        { icon: Sparkles, label: "AI-Enabled" },
        { icon: Users, label: "Community-Led" },
    ];

    return (
        <section ref={sectionRef} className="relative w-full py-24 overflow-hidden bg-white">
            <div className="absolute inset-0 opacity-[0.02]"
                style={{ backgroundImage: `radial-gradient(circle, #0D7377 1px, transparent 1px)`, backgroundSize: "32px 32px" }}
            />

            <div ref={contentRef} className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 transition-all duration-700"
                            style={{ transform: isInView ? "translateY(0)" : "translateY(20px)", opacity: isInView ? 1 : 0 }}>
                            <div className="w-10 h-0.5 bg-primary transition-all duration-500"
                                style={{ transform: isInView ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transitionDelay: "200ms" }} />
                            <span className="text-[13px] font-bold tracking-[0.2em] text-neutral-gray uppercase">WHO WE ARE</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight">
                            <AnimatedHeadline delay={200} isInView={isInView}>{"Strengthening Women,"}</AnimatedHeadline>
                            <br />
                            <span className="relative inline-block">
                                <AnimatedHeadline delay={400} isInView={isInView} className="bg-gradient-to-r from-[#0D7377] to-[#C2185B] bg-clip-text text-transparent">
                                    {"Transforming"}
                                </AnimatedHeadline>
                            </span>
                            <AnimatedHeadline delay={500} isInView={isInView}>{" Communities"}</AnimatedHeadline>
                        </h2>

                        <div className="space-y-5 text-base md:text-lg text-neutral-gray leading-relaxed">
                            <p className="transition-all duration-700 max-w-none"
                                style={{ transform: isInView ? "translateY(0)" : "translateY(20px)", opacity: isInView ? 1 : 0, transitionDelay: "500ms" }}>
                                <span className="font-semibold text-foreground">Women Connect International</span> is a diaspora-led empowerment initiative designed to support African women navigating migration, economic disruption, and emotional strain across borders. We combine{" "}
                                <span className="font-medium text-primary">psychosocial resilience</span>,{" "}
                                <span className="font-medium text-primary">economic empowerment</span>,{" "}
                                <span className="font-medium text-primary">leadership development</span>, and{" "}
                                <span className="font-medium text-primary">transparent humanitarian coordination</span>.
                            </p>
                            <p className="transition-all duration-700 max-w-none"
                                style={{ transform: isInView ? "translateY(0)" : "translateY(20px)", opacity: isInView ? 1 : 0, transitionDelay: "600ms" }}>
                                Our vision is to build a globally connected ecosystem where diaspora women are empowered as resilient leaders, economic actors, and accountable partners in transforming vulnerable communities across Africa.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {stats.map((stat, index) => (
                                <MiniStatCard key={stat.label} icon={stat.icon} value={stat.value} suffix={stat.suffix}
                                    label={stat.label} delay={700 + index * 150} isInView={isInView} />
                            ))}
                        </div>

                        <div className="pt-4 transition-all duration-700"
                            style={{ transform: isInView ? "translateY(0)" : "translateY(20px)", opacity: isInView ? 1 : 0, transitionDelay: "1000ms" }}>
                            <Link href="/about" className="group inline-flex items-center gap-2 text-primary font-semibold text-lg relative">
                                <span className="relative">
                                    Learn More About Us
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-[#C2185B] transition-all duration-500 ease-out group-hover:w-full" />
                                </span>
                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    <div className="relative lg:h-[600px]" style={{ transform: `translateY(${scrollY}px)` }}>
                        <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-[#C2185B]/10 to-[#E8A317]/10 rounded-3xl blur-2xl transition-opacity duration-1000"
                            style={{ opacity: isInView ? 0.6 : 0 }} />

                        <div className="relative h-[400px] md:h-[500px] lg:h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-teal-50 transition-all duration-1000"
                            style={{ transform: isInView ? "translateX(0)" : "translateX(60px)", opacity: isInView ? 1 : 0, transitionDelay: "300ms" }}>
                            <EmpowermentVisual isInView={isInView} />

                            <div className="absolute bottom-6 left-6 right-6 z-20 transition-all duration-700"
                                style={{ transform: isInView ? "translateY(0)" : "translateY(30px)", opacity: isInView ? 1 : 0, transitionDelay: "800ms" }}>
                                <div className="glass bg-white/90 backdrop-blur-md rounded-xl p-5 shadow-xl border border-white/50">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-[#095456] text-white shadow-lg">
                                            <Globe className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground">Diaspora-Led Impact</p>
                                            <p className="text-sm text-neutral-gray">Supporting women across 15+ countries</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-4 -right-4 w-20 h-20 border-t-4 border-r-4 border-primary/20 rounded-tr-2xl transition-all duration-700"
                            style={{ opacity: isInView ? 1 : 0, transform: isInView ? "scale(1)" : "scale(0.8)", transitionDelay: "500ms" }} />
                        <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-4 border-l-4 border-[#C2185B]/20 rounded-bl-2xl transition-all duration-700"
                            style={{ opacity: isInView ? 1 : 0, transform: isInView ? "scale(1)" : "scale(0.8)", transitionDelay: "600ms" }} />

                        <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
                            {focusAreas.map((area, index) => (
                                <FocusBadge key={area.label} icon={area.icon} label={area.label} delay={1000 + index * 100} isInView={isInView} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
