import Script from "next/script";

interface OrganizationSchemaProps {
  includeLocalBusiness?: boolean;
}

export function OrganizationSchema({ includeLocalBusiness = true }: OrganizationSchemaProps) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://globaldigibit.com/#organization",
    name: "Global Digitalbit Limited",
    alternateName: "Global Digitalbit",
    url: "https://globaldigibit.com",
    logo: {
      "@type": "ImageObject",
      url: "https://globaldigibit.com/logo.png",
      width: 512,
      height: 512,
    },
    description:
      "Global Digitalbit Limited is a pioneering IT company dedicated to improving lives through technology. Specializing in consultancy, implementation, and training in data analytics, artificial intelligence, cybersecurity, and central bank digital currency (CBDC).",
    foundingDate: "2020",
    founders: [
      {
        "@type": "Person",
        name: "Global Digitalbit Limited",
      },
    ],
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
        addressRegion: "Lagos",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Doha",
        addressCountry: "QA",
        addressRegion: "Doha",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["English", "Arabic"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        availableLanguage: ["English", "Arabic"],
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/globaldigibit",
      "https://twitter.com/globaldigibit",
    ],
    knowsAbout: [
      "Information Technology Consulting",
      "Artificial Intelligence",
      "Machine Learning",
      "Cybersecurity",
      "Blockchain Technology",
      "Central Bank Digital Currency",
      "Data Analytics",
      "API Gateway Solutions",
      "Digital Credential Verification",
      "IT Governance",
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "Nigeria",
      },
      {
        "@type": "Country",
        name: "Qatar",
      },
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 6.5244,
          longitude: 3.3792,
        },
        geoRadius: "5000",
      },
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "IT Consultancy Services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cybersecurity Advisory",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI & Data Strategy",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Blockchain Solutions",
        },
      },
    ],
  };

  const localBusinessData = includeLocalBusiness
    ? [
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://globaldigibit.com/#lagos-office",
          name: "Global Digitalbit Limited - Lagos Office",
          parentOrganization: {
            "@id": "https://globaldigibit.com/#organization",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lagos",
            addressCountry: "NG",
            addressRegion: "Lagos",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 6.5244,
            longitude: 3.3792,
          },
          url: "https://globaldigibit.com",
          priceRange: "$$",
        },
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://globaldigibit.com/#doha-office",
          name: "Global Digitalbit Limited - Doha Office",
          parentOrganization: {
            "@id": "https://globaldigibit.com/#organization",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Doha",
            addressCountry: "QA",
            addressRegion: "Doha",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 25.2867,
            longitude: 51.534,
          },
          url: "https://globaldigibit.com",
          priceRange: "$$",
        },
      ]
    : [];

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      {localBusinessData.map((data, index) => (
        <Script
          key={`local-business-${index}`}
          id={`local-business-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data),
          }}
        />
      ))}
    </>
  );
}
