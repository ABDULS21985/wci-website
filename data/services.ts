import type { ServiceCategory } from "@/types/services";

export const serviceCategories: ServiceCategory[] = [
    {
        id: "cybersecurity",
        name: "Cybersecurity and Risk Management Advisory",
        shortName: "Cybersecurity",
        description:
            "Building resilient defences for critical infrastructure with alignment to QCB, NIA, and ISO standards.",
        icon: "ShieldCheck",
        services: [
            {
                id: "cyber-strategy",
                name: "Cybersecurity Strategy Roadmapping",
                description:
                    "Multi-year security transformation planning aligned with business objectives.",
                icon: "Map",
                deliverables: ["Strategic roadmap", "Budget planning", "KPIs"],
            },
            {
                id: "policy-development",
                name: "IT Policy Development",
                description:
                    "Comprehensive security policy frameworks tailored to your organization.",
                icon: "FileText",
                deliverables: ["Policy documents", "Procedures", "Standards"],
            },
            {
                id: "risk-assessment",
                name: "Security Risk Assessments",
                description:
                    "Identify vulnerabilities before attackers do with comprehensive assessments.",
                icon: "Search",
                deliverables: ["Risk register", "Remediation priorities"],
            },
            {
                id: "compliance-gap",
                name: "Compliance Gap Analysis",
                description:
                    "QCB, NIA, and Qatar Data Protection Law alignment assessment.",
                icon: "CheckSquare",
                deliverables: ["Gap report", "Remediation roadmap"],
            },
            {
                id: "security-architecture",
                name: "Security Architecture Review",
                description:
                    "Evaluate and strengthen your organization's security posture.",
                icon: "Building",
                deliverables: ["Architecture diagrams", "Recommendations"],
            },
            {
                id: "iam-design",
                name: "Digital Identity & IAM Design",
                description:
                    "Zero-trust access control implementation for modern enterprises.",
                icon: "UserCheck",
                deliverables: ["IAM strategy", "Implementation plan"],
            },
            {
                id: "threat-analysis",
                name: "Advanced Threat Analysis",
                description:
                    "APT hunting and threat intelligence for proactive defense.",
                icon: "AlertTriangle",
                deliverables: ["Threat assessment report", "Indicators"],
            },
        ],
        certifications: [
            "ISO 27001 Lead Implementer",
            "NIST Cybersecurity Framework",
            "QCB Cybersecurity Framework",
            "Qatar NIA Policy Alignment",
        ],
    },
    {
        id: "ai-data",
        name: "Artificial Intelligence and Data Strategy",
        shortName: "AI & Data",
        description:
            "Leveraging data assets for predictive analytics, operational efficiency, and strategic decision-making.",
        icon: "Brain",
        services: [
            {
                id: "ai-roadmap",
                name: "AI Strategy & Roadmap Development",
                description:
                    "Define AI vision aligned with your business objectives.",
                icon: "Compass",
                deliverables: ["AI roadmap", "Use case prioritization"],
            },
            {
                id: "data-governance",
                name: "Data Governance Framework Design",
                description:
                    "ISO 42001-aligned data management for enterprise organizations.",
                icon: "Database",
                deliverables: ["Governance framework", "Policies"],
            },
            {
                id: "predictive-modeling",
                name: "Predictive Modeling Workshops",
                description:
                    "Hands-on ML model development with your data science teams.",
                icon: "LineChart",
                deliverables: ["Working models", "Documentation"],
            },
            {
                id: "ai-ethics",
                name: "AI Ethics & Governance",
                description:
                    "Responsible AI deployment frameworks for regulated industries.",
                icon: "Scale",
                deliverables: ["Ethics guidelines", "Review processes"],
            },
            {
                id: "mlops",
                name: "MLOps Implementation",
                description:
                    "Production AI lifecycle management for scalable deployments.",
                icon: "GitMerge",
                deliverables: ["CI/CD pipelines", "Monitoring dashboards"],
            },
            {
                id: "ai-training",
                name: "Executive AI Capacity Building",
                description:
                    "Board-level AI literacy programs for strategic decision makers.",
                icon: "GraduationCap",
                deliverables: ["Training sessions", "Decision frameworks"],
            },
        ],
        frameworks: [
            "RegTech applications",
            "Fraud detection and AML",
            "Customer analytics",
            "Process automation",
        ],
        certifications: [
            "ISO/IEC 42001:2023 Artificial Intelligence Management System",
            "NIST AI Risk Management Framework",
            "EU AI Act Compliance",
        ],
    },
    {
        id: "blockchain",
        name: "Blockchain and Distributed Ledger Technology",
        shortName: "Blockchain",
        description:
            "Implementing secure, transparent, and immutable solutions for the modern digital economy.",
        icon: "Blocks",
        services: [
            {
                id: "dlt-feasibility",
                name: "DLT Feasibility Studies",
                description:
                    "Evaluate blockchain applicability for your specific use cases.",
                icon: "ClipboardList",
                deliverables: ["Feasibility report", "ROI analysis"],
            },
            {
                id: "smart-contracts",
                name: "Smart Contract Development",
                description:
                    "Secure smart contract design and implementation.",
                icon: "Code",
                deliverables: ["Audited contracts", "Deployment"],
            },
            {
                id: "contract-auditing",
                name: "Smart Contract Auditing",
                description:
                    "Security assessment of existing smart contracts.",
                icon: "ShieldAlert",
                deliverables: ["Audit report", "Vulnerability fixes"],
            },
            {
                id: "dlt-architecture",
                name: "DLT Architecture Design",
                description:
                    "Enterprise blockchain solution architecture for scale.",
                icon: "Network",
                deliverables: ["Technical architecture", "Integration plan"],
            },
            {
                id: "blockchain-overview",
                name: "Blockchain Executive Overview",
                description:
                    "Strategic education for leadership teams on DLT opportunities.",
                icon: "Presentation",
                deliverables: ["Workshop", "Decision framework"],
            },
            {
                id: "tokenomics",
                name: "Token Economics Design",
                description:
                    "Tokenization strategy and implementation guidance.",
                icon: "Coins",
                deliverables: ["Tokenomics model", "Legal considerations"],
            },
        ],
        frameworks: [
            "Hyperledger Fabric (Enterprise)",
            "Ethereum / EVM-compatible",
            "R3 Corda (Financial Services)",
            "Custom private blockchain",
        ],
    },
    {
        id: "it-governance",
        name: "IT Governance, Risk & Compliance",
        shortName: "IT Governance",
        description:
            "Ensuring technology initiatives support business strategy and meet all regulatory requirements.",
        icon: "Scale",
        services: [
            {
                id: "cobit",
                name: "COBIT Implementation",
                description:
                    "IT governance framework deployment for enterprise control.",
                icon: "LayoutGrid",
                deliverables: ["Governance framework", "Metrics"],
            },
            {
                id: "itil",
                name: "ITIL Service Management",
                description:
                    "IT service excellence optimization for operational efficiency.",
                icon: "Cog",
                deliverables: ["Process documentation", "Training"],
            },
            {
                id: "it-risk",
                name: "IT Risk Assessment",
                description:
                    "Technology risk identification and quantification.",
                icon: "AlertCircle",
                deliverables: ["Risk matrix", "Mitigation plan"],
            },
            {
                id: "vendor-risk",
                name: "Third-Party Risk Management",
                description:
                    "Vendor and supplier risk evaluation for secure partnerships.",
                icon: "Users",
                deliverables: ["Assessment framework", "Vendor reports"],
            },
            {
                id: "it-audit",
                name: "IT Audit Support",
                description:
                    "Preparation and support for internal and external IT audits.",
                icon: "FileSearch",
                deliverables: ["Evidence collection", "Remediation"],
            },
            {
                id: "compliance-monitoring",
                name: "Compliance Monitoring",
                description:
                    "Continuous compliance assurance for regulatory peace of mind.",
                icon: "Eye",
                deliverables: ["Monitoring dashboards", "Reports"],
            },
        ],
    },
];

export function getServiceCategoryById(id: string): ServiceCategory | undefined {
    return serviceCategories.find((c) => c.id === id);
}
