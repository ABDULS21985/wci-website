"use client";

import { useRef, useState, useCallback, useMemo } from "react";
import { MapPin, Phone, Mail, Clock, Building2, ExternalLink } from "lucide-react";
import { FadeUp, ScaleIn } from "@/components/ui/animations/scroll-reveal";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface Office {
    key: string;
    flag: string;
    phone: string;
    email: string;
    timezone: string;
    gradient: string;
    bgGradient: string;
    // Map coordinates (percentage-based for responsive)
    mapPosition: { x: number; y: number };
}

const offices: Office[] = [
    {
        key: "abuja",
        flag: "\u{1F1F3}\u{1F1EC}",
        phone: "+234 (0) 816 177 8448",
        email: "connect@globaldigibit.com",
        timezone: "WAT (UTC+1)",
        gradient: "from-primary to-secondary",
        bgGradient: "from-primary/10 to-secondary/5",
        mapPosition: { x: 48, y: 52 }, // Nigeria position
    },
    {
        key: "doha",
        flag: "\u{1F1F6}\u{1F1E6}",
        phone: "+974 3147 5305",
        email: "connect@globaldigibit.com",
        timezone: "AST (UTC+3)",
        gradient: "from-accent-orange to-accent-red",
        bgGradient: "from-accent-orange/10 to-accent-red/5",
        mapPosition: { x: 58, y: 42 }, // Qatar position
    },
];

// Generate dot grid for world map
function generateDotGrid(rows: number, cols: number): { x: number; y: number; visible: boolean }[] {
    const dots: { x: number; y: number; visible: boolean }[] = [];

    // Simplified world shape - represents land masses
    const worldShape = [
        // Row patterns indicating where land exists (approximation)
        { row: 0, start: 0, end: 100, density: 0.1 }, // Arctic
        { row: 10, start: 15, end: 95, density: 0.4 }, // Northern latitudes
        { row: 20, start: 10, end: 95, density: 0.6 }, // North America/Europe/Asia
        { row: 30, start: 5, end: 95, density: 0.7 },
        { row: 40, start: 10, end: 90, density: 0.6 },
        { row: 50, start: 20, end: 85, density: 0.5 }, // Middle latitudes
        { row: 60, start: 25, end: 75, density: 0.4 }, // Africa/South America
        { row: 70, start: 30, end: 65, density: 0.3 },
        { row: 80, start: 35, end: 60, density: 0.2 }, // Southern latitudes
        { row: 90, start: 40, end: 55, density: 0.1 }, // Antarctica
    ];

    for (let row = 0; row < rows; row++) {
        const rowPercent = (row / rows) * 100;
        const rowConfig = worldShape.find(
            (s, i, arr) =>
                rowPercent >= s.row &&
                (i === arr.length - 1 || rowPercent < (arr[i + 1]?.row ?? 100))
        ) || { start: 0, end: 100, density: 0.3 };

        for (let col = 0; col < cols; col++) {
            const colPercent = (col / cols) * 100;
            const x = (col / cols) * 100;
            const y = (row / rows) * 100;

            // Check if within land area and apply density-based visibility
            const isInLandArea =
                colPercent >= rowConfig.start && colPercent <= rowConfig.end;
            const visible = isInLandArea && Math.random() < rowConfig.density;

            dots.push({ x, y, visible });
        }
    }

    return dots;
}

/**
 * Animated pulsing marker for office locations
 */
function OfficeMarker({
    office,
    isSelected,
    onSelect,
    onHover,
}: {
    office: Office;
    isSelected: boolean;
    onSelect: () => void;
    onHover: (hovered: boolean) => void;
}) {
    const t = useTranslations("about");

    return (
        <motion.button
            className="absolute z-20"
            style={{
                left: `${office.mapPosition.x}%`,
                top: `${office.mapPosition.y}%`,
                transform: "translate(-50%, -50%)",
            }}
            onClick={onSelect}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.5,
            }}
            aria-label={`${t(`globalPresence.offices.${office.key}.city`)} office`}
        >
            {/* Outer pulse rings */}
            <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${office.gradient}`}
                animate={{
                    scale: [1, 2, 2],
                    opacity: [0.4, 0.1, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                }}
                style={{ width: 24, height: 24, margin: "-4px" }}
            />
            <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${office.gradient}`}
                animate={{
                    scale: [1, 1.8, 1.8],
                    opacity: [0.3, 0.05, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.5,
                }}
                style={{ width: 24, height: 24, margin: "-4px" }}
            />

            {/* Main marker */}
            <motion.div
                className={`relative w-4 h-4 rounded-full bg-gradient-to-br ${office.gradient} shadow-lg cursor-pointer`}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    boxShadow: isSelected
                        ? `0 0 20px rgba(30, 77, 183, 0.5)`
                        : `0 0 10px rgba(0, 0, 0, 0.2)`,
                }}
            >
                {/* Inner glow */}
                <div className="absolute inset-1 rounded-full bg-white/30" />
            </motion.div>

            {/* Hover tooltip */}
            <AnimatePresence>
                {isSelected && (
                    <motion.div
                        className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 whitespace-nowrap"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="px-4 py-2 rounded-xl bg-white shadow-lg border border-neutral-100">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{office.flag}</span>
                                <span className="font-semibold text-neutral-900">
                                    {t(`globalPresence.offices.${office.key}.city`)}
                                </span>
                            </div>
                            <p className="text-xs text-neutral-500 mt-1">
                                {t(`globalPresence.offices.${office.key}.type`)}
                            </p>
                        </div>
                        {/* Arrow */}
                        <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-neutral-100 rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}

/**
 * Stylized dot-grid world map
 */
function WorldMap({
    offices,
    selectedOffice,
    onSelectOffice,
}: {
    offices: Office[];
    selectedOffice: string | null;
    onSelectOffice: (key: string | null) => void;
}) {
    const mapRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(mapRef, { once: true, margin: "-50px" });
    const [hoveredOffice, setHoveredOffice] = useState<string | null>(null);

    // Generate dots once
    const dots = useMemo(() => generateDotGrid(30, 60), []);

    return (
        <div
            ref={mapRef}
            className="relative w-full aspect-[2/1] max-w-4xl mx-auto"
        >
            {/* Dot grid */}
            <div className="absolute inset-0">
                {dots.map((dot, index) =>
                    dot.visible ? (
                        <motion.div
                            key={index}
                            className="absolute w-1 h-1 rounded-full bg-primary/20"
                            style={{
                                left: `${dot.x}%`,
                                top: `${dot.y}%`,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: Math.random() * 0.8,
                            }}
                        />
                    ) : null
                )}
            </div>

            {/* Connection lines between offices */}
            {offices.length >= 2 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.line
                        x1={`${offices[0].mapPosition.x}%`}
                        y1={`${offices[0].mapPosition.y}%`}
                        x2={`${offices[1].mapPosition.x}%`}
                        y2={`${offices[1].mapPosition.y}%`}
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                        strokeDasharray="8,4"
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                    />
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#1E4DB7" stopOpacity="0.5" />
                            <stop offset="50%" stopColor="#FFE63B" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#F59A23" stopOpacity="0.5" />
                        </linearGradient>
                    </defs>
                </svg>
            )}

            {/* Office markers */}
            {offices.map((office) => (
                <OfficeMarker
                    key={office.key}
                    office={office}
                    isSelected={selectedOffice === office.key || hoveredOffice === office.key}
                    onSelect={() =>
                        onSelectOffice(selectedOffice === office.key ? null : office.key)
                    }
                    onHover={(hovered) => setHoveredOffice(hovered ? office.key : null)}
                />
            ))}

            {/* Map legend */}
            <motion.div
                className="absolute bottom-4 left-4 flex items-center gap-4 text-xs text-neutral-500"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.2 }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>Headquarters</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent-orange" />
                    <span>Regional Office</span>
                </div>
            </motion.div>
        </div>
    );
}

/**
 * Office detail card
 */
function OfficeCard({ office, isExpanded }: { office: Office; isExpanded: boolean }) {
    const t = useTranslations("about");

    return (
        <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Gradient border on hover */}
            <div
                className={`absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px] bg-gradient-to-br ${office.gradient}`}
            />

            <div
                className={`relative p-6 md:p-8 rounded-2xl bg-white border border-neutral-200 overflow-hidden transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl ${
                    isExpanded ? "ring-2 ring-primary/30" : ""
                }`}
            >
                {/* Shine sweep on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

                {/* Side accent */}
                <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${office.gradient} rounded-l-2xl`}
                />

                <div className="pl-4 relative">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl">{office.flag}</span>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-neutral-900">
                                    {t(`globalPresence.offices.${office.key}.city`)},{" "}
                                    {t(`globalPresence.offices.${office.key}.country`)}
                                </h3>
                                <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r ${office.bgGradient}`}
                                >
                                    <Building2 className="w-3 h-3" />
                                    {t(`globalPresence.offices.${office.key}.type`)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Details grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 p-2.5 rounded-xl bg-neutral-100 text-neutral-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-0.5">
                                    {t("globalPresence.labels.address")}
                                </p>
                                <p className="text-sm text-neutral-700 leading-relaxed">
                                    {t(`globalPresence.offices.${office.key}.address`)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 p-2.5 rounded-xl bg-neutral-100 text-neutral-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                                <Phone className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-0.5">
                                    {t("globalPresence.labels.phone")}
                                </p>
                                <a
                                    href={`tel:${office.phone.replace(/\s/g, "")}`}
                                    className="text-sm text-neutral-700 hover:text-primary transition-colors duration-300"
                                >
                                    {office.phone}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 p-2.5 rounded-xl bg-neutral-100 text-neutral-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-0.5">
                                    {t("globalPresence.labels.email")}
                                </p>
                                <a
                                    href={`mailto:${office.email}`}
                                    className="text-sm text-neutral-700 hover:text-primary transition-colors duration-300"
                                >
                                    {office.email}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 p-2.5 rounded-xl bg-neutral-100 text-neutral-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-0.5">
                                    {t("globalPresence.labels.timezone")}
                                </p>
                                <p className="text-sm text-neutral-700">{office.timezone}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hover accent */}
                <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${office.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
            </div>
        </motion.div>
    );
}

export function GlobalPresenceSection() {
    const t = useTranslations("about");
    const [selectedOffice, setSelectedOffice] = useState<string | null>(null);

    return (
        <section
            className="relative w-full overflow-hidden bg-neutral-50"
            style={{ paddingBlock: "var(--section-padding-lg)" }}
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white" />

            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl" />

            {/* Dot pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle, #1E4DB7 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <FadeUp>
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent-orange" />
                            <span className="overline text-accent-orange">
                                {t("globalPresence.overline")}
                            </span>
                            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent-orange" />
                        </div>
                    </FadeUp>

                    <FadeUp delay={0.1}>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                            <span className="text-neutral-900">
                                {t("globalPresence.heading.part1")}{" "}
                            </span>
                            <span className="bg-gradient-to-r from-accent-orange to-accent-red bg-clip-text text-transparent">
                                {t("globalPresence.heading.part2")}
                            </span>
                        </h2>
                    </FadeUp>

                    <FadeUp delay={0.2}>
                        <p className="max-w-2xl mx-auto text-neutral-gray text-base md:text-lg">
                            {t("globalPresence.subheading")}
                        </p>
                    </FadeUp>
                </div>

                {/* World Map */}
                <ScaleIn delay={0.3}>
                    <div className="mb-16 p-8 md:p-12 rounded-3xl bg-white shadow-lg border border-neutral-100">
                        <WorldMap
                            offices={offices}
                            selectedOffice={selectedOffice}
                            onSelectOffice={setSelectedOffice}
                        />
                    </div>
                </ScaleIn>

                {/* Countries served badge */}
                <FadeUp delay={0.4}>
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-accent-yellow/10 to-accent-orange/10 border border-primary/20">
                            <MapPin className="w-5 h-5 text-primary" />
                            <span className="font-semibold text-neutral-900">
                                {t("globalPresence.countriesServed")}
                            </span>
                        </div>
                    </div>
                </FadeUp>

                {/* Office cards */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {offices.map((office) => (
                        <OfficeCard
                            key={office.key}
                            office={office}
                            isExpanded={selectedOffice === office.key}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
