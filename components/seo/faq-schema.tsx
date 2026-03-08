import Script from "next/script";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  pageUrl?: string;
}

export function FAQSchema({ faqs, pageUrl }: FAQSchemaProps) {
  const baseUrl = "https://womenconnectintl.org";

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl || baseUrl}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData),
      }}
    />
  );
}

// Default FAQs for the homepage
export const defaultFAQs: FAQItem[] = [
  {
    question: "What is Women Connect International?",
    answer:
      "Women Connect International (WCI) is a Doha-based NGO dedicated to empowering African women in the diaspora. Through psychosocial resilience programs, economic empowerment initiatives, leadership development, and transparent humanitarian impact, WCI helps women build confidence, skills, and community far from home.",
  },
  {
    question: "Who can participate in WCI programs?",
    answer:
      "WCI programs are designed primarily for African diaspora women, including migrants, refugees, and women living abroad who seek support in building resilience, gaining new skills, and connecting with a supportive community. Programs are open to women of all backgrounds within the African diaspora.",
  },
  {
    question: "How does the mentoring program work?",
    answer:
      "WCI's mentoring program pairs participants with experienced mentors who provide guidance on personal growth, career development, and leadership. Mentees attend regular one-on-one sessions, group workshops, and community events designed to build confidence and professional networks.",
  },
  {
    question: "Is WCI a mental health service?",
    answer:
      "No, WCI is not a licensed mental health provider. However, our psychosocial resilience programs offer supportive healing circles, peer support groups, and wellness workshops that help women process challenges and build emotional strength. We refer participants to professional mental health services when needed.",
  },
  {
    question: "How can I support WCI?",
    answer:
      "There are several ways to support WCI: partner with us as an organization, make a donation to fund our programs, volunteer your time and expertise, or spread the word about our mission. Visit our Get Involved page to learn more about each opportunity.",
  },
  {
    question: "Where does WCI operate?",
    answer:
      "Women Connect International is based in Doha, Qatar, and serves African diaspora women across the Gulf region and beyond. Our programs are delivered both in person and online, making them accessible to women in various locations.",
  },
];

// Pre-configured FAQ schema with default FAQs
export function HomeFAQSchema() {
  return <FAQSchema faqs={defaultFAQs} pageUrl="https://womenconnectintl.org" />;
}
