import type { Product, ProductPreview } from "@/types/products";

export const products: Product[] = [
    {
        id: "digigate",
        name: "DigiGate",
        tagline: "The Command Center for Your Digital Ecosystem",
        description:
            "DigiGate is a comprehensive API gateway and lifecycle management solution that acts as the centralized control layer for an organization's entire digital infrastructure. It manages all inbound and outbound API traffic while enforcing security, routing policies, and governance at scale.",
        features: [
            {
                icon: "Shield",
                title: "Centralized Security Enforcement",
                description:
                    "OAuth 2.0, JWT validation, rate limiting, and threat protection for all your APIs.",
            },
            {
                icon: "GitBranch",
                title: "Intelligent Traffic Routing",
                description:
                    "Load balancing, failover, API versioning, and canary deployments out of the box.",
            },
            {
                icon: "Layers",
                title: "API Composition & Aggregation",
                description:
                    "Combine multiple microservices into single client responses for optimal performance.",
            },
            {
                icon: "Activity",
                title: "Real-Time Monitoring & Analytics",
                description:
                    "Unified logging, tracing, performance dashboards, and anomaly detection.",
            },
            {
                icon: "Code2",
                title: "Developer Portal",
                description:
                    "Self-service API documentation, sandbox testing, and key management.",
            },
            {
                icon: "Settings",
                title: "Policy Management",
                description:
                    "Configurable security policies, throttling rules, and access controls.",
            },
        ],
        useCases: [
            {
                title: "Financial Institutions",
                description: "Complex integrations with regulatory compliance",
            },
            {
                title: "Government Digital Transformation",
                description: "Secure inter-agency data exchange",
            },
            {
                title: "Enterprise Microservices",
                description: "Unified API layer for distributed architectures",
            },
            {
                title: "Regulatory Compliance",
                description: "PCI-DSS, GDPR, and local regulations",
            },
        ],
        valuePropositions: [
            "Reduce API security incidents by 95%",
            "Decrease integration time from weeks to days",
            "Achieve 99.99% API uptime with intelligent failover",
            "Single pane of glass for all API operations",
        ],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2670&auto=format&fit=crop",
        accentColor: "#1E4DB7",
    },
    {
        id: "digitrust",
        name: "DigiTrust",
        tagline: "Immutable Trust for a Digital World",
        description:
            "DigiTrust, powered by the TrustMe platform, is a blockchain-based solution for issuing, verifying, and managing tamper-proof digital credentials. From educational certificates to professional licenses, land titles to insurance policies, DigiTrust ensures document authenticity is never in question.",
        features: [
            {
                icon: "FileCheck",
                title: "Credential Issuance System",
                description:
                    "Secure generation and blockchain anchoring of digital documents.",
            },
            {
                icon: "QrCode",
                title: "Public Verifier Portal",
                description:
                    "Instant QR code or document ID verification for anyone.",
            },
            {
                icon: "ClipboardCheck",
                title: "Auditor/Admin Console",
                description:
                    "Compliance checks, lifecycle tracking, and security logging.",
            },
            {
                icon: "Plug",
                title: "RESTful API Integration",
                description:
                    "Seamless connection to existing HR, banking, or registry systems.",
            },
            {
                icon: "XCircle",
                title: "Revocation Management",
                description:
                    "Instant credential invalidation with full audit trail.",
            },
            {
                icon: "Building2",
                title: "Multi-Tenant Architecture",
                description:
                    "Support for multiple issuers under single deployment.",
            },
        ],
        useCases: [
            {
                title: "Educational Institutions",
                description: "Issue and verify academic credentials",
            },
            {
                title: "Government Registries",
                description: "Land titles, birth certificates, licenses",
            },
            {
                title: "Insurance Companies",
                description: "Policy documents and claims verification",
            },
            {
                title: "Professional Bodies",
                description: "Certifications and membership credentials",
            },
        ],
        valuePropositions: [
            "Eliminate 100% of document fraud attempts",
            "Reduce verification time from days to seconds",
            "GDPR and Qatar Data Protection Law compliant",
            "Immutable audit trail for regulatory requirements",
        ],
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop",
        accentColor: "#F59A23",
    },
    {
        id: "digitrack",
        name: "DigiTrack",
        tagline: "Complete Visibility Across Your Digital Operations",
        description:
            "DigiTrack provides real-time tracking and traceability for physical assets, digital transactions, and service delivery workflows. Built for industries requiring complete chain-of-custody documentation and operational transparency.",
        features: [
            {
                icon: "MapPin",
                title: "Real-Time Location Tracking",
                description: "GPS, RFID, and IoT sensor integration.",
            },
            {
                icon: "GitCommit",
                title: "Transaction Traceability",
                description:
                    "End-to-end audit trails for financial operations.",
            },
            {
                icon: "Timer",
                title: "Service Delivery Monitoring",
                description:
                    "SLA tracking, escalation management, and performance metrics.",
            },
            {
                icon: "Link",
                title: "Chain of Custody",
                description:
                    "Immutable handoff records for regulated industries.",
            },
            {
                icon: "TrendingUp",
                title: "Predictive Analytics",
                description:
                    "ML-powered anomaly detection and forecasting.",
            },
            {
                icon: "LayoutDashboard",
                title: "Custom Dashboards",
                description:
                    "Role-based views with drill-down capabilities.",
            },
        ],
        useCases: [
            {
                title: "Supply Chain",
                description: "Track goods from origin to delivery",
            },
            {
                title: "Financial Services",
                description: "Transaction lifecycle monitoring",
            },
            {
                title: "Healthcare",
                description: "Medical device and specimen tracking",
            },
            {
                title: "Energy Sector",
                description: "Equipment maintenance and compliance",
            },
        ],
        valuePropositions: [
            "100% visibility into asset locations and states",
            "Reduce operational losses by 40%",
            "Automated compliance reporting",
            "Predictive maintenance reduces downtime by 60%",
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        accentColor: "#E86A1D",
    },
    {
        id: "trustmehub",
        name: "TrustMeHub",
        tagline: "Building Trust. Empowering Growth.",
        description:
            "TrustMeHub is a global digital trust infrastructure for instant, blockchain-anchored credential verification. Verify any credential in milliseconds, not weeks. From educational certificates to professional licenses, land titles to healthcare credentials, TrustMeHub ensures authenticity at national scale.",
        features: [
            {
                icon: "Zap",
                title: "Instant Verification",
                description:
                    "Sub-10ms verification responses with 92%+ cache hit rates. Transform weeks into milliseconds.",
            },
            {
                icon: "Link2",
                title: "Blockchain Anchoring",
                description:
                    "Hyperledger FireFly integration ensures immutable, tamper-proof credential records.",
            },
            {
                icon: "Eye",
                title: "Zero-Knowledge Proofs",
                description:
                    "Selective disclosure enables privacy-preserving verification without exposing sensitive data.",
            },
            {
                icon: "Building2",
                title: "Multi-Tenant Architecture",
                description:
                    "Enterprise-grade Row-Level Security for complete data isolation across organizations.",
            },
            {
                icon: "Smartphone",
                title: "Mobile Wallet",
                description:
                    "iOS and Android apps with offline support for credential holders.",
            },
            {
                icon: "Globe",
                title: "Multi-Language Support",
                description:
                    "English, Arabic, French, Spanish, Portuguese, and Chinese out of the box.",
            },
        ],
        useCases: [
            {
                title: "Education Verification",
                description: "Eliminate 40% global credential fraud",
            },
            {
                title: "Banking & KYC",
                description: "Reduce KYC from days to minutes",
            },
            {
                title: "Healthcare Licensing",
                description: "Verify 600K+ medical professionals",
            },
            {
                title: "Government Services",
                description: "National identity and employment verification",
            },
        ],
        valuePropositions: [
            "Verify credentials in <10ms instead of 4-6 weeks",
            "Reduce verification costs by 99% ($0.10 vs $50-500)",
            "Eliminate 98% of credential fraud attempts",
            "100,000+ verifications per second capacity",
        ],
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2670&auto=format&fit=crop",
        accentColor: "#10B981",
    },
    {
        id: "boacrm",
        name: "BoaCRM",
        tagline: "The Operating System for Customer Relationships",
        description:
            "BoaCRM is a comprehensive enterprise-grade CRM platform purpose-built for African financial institutions. With 35 integrated modules, native compliance for NDPR/KYC/AML, and omnichannel engagement capabilities, it transforms how banks manage customer relationships at scale.",
        features: [
            {
                icon: "Users",
                title: "Customer 360",
                description:
                    "Golden record management with multi-source deduplication, relationship mapping, and data quality scoring.",
            },
            {
                icon: "MessageSquare",
                title: "Omnichannel Engagement",
                description:
                    "Unified console for WhatsApp, SMS, email, voice, and in-branch interactions with intelligent routing.",
            },
            {
                icon: "Phone",
                title: "Contact Center Suite",
                description:
                    "Complete IVR, ACD, quality assurance, workforce management, and real-time supervisor dashboards.",
            },
            {
                icon: "ShieldCheck",
                title: "Compliance & Governance",
                description:
                    "Native NDPR/NDPA compliance, BVN/NIN verification, KYC/AML workflows, tamper-evident audit trails, and ISO/IEC 42001:2023 alignment.",
            },
            {
                icon: "Bot",
                title: "Conversational AI",
                description:
                    "Full chatbot builder with intent/entity management, 24/7 availability, and seamless human escalation.",
            },
            {
                icon: "BarChart3",
                title: "ML-Powered Analytics",
                description:
                    "Churn prediction, propensity scoring, RFM analysis, and real-time dashboards with WebSocket updates.",
            },
        ],
        useCases: [
            {
                title: "Commercial Banks",
                description: "Complete CRM for tier-1 and tier-2 banks",
            },
            {
                title: "Microfinance Banks",
                description: "Scalable solution for 900+ Nigerian MFBs",
            },
            {
                title: "Payment Service Providers",
                description: "Customer management for PSPs and fintechs",
            },
            {
                title: "Insurance Companies",
                description: "Policyholder relationship management",
            },
        ],
        valuePropositions: [
            "35 integrated modules covering complete banking CRM",
            "3-5x more affordable than Salesforce or Dynamics",
            "Native African compliance (NDPR, KYC/AML, BVN/NIN)",
            "2M+ customers managed in production",
        ],
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2670&auto=format&fit=crop",
        accentColor: "#6366F1",
    },
];

export const productPreviews: ProductPreview[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    tagline: product.tagline,
    shortDescription: product.description.slice(0, 150) + "...",
    image: product.image,
    slug: product.id,
}));

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
}
