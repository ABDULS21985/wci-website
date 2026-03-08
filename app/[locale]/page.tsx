import { setRequestLocale } from "next-intl/server";
import {
  HeroSection,
  PartnersSection,
  WhoWeAreSection,
  ProcessSection,
  PlatformSection,
  ProgramsSection,
  WhyChooseUsSection,
  BlogSection,
  FaqsSection,
  TestimonialsSection,
} from "../../components/home";
import { JsonLd } from "@/components/shared/json-ld";
import { generateWebSiteSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
    <JsonLd data={generateWebSiteSchema()} />
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <PartnersSection />
      <WhoWeAreSection />
      <ProgramsSection />
      <ProcessSection />
      <PlatformSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <BlogSection />
      <FaqsSection />
    </main>
    </>
  );
}
