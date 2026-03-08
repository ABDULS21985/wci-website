import type { Metadata } from "next";

const BASE_URL = "https://globaldigibit.com";
const SITE_NAME = "Global Digitalbit Limited";
const DEFAULT_LOCALE = "en_US";

// Supported locales
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

// Locale configuration for hreflang tags
export const localeConfig: Record<Locale, { hreflang: string; name: string }> = {
  en: { hreflang: "en", name: "English" },
  ar: { hreflang: "ar", name: "Arabic" },
};

interface MetadataConfig {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  locale?: Locale;
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

/**
 * Generate canonical URL with optional locale support
 */
export function generateCanonicalUrl(path: string, locale?: Locale): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (locale && locale !== "en") {
    return `${BASE_URL}/${locale}${cleanPath}`;
  }
  return `${BASE_URL}${cleanPath}`;
}

/**
 * Generate alternate language URLs for hreflang tags
 */
export function generateAlternateUrls(path: string): Record<string, string> {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const alternates: Record<string, string> = {
    "x-default": `${BASE_URL}${cleanPath}`,
  };

  locales.forEach((locale) => {
    alternates[localeConfig[locale].hreflang] =
      locale === "en"
        ? `${BASE_URL}${cleanPath}`
        : `${BASE_URL}/${locale}${cleanPath}`;
  });

  return alternates;
}

/**
 * Generate complete page metadata with Open Graph and Twitter cards
 */
export function generatePageMetadata({
  title,
  description,
  path = "/",
  image,
  keywords = [],
  locale,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: MetadataConfig): Metadata {
  const canonicalUrl = generateCanonicalUrl(path, locale);
  const ogImage = image || `${BASE_URL}/og-image.jpg`;

  const defaultKeywords = [
    "IT consultancy",
    "data analytics",
    "artificial intelligence",
    "cybersecurity",
    "blockchain",
    "digital transformation",
    "Nigeria IT company",
    "Qatar IT services",
  ];

  const metadata: Metadata = {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    authors: authors?.map((author) => ({ name: author })) || [
      { name: SITE_NAME },
    ],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: generateAlternateUrls(path),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: locale === "ar" ? "ar_AE" : DEFAULT_LOCALE,
      type: type === "article" ? "article" : "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_NAME}`,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: authors || [SITE_NAME],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@globaldigibit",
      site: "@globaldigibit",
    },
    robots: noIndex
      ? {
        index: false,
        follow: false,
      }
      : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
  };

  return metadata;
}

/**
 * Generate metadata for product pages
 */
export function generateProductMetadata(
  productId: string,
  productName: string,
  description: string,
  tagline?: string,
  image?: string
): Metadata {
  return generatePageMetadata({
    title: `${productName}${tagline ? ` - ${tagline}` : ""}`,
    description,
    path: `/products/${productId}`,
    image,
    keywords: [
      productName,
      tagline || "",
      "enterprise software",
      "business solutions",
    ].filter(Boolean),
    type: "product",
  });
}

/**
 * Generate metadata for service pages
 */
export function generateServiceMetadata(
  serviceId: string,
  serviceName: string,
  description: string,
  categoryName?: string
): Metadata {
  return generatePageMetadata({
    title: `${serviceName}${categoryName ? ` | ${categoryName}` : ""}`,
    description,
    path: `/services/${serviceId}`,
    keywords: [
      serviceName,
      categoryName || "",
      "IT consulting",
      "professional services",
    ].filter(Boolean),
    type: "website",
  });
}

/**
 * Generate metadata for blog/article pages
 */
export function generateArticleMetadata(
  slug: string,
  title: string,
  description: string,
  image?: string,
  publishedTime?: string,
  modifiedTime?: string,
  authors?: string[]
): Metadata {
  return generatePageMetadata({
    title,
    description,
    path: `/blogs/${slug}`,
    image,
    type: "article",
    publishedTime,
    modifiedTime,
    authors,
  });
}

// Pre-configured metadata for static pages
export const staticPageMetadata = {
  home: generatePageMetadata({
    title:
      "Global Digitalbit Limited - IT Consultancy, AI, Cybersecurity & CBDC Solutions",
    description:
      "Global Digitalbit Limited is a pioneering IT company dedicated to improving lives through technology. Specializing in consultancy, implementation, and training in data analytics, artificial intelligence, cybersecurity, and central bank digital currency (CBDC).",
    path: "/",
  }),

  about: generatePageMetadata({
    title: "About Us",
    description:
      "Learn about Global Digitalbit Limited, our mission to improve lives through technology, our values of innovation, reliability, integrity, and teamwork, and our presence in Lagos, Nigeria and Doha, Qatar.",
    path: "/about",
    keywords: ["about us", "company history", "our team", "mission", "values"],
  }),

  contact: generatePageMetadata({
    title: "Contact Us",
    description:
      "Get in touch with Global Digitalbit Limited. Contact our offices in Lagos, Nigeria and Doha, Qatar for IT consultancy, AI solutions, cybersecurity services, and more.",
    path: "/contact",
    keywords: ["contact", "get in touch", "Lagos office", "Doha office", "support"],
  }),

  products: generatePageMetadata({
    title: "Products - Enterprise Software Solutions",
    description:
      "Explore Global Digitalbit's enterprise software products: DigiGate for API management, DigiTrust for blockchain credentials, DigiTrack for asset tracking, TrustMeHub for verification, and BoaCRM for banking.",
    path: "/products",
    keywords: [
      "DigiGate",
      "DigiTrust",
      "DigiTrack",
      "TrustMeHub",
      "BoaCRM",
      "enterprise software",
      "API gateway",
      "credential verification",
    ],
  }),

  services: generatePageMetadata({
    title: "Services - IT Consultancy & Advisory",
    description:
      "Professional IT services including cybersecurity advisory, AI & data strategy, blockchain solutions, and IT governance. Expert consultants serving clients in Nigeria, Qatar, and globally.",
    path: "/services",
    keywords: [
      "IT services",
      "cybersecurity consulting",
      "AI consulting",
      "blockchain consulting",
      "IT governance",
    ],
  }),

  training: generatePageMetadata({
    title: "Training Programs - Professional Development",
    description:
      "Comprehensive training programs for executives, technical professionals, and compliance teams. Covering AI, cybersecurity, blockchain, and IT governance with certifications.",
    path: "/training",
    keywords: [
      "IT training",
      "executive programs",
      "technical training",
      "cybersecurity training",
      "AI training",
      "certifications",
    ],
  }),

  blog: generatePageMetadata({
    title: "Blog - Insights & News",
    description:
      "Stay updated with the latest insights on AI, cybersecurity, blockchain, and digital transformation from Global Digitalbit Limited's experts.",
    path: "/blogs",
    keywords: [
      "tech blog",
      "IT insights",
      "cybersecurity news",
      "AI articles",
      "digital transformation",
    ],
  }),

  productsServices: generatePageMetadata({
    title: "Products & Services Overview",
    description:
      "Comprehensive overview of Global Digitalbit's products and services. Enterprise software solutions and professional IT consulting services for digital transformation.",
    path: "/products-services",
    keywords: ["products", "services", "solutions", "enterprise software", "IT consulting"],
  }),
};

// Product-specific metadata
export const productMetadata = {
  digigate: generateProductMetadata(
    "digigate",
    "DigiGate",
    "DigiGate is a comprehensive API gateway and lifecycle management solution that acts as the centralized control layer for an organization's entire digital infrastructure. Manage API traffic with security, routing policies, and governance at scale.",
    "The Command Center for Your Digital Ecosystem",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2670&auto=format&fit=crop"
  ),

  digitrust: generateProductMetadata(
    "digitrust",
    "DigiTrust",
    "DigiTrust is a blockchain-based solution for issuing, verifying, and managing tamper-proof digital credentials. From educational certificates to professional licenses, ensure document authenticity is never in question.",
    "Immutable Trust for a Digital World",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop"
  ),

  digitrack: generateProductMetadata(
    "digitrack",
    "DigiTrack",
    "DigiTrack provides real-time tracking and traceability for physical assets, digital transactions, and service delivery workflows. Built for industries requiring complete chain-of-custody documentation.",
    "Complete Visibility Across Your Digital Operations",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
  ),

  trustmehub: generateProductMetadata(
    "trustmehub",
    "TrustMeHub",
    "TrustMeHub is a global digital trust infrastructure for instant, blockchain-anchored credential verification. Verify any credential in milliseconds, not weeks, ensuring authenticity at national scale.",
    "Building Trust. Empowering Growth.",
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2670&auto=format&fit=crop"
  ),

  boacrm: generateProductMetadata(
    "boacrm",
    "BoaCRM",
    "BoaCRM is a comprehensive enterprise-grade CRM platform purpose-built for African financial institutions. With 35 integrated modules and native compliance for NDPR/KYC/AML.",
    "The Operating System for Customer Relationships",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2670&auto=format&fit=crop"
  ),
};

// Service category metadata
export const serviceCategoryMetadata = {
  cybersecurity: generateServiceMetadata(
    "cybersecurity",
    "Cybersecurity and Risk Management Advisory",
    "Building resilient defences for critical infrastructure with alignment to QCB, NIA, and ISO standards. Expert cybersecurity strategy, policy development, and risk assessment services.",
    "Services"
  ),

  "ai-data": generateServiceMetadata(
    "ai-data",
    "Artificial Intelligence and Data Strategy",
    "Leveraging data assets for predictive analytics, operational efficiency, and strategic decision-making. AI roadmap development, data governance, MLOps implementation, and ISO/IEC 42001:2023 alignment.",
    "Services"
  ),

  blockchain: generateServiceMetadata(
    "blockchain",
    "Blockchain and Distributed Ledger Technology",
    "Implementing secure, transparent, and immutable solutions for the modern digital economy. DLT feasibility studies, smart contract development, and tokenomics design.",
    "Services"
  ),

  "it-governance": generateServiceMetadata(
    "it-governance",
    "IT Governance, Risk & Compliance",
    "Ensuring technology initiatives support business strategy and meet all regulatory requirements. COBIT implementation, ITIL service management, and compliance monitoring.",
    "Services"
  ),
};
