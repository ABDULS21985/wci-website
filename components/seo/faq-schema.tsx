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
  const baseUrl = "https://globaldigibit.com";

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
    question: "What services does Global Digitalbit offer?",
    answer:
      "We specialize in IT consultancy, implementation, and training in key areas such as data analytics, artificial intelligence, cybersecurity, and central bank digital currency (CBDC). We also offer business process management, blockchain services, and comprehensive IT solutions tailored to your needs.",
  },
  {
    question: "How can your solutions help my business grow?",
    answer:
      "Our solutions are designed to streamline operations, enhance security, and leverage cutting-edge technologies like AI and blockchain. We help businesses optimize their processes, make data-driven decisions, and stay ahead of the competition through digital transformation.",
  },
  {
    question: "Do you provide training for our team?",
    answer:
      "Yes! We offer comprehensive training programs for individuals and organizations to enhance their IT capabilities. Our training covers various topics including data analytics, cybersecurity, blockchain technology, and more, ensuring your team stays up-to-date with the latest technologies.",
  },
  {
    question: "What makes Global Digitalbit different from other IT companies?",
    answer:
      "We combine innovation, reliability, integrity, and teamwork to deliver exceptional value. Our flagship platforms (DigiGate, TrustMe, and DigiTrack) provide enterprise-grade solutions, and we're committed to improving lives through technology while maintaining the highest ethical standards.",
  },
  {
    question: "How do I get started with your services?",
    answer:
      "Getting started is easy! Simply contact us through our website or give us a call. We'll schedule a consultation to understand your unique business needs and challenges, then develop a tailored solution that aligns with your long-term goals.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Absolutely! Global Digitalbit is positioned to serve both local and international clients with excellence and innovation. We have offices in Nigeria and Qatar, and we work with clients worldwide to deliver transformative technology solutions.",
  },
];

// Pre-configured FAQ schema with default FAQs
export function HomeFAQSchema() {
  return <FAQSchema faqs={defaultFAQs} pageUrl="https://globaldigibit.com" />;
}

// Product-specific FAQs
export const productFAQs: Record<string, FAQItem[]> = {
  digigate: [
    {
      question: "What is DigiGate?",
      answer:
        "DigiGate is a comprehensive API gateway and lifecycle management solution that acts as the centralized control layer for an organization's entire digital infrastructure. It manages all inbound and outbound API traffic while enforcing security, routing policies, and governance at scale.",
    },
    {
      question: "What security features does DigiGate offer?",
      answer:
        "DigiGate provides OAuth 2.0, JWT validation, rate limiting, and threat protection for all your APIs. It offers centralized security enforcement, intelligent traffic routing, and real-time monitoring with anomaly detection.",
    },
    {
      question: "Who should use DigiGate?",
      answer:
        "DigiGate is ideal for financial institutions with complex integrations, government digital transformation projects, enterprises with microservices architectures, and any organization requiring PCI-DSS, GDPR, or local regulatory compliance.",
    },
  ],
  digitrust: [
    {
      question: "What is DigiTrust?",
      answer:
        "DigiTrust is a blockchain-based solution for issuing, verifying, and managing tamper-proof digital credentials. From educational certificates to professional licenses, land titles to insurance policies, DigiTrust ensures document authenticity is never in question.",
    },
    {
      question: "How does DigiTrust prevent document fraud?",
      answer:
        "DigiTrust uses blockchain technology to anchor credentials immutably, making them tamper-proof. Each credential can be instantly verified via QR code or document ID, with a full audit trail for regulatory compliance.",
    },
    {
      question: "What types of credentials can DigiTrust manage?",
      answer:
        "DigiTrust can manage educational certificates, professional licenses, land titles, insurance policies, birth certificates, membership credentials, and any other document requiring verification of authenticity.",
    },
  ],
  digitrack: [
    {
      question: "What is DigiTrack?",
      answer:
        "DigiTrack provides real-time tracking and traceability for physical assets, digital transactions, and service delivery workflows. It's built for industries requiring complete chain-of-custody documentation and operational transparency.",
    },
    {
      question: "What tracking capabilities does DigiTrack offer?",
      answer:
        "DigiTrack offers GPS, RFID, and IoT sensor integration for real-time location tracking, transaction traceability with end-to-end audit trails, service delivery monitoring with SLA tracking, and ML-powered predictive analytics.",
    },
    {
      question: "Which industries benefit from DigiTrack?",
      answer:
        "DigiTrack is valuable for supply chain management, financial services transaction monitoring, healthcare device and specimen tracking, and energy sector equipment maintenance and compliance.",
    },
  ],
  trustmehub: [
    {
      question: "What is TrustMeHub?",
      answer:
        "TrustMeHub is a global digital trust infrastructure for instant, blockchain-anchored credential verification. It can verify any credential in milliseconds instead of weeks, ensuring authenticity at national scale.",
    },
    {
      question: "How fast is TrustMeHub verification?",
      answer:
        "TrustMeHub delivers sub-10ms verification responses with 92%+ cache hit rates, capable of handling 100,000+ verifications per second. This transforms verification from a 4-6 week process to milliseconds.",
    },
    {
      question: "What privacy features does TrustMeHub offer?",
      answer:
        "TrustMeHub uses Zero-Knowledge Proofs for selective disclosure, enabling privacy-preserving verification without exposing sensitive data. It's GDPR compliant and supports multi-language interfaces.",
    },
  ],
  boacrm: [
    {
      question: "What is BoaCRM?",
      answer:
        "BoaCRM is a comprehensive enterprise-grade CRM platform purpose-built for African financial institutions. With 35 integrated modules and native compliance for NDPR/KYC/AML, it transforms how banks manage customer relationships at scale.",
    },
    {
      question: "What makes BoaCRM suitable for African banks?",
      answer:
        "BoaCRM provides native African compliance (NDPR, KYC/AML, BVN/NIN verification), is 3-5x more affordable than Salesforce or Dynamics, and is specifically designed for the needs of commercial banks, microfinance banks, PSPs, and insurance companies in Africa.",
    },
    {
      question: "What modules does BoaCRM include?",
      answer:
        "BoaCRM includes 35 modules covering Customer 360, omnichannel engagement (WhatsApp, SMS, email, voice), contact center suite with IVR and ACD, compliance governance, conversational AI chatbot builder, and ML-powered analytics.",
    },
  ],
};

export function ProductFAQSchema({ productId }: { productId: string }) {
  const faqs = productFAQs[productId];
  if (!faqs) return null;

  return (
    <FAQSchema
      faqs={faqs}
      pageUrl={`https://globaldigibit.com/products/${productId}`}
    />
  );
}
