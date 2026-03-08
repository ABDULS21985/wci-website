"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    MessageCircle,
    Globe,
    ExternalLink,
    Copy,
    Check,
} from "lucide-react";
import { officesData, type OfficeData } from "./office-data";
import { easings } from "@/lib/motion-config";

// ============================================================================
// Office Tab Button Component
// ============================================================================

interface TabButtonProps {
    office: OfficeData;
    isActive: boolean;
    onClick: () => void;
}

function TabButton({ office, isActive, onClick }: TabButtonProps) {
    const [localTime, setLocalTime] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: office.timezone,
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            };
            const timeString = now.toLocaleTimeString("en-US", options);
            setLocalTime(timeString);

            // Check if within business hours
            const localHour = parseInt(
                now.toLocaleTimeString("en-US", {
                    timeZone: office.timezone,
                    hour: "numeric",
                    hour12: false,
                })
            );
            const day = now.toLocaleDateString("en-US", {
                timeZone: office.timezone,
                weekday: "short",
            });
            const isWeekday = !["Sat", "Sun"].includes(day);
            setIsOpen(isWeekday && localHour >= 9 && localHour < 18);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, [office.timezone]);

    return (
        <button
            onClick={onClick}
            className={`
                relative flex-1 min-w-[140px] px-6 py-4 rounded-xl
                transition-all duration-300 text-left
                ${
                    isActive
                        ? "bg-white shadow-lg shadow-neutral-200/50"
                        : "bg-transparent hover:bg-white/50"
                }
            `}
            aria-selected={isActive}
            role="tab"
        >
            {/* Active indicator */}
            {isActive && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-lg shadow-neutral-200/50"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-1">
                    <span className={`font-semibold ${isActive ? "text-neutral-900" : "text-neutral-600"}`}>
                        {office.city}
                    </span>
                    <span
                        className={`
                            flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full
                            ${isOpen ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-500"}
                        `}
                    >
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${
                                isOpen ? "bg-green-500 motion-safe:animate-pulse" : "bg-neutral-400"
                            }`}
                        />
                        {isOpen ? "Open" : "Closed"}
                    </span>
                </div>
                <div className={`text-xs ${isActive ? "text-neutral-500" : "text-neutral-400"}`}>
                    {localTime}
                </div>
            </div>
        </button>
    );
}

// ============================================================================
// Copy Button Component
// ============================================================================

interface CopyButtonProps {
    text: string;
    label: string;
}

function CopyButton({ text, label }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label={copied ? "Copied!" : `Copy ${label}`}
        >
            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        <Check className="h-4 w-4 text-green-500" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        <Copy className="h-4 w-4 text-neutral-400 hover:text-neutral-600" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}

// ============================================================================
// Office Content Panel Component
// ============================================================================

interface OfficePanelProps {
    office: OfficeData;
}

function OfficePanel({ office }: OfficePanelProps) {
    // Google Maps embed URL
    const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
        office.address.join(", ")
    )}&output=embed`;

    return (
        <motion.div
            key={office.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: easings.outExpo }}
            className="grid lg:grid-cols-2 gap-8"
            role="tabpanel"
            aria-label={`${office.city} office details`}
        >
            {/* Left Column - Contact Details */}
            <div className="space-y-6">
                {/* Office Header */}
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                        <Globe className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-neutral-900">{office.name}</h3>
                        <p className="text-neutral-500">{office.city}</p>
                    </div>
                </div>

                {/* Address */}
                <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                                <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-neutral-900 mb-1">Address</p>
                                <p className="text-sm text-neutral-600 leading-relaxed">
                                    {office.address.map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            {i < office.address.length - 1 && <br />}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                        <a
                            href={office.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-white transition-colors"
                            aria-label="Open in Google Maps"
                        >
                            <ExternalLink className="h-4 w-4 text-neutral-400 hover:text-primary" />
                        </a>
                    </div>
                </div>

                {/* Phone Numbers */}
                <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-neutral-900 mb-2">Phone</p>
                            <div className="space-y-2">
                                {office.phones.map((phone, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <a
                                            href={`tel:${phone.replace(/\s/g, "")}`}
                                            className="text-sm text-neutral-600 hover:text-primary transition-colors"
                                        >
                                            {phone}
                                        </a>
                                        <CopyButton text={phone} label="phone number" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-neutral-900 mb-1">Email</p>
                            <div className="flex items-center justify-between">
                                <a
                                    href={`mailto:${office.email}`}
                                    className="text-sm text-neutral-600 hover:text-primary transition-colors"
                                >
                                    {office.email}
                                </a>
                                <CopyButton text={office.email} label="email address" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Business Hours */}
                <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-neutral-900 mb-1">Best Time to Call</p>
                            <p className="text-sm text-neutral-600">{office.bestTimeToCall}</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3">
                    <a
                        href={`tel:${office.phones[0].replace(/\s/g, "")}`}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all btn-press"
                    >
                        <Phone className="h-4 w-4" />
                        Call Office
                    </a>
                    {office.whatsapp && (
                        <a
                            href={`https://wa.me/${office.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-white rounded-xl text-sm font-semibold hover:bg-[#20BD5A] transition-colors btn-press"
                            aria-label="Contact on WhatsApp"
                        >
                            <MessageCircle className="h-4 w-4" />
                            WhatsApp
                        </a>
                    )}
                </div>
            </div>

            {/* Right Column - Map */}
            <div className="relative rounded-2xl overflow-hidden bg-neutral-100 min-h-[400px] lg:min-h-full">
                {/* Map Embed */}
                <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "400px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map showing ${office.name} location`}
                    className="absolute inset-0"
                />

                {/* Map Overlay with Open Button */}
                <div className="absolute bottom-4 left-4 right-4">
                    <a
                        href={office.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/95 backdrop-blur-sm rounded-xl text-sm font-medium text-neutral-900 hover:bg-white shadow-lg transition-all"
                    >
                        <MapPin className="h-4 w-4 text-primary" />
                        Open in Google Maps
                        <ExternalLink className="h-3.5 w-3.5 text-neutral-400" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

// ============================================================================
// Main Office Tabs Component
// ============================================================================

export function OfficeTabs() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="space-y-8">
            {/* Section Header */}
            <div className="text-center">
                <span className="text-xs font-bold tracking-wider text-primary uppercase mb-2 block">
                    Our Offices
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                    Visit Us{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-orange">
                        Worldwide
                    </span>
                </h2>
            </div>

            {/* Tab Buttons */}
            <div
                className="flex flex-wrap gap-2 p-2 bg-neutral-100 rounded-2xl"
                role="tablist"
                aria-label="Office locations"
            >
                {officesData.map((office, index) => (
                    <TabButton
                        key={office.name}
                        office={office}
                        isActive={index === activeIndex}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-lg shadow-neutral-200/50">
                <AnimatePresence mode="wait">
                    <OfficePanel office={officesData[activeIndex]} />
                </AnimatePresence>
            </div>
        </div>
    );
}
