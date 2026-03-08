// ============================================
// INDUSTRIES DATA
// ============================================

export interface IndustryStat {
    value: string;
    label: string;
}

export interface Industry {
    id: string;
    slug: string;
    name: string;
    description: string;
    heroImage: string;
    icon: string;
    accentColor: string;
    challenges: string[];
    solutions: string[];
    relatedServices: string[];
    stats: IndustryStat[];
}

export const industries: Industry[] = [
    {
        id: "1",
        slug: "financial-services",
        name: "Financial Services",
        description: "Empowering banks, fintech, insurance companies, and financial regulators with secure, compliant, and innovative digital solutions that drive growth and operational excellence.",
        heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop",
        icon: "Landmark",
        accentColor: "#1E4DB7",
        challenges: [
            "Increasing regulatory compliance requirements and evolving financial regulations",
            "Legacy system modernization while maintaining operational continuity",
            "Rising cybersecurity threats and sophisticated fraud attempts",
            "Customer expectations for seamless digital banking experiences",
            "Data silos preventing unified customer insights and analytics",
            "Open banking and API integration complexities",
            "Real-time payment processing and settlement requirements",
        ],
        solutions: [
            "Core banking modernization with cloud-native architectures",
            "AI-powered fraud detection and risk management systems",
            "Digital identity and IAM/PAM implementation for secure access",
            "Open banking API platforms enabling third-party integrations",
            "RegTech solutions for automated compliance monitoring",
            "Customer 360 analytics platforms for personalized services",
            "CBDC and digital currency implementation expertise",
            "Cybersecurity operations center (SOC) setup and management",
        ],
        relatedServices: [
            "Cybersecurity",
            "AI & Data",
            "Cloud & Platform",
            "GRC",
            "Engineering",
            "Digital Transformation",
        ],
        stats: [
            { value: "50M+", label: "Transactions Secured" },
            { value: "99.99%", label: "System Uptime" },
            { value: "40%", label: "Cost Reduction" },
            { value: "15+", label: "Banks Served" },
        ],
    },
    {
        id: "2",
        slug: "healthcare",
        name: "Healthcare",
        description: "Transforming healthcare delivery through digital innovation, enabling better patient outcomes, operational efficiency, and data-driven clinical decisions.",
        heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1600&h=900&fit=crop",
        icon: "Heart",
        accentColor: "#EC4899",
        challenges: [
            "Fragmented patient data across multiple systems and providers",
            "Strict privacy and compliance requirements (HIPAA, local regulations)",
            "High administrative burden reducing clinical care time",
            "Legacy infrastructure limiting telemedicine adoption",
            "Cybersecurity vulnerabilities in connected medical devices",
            "Rising operational costs and resource constraints",
            "Need for real-time analytics to improve patient outcomes",
        ],
        solutions: [
            "Electronic Health Record (EHR) integration and modernization",
            "AI-powered clinical decision support systems",
            "Telemedicine platform development and implementation",
            "Healthcare data analytics and predictive modeling",
            "Medical device security and IoMT protection",
            "HIPAA-compliant cloud infrastructure",
            "Patient engagement portals and mobile applications",
            "Healthcare workflow automation and optimization",
        ],
        relatedServices: [
            "AI & Data",
            "Cybersecurity",
            "Digital Transformation",
            "Cloud & Platform",
            "Engineering",
            "GRC",
        ],
        stats: [
            { value: "35%", label: "Reduced Readmissions" },
            { value: "2.5M", label: "Patients Impacted" },
            { value: "40%", label: "Admin Time Saved" },
            { value: "$12M", label: "Annual Savings" },
        ],
    },
    {
        id: "3",
        slug: "government",
        name: "Government",
        description: "Enabling digital government transformation with citizen-centric services, transparent operations, and secure infrastructure that builds public trust.",
        heroImage: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1600&h=900&fit=crop",
        icon: "Building2",
        accentColor: "#0369A1",
        challenges: [
            "Outdated legacy systems hindering service delivery",
            "Citizen expectations for modern digital services",
            "Cross-agency data sharing and interoperability issues",
            "Cybersecurity threats targeting critical infrastructure",
            "Budget constraints limiting technology investments",
            "Digital divide affecting service accessibility",
            "Regulatory compliance across multiple jurisdictions",
        ],
        solutions: [
            "Citizen service portals and mobile government apps",
            "Government cloud migration and modernization",
            "Digital identity and authentication systems",
            "Open data platforms and APIs for transparency",
            "Smart city infrastructure and IoT integration",
            "Public sector cybersecurity frameworks",
            "AI-powered citizen service automation",
            "Inter-agency data sharing platforms",
        ],
        relatedServices: [
            "Public Sector",
            "Cybersecurity",
            "Digital Transformation",
            "Cloud & Platform",
            "GRC",
            "Engineering",
        ],
        stats: [
            { value: "80%", label: "Faster Service Delivery" },
            { value: "150+", label: "Services Digitized" },
            { value: "78%", label: "Citizen Satisfaction" },
            { value: "100K", label: "Daily Transactions" },
        ],
    },
    {
        id: "4",
        slug: "telecommunications",
        name: "Telecommunications",
        description: "Driving telco transformation through network modernization, customer experience enhancement, and operational excellence in an increasingly connected world.",
        heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=900&fit=crop",
        icon: "Radio",
        accentColor: "#6366F1",
        challenges: [
            "Network infrastructure modernization and 5G rollout",
            "Intense competition driving need for differentiation",
            "Customer churn and retention challenges",
            "Legacy BSS/OSS systems limiting agility",
            "Cybersecurity threats across expanding attack surfaces",
            "Data monetization and analytics capabilities",
            "Operational efficiency and cost optimization pressures",
        ],
        solutions: [
            "Network function virtualization (NFV) and SDN implementation",
            "Customer experience transformation and omnichannel engagement",
            "AI-powered network operations and predictive maintenance",
            "BSS/OSS modernization and cloud migration",
            "Telecom-specific cybersecurity and fraud prevention",
            "Customer 360 analytics and churn prediction",
            "Revenue assurance and billing optimization",
            "Digital channel development and self-service portals",
        ],
        relatedServices: [
            "Customer Experience",
            "Digital Transformation",
            "Cybersecurity",
            "Cloud & Platform",
            "AI & Data",
            "Engineering",
        ],
        stats: [
            { value: "95%", label: "Fewer Security Incidents" },
            { value: "80M", label: "Subscribers Protected" },
            { value: "30%", label: "Churn Reduction" },
            { value: "12", label: "Countries Served" },
        ],
    },
    {
        id: "5",
        slug: "logistics",
        name: "Logistics",
        description: "Optimizing supply chain operations through intelligent automation, real-time visibility, and data-driven decision making for competitive advantage.",
        heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&h=900&fit=crop",
        icon: "Truck",
        accentColor: "#F59A23",
        challenges: [
            "Lack of real-time visibility across supply chain",
            "Manual processes leading to inefficiencies and errors",
            "Rising customer expectations for faster delivery",
            "Fleet management and route optimization complexity",
            "Inventory management and demand forecasting accuracy",
            "Integration challenges across multiple systems and partners",
            "Sustainability and carbon footprint reduction pressures",
        ],
        solutions: [
            "IoT-enabled fleet tracking and management",
            "AI-powered route optimization and demand forecasting",
            "Warehouse automation and robotics integration",
            "Real-time supply chain visibility platforms",
            "Predictive maintenance for fleet and equipment",
            "Last-mile delivery optimization solutions",
            "Blockchain-based supply chain traceability",
            "Sustainability analytics and carbon tracking",
        ],
        relatedServices: [
            "AI & Data",
            "Digital Transformation",
            "Engineering",
            "Cloud & Platform",
            "Operations Excellence",
            "Customer Experience",
        ],
        stats: [
            { value: "30%", label: "Faster Deliveries" },
            { value: "$8M", label: "Annual Savings" },
            { value: "88%", label: "Fleet Utilization" },
            { value: "70%", label: "Fewer Breakdowns" },
        ],
    },
];

// Helper functions
export function getIndustryBySlug(slug: string): Industry | undefined {
    return industries.find((industry) => industry.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
    return industries.map((industry) => industry.slug);
}

export function getIndustryById(id: string): Industry | undefined {
    return industries.find((industry) => industry.id === id);
}
