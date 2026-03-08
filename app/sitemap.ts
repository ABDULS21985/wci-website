import { MetadataRoute } from "next";
import { products } from "@/data/products";
import { serviceCategories } from "@/data/services";

const BASE_URL = "https://globaldigibit.com";

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
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/products", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/training", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blogs", changeFrequency: "daily", priority: 0.7 },
  { path: "/products-services", changeFrequency: "weekly", priority: 0.8 },
];

// TrustMeHub specific pages
const trustMeHubPages: Array<{
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}> = [
  { path: "/products/trustmehub", changeFrequency: "weekly", priority: 0.85 },
  { path: "/products/trustmehub/pricing", changeFrequency: "monthly", priority: 0.7 },
  { path: "/products/trustmehub/docs", changeFrequency: "weekly", priority: 0.6 },
  { path: "/products/trustmehub/use-cases", changeFrequency: "monthly", priority: 0.7 },
];

// BoaCRM specific pages
const boaCRMPages: Array<{
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}> = [
  { path: "/products/boacrm", changeFrequency: "weekly", priority: 0.85 },
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

  // Add product pages dynamically
  products.forEach((product) => {
    // Skip trustmehub and boacrm as they have dedicated pages already
    if (product.id === "trustmehub" || product.id === "boacrm") {
      return;
    }

    const path = `/products/${product.id}`;
    sitemapEntries.push({
      url: `${BASE_URL}${path}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: generateAlternates(path),
    });
  });

  // Add TrustMeHub pages
  trustMeHubPages.forEach(({ path, changeFrequency, priority }) => {
    sitemapEntries.push({
      url: `${BASE_URL}${path}`,
      lastModified: currentDate,
      changeFrequency,
      priority,
      alternates: generateAlternates(path),
    });
  });

  // Add BoaCRM pages
  boaCRMPages.forEach(({ path, changeFrequency, priority }) => {
    sitemapEntries.push({
      url: `${BASE_URL}${path}`,
      lastModified: currentDate,
      changeFrequency,
      priority,
      alternates: generateAlternates(path),
    });
  });

  // Add service category pages dynamically
  serviceCategories.forEach((category) => {
    const path = `/services/${category.id}`;
    sitemapEntries.push({
      url: `${BASE_URL}${path}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: generateAlternates(path),
    });

    // Add individual service pages if they exist
    category.services.forEach((service) => {
      const servicePath = `/services/${category.id}/${service.id}`;
      sitemapEntries.push({
        url: `${BASE_URL}${servicePath}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: generateAlternates(servicePath),
      });
    });
  });

  return sitemapEntries;
}
