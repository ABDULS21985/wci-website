// =============================================================================
// Global Services Catalog Types
// =============================================================================
// Service Tower Model types for the enterprise services catalog

// -----------------------------------------------------------------------------
// Core Service Tower Types
// -----------------------------------------------------------------------------

export interface ServiceTower {
  id?: string;
  code: string;
  name: string;
  shortName: string;
  slug: string;
  description: string;
  scope?: string;
  typicalOutcomes?: string[];
  icon: string;
  accentColor: string;
  displayOrder?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  certifications?: string[];
  frameworks?: string[];
  richContent?: ServiceTowerRichContent;
  services: CatalogService[];
}

export interface CatalogService {
  id?: string;
  towerId?: string;
  name: string;
  slug: string;
  description: string;
  scope?: string;
  icon: string;
  typicalDeliverables?: string[];
  outcomes?: string[];
  engagementTypes?: string[];
  durationRange?: { min: string; max: string };
  displayOrder?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  industryTags?: string[];
  deliverables?: ServiceDeliverable[];
}

export interface ServiceDeliverable {
  id: string;
  serviceId: string;
  name: string;
  description?: string;
  displayOrder: number;
}

// -----------------------------------------------------------------------------
// ISO/Compliance Rich Content Types (used by specialized service pages)
// -----------------------------------------------------------------------------

export interface PDCAStage {
  stage: 'Plan' | 'Do' | 'Check' | 'Act' | string;
  headline: string;
  description: string;
  activities?: string[];
  outputs?: string[];
}

export interface ComplianceRoadmapStep {
  title: string;
  description: string;
  duration?: string;
  outcome?: string;
  deliverables?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TechnicalMappingItem {
  title: string;
  detail: string;
  reference?: string;
}

export interface TechnicalMapping {
  framework: string;
  items: TechnicalMappingItem[];
}

export interface ReadinessQuizOption {
  label: string;
  value: string;
  score: number;
  helper?: string;
}

export interface ReadinessQuizQuestion {
  id: string;
  prompt: string;
  options: ReadinessQuizOption[];
}

export interface ReadinessQuizConfig {
  headline?: string;
  ctaLabel?: string;
  questions: ReadinessQuizQuestion[];
}

export interface EstimatorAdjustment {
  label: string;
  deltaMonths: number;
}

export interface TimeToCertEstimator {
  baseMonthsBySize: Record<string, number>;
  maturityAdjustments: Record<string, number>;
  accelerators?: EstimatorAdjustment[];
  floorMonths?: number;
}

export interface DiagramLayer {
  id: string;
  label: string;
  description: string;
  accent?: string;
}

export interface ServiceTowerRichContent {
  executiveSummary?: string[];
  technicalMappings?: TechnicalMapping[];
  pdca?: PDCAStage[];
  complianceRoadmap?: ComplianceRoadmapStep[];
  faqs?: FAQItem[];
  readinessQuiz?: ReadinessQuizConfig;
  estimator?: TimeToCertEstimator;
  diagramLayers?: DiagramLayer[];
}

// -----------------------------------------------------------------------------
// Engagement Model Types
// -----------------------------------------------------------------------------

export interface EngagementModel {
  id?: string;
  code: string;
  name: string;
  slug: string;
  description: string;
  durationRange?: string;
  typicalOutputs?: string[];
  icon: string;
  accentColor?: string;
  displayOrder?: number;
}

// -----------------------------------------------------------------------------
// Industry Practice Types
// -----------------------------------------------------------------------------

export interface IndustryPractice {
  id?: string;
  code: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  accentColor?: string;
  subSectors?: string[];
  keyOfferings?: string[];
  relatedTowerIds?: string[];
  relatedTowerCodes?: string[];
  displayOrder?: number;
}

// -----------------------------------------------------------------------------
// Component Props Types
// -----------------------------------------------------------------------------

export interface ServiceTowerCardProps {
  tower: ServiceTower;
  showServiceCount?: boolean;
}

export interface ServiceTowerGridProps {
  towers: ServiceTower[];
  layout?: 'grid' | 'list';
  showStats?: boolean;
}

// -----------------------------------------------------------------------------
// API Response Types
// -----------------------------------------------------------------------------

export interface ServiceCatalogResponse {
  towers: ServiceTower[];
  engagementModels: EngagementModel[];
  industryPractices: IndustryPractice[];
  stats: {
    totalTowers: number;
    totalServices: number;
    totalIndustries: number;
  };
}
