export interface JobPosition {
    id: string;
    title: string;
    department: string;
    location: string;
    type: "full-time" | "part-time" | "contract" | "remote";
    level: "entry" | "mid" | "senior" | "lead" | "executive";
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    postedDate: string;
    isRemote: boolean;
    slug: string;
}

export interface Department {
    id: string;
    name: string;
    description: string;
    icon: string;
}

export const departments: Department[] = [
    {
        id: "engineering",
        name: "Engineering",
        description: "Build innovative solutions that power digital transformation",
        icon: "code",
    },
    {
        id: "data-science",
        name: "Data Science & AI",
        description: "Drive insights and intelligence through advanced analytics",
        icon: "brain",
    },
    {
        id: "cybersecurity",
        name: "Cybersecurity",
        description: "Protect organizations with cutting-edge security solutions",
        icon: "shield",
    },
    {
        id: "consulting",
        name: "Consulting",
        description: "Guide enterprises through their digital journey",
        icon: "users",
    },
    {
        id: "product",
        name: "Product",
        description: "Shape the future of our enterprise products",
        icon: "package",
    },
    {
        id: "operations",
        name: "Operations",
        description: "Keep our global operations running smoothly",
        icon: "settings",
    },
];

export const jobPositions: JobPosition[] = [
    {
        id: "senior-fullstack-engineer",
        title: "Senior Full Stack Engineer",
        department: "Engineering",
        location: "Lagos, Nigeria",
        type: "full-time",
        level: "senior",
        description: "Join our engineering team to build scalable enterprise solutions that serve clients across 50+ countries. You'll work on cutting-edge projects involving AI, blockchain, and cloud technologies.",
        requirements: [
            "5+ years of experience in full-stack development",
            "Strong proficiency in React, Node.js, and TypeScript",
            "Experience with cloud platforms (AWS, Azure, or GCP)",
            "Understanding of microservices architecture",
            "Excellent problem-solving and communication skills",
        ],
        responsibilities: [
            "Design and implement scalable web applications",
            "Collaborate with cross-functional teams on product development",
            "Mentor junior developers and conduct code reviews",
            "Contribute to architectural decisions and best practices",
            "Optimize application performance and security",
        ],
        benefits: [
            "Competitive salary and equity options",
            "Remote work flexibility",
            "Health insurance coverage",
            "Professional development budget",
            "Annual team retreats",
        ],
        postedDate: "2026-01-15",
        isRemote: true,
        slug: "senior-fullstack-engineer",
    },
    {
        id: "ai-ml-engineer",
        title: "AI/ML Engineer",
        department: "Data Science & AI",
        location: "Doha, Qatar",
        type: "full-time",
        level: "mid",
        description: "Help us build the next generation of AI-powered solutions. You'll work on machine learning models, natural language processing, and computer vision projects for enterprise clients.",
        requirements: [
            "3+ years of experience in machine learning",
            "Strong Python skills and familiarity with ML frameworks (TensorFlow, PyTorch)",
            "Experience with NLP, computer vision, or recommendation systems",
            "Understanding of MLOps and model deployment",
            "Master's degree in Computer Science, AI, or related field preferred",
        ],
        responsibilities: [
            "Develop and deploy machine learning models",
            "Collaborate with data scientists on research initiatives",
            "Build scalable ML pipelines and infrastructure",
            "Optimize model performance and accuracy",
            "Stay current with latest AI/ML advancements",
        ],
        benefits: [
            "Competitive compensation package",
            "Relocation assistance",
            "Learning and development programs",
            "Flexible working hours",
            "Health and wellness benefits",
        ],
        postedDate: "2026-01-20",
        isRemote: false,
        slug: "ai-ml-engineer",
    },
    {
        id: "cybersecurity-analyst",
        title: "Senior Cybersecurity Analyst",
        department: "Cybersecurity",
        location: "Lagos, Nigeria",
        type: "full-time",
        level: "senior",
        description: "Protect our clients' digital assets and infrastructure. You'll conduct security assessments, implement security measures, and respond to security incidents across enterprise environments.",
        requirements: [
            "5+ years of experience in cybersecurity",
            "CISSP, CEH, or equivalent certifications",
            "Experience with SIEM, IDS/IPS, and security tools",
            "Strong understanding of network security and cryptography",
            "Experience with compliance frameworks (ISO 27001, NIST)",
        ],
        responsibilities: [
            "Conduct security assessments and penetration testing",
            "Monitor and respond to security incidents",
            "Develop security policies and procedures",
            "Train staff on security best practices",
            "Collaborate with clients on security implementations",
        ],
        benefits: [
            "Competitive salary",
            "Certification sponsorship",
            "Remote work options",
            "Health insurance",
            "Performance bonuses",
        ],
        postedDate: "2026-01-18",
        isRemote: true,
        slug: "senior-cybersecurity-analyst",
    },
    {
        id: "blockchain-developer",
        title: "Blockchain Developer",
        department: "Engineering",
        location: "Remote",
        type: "full-time",
        level: "mid",
        description: "Join our CBDC and blockchain team to build the future of digital finance. You'll work on central bank digital currency implementations and enterprise blockchain solutions.",
        requirements: [
            "3+ years of blockchain development experience",
            "Proficiency in Solidity, Rust, or similar languages",
            "Experience with Ethereum, Hyperledger, or Corda",
            "Understanding of cryptographic principles",
            "Knowledge of DeFi protocols and tokenomics",
        ],
        responsibilities: [
            "Design and develop smart contracts",
            "Build blockchain integration layers",
            "Audit and optimize existing contracts",
            "Research emerging blockchain technologies",
            "Collaborate on CBDC implementation projects",
        ],
        benefits: [
            "Fully remote position",
            "Competitive crypto-inclusive compensation",
            "Flexible hours",
            "Conference attendance budget",
            "Cutting-edge project exposure",
        ],
        postedDate: "2026-01-22",
        isRemote: true,
        slug: "blockchain-developer",
    },
    {
        id: "senior-consultant",
        title: "Senior Technology Consultant",
        department: "Consulting",
        location: "Dubai, UAE",
        type: "full-time",
        level: "senior",
        description: "Guide enterprise clients through their digital transformation journey. You'll work with C-suite executives to develop technology strategies and oversee implementation of complex projects.",
        requirements: [
            "7+ years of technology consulting experience",
            "Experience with digital transformation projects",
            "Strong client relationship management skills",
            "MBA or equivalent business education preferred",
            "Experience in financial services or government sectors",
        ],
        responsibilities: [
            "Lead client engagements and workshops",
            "Develop technology roadmaps and strategies",
            "Manage project delivery and stakeholder relationships",
            "Mentor junior consultants",
            "Contribute to business development efforts",
        ],
        benefits: [
            "Executive compensation package",
            "Travel opportunities",
            "Professional development",
            "Health and wellness benefits",
            "Performance incentives",
        ],
        postedDate: "2026-01-10",
        isRemote: false,
        slug: "senior-technology-consultant",
    },
    {
        id: "product-manager",
        title: "Product Manager - DigiTrust",
        department: "Product",
        location: "Lagos, Nigeria",
        type: "full-time",
        level: "mid",
        description: "Own the product vision and roadmap for DigiTrust, our enterprise trust management platform. You'll work closely with engineering, design, and customers to build products that solve real problems.",
        requirements: [
            "4+ years of product management experience",
            "Experience with B2B SaaS products",
            "Strong analytical and data-driven mindset",
            "Excellent communication and presentation skills",
            "Technical background or ability to work with engineering teams",
        ],
        responsibilities: [
            "Define product vision and strategy",
            "Prioritize features and manage the product backlog",
            "Conduct user research and gather customer feedback",
            "Work with engineering to deliver product releases",
            "Analyze product metrics and optimize user experience",
        ],
        benefits: [
            "Competitive salary and equity",
            "Remote-friendly culture",
            "Product conferences budget",
            "Health insurance",
            "Continuous learning opportunities",
        ],
        postedDate: "2026-01-25",
        isRemote: true,
        slug: "product-manager-digitrust",
    },
];

export const companyBenefits = [
    {
        id: "remote-work",
        icon: "globe",
        title: "Remote-First Culture",
        description: "Work from anywhere in the world. We believe great work happens everywhere.",
    },
    {
        id: "health",
        icon: "heart",
        title: "Health & Wellness",
        description: "Comprehensive health insurance and wellness programs for you and your family.",
    },
    {
        id: "learning",
        icon: "graduation-cap",
        title: "Learning & Development",
        description: "Annual learning budget, certification sponsorship, and conference attendance.",
    },
    {
        id: "equity",
        icon: "trending-up",
        title: "Equity & Growth",
        description: "Competitive compensation with equity options and clear career progression.",
    },
    {
        id: "time-off",
        icon: "calendar",
        title: "Flexible Time Off",
        description: "Generous PTO policy plus public holidays and personal days.",
    },
    {
        id: "team",
        icon: "users",
        title: "Team Events",
        description: "Annual retreats, team-building activities, and celebration of milestones.",
    },
];

export const companyValues = [
    {
        id: "innovation",
        title: "Innovation First",
        description: "We push boundaries and embrace new technologies to solve complex problems.",
    },
    {
        id: "excellence",
        title: "Excellence Always",
        description: "We hold ourselves to the highest standards in everything we do.",
    },
    {
        id: "collaboration",
        title: "Collaborative Spirit",
        description: "We believe diverse perspectives lead to better solutions.",
    },
    {
        id: "impact",
        title: "Meaningful Impact",
        description: "We focus on work that makes a real difference for our clients and communities.",
    },
];
