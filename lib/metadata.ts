import type { Metadata } from "next";

const BASE_URL = "https://womenconnectintl.org";
const SITE_NAME = "Women Connect International";
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
    "women empowerment",
    "diaspora women",
    "psychosocial resilience",
    "economic empowerment",
    "leadership development",
    "humanitarian impact",
    "African women",
    "Qatar NGO",
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
      creator: "@womenconnectintl",
      site: "@womenconnectintl",
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
      "Women Connect International - Empowering Diaspora Women Through Resilience, Skills & Leadership",
    description:
      "Women Connect International Training is a Doha-based NGO empowering African women in the diaspora through psychosocial resilience, economic empowerment, leadership development, and transparent humanitarian impact.",
    path: "/",
  }),

  about: generatePageMetadata({
    title: "About Us - Our Story & Mission",
    description:
      "Learn about Women Connect International, founded by Fatima Abubakar and Rakiya Shuaibu Mohammed. Our mission is to strengthen the emotional resilience, economic empowerment, and leadership capacity of diaspora women.",
    path: "/about",
    keywords: ["about us", "our story", "founders", "mission", "vision", "core values"],
  }),

  contact: generatePageMetadata({
    title: "Contact Us",
    description:
      "Get in touch with Women Connect International in Doha, Qatar. Reach out about partnerships, programs, volunteering, donations, or media enquiries.",
    path: "/contact",
    keywords: ["contact", "get in touch", "Doha office", "partnership", "support"],
  }),

  programs: generatePageMetadata({
    title: "Programs - Empowerment Pillars",
    description:
      "Explore WCI's four program pillars: Psychosocial Resilience, Digital & Economic Empowerment, Mentoring & Leadership, and Transparent Humanitarian Impact. Holistic support for diaspora women.",
    path: "/programs",
    keywords: [
      "psychosocial resilience",
      "economic empowerment",
      "leadership mentoring",
      "humanitarian impact",
      "diaspora programs",
      "healing circles",
    ],
  }),

  platform: generatePageMetadata({
    title: "Platform - AI-Enabled Empowerment Technology",
    description:
      "WCI's AI-enabled platform features an Emotional Support Companion, Learning Management Hub, AI Mentor Matching Engine, and Humanitarian Transparency Dashboard.",
    path: "/platform",
    keywords: [
      "AI platform",
      "emotional support",
      "learning management",
      "mentor matching",
      "transparency dashboard",
      "empowerment technology",
    ],
  }),

  getInvolved: generatePageMetadata({
    title: "Get Involved - Partner, Donate, Volunteer",
    description:
      "Join Women Connect International as a partner, donor, volunteer, or corporate sponsor. Support diaspora women's empowerment through resilience, skills training, and leadership development.",
    path: "/get-involved",
    keywords: [
      "get involved",
      "partner",
      "donate",
      "volunteer",
      "corporate sponsorship",
      "support women",
    ],
  }),

  blog: generatePageMetadata({
    title: "Blog - Stories & Insights",
    description:
      "Stories of resilience, empowerment, and impact from Women Connect International. Read about diaspora women's journeys, program updates, and community impact.",
    path: "/blogs",
    keywords: [
      "blog",
      "stories",
      "resilience",
      "empowerment",
      "impact stories",
      "diaspora women",
    ],
  }),
};
