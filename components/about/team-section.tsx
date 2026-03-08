"use client";

import { useState } from "react";
import Image from "next/image";
import { Linkedin, Mail, X } from "lucide-react";
import { FadeUp } from "@/components/ui/animations/scroll-reveal";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface TeamMember {
    key: string;
    photo: string;
    socialLinks: {
        linkedin?: string;
        email?: string;
    };
    gradient: string;
}

const teamMembers: TeamMember[] = [
    {
        key: "cofounder1",
        photo: "/team/fatima-abubakar.jpeg",
        socialLinks: { linkedin: "#", email: "fatima@womenconnectintl.org" },
        gradient: "from-[#0D7377] to-[#095456]",
    },
    {
        key: "cofounder2",
        photo: "/team/rakiya-mohammed.jpeg",
        socialLinks: { linkedin: "#", email: "rakiya@womenconnectintl.org" },
        gradient: "from-[#C2185B] to-[#9C1349]",
    },
];

function TeamMemberCard({
    member,
    onClick,
}: {
    member: TeamMember;
    onClick: () => void;
}) {
    const t = useTranslations("about.team");

    return (
        <motion.div
            className="group cursor-pointer"
            onClick={onClick}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100">
                {/* Photo */}
                <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                        src={member.photo}
                        alt={t(`members.${member.key}.name`)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Name overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-white">
                            {t(`members.${member.key}.name`)}
                        </h3>
                        <p className="text-white/80 text-sm mt-1">
                            {t(`members.${member.key}.role`)}
                        </p>
                    </div>
                </div>

                {/* Social Links */}
                <div className="p-4 flex gap-3">
                    {member.socialLinks.linkedin && (
                        <a
                            href={member.socialLinks.linkedin}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-[#0D7377] hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                    )}
                    {member.socialLinks.email && (
                        <a
                            href={`mailto:${member.socialLinks.email}`}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-[#0D7377] hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="Email"
                        >
                            <Mail className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function TeamMemberModal({
    member,
    onClose,
}: {
    member: TeamMember;
    onClose: () => void;
}) {
    const t = useTranslations("about.team");

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <motion.div
                className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Photo */}
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                    <Image
                        src={member.photo}
                        alt={t(`members.${member.key}.name`)}
                        fill
                        className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                        <h3 className="text-2xl font-bold text-white">
                            {t(`members.${member.key}.name`)}
                        </h3>
                        <p className="text-white/80">{t(`members.${member.key}.role`)}</p>
                    </div>
                </div>

                {/* Bio */}
                <div className="p-6">
                    <p className="text-gray-600 leading-relaxed">
                        {t(`members.${member.key}.bio`)}
                    </p>
                    {t.has(`members.${member.key}.extendedBio`) && (
                        <p className="text-gray-600 leading-relaxed mt-4">
                            {t(`members.${member.key}.extendedBio`)}
                        </p>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

export function TeamSection() {
    const t = useTranslations("about.team");
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Section header */}
                <FadeUp>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-sm font-semibold tracking-widest uppercase text-[#0D7377] mb-4 block">
                            {t("overline")}
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
                            {t("heading")}
                        </h2>
                        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                            {t("subheading")}
                        </p>
                    </div>
                </FadeUp>

                {/* Team Grid - 2 columns for co-founders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {teamMembers.map((member) => (
                        <FadeUp key={member.key}>
                            <TeamMemberCard
                                member={member}
                                onClick={() => setSelectedMember(member)}
                            />
                        </FadeUp>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <TeamMemberModal
                        member={selectedMember}
                        onClose={() => setSelectedMember(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
