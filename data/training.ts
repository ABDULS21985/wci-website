import type { TrainingCategory } from "@/types/services";

export const trainingCategories: TrainingCategory[] = [
    {
        id: "executive",
        name: "Executive Programs",
        description:
            "Strategic leadership programs designed for C-Suite executives and board members.",
        programs: [
            {
                id: "ai-executives",
                title: "AI for Executives",
                duration: "2 days",
                audience: "C-Suite, Board",
                outcome: "Strategic AI decision-making capability",
            },
            {
                id: "cyber-leadership",
                title: "Cybersecurity Leadership",
                duration: "3 days",
                audience: "CISOs, CIOs",
                outcome: "Crisis management and strategy skills",
            },
            {
                id: "blockchain-strategy",
                title: "Blockchain Business Strategy",
                duration: "1 day",
                audience: "Business Leaders",
                outcome: "Use case identification skills",
            },
            {
                id: "digital-transformation",
                title: "Digital Transformation Masterclass",
                duration: "5 days",
                audience: "Transformation Leaders",
                outcome: "End-to-end transformation capability",
            },
        ],
    },
    {
        id: "technical",
        name: "Technical Programs",
        description:
            "Hands-on technical training for developers, analysts, and IT professionals.",
        programs: [
            {
                id: "applied-ml",
                title: "Applied Machine Learning",
                duration: "5 days",
                audience: "Data Scientists",
                certification: "Digibit Certified ML Practitioner",
            },
            {
                id: "incident-response",
                title: "Cyber Incident Response",
                duration: "3 days",
                audience: "SOC Analysts",
                certification: "Incident Handler Certificate",
            },
            {
                id: "smart-contract-dev",
                title: "Smart Contract Development",
                duration: "5 days",
                audience: "Developers",
                certification: "Blockchain Developer Certificate",
            },
            {
                id: "it-audit-techniques",
                title: "IT Audit Techniques",
                duration: "3 days",
                audience: "Auditors",
                certification: "IT Audit Specialist Certificate",
            },
        ],
    },
    {
        id: "compliance",
        name: "Compliance Training",
        description:
            "Regulatory and standards-focused training for compliance professionals.",
        programs: [
            {
                id: "qcb-standards",
                title: "QCB Standards Implementation",
                duration: "2 days",
                audience: "Banking Sector",
                focus: "Banking sector compliance",
            },
            {
                id: "qatar-data-protection",
                title: "Qatar Data Protection Law",
                duration: "1 day",
                audience: "All Staff",
                focus: "Privacy and data handling",
            },
            {
                id: "iso-27001",
                title: "ISO 27001 Awareness",
                duration: "1 day",
                audience: "All Staff",
                focus: "Information security basics",
            },
            {
                id: "nia-policy",
                title: "NIA Policy Alignment",
                duration: "2 days",
                audience: "IT & Security Teams",
                focus: "Critical infrastructure protection",
            },
        ],
    },
];

export function getTrainingCategoryById(id: string): TrainingCategory | undefined {
    return trainingCategories.find((c) => c.id === id);
}
