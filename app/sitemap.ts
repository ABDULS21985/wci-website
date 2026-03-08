import { MetadataRoute } from "next";

const BASE_URL = "https://womenconnectintl.org";

// Supported locales for internationalization
const locales = ["en", "ar"] as const;

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: ChangeFrequency;
  priority: number;
  alternates?: {
    languages: Record<string, string>;
  };
}

// Helper function to generate locale alternates
function generateAlternates(path: string): { languages: Record<string, string> } {
  const languages: Record<string, string> = {};
  locales.forEach((locale) => {
    languages[locale] = `${BASE_URL}/${locale}${path}`;
  });
  languages["x-default"] = `${BASE_URL}${path}`;
  return { languages };
}

// Static pages with their SEO configuration
const staticPages: Array<{
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}> = [
  { path: "", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/programs", changeFrequency: "weekly", priority: 0.9 },
  { path: "/platform", changeFrequency: "monthly", priority: 0.8 },
  { path: "/get-involved", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blogs", changeFrequency: "daily", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
];

// Program detail pages
const programPages = [
  "psychosocial-resilience",
  "economic-empowerment",
  "leadership-mentoring",
  "humanitarian-impact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  const sitemapEntries: SitemapEntry[] = [];

  // Add static pages
  staticPages.forEach(({ path, changeFrequency, priority }) => {
    sitemapEntries.push({
      url: `${BASE_URL}${path}`,
      lastModified: currentDate,
      changeFrequency,
      priority,
      alternates: generateAlternates(path),
    });
  });

  // Add program detail pages
  programPages.forEach((slug) => {
    const path = `/programs/${slug}`;
    sitemapEntries.push({
      url: `${BASE_URL}${path}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: generateAlternates(path),
    });
  });

  return sitemapEntries;
}
