// Organization Schema
export { OrganizationSchema } from "./organization-schema";

// FAQ Schema
export {
  FAQSchema,
  HomeFAQSchema,
  defaultFAQs,
} from "./faq-schema";
export type { FAQItem } from "./faq-schema";

// Breadcrumb Schema
export {
  BreadcrumbSchema,
  generateBreadcrumbs,
  HomeBreadcrumb,
  AboutBreadcrumb,
  ContactBreadcrumb,
  ProgramsBreadcrumb,
  PlatformBreadcrumb,
  GetInvolvedBreadcrumb,
  BlogBreadcrumb,
} from "./breadcrumb-schema";
export type { BreadcrumbItem } from "./breadcrumb-schema";
