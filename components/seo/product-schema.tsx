import Script from "next/script";

interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

interface ProductSchemaProps {
  productId: string;
  name: string;
  description: string;
  tagline?: string;
  features?: ProductFeature[];
  image?: string;
  url?: string;
}

export function ProductSchema({
  productId,
  name,
  description,
  tagline,
  features = [],
  image,
  url,
}: ProductSchemaProps) {
  const baseUrl = "https://globaldigibit.com";
  const productUrl = url || `${baseUrl}/products/${productId}`;

  const productData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${baseUrl}/products/${productId}#product`,
    name: name,
    applicationCategory: "BusinessApplication",
    description: description,
    slogan: tagline,
    url: productUrl,
    image: image || `${baseUrl}/products/${productId}/og-image.jpg`,
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Global Digitalbit Limited",
      url: baseUrl,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
      },
    },
    featureList: features.map((f) => f.title),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "100",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <Script
      id={`product-schema-${productId}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(productData),
      }}
    />
  );
}

// Pre-configured schemas for specific products
export function DigiGateSchema() {
  return (
    <ProductSchema
      productId="digigate"
      name="DigiGate"
      tagline="The Command Center for Your Digital Ecosystem"
      description="DigiGate is a comprehensive API gateway and lifecycle management solution that acts as the centralized control layer for an organization's entire digital infrastructure. It manages all inbound and outbound API traffic while enforcing security, routing policies, and governance at scale."
      features={[
        {
          icon: "Shield",
          title: "Centralized Security Enforcement",
          description: "OAuth 2.0, JWT validation, rate limiting, and threat protection",
        },
        {
          icon: "GitBranch",
          title: "Intelligent Traffic Routing",
          description: "Load balancing, failover, API versioning, and canary deployments",
        },
        {
          icon: "Layers",
          title: "API Composition & Aggregation",
          description: "Combine multiple microservices into single client responses",
        },
        {
          icon: "Activity",
          title: "Real-Time Monitoring & Analytics",
          description: "Unified logging, tracing, performance dashboards",
        },
      ]}
      image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2670&auto=format&fit=crop"
    />
  );
}

export function DigiTrustSchema() {
  return (
    <ProductSchema
      productId="digitrust"
      name="DigiTrust"
      tagline="Immutable Trust for a Digital World"
      description="DigiTrust, powered by the TrustMe platform, is a blockchain-based solution for issuing, verifying, and managing tamper-proof digital credentials. From educational certificates to professional licenses, land titles to insurance policies, DigiTrust ensures document authenticity is never in question."
      features={[
        {
          icon: "FileCheck",
          title: "Credential Issuance System",
          description: "Secure generation and blockchain anchoring of digital documents",
        },
        {
          icon: "QrCode",
          title: "Public Verifier Portal",
          description: "Instant QR code or document ID verification for anyone",
        },
        {
          icon: "ClipboardCheck",
          title: "Auditor/Admin Console",
          description: "Compliance checks, lifecycle tracking, and security logging",
        },
      ]}
      image="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop"
    />
  );
}

export function DigiTrackSchema() {
  return (
    <ProductSchema
      productId="digitrack"
      name="DigiTrack"
      tagline="Complete Visibility Across Your Digital Operations"
      description="DigiTrack provides real-time tracking and traceability for physical assets, digital transactions, and service delivery workflows. Built for industries requiring complete chain-of-custody documentation and operational transparency."
      features={[
        {
          icon: "MapPin",
          title: "Real-Time Location Tracking",
          description: "GPS, RFID, and IoT sensor integration",
        },
        {
          icon: "GitCommit",
          title: "Transaction Traceability",
          description: "End-to-end audit trails for financial operations",
        },
        {
          icon: "Timer",
          title: "Service Delivery Monitoring",
          description: "SLA tracking, escalation management, and performance metrics",
        },
      ]}
      image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
    />
  );
}

export function TrustMeHubSchema() {
  return (
    <ProductSchema
      productId="trustmehub"
      name="TrustMeHub"
      tagline="Building Trust. Empowering Growth."
      description="TrustMeHub is a global digital trust infrastructure for instant, blockchain-anchored credential verification. Verify any credential in milliseconds, not weeks. From educational certificates to professional licenses, land titles to healthcare credentials, TrustMeHub ensures authenticity at national scale."
      features={[
        {
          icon: "Zap",
          title: "Instant Verification",
          description: "Sub-10ms verification responses with 92%+ cache hit rates",
        },
        {
          icon: "Link2",
          title: "Blockchain Anchoring",
          description: "Hyperledger FireFly integration ensures immutable records",
        },
        {
          icon: "Eye",
          title: "Zero-Knowledge Proofs",
          description: "Selective disclosure enables privacy-preserving verification",
        },
        {
          icon: "Building2",
          title: "Multi-Tenant Architecture",
          description: "Enterprise-grade Row-Level Security for data isolation",
        },
      ]}
      image="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2670&auto=format&fit=crop"
    />
  );
}

export function BoaCRMSchema() {
  return (
    <ProductSchema
      productId="boacrm"
      name="BoaCRM"
      tagline="The Operating System for Customer Relationships"
      description="BoaCRM is a comprehensive enterprise-grade CRM platform purpose-built for African financial institutions. With 35 integrated modules, native compliance for NDPR/KYC/AML, and omnichannel engagement capabilities, it transforms how banks manage customer relationships at scale."
      features={[
        {
          icon: "Users",
          title: "Customer 360",
          description: "Golden record management with multi-source deduplication",
        },
        {
          icon: "MessageSquare",
          title: "Omnichannel Engagement",
          description: "Unified console for WhatsApp, SMS, email, voice interactions",
        },
        {
          icon: "ShieldCheck",
          title: "Compliance & Governance",
          description: "Native NDPR/NDPA compliance, BVN/NIN verification",
        },
        {
          icon: "Bot",
          title: "Conversational AI",
          description: "Full chatbot builder with intent/entity management",
        },
      ]}
      image="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2670&auto=format&fit=crop"
    />
  );
}
