import { LucideIcon, Brain, Shield, Blocks, Laptop, BookOpen, Scale, Award } from "lucide-react";

export type ProgramCategory = "executive" | "technical" | "compliance";

export interface TrainingProgram {
    id: string;
    title: string;
    category: ProgramCategory;
    duration: string;
    durationDays: number;
    audience: string;
    description: string;
    outcomes: string[];
    certification?: string;
    icon: LucideIcon;
}

export const executivePrograms: TrainingProgram[] = [
    {
        id: "ai-executives",
        title: "AI for Executives",
        category: "executive",
        duration: "2 days",
        durationDays: 2,
        audience: "C-Suite, Board Members",
        description: "Strategic AI decision-making for business leaders. Understand AI capabilities, risks, and opportunities without the technical jargon.",
        outcomes: [
            "Strategic AI decision-making capability",
            "AI investment evaluation framework",
            "Risk assessment for AI initiatives",
            "AI governance best practices",
        ],
        icon: Brain,
    },
    {
        id: "cybersecurity-leadership",
        title: "Cybersecurity Leadership",
        category: "executive",
        duration: "3 days",
        durationDays: 3,
        audience: "CISOs, CIOs, IT Directors",
        description: "Build crisis management and strategic security leadership skills for protecting organizational assets and reputation.",
        outcomes: [
            "Crisis management protocols",
            "Security strategy development",
            "Board-level communication skills",
            "Risk quantification methods",
        ],
        icon: Shield,
    },
    {
        id: "blockchain-business",
        title: "Blockchain Business Strategy",
        category: "executive",
        duration: "1 day",
        durationDays: 1,
        audience: "Business Leaders, Strategists",
        description: "Identify blockchain use cases that drive real business value. Cut through the hype to find practical applications.",
        outcomes: [
            "Use case identification skills",
            "ROI assessment framework",
            "Vendor evaluation criteria",
            "Implementation roadmap planning",
        ],
        icon: Blocks,
    },
    {
        id: "digital-transformation",
        title: "Digital Transformation Masterclass",
        category: "executive",
        duration: "5 days",
        durationDays: 5,
        audience: "Transformation Leaders, Change Managers",
        description: "Comprehensive end-to-end digital transformation capability building for organizational leaders driving change.",
        outcomes: [
            "End-to-end transformation capability",
            "Change management strategies",
            "Technology roadmap development",
            "Stakeholder alignment techniques",
        ],
        icon: Laptop,
    },
];

export const technicalPrograms: TrainingProgram[] = [
    {
        id: "applied-ml",
        title: "Applied Machine Learning",
        category: "technical",
        duration: "5 days",
        durationDays: 5,
        audience: "Data Scientists, ML Engineers",
        description: "Hands-on machine learning model development with real-world datasets and production deployment strategies.",
        outcomes: [
            "Build production-ready ML models",
            "Feature engineering techniques",
            "Model evaluation and tuning",
            "MLOps deployment pipelines",
        ],
        certification: "Digibit Certified ML Practitioner",
        icon: Brain,
    },
    {
        id: "cyber-incident-response",
        title: "Cyber Incident Response",
        category: "technical",
        duration: "3 days",
        durationDays: 3,
        audience: "SOC Analysts, Security Engineers",
        description: "Master incident detection, analysis, and response procedures for enterprise security operations.",
        outcomes: [
            "Incident detection and triage",
            "Forensic analysis techniques",
            "Response procedure development",
            "Post-incident reporting",
        ],
        certification: "Incident Handler Certificate",
        icon: Shield,
    },
    {
        id: "smart-contract-dev",
        title: "Smart Contract Development",
        category: "technical",
        duration: "5 days",
        durationDays: 5,
        audience: "Blockchain Developers, Software Engineers",
        description: "Build secure smart contracts on Ethereum and Hyperledger platforms with security-first development practices.",
        outcomes: [
            "Solidity smart contract development",
            "Security vulnerability prevention",
            "Testing and auditing practices",
            "Deployment and upgrade patterns",
        ],
        certification: "Blockchain Developer Certificate",
        icon: Blocks,
    },
    {
        id: "it-audit-techniques",
        title: "IT Audit Techniques",
        category: "technical",
        duration: "3 days",
        durationDays: 3,
        audience: "IT Auditors, Compliance Officers",
        description: "Master IT audit methodologies, control testing, and evidence collection for comprehensive system reviews.",
        outcomes: [
            "IT audit methodology mastery",
            "Control testing procedures",
            "Evidence collection techniques",
            "Report writing best practices",
        ],
        certification: "IT Audit Specialist Certificate",
        icon: BookOpen,
    },
];

export const compliancePrograms: TrainingProgram[] = [
    {
        id: "qcb-standards",
        title: "QCB Standards Implementation",
        category: "compliance",
        duration: "2 days",
        durationDays: 2,
        audience: "Banking Compliance Teams",
        description: "Comprehensive training on Qatar Central Bank cybersecurity and technology standards for financial institutions.",
        outcomes: [
            "QCB framework understanding",
            "Gap assessment methodology",
            "Implementation planning",
            "Compliance documentation",
        ],
        icon: Scale,
    },
    {
        id: "qatar-data-protection",
        title: "Qatar Data Protection Law",
        category: "compliance",
        duration: "1 day",
        durationDays: 1,
        audience: "DPOs, Legal Teams, IT Managers",
        description: "Master Qatar's data protection requirements and build compliant data handling practices.",
        outcomes: [
            "Legal requirements understanding",
            "Data handling procedures",
            "Privacy impact assessments",
            "Breach notification protocols",
        ],
        icon: Shield,
    },
    {
        id: "iso-27001-awareness",
        title: "ISO 27001 Awareness",
        category: "compliance",
        duration: "1 day",
        durationDays: 1,
        audience: "All Staff, IT Teams",
        description: "Foundation-level information security awareness aligned with ISO 27001 requirements.",
        outcomes: [
            "Information security basics",
            "ISMS principles understanding",
            "Personal security responsibilities",
            "Incident reporting procedures",
        ],
        icon: Award,
    },
    {
        id: "nia-policy-alignment",
        title: "NIA Policy Alignment",
        category: "compliance",
        duration: "2 days",
        durationDays: 2,
        audience: "Critical Infrastructure Operators",
        description: "Align your organization with Qatar National Information Assurance policy requirements.",
        outcomes: [
            "NIA policy requirements",
            "Critical infrastructure protection",
            "Compliance assessment methods",
            "Remediation planning",
        ],
        icon: Shield,
    },
];

export const allPrograms: TrainingProgram[] = [
    ...executivePrograms,
    ...technicalPrograms,
    ...compliancePrograms,
];

export const categoryInfo: Record<ProgramCategory, { label: string; description: string }> = {
    executive: {
        label: "Executive Programs",
        description: "Strategic training for business leaders and decision-makers",
    },
    technical: {
        label: "Technical Programs",
        description: "Hands-on skills development with industry certifications",
    },
    compliance: {
        label: "Compliance Training",
        description: "Regulatory alignment and compliance awareness programs",
    },
};

export function getProgramsByCategory(category: ProgramCategory): TrainingProgram[] {
    switch (category) {
        case "executive":
            return executivePrograms;
        case "technical":
            return technicalPrograms;
        case "compliance":
            return compliancePrograms;
        default:
            return [];
    }
}
