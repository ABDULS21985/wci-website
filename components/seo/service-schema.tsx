import Script from "next/script";

interface ServiceSchemaProps {
  serviceId: string;
  name: string;
  description: string;
  categoryName?: string;
  deliverables?: string[];
  url?: string;
}

export function ServiceSchema({
  serviceId,
  name,
  description,
  categoryName,
  deliverables = [],
  url,
}: ServiceSchemaProps) {
  const baseUrl = "https://globaldigibit.com";
  const serviceUrl = url || `${baseUrl}/services/${serviceId}`;

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name: name,
    description: description,
    url: serviceUrl,
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Global Digitalbit Limited",
      url: baseUrl,
    },
    serviceType: categoryName || "IT Consulting",
    areaServed: [
      {
        "@type": "Country",
        name: "Nigeria",
      },
      {
        "@type": "Country",
        name: "Qatar",
      },
    ],
    hasOfferCatalog: deliverables.length > 0 ? {
      "@type": "OfferCatalog",
      name: `${name} Deliverables`,
      itemListElement: deliverables.map((deliverable, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: deliverable,
        },
        position: index + 1,
      })),
    } : undefined,
  };

  return (
    <Script
      id={`service-schema-${serviceId}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceData),
      }}
    />
  );
}

// Service Category Schema
interface ServiceCategorySchemaProps {
  categoryId: string;
  name: string;
  description: string;
  services: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

export function ServiceCategorySchema({
  categoryId,
  name,
  description,
  services,
}: ServiceCategorySchemaProps) {
  const baseUrl = "https://globaldigibit.com";
  const categoryUrl = `${baseUrl}/services/${categoryId}`;

  const categoryData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${categoryUrl}#service-category`,
    name: name,
    description: description,
    url: categoryUrl,
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Global Digitalbit Limited",
      url: baseUrl,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${name} Services`,
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${baseUrl}/services/${categoryId}/${service.id}#service`,
          name: service.name,
          description: service.description,
        },
        position: index + 1,
      })),
    },
  };

  return (
    <Script
      id={`service-category-schema-${categoryId}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(categoryData),
      }}
    />
  );
}

// Pre-configured schemas for service categories
export function CybersecurityServiceSchema() {
  return (
    <ServiceCategorySchema
      categoryId="cybersecurity"
      name="Cybersecurity and Risk Management Advisory"
      description="Building resilient defences for critical infrastructure with alignment to QCB, NIA, and ISO standards."
      services={[
        {
          id: "cyber-strategy",
          name: "Cybersecurity Strategy Roadmapping",
          description: "Multi-year security transformation planning aligned with business objectives.",
        },
        {
          id: "policy-development",
          name: "IT Policy Development",
          description: "Comprehensive security policy frameworks tailored to your organization.",
        },
        {
          id: "risk-assessment",
          name: "Security Risk Assessments",
          description: "Identify vulnerabilities before attackers do with comprehensive assessments.",
        },
        {
          id: "compliance-gap",
          name: "Compliance Gap Analysis",
          description: "QCB, NIA, and Qatar Data Protection Law alignment assessment.",
        },
        {
          id: "security-architecture",
          name: "Security Architecture Review",
          description: "Evaluate and strengthen your organization's security posture.",
        },
        {
          id: "iam-design",
          name: "Digital Identity & IAM Design",
          description: "Zero-trust access control implementation for modern enterprises.",
        },
        {
          id: "threat-analysis",
          name: "Advanced Threat Analysis",
          description: "APT hunting and threat intelligence for proactive defense.",
        },
      ]}
    />
  );
}

export function AIDataServiceSchema() {
  return (
    <ServiceCategorySchema
      categoryId="ai-data"
      name="Artificial Intelligence and Data Strategy"
      description="Leveraging data assets for predictive analytics, operational efficiency, and strategic decision-making."
      services={[
        {
          id: "ai-roadmap",
          name: "AI Strategy & Roadmap Development",
          description: "Define AI vision aligned with your business objectives.",
        },
        {
          id: "data-governance",
          name: "Data Governance Framework Design",
          description: "ISO 42001-aligned data management for enterprise organizations.",
        },
        {
          id: "predictive-modeling",
          name: "Predictive Modeling Workshops",
          description: "Hands-on ML model development with your data science teams.",
        },
        {
          id: "ai-ethics",
          name: "AI Ethics & Governance",
          description: "Responsible AI deployment frameworks for regulated industries.",
        },
        {
          id: "mlops",
          name: "MLOps Implementation",
          description: "Production AI lifecycle management for scalable deployments.",
        },
        {
          id: "ai-training",
          name: "Executive AI Capacity Building",
          description: "Board-level AI literacy programs for strategic decision makers.",
        },
      ]}
    />
  );
}

export function BlockchainServiceSchema() {
  return (
    <ServiceCategorySchema
      categoryId="blockchain"
      name="Blockchain and Distributed Ledger Technology"
      description="Implementing secure, transparent, and immutable solutions for the modern digital economy."
      services={[
        {
          id: "dlt-feasibility",
          name: "DLT Feasibility Studies",
          description: "Evaluate blockchain applicability for your specific use cases.",
        },
        {
          id: "smart-contracts",
          name: "Smart Contract Development",
          description: "Secure smart contract design and implementation.",
        },
        {
          id: "contract-auditing",
          name: "Smart Contract Auditing",
          description: "Security assessment of existing smart contracts.",
        },
        {
          id: "dlt-architecture",
          name: "DLT Architecture Design",
          description: "Enterprise blockchain solution architecture for scale.",
        },
        {
          id: "blockchain-overview",
          name: "Blockchain Executive Overview",
          description: "Strategic education for leadership teams on DLT opportunities.",
        },
        {
          id: "tokenomics",
          name: "Token Economics Design",
          description: "Tokenization strategy and implementation guidance.",
        },
      ]}
    />
  );
}

export function ITGovernanceServiceSchema() {
  return (
    <ServiceCategorySchema
      categoryId="it-governance"
      name="IT Governance, Risk & Compliance"
      description="Ensuring technology initiatives support business strategy and meet all regulatory requirements."
      services={[
        {
          id: "cobit",
          name: "COBIT Implementation",
          description: "IT governance framework deployment for enterprise control.",
        },
        {
          id: "itil",
          name: "ITIL Service Management",
          description: "IT service excellence optimization for operational efficiency.",
        },
        {
          id: "it-risk",
          name: "IT Risk Assessment",
          description: "Technology risk identification and quantification.",
        },
        {
          id: "vendor-risk",
          name: "Third-Party Risk Management",
          description: "Vendor and supplier risk evaluation for secure partnerships.",
        },
        {
          id: "it-audit",
          name: "IT Audit Support",
          description: "Preparation and support for internal and external IT audits.",
        },
        {
          id: "compliance-monitoring",
          name: "Compliance Monitoring",
          description: "Continuous compliance assurance for regulatory peace of mind.",
        },
      ]}
    />
  );
}

// All Services Schema for the main services page
export function AllServicesSchema() {
  const baseUrl = "https://globaldigibit.com";

  const servicesData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${baseUrl}/services#service-list`,
    name: "Global Digitalbit Services",
    description: "Comprehensive IT consultancy, cybersecurity, AI, blockchain, and governance services.",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Cybersecurity and Risk Management Advisory",
          description: "Building resilient defences for critical infrastructure.",
          url: `${baseUrl}/services/cybersecurity`,
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Artificial Intelligence and Data Strategy",
          description: "Leveraging data assets for predictive analytics and strategic decision-making.",
          url: `${baseUrl}/services/ai-data`,
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "Blockchain and Distributed Ledger Technology",
          description: "Implementing secure, transparent, and immutable solutions.",
          url: `${baseUrl}/services/blockchain`,
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: "IT Governance, Risk & Compliance",
          description: "Ensuring technology initiatives support business strategy.",
          url: `${baseUrl}/services/it-governance`,
        },
      },
    ],
  };

  return (
    <Script
      id="all-services-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(servicesData),
      }}
    />
  );
}
