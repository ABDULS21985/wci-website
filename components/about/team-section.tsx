"use client";

import { useState, useCallback } from "react";
import { Linkedin, Twitter, X, Mail } from "lucide-react";
import { FadeUp } from "@/components/ui/animations/scroll-reveal";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface TeamMember {
    key: string;
    initials: string;
    gender: "male" | "female";
    socialLinks: {
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
    gradient: string;
    avatarColors: {
        skin: string;
        hair: string;
        accent: string;
        bg1: string;
        bg2: string;
    };
}

const teamMembers: TeamMember[] = [
    {
        key: "ceo",
        initials: "HRM",
        gender: "female",
        socialLinks: { linkedin: "#", twitter: "#", email: "ceo@globaldigibit.com" },
        gradient: "from-primary to-secondary",
        avatarColors: {
            skin: "#D4A574",
            hair: "#1E4DB7",
            accent: "#1E4DB7",
            bg1: "#1E4DB7",
            bg2: "#143A8F",
        },
    },
    {
        key: "cto",
        initials: "MA",
        gender: "male",
        socialLinks: { linkedin: "#", email: "cto@globaldigibit.com" },
        gradient: "from-accent-orange to-accent-red",
        avatarColors: {
            skin: "#E8C4A0",
            hair: "#2D2D2D",
            accent: "#F59A23",
            bg1: "#F59A23",
            bg2: "#E86A1D",
        },
    },
    {
        key: "headAnalytics",
        initials: "SI",
        gender: "female",
        socialLinks: { linkedin: "#", twitter: "#" },
        gradient: "from-accent-yellow to-accent-orange",
        avatarColors: {
            skin: "#F5D0C5",
            hair: "#4A3728",
            accent: "#FFE63B",
            bg1: "#FFE63B",
            bg2: "#F59A23",
        },
    },
    {
        key: "headCybersecurity",
        initials: "DO",
        gender: "male",
        socialLinks: { linkedin: "#" },
        gradient: "from-primary to-accent-orange",
        avatarColors: {
            skin: "#C68642",
            hair: "#1A1A1A",
            accent: "#1E4DB7",
            bg1: "#1E4DB7",
            bg2: "#F59A23",
        },
    },
];

/**
 * Advanced cartoon avatar SVG component
 */
function AdvancedAvatar({
    member,
    size = "full",
    className = "",
}: {
    member: TeamMember;
    size?: "full" | "modal";
    className?: string;
}) {
    const { gender, avatarColors, initials } = member;
    const isModal = size === "modal";

    return (
        <svg
            viewBox="0 0 200 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-full h-full ${className}`}
        >
            {/* Background gradient */}
            <defs>
                <linearGradient id={`bg-${initials}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={avatarColors.bg1} />
                    <stop offset="100%" stopColor={avatarColors.bg2} />
                </linearGradient>
                <linearGradient id={`shine-${initials}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="white" stopOpacity="0" />
                    <stop offset="100%" stopColor="white" stopOpacity="0.1" />
                </linearGradient>
            </defs>

            {/* Background */}
            <rect width="200" height="260" fill={`url(#bg-${initials})`} />
            <rect width="200" height="260" fill={`url(#shine-${initials})`} />

            {/* Decorative circles */}
            <circle cx="30" cy="40" r="20" fill="white" fillOpacity="0.1" />
            <circle cx="170" cy="220" r="30" fill="white" fillOpacity="0.08" />
            <circle cx="180" cy="60" r="15" fill="white" fillOpacity="0.1" />

            {/* Body/Shoulders */}
            <ellipse cx="100" cy="280" rx="80" ry="50" fill={avatarColors.accent} />
            <ellipse cx="100" cy="280" rx="80" ry="50" fill="white" fillOpacity="0.1" />

            {/* Neck */}
            <rect x="85" y="175" width="30" height="40" fill={avatarColors.skin} />

            {/* Head */}
            <ellipse cx="100" cy="120" rx="55" ry="65" fill={avatarColors.skin} />

            {/* Ears */}
            <ellipse cx="45" cy="125" rx="8" ry="12" fill={avatarColors.skin} />
            <ellipse cx="155" cy="125" rx="8" ry="12" fill={avatarColors.skin} />

            {gender === "female" ? (
                <>
                    {/* Female hair - long flowing style */}
                    <path
                        d="M45 100 C45 50, 100 30, 155 100 C160 120, 160 140, 155 160 C155 180, 140 190, 130 185 C130 170, 135 150, 135 130 C135 90, 100 70, 65 130 C65 150, 70 170, 70 185 C60 190, 45 180, 45 160 C40 140, 40 120, 45 100"
                        fill={avatarColors.hair}
                    />
                    {/* Hair shine */}
                    <path
                        d="M60 80 C70 60, 130 60, 140 80"
                        stroke="white"
                        strokeOpacity="0.2"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                    />
                    {/* Earrings */}
                    <circle cx="45" cy="140" r="4" fill={avatarColors.accent} />
                    <circle cx="155" cy="140" r="4" fill={avatarColors.accent} />
                </>
            ) : (
                <>
                    {/* Male hair - short styled */}
                    <path
                        d="M50 95 C50 55, 100 40, 150 95 C155 75, 140 55, 100 50 C60 55, 45 75, 50 95"
                        fill={avatarColors.hair}
                    />
                    {/* Hair texture lines */}
                    <path
                        d="M65 70 Q100 55, 135 70"
                        stroke="white"
                        strokeOpacity="0.15"
                        strokeWidth="3"
                        fill="none"
                    />
                </>
            )}

            {/* Eyebrows */}
            <path
                d="M65 100 Q75 95, 85 100"
                stroke={avatarColors.hair}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
            />
            <path
                d="M115 100 Q125 95, 135 100"
                stroke={avatarColors.hair}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
            />

            {/* Eyes */}
            <ellipse cx="75" cy="115" rx="12" ry="8" fill="white" />
            <ellipse cx="125" cy="115" rx="12" ry="8" fill="white" />
            <circle cx="77" cy="115" r="5" fill="#2D2D2D" />
            <circle cx="127" cy="115" r="5" fill="#2D2D2D" />
            <circle cx="79" cy="113" r="2" fill="white" />
            <circle cx="129" cy="113" r="2" fill="white" />

            {/* Nose */}
            <path
                d="M100 120 L100 135 Q95 140, 100 142 Q105 140, 100 135"
                stroke={avatarColors.skin}
                strokeWidth="2"
                fill="none"
                filter="brightness(0.9)"
            />

            {/* Smile */}
            <path
                d="M85 155 Q100 170, 115 155"
                stroke="#C4836A"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
            />

            {/* Cheek blush */}
            <ellipse cx="60" cy="140" rx="10" ry="6" fill="#FFB5A7" fillOpacity="0.4" />
            <ellipse cx="140" cy="140" rx="10" ry="6" fill="#FFB5A7" fillOpacity="0.4" />

            {/* Collar/Shirt detail */}
            <path
                d="M70 210 L100 230 L130 210"
                stroke="white"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Face highlight */}
            <ellipse cx="80" cy="100" rx="25" ry="15" fill="white" fillOpacity="0.1" />
        </svg>
    );
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            damping: 25,
            stiffness: 300,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: 20,
        transition: { duration: 0.2 },
    },
};

/**
 * Team member card with grayscale-to-color hover effect
 */
function TeamCard({
    member,
    onClick,
}: {
    member: TeamMember;
    onClick: () => void;
}) {
    const t = useTranslations("about");
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="group relative cursor-pointer"
            variants={cardVariants}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                {/* Avatar container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                    {/* Advanced cartoon avatar */}
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                        <AdvancedAvatar member={member} />
                    </div>
                    {/* Gradient overlay */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500`}
                    />

                    {/* Color accent bar on hover */}
                    <motion.div
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${member.gradient}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ transformOrigin: "left" }}
                    />
                </div>

                {/* Info overlay - slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-neutral-900/95 via-neutral-900/80 to-transparent">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 transition-transform duration-300 group-hover:-translate-y-1">
                        {t(`team.members.${member.key}.name`)}
                    </h3>
                    <p
                        className={`text-sm font-medium bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-3`}
                    >
                        {t(`team.members.${member.key}.role`)}
                    </p>

                    {/* Social links - appear on hover */}
                    <motion.div
                        className="flex gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {member.socialLinks.linkedin && (
                            <a
                                href={member.socialLinks.linkedin}
                                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-300"
                                aria-label={`${t(`team.members.${member.key}.name`)} LinkedIn`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                        )}
                        {member.socialLinks.twitter && (
                            <a
                                href={member.socialLinks.twitter}
                                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-300"
                                aria-label={`${t(`team.members.${member.key}.name`)} Twitter`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                        )}
                        {member.socialLinks.email && (
                            <a
                                href={`mailto:${member.socialLinks.email}`}
                                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-300"
                                aria-label={`Email ${t(`team.members.${member.key}.name`)}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Mail className="w-4 h-4" />
                            </a>
                        )}
                    </motion.div>
                </div>

                {/* Click indicator */}
                <motion.div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                    transition={{ duration: 0.2 }}
                >
                    {t("team.viewProfile") || "View Profile"}
                </motion.div>
            </div>
        </motion.div>
    );
}

/**
 * Team member detail modal
 */
function TeamModal({
    member,
    onClose,
}: {
    member: TeamMember;
    onClose: () => void;
}) {
    const t = useTranslations("about");

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-600 hover:text-neutral-900 transition-colors duration-300 shadow-lg"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="grid md:grid-cols-2">
                    {/* Avatar side */}
                    <div className="relative aspect-square md:aspect-auto min-h-[300px]">
                        <AdvancedAvatar member={member} size="modal" />
                        <div
                            className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${member.gradient}`}
                        />
                    </div>

                    {/* Content side */}
                    <div className="p-8 md:p-10">
                        <div
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-gradient-to-r ${member.gradient} text-white`}
                        >
                            {t(`team.members.${member.key}.role`)}
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                            {t(`team.members.${member.key}.name`)}
                        </h2>

                        <p className="text-neutral-gray leading-relaxed mb-6">
                            {t(`team.members.${member.key}.bio`)}
                        </p>

                        {/* Extended bio if available */}
                        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
                            {t(`team.members.${member.key}.extendedBio`) ||
                                "A dedicated professional committed to driving innovation and excellence in every project."}
                        </p>

                        {/* Social links */}
                        <div className="flex gap-3">
                            {member.socialLinks.linkedin && (
                                <a
                                    href={member.socialLinks.linkedin}
                                    className="p-3 rounded-xl bg-neutral-100 text-neutral-600 hover:bg-primary hover:text-white transition-all duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                            {member.socialLinks.twitter && (
                                <a
                                    href={member.socialLinks.twitter}
                                    className="p-3 rounded-xl bg-neutral-100 text-neutral-600 hover:bg-primary hover:text-white transition-all duration-300"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                            )}
                            {member.socialLinks.email && (
                                <a
                                    href={`mailto:${member.socialLinks.email}`}
                                    className="p-3 rounded-xl bg-neutral-100 text-neutral-600 hover:bg-primary hover:text-white transition-all duration-300"
                                    aria-label="Email"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function TeamSection() {
    const t = useTranslations("about");
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const handleOpenModal = useCallback((member: TeamMember) => {
        setSelectedMember(member);
        document.body.style.overflow = "hidden";
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedMember(null);
        document.body.style.overflow = "";
    }, []);

    return (
        <section
            className="relative w-full overflow-hidden bg-white"
            style={{ paddingBlock: "var(--section-padding-lg)" }}
        >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-orange/5 rounded-full blur-3xl" />
            </div>

            {/* Dot pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `radial-gradient(circle, #1E4DB7 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="container relative z-10 mx-auto px-5 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <FadeUp>
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-primary" />
                            <span className="overline text-primary">{t("team.overline")}</span>
                            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-primary" />
                        </div>
                    </FadeUp>

                    <FadeUp delay={0.1}>
                        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                            {t("team.heading")}
                        </h2>
                    </FadeUp>

                    <FadeUp delay={0.2}>
                        <p className="text-lead text-neutral-gray max-w-2xl mx-auto">
                            {t("team.subheading")}
                        </p>
                    </FadeUp>
                </div>

                {/* Team grid */}
                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {teamMembers.map((member) => (
                        <TeamCard
                            key={member.key}
                            member={member}
                            onClick={() => handleOpenModal(member)}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <TeamModal member={selectedMember} onClose={handleCloseModal} />
                )}
            </AnimatePresence>
        </section>
    );
}
