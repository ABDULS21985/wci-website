// ============================================
// CASE STUDIES DATA
// ============================================

export interface CaseStudyMetric {
    value: string;
    label: string;
}

export interface CaseStudy {
    id: string;
    slug: string;
    title: string;
    client: string;
    industry: string;
    services: string[];
    heroImage: string;
    thumbnail: string;
    excerpt: string;
    challenge: string;
    solution: string;
    results: string;
    metrics: CaseStudyMetric[];
    testimonial?: {
        quote: string;
        author: string;
        role: string;
        company: string;
    };
    technologies: string[];
    duration: string;
    teamSize: string;
    featured: boolean;
    publishedAt: string;
}

export const caseStudies: CaseStudy[] = [
    {
        id: "1",
        slug: "central-bank-digital-currency-implementation",
        title: "Central Bank Digital Currency Implementation",
        client: "Central Bank of West Africa",
        industry: "Financial Services",
        services: ["Digital Strategy", "Cybersecurity", "Cloud Infrastructure"],
        heroImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&h=900&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
        excerpt: "Leading the digital transformation of national currency infrastructure with a secure, scalable CBDC platform serving 50 million citizens.",
        challenge: `The Central Bank faced the monumental challenge of modernizing their monetary infrastructure while ensuring absolute security and seamless integration with existing financial systems. Legacy systems were reaching end-of-life, cross-border transactions were slow and expensive, and there was increasing pressure to provide financial inclusion for the unbanked population.

Key challenges included:
- Ensuring 99.999% uptime for critical financial infrastructure
- Meeting strict regulatory compliance across multiple jurisdictions
- Integrating with 200+ existing financial institutions
- Building security that could withstand nation-state level threats
- Creating an accessible system for both digital-native and traditional users`,
        solution: `We designed and implemented a comprehensive CBDC solution built on a private blockchain infrastructure with multiple redundancy layers. Our approach combined cutting-edge technology with deep financial services expertise.

The solution included:
- Custom-built distributed ledger technology optimized for high-throughput transactions
- Multi-layer security architecture with hardware security modules (HSMs)
- API gateway for seamless bank integration
- Mobile-first digital wallet application supporting offline transactions
- Real-time monitoring and fraud detection using AI/ML
- Comprehensive KYC/AML compliance system`,
        results: `The implementation transformed the nation's financial infrastructure, bringing millions of previously unbanked citizens into the formal economy while dramatically reducing transaction costs and settlement times.

The platform now processes over 2 million daily transactions with zero security incidents since launch. Cross-border remittances that previously took 3-5 days now settle in seconds, saving citizens an estimated $50M annually in fees.`,
        metrics: [
            { value: "50M", label: "Citizens Served" },
            { value: "99.999%", label: "System Uptime" },
            { value: "$50M", label: "Annual Savings" },
            { value: "2M+", label: "Daily Transactions" },
        ],
        testimonial: {
            quote: "Global Digitalbit delivered a world-class CBDC platform that has positioned our nation as a leader in financial innovation. Their expertise in both technology and financial services was invaluable.",
            author: "Dr. Ibrahim Hassan",
            role: "Deputy Governor",
            company: "Central Bank of West Africa",
        },
        technologies: ["Blockchain", "Kubernetes", "PostgreSQL", "React Native", "TensorFlow", "AWS GovCloud"],
        duration: "18 months",
        teamSize: "35+ specialists",
        featured: true,
        publishedAt: "2024-06-15",
    },
    {
        id: "2",
        slug: "enterprise-cybersecurity-transformation",
        title: "Enterprise Cybersecurity Transformation",
        client: "Pan-African Telecommunications",
        industry: "Telecommunications",
        services: ["Cybersecurity", "Managed Detection", "Risk & Compliance"],
        heroImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&h=900&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
        excerpt: "Comprehensive security overhaul protecting 80 million subscribers across 12 countries with 24/7 threat monitoring and response.",
        challenge: `The telecommunications provider was facing escalating cyber threats, with attempted breaches increasing 300% year-over-year. Their fragmented security infrastructure across 12 countries created blind spots, and incident response times averaged 72 hours—far too slow in today's threat landscape.

Critical issues included:
- 12 different security tools with no unified visibility
- Compliance gaps in multiple regulatory jurisdictions
- Shortage of skilled security personnel across regions
- Legacy systems with known vulnerabilities
- No formal incident response procedures`,
        solution: `We implemented a unified Security Operations Center (SOC) with AI-powered threat detection and automated response capabilities. The solution centralized security monitoring while respecting local regulatory requirements.

Key components:
- 24/7 SOC with local and centralized monitoring teams
- SIEM platform with custom detection rules for telecom threats
- Automated threat response playbooks reducing manual intervention
- Zero Trust architecture implementation
- Comprehensive employee security awareness program
- Regular penetration testing and red team exercises`,
        results: `The transformation reduced mean time to detect threats from 72 hours to under 5 minutes, while mean time to respond dropped from 72 hours to 15 minutes. The company achieved compliance certifications in all 12 operating countries and saw a 95% reduction in successful phishing attempts.`,
        metrics: [
            { value: "95%", label: "Fewer Security Incidents" },
            { value: "<5min", label: "Threat Detection Time" },
            { value: "80M", label: "Subscribers Protected" },
            { value: "12", label: "Countries Secured" },
        ],
        testimonial: {
            quote: "The security transformation by Global Digitalbit has been nothing short of remarkable. We went from being reactive to proactive, and our customers trust us more than ever with their data.",
            author: "Grace Okonkwo",
            role: "Chief Information Security Officer",
            company: "Pan-African Telecommunications",
        },
        technologies: ["Splunk SIEM", "CrowdStrike", "Palo Alto Networks", "Okta", "Microsoft Defender", "Custom AI Models"],
        duration: "12 months",
        teamSize: "25+ specialists",
        featured: true,
        publishedAt: "2024-03-20",
    },
    {
        id: "3",
        slug: "ai-powered-healthcare-analytics",
        title: "AI-Powered Healthcare Analytics Platform",
        client: "Regional Healthcare Network",
        industry: "Healthcare",
        services: ["Data & AI", "Cloud Infrastructure", "Software Development"],
        heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1600&h=900&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
        excerpt: "Revolutionizing patient outcomes with predictive analytics, reducing hospital readmissions by 35% and saving $12M annually.",
        challenge: `The healthcare network comprising 15 hospitals and 200+ clinics was struggling with siloed patient data, inefficient resource allocation, and high readmission rates. Clinical staff spent excessive time on administrative tasks rather than patient care, and there was no way to identify at-risk patients proactively.

Key challenges:
- Patient records scattered across 15 different systems
- No predictive capabilities for patient deterioration
- Inefficient bed and resource management
- High 30-day readmission rates (22%)
- Physician burnout from administrative burden`,
        solution: `We developed a comprehensive healthcare analytics platform powered by machine learning, unifying patient data and providing actionable insights to clinicians at the point of care.

The platform includes:
- Unified data lake aggregating records from all facilities
- Real-time patient risk scoring using ML models
- Predictive models for readmission risk, sepsis, and falls
- Natural language processing for clinical documentation
- Mobile dashboard for clinicians with push notifications
- Integration with existing EMR systems`,
        results: `The platform transformed clinical decision-making, enabling proactive interventions that reduced 30-day readmissions by 35%. The AI-assisted documentation reduced physician administrative time by 40%, allowing more focus on patient care. Total annual savings exceeded $12M.`,
        metrics: [
            { value: "35%", label: "Fewer Readmissions" },
            { value: "$12M", label: "Annual Cost Savings" },
            { value: "40%", label: "Less Admin Time" },
            { value: "2.5M", label: "Patients Impacted" },
        ],
        testimonial: {
            quote: "This platform has genuinely transformed how we deliver care. For the first time, we can anticipate patient needs rather than just react to crises. The impact on patient outcomes has been profound.",
            author: "Dr. Amara Chukwu",
            role: "Chief Medical Officer",
            company: "Regional Healthcare Network",
        },
        technologies: ["Python", "TensorFlow", "Apache Spark", "Snowflake", "React", "FHIR", "Azure Health"],
        duration: "14 months",
        teamSize: "20+ specialists",
        featured: true,
        publishedAt: "2024-01-10",
    },
    {
        id: "4",
        slug: "digital-transformation-government-services",
        title: "Digital Transformation of Government Services",
        client: "Ministry of Digital Economy",
        industry: "Government",
        services: ["Digital Strategy", "Cloud Infrastructure", "Software Development"],
        heroImage: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1600&h=900&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&h=600&fit=crop",
        excerpt: "Modernizing citizen services with a unified digital platform, reducing service delivery time by 80% and improving satisfaction scores.",
        challenge: `Citizens faced long queues and bureaucratic hurdles to access basic government services. Paper-based processes were slow, error-prone, and created opportunities for corruption. The average time to complete a simple business registration was 45 days, and citizen satisfaction with government services was at an all-time low of 23%.

Core issues:
- 150+ government services with no digital option
- Average 45-day wait for business registration
- No visibility into application status
- High rate of errors in manual processing
- Widespread frustration among citizens`,
        solution: `We designed and implemented a citizen-centric digital services platform that unified access to government services through web and mobile channels, with a focus on simplicity and transparency.

Platform features:
- Single sign-on access to all government services
- Mobile-first design with offline capabilities
- Real-time status tracking for all applications
- Automated document verification using AI
- Integration with digital identity system
- Multi-language support for accessibility`,
        results: `The digital platform transformed the citizen experience with government. Business registration time dropped from 45 days to just 2 days. Citizen satisfaction scores improved from 23% to 78%. The platform now processes over 100,000 transactions daily with 99.9% availability.`,
        metrics: [
            { value: "80%", label: "Faster Service Delivery" },
            { value: "78%", label: "Citizen Satisfaction" },
            { value: "100K", label: "Daily Transactions" },
            { value: "150+", label: "Services Digitized" },
        ],
        technologies: ["Node.js", "React", "MongoDB", "Kubernetes", "Redis", "AWS"],
        duration: "24 months",
        teamSize: "40+ specialists",
        featured: false,
        publishedAt: "2023-09-05",
    },
    {
        id: "5",
        slug: "smart-logistics-platform",
        title: "Smart Logistics & Supply Chain Platform",
        client: "Continental Logistics Corp",
        industry: "Logistics",
        services: ["Data & AI", "Software Development", "Cloud Infrastructure"],
        heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&h=900&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
        excerpt: "Optimizing supply chain operations with IoT and AI, reducing delivery times by 30% and cutting logistics costs by $8M annually.",
        challenge: `The logistics company was struggling with inefficient route planning, lack of real-time visibility, and high fuel costs. Manual scheduling led to suboptimal truck utilization, and customers had no way to track their shipments accurately. Fleet maintenance was reactive rather than predictive, leading to unexpected breakdowns.

Challenges faced:
- Manual route planning causing 35% excess mileage
- No real-time shipment tracking
- Fleet utilization at only 65%
- High fuel costs from inefficient routing
- Unexpected vehicle breakdowns disrupting operations`,
        solution: `We built a comprehensive smart logistics platform integrating IoT sensors, AI-powered optimization, and real-time tracking to transform their supply chain operations.

Solution components:
- IoT sensors on 500+ vehicles for real-time telemetry
- AI route optimization reducing miles traveled
- Predictive maintenance preventing breakdowns
- Customer tracking portal with ETA predictions
- Automated load optimization for maximum utilization
- Driver mobile app with turn-by-turn navigation`,
        results: `The platform transformed logistics operations with dramatic improvements across all KPIs. Route optimization reduced total miles by 25%, cutting fuel costs significantly. Fleet utilization improved from 65% to 88%. Predictive maintenance reduced breakdowns by 70%.`,
        metrics: [
            { value: "30%", label: "Faster Deliveries" },
            { value: "$8M", label: "Annual Savings" },
            { value: "88%", label: "Fleet Utilization" },
            { value: "70%", label: "Fewer Breakdowns" },
        ],
        technologies: ["IoT", "Python", "TensorFlow", "React", "PostgreSQL", "Google Cloud"],
        duration: "10 months",
        teamSize: "18+ specialists",
        featured: false,
        publishedAt: "2023-11-28",
    },
];

// Helper functions
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return caseStudies.find((cs) => cs.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
    return caseStudies.filter((cs) => cs.featured);
}

export function getCaseStudiesByIndustry(industry: string): CaseStudy[] {
    return caseStudies.filter((cs) => cs.industry === industry);
}

export function getCaseStudiesByService(service: string): CaseStudy[] {
    return caseStudies.filter((cs) => cs.services.includes(service));
}

export function getAllIndustries(): string[] {
    return Array.from(new Set(caseStudies.map((cs) => cs.industry)));
}

export function getAllServices(): string[] {
    return Array.from(new Set(caseStudies.flatMap((cs) => cs.services)));
}
