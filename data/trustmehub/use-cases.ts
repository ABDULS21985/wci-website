import type { TrustMeHubUseCase } from "@/types/trustmehub";

export const trustMeHubUseCases: TrustMeHubUseCase[] = [
    {
        id: "education",
        slug: "education-certificate-verification",
        icon: "GraduationCap",
        title: "Education Certificate Verification",
        shortDescription:
            "Eliminate 40% of global credential fraud in academic certificates",
        fullDescription:
            "Transform how academic credentials are issued, verified, and trusted. Universities, colleges, and training institutions can issue blockchain-anchored certificates that are instantly verifiable by employers worldwide, eliminating the $7 billion annual cost of academic credential fraud.",
        sector: "Education",
        economicImpact: {
            annualValue: "$114M+",
            numericValue: 114000000,
        },
        roi: {
            timeToValue: "3 months",
            costReduction: "99%",
            efficiencyGain: "95%",
        },
        statistics: [
            {
                label: "Fraud Rate Eliminated",
                value: "40%",
                detail: "of global credential fraud",
            },
            {
                label: "Verification Time",
                value: "<10ms",
                detail: "vs 4-6 weeks traditional",
            },
            {
                label: "Cost per Verification",
                value: "$0.10",
                detail: "vs $50-500 traditional",
            },
            {
                label: "Universities Supported",
                value: "1000+",
                detail: "worldwide integration",
            },
        ],
        challenges: [
            "40% of academic credentials globally involve some form of fraud",
            "Manual verification takes 4-6 weeks and costs $50-500 per check",
            "No standardized system for cross-border credential verification",
            "Paper certificates easily forged or altered",
            "Employers unable to verify credentials in real-time",
        ],
        solutions: [
            "Blockchain-anchored certificates that cannot be forged",
            "Instant verification via QR code or API",
            "W3C Verifiable Credentials compliant for global interoperability",
            "Automated verification reduces processing time by 99.99%",
            "Complete audit trail of all credential events",
        ],
        benefits: [
            "Eliminate academic fraud and protect institutional reputation",
            "Instant verification enables faster hiring decisions",
            "Reduce verification costs from hundreds to cents",
            "Global credential portability for students",
            "Compliance with international credential standards",
            "Revenue opportunity through verification fees",
        ],
    },
    {
        id: "banking-kyc",
        slug: "banking-kyc-compliance",
        icon: "Landmark",
        title: "Banking & KYC Compliance",
        shortDescription: "Reduce KYC completion from 3-5 days to 3 minutes",
        fullDescription:
            "Revolutionize Know Your Customer (KYC) processes with instant credential verification. Banks and financial institutions can verify customer identities, employment status, and creditworthiness in real-time, reducing onboarding friction while maintaining regulatory compliance.",
        sector: "Financial Services",
        economicImpact: {
            annualValue: "$928M+",
            numericValue: 928000000,
        },
        roi: {
            timeToValue: "6 months",
            costReduction: "95%",
            efficiencyGain: "99%",
        },
        statistics: [
            {
                label: "KYC Time Reduction",
                value: "99%",
                detail: "from days to minutes",
            },
            {
                label: "Customer Drop-off",
                value: "-60%",
                detail: "reduced abandonment",
            },
            {
                label: "Compliance Rate",
                value: "100%",
                detail: "regulatory adherence",
            },
            {
                label: "Cost Savings",
                value: "$15M+",
                detail: "annual per major bank",
            },
        ],
        challenges: [
            "KYC processes take 3-5 days causing customer abandonment",
            "Manual document verification is error-prone and expensive",
            "Regulatory fines for non-compliance can reach billions",
            "Duplicate KYC across institutions wastes resources",
            "Fraud in banking onboarding costs $3.5 billion annually",
        ],
        solutions: [
            "Real-time identity verification against trusted sources",
            "Portable KYC credentials reduce redundant checks",
            "Automated compliance reporting and audit trails",
            "Zero-Knowledge Proofs enable privacy-preserving verification",
            "Integration with central bank and regulatory systems",
        ],
        benefits: [
            "Reduce customer onboarding from days to minutes",
            "Cut KYC costs by up to 95%",
            "Eliminate regulatory non-compliance risk",
            "Improve customer experience and conversion rates",
            "Enable cross-border banking with verified credentials",
            "Real-time fraud detection and prevention",
        ],
    },
    {
        id: "healthcare",
        slug: "healthcare-licensing",
        icon: "HeartPulse",
        title: "Healthcare Licensing",
        shortDescription:
            "Verify 600K+ healthcare workers, save 5,000+ lives annually",
        fullDescription:
            "Ensure every healthcare professional is properly licensed and credentialed. Hospitals, clinics, and health authorities can instantly verify medical licenses, certifications, and continuing education, preventing unqualified practitioners from endangering patient lives.",
        sector: "Healthcare",
        economicImpact: {
            annualValue: "$318M+",
            numericValue: 318000000,
        },
        roi: {
            timeToValue: "4 months",
            costReduction: "90%",
            efficiencyGain: "97%",
        },
        statistics: [
            {
                label: "Lives Saved",
                value: "5,000+",
                detail: "annually through verified care",
            },
            {
                label: "Healthcare Workers",
                value: "600K+",
                detail: "verified credentials",
            },
            {
                label: "License Verification",
                value: "<1 sec",
                detail: "instant confirmation",
            },
            {
                label: "Malpractice Reduction",
                value: "40%",
                detail: "fewer incidents",
            },
        ],
        challenges: [
            "5,000+ deaths annually from unqualified medical practitioners",
            "License verification takes weeks through manual processes",
            "No unified system for tracking continuing education",
            "Cross-border healthcare worker verification is nearly impossible",
            "Fake medical credentials are difficult to detect",
        ],
        solutions: [
            "Real-time license verification at point of care",
            "Automated tracking of continuing education requirements",
            "Blockchain-anchored credentials prevent forgery",
            "Integration with medical licensing boards",
            "Instant alerts when licenses expire or are revoked",
        ],
        benefits: [
            "Save thousands of lives through verified healthcare",
            "Instant credential verification during emergencies",
            "Automated compliance with licensing requirements",
            "Enable telemedicine with verified practitioners",
            "Reduce malpractice insurance costs",
            "Streamline healthcare worker mobility",
        ],
    },
    {
        id: "government",
        slug: "government-employment",
        icon: "Building",
        title: "Government Employment",
        shortDescription:
            "Eliminate ghost workers and verify civil service credentials",
        fullDescription:
            "Combat ghost workers and credential fraud in government employment. Civil service commissions can issue verifiable employment credentials, track qualifications, and ensure only legitimate employees receive salaries, saving billions in fraudulent payments.",
        sector: "Government",
        economicImpact: {
            annualValue: "$239M+",
            numericValue: 239000000,
        },
        roi: {
            timeToValue: "6 months",
            costReduction: "85%",
            efficiencyGain: "90%",
        },
        statistics: [
            {
                label: "Ghost Workers Eliminated",
                value: "15%",
                detail: "of payroll fraud",
            },
            {
                label: "Annual Savings",
                value: "$200M+",
                detail: "recovered from fraud",
            },
            {
                label: "Verification Speed",
                value: "99.9%",
                detail: "faster processing",
            },
            {
                label: "Audit Compliance",
                value: "100%",
                detail: "full transparency",
            },
        ],
        challenges: [
            "Ghost workers cost governments billions annually",
            "Manual background checks take months to complete",
            "Credential verification across agencies is fragmented",
            "Paper-based records easily manipulated",
            "No real-time visibility into employee credentials",
        ],
        solutions: [
            "Biometric-linked employment credentials",
            "Real-time verification of qualifications and clearances",
            "Cross-agency credential sharing with proper authorization",
            "Automated payroll verification against active employees",
            "Complete audit trail of all credential events",
        ],
        benefits: [
            "Eliminate ghost workers and payroll fraud",
            "Reduce background check time from months to minutes",
            "Enable secure inter-agency credential sharing",
            "Improve government efficiency and transparency",
            "Reduce administrative costs significantly",
            "Build public trust through accountability",
        ],
    },
    {
        id: "land-registry",
        slug: "land-registry-titles",
        icon: "Home",
        title: "Land & Property Registry",
        shortDescription:
            "Blockchain property titles ending double allocation fraud",
        fullDescription:
            "Transform land and property registration with immutable blockchain titles. Land authorities can issue tamper-proof property titles, prevent double allocation, and enable instant ownership verification, bringing transparency to real estate transactions.",
        sector: "Real Estate",
        economicImpact: {
            annualValue: "$213M+",
            numericValue: 213000000,
        },
        roi: {
            timeToValue: "12 months",
            costReduction: "80%",
            efficiencyGain: "95%",
        },
        statistics: [
            {
                label: "Fraud Eliminated",
                value: "95%",
                detail: "of title fraud",
            },
            {
                label: "Transaction Time",
                value: "-70%",
                detail: "faster processing",
            },
            {
                label: "Dispute Resolution",
                value: "80%",
                detail: "reduction in disputes",
            },
            {
                label: "Property Values",
                value: "+15%",
                detail: "increased with clear titles",
            },
        ],
        challenges: [
            "Double allocation and title fraud cost billions annually",
            "Paper-based land records easily forged or destroyed",
            "Property disputes take years to resolve",
            "No way to verify ownership history",
            "Land transactions require expensive intermediaries",
        ],
        solutions: [
            "Immutable blockchain property titles",
            "Complete ownership history on-chain",
            "Real-time ownership verification",
            "Automated transfer and registration",
            "Integration with surveying and cadastral systems",
        ],
        benefits: [
            "Eliminate property fraud and double allocation",
            "Reduce transaction costs by up to 80%",
            "Enable property-backed lending with verified titles",
            "Faster property transactions and registrations",
            "Complete transparency in ownership history",
            "Increase property values through clear titles",
        ],
    },
    {
        id: "tax-compliance",
        slug: "tax-compliance-verification",
        icon: "Receipt",
        title: "Tax Compliance Verification",
        shortDescription: "Real-time tax clearance validation",
        fullDescription:
            "Enable real-time tax compliance verification for businesses and individuals. Tax authorities can issue verifiable tax clearance certificates, while businesses can instantly verify supplier compliance, reducing tax evasion and improving collection rates.",
        sector: "Government Finance",
        economicImpact: {
            annualValue: "$35B+",
            numericValue: 35000000000,
        },
        roi: {
            timeToValue: "9 months",
            costReduction: "75%",
            efficiencyGain: "90%",
        },
        statistics: [
            {
                label: "Tax Collection",
                value: "+25%",
                detail: "improved compliance",
            },
            {
                label: "Processing Time",
                value: "-95%",
                detail: "faster clearances",
            },
            {
                label: "Evasion Detection",
                value: "300%",
                detail: "better identification",
            },
            {
                label: "Annual Revenue",
                value: "$35B+",
                detail: "addressable market",
            },
        ],
        challenges: [
            "Tax evasion costs governments trillions globally",
            "Manual tax clearance verification takes days",
            "No real-time visibility into compliance status",
            "Paper certificates easily forged",
            "Cross-border tax verification nearly impossible",
        ],
        solutions: [
            "Real-time tax clearance certificates",
            "Automated compliance status updates",
            "Integration with tax authority systems",
            "Verifiable tax payment history",
            "Cross-border tax compliance verification",
        ],
        benefits: [
            "Increase tax collection through better compliance",
            "Instant tax clearance for procurement",
            "Reduce tax evasion and fraud",
            "Enable real-time compliance monitoring",
            "Streamline cross-border trade compliance",
            "Improve government revenue collection",
        ],
    },
    {
        id: "professional-licensing",
        slug: "professional-licensing",
        icon: "Briefcase",
        title: "Professional Licensing",
        shortDescription:
            "Verify credentials across 50+ professional regulatory bodies",
        fullDescription:
            "Unify professional license verification across engineers, accountants, lawyers, architects, and 50+ other regulated professions. Professional bodies can issue verifiable licenses while employers and clients can instantly confirm practitioner credentials.",
        sector: "Professional Services",
        economicImpact: {
            annualValue: "$1.8B+",
            numericValue: 1800000000,
        },
        roi: {
            timeToValue: "4 months",
            costReduction: "90%",
            efficiencyGain: "95%",
        },
        statistics: [
            {
                label: "Professional Bodies",
                value: "50+",
                detail: "integrated systems",
            },
            {
                label: "Verification Time",
                value: "<10ms",
                detail: "instant confirmation",
            },
            {
                label: "Fraud Prevention",
                value: "98%",
                detail: "of license fraud",
            },
            {
                label: "Cost Reduction",
                value: "90%",
                detail: "verification savings",
            },
        ],
        challenges: [
            "No unified system for professional license verification",
            "Each regulatory body has separate verification processes",
            "Fake professional credentials endanger public safety",
            "Cross-border professional mobility limited by verification",
            "Manual verification is slow and expensive",
        ],
        solutions: [
            "Unified verification portal for all professions",
            "Real-time license status from regulatory bodies",
            "Automated continuing education tracking",
            "Cross-border credential recognition",
            "Instant alerts for license changes",
        ],
        benefits: [
            "Protect public from unqualified practitioners",
            "Enable professional mobility across borders",
            "Reduce verification costs by 90%",
            "Streamline regulatory compliance",
            "Improve professional accountability",
            "Build trust in professional services",
        ],
    },
    {
        id: "oil-gas",
        slug: "oil-gas-certifications",
        icon: "Flame",
        title: "Oil & Gas Certifications",
        shortDescription: "Safety certification verification for high-risk industries",
        fullDescription:
            "Ensure safety compliance in oil, gas, and energy industries through verifiable safety certifications. Operators can instantly verify worker safety training, equipment certifications, and compliance credentials, preventing accidents and saving lives.",
        sector: "Energy",
        economicImpact: {
            annualValue: "$137M+",
            numericValue: 137000000,
        },
        roi: {
            timeToValue: "3 months",
            costReduction: "85%",
            efficiencyGain: "90%",
        },
        statistics: [
            {
                label: "Industrial Deaths",
                value: "-300+",
                detail: "prevented annually",
            },
            {
                label: "Compliance Rate",
                value: "100%",
                detail: "safety certification",
            },
            {
                label: "Verification Speed",
                value: "Instant",
                detail: "at point of entry",
            },
            {
                label: "Insurance Savings",
                value: "20%",
                detail: "reduced premiums",
            },
        ],
        challenges: [
            "300+ industrial deaths annually from unqualified workers",
            "Safety certifications difficult to verify at job sites",
            "Expired certifications often go undetected",
            "Paper certificates easily lost or forged",
            "Contractor compliance tracking is manual and error-prone",
        ],
        solutions: [
            "Real-time safety certification verification",
            "Automated expiry alerts and renewals",
            "Mobile verification at job site entry",
            "Contractor compliance dashboards",
            "Integration with safety training providers",
        ],
        benefits: [
            "Save lives through verified safety compliance",
            "Instant verification at job site entry",
            "Reduce industrial accidents significantly",
            "Lower insurance premiums through compliance",
            "Automated contractor credential management",
            "Meet regulatory requirements effortlessly",
        ],
    },
    {
        id: "judiciary",
        slug: "judiciary-authentication",
        icon: "Scale",
        title: "Judiciary Authentication",
        shortDescription: "Legal document verification and court record authentication",
        fullDescription:
            "Bring trust and efficiency to the judicial system through verifiable legal documents. Courts can issue blockchain-anchored judgments, powers of attorney, and legal certificates that can be instantly verified, reducing fraud and expediting legal processes.",
        sector: "Legal",
        economicImpact: {
            annualValue: "$78M+",
            numericValue: 78000000,
        },
        roi: {
            timeToValue: "6 months",
            costReduction: "70%",
            efficiencyGain: "85%",
        },
        statistics: [
            {
                label: "Document Fraud",
                value: "-95%",
                detail: "reduction in forgery",
            },
            {
                label: "Processing Time",
                value: "-80%",
                detail: "faster verification",
            },
            {
                label: "Court Efficiency",
                value: "+50%",
                detail: "improved throughput",
            },
            {
                label: "Public Trust",
                value: "+40%",
                detail: "in judicial system",
            },
        ],
        challenges: [
            "Forged legal documents undermine judicial authority",
            "Manual verification of court documents takes weeks",
            "No way to verify authenticity of legal certificates",
            "Paper records vulnerable to manipulation",
            "Cross-jurisdiction document verification is complex",
        ],
        solutions: [
            "Blockchain-anchored court documents",
            "Real-time verification of legal certificates",
            "Complete audit trail of document history",
            "Secure power of attorney issuance",
            "Cross-jurisdiction document recognition",
        ],
        benefits: [
            "Eliminate legal document fraud",
            "Instant verification for all parties",
            "Reduce court administrative burden",
            "Enable secure online legal processes",
            "Improve public trust in judicial system",
            "Streamline cross-border legal matters",
        ],
    },
    {
        id: "national-identity",
        slug: "national-identity-hub",
        icon: "Fingerprint",
        title: "National Identity Hub",
        shortDescription: "Cross-sector credential passport for citizens",
        fullDescription:
            "Create a unified national identity ecosystem where citizens carry portable, verifiable credentials across all sectors. A single identity hub connects education, healthcare, employment, and government services, enabling seamless interaction while protecting privacy.",
        sector: "Government",
        economicImpact: {
            annualValue: "$3.4B+",
            numericValue: 3400000000,
        },
        roi: {
            timeToValue: "24 months",
            costReduction: "60%",
            efficiencyGain: "80%",
        },
        statistics: [
            {
                label: "Citizens Served",
                value: "35M+",
                detail: "national coverage",
            },
            {
                label: "Services Integrated",
                value: "100+",
                detail: "government services",
            },
            {
                label: "Identity Fraud",
                value: "-90%",
                detail: "reduction",
            },
            {
                label: "Service Delivery",
                value: "+300%",
                detail: "faster access",
            },
        ],
        challenges: [
            "Fragmented identity systems across government agencies",
            "Citizens must repeatedly prove identity for each service",
            "Identity fraud costs billions annually",
            "No portable credential system for citizens",
            "Privacy concerns with centralized databases",
        ],
        solutions: [
            "Unified identity credential ecosystem",
            "Privacy-preserving verification with ZKPs",
            "Portable credentials across all sectors",
            "Citizen-controlled identity sharing",
            "Integration with all government services",
        ],
        benefits: [
            "Seamless access to all government services",
            "Citizen ownership and control of identity",
            "Eliminate identity fraud at national scale",
            "Reduce service delivery costs by 60%",
            "Enable digital-first government services",
            "Align with Vision 2030 digital transformation",
        ],
    },
];

export function getUseCaseBySlug(slug: string): TrustMeHubUseCase | undefined {
    return trustMeHubUseCases.find((uc) => uc.slug === slug);
}

export function getUseCaseById(id: string): TrustMeHubUseCase | undefined {
    return trustMeHubUseCases.find((uc) => uc.id === id);
}

export function getRelatedUseCases(
    currentSlug: string,
    limit: number = 3
): TrustMeHubUseCase[] {
    return trustMeHubUseCases
        .filter((uc) => uc.slug !== currentSlug)
        .slice(0, limit);
}

export const totalEconomicImpact = trustMeHubUseCases.reduce(
    (sum, uc) => sum + uc.economicImpact.numericValue,
    0
);
