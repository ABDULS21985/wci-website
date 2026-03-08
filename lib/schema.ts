// JSON-LD Schema Generators for SEO
// All schemas follow https://schema.org specifications

const BASE_URL = "https://globaldigibit.com";
const ORG_NAME = "Global Digitalbit Limited";
const LOGO_URL = `${BASE_URL}/logo/digibit.png`;

// --- Organization Schema (site-wide) ---
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: BASE_URL,
    logo: LOGO_URL,
    description:
      "Global Digitalbit Limited is a pioneering IT company dedicated to improving lives through technology. Specializing in consultancy, implementation, and training in data analytics, artificial intelligence, cybersecurity, and central bank digital currency (CBDC).",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+234-816-177-8448",
        contactType: "customer service",
        areaServed: "NG",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+974-3147-5305",
        contactType: "customer service",
        areaServed: "QA",
        availableLanguage: ["English", "Arabic"],
      },
    ],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "15 D Yalinga Crescent Off Adedokumbo Ademola Crescent, Wuse 2",
        addressLocality: "Abuja",
        addressCountry: "NG",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Level 14, Commercial Bank Plaza, West Bay",
        addressLocality: "Doha",
        addressCountry: "QA",
      },
    ],
    sameAs: [
      "https://www.facebook.com/globaldigibit",
      "https://x.com/globaldigibit",
      "https://www.linkedin.com/company/globaldigibit",
    ],
  };
}

// --- WebSite Schema (homepage) ---
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORG_NAME,
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/blogs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// --- BreadcrumbList Schema ---
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

// --- FAQPage Schema ---
export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// --- Article Schema (blog posts) ---
export function generateArticleSchema(post: {
  title: string;
  excerpt: string;
  featuredImage: string;
  publishedAt: string;
  updatedAt: string;
  slug: string;
  author: { name: string; role: string };
  category: { name: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blogs/${post.slug}`,
    },
    articleSection: post.category.name,
  };
}

// --- Product Schema ---
export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  id: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    url: `${BASE_URL}/products/${product.id}`,
    brand: {
      "@type": "Organization",
      name: ORG_NAME,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/OnlineOnly",
      url: `${BASE_URL}/products/${product.id}`,
    },
  };
}

// --- LocalBusiness Schema (contact page) ---
export function generateLocalBusinessSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Global Digitalbit Limited - Nigeria",
      telephone: "+234-816-177-8448",
      email: "connect@globaldigibit.com",
      url: BASE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "15 D Yalinga Crescent Off Adedokumbo Ademola Crescent, Wuse 2",
        addressLocality: "Abuja",
        addressCountry: "NG",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Global Digitalbit Limited - Qatar",
      telephone: "+974-3147-5305",
      email: "connect@globaldigibit.com",
      url: BASE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Level 14, Commercial Bank Plaza, West Bay",
        addressLocality: "Doha",
        addressCountry: "QA",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "17:00",
      },
    },
  ];
}

// --- Service Schema ---
export function generateServiceSchema(service: {
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: ORG_NAME,
      url: BASE_URL,
    },
    areaServed: ["NG", "QA", "GH", "AE"],
  };
}
