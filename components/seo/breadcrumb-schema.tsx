import Script from "next/script";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const baseUrl = "https://womenconnectintl.org";

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
  const baseUrl = "https://womenconnectintl.org";
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
    programs: "Programs",
    platform: "Platform",
    "get-involved": "Get Involved",
    blogs: "Blog",
    blog: "Blog",
    "psychosocial-resilience": "Psychosocial Resilience",
    "economic-empowerment": "Economic Empowerment",
    "leadership-mentoring": "Leadership & Mentoring",
    "humanitarian-impact": "Humanitarian Impact",
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
      items={[{ name: "Home", url: "https://womenconnectintl.org" }]}
    />
  );
}

export function AboutBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "https://womenconnectintl.org" },
        { name: "About Us", url: "https://womenconnectintl.org/about" },
      ]}
    />
  );
}

export function ContactBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "https://womenconnectintl.org" },
        { name: "Contact", url: "https://womenconnectintl.org/contact" },
      ]}
    />
  );
}

export function ProgramsBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "https://womenconnectintl.org" },
        { name: "Programs", url: "https://womenconnectintl.org/programs" },
      ]}
    />
  );
}

export function PlatformBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "https://womenconnectintl.org" },
        { name: "Platform", url: "https://womenconnectintl.org/platform" },
      ]}
    />
  );
}

export function GetInvolvedBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "https://womenconnectintl.org" },
        { name: "Get Involved", url: "https://womenconnectintl.org/get-involved" },
      ]}
    />
  );
}

export function BlogBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "https://womenconnectintl.org" },
        { name: "Blog", url: "https://womenconnectintl.org/blogs" },
      ]}
    />
  );
}
