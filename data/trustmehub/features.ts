import type { TrustMeHubFeature, FeatureCategoryInfo } from "@/types/trustmehub";

export const featureCategories: FeatureCategoryInfo[] = [
    {
        id: "core",
        name: "Core Platform",
        description: "Essential credential issuance and verification capabilities",
    },
    {
        id: "security",
        name: "Security & Privacy",
        description: "Enterprise-grade security with privacy-preserving technology",
    },
    {
        id: "developer",
        name: "Developer Tools",
        description: "APIs, SDKs, and integration tools for seamless development",
    },
    {
        id: "integration",
        name: "Integration",
        description: "Connect with existing systems and enable mobile access",
    },
    {
        id: "enterprise",
        name: "Enterprise",
        description: "Analytics, reporting, and global deployment capabilities",
    },
];

export const trustMeHubFeatures: TrustMeHubFeature[] = [
    // Core Platform Features
    {
        id: "credential-issuance",
        icon: "FileCheck",
        title: "Credential Issuance & Management",
        description:
            "Issue and manage blockchain-anchored credentials for universities, hospitals, governments, and enterprises. Create tamper-proof credentials that are instantly verifiable worldwide.",
        category: "core",
        highlights: [
            "Bulk credential issuance",
            "Revocation management",
            "Credential templates",
        ],
    },
    {
        id: "real-time-verification",
        icon: "Zap",
        title: "Real-time Verification",
        description:
            "Sub-10 millisecond verification responses (P50 = 3ms, P95 = 8ms) with 92%+ cache hit rates. Transform verification from weeks to milliseconds.",
        category: "core",
        highlights: [
            "<10ms response time",
            "92%+ cache hit rate",
            "100K+ verifications/second",
        ],
    },
    {
        id: "blockchain-anchoring",
        icon: "Link2",
        title: "Blockchain Anchoring",
        description:
            "Hyperledger FireFly integration ensures immutable, tamper-proof credential records. Ethereum-compatible blockchain guarantees credentials cannot be forged or altered.",
        category: "core",
        highlights: [
            "Hyperledger FireFly",
            "Ethereum-compatible",
            "Immutable records",
        ],
    },
    {
        id: "batch-processing",
        icon: "Layers",
        title: "Batch Processing",
        description:
            "Process thousands of credentials simultaneously with intelligent queuing and parallel processing. Ideal for university graduations, mass certifications, and bulk issuance.",
        category: "core",
        highlights: [
            "Parallel processing",
            "Progress tracking",
            "Error handling",
        ],
    },

    // Security & Privacy Features
    {
        id: "multi-tenant",
        icon: "Building2",
        title: "Multi-tenant Architecture",
        description:
            "Complete data isolation through Row-Level Security (RLS) for enterprise deployments. Each organization's data is cryptographically separated and isolated.",
        category: "security",
        highlights: [
            "Row-Level Security",
            "Data isolation",
            "Organization boundaries",
        ],
    },
    {
        id: "zero-knowledge",
        icon: "Eye",
        title: "Zero-Knowledge Proofs",
        description:
            "Enable selective disclosure of credential information without exposing sensitive data. Verify attributes like 'over 21' without revealing actual birthdate.",
        category: "security",
        highlights: [
            "Selective disclosure",
            "Privacy-preserving",
            "Attribute verification",
        ],
    },
    {
        id: "rbac",
        icon: "Shield",
        title: "Role-based Access Control",
        description:
            "40+ granular permissions with customizable roles for fine-grained access control. Define exactly who can issue, verify, revoke, and manage credentials.",
        category: "security",
        highlights: [
            "40+ permissions",
            "Custom roles",
            "Audit logging",
        ],
    },

    // Developer Tools Features
    {
        id: "api-gateway",
        icon: "Code2",
        title: "API Gateway & SDKs",
        description:
            "OpenAPI 3.0 documented APIs with auto-generated SDKs for Node.js, Python, Go, and Rust. Comprehensive documentation and code examples for rapid integration.",
        category: "developer",
        highlights: [
            "OpenAPI 3.0",
            "4 SDK languages",
            "Auto-generated clients",
        ],
    },
    {
        id: "webhook-streaming",
        icon: "Bell",
        title: "Webhook & Event Streaming",
        description:
            "Real-time notifications for credential events including issuance, verification, and revocation. Stream events to external systems for instant updates.",
        category: "developer",
        highlights: [
            "Real-time events",
            "Retry logic",
            "Event filtering",
        ],
    },
    {
        id: "template-designer",
        icon: "PenTool",
        title: "Template Designer",
        description:
            "Drag-and-drop credential template creation with customizable fields, branding, and layouts. Design professional credentials without coding.",
        category: "developer",
        highlights: [
            "Drag-and-drop",
            "Custom branding",
            "Field validation",
        ],
    },

    // Integration Features
    {
        id: "qr-verification",
        icon: "QrCode",
        title: "QR Code Verification",
        description:
            "Instant mobile verification through scannable QR codes embedded in credentials. Anyone with a smartphone can verify credentials in seconds.",
        category: "integration",
        highlights: [
            "Instant scan",
            "No app required",
            "Offline capable",
        ],
    },
    {
        id: "pdf-receipt",
        icon: "FileText",
        title: "PDF Receipt Generation",
        description:
            "Audit-ready verification records with detailed timestamps, verification status, and cryptographic proof. Generate professional receipts for compliance.",
        category: "integration",
        highlights: [
            "Audit-ready",
            "Timestamped",
            "Compliance-friendly",
        ],
    },
    {
        id: "mobile-wallet",
        icon: "Smartphone",
        title: "Mobile Wallet",
        description:
            "iOS and Android app with offline support allowing credential holders to carry and share credentials anywhere. Secure storage with biometric authentication.",
        category: "integration",
        highlights: [
            "iOS & Android",
            "Offline support",
            "Biometric auth",
        ],
    },

    // Enterprise Features
    {
        id: "analytics-dashboard",
        icon: "BarChart3",
        title: "Analytics Dashboard",
        description:
            "Real-time metrics and compliance reporting with customizable dashboards. Track issuance rates, verification volumes, and system health at a glance.",
        category: "enterprise",
        highlights: [
            "Real-time metrics",
            "Custom reports",
            "Export capabilities",
        ],
    },
    {
        id: "multi-language",
        icon: "Globe",
        title: "Multi-language Support",
        description:
            "English, Arabic, French, Spanish, Portuguese, and Chinese support out of the box. Deploy globally with localized interfaces and credential content.",
        category: "enterprise",
        highlights: [
            "6 languages",
            "RTL support",
            "Localized content",
        ],
    },
];

export function getFeaturesByCategory(category: string): TrustMeHubFeature[] {
    return trustMeHubFeatures.filter((f) => f.category === category);
}

export function getFeatureById(id: string): TrustMeHubFeature | undefined {
    return trustMeHubFeatures.find((f) => f.id === id);
}
