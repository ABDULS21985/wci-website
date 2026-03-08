import Script from "next/script";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const baseUrl = "https://globaldigibit.com";

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData),
      }}
    />
  );
}

// Helper function to generate breadcrumb items
export function generateBreadcrumbs(path: string): BreadcrumbItem[] {
  const baseUrl = "https://globaldigibit.com";
  const segments = path.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: baseUrl },
  ];

  let currentPath = "";

  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const name = formatBreadcrumbName(segment);
    breadcrumbs.push({
      name,
      url: `${baseUrl}${currentPath}`,
    });
  });

  return breadcrumbs;
}

// Format segment name for display
function formatBreadcrumbName(segment: string): string {
  const nameMap: Record<string, string> = {
    about: "About Us",
    contact: "Contact",
    products: "Products",
    services: "Services",
    training: "Training",
    blogs: "Blog",
    blog: "Blog",
    digigate: "DigiGate",
    digitrust: "DigiTrust",
    digitrack: "DigiTrack",
    trustmehub: "TrustMeHub",
    boacrm: "BoaCRM",
    cybersecurity: "Cybersecurity",
    "ai-data": "AI & Data",
    blockchain: "Blockchain",
    "it-governance": "IT Governance",
    "products-services": "Products & Services",
    pricing: "Pricing",
    docs: "Documentation",
    "use-cases": "Use Cases",
  };

  return (
    nameMap[segment.toLowerCase()] ||
    segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

// Pre-configured breadcrumbs for common pages
export function HomeBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[{ name: "Home", url: "https://globaldigibit.com" }]}
    />
  );
}

export function AboutBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "https://globaldigibit.com" },
        { name: "About Us", url: "https://globaldigibit.com/about" },
      ]}
    />
  );
}

export function ContactBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "https://globaldigibit.com" },
        { name: "Contact", url: "https://globaldigibit.com/contact" },
      ]}
    />
  );
}

export function ProductsBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "https://globaldigibit.com" },
        { name: "Products", url: "https://globaldigibit.com/products" },
      ]}
    />
  );
}

export function ProductDetailBreadcrumb({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "https://globaldigibit.com" },
        { name: "Products", url: "https://globaldigibit.com/products" },
        {
          name: productName,
          url: `https://globaldigibit.com/products/${productId}`,
        },
      ]}
    />
  );
}

export function ServicesBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "https://globaldigibit.com" },
        { name: "Services", url: "https://globaldigibit.com/services" },
      ]}
    />
  );
}

export function ServiceDetailBreadcrumb({
  serviceId,
  serviceName,
}: {
  serviceId: string;
  serviceName: string;
}) {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "https://globaldigibit.com" },
        { name: "Services", url: "https://globaldigibit.com/services" },
        {
          name: serviceName,
          url: `https://globaldigibit.com/services/${serviceId}`,
        },
      ]}
    />
  );
}

export function TrainingBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "https://globaldigibit.com" },
        { name: "Training", url: "https://globaldigibit.com/training" },
      ]}
    />
  );
}

export function BlogBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "https://globaldigibit.com" },
        { name: "Blog", url: "https://globaldigibit.com/blogs" },
      ]}
    />
  );
}
