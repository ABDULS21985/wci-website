"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Globe, ArrowUpRight } from "lucide-react";
import type { OfficeData } from "./office-data";

interface OfficeCardProps {
    office: OfficeData;
    index: number;
}

export function OfficeCard({ office, index }: OfficeCardProps) {
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

            // Check if within business hours (9 AM - 6 PM local time)
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
        <motion.div
            className="group relative bg-white rounded-2xl border border-neutral-200 overflow-hidden transition-all duration-300 hover:border-neutral-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
        >
            {/* Header */}
            <div className="relative p-6 pb-4 border-b border-neutral-100">
                {/* Status Badge - Absolute positioned */}
                <div className="absolute top-4 right-4">
                    <div
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            isOpen
                                ? "bg-green-50 text-green-700"
                                : "bg-neutral-100 text-neutral-500"
                        }`}
                    >
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${
                                isOpen ? "bg-green-500 motion-safe:animate-pulse" : "bg-neutral-400"
                            }`}
                        />
                        {isOpen ? "Open" : "Closed"}
                    </div>
                </div>

                {/* Office Info */}
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-neutral-900">{office.name}</h3>
                        <p className="text-sm text-neutral-500">{office.city}</p>
                    </div>
                </div>

                {/* Local Time */}
                <div className="flex items-center gap-2 mt-4 px-3 py-2 bg-neutral-50 rounded-lg">
                    <Clock className="h-4 w-4 text-neutral-400" />
                    <span className="text-sm text-neutral-500">Local time:</span>
                    <span className="text-sm font-semibold text-neutral-900">{localTime}</span>
                </div>
            </div>

            {/* Contact Details */}
            <div className="p-6 space-y-4">
                {/* Address */}
                <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group/link"
                >
                    <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0 group-hover/link:bg-primary/10 transition-colors">
                        <MapPin className="h-4 w-4 text-neutral-500 group-hover/link:text-primary transition-colors" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-neutral-600 leading-relaxed group-hover/link:text-neutral-900 transition-colors">
                            {office.address.map((line, i) => (
                                <span key={i}>
                                    {line}
                                    {i < office.address.length - 1 && <br />}
                                </span>
                            ))}
                        </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-neutral-300 group-hover/link:text-primary transition-colors flex-shrink-0" />
                </a>

                {/* Phone Numbers */}
                <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-4 w-4 text-neutral-500" />
                    </div>
                    <div className="flex-1 space-y-1">
                        {office.phones.map((phone, i) => (
                            <a
                                key={i}
                                href={`tel:${phone.replace(/\s/g, "")}`}
                                className="block text-sm text-neutral-600 hover:text-primary transition-colors"
                            >
                                {phone}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-4 w-4 text-neutral-500" />
                    </div>
                    <a
                        href={`mailto:${office.email}`}
                        className="text-sm text-neutral-600 hover:text-primary transition-colors"
                    >
                        {office.email}
                    </a>
                </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6">
                <div className="flex gap-2">
                    <a
                        href={`tel:${office.phones[0].replace(/\s/g, "")}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-secondary transition-colors btn-press"
                    >
                        <Phone className="h-4 w-4" />
                        Call Office
                    </a>
                    {office.whatsapp && (
                        <a
                            href={`https://wa.me/${office.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-xl text-sm font-medium hover:bg-[#20BD5A] transition-colors btn-press"
                            aria-label="Contact on WhatsApp"
                        >
                            <MessageCircle className="h-4 w-4" />
                        </a>
                    )}
                </div>

                {/* Best time hint */}
                <p className="text-xs text-neutral-400 text-center mt-3">
                    Best time: {office.bestTimeToCall}
                </p>
            </div>
        </motion.div>
    );
}
