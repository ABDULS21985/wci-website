import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/shared/json-ld";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { serviceTowers } from "@/data/services-global";
import { ServicesPageClient } from "./services-page-client";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
    title: "Enterprise Technology Services | Digibit",
    description:
        "22 service towers covering strategy, transformation, technology, cybersecurity, and more. Expert advisory and implementation services for enterprises worldwide.",
    openGraph: {
        title: "Enterprise Technology Services | Digibit",
        description:
            "22 service towers covering strategy, transformation, technology, cybersecurity, and more.",
        url: "https://globaldigibit.com/services",
    },
};

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    // Sort towers to show featured ones first
    const sortedTowers = [...serviceTowers].sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return (a.displayOrder ?? 0) - (b.displayOrder ?? 0);
    });

    return (
        <>
            <JsonLd
                data={generateBreadcrumbSchema([
                    { name: "Home", url: "/" },
                    { name: "Services", url: "/services" },
                ])}
            />
            <ServicesPageClient towers={sortedTowers} />
        </>
    );
}
