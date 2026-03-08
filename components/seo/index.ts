// Organization Schema
export { OrganizationSchema } from "./organization-schema";

// Product Schemas
export {
  ProductSchema,
  DigiGateSchema,
  DigiTrustSchema,
  DigiTrackSchema,
  TrustMeHubSchema,
  BoaCRMSchema,
} from "./product-schema";

// FAQ Schema
export {
  FAQSchema,
  HomeFAQSchema,
  ProductFAQSchema,
  defaultFAQs,
  productFAQs,
} from "./faq-schema";
export type { FAQItem } from "./faq-schema";

// Breadcrumb Schema
export {
  BreadcrumbSchema,
  generateBreadcrumbs,
  HomeBreadcrumb,
  AboutBreadcrumb,
  ContactBreadcrumb,
  ProductsBreadcrumb,
  ProductDetailBreadcrumb,
  ServicesBreadcrumb,
  ServiceDetailBreadcrumb,
  TrainingBreadcrumb,
  BlogBreadcrumb,
} from "./breadcrumb-schema";
export type { BreadcrumbItem } from "./breadcrumb-schema";

// Service Schemas
export {
  ServiceSchema,
  ServiceCategorySchema,
  CybersecurityServiceSchema,
  AIDataServiceSchema,
  BlockchainServiceSchema,
  ITGovernanceServiceSchema,
  AllServicesSchema,
} from "./service-schema";
