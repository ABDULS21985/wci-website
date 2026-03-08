import type { PricingTier, ComparisonMetric } from "@/types/trustmehub";

export const pricingTiers: PricingTier[] = [
    {
        id: "free",
        name: "Free",
        price: "$0",
        priceNumeric: 0,
        billingPeriod: "monthly",
        verifications: "500",
        verificationsNumeric: 500,
        description: "Perfect for testing and small projects",
        features: [
            "500 verifications/month",
            "Basic API access",
            "QR code verification",
            "Standard templates",
            "Community support",
            "Basic analytics",
        ],
        ctaLabel: "Get Started Free",
        ctaHref: "/contact?plan=free",
    },
    {
        id: "pro",
        name: "Pro",
        price: "$99",
        priceNumeric: 99,
        billingPeriod: "monthly",
        verifications: "50,000",
        verificationsNumeric: 50000,
        description: "For growing organizations",
        features: [
            "50,000 verifications/month",
            "Full API & SDK access",
            "Custom credential templates",
            "Webhook integrations",
            "Priority email support",
            "Advanced analytics dashboard",
            "Multi-language support",
            "PDF receipt generation",
            "Batch processing",
        ],
        highlighted: true,
        ctaLabel: "Start Pro Trial",
        ctaHref: "/contact?plan=pro",
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: "Custom",
        priceNumeric: -1,
        billingPeriod: "custom",
        verifications: "Unlimited",
        verificationsNumeric: -1,
        description: "For national-scale deployments",
        features: [
            "Unlimited verifications",
            "Dedicated infrastructure",
            "Zero-Knowledge Proofs",
            "Multi-tenant architecture",
            "99.9% uptime SLA",
            "On-premise deployment option",
            "24/7 enterprise support",
            "Custom integrations",
            "Compliance certifications",
            "Dedicated account manager",
            "Custom SLAs",
            "White-label options",
        ],
        ctaLabel: "Contact Sales",
        ctaHref: "/contact?plan=enterprise",
    },
];

export const comparisonMetrics: ComparisonMetric[] = [
    {
        metric: "Verification Time",
        icon: "Clock",
        traditional: {
            value: "4-6 weeks",
            detail: "Manual background checks and document verification",
        },
        trustmehub: {
            value: "<10ms",
            detail: "Real-time blockchain verification",
        },
        improvement: "99.99% faster",
    },
    {
        metric: "Cost per Verification",
        icon: "DollarSign",
        traditional: {
            value: "$50-500",
            detail: "Per verification including labor and third-party fees",
        },
        trustmehub: {
            value: "$0.10-0.50",
            detail: "Automated verification at scale",
        },
        improvement: "99% cost reduction",
    },
    {
        metric: "Fraud Detection Rate",
        icon: "ShieldCheck",
        traditional: {
            value: "60-70%",
            detail: "Many fraudulent credentials go undetected",
        },
        trustmehub: {
            value: "99%+",
            detail: "Blockchain immutability prevents forgery",
        },
        improvement: "98% fraud eliminated",
    },
    {
        metric: "Scalability",
        icon: "TrendingUp",
        traditional: {
            value: "Limited",
            detail: "Manual processes don't scale",
        },
        trustmehub: {
            value: "100K+/sec",
            detail: "National-scale capacity",
        },
        improvement: "Unlimited scale",
    },
    {
        metric: "Data Security",
        icon: "Lock",
        traditional: {
            value: "Variable",
            detail: "Depends on provider security practices",
        },
        trustmehub: {
            value: "Enterprise-grade",
            detail: "SOC 2, ISO 27001, blockchain immutability",
        },
        improvement: "Maximum security",
    },
    {
        metric: "Global Interoperability",
        icon: "Globe",
        traditional: {
            value: "None",
            detail: "Siloed systems, no cross-border verification",
        },
        trustmehub: {
            value: "W3C Compliant",
            detail: "Global credential standards support",
        },
        improvement: "Full interoperability",
    },
];

export const faqItems = [
    {
        question: "What happens if I exceed my monthly verification limit?",
        answer: "On the Free plan, additional verifications are paused until the next billing cycle. Pro plan users can purchase additional verification packs at $0.002 per verification. Enterprise plans have no limits.",
    },
    {
        question: "Can I upgrade or downgrade my plan at any time?",
        answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the start of your next billing cycle. Pro-rated credits are applied for upgrades.",
    },
    {
        question: "Is there a free trial for the Pro plan?",
        answer: "Yes, we offer a 14-day free trial of the Pro plan with full features. No credit card required to start. You can continue on the Free plan if Pro doesn't meet your needs.",
    },
    {
        question: "What support is included with each plan?",
        answer: "Free: Community forums and documentation. Pro: Priority email support with 24-hour response time. Enterprise: 24/7 phone and email support with dedicated account manager and custom SLAs.",
    },
    {
        question: "Do you offer discounts for annual billing?",
        answer: "Yes, annual billing provides a 20% discount on the Pro plan ($79/month billed annually). Enterprise pricing is customized based on requirements.",
    },
    {
        question: "What compliance certifications does TrustMeHub have?",
        answer: "TrustMeHub is SOC 2 Type II certified, ISO 27001 certified, GDPR compliant, Saudi PDPL aligned, and W3C Verifiable Credentials compliant. Enterprise plans include compliance documentation and audit support.",
    },
];

export function getPricingTierById(id: string): PricingTier | undefined {
    return pricingTiers.find((tier) => tier.id === id);
}
