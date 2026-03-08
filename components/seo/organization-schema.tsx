import Script from "next/script";

interface OrganizationSchemaProps {
  includeLocalBusiness?: boolean;
}

export function OrganizationSchema({ includeLocalBusiness = true }: OrganizationSchemaProps) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://womenconnectintl.org/#organization",
    name: "Women Connect International",
    alternateName: "WCI",
    url: "https://womenconnectintl.org",
    logo: {
      "@type": "ImageObject",
      url: "https://womenconnectintl.org/logo.png",
      width: 512,
      height: 512,
    },
    description:
      "Women Connect International Training is a Doha-based NGO empowering African women in the diaspora through psychosocial resilience, economic empowerment, leadership development, and transparent humanitarian impact.",
    foundingDate: "2020",
    founders: [
      {
        "@type": "Person",
        name: "Women Connect International",
      },
    ],
    address: [
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
        availableLanguage: ["English", "Arabic", "French"],
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/globalwci",
      "https://twitter.com/globalwci",
    ],
    knowsAbout: [
      "Women Empowerment",
      "Psychosocial Resilience",
      "Economic Empowerment",
      "Leadership Development",
      "Mentoring Programs",
      "Humanitarian Impact",
      "African Diaspora Support",
      "Community Building",
      "Digital Skills Training",
      "Diaspora Women Support",
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "Qatar",
      },
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 25.2867,
          longitude: 51.534,
        },
        geoRadius: "5000",
      },
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Psychosocial Resilience Programs",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Economic Empowerment Training",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Leadership & Mentoring Programs",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Humanitarian Impact Initiatives",
        },
      },
    ],
  };

  const localBusinessData = includeLocalBusiness
    ? [
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://womenconnectintl.org/#doha-office",
          name: "Women Connect International - Doha Office",
          parentOrganization: {
            "@id": "https://womenconnectintl.org/#organization",
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
          url: "https://womenconnectintl.org",
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
