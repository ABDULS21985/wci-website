import type {
  ServiceTower,
  CatalogService,
  EngagementModel,
  IndustryPractice,
} from '../types/services-global';

// Re-export types for convenience
export type { ServiceTower, CatalogService, EngagementModel, IndustryPractice };

/**
 * Helper function to generate slug from name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Service Tower data - 22 towers covering Global Digibit's consulting services
 */
export const serviceTowers: ServiceTower[] = [
  // TOWER 1: CORPORATE, DIGITAL & BUSINESS STRATEGY
  {
    code: 'STRATEGY',
    name: 'Corporate, Digital & Business Strategy',
    shortName: 'Business Strategy',
    slug: generateSlug('Business Strategy'),
    icon: 'Target',
    accentColor: '#1E4DB7',
    description: 'Define strategic direction, competitive positioning, and digital business models that drive sustainable growth.',
    scope: 'Corporate strategy, growth strategy, competitive positioning, portfolio strategy, digital business strategy, platform strategy, innovation strategy, strategic roadmaps and execution blueprints.',
    typicalOutcomes: ['Clear direction with quantified benefits', 'Investment prioritization framework', 'Delivery-ready strategic roadmap'],
    certifications: [],
    frameworks: ['Blue Ocean Strategy', "Porter's Five Forces", 'BCG Matrix'],
    isFeatured: true,
    displayOrder: 1,
    services: [
      { name: 'Corporate Strategy Development', slug: generateSlug('Corporate Strategy Development'), description: 'Develop comprehensive 3-5 year strategic plans with clear direction and measurable goals.', icon: 'Compass', typicalDeliverables: ['Strategy blueprint (3-5 year plan)', 'Value-creation roadmap', 'KPI tree and success metrics'] },
      { name: 'Digital Business Strategy', slug: generateSlug('Digital Business Strategy'), description: 'Define digital-first business models, platform strategies, and innovation roadmaps.', icon: 'Laptop', typicalDeliverables: ['Digital strategy framework', 'Platform business model canvas', 'Innovation pipeline'] },
      { name: 'Growth & Market Entry Strategy', slug: generateSlug('Growth & Market Entry Strategy'), description: 'Identify growth opportunities, new markets, and expansion strategies.', icon: 'TrendingUp', typicalDeliverables: ['Market entry plan', 'Competitive analysis', 'Growth opportunity assessment'] },
      { name: 'Portfolio Strategy & Optimization', slug: generateSlug('Portfolio Strategy & Optimization'), description: 'Rationalize product/service portfolios and prioritize investments.', icon: 'PieChart', typicalDeliverables: ['Portfolio rationalization roadmap', 'Investment prioritization matrix', 'Divestiture/acquisition recommendations'] },
      { name: 'Monetization & Pricing Strategy', slug: generateSlug('Monetization & Pricing Strategy'), description: 'Design revenue models, pricing frameworks, and commercial strategies.', icon: 'DollarSign', typicalDeliverables: ['Pricing framework', 'Revenue model options', 'Commercial strategy playbook'] },
    ],
  },
  // TOWER 2: ENTERPRISE TRANSFORMATION & EXECUTION
  {
    code: 'TRANSFORM',
    name: 'Enterprise Transformation & Execution',
    shortName: 'Transformation Office',
    slug: generateSlug('Transformation Office'),
    icon: 'Rocket',
    accentColor: '#F59A23',
    description: 'Drive successful transformation through governance, program delivery, and benefit realization.',
    scope: 'Transformation governance, program delivery, execution cadence, benefit realization, Agile/Hybrid PMO, enterprise delivery assurance, portfolio management, RAID management, stage gates, executive reporting.',
    typicalOutcomes: ['Predictable execution', 'Full visibility into progress', 'Risk containment', 'Measurable outcomes'],
    certifications: ['PMP', 'PRINCE2', 'SAFe'],
    frameworks: ['SAFe', 'PRINCE2', 'PMI', 'Agile'],
    isFeatured: true,
    displayOrder: 2,
    services: [
      { name: 'Transformation PMO Setup', slug: generateSlug('Transformation PMO Setup'), description: 'Establish transformation office with governance, roles, and cadence.', icon: 'Building2', typicalDeliverables: ['PMO charter and governance model', 'Role definitions and RACI', 'Delivery cadence framework'] },
      { name: 'Program Delivery Assurance', slug: generateSlug('Program Delivery Assurance'), description: 'Ensure delivery quality through stage gates, reviews, and risk controls.', icon: 'ShieldCheck', typicalDeliverables: ['Delivery assurance framework', 'Stage gate criteria', 'Executive reporting dashboard'] },
      { name: 'Benefits Realization Management', slug: generateSlug('Benefits Realization Management'), description: 'Track and realize transformation benefits with clear ownership.', icon: 'LineChart', typicalDeliverables: ['Benefits realization model', 'OKR/KPI governance framework', 'Benefits tracking dashboard'] },
      { name: 'Agile Transformation Enablement', slug: generateSlug('Agile Transformation Enablement'), description: 'Enable organization-wide agile adoption and ways of working.', icon: 'Zap', typicalDeliverables: ['Agile operating model', 'Agile maturity assessment', 'Transformation playbook'] },
      { name: 'Go-Live Readiness & PIR', slug: generateSlug('Go-Live Readiness & PIR'), description: 'Ensure successful launches and capture lessons learned.', icon: 'CheckCircle2', typicalDeliverables: ['Go-live readiness checklist', 'Cutover plan', 'Post-implementation review'] },
    ],
  },
  // TOWER 3: OPERATING MODEL & ORGANIZATION DESIGN
  {
    code: 'OPS-MODEL',
    name: 'Operating Model, Governance & Organization Design',
    shortName: 'Operating Model',
    slug: generateSlug('Operating Model'),
    icon: 'Network',
    accentColor: '#143A8F',
    description: 'Design scalable operating models with clear accountability and governance.',
    scope: 'Target Operating Model (TOM), business capability mapping, governance, decision rights, service catalogs, shared services design, RACI, org structure, performance model.',
    typicalOutcomes: ['Clear accountability', 'Scalable operations', 'Reduced duplication', 'Better control'],
    certifications: [],
    frameworks: ['TOGAF', 'Business Capability Modeling', 'POLDAT'],
    isFeatured: false,
    displayOrder: 3,
    services: [
      { name: 'Target Operating Model Design', slug: generateSlug('Target Operating Model Design'), description: 'Define future-state operating model aligned to strategy.', icon: 'Boxes', typicalDeliverables: ['TOM pack with capability map', 'Service model definition', 'Operating model blueprint'] },
      { name: 'Business Capability Mapping', slug: generateSlug('Business Capability Mapping'), description: 'Map organizational capabilities to identify gaps and priorities.', icon: 'Map', typicalDeliverables: ['Business capability model', 'Capability heat map', 'Investment prioritization'] },
      { name: 'Governance Framework Design', slug: generateSlug('Governance Framework Design'), description: 'Establish decision rights, forums, and escalation paths.', icon: 'Scale', typicalDeliverables: ['Decision rights matrix', 'Governance forum design', 'Escalation procedures'] },
      { name: 'Organization Structure Design', slug: generateSlug('Organization Structure Design'), description: 'Design org structures that enable strategy execution.', icon: 'Users', typicalDeliverables: ['Organization design options', 'RACI matrix', 'Role handbooks'] },
      { name: 'Shared Services Design', slug: generateSlug('Shared Services Design'), description: 'Design efficient shared services and service catalogs.', icon: 'Share2', typicalDeliverables: ['Shared services model', 'Service catalog', 'SLA framework'] },
    ],
  },
  // TOWER 4: PERFORMANCE IMPROVEMENT & COST TRANSFORMATION
  {
    code: 'PERF-COST',
    name: 'Performance Improvement & Cost Transformation',
    shortName: 'Cost Transformation',
    slug: generateSlug('Cost Transformation'),
    icon: 'TrendingDown',
    accentColor: '#10B981',
    description: 'Drive sustainable cost reduction and performance improvement.',
    scope: 'Cost optimization, productivity improvement, SG&A optimization, lean process redesign, zero-based budgeting support, performance cockpit, operational rhythm.',
    typicalOutcomes: ['Measurable cost savings', 'Improved throughput', 'Sustainable performance discipline'],
    certifications: ['Lean Six Sigma'],
    frameworks: ['Lean', 'Six Sigma', 'Zero-Based Budgeting'],
    isFeatured: false,
    displayOrder: 4,
    services: [
      { name: 'Cost Optimization Program', slug: generateSlug('Cost Optimization Program'), description: 'Identify and realize cost reduction opportunities across the organization.', icon: 'Scissors', typicalDeliverables: ['Cost takeout plan (quick wins + structural)', 'Business case per initiative', 'Implementation roadmap'] },
      { name: 'Productivity Improvement', slug: generateSlug('Productivity Improvement'), description: 'Improve workforce and process productivity.', icon: 'Gauge', typicalDeliverables: ['Productivity baseline', 'Target metrics framework', 'Performance dashboards'] },
      { name: 'Process Redesign & Lean', slug: generateSlug('Process Redesign & Lean'), description: 'Redesign processes using lean principles.', icon: 'Workflow', typicalDeliverables: ['Process maps (current/future state)', 'Lean improvement opportunities', 'Control points design'] },
      { name: 'Zero-Based Budgeting Support', slug: generateSlug('Zero-Based Budgeting Support'), description: 'Implement ZBB methodology for cost control.', icon: 'Calculator', typicalDeliverables: ['ZBB methodology guide', 'Decision packages', 'Prioritization framework'] },
    ],
  },
  // TOWER 5: OPERATIONS EXCELLENCE
  {
    code: 'OPS-EXCEL',
    name: 'Operations Excellence',
    shortName: 'Operations Excellence',
    slug: generateSlug('Operations Excellence'),
    icon: 'Settings2',
    accentColor: '#6366F1',
    description: 'Optimize business and IT operations for speed, quality, and compliance.',
    scope: 'Business operations redesign, service operations, field operations, shared services, supply chain/logistics advisory, IT operations uplift, process, tooling, runbooks, incident/problem/change.',
    typicalOutcomes: ['Faster operations', 'Reduced downtime', 'Improved service quality', 'Enhanced compliance'],
    certifications: ['ITIL', 'ISO 20000'],
    frameworks: ['ITIL 4', 'SRE', 'DevOps'],
    isFeatured: false,
    displayOrder: 5,
    services: [
      { name: 'Business Operations Redesign', slug: generateSlug('Business Operations Redesign'), description: 'Redesign business operations for efficiency and scale.', icon: 'RefreshCw', typicalDeliverables: ['Operations maturity assessment', 'Redesigned workflows', 'Operating procedures'] },
      { name: 'IT Service Operations Uplift', slug: generateSlug('IT Service Operations Uplift'), description: 'Improve IT operations with modern practices.', icon: 'Server', typicalDeliverables: ['Service operations runbooks', 'SLAs/OLAs design', 'Escalation models'] },
      { name: 'Service Desk Optimization', slug: generateSlug('Service Desk Optimization'), description: 'Optimize service desk for better user experience.', icon: 'Headphones', typicalDeliverables: ['Service desk assessment', 'Knowledge base design', 'Automation opportunities'] },
      { name: 'Process Automation Pipeline', slug: generateSlug('Process Automation Pipeline'), description: 'Build pipeline of automation opportunities.', icon: 'Bot', typicalDeliverables: ['Automation backlog', 'Business case per automation', 'Implementation roadmap'] },
    ],
  },
  // TOWER 6: CUSTOMER EXPERIENCE & GROWTH
  {
    code: 'CX-GROWTH',
    name: 'Customer Experience, Marketing, Sales & Growth',
    shortName: 'Customer Experience',
    slug: generateSlug('Customer Experience'),
    icon: 'Heart',
    accentColor: '#EC4899',
    description: 'Transform customer experience and drive sustainable growth.',
    scope: 'Customer journey mapping, omnichannel strategy, service design, sales effectiveness, revenue operations, pricing & monetization strategy, CRM strategy and adoption enablement.',
    typicalOutcomes: ['Higher conversion rates', 'Better retention', 'Improved customer satisfaction'],
    certifications: [],
    frameworks: ['Design Thinking', 'Jobs-to-be-Done', 'NPS'],
    isFeatured: true,
    displayOrder: 6,
    services: [
      { name: 'Customer Journey Mapping', slug: generateSlug('Customer Journey Mapping'), description: 'Map and optimize end-to-end customer journeys.', icon: 'Route', typicalDeliverables: ['Customer journey maps', 'Pain point analysis', 'Experience improvement roadmap'] },
      { name: 'Omnichannel Strategy', slug: generateSlug('Omnichannel Strategy'), description: 'Design seamless experiences across all channels.', icon: 'Layers', typicalDeliverables: ['Channel strategy', 'Integration requirements', 'Omnichannel blueprint'] },
      { name: 'Service Design', slug: generateSlug('Service Design'), description: 'Design services that delight customers.', icon: 'Palette', typicalDeliverables: ['Service blueprints', 'Service design artifacts', 'Prototype concepts'] },
      { name: 'Sales Effectiveness', slug: generateSlug('Sales Effectiveness'), description: 'Improve sales productivity and conversion.', icon: 'Target', typicalDeliverables: ['Sales playbooks', 'Sales process optimization', 'Performance metrics'] },
      { name: 'CRM Strategy & Adoption', slug: generateSlug('CRM Strategy & Adoption'), description: 'Define CRM strategy and drive adoption.', icon: 'Users', typicalDeliverables: ['CRM operating model', 'Adoption plan', 'Success metrics'] },
    ],
  },
  // TOWER 7: DIGITAL TRANSFORMATION & AUTOMATION
  {
    code: 'DIGITAL',
    name: 'Digital Transformation & Automation',
    shortName: 'Digital Transformation',
    slug: generateSlug('Digital Transformation'),
    icon: 'Sparkles',
    accentColor: '#8B5CF6',
    description: 'Accelerate digital adoption and intelligent automation.',
    scope: 'Enterprise digitization, digital channels, workflow automation, product operating model, agile delivery enablement, process mining and automation (RPA + workflow + integration).',
    typicalOutcomes: ['Reduced manual work', 'Faster cycle times', 'Improved digital service delivery'],
    certifications: ['UiPath', 'Automation Anywhere'],
    frameworks: ['Product Operating Model', 'DevOps', 'Agile'],
    isFeatured: true,
    displayOrder: 7,
    services: [
      { name: 'Digital Transformation Roadmap', slug: generateSlug('Digital Transformation Roadmap'), description: 'Define comprehensive digital transformation strategy.', icon: 'Map', typicalDeliverables: ['Digital transformation roadmap', 'Target state architecture', 'Investment prioritization'] },
      { name: 'Intelligent Automation (RPA/IPA)', slug: generateSlug('Intelligent Automation RPA IPA'), description: 'Implement robotic and intelligent process automation.', icon: 'Bot', typicalDeliverables: ['Automation backlog', 'Bot design documents', 'Automation CoE setup'] },
      { name: 'Process Mining & Discovery', slug: generateSlug('Process Mining & Discovery'), description: 'Discover automation opportunities through process mining.', icon: 'Search', typicalDeliverables: ['Process mining analysis', 'Automation opportunity map', 'Business case per process'] },
      { name: 'Digital Channel Development', slug: generateSlug('Digital Channel Development'), description: 'Design and build modern digital channels.', icon: 'Smartphone', typicalDeliverables: ['Channel architecture', 'UX/UI designs', 'Implementation roadmap'] },
      { name: 'Agile Delivery Enablement', slug: generateSlug('Agile Delivery Enablement'), description: 'Enable agile ways of working for digital delivery.', icon: 'Zap', typicalDeliverables: ['Agile playbook', 'Team structures', 'Quality gates'] },
    ],
  },
  // TOWER 8: DATA, ANALYTICS & AI TRANSFORMATION
  {
    code: 'AI-DATA',
    name: 'Data, Analytics & AI Transformation',
    shortName: 'Data & AI',
    slug: 'data-ai',
    icon: 'Brain',
    accentColor: '#F59A23',
    description: 'Build trusted data foundations, modern analytics platforms, and scalable AI capabilities that drive measurable business outcomes. Our Data & AI practice helps GCC enterprises unlock the value of their data assets through comprehensive data strategy, governance, engineering, and AI/ML solution delivery. From establishing data-driven cultures to deploying production-grade AI systems, we bridge the gap between data potential and business impact.',
    scope: 'Our end-to-end Data & AI services cover: Data Strategy & Governance (data strategy development, data governance frameworks, data quality management, metadata management, data catalog implementation, master data management, data literacy programs), Data Engineering & Architecture (modern data platform design, data lakehouse architecture, real-time streaming pipelines, ETL/ELT modernization, data mesh implementation, data warehouse optimization), Analytics & Business Intelligence (analytics strategy, self-service BI platforms, executive dashboards, embedded analytics, advanced analytics, geospatial analytics), AI & Machine Learning (AI use-case discovery, ML model development, computer vision, natural language processing, generative AI strategy, large language model fine-tuning), MLOps & AI Engineering (ML pipeline automation, model monitoring, feature stores, experiment tracking, model registry, A/B testing frameworks), Responsible AI & Compliance (AI ethics frameworks, bias detection and mitigation, AI risk assessment ISO/IEC 23894, AI management systems ISO/IEC 42001, explainability and transparency).',
    typicalOutcomes: [
      'Established enterprise data governance framework reducing data quality issues by 60%',
      'Deployed modern data platform processing 10x more data with 50% lower costs',
      'Identified and prioritized 20+ AI use cases with validated business cases',
      'Delivered production AI models generating measurable ROI within 6 months',
      'Implemented MLOps pipelines reducing model deployment time from months to days',
      'Built self-service analytics platform increasing data-driven decisions by 80%',
      'Achieved ISO/IEC 42001 compliance for AI management systems',
      'Created data literacy program increasing data fluency across 500+ employees',
      'Reduced manual reporting effort by 70% through automated dashboards',
      'Implemented real-time analytics enabling sub-second business insights',
      'Established responsible AI framework ensuring fairness, transparency, and accountability',
      'Built enterprise data catalog with 95% metadata coverage across critical datasets'
    ],
    certifications: ['ISO/IEC 42001:2023', 'CDMP', 'AWS ML Specialty', 'Azure AI Engineer', 'Google Professional ML Engineer', 'Databricks ML Professional', 'Snowflake SnowPro Core', 'TensorFlow Developer Certificate', 'Confluent Certified Developer'],
    frameworks: ['DAMA-DMBOK', 'MLOps Maturity Model', 'Responsible AI Framework', 'CRISP-DM', 'Data Mesh Principles', 'DataOps Manifesto', 'ISO/IEC 42001', 'ISO/IEC 23894', 'NIST AI RMF', 'Modern Data Stack', 'FinOps for Data'],
    isFeatured: true,
    displayOrder: 8,
    services: [
      {
        name: 'Data Strategy & Governance',
        slug: generateSlug('Data Strategy & Governance'),
        description: 'Define comprehensive data strategy aligned with business objectives and establish governance frameworks that ensure data quality, security, and compliance.',
        icon: 'Database',
        isFeatured: true,
        isActive: true,
        displayOrder: 1,
        deliverables: [
          { id: 'ds-1', serviceId: 'data-strategy-governance', name: 'Data Strategy Document', description: 'Comprehensive data strategy aligned with business objectives', displayOrder: 1 },
          { id: 'ds-2', serviceId: 'data-strategy-governance', name: 'Data Governance Framework', description: 'Policies, standards, roles, and processes', displayOrder: 2 },
          { id: 'ds-3', serviceId: 'data-strategy-governance', name: 'Data Quality Assessment', description: 'Current state analysis with remediation roadmap', displayOrder: 3 },
          { id: 'ds-4', serviceId: 'data-strategy-governance', name: 'Data Catalog Implementation', description: 'Metadata management platform with business glossary', displayOrder: 4 },
          { id: 'ds-5', serviceId: 'data-strategy-governance', name: 'Data Operating Model', description: 'Organization design and responsibilities', displayOrder: 5 },
          { id: 'ds-6', serviceId: 'data-strategy-governance', name: 'Data Literacy Program', description: 'Training curriculum for data fluency', displayOrder: 6 }
        ],
        engagementTypes: ['ADVISORY'],
        durationRange: { min: '8 weeks', max: '16 weeks' }
      },
      {
        name: 'Data Platform & Engineering',
        slug: generateSlug('Data Platform & Engineering'),
        description: 'Design and build modern data platforms that unify data ingestion, storage, processing, and serving at enterprise scale using cloud-native and open-source technologies.',
        icon: 'Server',
        isFeatured: true,
        isActive: true,
        displayOrder: 2,
        deliverables: [
          { id: 'dp-1', serviceId: 'data-platform-engineering', name: 'Data Platform Architecture', description: 'Modern data platform design (Snowflake, Databricks, BigQuery)', displayOrder: 1 },
          { id: 'dp-2', serviceId: 'data-platform-engineering', name: 'Data Pipeline Framework', description: 'Standardized patterns for batch and streaming', displayOrder: 2 },
          { id: 'dp-3', serviceId: 'data-platform-engineering', name: 'Data Lakehouse Implementation', description: 'Unified analytics platform', displayOrder: 3 },
          { id: 'dp-4', serviceId: 'data-platform-engineering', name: 'Real-Time Streaming Platform', description: 'Kafka/Kinesis-based event streaming', displayOrder: 4 },
          { id: 'dp-5', serviceId: 'data-platform-engineering', name: 'Data Quality Automation', description: 'Automated checks and monitoring', displayOrder: 5 },
          { id: 'dp-6', serviceId: 'data-platform-engineering', name: 'Data Infrastructure as Code', description: 'Terraform modules for data platform provisioning', displayOrder: 6 }
        ],
        engagementTypes: ['IMPLEMENTATION'],
        durationRange: { min: '12 weeks', max: '24 weeks' }
      },
      {
        name: 'Analytics & Business Intelligence',
        slug: generateSlug('Analytics & Business Intelligence'),
        description: 'Transform business decision-making with modern analytics platforms, self-service BI tools, and executive dashboards that empower every business user.',
        icon: 'BarChart',
        isActive: true,
        displayOrder: 3,
        deliverables: [
          { id: 'bi-1', serviceId: 'analytics-bi', name: 'Analytics Strategy', description: 'Roadmap from current to target analytics maturity', displayOrder: 1 },
          { id: 'bi-2', serviceId: 'analytics-bi', name: 'BI Platform Implementation', description: 'Power BI, Tableau, or Looker deployment', displayOrder: 2 },
          { id: 'bi-3', serviceId: 'analytics-bi', name: 'Executive Dashboard Suite', description: 'C-suite dashboards with KPIs and drill-down', displayOrder: 3 },
          { id: 'bi-4', serviceId: 'analytics-bi', name: 'Self-Service BI Framework', description: 'Governed self-service model with training', displayOrder: 4 },
          { id: 'bi-5', serviceId: 'analytics-bi', name: 'Semantic Layer Design', description: 'Business-friendly data models and metrics', displayOrder: 5 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '8 weeks', max: '16 weeks' }
      },
      {
        name: 'AI Use-Case Discovery & Strategy',
        slug: generateSlug('AI Use-Case Discovery & Strategy'),
        description: 'Identify, evaluate, and prioritize AI opportunities across your organization with structured discovery workshops, feasibility assessments, and business case development.',
        icon: 'Lightbulb',
        isFeatured: true,
        isActive: true,
        displayOrder: 4,
        deliverables: [
          { id: 'aiuc-1', serviceId: 'ai-use-case', name: 'AI Maturity Assessment', description: 'Current capabilities evaluation against benchmarks', displayOrder: 1 },
          { id: 'aiuc-2', serviceId: 'ai-use-case', name: 'Use-Case Portfolio', description: 'Prioritized AI opportunities with value estimates', displayOrder: 2 },
          { id: 'aiuc-3', serviceId: 'ai-use-case', name: 'AI Business Cases', description: 'Detailed business cases for top priorities', displayOrder: 3 },
          { id: 'aiuc-4', serviceId: 'ai-use-case', name: 'AI Roadmap', description: 'Multi-year implementation roadmap', displayOrder: 4 },
          { id: 'aiuc-5', serviceId: 'ai-use-case', name: 'AI Organization Design', description: 'Team structure and CoE model', displayOrder: 5 }
        ],
        engagementTypes: ['ADVISORY'],
        durationRange: { min: '4 weeks', max: '8 weeks' }
      },
      {
        name: 'ML/AI Solution Development',
        slug: generateSlug('ML AI Solution Development'),
        description: 'Design, build, and deploy production-grade machine learning and AI solutions from data preparation through model training, validation, and production deployment.',
        icon: 'Bot',
        isFeatured: true,
        isActive: true,
        displayOrder: 5,
        deliverables: [
          { id: 'ml-1', serviceId: 'ml-ai-dev', name: 'ML Solution Architecture', description: 'End-to-end design with data flows and infrastructure', displayOrder: 1 },
          { id: 'ml-2', serviceId: 'ml-ai-dev', name: 'Trained ML Models', description: 'Production-ready models with benchmarks', displayOrder: 2 },
          { id: 'ml-3', serviceId: 'ml-ai-dev', name: 'Model Documentation', description: 'Model cards and performance metrics', displayOrder: 3 },
          { id: 'ml-4', serviceId: 'ml-ai-dev', name: 'API Integration Layer', description: 'Model serving APIs for application integration', displayOrder: 4 },
          { id: 'ml-5', serviceId: 'ml-ai-dev', name: 'Validation Report', description: 'Fairness and bias testing results', displayOrder: 5 },
          { id: 'ml-6', serviceId: 'ml-ai-dev', name: 'Production Deployment Package', description: 'Containerized model with monitoring', displayOrder: 6 }
        ],
        engagementTypes: ['IMPLEMENTATION'],
        durationRange: { min: '8 weeks', max: '20 weeks' }
      },
      {
        name: 'Generative AI & LLM Solutions',
        slug: generateSlug('Generative AI & LLM Solutions'),
        description: 'Harness the power of generative AI and large language models for enterprise applications—from RAG-based knowledge systems and intelligent document processing to custom fine-tuned models and AI-powered workflows.',
        icon: 'Sparkles',
        isFeatured: true,
        isActive: true,
        displayOrder: 6,
        deliverables: [
          { id: 'gen-1', serviceId: 'genai', name: 'GenAI Strategy & Assessment', description: 'Use-case identification with feasibility and risk analysis', displayOrder: 1 },
          { id: 'gen-2', serviceId: 'genai', name: 'RAG System Architecture', description: 'Knowledge retrieval system with vector databases', displayOrder: 2 },
          { id: 'gen-3', serviceId: 'genai', name: 'LLM Fine-Tuning Pipeline', description: 'Custom model training with domain data', displayOrder: 3 },
          { id: 'gen-4', serviceId: 'genai', name: 'Prompt Engineering Library', description: 'Optimized templates and evaluation frameworks', displayOrder: 4 },
          { id: 'gen-5', serviceId: 'genai', name: 'GenAI Governance Framework', description: 'Guardrails, content filtering, and usage policies', displayOrder: 5 },
          { id: 'gen-6', serviceId: 'genai', name: 'Production GenAI Application', description: 'Deployed application with monitoring', displayOrder: 6 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '6 weeks', max: '16 weeks' }
      },
      {
        name: 'MLOps & AI Engineering',
        slug: generateSlug('MLOps & AI Engineering'),
        description: 'Establish scalable MLOps practices and infrastructure that enable development, deployment, monitoring, and retraining of ML models efficiently at enterprise scale.',
        icon: 'GitMerge',
        isActive: true,
        displayOrder: 7,
        deliverables: [
          { id: 'mlo-1', serviceId: 'mlops', name: 'MLOps Platform Architecture', description: 'End-to-end ML platform design and tool selection', displayOrder: 1 },
          { id: 'mlo-2', serviceId: 'mlops', name: 'ML Pipeline Automation', description: 'Automated training, validation, and deployment', displayOrder: 2 },
          { id: 'mlo-3', serviceId: 'mlops', name: 'Feature Store Implementation', description: 'Centralized feature management', displayOrder: 3 },
          { id: 'mlo-4', serviceId: 'mlops', name: 'Model Monitoring Framework', description: 'Performance, drift, and fairness dashboards', displayOrder: 4 },
          { id: 'mlo-5', serviceId: 'mlops', name: 'Experiment Tracking System', description: 'MLflow/W&B for reproducibility', displayOrder: 5 }
        ],
        engagementTypes: ['IMPLEMENTATION'],
        durationRange: { min: '8 weeks', max: '16 weeks' }
      },
      {
        name: 'Responsible AI & AI Governance',
        slug: generateSlug('Responsible AI & AI Governance'),
        description: 'Implement ethical AI practices, governance frameworks, and compliance controls aligned with ISO/IEC 42001 and emerging regional AI regulations.',
        icon: 'Scale',
        isActive: true,
        displayOrder: 8,
        deliverables: [
          { id: 'rai-1', serviceId: 'rai', name: 'AI Ethics Framework', description: 'Principles and decision frameworks for ethical AI', displayOrder: 1 },
          { id: 'rai-2', serviceId: 'rai', name: 'AI Risk Assessment', description: 'ISO/IEC 23894-aligned risk identification', displayOrder: 2 },
          { id: 'rai-3', serviceId: 'rai', name: 'Bias Audit Report', description: 'Fairness analysis across protected attributes', displayOrder: 3 },
          { id: 'rai-4', serviceId: 'rai', name: 'AI Governance Policy Suite', description: 'Policies for development, deployment, monitoring', displayOrder: 4 },
          { id: 'rai-5', serviceId: 'rai', name: 'Explainability Implementation', description: 'SHAP/LIME integration for model interpretability', displayOrder: 5 }
        ],
        engagementTypes: ['ADVISORY'],
        durationRange: { min: '6 weeks', max: '12 weeks' }
      },
      {
        name: 'Data Mesh & Decentralized Data',
        slug: generateSlug('Data Mesh & Decentralized Data'),
        description: 'Implement data mesh principles to enable domain-oriented, self-serve data ownership at scale with federated governance and standardized data products.',
        icon: 'Network',
        isActive: true,
        displayOrder: 9,
        deliverables: [
          { id: 'dm-1', serviceId: 'data-mesh', name: 'Data Mesh Strategy', description: 'Assessment and roadmap for data mesh adoption', displayOrder: 1 },
          { id: 'dm-2', serviceId: 'data-mesh', name: 'Domain & Data Product Design', description: 'Domain boundaries and product specifications', displayOrder: 2 },
          { id: 'dm-3', serviceId: 'data-mesh', name: 'Self-Serve Platform Design', description: 'Infrastructure for domain teams', displayOrder: 3 },
          { id: 'dm-4', serviceId: 'data-mesh', name: 'Federated Governance Model', description: 'Computational governance and automation', displayOrder: 4 },
          { id: 'dm-5', serviceId: 'data-mesh', name: 'Data Contract Standards', description: 'Schema, SLA, and quality contract templates', displayOrder: 5 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '8 weeks', max: '20 weeks' }
      },
      {
        name: 'Executive AI Capacity Building',
        slug: generateSlug('Executive AI Capacity Building'),
        description: 'Build AI literacy and strategic thinking across your leadership team through executive workshops, use-case ideation sessions, and structured learning programs.',
        icon: 'GraduationCap',
        isActive: true,
        displayOrder: 10,
        deliverables: [
          { id: 'eac-1', serviceId: 'exec-ai', name: 'Executive AI Workshop', description: 'Interactive sessions covering AI fundamentals and strategy', displayOrder: 1 },
          { id: 'eac-2', serviceId: 'exec-ai', name: 'AI Literacy Program', description: 'Multi-level training curriculum', displayOrder: 2 },
          { id: 'eac-3', serviceId: 'exec-ai', name: 'Use-Case Ideation Output', description: 'Prioritized opportunities from sessions', displayOrder: 3 },
          { id: 'eac-4', serviceId: 'exec-ai', name: 'AI Readiness Scorecard', description: 'Assessment across data, talent, infrastructure', displayOrder: 4 }
        ],
        engagementTypes: ['ACADEMY'],
        durationRange: { min: '1 day', max: '4 weeks' }
      },
    ],
  },
  // TOWER 9: TECHNOLOGY STRATEGY & ENTERPRISE ARCHITECTURE
  {
    code: 'TECH-ARCH',
    name: 'Technology Strategy, Enterprise Architecture & Modernization',
    shortName: 'Enterprise Architecture',
    slug: generateSlug('Enterprise Architecture'),
    icon: 'Building',
    accentColor: '#0EA5E9',
    description: 'Define technology direction and modernize enterprise architecture.',
    scope: 'Enterprise architecture (TOGAF-aligned), application rationalization, legacy modernization, platform strategy, IT operating model, integration architecture, API strategy, event-driven enablement.',
    typicalOutcomes: ['Reduced tech debt', 'Cleaner architecture', 'Faster delivery', 'Improved scalability'],
    certifications: ['TOGAF', 'AWS SA Professional'],
    frameworks: ['TOGAF', 'Zachman', 'ArchiMate'],
    isFeatured: false,
    displayOrder: 9,
    services: [
      { name: 'Enterprise Architecture Assessment', slug: generateSlug('Enterprise Architecture Assessment'), description: 'Assess current state and define target architecture.', icon: 'Scan', typicalDeliverables: ['EA baseline assessment', 'Target state architecture', 'Architecture principles'] },
      { name: 'Application Portfolio Rationalization', slug: generateSlug('Application Portfolio Rationalization'), description: 'Rationalize applications and define modernization path.', icon: 'Layers', typicalDeliverables: ['Application inventory', 'Rationalization recommendations', 'Modernization roadmap'] },
      { name: 'Legacy Modernization Strategy', slug: generateSlug('Legacy Modernization Strategy'), description: 'Define strategy for legacy system modernization.', icon: 'RefreshCcw', typicalDeliverables: ['Modernization options analysis', 'Migration strategy', 'Risk assessment'] },
      { name: 'Integration & API Strategy', slug: generateSlug('Integration & API Strategy'), description: 'Define integration patterns and API strategy.', icon: 'Plug', typicalDeliverables: ['Integration blueprint', 'API governance model', 'Event-driven architecture patterns'] },
      { name: 'IT Operating Model Design', slug: generateSlug('IT Operating Model Design'), description: 'Design modern IT operating model.', icon: 'Settings', typicalDeliverables: ['IT TOM design', 'Service catalog', 'Governance framework'] },
    ],
  },
  // TOWER 10: CLOUD TRANSFORMATION & PLATFORM ENGINEERING
  {
    code: 'CLOUD',
    name: 'Cloud Transformation & Platform Engineering',
    shortName: 'Cloud & Infrastructure',
    slug: 'cloud-infrastructure',
    icon: 'Cloud',
    accentColor: '#06B6D4',
    description: 'Accelerate cloud adoption and modernize infrastructure with secure, compliant, and cost-effective cloud platforms. Our cloud practice helps GCC enterprises navigate the complexity of multi-cloud environments, data residency requirements, and hybrid architecture patterns. From strategy through execution and ongoing optimization, we deliver cloud solutions that enable business agility while meeting regulatory obligations across Qatar, Saudi Arabia, UAE, and the broader region.',
    scope: 'Our comprehensive cloud services span the full transformation lifecycle: Cloud Strategy & Assessment (cloud readiness, application portfolio analysis, business case development, multi-cloud strategy), Landing Zone & Foundation (secure cloud foundations for AWS, Azure, and GCP, network architecture, identity integration, security baselines, governance guardrails), Migration & Modernization (migration factory, application refactoring, database migration, containerization, serverless adoption), Platform Engineering (internal developer platforms, self-service infrastructure, golden paths, service mesh, API gateways), Hybrid & Multi-Cloud (hybrid connectivity, workload placement, unified management, disaster recovery across clouds), Cloud-Native Development (microservices architecture, Kubernetes orchestration, CI/CD pipelines, GitOps practices), FinOps & Cost Management (cost visibility, optimization, tagging strategies, reserved instance planning, showback/chargeback models), Cloud Operations (SRE practices, observability, incident management, capacity planning, performance optimization). We operate across all major hyperscalers with certified architects and engineers, specializing in regulated industries where data residency and compliance are paramount.',
    typicalOutcomes: [
      'Reduced infrastructure costs by 30-50% through cloud optimization and right-sizing',
      'Accelerated application deployment from months to days with CI/CD and platform engineering',
      'Achieved 99.99% availability through resilient multi-region cloud architectures',
      'Compliant cloud adoption meeting QCB, SAMA, CBUAE, and NCA data residency requirements',
      'Migrated 100+ applications to cloud with zero unplanned downtime using factory methodology',
      'Reduced time-to-market for new features by 70% through cloud-native development',
      'Established FinOps practice delivering 25-40% ongoing cost savings',
      'Built internal developer platform reducing infrastructure provisioning from weeks to minutes',
      'Implemented hybrid cloud connectivity with sub-10ms latency between on-premises and cloud',
      'Achieved cloud security compliance across CIS Benchmarks, SOC 2, and ISO 27017',
      'Enabled disaster recovery with RPO <1 hour and RTO <4 hours across multi-cloud',
      'Containerized legacy applications enabling horizontal scaling and improved resilience'
    ],
    certifications: ['AWS Solutions Architect Professional', 'AWS DevOps Engineer Professional', 'AWS Security Specialty', 'Azure Solutions Architect Expert', 'Azure DevOps Engineer Expert', 'Azure Security Engineer', 'Google Cloud Professional Architect', 'Google Cloud Professional DevOps Engineer', 'Kubernetes Administrator (CKA)', 'Kubernetes Application Developer (CKAD)', 'Kubernetes Security Specialist (CKS)', 'HashiCorp Terraform Associate', 'FinOps Certified Practitioner'],
    frameworks: ['AWS Well-Architected Framework', 'Azure Cloud Adoption Framework (CAF)', 'Google Cloud Architecture Framework', 'FinOps Framework', 'NIST Cloud Computing Reference Architecture', 'Cloud Security Alliance (CSA) STAR', 'CIS Benchmarks', 'The Twelve-Factor App', 'TOGAF (Cloud Architecture)', 'Site Reliability Engineering (SRE)', 'GitOps Principles', 'Platform Engineering Maturity Model'],
    isFeatured: true,
    displayOrder: 10,
    services: [
      {
        name: 'Cloud Strategy & Assessment',
        slug: generateSlug('Cloud Strategy & Assessment'),
        description: 'Define your cloud strategy aligned with business objectives, regulatory requirements, and technology landscape. We assess cloud readiness, analyze application portfolios, evaluate hyperscaler options, and develop comprehensive migration roadmaps with clear business cases for GCC enterprises.',
        scope: 'Cloud readiness assessment, application portfolio analysis (6R methodology), total cost of ownership analysis, multi-cloud strategy development, data residency and compliance mapping, business case and ROI modeling, organizational readiness evaluation.',
        icon: 'Compass',
        isFeatured: true,
        isActive: true,
        displayOrder: 1,
        outcomes: [
          'Clear cloud strategy aligned with business and regulatory requirements',
          'Prioritized migration roadmap with wave planning',
          'Validated business case with TCO and ROI projections',
          'Data residency compliance approach defined'
        ],
        deliverables: [
          { id: 'csa-1', serviceId: 'cloud-strategy-assessment', name: 'Cloud Strategy Document', description: 'Comprehensive strategy covering vision, principles, and hyperscaler selection', displayOrder: 1 },
          { id: 'csa-2', serviceId: 'cloud-strategy-assessment', name: 'Application Portfolio Assessment', description: '6R disposition analysis for all in-scope applications', displayOrder: 2 },
          { id: 'csa-3', serviceId: 'cloud-strategy-assessment', name: 'Cloud Business Case', description: 'TCO analysis, ROI projections, and investment timeline', displayOrder: 3 },
          { id: 'csa-4', serviceId: 'cloud-strategy-assessment', name: 'Migration Roadmap', description: 'Wave-based migration plan with dependencies and timelines', displayOrder: 4 },
          { id: 'csa-5', serviceId: 'cloud-strategy-assessment', name: 'Data Residency Compliance Matrix', description: 'Regulatory mapping for QCB, SAMA, CBUAE, and NCA requirements', displayOrder: 5 },
          { id: 'csa-6', serviceId: 'cloud-strategy-assessment', name: 'Organizational Readiness Assessment', description: 'Skills gap analysis and cloud operating model recommendations', displayOrder: 6 },
          { id: 'csa-7', serviceId: 'cloud-strategy-assessment', name: 'Risk Assessment & Mitigation Plan', description: 'Migration risks with mitigation strategies', displayOrder: 7 }
        ],
        engagementTypes: ['ADVISORY'],
        durationRange: { min: '6 weeks', max: '12 weeks' }
      },
      {
        name: 'Cloud Landing Zone & Foundation',
        slug: generateSlug('Cloud Landing Zone & Foundation'),
        description: 'Design and implement secure, compliant cloud landing zones that serve as the foundation for all cloud workloads. We build enterprise-grade foundations on AWS, Azure, or GCP with identity integration, network connectivity, security baselines, and governance guardrails tailored for GCC regulatory requirements.',
        scope: 'Multi-account/subscription strategy, network architecture (hub-spoke, transit gateway), identity federation and SSO, security baselines and guardrails, logging and monitoring foundation, tagging and cost allocation, compliance controls, Infrastructure as Code (IaC) automation.',
        icon: 'LayoutGrid',
        isFeatured: true,
        isActive: true,
        displayOrder: 2,
        outcomes: [
          'Production-ready cloud foundation with security and compliance built in',
          'Automated account/subscription provisioning with guardrails',
          'Hybrid connectivity established with on-premises data centers',
          'Consistent governance across all cloud environments'
        ],
        deliverables: [
          { id: 'clz-1', serviceId: 'cloud-landing-zone-foundation', name: 'Landing Zone Architecture', description: 'Multi-account strategy, OU structure, and account baseline design', displayOrder: 1 },
          { id: 'clz-2', serviceId: 'cloud-landing-zone-foundation', name: 'Network Architecture', description: 'Hub-spoke topology, DNS, hybrid connectivity, and firewall rules', displayOrder: 2 },
          { id: 'clz-3', serviceId: 'cloud-landing-zone-foundation', name: 'Identity & Access Design', description: 'Federation, SSO, role hierarchy, and break-glass procedures', displayOrder: 3 },
          { id: 'clz-4', serviceId: 'cloud-landing-zone-foundation', name: 'Security Baseline', description: 'CIS benchmarks, detective controls, encryption standards', displayOrder: 4 },
          { id: 'clz-5', serviceId: 'cloud-landing-zone-foundation', name: 'Governance & Guardrails', description: 'Policies, SCPs/Azure Policy, and compliance automation', displayOrder: 5 },
          { id: 'clz-6', serviceId: 'cloud-landing-zone-foundation', name: 'Infrastructure as Code Repository', description: 'Terraform/CloudFormation/Bicep modules for repeatable deployment', displayOrder: 6 },
          { id: 'clz-7', serviceId: 'cloud-landing-zone-foundation', name: 'Observability Foundation', description: 'Centralized logging, monitoring, and alerting setup', displayOrder: 7 },
          { id: 'clz-8', serviceId: 'cloud-landing-zone-foundation', name: 'Operations Runbooks', description: 'Day-2 operational procedures for landing zone management', displayOrder: 8 }
        ],
        engagementTypes: ['IMPLEMENTATION'],
        durationRange: { min: '8 weeks', max: '16 weeks' }
      },
      {
        name: 'Cloud Migration Factory',
        slug: generateSlug('Cloud Migration Factory'),
        description: 'Execute large-scale cloud migrations efficiently using our industrialized migration factory approach. We establish repeatable processes, tooling, and teams that enable rapid, low-risk migration of application portfolios to the cloud, supporting rehost, replatform, and refactor patterns.',
        scope: 'Migration factory setup and process design, wave planning and dependency mapping, automated discovery and assessment tooling, migration execution (rehost, replatform, refactor), database migration (homogeneous and heterogeneous), testing and validation frameworks, cutover planning and execution, legacy decommissioning.',
        icon: 'Server',
        isFeatured: true,
        isActive: true,
        displayOrder: 3,
        outcomes: [
          'Industrialized migration process delivering 20-50 applications per wave',
          'Zero unplanned downtime during migration cutovers',
          'Consistent quality through standardized migration patterns',
          'Accelerated migration timeline through parallel execution'
        ],
        deliverables: [
          { id: 'cmf-1', serviceId: 'cloud-migration-factory', name: 'Migration Factory Blueprint', description: 'Factory operating model, roles, processes, and tooling', displayOrder: 1 },
          { id: 'cmf-2', serviceId: 'cloud-migration-factory', name: 'Application Discovery Report', description: 'Automated discovery with dependency mapping', displayOrder: 2 },
          { id: 'cmf-3', serviceId: 'cloud-migration-factory', name: 'Wave Plans', description: 'Grouped migration waves with dependency sequencing', displayOrder: 3 },
          { id: 'cmf-4', serviceId: 'cloud-migration-factory', name: 'Migration Playbooks', description: 'Step-by-step procedures for each migration pattern', displayOrder: 4 },
          { id: 'cmf-5', serviceId: 'cloud-migration-factory', name: 'Testing & Validation Framework', description: 'Pre and post-migration validation procedures', displayOrder: 5 },
          { id: 'cmf-6', serviceId: 'cloud-migration-factory', name: 'Cutover Runbooks', description: 'Detailed cutover plans with rollback procedures', displayOrder: 6 },
          { id: 'cmf-7', serviceId: 'cloud-migration-factory', name: 'Decommissioning Plan', description: 'Legacy infrastructure retirement schedule and procedures', displayOrder: 7 }
        ],
        engagementTypes: ['IMPLEMENTATION'],
        durationRange: { min: '12 weeks', max: '12 months' }
      },
      {
        name: 'Platform Engineering & Developer Experience',
        slug: generateSlug('Platform Engineering & Developer Experience'),
        description: 'Build internal developer platforms that enable self-service infrastructure provisioning, standardized deployment pipelines, and golden paths for common workloads. We help engineering organizations adopt platform engineering practices that improve developer productivity while maintaining governance and security.',
        scope: 'Internal developer platform (IDP) design and implementation, service catalog and self-service portals, golden paths and reference architectures, CI/CD pipeline standardization, infrastructure abstraction layers, developer documentation and onboarding, platform metrics and adoption tracking.',
        icon: 'Code',
        isFeatured: true,
        isActive: true,
        displayOrder: 4,
        outcomes: [
          'Self-service infrastructure provisioning reducing wait times from weeks to minutes',
          'Standardized CI/CD pipelines improving deployment reliability',
          'Golden paths reducing cognitive load on development teams',
          'Improved developer satisfaction and productivity metrics'
        ],
        deliverables: [
          { id: 'pe-1', serviceId: 'platform-engineering-developer-experience', name: 'Platform Architecture', description: 'IDP architecture with component selection and integration design', displayOrder: 1 },
          { id: 'pe-2', serviceId: 'platform-engineering-developer-experience', name: 'Service Catalog', description: 'Self-service catalog for infrastructure and application templates', displayOrder: 2 },
          { id: 'pe-3', serviceId: 'platform-engineering-developer-experience', name: 'Golden Path Templates', description: 'Opinionated starter templates for common workload patterns', displayOrder: 3 },
          { id: 'pe-4', serviceId: 'platform-engineering-developer-experience', name: 'CI/CD Pipeline Standards', description: 'Standardized pipeline templates with security gates', displayOrder: 4 },
          { id: 'pe-5', serviceId: 'platform-engineering-developer-experience', name: 'Developer Portal', description: 'Documentation, APIs, and onboarding guides (Backstage or similar)', displayOrder: 5 },
          { id: 'pe-6', serviceId: 'platform-engineering-developer-experience', name: 'Platform Metrics Dashboard', description: 'Adoption, lead time, and developer satisfaction metrics', displayOrder: 6 },
          { id: 'pe-7', serviceId: 'platform-engineering-developer-experience', name: 'Platform Team Operating Model', description: 'Team structure, processes, and roadmap management', displayOrder: 7 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '12 weeks', max: '24 weeks' }
      },
      {
        name: 'Kubernetes & Container Platform',
        slug: generateSlug('Kubernetes & Container Platform'),
        description: 'Design and implement production-grade Kubernetes platforms for container orchestration at scale. We help organizations adopt containers and Kubernetes with proper security, observability, and operational practices for both managed services (EKS, AKS, GKE) and self-managed clusters.',
        scope: 'Kubernetes platform design (managed and self-managed), container strategy and migration, service mesh implementation (Istio, Linkerd), container security and image scanning, GitOps deployment workflows, Kubernetes observability stack, multi-cluster management, stateful workload patterns.',
        icon: 'Blocks',
        isActive: true,
        displayOrder: 5,
        outcomes: [
          'Production-grade Kubernetes platform with security and observability',
          'Containerized applications with horizontal scaling capabilities',
          'GitOps-based deployment workflows for consistency',
          'Multi-cluster management for resilience and isolation'
        ],
        deliverables: [
          { id: 'kcp-1', serviceId: 'kubernetes-container-platform', name: 'Kubernetes Platform Architecture', description: 'Cluster topology, networking, storage, and security design', displayOrder: 1 },
          { id: 'kcp-2', serviceId: 'kubernetes-container-platform', name: 'Container Migration Guide', description: 'Containerization patterns and Dockerfile standards', displayOrder: 2 },
          { id: 'kcp-3', serviceId: 'kubernetes-container-platform', name: 'Service Mesh Configuration', description: 'Istio/Linkerd setup for traffic management and security', displayOrder: 3 },
          { id: 'kcp-4', serviceId: 'kubernetes-container-platform', name: 'Container Security Framework', description: 'Image scanning, runtime security, and network policies', displayOrder: 4 },
          { id: 'kcp-5', serviceId: 'kubernetes-container-platform', name: 'GitOps Deployment Pipeline', description: 'ArgoCD/Flux-based deployment workflows', displayOrder: 5 },
          { id: 'kcp-6', serviceId: 'kubernetes-container-platform', name: 'Observability Stack', description: 'Prometheus, Grafana, and distributed tracing setup', displayOrder: 6 },
          { id: 'kcp-7', serviceId: 'kubernetes-container-platform', name: 'Kubernetes Operations Runbooks', description: 'Day-2 operations, troubleshooting, and upgrade procedures', displayOrder: 7 }
        ],
        engagementTypes: ['IMPLEMENTATION'],
        durationRange: { min: '8 weeks', max: '16 weeks' }
      },
      {
        name: 'Hybrid & Multi-Cloud Architecture',
        slug: generateSlug('Hybrid & Multi-Cloud Architecture'),
        description: 'Design hybrid and multi-cloud architectures that enable workload placement optimization, avoid vendor lock-in, and meet data residency requirements. We help GCC enterprises connect on-premises data centers with public cloud environments while maintaining consistent security and governance.',
        scope: 'Hybrid cloud architecture design, multi-cloud strategy and workload placement, hybrid connectivity (Direct Connect, ExpressRoute, Interconnect), unified identity across environments, consistent security controls, disaster recovery across clouds, multi-cloud management and governance.',
        icon: 'Network',
        isActive: true,
        displayOrder: 6,
        outcomes: [
          'Optimized workload placement based on performance, cost, and compliance',
          'Reliable hybrid connectivity with defined SLAs',
          'Consistent governance and security across all environments',
          'Reduced vendor lock-in through cloud-agnostic patterns'
        ],
        deliverables: [
          { id: 'hmc-1', serviceId: 'hybrid-multi-cloud-architecture', name: 'Hybrid Cloud Architecture', description: 'End-to-end architecture spanning on-premises and cloud', displayOrder: 1 },
          { id: 'hmc-2', serviceId: 'hybrid-multi-cloud-architecture', name: 'Workload Placement Framework', description: 'Decision criteria for optimal workload location', displayOrder: 2 },
          { id: 'hmc-3', serviceId: 'hybrid-multi-cloud-architecture', name: 'Hybrid Connectivity Design', description: 'Network topology, bandwidth, and redundancy planning', displayOrder: 3 },
          { id: 'hmc-4', serviceId: 'hybrid-multi-cloud-architecture', name: 'Multi-Cloud Governance Framework', description: 'Unified policies, tagging, and compliance across clouds', displayOrder: 4 },
          { id: 'hmc-5', serviceId: 'hybrid-multi-cloud-architecture', name: 'DR Architecture', description: 'Cross-cloud disaster recovery with RTO/RPO definitions', displayOrder: 5 },
          { id: 'hmc-6', serviceId: 'hybrid-multi-cloud-architecture', name: 'Identity Federation Design', description: 'Consistent identity and access across all environments', displayOrder: 6 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '8 weeks', max: '16 weeks' }
      },
      {
        name: 'FinOps & Cloud Cost Optimization',
        slug: generateSlug('FinOps & Cloud Cost Optimization'),
        description: 'Implement FinOps practices and optimize cloud spending through visibility, allocation, and continuous optimization. We help organizations establish cloud financial management disciplines that balance cost efficiency with performance and innovation needs.',
        scope: 'FinOps practice establishment, cloud cost visibility and dashboards, tagging strategy and enforcement, resource right-sizing analysis, reserved instance and savings plan strategy, waste identification and elimination, showback/chargeback implementation, FinOps organizational model.',
        icon: 'TrendingDown',
        isFeatured: true,
        isActive: true,
        displayOrder: 7,
        outcomes: [
          'Reduced cloud spending by 25-40% through optimization',
          'Full cost visibility with business unit allocation',
          'Automated waste detection and remediation',
          'Sustainable FinOps practice with ongoing governance'
        ],
        deliverables: [
          { id: 'fin-1', serviceId: 'finops-cloud-cost-optimization', name: 'Cloud Cost Analysis Report', description: 'Current spending analysis with optimization opportunities', displayOrder: 1 },
          { id: 'fin-2', serviceId: 'finops-cloud-cost-optimization', name: 'FinOps Operating Model', description: 'Organizational model, roles, and processes for cloud financial management', displayOrder: 2 },
          { id: 'fin-3', serviceId: 'finops-cloud-cost-optimization', name: 'Tagging Strategy', description: 'Comprehensive tagging taxonomy and enforcement policies', displayOrder: 3 },
          { id: 'fin-4', serviceId: 'finops-cloud-cost-optimization', name: 'Right-Sizing Recommendations', description: 'Instance and service optimization recommendations', displayOrder: 4 },
          { id: 'fin-5', serviceId: 'finops-cloud-cost-optimization', name: 'Commitment Strategy', description: 'Reserved instance and savings plan purchasing recommendations', displayOrder: 5 },
          { id: 'fin-6', serviceId: 'finops-cloud-cost-optimization', name: 'Cost Dashboard & Reporting', description: 'Real-time cost visibility dashboards with anomaly detection', displayOrder: 6 },
          { id: 'fin-7', serviceId: 'finops-cloud-cost-optimization', name: 'Showback/Chargeback Model', description: 'Cost allocation model for business unit accountability', displayOrder: 7 }
        ],
        engagementTypes: ['ADVISORY', 'MANAGED'],
        durationRange: { min: '4 weeks', max: '12 weeks' }
      },
      {
        name: 'Cloud-Native Application Modernization',
        slug: generateSlug('Cloud-Native Application Modernization'),
        description: 'Modernize legacy applications to cloud-native architectures using microservices, serverless, and event-driven patterns. We help organizations decompose monoliths, adopt modern development practices, and build applications that fully leverage cloud capabilities.',
        scope: 'Application modernization assessment, monolith decomposition strategy, microservices architecture design, serverless architecture patterns, event-driven architecture, API-first design, database modernization (relational to NoSQL/managed), legacy integration patterns.',
        icon: 'RefreshCw',
        isActive: true,
        displayOrder: 8,
        outcomes: [
          'Modernized applications leveraging cloud-native capabilities',
          'Improved scalability and resilience through microservices',
          'Reduced operational overhead with serverless architectures',
          'Faster feature delivery through decoupled services'
        ],
        deliverables: [
          { id: 'cna-1', serviceId: 'cloud-native-application-modernization', name: 'Modernization Assessment', description: 'Application analysis with modernization path recommendations', displayOrder: 1 },
          { id: 'cna-2', serviceId: 'cloud-native-application-modernization', name: 'Target Architecture', description: 'Cloud-native architecture design with service boundaries', displayOrder: 2 },
          { id: 'cna-3', serviceId: 'cloud-native-application-modernization', name: 'Decomposition Strategy', description: 'Monolith-to-microservices migration approach', displayOrder: 3 },
          { id: 'cna-4', serviceId: 'cloud-native-application-modernization', name: 'API Design & Documentation', description: 'RESTful/gRPC API specifications for services', displayOrder: 4 },
          { id: 'cna-5', serviceId: 'cloud-native-application-modernization', name: 'Database Modernization Plan', description: 'Data migration strategy for modern data stores', displayOrder: 5 },
          { id: 'cna-6', serviceId: 'cloud-native-application-modernization', name: 'Event Architecture', description: 'Event-driven communication patterns and messaging design', displayOrder: 6 },
          { id: 'cna-7', serviceId: 'cloud-native-application-modernization', name: 'Modernization Playbook', description: 'Step-by-step guide for development teams', displayOrder: 7 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '8 weeks', max: '24 weeks' }
      },
      {
        name: 'Site Reliability Engineering (SRE)',
        slug: generateSlug('Site Reliability Engineering'),
        description: 'Implement SRE practices to improve system reliability, reduce toil, and establish sustainable on-call and incident management processes. We help organizations adopt SRE principles including SLOs, error budgets, and automation to deliver reliable cloud services.',
        scope: 'SRE practice establishment, SLI/SLO/SLA framework, error budget policies, observability platform (metrics, logs, traces), incident management process, on-call rotation and escalation, toil identification and automation, chaos engineering introduction.',
        icon: 'Activity',
        isActive: true,
        displayOrder: 9,
        outcomes: [
          'Defined SLOs with error budget-based decision making',
          'Comprehensive observability across all services',
          'Reduced toil through automation',
          'Mature incident management reducing MTTR'
        ],
        deliverables: [
          { id: 'sre-1', serviceId: 'site-reliability-engineering', name: 'SRE Operating Model', description: 'Team structure, roles, and engagement model with development', displayOrder: 1 },
          { id: 'sre-2', serviceId: 'site-reliability-engineering', name: 'SLO Framework', description: 'SLI/SLO definitions and error budget policies', displayOrder: 2 },
          { id: 'sre-3', serviceId: 'site-reliability-engineering', name: 'Observability Architecture', description: 'Metrics, logging, and distributed tracing platform design', displayOrder: 3 },
          { id: 'sre-4', serviceId: 'site-reliability-engineering', name: 'Incident Management Process', description: 'Severity levels, escalation, post-mortems, and improvement tracking', displayOrder: 4 },
          { id: 'sre-5', serviceId: 'site-reliability-engineering', name: 'On-Call Handbook', description: 'On-call procedures, compensation, and rotation guidelines', displayOrder: 5 },
          { id: 'sre-6', serviceId: 'site-reliability-engineering', name: 'Toil Reduction Plan', description: 'Automation opportunities with prioritized backlog', displayOrder: 6 },
          { id: 'sre-7', serviceId: 'site-reliability-engineering', name: 'Reliability Dashboard', description: 'SLO tracking, error budget burn, and reliability metrics', displayOrder: 7 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '8 weeks', max: '16 weeks' }
      },
      {
        name: 'Infrastructure as Code & GitOps',
        slug: generateSlug('Infrastructure as Code & GitOps'),
        description: 'Adopt Infrastructure as Code (IaC) and GitOps practices for consistent, auditable, and repeatable infrastructure management. We help organizations implement Terraform, Pulumi, or cloud-native IaC tools with proper module structures, testing, and CI/CD pipelines.',
        scope: 'IaC strategy and tool selection, Terraform/Pulumi/CloudFormation implementation, module library development, IaC testing frameworks, GitOps workflow design, drift detection and remediation, state management and collaboration, IaC security scanning.',
        icon: 'GitMerge',
        isActive: true,
        displayOrder: 10,
        outcomes: [
          'Infrastructure deployed consistently through code',
          'Auditable infrastructure changes through version control',
          'Reduced configuration drift through GitOps enforcement',
          'Reusable module library accelerating new deployments'
        ],
        deliverables: [
          { id: 'iac-1', serviceId: 'infrastructure-as-code-gitops', name: 'IaC Strategy & Standards', description: 'Tool selection, coding standards, and workflow design', displayOrder: 1 },
          { id: 'iac-2', serviceId: 'infrastructure-as-code-gitops', name: 'Module Library', description: 'Reusable Terraform/Pulumi modules for common patterns', displayOrder: 2 },
          { id: 'iac-3', serviceId: 'infrastructure-as-code-gitops', name: 'GitOps Pipeline', description: 'CI/CD pipeline for infrastructure deployments', displayOrder: 3 },
          { id: 'iac-4', serviceId: 'infrastructure-as-code-gitops', name: 'Testing Framework', description: 'Automated testing for IaC modules and deployments', displayOrder: 4 },
          { id: 'iac-5', serviceId: 'infrastructure-as-code-gitops', name: 'State Management Design', description: 'Remote state, locking, and workspace organization', displayOrder: 5 },
          { id: 'iac-6', serviceId: 'infrastructure-as-code-gitops', name: 'Drift Detection Setup', description: 'Automated drift detection and remediation workflows', displayOrder: 6 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '6 weeks', max: '12 weeks' }
      },
      {
        name: 'Cloud Security & Compliance',
        slug: generateSlug('Cloud Security & Compliance'),
        description: 'Secure cloud environments and achieve compliance with industry frameworks and regional regulations. We implement cloud-native security controls, posture management, and continuous compliance monitoring tailored for GCC data residency and protection requirements.',
        scope: 'Cloud security architecture, cloud security posture management (CSPM), workload protection (CWPP), container security, cloud IAM and access controls, encryption and key management, cloud network security, compliance automation and reporting.',
        icon: 'Lock',
        isActive: true,
        displayOrder: 11,
        outcomes: [
          'Secure cloud environments meeting CIS and regulatory benchmarks',
          'Continuous security posture monitoring with automated remediation',
          'Compliance with data residency requirements across GCC',
          'Protected workloads with defense-in-depth controls'
        ],
        deliverables: [
          { id: 'csc-1', serviceId: 'cloud-security-compliance', name: 'Cloud Security Architecture', description: 'Security controls mapped to cloud services and workloads', displayOrder: 1 },
          { id: 'csc-2', serviceId: 'cloud-security-compliance', name: 'CSPM Implementation', description: 'Cloud security posture management with policy-as-code', displayOrder: 2 },
          { id: 'csc-3', serviceId: 'cloud-security-compliance', name: 'Cloud Security Baseline', description: 'CIS benchmark-aligned hardening standards', displayOrder: 3 },
          { id: 'csc-4', serviceId: 'cloud-security-compliance', name: 'Encryption & Key Management', description: 'KMS configuration and data encryption standards', displayOrder: 4 },
          { id: 'csc-5', serviceId: 'cloud-security-compliance', name: 'Compliance Dashboard', description: 'Real-time compliance status against target frameworks', displayOrder: 5 },
          { id: 'csc-6', serviceId: 'cloud-security-compliance', name: 'Cloud Security Monitoring', description: 'Detection rules and alerting for cloud-specific threats', displayOrder: 6 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '8 weeks', max: '16 weeks' }
      },
      {
        name: 'Cloud Operations & Managed Services',
        slug: generateSlug('Cloud Operations & Managed Services'),
        description: 'Establish or enhance cloud operations capabilities with monitoring, incident management, patch management, and capacity planning. We offer both advisory services for building internal CloudOps teams and managed services for ongoing cloud environment management.',
        scope: 'Cloud operations model design, monitoring and alerting, patch and configuration management, capacity planning, backup and recovery operations, cloud support tiers and SLAs, automation and self-healing, operational reporting.',
        icon: 'Settings',
        isActive: true,
        displayOrder: 12,
        outcomes: [
          'Mature cloud operations with defined SLAs and metrics',
          'Proactive monitoring reducing incident frequency',
          'Automated remediation for common operational issues',
          'Clear operational reporting for stakeholders'
        ],
        deliverables: [
          { id: 'cop-1', serviceId: 'cloud-operations-managed-services', name: 'Cloud Operations Model', description: 'Team structure, processes, and tool stack for CloudOps', displayOrder: 1 },
          { id: 'cop-2', serviceId: 'cloud-operations-managed-services', name: 'Monitoring & Alerting Design', description: 'Comprehensive monitoring with intelligent alerting', displayOrder: 2 },
          { id: 'cop-3', serviceId: 'cloud-operations-managed-services', name: 'Operational Runbooks', description: 'Standard operating procedures for common tasks', displayOrder: 3 },
          { id: 'cop-4', serviceId: 'cloud-operations-managed-services', name: 'Automation Library', description: 'Self-healing scripts and automated remediation', displayOrder: 4 },
          { id: 'cop-5', serviceId: 'cloud-operations-managed-services', name: 'Capacity Planning Framework', description: 'Forecasting and right-sizing methodology', displayOrder: 5 },
          { id: 'cop-6', serviceId: 'cloud-operations-managed-services', name: 'Operations Dashboard', description: 'Real-time operational health and SLA tracking', displayOrder: 6 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION', 'MANAGED'],
        durationRange: { min: '8 weeks', max: 'Ongoing' }
      },
    ],
  },
  // TOWER 11: CYBERSECURITY, IDENTITY & DIGITAL RESILIENCE
  {
    code: 'CYBER',
    name: 'Cybersecurity, Identity & Digital Resilience',
    shortName: 'Cybersecurity',
    slug: generateSlug('Cybersecurity'),
    icon: 'ShieldAlert',
    accentColor: '#EF4444',
    description: 'Protect your organization\'s digital assets, build cyber resilience, and enable secure digital transformation. Our cybersecurity practice combines deep technical expertise with strategic advisory capabilities to help GCC enterprises defend against evolving threats while enabling business growth. From boardroom strategy to security operations, we deliver end-to-end cybersecurity solutions aligned with regional regulatory requirements including QCB, SAMA, CBUAE, and NCA frameworks.',
    scope: 'Our comprehensive cybersecurity services span the full security lifecycle: Cyber Strategy & Governance (board reporting, risk appetite frameworks, security organization design), Security Architecture & Engineering (enterprise security architecture, cloud security, network security, endpoint protection, data security), Identity & Access Management (IAM strategy, PAM implementation, identity governance, Zero Trust enablement, CIAM for customer-facing applications), Security Operations (SOC design and optimization, SIEM/SOAR implementation, threat intelligence, managed detection and response), Application Security (secure SDLC, DevSecOps, application penetration testing, code review), Resilience Engineering (business continuity management ISO 22301, disaster recovery, crisis management, ransomware preparedness), Compliance & Assurance (ISO 27001 certification support, SOC 2 readiness, penetration testing, vulnerability management, security awareness programs). We serve financial services, government, healthcare, energy, and telecommunications sectors with industry-specific security solutions.',
    typicalOutcomes: [
      'Reduced cyber risk exposure by 40-60% through comprehensive security program implementation',
      'Achieved regulatory compliance with QCB, SAMA, CBUAE, or NCA cybersecurity frameworks',
      'Improved Mean Time to Detect (MTTD) from days to hours through SOC optimization',
      'Reduced Mean Time to Respond (MTTR) by 70% with automated incident response playbooks',
      'Strengthened identity security with Zero Trust architecture reducing attack surface by 50%',
      'Enhanced security posture scores from basic to advanced maturity (NIST CSF tiers)',
      'Achieved ISO 27001 certification within 12-18 months of engagement',
      'Reduced security incidents by 65% through proactive threat management',
      'Improved security awareness with phishing susceptibility rates below 5%',
      'Enabled secure cloud adoption with cloud security architecture and controls',
      'Established 24/7 security monitoring capabilities with defined SLAs',
      'Built organizational resilience with tested BC/DR capabilities meeting RTO/RPO targets'
    ],
    certifications: ['ISO 27001', 'ISO 27017', 'ISO 27018', 'ISO 27701', 'ISO 22301', 'SOC 2 Type II', 'PCI DSS', 'NIST CSF', 'CSA STAR', 'HITRUST', 'CISSP', 'CISM', 'CISA', 'CEH', 'OSCP', 'CCSP', 'CRISC'],
    frameworks: ['NIST Cybersecurity Framework (CSF)', 'Zero Trust Architecture (ZTA)', 'MITRE ATT&CK', 'ISO 27001/27002', 'CIS Controls v8', 'OWASP Top 10', 'SANS Top 20', 'COBIT', 'SABSA', 'TOGAF Security', 'Cloud Security Alliance (CSA)', 'FAIR Risk Quantification'],
    isFeatured: true,
    displayOrder: 11,
    services: [
      {
        name: 'Cybersecurity Strategy & Roadmap',
        slug: generateSlug('Cybersecurity Strategy & Roadmap'),
        description: 'Define comprehensive, board-aligned cybersecurity strategy that balances risk management with business enablement. We assess your current security posture, benchmark against industry standards and regional regulations, and develop a prioritized multi-year roadmap for security investments.',
        scope: 'Current state assessment and maturity benchmarking, threat landscape analysis specific to your industry, regulatory requirement mapping (QCB, SAMA, CBUAE, NCA), target state definition and gap analysis, investment prioritization and business case development, security organization design and operating model, board-level reporting frameworks and metrics.',
        icon: 'Map',
        isFeatured: true,
        displayOrder: 1,
        outcomes: [
          'Clear 3-5 year cybersecurity roadmap aligned with business strategy',
          'Board-approved security investment plan with ROI justification',
          'Regulatory compliance gap closure plan',
          'Security organization optimized for effectiveness'
        ],
        deliverables: [
          { id: 'cs-1', serviceId: 'cybersecurity-strategy-roadmap', name: 'Cybersecurity Maturity Assessment Report', description: 'Comprehensive assessment against NIST CSF with current state scoring', displayOrder: 1 },
          { id: 'cs-2', serviceId: 'cybersecurity-strategy-roadmap', name: 'Threat Landscape Analysis', description: 'Industry-specific threat intelligence and attack vector analysis', displayOrder: 2 },
          { id: 'cs-3', serviceId: 'cybersecurity-strategy-roadmap', name: 'Regulatory Compliance Gap Analysis', description: 'Mapping against QCB/SAMA/CBUAE/NCA requirements with remediation priorities', displayOrder: 3 },
          { id: 'cs-4', serviceId: 'cybersecurity-strategy-roadmap', name: 'Cybersecurity Strategy Document', description: 'Board-ready strategy document with vision, objectives, and principles', displayOrder: 4 },
          { id: 'cs-5', serviceId: 'cybersecurity-strategy-roadmap', name: 'Multi-Year Security Roadmap', description: 'Prioritized initiative roadmap with dependencies and resource requirements', displayOrder: 5 },
          { id: 'cs-6', serviceId: 'cybersecurity-strategy-roadmap', name: 'Security Investment Business Case', description: 'Financial analysis with TCO, ROI, and risk reduction metrics', displayOrder: 6 },
          { id: 'cs-7', serviceId: 'cybersecurity-strategy-roadmap', name: 'Security Organization Design', description: 'Target operating model for security function with roles and responsibilities', displayOrder: 7 },
          { id: 'cs-8', serviceId: 'cybersecurity-strategy-roadmap', name: 'Board Reporting Framework', description: 'KPIs, metrics, and dashboard templates for executive reporting', displayOrder: 8 }
        ],
        engagementTypes: ['ADVISORY'],
        durationRange: { min: '6 weeks', max: '12 weeks' }
      },
      {
        name: 'Security Architecture & Engineering',
        slug: generateSlug('Security Architecture & Engineering'),
        description: 'Design and implement enterprise security architecture that protects your digital assets while enabling business agility. We create defense-in-depth architectures covering network, cloud, endpoint, application, and data security layers aligned with industry best practices and regulatory requirements.',
        scope: 'Enterprise security architecture design, security reference architecture development, network security (segmentation, firewalls, IDS/IPS), cloud security architecture (AWS, Azure, GCP), endpoint security strategy, data security and DLP architecture, security technology selection and integration, security standards and baselines.',
        icon: 'Building',
        isFeatured: true,
        displayOrder: 2,
        outcomes: [
          'Comprehensive security architecture aligned with business requirements',
          'Defense-in-depth protection across all technology layers',
          'Reduced attack surface through proper segmentation',
          'Standardized security controls across the enterprise'
        ],
        deliverables: [
          { id: 'sa-1', serviceId: 'security-architecture-engineering', name: 'Enterprise Security Architecture Blueprint', description: 'Comprehensive architecture document covering all security domains', displayOrder: 1 },
          { id: 'sa-2', serviceId: 'security-architecture-engineering', name: 'Security Reference Architecture', description: 'Reusable patterns and standards for common scenarios', displayOrder: 2 },
          { id: 'sa-3', serviceId: 'security-architecture-engineering', name: 'Network Security Design', description: 'Segmentation strategy, firewall rules, and network security controls', displayOrder: 3 },
          { id: 'sa-4', serviceId: 'security-architecture-engineering', name: 'Cloud Security Architecture', description: 'Security controls and configurations for cloud environments', displayOrder: 4 },
          { id: 'sa-5', serviceId: 'security-architecture-engineering', name: 'Data Security Architecture', description: 'Classification scheme, encryption standards, and DLP controls', displayOrder: 5 },
          { id: 'sa-6', serviceId: 'security-architecture-engineering', name: 'Security Technology Standards', description: 'Approved products, configurations, and integration patterns', displayOrder: 6 },
          { id: 'sa-7', serviceId: 'security-architecture-engineering', name: 'Security Baselines', description: 'Hardening standards for servers, endpoints, and applications', displayOrder: 7 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '8 weeks', max: '16 weeks' }
      },
      {
        name: 'Identity & Access Management (IAM)',
        slug: generateSlug('Identity & Access Management'),
        description: 'Implement comprehensive identity and access management solutions that secure access to applications and data while improving user experience. From workforce IAM to customer identity (CIAM) and privileged access management (PAM), we design and deploy identity solutions that reduce risk and enable digital transformation.',
        scope: 'IAM strategy and roadmap development, identity governance and administration (IGA), single sign-on (SSO) and federation, multi-factor authentication (MFA), privileged access management (PAM), customer identity and access management (CIAM), directory services and identity stores, access certification and recertification, role-based access control (RBAC) design.',
        icon: 'UserCheck',
        isFeatured: true,
        displayOrder: 3,
        outcomes: [
          'Unified identity platform reducing access management complexity',
          'Improved user experience with SSO and passwordless authentication',
          'Reduced risk from privileged access with PAM controls',
          'Automated access provisioning and deprovisioning',
          'Compliance with identity-related regulatory requirements'
        ],
        deliverables: [
          { id: 'iam-1', serviceId: 'identity-access-management', name: 'IAM Strategy & Roadmap', description: 'Comprehensive identity strategy aligned with business objectives', displayOrder: 1 },
          { id: 'iam-2', serviceId: 'identity-access-management', name: 'IAM Architecture Design', description: 'Technical architecture for identity platform components', displayOrder: 2 },
          { id: 'iam-3', serviceId: 'identity-access-management', name: 'Role Engineering & RBAC Model', description: 'Role definitions, entitlements mapping, and governance model', displayOrder: 3 },
          { id: 'iam-4', serviceId: 'identity-access-management', name: 'PAM Implementation Blueprint', description: 'Privileged access management design and implementation plan', displayOrder: 4 },
          { id: 'iam-5', serviceId: 'identity-access-management', name: 'SSO & Federation Configuration', description: 'Single sign-on implementation across applications', displayOrder: 5 },
          { id: 'iam-6', serviceId: 'identity-access-management', name: 'MFA Deployment Guide', description: 'Multi-factor authentication rollout plan and configuration', displayOrder: 6 },
          { id: 'iam-7', serviceId: 'identity-access-management', name: 'Access Certification Process', description: 'Periodic access review procedures and automation', displayOrder: 7 },
          { id: 'iam-8', serviceId: 'identity-access-management', name: 'Identity Governance Framework', description: 'Policies, procedures, and metrics for identity management', displayOrder: 8 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '12 weeks', max: '24 weeks' }
      },
      {
        name: 'Zero Trust Architecture',
        slug: generateSlug('Zero Trust Architecture'),
        description: 'Transform your security model from perimeter-based to Zero Trust, implementing the principle of "never trust, always verify" across users, devices, applications, and data. We help organizations design and implement practical Zero Trust architectures that balance security with user experience.',
        scope: 'Zero Trust maturity assessment, Zero Trust architecture design, microsegmentation strategy and implementation, identity-centric access controls, device trust and posture assessment, application access modernization (ZTNA), data-centric security controls, continuous verification and monitoring.',
        icon: 'Lock',
        isFeatured: true,
        displayOrder: 4,
        outcomes: [
          'Reduced attack surface through microsegmentation',
          'Eliminated implicit trust with continuous verification',
          'Improved security posture for hybrid/remote workforce',
          'Modernized application access without VPN dependency',
          'Enhanced visibility into access patterns and anomalies'
        ],
        deliverables: [
          { id: 'zt-1', serviceId: 'zero-trust-architecture', name: 'Zero Trust Maturity Assessment', description: 'Current state evaluation against Zero Trust principles', displayOrder: 1 },
          { id: 'zt-2', serviceId: 'zero-trust-architecture', name: 'Zero Trust Architecture Blueprint', description: 'Comprehensive architecture design for Zero Trust implementation', displayOrder: 2 },
          { id: 'zt-3', serviceId: 'zero-trust-architecture', name: 'Microsegmentation Strategy', description: 'Network and application segmentation design', displayOrder: 3 },
          { id: 'zt-4', serviceId: 'zero-trust-architecture', name: 'Zero Trust Roadmap', description: 'Phased implementation plan with quick wins and long-term initiatives', displayOrder: 4 },
          { id: 'zt-5', serviceId: 'zero-trust-architecture', name: 'Device Trust Framework', description: 'Device posture assessment and compliance requirements', displayOrder: 5 },
          { id: 'zt-6', serviceId: 'zero-trust-architecture', name: 'ZTNA Implementation Guide', description: 'Zero Trust Network Access deployment for applications', displayOrder: 6 },
          { id: 'zt-7', serviceId: 'zero-trust-architecture', name: 'Continuous Verification Design', description: 'Real-time risk assessment and adaptive access controls', displayOrder: 7 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '8 weeks', max: '20 weeks' }
      },
      {
        name: 'Security Operations Center (SOC)',
        slug: generateSlug('Security Operations Center'),
        description: 'Build, optimize, or transform your Security Operations Center to detect and respond to threats effectively. Whether establishing a new SOC, uplifting existing capabilities, or transitioning to a hybrid/managed model, we help you achieve 24/7 security monitoring with mature detection and response processes.',
        scope: 'SOC strategy and operating model design, SOC technology architecture (SIEM, SOAR, EDR, NDR), use case development and detection engineering, playbook and runbook development, threat intelligence integration, SOC metrics and reporting, SOC staff training and capability building, managed SOC evaluation and transition.',
        icon: 'Eye',
        isFeatured: true,
        displayOrder: 5,
        outcomes: [
          'Operational 24/7 security monitoring capability',
          'Reduced Mean Time to Detect (MTTD) threats',
          'Automated incident response reducing MTTR by 60-80%',
          'Improved detection coverage aligned with MITRE ATT&CK',
          'Mature security operations with defined processes and metrics'
        ],
        deliverables: [
          { id: 'soc-1', serviceId: 'security-operations-center', name: 'SOC Operating Model', description: 'Organizational structure, processes, and governance for SOC', displayOrder: 1 },
          { id: 'soc-2', serviceId: 'security-operations-center', name: 'SOC Technology Architecture', description: 'SIEM, SOAR, EDR, and supporting technology design', displayOrder: 2 },
          { id: 'soc-3', serviceId: 'security-operations-center', name: 'Detection Use Case Library', description: 'MITRE ATT&CK-aligned detection rules and analytics', displayOrder: 3 },
          { id: 'soc-4', serviceId: 'security-operations-center', name: 'Incident Response Playbooks', description: 'Step-by-step procedures for common incident types', displayOrder: 4 },
          { id: 'soc-5', serviceId: 'security-operations-center', name: 'SOAR Automation Workflows', description: 'Automated response workflows for efficiency', displayOrder: 5 },
          { id: 'soc-6', serviceId: 'security-operations-center', name: 'Threat Intelligence Program', description: 'TI sources, integration, and operationalization', displayOrder: 6 },
          { id: 'soc-7', serviceId: 'security-operations-center', name: 'SOC Metrics Dashboard', description: 'KPIs, SLAs, and reporting templates', displayOrder: 7 },
          { id: 'soc-8', serviceId: 'security-operations-center', name: 'SOC Analyst Training Program', description: 'Skills development curriculum and exercises', displayOrder: 8 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION', 'MANAGED'],
        durationRange: { min: '12 weeks', max: '24 weeks' }
      },
      {
        name: 'Incident Response & Crisis Management',
        slug: generateSlug('Incident Response & Crisis Management'),
        description: 'Develop and test incident response capabilities to ensure your organization can effectively detect, contain, and recover from cyber incidents. From IR planning to tabletop exercises and retainer services, we help you prepare for and respond to security incidents.',
        scope: 'Incident response plan development, IR playbook creation for specific scenarios, tabletop exercises and simulations, technical IR capability assessment, crisis communication planning, forensic readiness, IR retainer services, post-incident review and improvement.',
        icon: 'AlertTriangle',
        displayOrder: 6,
        outcomes: [
          'Documented and tested incident response procedures',
          'Reduced incident impact through rapid, coordinated response',
          'Improved organizational preparedness through exercises',
          'Clear communication protocols for crisis situations',
          'Forensic readiness for evidence preservation'
        ],
        deliverables: [
          { id: 'ir-1', serviceId: 'incident-response-crisis-management', name: 'Incident Response Plan', description: 'Comprehensive IR plan with roles, responsibilities, and procedures', displayOrder: 1 },
          { id: 'ir-2', serviceId: 'incident-response-crisis-management', name: 'IR Playbooks', description: 'Scenario-specific playbooks (ransomware, data breach, DDoS, etc.)', displayOrder: 2 },
          { id: 'ir-3', serviceId: 'incident-response-crisis-management', name: 'Tabletop Exercise Package', description: 'Exercise scenarios, facilitation guides, and after-action reports', displayOrder: 3 },
          { id: 'ir-4', serviceId: 'incident-response-crisis-management', name: 'Crisis Communication Plan', description: 'Internal and external communication templates and procedures', displayOrder: 4 },
          { id: 'ir-5', serviceId: 'incident-response-crisis-management', name: 'Forensic Readiness Guide', description: 'Evidence collection and preservation procedures', displayOrder: 5 },
          { id: 'ir-6', serviceId: 'incident-response-crisis-management', name: 'IR Capability Assessment', description: 'Current state evaluation with improvement recommendations', displayOrder: 6 },
          { id: 'ir-7', serviceId: 'incident-response-crisis-management', name: 'Regulatory Notification Procedures', description: 'Breach notification requirements and timelines by jurisdiction', displayOrder: 7 }
        ],
        engagementTypes: ['ADVISORY', 'MANAGED'],
        durationRange: { min: '4 weeks', max: '12 weeks' }
      },
      {
        name: 'Cloud Security',
        slug: generateSlug('Cloud Security'),
        description: 'Secure your cloud environments across AWS, Azure, and GCP with comprehensive cloud security architecture, configuration management, and monitoring. We help organizations adopt cloud securely while meeting regulatory requirements for data residency and protection.',
        scope: 'Cloud security strategy and architecture, cloud security posture management (CSPM), cloud workload protection (CWPP), container and Kubernetes security, serverless security, cloud IAM and access controls, cloud network security, cloud compliance and governance, multi-cloud security.',
        icon: 'Cloud',
        displayOrder: 7,
        outcomes: [
          'Secure cloud architecture aligned with best practices',
          'Continuous cloud security posture monitoring',
          'Compliance with cloud-specific regulatory requirements',
          'Protected cloud workloads and containers',
          'Visibility across multi-cloud environments'
        ],
        deliverables: [
          { id: 'cls-1', serviceId: 'cloud-security', name: 'Cloud Security Architecture', description: 'Security architecture for AWS, Azure, or GCP environments', displayOrder: 1 },
          { id: 'cls-2', serviceId: 'cloud-security', name: 'Cloud Security Baseline', description: 'Configuration standards and hardening guidelines', displayOrder: 2 },
          { id: 'cls-3', serviceId: 'cloud-security', name: 'CSPM Implementation', description: 'Cloud security posture management deployment', displayOrder: 3 },
          { id: 'cls-4', serviceId: 'cloud-security', name: 'Container Security Framework', description: 'Kubernetes and container security controls', displayOrder: 4 },
          { id: 'cls-5', serviceId: 'cloud-security', name: 'Cloud IAM Design', description: 'Identity and access management for cloud resources', displayOrder: 5 },
          { id: 'cls-6', serviceId: 'cloud-security', name: 'Cloud Compliance Mapping', description: 'Regulatory compliance controls for cloud workloads', displayOrder: 6 },
          { id: 'cls-7', serviceId: 'cloud-security', name: 'Cloud Security Monitoring', description: 'Detection rules and alerting for cloud environments', displayOrder: 7 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '8 weeks', max: '16 weeks' }
      },
      {
        name: 'Application Security & DevSecOps',
        slug: generateSlug('Application Security & DevSecOps'),
        description: 'Embed security into your software development lifecycle with DevSecOps practices, secure coding standards, and application security testing. We help development teams build secure applications while maintaining delivery velocity.',
        scope: 'Secure SDLC implementation, DevSecOps pipeline integration, SAST/DAST/IAST implementation, secure code review, threat modeling, API security, software composition analysis (SCA), security champions program, application penetration testing.',
        icon: 'Code',
        displayOrder: 8,
        outcomes: [
          'Security integrated into CI/CD pipelines',
          'Reduced application vulnerabilities through shift-left',
          'Faster remediation through automated scanning',
          'Security-aware development teams',
          'Secure APIs and microservices'
        ],
        deliverables: [
          { id: 'as-1', serviceId: 'application-security-devsecops', name: 'Secure SDLC Framework', description: 'Security activities mapped to development lifecycle', displayOrder: 1 },
          { id: 'as-2', serviceId: 'application-security-devsecops', name: 'DevSecOps Pipeline Design', description: 'Security tooling integration into CI/CD', displayOrder: 2 },
          { id: 'as-3', serviceId: 'application-security-devsecops', name: 'Secure Coding Standards', description: 'Language-specific secure coding guidelines', displayOrder: 3 },
          { id: 'as-4', serviceId: 'application-security-devsecops', name: 'Threat Modeling Methodology', description: 'Application threat modeling process and templates', displayOrder: 4 },
          { id: 'as-5', serviceId: 'application-security-devsecops', name: 'API Security Standards', description: 'API security requirements and testing procedures', displayOrder: 5 },
          { id: 'as-6', serviceId: 'application-security-devsecops', name: 'Security Champions Program', description: 'Developer security training and enablement', displayOrder: 6 },
          { id: 'as-7', serviceId: 'application-security-devsecops', name: 'Application Security Testing Report', description: 'Penetration testing and vulnerability assessment results', displayOrder: 7 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '8 weeks', max: '16 weeks' }
      },
      {
        name: 'Business Continuity & Disaster Recovery',
        slug: generateSlug('Business Continuity & Disaster Recovery'),
        description: 'Build organizational resilience with comprehensive business continuity management (BCM) and disaster recovery (DR) capabilities. We help you prepare for, respond to, and recover from disruptions including cyber incidents, natural disasters, and operational failures.',
        scope: 'Business continuity management system (BCMS) aligned with ISO 22301, business impact analysis (BIA), disaster recovery planning, crisis management framework, BC/DR testing and exercises, ransomware recovery planning, third-party resilience assessment.',
        icon: 'RefreshCw',
        displayOrder: 9,
        outcomes: [
          'ISO 22301-aligned business continuity management system',
          'Defined and achievable RTO/RPO targets',
          'Tested recovery procedures for critical systems',
          'Organizational preparedness for cyber and operational disruptions',
          'Resilient supply chain and third-party relationships'
        ],
        deliverables: [
          { id: 'bc-1', serviceId: 'business-continuity-disaster-recovery', name: 'Business Impact Analysis', description: 'Critical process identification and impact assessment', displayOrder: 1 },
          { id: 'bc-2', serviceId: 'business-continuity-disaster-recovery', name: 'Business Continuity Plan', description: 'Comprehensive BCP covering all critical functions', displayOrder: 2 },
          { id: 'bc-3', serviceId: 'business-continuity-disaster-recovery', name: 'Disaster Recovery Plan', description: 'IT DR procedures with RTO/RPO definitions', displayOrder: 3 },
          { id: 'bc-4', serviceId: 'business-continuity-disaster-recovery', name: 'Crisis Management Framework', description: 'Crisis response structure and decision-making', displayOrder: 4 },
          { id: 'bc-5', serviceId: 'business-continuity-disaster-recovery', name: 'BC/DR Test Plan', description: 'Testing schedule, scenarios, and success criteria', displayOrder: 5 },
          { id: 'bc-6', serviceId: 'business-continuity-disaster-recovery', name: 'Ransomware Recovery Playbook', description: 'Specific procedures for ransomware scenarios', displayOrder: 6 },
          { id: 'bc-7', serviceId: 'business-continuity-disaster-recovery', name: 'Third-Party Resilience Assessment', description: 'Critical vendor continuity evaluation', displayOrder: 7 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '8 weeks', max: '16 weeks' }
      },
      {
        name: 'Security Compliance & Certification',
        slug: generateSlug('Security Compliance & Certification'),
        description: 'Achieve and maintain security certifications and regulatory compliance including ISO 27001, SOC 2, PCI DSS, and regional frameworks. We guide you through the certification journey from gap assessment to audit support.',
        scope: 'ISO 27001 implementation and certification, SOC 2 Type I/II readiness, PCI DSS compliance, regional regulatory compliance (QCB, SAMA, CBUAE, NCA), GDPR and privacy compliance, compliance program management, audit preparation and support.',
        icon: 'Award',
        displayOrder: 10,
        outcomes: [
          'Achieved target security certifications',
          'Regulatory compliance with defined frameworks',
          'Sustainable compliance program with ongoing monitoring',
          'Successful audit outcomes with minimal findings',
          'Demonstrated security commitment to stakeholders'
        ],
        deliverables: [
          { id: 'sc-1', serviceId: 'security-compliance-certification', name: 'Compliance Gap Assessment', description: 'Current state vs. target framework requirements', displayOrder: 1 },
          { id: 'sc-2', serviceId: 'security-compliance-certification', name: 'ISMS Documentation Suite', description: 'Policies, procedures, and records for ISO 27001', displayOrder: 2 },
          { id: 'sc-3', serviceId: 'security-compliance-certification', name: 'Control Implementation Evidence', description: 'Evidence collection for audit readiness', displayOrder: 3 },
          { id: 'sc-4', serviceId: 'security-compliance-certification', name: 'Risk Assessment & Treatment Plan', description: 'Information security risk assessment per ISO 27001', displayOrder: 4 },
          { id: 'sc-5', serviceId: 'security-compliance-certification', name: 'Internal Audit Program', description: 'Audit schedule, procedures, and findings management', displayOrder: 5 },
          { id: 'sc-6', serviceId: 'security-compliance-certification', name: 'Certification Audit Support', description: 'Pre-audit preparation and audit accompaniment', displayOrder: 6 },
          { id: 'sc-7', serviceId: 'security-compliance-certification', name: 'Compliance Monitoring Framework', description: 'Ongoing compliance tracking and reporting', displayOrder: 7 }
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '12 weeks', max: '24 weeks' }
      },
      {
        name: 'Vulnerability Management & Penetration Testing',
        slug: generateSlug('Vulnerability Management & Penetration Testing'),
        description: 'Identify and remediate security vulnerabilities through comprehensive vulnerability management programs and penetration testing. We help you understand your attack surface, prioritize remediation, and validate security controls.',
        scope: 'Vulnerability management program design, vulnerability scanning and assessment, penetration testing (network, application, cloud, wireless), red team exercises, attack surface management, vulnerability prioritization and remediation tracking.',
        icon: 'Search',
        displayOrder: 11,
        outcomes: [
          'Continuous visibility into vulnerability posture',
          'Risk-based vulnerability prioritization',
          'Validated security controls through penetration testing',
          'Reduced remediation timelines',
          'Improved security hygiene metrics'
        ],
        deliverables: [
          { id: 'vm-1', serviceId: 'vulnerability-management-penetration-testing', name: 'Vulnerability Management Program', description: 'VM processes, tools, and governance', displayOrder: 1 },
          { id: 'vm-2', serviceId: 'vulnerability-management-penetration-testing', name: 'Penetration Test Report', description: 'Findings, risk ratings, and remediation guidance', displayOrder: 2 },
          { id: 'vm-3', serviceId: 'vulnerability-management-penetration-testing', name: 'Attack Surface Analysis', description: 'External exposure assessment and recommendations', displayOrder: 3 },
          { id: 'vm-4', serviceId: 'vulnerability-management-penetration-testing', name: 'Vulnerability Prioritization Framework', description: 'Risk-based prioritization methodology', displayOrder: 4 },
          { id: 'vm-5', serviceId: 'vulnerability-management-penetration-testing', name: 'Remediation Tracking Dashboard', description: 'Metrics and reporting for vulnerability closure', displayOrder: 5 },
          { id: 'vm-6', serviceId: 'vulnerability-management-penetration-testing', name: 'Red Team Exercise Report', description: 'Advanced adversary simulation findings', displayOrder: 6 }
        ],
        engagementTypes: ['ADVISORY', 'MANAGED'],
        durationRange: { min: '2 weeks', max: '8 weeks' }
      },
      {
        name: 'Security Awareness & Training',
        slug: generateSlug('Security Awareness & Training'),
        description: 'Build a security-conscious culture through comprehensive security awareness programs, phishing simulations, and role-based training. We help transform your employees from security vulnerabilities into your first line of defense.',
        scope: 'Security awareness program design, phishing simulation campaigns, role-based security training, executive security briefings, security champions program, awareness metrics and reporting, gamification and engagement strategies.',
        icon: 'GraduationCap',
        displayOrder: 12,
        outcomes: [
          'Reduced phishing susceptibility rates below 5%',
          'Increased security incident reporting',
          'Security-aware workforce across all levels',
          'Measurable behavior change metrics',
          'Compliance with awareness training requirements'
        ],
        deliverables: [
          { id: 'sa-1', serviceId: 'security-awareness-training', name: 'Security Awareness Program', description: 'Annual awareness program with campaigns and content', displayOrder: 1 },
          { id: 'sa-2', serviceId: 'security-awareness-training', name: 'Phishing Simulation Platform', description: 'Simulated phishing campaigns with reporting', displayOrder: 2 },
          { id: 'sa-3', serviceId: 'security-awareness-training', name: 'Role-Based Training Curriculum', description: 'Training modules for different job functions', displayOrder: 3 },
          { id: 'sa-4', serviceId: 'security-awareness-training', name: 'Executive Security Briefings', description: 'Board and C-suite security education', displayOrder: 4 },
          { id: 'sa-5', serviceId: 'security-awareness-training', name: 'Awareness Metrics Dashboard', description: 'Program effectiveness tracking and reporting', displayOrder: 5 },
          { id: 'sa-6', serviceId: 'security-awareness-training', name: 'Security Champions Framework', description: 'Embedded security advocates across the organization', displayOrder: 6 }
        ],
        engagementTypes: ['ADVISORY', 'MANAGED'],
        durationRange: { min: '4 weeks', max: 'Ongoing' }
      },
    ],
  },
  // TOWER 12: RISK, COMPLIANCE & REGULATORY ADVISORY (GRC)
  {
    code: 'GRC',
    name: 'Risk, Compliance & Regulatory Advisory',
    shortName: 'Risk & Compliance',
    slug: 'risk-compliance',
    icon: 'Scale',
    accentColor: '#7C3AED',
    description: 'Navigate regulatory complexity with robust GRC frameworks.',
    scope: 'Enterprise risk, operational risk, control design and remediation, regulatory compliance programs, audit readiness, policy frameworks, security/privacy compliance (ISO 27001/27701/NDPR-style controls), governance.',
    typicalOutcomes: ['Faster regulatory response', 'Fewer audit findings', 'Stronger governance posture'],
    certifications: ['ISO 27001', 'ISO 27701', 'SOC 2'],
    frameworks: ['COSO', 'ISO 31000', 'NIST RMF'],
    isFeatured: false,
    displayOrder: 12,
    services: [
      { name: 'GRC Framework Implementation', slug: generateSlug('GRC Framework Implementation'), description: 'Implement comprehensive GRC framework.', icon: 'BookOpen', typicalDeliverables: ['GRC framework document', 'Policy suite', 'Control library'] },
      { name: 'Enterprise Risk Assessment', slug: generateSlug('Enterprise Risk Assessment'), description: 'Assess and prioritize enterprise risks.', icon: 'AlertTriangle', typicalDeliverables: ['Risk register', 'Risk heat map', 'Treatment plans'] },
      { name: 'Regulatory Compliance Program', slug: generateSlug('Regulatory Compliance Program'), description: 'Establish compliance programs for regulations.', icon: 'FileCheck', typicalDeliverables: ['Compliance framework', 'Gap analysis', 'Remediation roadmap'] },
      { name: 'Internal Control Design', slug: generateSlug('Internal Control Design'), description: 'Design and optimize internal controls.', icon: 'Lock', typicalDeliverables: ['Control design documentation', 'Control testing procedures', 'Evidence requirements'] },
      { name: 'Audit Readiness Support', slug: generateSlug('Audit Readiness Support'), description: 'Prepare organization for internal/external audits.', icon: 'ClipboardCheck', typicalDeliverables: ['Audit readiness checklist', 'Evidence packs', 'Finding remediation'] },
      { name: 'Policy Framework Development', slug: generateSlug('Policy Framework Development'), description: 'Develop comprehensive policy frameworks.', icon: 'FileText', typicalDeliverables: ['Policy hierarchy', 'Policy templates', 'Review procedures'] },
    ],
  },
  // TOWER 13: FINANCE TRANSFORMATION (CFO ADVISORY)
  {
    code: 'FINANCE',
    name: 'Finance Transformation (CFO Advisory)',
    shortName: 'Finance Transformation',
    slug: generateSlug('Finance Transformation'),
    icon: 'PiggyBank',
    accentColor: '#059669',
    description: 'Transform finance function for speed, insight, and control.',
    scope: 'FP&A transformation, close & reporting modernization, cost accounting enhancements, performance management models, finance automation roadmap.',
    typicalOutcomes: ['Faster close cycles', 'Better reporting', 'Improved financial control'],
    certifications: ['CPA', 'CIMA'],
    frameworks: ['EPM', 'ABC Costing', 'Driver-Based Planning'],
    isFeatured: false,
    displayOrder: 13,
    services: [
      { name: 'Finance Operating Model Design', slug: generateSlug('Finance Operating Model Design'), description: 'Design modern finance operating model.', icon: 'Building2', typicalDeliverables: ['Finance TOM', 'Process design', 'Organization design'] },
      { name: 'FP&A Transformation', slug: generateSlug('FP&A Transformation'), description: 'Transform planning, budgeting, and forecasting.', icon: 'LineChart', typicalDeliverables: ['FP&A process design', 'Planning calendar', 'Reporting standards'] },
      { name: 'Close Cycle Optimization', slug: generateSlug('Close Cycle Optimization'), description: 'Accelerate financial close process.', icon: 'Clock', typicalDeliverables: ['Close optimization plan', 'Automation opportunities', 'Control points'] },
      { name: 'Finance Automation', slug: generateSlug('Finance Automation'), description: 'Automate finance processes and controls.', icon: 'Bot', typicalDeliverables: ['Automation roadmap', 'Bot specifications', 'ROI analysis'] },
      { name: 'Management Reporting Enhancement', slug: generateSlug('Management Reporting Enhancement'), description: 'Improve management reporting capabilities.', icon: 'BarChart3', typicalDeliverables: ['Reporting framework', 'KPI definitions', 'Dashboard designs'] },
    ],
  },
  // TOWER 14: PEOPLE, CHANGE & CAPABILITY BUILDING
  {
    code: 'CHANGE',
    name: 'People, Change & Capability Building',
    shortName: 'Change & Academy',
    slug: generateSlug('Change & Academy'),
    icon: 'GraduationCap',
    accentColor: '#F97316',
    description: 'Drive adoption and build lasting organizational capabilities.',
    scope: 'Change management (ADKAR/Kotter-aligned), stakeholder engagement, training delivery, enablement programs, digital adoption, leadership development, culture shaping, learning academies.',
    typicalOutcomes: ['Higher adoption rates', 'Reduced resistance', 'Sustained transformation outcomes'],
    certifications: ['Prosci', 'CCMP'],
    frameworks: ['ADKAR', 'Kotter', 'Prosci'],
    isFeatured: false,
    displayOrder: 14,
    services: [
      { name: 'Change Management Strategy', slug: generateSlug('Change Management Strategy'), description: 'Define change strategy for transformation success.', icon: 'Route', typicalDeliverables: ['Change strategy document', 'Stakeholder analysis', 'Change impact assessment'] },
      { name: 'Stakeholder Engagement', slug: generateSlug('Stakeholder Engagement'), description: 'Engage stakeholders throughout transformation.', icon: 'Users', typicalDeliverables: ['Stakeholder map', 'Engagement plan', 'Communications plan'] },
      { name: 'Training & Enablement Program', slug: generateSlug('Training & Enablement Program'), description: 'Design and deliver training programs.', icon: 'BookOpen', typicalDeliverables: ['Training needs analysis', 'Curriculum design', 'Training materials'] },
      { name: 'Digital Adoption Platform', slug: generateSlug('Digital Adoption Platform'), description: 'Implement digital adoption tools and practices.', icon: 'MousePointer', typicalDeliverables: ['DAP strategy', 'Content design', 'Adoption metrics'] },
      { name: 'Leadership Development', slug: generateSlug('Leadership Development'), description: 'Develop leadership capabilities for change.', icon: 'Crown', typicalDeliverables: ['Leadership competency framework', 'Development programs', 'Coaching support'] },
      { name: 'Digibit Academy Programs', slug: generateSlug('Digibit Academy Programs'), description: 'Role-based certification academies.', icon: 'Award', typicalDeliverables: ['Academy curriculum', 'Assessment frameworks', 'Certification pathways'] },
    ],
  },
  // TOWER 15: ESG / SUSTAINABILITY & CLIMATE RISK
  {
    code: 'ESG',
    name: 'ESG / Sustainability & Climate Risk Enablement',
    shortName: 'ESG & Sustainability',
    slug: generateSlug('ESG & Sustainability'),
    icon: 'Leaf',
    accentColor: '#22C55E',
    description: 'Enable sustainable business practices and climate risk management.',
    scope: 'ESG strategy, climate risk enablement, sustainability reporting support, ESG governance models and metrics design.',
    typicalOutcomes: ['Improved sustainability governance', 'Reporting readiness', 'Climate risk clarity'],
    certifications: ['GRI', 'SASB', 'TCFD'],
    frameworks: ['GRI', 'SASB', 'TCFD', 'UN SDGs'],
    isFeatured: false,
    displayOrder: 15,
    services: [
      { name: 'ESG Strategy Development', slug: generateSlug('ESG Strategy Development'), description: 'Define ESG strategy and priorities.', icon: 'Compass', typicalDeliverables: ['ESG strategy document', 'Materiality assessment', 'Priority areas'] },
      { name: 'Climate Risk Assessment', slug: generateSlug('Climate Risk Assessment'), description: 'Assess climate risks and opportunities.', icon: 'Thermometer', typicalDeliverables: ['Climate risk assessment', 'Scenario analysis', 'Adaptation strategies'] },
      { name: 'Sustainability Reporting', slug: generateSlug('Sustainability Reporting'), description: 'Establish sustainability reporting capabilities.', icon: 'FileBarChart', typicalDeliverables: ['Reporting framework', 'Data collection process', 'Report templates'] },
      { name: 'ESG Governance Design', slug: generateSlug('ESG Governance Design'), description: 'Design ESG governance structures.', icon: 'Building', typicalDeliverables: ['Governance model', 'Metrics framework', 'Accountability structure'] },
    ],
  },
  // TOWER 16: DEALS & M&A TECHNOLOGY DUE DILIGENCE
  {
    code: 'MA-DEALS',
    name: 'Deals, M&A Technology Due Diligence, PMI/Separation',
    shortName: 'M&A Advisory',
    slug: generateSlug('M&A Advisory'),
    icon: 'Handshake',
    accentColor: '#A855F7',
    description: 'Support M&A transactions with technology and cyber due diligence.',
    scope: 'Technology/cyber due diligence, integration planning, separation planning, post-merger integration (PMI) operating model and systems integration.',
    typicalOutcomes: ['Informed deal decisions', 'Successful integration', 'Value preservation'],
    certifications: [],
    frameworks: ['PMI Methodology', 'TSA Framework'],
    isFeatured: false,
    displayOrder: 16,
    services: [
      { name: 'Technology Due Diligence', slug: generateSlug('Technology Due Diligence'), description: 'Assess technology capabilities and risks for deals.', icon: 'Scan', typicalDeliverables: ['Tech DD report', 'Risk findings', 'Remediation recommendations'] },
      { name: 'Cyber Due Diligence', slug: generateSlug('Cyber Due Diligence'), description: 'Assess cybersecurity posture for deals.', icon: 'ShieldQuestion', typicalDeliverables: ['Cyber DD report', 'Security findings', 'Risk quantification'] },
      { name: 'Post-Merger Integration Planning', slug: generateSlug('Post-Merger Integration Planning'), description: 'Plan technology integration for successful PMI.', icon: 'Merge', typicalDeliverables: ['PMI roadmap', 'Synergy capture plan', 'Day 1 readiness'] },
      { name: 'Carve-Out & Separation Planning', slug: generateSlug('Carve-Out & Separation Planning'), description: 'Plan technology separation for divestitures.', icon: 'Split', typicalDeliverables: ['Separation roadmap', 'TSA requirements', 'Stranded cost analysis'] },
    ],
  },
  // TOWER 17: RESTRUCTURING & TURNAROUND
  {
    code: 'TURNAROUND',
    name: 'Restructuring & Turnaround Enablement',
    shortName: 'Turnaround',
    slug: generateSlug('Turnaround'),
    icon: 'RotateCcw',
    accentColor: '#DC2626',
    description: 'Enable rapid organizational turnaround and stabilization.',
    scope: 'Rapid diagnostic, cost and operating model reset, transformation acceleration.',
    typicalOutcomes: ['Rapid stabilization', 'Cost structure reset', 'Performance improvement'],
    certifications: [],
    frameworks: ['Turnaround Methodology'],
    isFeatured: false,
    displayOrder: 17,
    services: [
      { name: 'Rapid Diagnostic Assessment', slug: generateSlug('Rapid Diagnostic Assessment'), description: 'Quick assessment of organizational health.', icon: 'Stethoscope', typicalDeliverables: ['Diagnostic report', 'Quick wins identification', 'Critical path'] },
      { name: 'Stabilization PMO', slug: generateSlug('Stabilization PMO'), description: 'Establish PMO for turnaround execution.', icon: 'Anchor', typicalDeliverables: ['Stabilization plan', 'PMO setup', 'Progress tracking'] },
      { name: 'Operating Model Reset', slug: generateSlug('Operating Model Reset'), description: 'Reset operating model for efficiency.', icon: 'RefreshCw', typicalDeliverables: ['Simplified TOM', 'Cost levers', 'Implementation roadmap'] },
    ],
  },
  // TOWER 18: FORENSICS & INVESTIGATIONS
  {
    code: 'FORENSICS',
    name: 'Forensics, Integrity & Investigations Enablement',
    shortName: 'Forensics',
    slug: generateSlug('Forensics'),
    icon: 'SearchCheck',
    accentColor: '#64748B',
    description: 'Enable fraud prevention and investigation capabilities.',
    scope: 'Fraud controls assessment, integrity due diligence enablement, investigations support.',
    typicalOutcomes: ['Enhanced fraud controls', 'Investigation readiness', 'Integrity assurance'],
    certifications: ['CFE'],
    frameworks: ['ACFE Framework'],
    isFeatured: false,
    displayOrder: 18,
    services: [
      { name: 'Fraud Risk Assessment', slug: generateSlug('Fraud Risk Assessment'), description: 'Assess fraud risks and controls.', icon: 'AlertOctagon', typicalDeliverables: ['Fraud risk assessment', 'Control gaps', 'Enhancement roadmap'] },
      { name: 'Forensic Readiness Planning', slug: generateSlug('Forensic Readiness Planning'), description: 'Establish forensic investigation capabilities.', icon: 'FileSearch', typicalDeliverables: ['Forensic readiness playbook', 'Evidence handling process', 'Tool requirements'] },
      { name: 'Integrity Control Enhancement', slug: generateSlug('Integrity Control Enhancement'), description: 'Strengthen integrity controls.', icon: 'CheckSquare', typicalDeliverables: ['Control enhancements', 'Monitoring procedures', 'Reporting mechanisms'] },
    ],
  },
  // TOWER 19: PRODUCT ENGINEERING & SYSTEMS INTEGRATION
  {
    code: 'ENGINEERING',
    name: 'Product Engineering, Systems Integration & Enterprise Platforms',
    shortName: 'Engineering',
    slug: generateSlug('Engineering'),
    icon: 'Code2',
    accentColor: '#3B82F6',
    description: 'Build, integrate, and implement enterprise solutions.',
    scope: 'Software engineering (web/mobile), enterprise integration, APIs, DevSecOps pipelines, QA automation, performance engineering, implementation of enterprise platforms: CRM/ERP/ITSM/IAM (tool-agnostic).',
    typicalOutcomes: ['Working systems', 'Scalable delivery', 'Production-grade quality'],
    certifications: ['AWS Developer', 'Azure Developer'],
    frameworks: ['DevOps', 'SAFe', 'Scrum'],
    isFeatured: true,
    displayOrder: 19,
    services: [
      { name: 'Custom Software Development', slug: generateSlug('Custom Software Development'), description: 'Design and build custom software solutions.', icon: 'Code', typicalDeliverables: ['Working software', 'Technical documentation', 'Deployment artifacts'] },
      { name: 'Enterprise Systems Integration', slug: generateSlug('Enterprise Systems Integration'), description: 'Integrate enterprise systems and applications.', icon: 'Plug', typicalDeliverables: ['Integration services', 'API implementations', 'Data flows'] },
      { name: 'Platform Implementation', slug: generateSlug('Platform Implementation'), description: 'Implement enterprise platforms (CRM, ERP, ITSM).', icon: 'Server', typicalDeliverables: ['Configured platform', 'Integration points', 'User acceptance'] },
      { name: 'DevSecOps Pipeline Setup', slug: generateSlug('DevSecOps Pipeline Setup'), description: 'Establish secure CI/CD pipelines.', icon: 'GitBranch', typicalDeliverables: ['Pipeline configuration', 'Security gates', 'Automation scripts'] },
      { name: 'Quality Engineering & Testing', slug: generateSlug('Quality Engineering & Testing'), description: 'Establish quality engineering practices.', icon: 'TestTube2', typicalDeliverables: ['Test strategy', 'Automated test suite', 'Performance test results'] },
    ],
  },
  // TOWER: BLOCKCHAIN & WEB3 SOLUTIONS
  {
    code: 'BLOCKCHAIN',
    name: 'Blockchain & Web3 Solutions',
    shortName: 'Blockchain',
    slug: 'blockchain',
    icon: 'Blocks',
    accentColor: '#8B5CF6',
    description: 'Transform your business with enterprise blockchain solutions, smart contracts, and Web3 technologies. We help organizations leverage distributed ledger technology for enhanced transparency, security, and operational efficiency across supply chain, finance, identity, and digital assets.',
    scope: 'Blockchain strategy and use case identification, enterprise blockchain platform selection (Hyperledger, Ethereum, Polygon, etc.), smart contract development and auditing, tokenization and digital asset solutions, decentralized application (dApp) development, blockchain integration with existing systems, NFT and digital collectibles platforms, DeFi solutions for enterprises, identity and credential verification on blockchain, supply chain traceability solutions.',
    typicalOutcomes: [
      'Clear blockchain strategy aligned with business objectives',
      'Production-ready smart contracts with security audits',
      'Tokenized assets enabling new revenue streams',
      'Enhanced supply chain transparency and traceability',
      'Reduced settlement times from days to minutes',
      'Immutable audit trails for compliance requirements',
      'Decentralized identity solutions reducing fraud',
      'Cost savings through disintermediation and automation',
    ],
    certifications: ['Certified Blockchain Developer', 'Certified Ethereum Developer', 'Hyperledger Certified'],
    frameworks: ['Hyperledger Fabric', 'Ethereum/Solidity', 'Polygon', 'Chainlink', 'IPFS', 'OpenZeppelin'],
    isFeatured: true,
    displayOrder: 19,
    services: [
      {
        name: 'Blockchain Strategy & Consulting',
        slug: generateSlug('Blockchain Strategy Consulting'),
        description: 'Comprehensive blockchain strategy development including use case identification, technology assessment, ROI analysis, and implementation roadmap. We help you determine where blockchain adds real value versus traditional solutions.',
        icon: 'Compass',
        isFeatured: true,
        isActive: true,
        displayOrder: 1,
        deliverables: [
          { id: 'bs-1', serviceId: 'blockchain-strategy', name: 'Blockchain Opportunity Assessment', description: 'Analysis of potential blockchain use cases with feasibility scoring', displayOrder: 1 },
          { id: 'bs-2', serviceId: 'blockchain-strategy', name: 'Technology Selection Report', description: 'Platform comparison (public vs private, L1 vs L2) with recommendations', displayOrder: 2 },
          { id: 'bs-3', serviceId: 'blockchain-strategy', name: 'Business Case & ROI Model', description: 'Financial analysis with cost-benefit projections', displayOrder: 3 },
          { id: 'bs-4', serviceId: 'blockchain-strategy', name: 'Implementation Roadmap', description: 'Phased execution plan with milestones and dependencies', displayOrder: 4 },
        ],
      },
      {
        name: 'Smart Contract Development',
        slug: generateSlug('Smart Contract Development'),
        description: 'Design, develop, and deploy secure smart contracts for various use cases including DeFi protocols, NFT marketplaces, DAOs, and enterprise automation. All contracts undergo rigorous security audits before deployment.',
        icon: 'Code',
        isFeatured: true,
        isActive: true,
        displayOrder: 2,
        deliverables: [
          { id: 'sc-1', serviceId: 'smart-contracts', name: 'Smart Contract Specifications', description: 'Detailed technical specifications and architecture', displayOrder: 1 },
          { id: 'sc-2', serviceId: 'smart-contracts', name: 'Solidity/Rust Smart Contracts', description: 'Production-ready, gas-optimized contract code', displayOrder: 2 },
          { id: 'sc-3', serviceId: 'smart-contracts', name: 'Security Audit Report', description: 'Comprehensive vulnerability assessment and fixes', displayOrder: 3 },
          { id: 'sc-4', serviceId: 'smart-contracts', name: 'Deployment & Verification', description: 'Mainnet deployment with verified source code', displayOrder: 4 },
          { id: 'sc-5', serviceId: 'smart-contracts', name: 'Integration Documentation', description: 'API documentation and integration guides', displayOrder: 5 },
        ],
      },
      {
        name: 'Tokenization & Digital Assets',
        slug: generateSlug('Tokenization Digital Assets'),
        description: 'Create and launch digital assets including security tokens, utility tokens, NFTs, and real-world asset tokenization. We handle token economics design, smart contract development, and regulatory compliance considerations.',
        icon: 'Coins',
        isFeatured: true,
        isActive: true,
        displayOrder: 3,
        deliverables: [
          { id: 'ta-1', serviceId: 'tokenization', name: 'Token Economics Design', description: 'Supply mechanics, distribution, and incentive structures', displayOrder: 1 },
          { id: 'ta-2', serviceId: 'tokenization', name: 'Token Smart Contracts', description: 'ERC-20/721/1155 compliant token contracts', displayOrder: 2 },
          { id: 'ta-3', serviceId: 'tokenization', name: 'Regulatory Analysis', description: 'Securities law considerations and compliance guidance', displayOrder: 3 },
          { id: 'ta-4', serviceId: 'tokenization', name: 'Token Launch Support', description: 'Deployment, liquidity provisioning, and listing support', displayOrder: 4 },
        ],
      },
      {
        name: 'Decentralized Application (dApp) Development',
        slug: generateSlug('dApp Development'),
        description: 'Full-stack development of decentralized applications with Web3 frontend integration, wallet connectivity, and seamless user experiences. From DeFi platforms to NFT marketplaces and governance systems.',
        icon: 'Globe',
        isFeatured: false,
        isActive: true,
        displayOrder: 4,
        deliverables: [
          { id: 'da-1', serviceId: 'dapp-dev', name: 'dApp Architecture Design', description: 'System design with on-chain and off-chain components', displayOrder: 1 },
          { id: 'da-2', serviceId: 'dapp-dev', name: 'Web3 Frontend Application', description: 'React/Next.js frontend with wallet integration', displayOrder: 2 },
          { id: 'da-3', serviceId: 'dapp-dev', name: 'Backend Infrastructure', description: 'Indexing, caching, and API services', displayOrder: 3 },
          { id: 'da-4', serviceId: 'dapp-dev', name: 'Testing & QA', description: 'Testnet deployment and comprehensive testing', displayOrder: 4 },
        ],
      },
      {
        name: 'Enterprise Blockchain Solutions',
        slug: generateSlug('Enterprise Blockchain Solutions'),
        description: 'Design and implement private/permissioned blockchain networks for enterprise use cases including supply chain tracking, document verification, inter-organizational workflows, and consortium networks using Hyperledger Fabric or enterprise Ethereum.',
        icon: 'Building',
        isFeatured: true,
        isActive: true,
        displayOrder: 5,
        deliverables: [
          { id: 'eb-1', serviceId: 'enterprise-blockchain', name: 'Network Architecture Design', description: 'Multi-organization network topology and governance', displayOrder: 1 },
          { id: 'eb-2', serviceId: 'enterprise-blockchain', name: 'Chaincode/Smart Contract Development', description: 'Business logic implementation for Hyperledger or Ethereum', displayOrder: 2 },
          { id: 'eb-3', serviceId: 'enterprise-blockchain', name: 'System Integration', description: 'Integration with ERP, SCM, and existing systems', displayOrder: 3 },
          { id: 'eb-4', serviceId: 'enterprise-blockchain', name: 'Node Infrastructure Setup', description: 'Production deployment with monitoring and operations', displayOrder: 4 },
        ],
      },
      {
        name: 'Blockchain Identity & Credentials',
        slug: generateSlug('Blockchain Identity Credentials'),
        description: 'Implement decentralized identity (DID) and verifiable credentials solutions for secure, user-controlled identity management, KYC/AML compliance, and credential verification across education, healthcare, and professional certifications.',
        icon: 'UserCheck',
        isFeatured: false,
        isActive: true,
        displayOrder: 6,
        deliverables: [
          { id: 'bi-1', serviceId: 'blockchain-identity', name: 'DID Architecture', description: 'Decentralized identifier system design', displayOrder: 1 },
          { id: 'bi-2', serviceId: 'blockchain-identity', name: 'Credential Schema Design', description: 'Verifiable credential formats and standards', displayOrder: 2 },
          { id: 'bi-3', serviceId: 'blockchain-identity', name: 'Issuer/Verifier Implementation', description: 'Credential issuance and verification systems', displayOrder: 3 },
          { id: 'bi-4', serviceId: 'blockchain-identity', name: 'Wallet Integration', description: 'Identity wallet development or integration', displayOrder: 4 },
        ],
      },
    ],
  },
  // TOWER 20: IT OUTSOURCING & MANAGED SERVICES
  {
    code: 'OUTSOURCE',
    name: 'IT Outsourcing & Managed Services',
    shortName: 'IT Outsourcing',
    slug: 'it-outsourcing',
    icon: 'Headset',
    accentColor: '#14B8A6',
    description: 'Deliver comprehensive managed IT operations, infrastructure management, and outsourced services that enable organizations to focus on core business while ensuring 24/7 operational excellence, predictable costs, and continuous service improvement. Tailored for GCC enterprises demanding world-class service delivery with local expertise.',
    scope: 'Full-spectrum managed services including infrastructure operations (cloud, on-premises, hybrid), application lifecycle management, database administration, network operations center (NOC), IT service desk and end-user support, managed security operations (SOC), backup and disaster recovery, DevOps and CI/CD operations, staff augmentation, AIOps-driven intelligent automation, SLA-based service governance, and seamless transition and knowledge transfer for outsourcing engagements.',
    typicalOutcomes: [
      'Operational cost reduction of 25-40% through optimized resource utilization',
      '99.9%+ infrastructure and application availability with proactive monitoring',
      'Mean Time to Resolution (MTTR) reduced by 30-50% through automation and AIOps',
      '24/7/365 support coverage with localized escalation and language capabilities',
      'Predictable monthly costs with consumption-based or fixed-fee SLA models',
      'Service desk ticket resolution within defined SLAs (L1: 2hrs, L2: 8hrs, L3: 24hrs)',
      'Automated incident detection and remediation for 60%+ of routine issues',
      'Continuous service improvement with quarterly business reviews and KPI tracking',
      'Compliance with ITIL 4, ISO 20000, and regional data residency requirements',
      'Knowledge transfer and capability building for in-house teams',
      'Cloud operations optimization delivering 20-35% cost savings',
      'Disaster recovery readiness with tested RTO/RPO objectives',
    ],
    certifications: ['ITIL 4 Foundation & Managing Professional', 'ISO/IEC 20000 (IT Service Management)', 'ISO/IEC 27001 (Information Security Management)', 'AWS Certified SysOps Administrator & Solutions Architect', 'Microsoft Certified: Azure Administrator & DevOps Engineer', 'Google Cloud Professional Cloud Architect', 'Certified Information Systems Auditor (CISA)', 'VMware Certified Professional (VCP)', 'Cisco Certified Network Associate (CCNA)', 'CompTIA Security+ & Network+'],
    frameworks: ['ITIL 4 Service Value System', 'ISO/IEC 20000 (Service Management)', 'COBIT 2019 (IT Governance)', 'Site Reliability Engineering (SRE) Practices', 'AIOps Reference Architecture (Gartner)', 'eTOM (Telecom Operations Map)', 'FitSM (Lightweight IT Service Management)', 'DevOps Capability Maturity Model', 'NIST Cybersecurity Framework (for Managed SOC)', 'Business Continuity Management (ISO 22301)'],
    isFeatured: true,
    displayOrder: 20,
    services: [
      {
        name: 'Managed Infrastructure Operations',
        slug: generateSlug('Managed Infrastructure Operations'),
        description: 'Comprehensive 24/7 management of cloud, on-premises, and hybrid infrastructure including compute, storage, virtualization, and platform services with proactive monitoring, patching, capacity planning, and performance optimization.',
        icon: 'Server',
        isFeatured: true,
        isActive: true,
        displayOrder: 1,
        deliverables: [
          { id: 'mio-1', serviceId: 'managed-infrastructure-ops', name: 'Infrastructure Monitoring & Alerting', description: '24/7 monitoring with intelligent alerting and escalation workflows', displayOrder: 1 },
          { id: 'mio-2', serviceId: 'managed-infrastructure-ops', name: 'Patch & Vulnerability Management', description: 'Automated patching schedules with zero-downtime rollouts', displayOrder: 2 },
          { id: 'mio-3', serviceId: 'managed-infrastructure-ops', name: 'Capacity Planning & Optimization', description: 'Quarterly reviews with rightsizing recommendations', displayOrder: 3 },
          { id: 'mio-4', serviceId: 'managed-infrastructure-ops', name: 'Incident & Problem Management', description: 'ITIL-aligned resolution processes with root cause analysis', displayOrder: 4 },
          { id: 'mio-5', serviceId: 'managed-infrastructure-ops', name: 'Performance Tuning Reports', description: 'Monthly optimization reports with actionable insights', displayOrder: 5 },
          { id: 'mio-6', serviceId: 'managed-infrastructure-ops', name: 'Change & Release Management', description: 'Controlled deployment processes with rollback procedures', displayOrder: 6 },
          { id: 'mio-7', serviceId: 'managed-infrastructure-ops', name: 'SLA Compliance Dashboard', description: 'Real-time service level tracking and reporting', displayOrder: 7 },
        ],
        engagementTypes: ['MANAGED'],
        durationRange: { min: '12 months', max: '60 months' },
      },
      {
        name: 'Managed Application Support',
        slug: generateSlug('Managed Application Support'),
        description: 'End-to-end application lifecycle management including L1-L3 support, bug fixing, enhancements, performance monitoring, application patching, and continuous optimization for enterprise applications, SaaS platforms, and custom software.',
        icon: 'Code',
        isFeatured: true,
        isActive: true,
        displayOrder: 2,
        deliverables: [
          { id: 'mas-1', serviceId: 'managed-application-support', name: 'Application Health Monitoring', description: 'Synthetic and real-user monitoring with APM tools', displayOrder: 1 },
          { id: 'mas-2', serviceId: 'managed-application-support', name: 'L1-L3 Support Services', description: 'Tiered support with defined escalation paths and SLAs', displayOrder: 2 },
          { id: 'mas-3', serviceId: 'managed-application-support', name: 'Bug Fixing & Hotfix Deployment', description: 'Rapid issue resolution with emergency patching capability', displayOrder: 3 },
          { id: 'mas-4', serviceId: 'managed-application-support', name: 'Enhancement Requests Management', description: 'Prioritized backlog with quarterly release cycles', displayOrder: 4 },
          { id: 'mas-5', serviceId: 'managed-application-support', name: 'Application Performance Reports', description: 'Monthly KPIs including response time, error rates, availability', displayOrder: 5 },
          { id: 'mas-6', serviceId: 'managed-application-support', name: 'Code Quality & Security Scanning', description: 'Automated SAST/DAST scans with remediation tracking', displayOrder: 6 },
        ],
        engagementTypes: ['MANAGED'],
        durationRange: { min: '12 months', max: '60 months' },
      },
      {
        name: 'Managed Cloud Operations',
        slug: generateSlug('Managed Cloud Operations'),
        description: 'Operate and optimize multi-cloud and hybrid cloud environments (AWS, Azure, GCP) with cost management, security hardening, automated provisioning, cloud-native monitoring, and FinOps practices for continuous optimization.',
        icon: 'Cloud',
        isFeatured: true,
        isActive: true,
        displayOrder: 3,
        deliverables: [
          { id: 'mco-1', serviceId: 'managed-cloud-ops', name: 'Cloud Infrastructure Management', description: 'Multi-cloud operations with unified management console', displayOrder: 1 },
          { id: 'mco-2', serviceId: 'managed-cloud-ops', name: 'Cloud Cost Optimization', description: 'Monthly FinOps reviews with rightsizing and reserved instance recommendations', displayOrder: 2 },
          { id: 'mco-3', serviceId: 'managed-cloud-ops', name: 'Cloud Security Posture Management', description: 'Continuous compliance scanning (CIS benchmarks, NIST)', displayOrder: 3 },
          { id: 'mco-4', serviceId: 'managed-cloud-ops', name: 'Infrastructure as Code Management', description: 'Terraform/CloudFormation template maintenance and versioning', displayOrder: 4 },
          { id: 'mco-5', serviceId: 'managed-cloud-ops', name: 'Cloud Migration Support', description: 'Ongoing workload migration with minimal business disruption', displayOrder: 5 },
          { id: 'mco-6', serviceId: 'managed-cloud-ops', name: 'Cloud Governance Framework', description: 'Tagging policies, budget controls, and access governance', displayOrder: 6 },
        ],
        engagementTypes: ['MANAGED'],
        durationRange: { min: '12 months', max: '60 months' },
      },
      {
        name: 'IT Service Desk & End-User Support',
        slug: generateSlug('IT Service Desk & End-User Support'),
        description: 'Deliver world-class IT service desk operations with multi-channel support (phone, email, chat, self-service portal), ticket management, asset management, onboarding/offboarding, and knowledge base management using ITIL best practices.',
        icon: 'Headset',
        isFeatured: true,
        isActive: true,
        displayOrder: 4,
        deliverables: [
          { id: 'sd-1', serviceId: 'it-service-desk', name: 'Multi-Channel Service Desk', description: '24/7 support via phone, email, chat, and self-service portal', displayOrder: 1 },
          { id: 'sd-2', serviceId: 'it-service-desk', name: 'Incident & Request Management', description: 'ITIL-aligned ticket lifecycle with SLA tracking', displayOrder: 2 },
          { id: 'sd-3', serviceId: 'it-service-desk', name: 'IT Asset Management (ITAM)', description: 'Hardware and software inventory with license compliance', displayOrder: 3 },
          { id: 'sd-4', serviceId: 'it-service-desk', name: 'Employee Onboarding/Offboarding', description: 'Automated provisioning and deprovisioning workflows', displayOrder: 4 },
          { id: 'sd-5', serviceId: 'it-service-desk', name: 'Knowledge Base Management', description: 'Self-service knowledge articles with search and feedback', displayOrder: 5 },
          { id: 'sd-6', serviceId: 'it-service-desk', name: 'Service Desk Analytics', description: 'Monthly reports on ticket volume, resolution time, satisfaction scores', displayOrder: 6 },
          { id: 'sd-7', serviceId: 'it-service-desk', name: 'VIP & Executive Support', description: 'Dedicated white-glove support for C-level executives', displayOrder: 7 },
        ],
        engagementTypes: ['MANAGED'],
        durationRange: { min: '12 months', max: '60 months' },
      },
      {
        name: 'Managed Database Administration',
        slug: generateSlug('Managed Database Administration'),
        description: 'Comprehensive database management for SQL and NoSQL platforms including performance tuning, backup/recovery, high availability configuration, patching, capacity planning, and 24/7 monitoring for Oracle, SQL Server, PostgreSQL, MySQL, MongoDB, and cloud databases.',
        icon: 'Database',
        isFeatured: false,
        isActive: true,
        displayOrder: 5,
        deliverables: [
          { id: 'dba-1', serviceId: 'managed-dba', name: 'Database Health Monitoring', description: '24/7 monitoring with automated alerting for performance issues', displayOrder: 1 },
          { id: 'dba-2', serviceId: 'managed-dba', name: 'Performance Tuning & Optimization', description: 'Query optimization, index tuning, and execution plan analysis', displayOrder: 2 },
          { id: 'dba-3', serviceId: 'managed-dba', name: 'Backup & Recovery Management', description: 'Automated backups with tested restore procedures', displayOrder: 3 },
          { id: 'dba-4', serviceId: 'managed-dba', name: 'High Availability Configuration', description: 'Clustering, replication, and failover setup', displayOrder: 4 },
          { id: 'dba-5', serviceId: 'managed-dba', name: 'Database Patching & Upgrades', description: 'Scheduled maintenance with zero-downtime deployments', displayOrder: 5 },
          { id: 'dba-6', serviceId: 'managed-dba', name: 'Capacity Planning Reports', description: 'Quarterly growth projections with scaling recommendations', displayOrder: 6 },
        ],
        engagementTypes: ['MANAGED'],
        durationRange: { min: '12 months', max: '60 months' },
      },
      {
        name: 'Managed Network Operations (NOC)',
        slug: generateSlug('Managed Network Operations NOC'),
        description: 'Round-the-clock network operations center services including network monitoring, incident response, configuration management, bandwidth optimization, SD-WAN management, and security event monitoring for enterprise networks.',
        icon: 'Network',
        isFeatured: false,
        isActive: true,
        displayOrder: 6,
        deliverables: [
          { id: 'noc-1', serviceId: 'managed-noc', name: 'Network Monitoring & Alerting', description: '24/7 monitoring of routers, switches, firewalls, and WAN links', displayOrder: 1 },
          { id: 'noc-2', serviceId: 'managed-noc', name: 'Network Incident Management', description: 'Rapid response to outages with escalation procedures', displayOrder: 2 },
          { id: 'noc-3', serviceId: 'managed-noc', name: 'Configuration & Change Management', description: 'Controlled network configuration with audit trails', displayOrder: 3 },
          { id: 'noc-4', serviceId: 'managed-noc', name: 'Bandwidth & Performance Optimization', description: 'Traffic analysis with QoS tuning recommendations', displayOrder: 4 },
          { id: 'noc-5', serviceId: 'managed-noc', name: 'SD-WAN Management', description: 'Centralized management of software-defined WAN infrastructure', displayOrder: 5 },
          { id: 'noc-6', serviceId: 'managed-noc', name: 'Network Security Monitoring', description: 'Real-time threat detection and security event correlation', displayOrder: 6 },
        ],
        engagementTypes: ['MANAGED'],
        durationRange: { min: '12 months', max: '60 months' },
      },
      {
        name: 'Managed Backup & Disaster Recovery',
        slug: generateSlug('Managed Backup & Disaster Recovery'),
        description: 'Enterprise-grade backup and disaster recovery services with automated backup orchestration, offsite replication, disaster recovery testing, RTO/RPO management, and business continuity planning aligned with ISO 22301 standards.',
        icon: 'Shield',
        isFeatured: false,
        isActive: true,
        displayOrder: 7,
        deliverables: [
          { id: 'bdr-1', serviceId: 'managed-backup-dr', name: 'Automated Backup Orchestration', description: 'Scheduled backups across servers, databases, and applications', displayOrder: 1 },
          { id: 'bdr-2', serviceId: 'managed-backup-dr', name: 'Offsite Replication & Storage', description: 'Geo-redundant storage with encryption at rest and in transit', displayOrder: 2 },
          { id: 'bdr-3', serviceId: 'managed-backup-dr', name: 'Disaster Recovery Plan', description: 'Documented DR procedures with defined RTO/RPO objectives', displayOrder: 3 },
          { id: 'bdr-4', serviceId: 'managed-backup-dr', name: 'DR Testing & Validation', description: 'Quarterly failover tests with executive reporting', displayOrder: 4 },
          { id: 'bdr-5', serviceId: 'managed-backup-dr', name: 'Backup Monitoring & Reporting', description: 'Daily backup validation with monthly compliance reports', displayOrder: 5 },
          { id: 'bdr-6', serviceId: 'managed-backup-dr', name: 'Ransomware Recovery Capability', description: 'Immutable backups with rapid recovery procedures', displayOrder: 6 },
        ],
        engagementTypes: ['MANAGED'],
        durationRange: { min: '12 months', max: '60 months' },
      },
      {
        name: 'Staff Augmentation & Team Extension',
        slug: generateSlug('Staff Augmentation & Team Extension'),
        description: 'Flexible on-demand access to certified IT professionals including system administrators, database administrators, cloud engineers, DevOps engineers, network specialists, and support engineers to supplement internal teams with predictable costs and rapid onboarding.',
        icon: 'Users',
        isFeatured: false,
        isActive: true,
        displayOrder: 8,
        deliverables: [
          { id: 'staff-1', serviceId: 'staff-augmentation', name: 'Resource Deployment Plan', description: 'Tailored staffing plan with skills matrix and onboarding timeline', displayOrder: 1 },
          { id: 'staff-2', serviceId: 'staff-augmentation', name: 'Certified IT Professionals', description: 'Pre-vetted engineers with relevant certifications and experience', displayOrder: 2 },
          { id: 'staff-3', serviceId: 'staff-augmentation', name: 'Knowledge Transfer Program', description: 'Structured handover and documentation processes', displayOrder: 3 },
          { id: 'staff-4', serviceId: 'staff-augmentation', name: 'Performance Management', description: 'Monthly performance reviews with satisfaction tracking', displayOrder: 4 },
          { id: 'staff-5', serviceId: 'staff-augmentation', name: 'Flexible Scaling Options', description: 'Ramp-up/ramp-down capabilities with 30-day notice', displayOrder: 5 },
        ],
        engagementTypes: ['MANAGED'],
        durationRange: { min: '3 months', max: '36 months' },
      },
      {
        name: 'IT Operations Consulting & Transition',
        slug: generateSlug('IT Operations Consulting & Transition'),
        description: 'Strategic consulting for IT outsourcing decisions, vendor selection, transition planning, knowledge transfer, process design, SLA definition, and governance models to ensure smooth migration from in-house to managed services with minimal business disruption.',
        icon: 'RefreshCw',
        isFeatured: false,
        isActive: true,
        displayOrder: 9,
        deliverables: [
          { id: 'trans-1', serviceId: 'it-ops-transition', name: 'IT Operations Assessment', description: 'Current state analysis with maturity scoring and benchmarks', displayOrder: 1 },
          { id: 'trans-2', serviceId: 'it-ops-transition', name: 'Outsourcing Strategy', description: 'Make vs. buy analysis with sourcing model recommendations', displayOrder: 2 },
          { id: 'trans-3', serviceId: 'it-ops-transition', name: 'Transition Plan & Roadmap', description: 'Phased migration plan with risk mitigation strategies', displayOrder: 3 },
          { id: 'trans-4', serviceId: 'it-ops-transition', name: 'SLA & KPI Framework', description: 'Service level agreements with measurable performance metrics', displayOrder: 4 },
          { id: 'trans-5', serviceId: 'it-ops-transition', name: 'Knowledge Transfer Program', description: 'Comprehensive handover with documentation and training', displayOrder: 5 },
          { id: 'trans-6', serviceId: 'it-ops-transition', name: 'Governance Model', description: 'Service governance structure with escalation and review processes', displayOrder: 6 },
        ],
        engagementTypes: ['ADVISORY'],
        durationRange: { min: '8 weeks', max: '20 weeks' },
      },
      {
        name: 'AIOps & Intelligent Automation',
        slug: generateSlug('AIOps & Intelligent Automation'),
        description: 'Implement AI-driven IT operations with intelligent event correlation, anomaly detection, predictive analytics, automated remediation, and self-healing infrastructure to reduce MTTR and operational overhead while improving service reliability.',
        icon: 'Bot',
        isFeatured: true,
        isActive: true,
        displayOrder: 10,
        deliverables: [
          { id: 'aiops-o-1', serviceId: 'aiops-outsource', name: 'AIOps Platform Implementation', description: 'Deployment of Moogsoft, Splunk, or Dynatrace with ML models', displayOrder: 1 },
          { id: 'aiops-o-2', serviceId: 'aiops-outsource', name: 'Intelligent Event Correlation', description: 'Automated incident grouping and root cause identification', displayOrder: 2 },
          { id: 'aiops-o-3', serviceId: 'aiops-outsource', name: 'Anomaly Detection Models', description: 'Baseline learning with threshold-less alerting', displayOrder: 3 },
          { id: 'aiops-o-4', serviceId: 'aiops-outsource', name: 'Automated Remediation Playbooks', description: 'Self-healing workflows for common incident types', displayOrder: 4 },
          { id: 'aiops-o-5', serviceId: 'aiops-outsource', name: 'Predictive Analytics Dashboard', description: 'Capacity forecasting and failure prediction reports', displayOrder: 5 },
          { id: 'aiops-o-6', serviceId: 'aiops-outsource', name: 'Runbook Automation', description: 'Automated task execution with approval workflows', displayOrder: 6 },
        ],
        engagementTypes: ['IMPLEMENTATION'],
        durationRange: { min: '12 weeks', max: '24 weeks' },
      },
      {
        name: 'Managed DevOps & CI/CD',
        slug: generateSlug('Managed DevOps & CI CD'),
        description: 'Operate and optimize DevOps toolchains and CI/CD pipelines including build automation, deployment orchestration, environment management, release management, and infrastructure as code with continuous monitoring and improvement.',
        icon: 'Zap',
        isFeatured: false,
        isActive: true,
        displayOrder: 11,
        deliverables: [
          { id: 'mdev-1', serviceId: 'managed-devops', name: 'CI/CD Pipeline Management', description: 'Jenkins/GitLab/Azure DevOps pipeline operations and optimization', displayOrder: 1 },
          { id: 'mdev-2', serviceId: 'managed-devops', name: 'Environment Management', description: 'Automated provisioning and configuration of dev/test/prod environments', displayOrder: 2 },
          { id: 'mdev-3', serviceId: 'managed-devops', name: 'Release Orchestration', description: 'Coordinated multi-environment deployments with rollback capability', displayOrder: 3 },
          { id: 'mdev-4', serviceId: 'managed-devops', name: 'Infrastructure as Code Operations', description: 'Terraform/Ansible maintenance with version control', displayOrder: 4 },
          { id: 'mdev-5', serviceId: 'managed-devops', name: 'Build & Deployment Metrics', description: 'DORA metrics tracking with continuous improvement insights', displayOrder: 5 },
          { id: 'mdev-6', serviceId: 'managed-devops', name: 'Container Orchestration Management', description: 'Kubernetes cluster operations with auto-scaling and monitoring', displayOrder: 6 },
        ],
        engagementTypes: ['MANAGED'],
        durationRange: { min: '12 months', max: '48 months' },
      },
      {
        name: 'SLA Management & Service Governance',
        slug: generateSlug('SLA Management & Service Governance'),
        description: 'Establish robust service governance frameworks with SLA definition, KPI tracking, service catalog management, continuous service improvement (CSI), quarterly business reviews, and executive reporting for accountability and transparency.',
        icon: 'Eye',
        isFeatured: false,
        isActive: true,
        displayOrder: 12,
        deliverables: [
          { id: 'sla-1', serviceId: 'sla-management', name: 'Service Level Agreement Framework', description: 'Comprehensive SLAs with penalties and credits for non-compliance', displayOrder: 1 },
          { id: 'sla-2', serviceId: 'sla-management', name: 'KPI Dashboard & Reporting', description: 'Real-time service metrics with monthly executive summaries', displayOrder: 2 },
          { id: 'sla-3', serviceId: 'sla-management', name: 'Service Catalog', description: 'Detailed catalog of services with request fulfillment processes', displayOrder: 3 },
          { id: 'sla-4', serviceId: 'sla-management', name: 'Continuous Service Improvement (CSI)', description: 'Structured improvement programs with value realization tracking', displayOrder: 4 },
          { id: 'sla-5', serviceId: 'sla-management', name: 'Quarterly Business Reviews', description: 'Executive-level service reviews with roadmap alignment', displayOrder: 5 },
          { id: 'sla-6', serviceId: 'sla-management', name: 'Service Governance Model', description: 'Steering committee structure with escalation and decision rights', displayOrder: 6 },
        ],
        engagementTypes: ['ADVISORY'],
        durationRange: { min: '6 weeks', max: '12 weeks' },
      },
    ],
  },
  // TOWER 21: PUBLIC SECTOR MODERNIZATION
  {
    code: 'PUBLIC',
    name: 'Public Sector Modernization & Development Advisory',
    shortName: 'Public Sector',
    slug: generateSlug('Public Sector'),
    icon: 'Landmark',
    accentColor: '#0369A1',
    description: 'Enable government digital transformation and service modernization.',
    scope: 'Government digitization, regulator enablement (SupTech/RegTech), service delivery redesign, policy-to-technology translation, national-scale program execution.',
    typicalOutcomes: ['Modernized public services', 'Improved citizen experience', 'Enhanced regulatory capabilities'],
    certifications: [],
    frameworks: ['GovTech', 'SupTech', 'RegTech'],
    isFeatured: false,
    displayOrder: 21,
    services: [
      { name: 'Government Digital Strategy', slug: generateSlug('Government Digital Strategy'), description: 'Define government digitization roadmap.', icon: 'Map', typicalDeliverables: ['Digital strategy', 'Priority initiatives', 'Implementation roadmap'] },
      { name: 'Citizen Service Redesign', slug: generateSlug('Citizen Service Redesign'), description: 'Redesign citizen-facing services.', icon: 'Users', typicalDeliverables: ['Service blueprints', 'Journey improvements', 'Channel strategy'] },
      { name: 'RegTech/SupTech Enablement', slug: generateSlug('RegTech SupTech Enablement'), description: 'Enable regulatory technology capabilities.', icon: 'Scale', typicalDeliverables: ['Technology architecture', 'Capability roadmap', 'Platform design'] },
      { name: 'Agency Capacity Building', slug: generateSlug('Agency Capacity Building'), description: 'Build capabilities within government agencies.', icon: 'GraduationCap', typicalDeliverables: ['Training programs', 'Knowledge transfer', 'Sustainability plan'] },
    ],
  },
  // TOWER 22: RESEARCH & THOUGHT LEADERSHIP
  {
    code: 'RESEARCH',
    name: 'Research, Benchmarking, Maturity Assessments & Thought Leadership',
    shortName: 'Research & Insights',
    slug: generateSlug('Research & Insights'),
    icon: 'Microscope',
    accentColor: '#6D28D9',
    description: 'Provide market intelligence and organizational benchmarking.',
    scope: 'Market intelligence, capability maturity models, benchmarking, executive playbooks.',
    typicalOutcomes: ['Market insights', 'Capability baselines', 'Prioritized improvements'],
    certifications: [],
    frameworks: ['CMMI', 'Gartner ITScore'],
    isFeatured: false,
    displayOrder: 22,
    services: [
      { name: 'Maturity Assessment', slug: generateSlug('Maturity Assessment'), description: 'Assess organizational capability maturity.', icon: 'BarChart2', typicalDeliverables: ['Maturity assessment report', 'Benchmark comparison', 'Improvement roadmap'] },
      { name: 'Market Intelligence Research', slug: generateSlug('Market Intelligence Research'), description: 'Provide market and competitive intelligence.', icon: 'Globe', typicalDeliverables: ['Market research report', 'Competitive analysis', 'Trend analysis'] },
      { name: 'Executive Playbooks', slug: generateSlug('Executive Playbooks'), description: 'Develop executive decision-making guides.', icon: 'BookOpen', typicalDeliverables: ['Executive playbook', 'Decision frameworks', 'Quick reference guides'] },
      { name: 'Benchmark Studies', slug: generateSlug('Benchmark Studies'), description: 'Conduct industry benchmarking studies.', icon: 'TrendingUp', typicalDeliverables: ['Benchmark dashboard', 'Peer comparison', 'Best practices'] },
    ],
  },
  // TOWER 23: BUSINESS PROCESS MANAGEMENT
  {
    code: 'BPM',
    name: 'Business Process Management',
    shortName: 'Business Process',
    slug: 'business-process',
    icon: 'Workflow',
    accentColor: '#E11D48', // Rose color to distinguish
    description: 'Optimize, automate, and transform end-to-end business processes for operational excellence.',
    scope: 'Process architecture, business process re-engineering (BPR), process automation (BPA), workflow optimization, process mining, KPI definition, and continuous improvement.',
    typicalOutcomes: ['Streamlined operations', 'Reduced cycle times', 'Improved compliance', 'Enhanced visibility'],
    certifications: ['CBPP', 'Lean Six Sigma Black Belt', 'OMG-Certified Expert in BPM'],
    frameworks: ['BPMN 2.0', 'APQC Process Classification Framework', 'Lean Management', 'Six Sigma'],
    richContent: {
      executiveSummary: [
        'Boards demand proof that automation and AI reduce risk, not add it—modern BPM ties controls to measurable outcomes.',
        'Every hour of rework erodes margin; process visibility and standard work unlock double-digit EBITDA uplift.',
        'Operational resilience now equals regulatory resilience—clean processes cut audit findings and exceptions.',
        'Building once is not enough: continuous improvement loops keep automation value from decaying.',
      ],
      pdca: [
        {
          stage: 'Plan',
          headline: 'Baseline and prioritize',
          description: 'Clarify business goals, map value streams, and quantify waste.',
          activities: [
            'APQC-aligned process landscape',
            'Throughput/defect baseline and VOC',
            'Automation/value scoring model',
            'Roadmap and governance design',
          ],
          outputs: ['Heatmap and opportunity list', 'Business case', 'Governance charter'],
        },
        {
          stage: 'Do',
          headline: 'Design and automate',
          description: 'Redesign processes, standardize work, and build automation where ROI is highest.',
          activities: [
            'BPMN L2-L4 future-state design',
            'Automation backlogs (RPA/workflow/API)',
            'Playbooks, SOPs, and controls',
            'Pilot builds with change management',
          ],
          outputs: ['Future-state designs', 'Automation releases', 'SOPs and control library'],
        },
        {
          stage: 'Check',
          headline: 'Instrument and monitor',
          description: 'Measure cycle time, quality, exceptions, and adoption to prove value.',
          activities: [
            'Process mining and conformance checks',
            'KPIs/OKRs and dashboards',
            'Exception and defect analytics',
            'Value tracking (savings/throughput)',
          ],
          outputs: ['Dashboards', 'Adoption scorecards', 'Exception playbooks'],
        },
        {
          stage: 'Act',
          headline: 'Optimize and scale',
          description: 'Close gaps, tune automations, and scale to adjacent processes.',
          activities: [
            'Kaizen cycles and retros',
            'Control tuning and guardrails',
            'Hypercare to steady-state handoff',
            'Pipeline replenishment for next waves',
          ],
          outputs: ['Stabilized runbooks', 'Optimized automations', 'Next-wave backlog'],
        },
      ],
      complianceRoadmap: [
        {
          title: 'Discovery & Heatmap',
          description: 'Map processes, quantify pain points, and prioritize by value and feasibility.',
          duration: '2 weeks',
          outcome: 'Aligned backlog with quantified benefits.',
          deliverables: ['Process inventory', 'Value/effort matrix', 'Benefit model'],
        },
        {
          title: 'Design & Controls',
          description: 'Future-state design with controls, metrics, and SOPs.',
          duration: '3-4 weeks',
          outcome: 'Signed-off target designs and control plan.',
          deliverables: ['Future-state BPMN', 'RACI/SOPs', 'Control catalogue'],
        },
        {
          title: 'Build & Automate',
          description: 'Implement workflow/RPA/API automations with change management.',
          duration: '4-8 weeks',
          outcome: 'Live automations with trained users.',
          deliverables: ['Automation releases', 'Training', 'Hypercare plan'],
        },
        {
          title: 'Stabilize & Prove Value',
          description: 'Monitor KPIs, exceptions, and savings; tune for stability.',
          duration: '2-4 weeks',
          outcome: 'Documented value realization and stable operations.',
          deliverables: ['Dashboards', 'Exception playbooks', 'Value realization report'],
        },
        {
          title: 'Scale & Govern',
          description: 'Establish pipeline and governance for continuous improvement.',
          duration: 'ongoing',
          outcome: 'Self-funding optimization engine.',
          deliverables: ['Pipeline backlog', 'Governance cadence', 'Quarterly optimization pack'],
        },
      ],
      faqs: [
        {
          question: 'How do you pick the first processes?',
          answer: 'We prioritize by value/effort, automation fit, and change risk, using APQC mapping plus process mining where available.',
        },
        {
          question: 'Will this disrupt operations?',
          answer: 'We sequence pilots with hypercare and rollback paths; SOPs and change plans are shipped before go-live.',
        },
        {
          question: 'Can we reuse our existing RPA licenses?',
          answer: 'Yes. We design vendor-agnostic backlogs and build on your existing RPA/workflow/iPaaS stack to avoid shelfware.',
        },
        {
          question: 'How fast do we see value?',
          answer: 'Quick wins land in 4–6 weeks; larger value stream releases typically in 10–12 weeks.',
        },
      ],
      readinessQuiz: {
        headline: 'Process & Automation Readiness Check',
        ctaLabel: 'Get my process game plan',
        questions: [
          {
            id: 'inventory',
            prompt: 'Do you have a current process inventory and owners?',
            options: [
              { label: 'No inventory', value: 'none', score: 0 },
              { label: 'Partial list, not maintained', value: 'partial', score: 2 },
              { label: 'Complete with owners/metrics', value: 'complete', score: 4 },
            ],
          },
          {
            id: 'data',
            prompt: 'How do you measure process performance today?',
            options: [
              { label: 'Anecdotal only', value: 'anecdotal', score: 0 },
              { label: 'Basic KPIs in spreadsheets', value: 'basic', score: 2 },
              { label: 'Automated dashboards / process mining', value: 'advanced', score: 4 },
            ],
          },
          {
            id: 'automation',
            prompt: 'Automation landscape?',
            options: [
              { label: 'No automation in place', value: 'none', score: 0 },
              { label: 'Isolated RPA bots', value: 'isolated', score: 2 },
              { label: 'Coordinated workflow + RPA + API', value: 'coordinated', score: 4 },
            ],
          },
          {
            id: 'governance',
            prompt: 'Who approves process changes?',
            options: [
              { label: 'Team-level only', value: 'team', score: 1 },
              { label: 'Ops + IT jointly', value: 'opsit', score: 3 },
              { label: 'Formal process council/COE', value: 'council', score: 5 },
            ],
          },
          {
            id: 'controls',
            prompt: 'Control and risk handling?',
            options: [
              { label: 'Not defined', value: 'none', score: 0 },
              { label: 'Some SOPs, inconsistent', value: 'partial', score: 2 },
              { label: 'Documented controls with audits', value: 'full', score: 4 },
            ],
          },
        ],
      },
      estimator: {
        baseMonthsBySize: {
          small: 2.5,
          mid: 3.5,
          enterprise: 4.5,
        },
        maturityAdjustments: {
          'ad-hoc': 1.5,
          developing: 0.5,
          managed: 0,
        },
        accelerators: [
          { label: 'Existing RPA/workflow licenses', deltaMonths: -0.5 },
          { label: 'Process mining in place', deltaMonths: -0.5 },
          { label: 'Dedicated COE/Process Owner', deltaMonths: -0.5 },
        ],
        floorMonths: 2,
      },
      diagramLayers: [
        {
          id: 'strategy',
          label: 'Strategy & Outcomes',
          description: 'Business goals, KPIs, and value hypotheses anchor every process change.',
          accent: '#e11d48',
        },
        {
          id: 'design',
          label: 'Design & Controls',
          description: 'Standard work, roles, and controls reduce variance and risk.',
          accent: '#f97316',
        },
        {
          id: 'automation',
          label: 'Automation & Integration',
          description: 'Workflow, RPA, and APIs orchestrate execution with guardrails.',
          accent: '#22c55e',
        },
        {
          id: 'monitor',
          label: 'Monitor & Optimize',
          description: 'Dashboards, mining, and Kaizen loops sustain improvements.',
          accent: '#2563eb',
        },
      ],
    },
    isFeatured: true,
    displayOrder: 23,
    services: [
      { name: 'Process Architecture & Modeling', slug: generateSlug('Process Architecture & Modeling'), description: 'Design and document end-to-end process hierarchies and flows using industry standards.', icon: 'Share2', typicalDeliverables: ['Process landscape', 'L1-L4 process maps (BPMN)', 'Process owner matrix', ' SOPs'] },
      { name: 'Process Optimization & Re-engineering', slug: generateSlug('Process Optimization & Re-engineering'), description: 'Eliminate waste, reduce variance, and improve process efficiency through radical redesign.', icon: 'RefreshCw', typicalDeliverables: ['Optimization roadmap', 'Future-state process designs', 'Value stream maps', 'Gap analysis'] },
      { name: 'Business Process Automation (BPA)', slug: generateSlug('Business Process Automation'), description: 'Automate manual workflows and tasks with modern technology solutions.', icon: 'Zap', typicalDeliverables: ['Automation capability assessment', 'Workflow designs', 'BPA implementation plan', 'Tool selection'] },
      { name: 'Process Performance Management', slug: generateSlug('Process Performance Management'), description: 'Establish KPIs, SLAs, and monitoring systems for continuous process improvement.', icon: 'BarChart', typicalDeliverables: ['KPI definition', 'Process dashboards', 'Performance reporting framework', 'Continuous improvement playbook'] },
      { name: 'Process Mining & Intelligence', slug: generateSlug('Process Mining & Intelligence'), description: 'Leverage data to visualize actual process execution and identify bottlenecks.', icon: 'Search', typicalDeliverables: ['Process mining analysis', 'Conformance checking report', 'Bottleneck identification', 'Root cause analysis'] },
    ],
  },
  // TOWER 24: ISO/IEC 42001:2023 AIMS
  {
    code: 'ISO-42001',
    name: 'ISO/IEC 42001:2023 - AI Management System',
    shortName: 'ISO/IEC 42001:2023',
    slug: 'iso-42001',
    icon: 'Brain',
    accentColor: '#0ea5e9', // Sky blue for technology/trust
    description: 'The world’s first global standard for Artificial Intelligence Management Systems (AIMS). ISO/IEC 42001:2023 provides a comprehensive framework for organizations to develop, provide, or use AI systems responsibly. It addresses the unique challenges of AI technology—including ethical considerations, transparency, accountability, and continuous learning—integrated with standard management system practices. Implementing this standard demonstrates your organization’s commitment to trustworthy AI, regulatory compliance (including the EU AI Act), and risk management, fostering trust with stakeholders, customers, and regulators in an increasingly AI-driven world.',
    scope: 'Our comprehensive AIMS advisory services cover the full PDCA (Plan-Do-Check-Act) lifecycle required for ISO 42001 certification: Context of the Organization, Leadership & Commitment, Planning (Risk Assessment & Treatment), Support (Resources, Competence, Awareness), Operation (AI System Lifecycle Management), Performance Evaluation, and Continual Improvement.',
    typicalOutcomes: [
      'Global recognition of responsible AI practices',
      'Alignment with EU AI Act and global regulations',
      'Structured management of AI-specific risks',
      'Enhanced trust from customers and partners',
      'Improved quality and reliability of AI systems'
    ],
    certifications: ['ISO/IEC 42001 Lead Implementer', 'ISO/IEC 42001 Internal Auditor'],
    frameworks: ['ISO/IEC 42001:2023', 'ISO/IEC 23894 (AI Risk)', 'ISO/IEC 22989 (Concepts)', 'NIST AI RMF'],
    richContent: {
      executiveSummary: [
        'Boards are now accountable for AI risk oversight—42001 gives directors auditable proof of duty-of-care over AI systems.',
        'Protect reputation by standardizing fairness, transparency, robustness, and incident playbooks across all AI products.',
        'Stay ahead of regulation: 42001 natively maps to EU AI Act risk classes and integrates with sector guidance.',
        'Accelerate GenAI safely—govern model inventory, data lineage, and human-in-the-loop before scaling.',
      ],
      pdca: [
        {
          stage: 'Plan',
          headline: 'Define intent, risk appetite, and scope',
          description: 'Establish AIMS charter, context, roles, and AI risk taxonomy aligned to business objectives.',
          activities: [
            'Context analysis and stakeholder mapping',
            'AI risk identification and scoring (ISO 23894)',
            'Statement of Applicability for AI controls',
            'Policy & objective setting with KPIs',
          ],
          outputs: ['AIMS charter', 'Risk register & SoA', 'AI policy suite'],
        },
        {
          stage: 'Do',
          headline: 'Embed controls across the AI lifecycle',
          description: 'Operationalize governance in data, model, and deployment workflows.',
          activities: [
            'AI inventory & data lineage',
            'Model cards / datasheets / release checklists',
            'Secure MLOps & change control',
            'Human oversight + fallback plans',
          ],
          outputs: ['Control evidence pack', 'Model documentation', 'Runbooks & playbooks'],
        },
        {
          stage: 'Check',
          headline: 'Monitor, audit, and prove performance',
          description: 'Continuous monitoring of model behavior, bias, drift, and incidents with internal audits.',
          activities: [
            'KPI and threshold monitoring',
            'Bias/drift evaluations per release',
            'Internal audit & NCR management',
            'Incident logging and RCA',
          ],
          outputs: ['Monitoring dashboards', 'Audit reports', 'Corrective action records'],
        },
        {
          stage: 'Act',
          headline: 'Improve and industrialize',
          description: 'Close gaps, update controls, and evolve the AIMS with lessons learned.',
          activities: [
            'CAPA execution and verification',
            'Control tuning and retraining gates',
            'Quarterly management reviews',
            'Regulatory/standards updates ingestion',
          ],
          outputs: ['Updated controls', 'Management review minutes', 'Release governance updates'],
        },
      ],
      complianceRoadmap: [
        {
          title: 'Gap Analysis',
          description: 'Assess current AI governance, data/ML pipelines, and controls vs. ISO/IEC 42001 clauses.',
          duration: '2-3 weeks',
          outcome: 'Prioritized remediation backlog with quick wins and critical risks flagged.',
          deliverables: ['Gap report', 'Maturity score', 'Certification budget range'],
        },
        {
          title: 'Framework Design',
          description: 'Design AIMS architecture, RACI, policies, and SoA mapped to existing ISO 27001/27701 controls.',
          duration: '3-4 weeks',
          outcome: 'Signed-off AIMS blueprint and control catalogue.',
          deliverables: ['AIMS blueprint', 'Policy stack', 'Control mappings'],
        },
        {
          title: 'Implementation',
          description: 'Roll out controls across data, model, and deployment lifecycle; instrument monitoring.',
          duration: '8-16 weeks',
          outcome: 'Operationalized controls with evidence captured.',
          deliverables: ['Implemented controls', 'Model cards & datasheets', 'Playbooks and SOPs'],
        },
        {
          title: 'Internal Audit',
          description: 'Independent audit of the AIMS to verify readiness and close NCRs.',
          duration: '2 weeks',
          outcome: 'All non-conformities resolved with CAPA tracked.',
          deliverables: ['Audit report', 'NCR log', 'Corrective action tracker'],
        },
        {
          title: 'Certification',
          description: 'Support during Stage 1/2 external audit, evidence prep, and assessor liaison.',
          duration: '4-6 weeks',
          outcome: 'Certification decision with sustained AIMS operating cadence.',
          deliverables: ['Evidence pack', 'CB liaison support', 'Go-live governance calendar'],
        },
      ],
      faqs: [
        {
          question: 'How does ISO 42001 relate to the EU AI Act?',
          answer: 'ISO 42001 operationalizes many Act obligations: risk management (Art.9), data governance (Art.10), quality management (Art.17), and monitoring/post-market reporting. It provides auditable proof of compliance readiness.',
        },
        {
          question: 'Is ISO 42001 mandatory?',
          answer: 'No, but it is rapidly becoming the preferred evidence framework for regulators, customers, and insurers to demonstrate trustworthy AI controls.',
        },
        {
          question: 'How long does certification take?',
          answer: 'Typical mid-size organizations complete in 4–7 months depending on AI maturity and whether ISO 27001/27701 controls already exist.',
        },
        {
          question: 'Can we leverage our ISO 27001/27701 work?',
          answer: 'Yes—security and privacy controls map directly. We reuse your ISMS/PIMS assets to reduce net-new effort and shrink audit scope.',
        },
        {
          question: 'Does it cover Generative AI?',
          answer: 'Yes—model cards, dataset governance, prompt injection defenses, and human oversight are explicitly integrated into the AIMS control set.',
        },
      ],
      readinessQuiz: {
        headline: 'Check your AI Governance Readiness',
        ctaLabel: 'Get my readiness plan',
        questions: [
          {
            id: 'inventory',
            prompt: 'Do you maintain an AI use-case and model inventory with owners?',
            options: [
              { label: 'No inventory yet', value: 'none', score: 0 },
              { label: 'Informal spreadsheet', value: 'basic', score: 2 },
              { label: 'Systematic and kept current', value: 'mature', score: 4 },
            ],
          },
          {
            id: 'risk',
            prompt: 'How do you classify AI system risk?',
            options: [
              { label: 'Not assessed', value: 'none', score: 0 },
              { label: 'Ad-hoc per project', value: 'adhoc', score: 2 },
              { label: 'Defined taxonomy aligned to EU AI Act/NIST RMF', value: 'defined', score: 4 },
            ],
          },
          {
            id: 'governance',
            prompt: 'Who approves AI releases?',
            options: [
              { label: 'Engineering only', value: 'eng', score: 1 },
              { label: 'Product + Security', value: 'prodsec', score: 3 },
              { label: 'Formal AI Governance board with RACI', value: 'board', score: 5 },
            ],
          },
          {
            id: 'data',
            prompt: 'Data governance for training and evaluation?',
            options: [
              { label: 'Unstructured, no lineage', value: 'none', score: 0 },
              { label: 'Some lineage & PII handling', value: 'partial', score: 2 },
              { label: 'Documented data cards, DPIAs, and retention rules', value: 'full', score: 4 },
            ],
          },
          {
            id: 'monitoring',
            prompt: 'Model monitoring and incident response?',
            options: [
              { label: 'Not in place', value: 'none', score: 0 },
              { label: 'Basic metrics & manual checks', value: 'basic', score: 2 },
              { label: 'Automated drift/bias alerts with playbooks', value: 'advanced', score: 4 },
            ],
          },
        ],
      },
      estimator: {
        baseMonthsBySize: {
          small: 4,
          mid: 6,
          enterprise: 8,
        },
        maturityAdjustments: {
          'ad-hoc': 2,
          developing: 1,
          managed: 0,
        },
        accelerators: [
          { label: 'Already ISO 27001 certified', deltaMonths: -1 },
          { label: 'Established DPIA process (27701/Privacy)', deltaMonths: -1 },
          { label: 'Dedicated AI governance owner', deltaMonths: -0.5 },
        ],
        floorMonths: 3,
      },
      technicalMappings: [
        {
          framework: 'NIST AI RMF',
          items: [
            { title: 'Govern (GV)', detail: 'AIMS governance, roles, and oversight map to GV outcomes; management review satisfies accountability evidence.' },
            { title: 'Map (MAP)', detail: 'AI inventory, context setting, and risk classification align to MAP 1.1–1.4 with traceability artifacts.' },
            { title: 'Measure (ME)', detail: 'Bias, robustness, drift, and security evaluations operationalize ME outcomes with documented thresholds.' },
            { title: 'Manage (MAN)', detail: 'SoA, CAPA, and release gates ensure risk treatment and residual risk sign-off per MAN outcomes.' },
          ],
        },
        {
          framework: 'EU AI Act',
          items: [
            { title: 'Art. 9 Risk Management System', detail: 'ISO 42001 clauses 6 & 8 structure the AI risk cycle with evidence for auditors.' },
            { title: 'Art. 10 Data & Data Governance', detail: 'Data quality, lineage, bias controls, and documentation mirrored in AIMS data controls.' },
            { title: 'Art. 15 Accuracy, Robustness, Cybersecurity', detail: 'Model validation, adversarial testing, and monitoring satisfy performance obligations.' },
            { title: 'Art. 17 Quality Management System', detail: 'The AIMS itself is the QMS covering procedures, roles, and continuous improvement.' },
          ],
        },
      ],
      diagramLayers: [
        {
          id: '27001',
          label: 'ISO/IEC 27001 (Security)',
          description: 'Information security management system providing the base control environment.',
          accent: '#0ea5e9',
        },
        {
          id: '27701',
          label: 'ISO/IEC 27701 (Privacy)',
          description: 'Privacy Information Management System layering PII governance on top of security.',
          accent: '#06b6d4',
        },
        {
          id: '42001',
          label: 'ISO/IEC 42001 (AI Governance)',
          description: 'AI Management System wraps around security and privacy to govern AI-specific risks.',
          accent: '#1e3a8a',
        },
      ],
    },
    isFeatured: true,
    displayOrder: 24,
    services: [
      { name: 'AIMS Gap Analysis & Readiness Assessment', slug: generateSlug('AIMS Gap Analysis'), description: 'Evaluate your current AI governance, policies, and controls against ISO/IEC 42001:2023 requirements to identify gaps and roadmap for certification.', icon: 'SearchCheck', typicalDeliverables: ['Detailed gap analysis report', 'Maturity scorecard', 'Remediation roadmap', 'Certification budget estimation'] },
      { name: 'AIMS Implementation Support', slug: generateSlug('AIMS Implementation'), description: 'End-to-end guidance to establish your AI Management System (AIMS), including policy development, control design, and process integration.', icon: 'Building', typicalDeliverables: ['AIMS Manual', 'AI Policy Suite', 'Control implementation evidence', 'Staff training materials'] },
      { name: 'AI Risk Assessment (ISO/IEC 23894)', slug: generateSlug('AI Risk Assessment'), description: 'Conduct rigorous AI-specific risk assessments aligned with ISO 23894 to identify safety, security, and fairness risks.', icon: 'ShieldAlert', typicalDeliverables: ['AI Risk Register', 'Risk treatment plan', 'Statement of Applicability (SoA)', 'Impact analysis'] },
      { name: 'AI Impact Assessment (AIIA)', slug: generateSlug('AI Impact Assessment'), description: 'Detailed impact assessments for high-risk AI systems to ensure fairness, transparency, and fundamental rights protection.', icon: 'FileSearch', typicalDeliverables: ['Algorithmic impact report', 'Fairness audit results', 'Mitigation recommendations', 'Stakeholder notification plan'] },
      { name: 'Internal Audit for ISO 42001', slug: generateSlug('ISO 42001 Internal Audit'), description: 'Independent internal audit of your AIMS to verify conformity before the external certification body audit.', icon: 'ClipboardCheck', typicalDeliverables: ['Internal audit report', 'Non-conformity (NCR) reports', 'Corrective action plan reviews', 'Audit evidence pack'] },
    ],
  },
  // TOWER 25: SOFTWARE DEVELOPMENT
  {
    code: 'SWDEV',
    name: 'Custom Software Development & Engineering',
    shortName: 'Software Development',
    slug: 'software-development',
    icon: 'Code2',
    accentColor: '#7C3AED', // Violet for engineering/craft
    description: 'Design, build, and ship production-grade software—from MVPs to enterprise platforms—with security, quality, and velocity baked in from day one.',
    scope: 'Full-stack web and mobile development, API design, microservices architecture, DevSecOps pipelines, cloud-native engineering, quality engineering, performance optimization, and technical debt remediation.',
    typicalOutcomes: ['Production-ready software', 'Scalable architecture', 'Automated CI/CD', 'Measurable quality gates'],
    certifications: ['AWS Solutions Architect', 'Azure Developer Associate', 'Kubernetes (CKA/CKAD)'],
    frameworks: ['Scrum', 'SAFe', 'DevOps', 'DORA Metrics', '12-Factor App'],
    richContent: {
      executiveSummary: [
        'Speed without guardrails creates tech debt that compounds quarterly—structured engineering practices keep velocity sustainable.',
        'Every production incident erodes customer trust; shift-left testing and automated security gates catch defects before they ship.',
        'Cloud-native architecture is not optional—monoliths cannot scale with demand or survive region failures.',
        'Great software is built by great teams: engineering culture, code review standards, and knowledge sharing matter as much as technology choices.',
      ],
      pdca: [
        {
          stage: 'Plan',
          headline: 'Architect and scope',
          description: 'Define business requirements, technical architecture, and delivery plan with clear milestones.',
          activities: [
            'Requirements workshops and user story mapping',
            'Architecture decision records (ADRs)',
            'Technology selection and PoC validation',
            'Sprint planning and backlog prioritization',
          ],
          outputs: ['Architecture blueprint', 'Prioritized backlog', 'Technical risk register'],
        },
        {
          stage: 'Do',
          headline: 'Build and integrate',
          description: 'Develop features in short iterations with continuous integration, code review, and automated testing.',
          activities: [
            'Feature development in 2-week sprints',
            'Pair programming and code reviews',
            'Automated unit/integration/e2e tests',
            'CI/CD pipeline with security scanning',
          ],
          outputs: ['Working increments', 'Test coverage reports', 'Deployment artifacts'],
        },
        {
          stage: 'Check',
          headline: 'Test and validate',
          description: 'Measure quality, performance, and security against defined acceptance criteria and SLAs.',
          activities: [
            'Performance and load testing',
            'Security penetration testing',
            'User acceptance testing (UAT)',
            'DORA metrics tracking (lead time, MTTR, change failure rate)',
          ],
          outputs: ['Quality dashboards', 'Security audit reports', 'UAT sign-off'],
        },
        {
          stage: 'Act',
          headline: 'Ship and optimize',
          description: 'Deploy to production with zero-downtime strategies, monitor, and feed learnings back into the next sprint.',
          activities: [
            'Blue/green or canary deployments',
            'Observability setup (logs, metrics, traces)',
            'Sprint retrospectives and process tuning',
            'Technical debt backlog grooming',
          ],
          outputs: ['Production releases', 'Observability dashboards', 'Improvement backlog'],
        },
      ],
      complianceRoadmap: [
        {
          title: 'Discovery & Architecture',
          description: 'Understand business goals, map domain boundaries, and define the target architecture.',
          duration: '1-2 weeks',
          outcome: 'Aligned technical vision with clear domain boundaries and risk mitigation.',
          deliverables: ['Architecture blueprint', 'ADRs', 'Risk register', 'PoC results'],
        },
        {
          title: 'Foundation Sprint',
          description: 'Set up project scaffolding, CI/CD pipelines, environments, and core infrastructure.',
          duration: '1-2 weeks',
          outcome: 'Team can deploy from day one with automated quality gates.',
          deliverables: ['CI/CD pipeline', 'IaC templates', 'Dev/staging/prod environments'],
        },
        {
          title: 'Feature Development',
          description: 'Iterative delivery of features in 2-week sprints with continuous stakeholder demos.',
          duration: '6-16 weeks',
          outcome: 'Working software with full test coverage and documentation.',
          deliverables: ['Feature increments', 'API documentation', 'Test suites'],
        },
        {
          title: 'Hardening & Launch',
          description: 'Performance tuning, security audit, UAT, and production cutover.',
          duration: '2-3 weeks',
          outcome: 'Production-ready system with operational runbooks.',
          deliverables: ['Perf test reports', 'Security audit', 'Runbooks', 'Go-live checklist'],
        },
        {
          title: 'Hypercare & Handoff',
          description: 'Post-launch monitoring, bug fixes, knowledge transfer, and team enablement.',
          duration: '2-4 weeks',
          outcome: 'Stable operations with self-sufficient internal team.',
          deliverables: ['Knowledge transfer sessions', 'Documentation', 'Support SLA transition'],
        },
      ],
      faqs: [
        {
          question: 'What tech stacks do you work with?',
          answer: 'We are stack-agnostic but have deep expertise in TypeScript/React/Next.js, Node.js, Python, Go, Java/Spring, .NET, and cloud-native platforms on AWS, Azure, and GCP.',
        },
        {
          question: 'How do you handle security?',
          answer: 'Security is shift-left: SAST/DAST in CI, dependency scanning, secret detection, and penetration testing before every major release. We follow OWASP Top 10 as a minimum baseline.',
        },
        {
          question: 'Can you work with our existing team?',
          answer: 'Yes. We offer team augmentation, embedded squads, or full delivery ownership—whatever model accelerates your outcomes while building internal capability.',
        },
        {
          question: 'How do you measure engineering quality?',
          answer: 'We track DORA metrics (deployment frequency, lead time, change failure rate, MTTR), test coverage, defect escape rate, and technical debt ratio as standard KPIs.',
        },
        {
          question: 'What about ongoing maintenance?',
          answer: 'We offer managed application support with SLAs, or structured handoff with documentation, training, and a transition period to your internal team.',
        },
        {
          question: 'How do you estimate project cost?',
          answer: 'After a paid discovery sprint (1-2 weeks), we provide fixed-scope estimates for defined phases. For evolving requirements, we use time-and-materials with sprint-level budget guardrails.',
        },
      ],
      readinessQuiz: {
        headline: 'Software Engineering Readiness',
        ctaLabel: 'Talk to an architect',
        questions: [
          {
            id: 'architecture',
            prompt: 'How would you describe your current architecture?',
            options: [
              { label: 'Monolith, tightly coupled', value: 'monolith', score: 0 },
              { label: 'Partially modular', value: 'partial', score: 2 },
              { label: 'Well-defined services/APIs', value: 'modular', score: 4 },
            ],
          },
          {
            id: 'cicd',
            prompt: 'What does your deployment process look like?',
            options: [
              { label: 'Manual / ad-hoc', value: 'manual', score: 0 },
              { label: 'Some CI, manual deploy', value: 'partial', score: 2 },
              { label: 'Fully automated CI/CD', value: 'automated', score: 4 },
            ],
          },
          {
            id: 'testing',
            prompt: 'Automated testing coverage?',
            options: [
              { label: 'Minimal or none', value: 'none', score: 0 },
              { label: 'Unit tests only', value: 'unit', score: 2 },
              { label: 'Unit + integration + e2e', value: 'full', score: 4 },
            ],
          },
          {
            id: 'team',
            prompt: 'Engineering team capacity?',
            options: [
              { label: 'No dedicated team', value: 'none', score: 0, helper: 'Need full delivery team' },
              { label: 'Small team, gaps in skills', value: 'partial', score: 2, helper: 'Need augmentation' },
              { label: 'Full team, need acceleration', value: 'full', score: 4, helper: 'Need strategic guidance' },
            ],
          },
          {
            id: 'observability',
            prompt: 'Production monitoring and observability?',
            options: [
              { label: 'No monitoring', value: 'none', score: 0 },
              { label: 'Basic uptime checks', value: 'basic', score: 2 },
              { label: 'Logs, metrics, traces, alerts', value: 'full', score: 5 },
            ],
          },
        ],
      },
      estimator: {
        baseMonthsBySize: {
          small: 2,
          mid: 4,
          enterprise: 7,
        },
        maturityAdjustments: {
          'ad-hoc': 2,
          developing: 1,
          managed: 0,
        },
        accelerators: [
          { label: 'Existing CI/CD pipeline', deltaMonths: -0.5 },
          { label: 'Clear requirements / specs', deltaMonths: -1 },
          { label: 'Dedicated product owner', deltaMonths: -0.5 },
        ],
        floorMonths: 1.5,
      },
      diagramLayers: [
        {
          id: 'infrastructure',
          label: 'Cloud & Infrastructure',
          description: 'IaC-managed cloud environments with auto-scaling, security hardening, and multi-region resilience.',
          accent: '#06b6d4',
        },
        {
          id: 'platform',
          label: 'Platform & DevOps',
          description: 'CI/CD pipelines, container orchestration, secrets management, and environment parity from dev to prod.',
          accent: '#8b5cf6',
        },
        {
          id: 'application',
          label: 'Application & APIs',
          description: 'Domain-driven microservices, RESTful/GraphQL APIs, event-driven messaging, and clean architecture patterns.',
          accent: '#ec4899',
        },
        {
          id: 'quality',
          label: 'Quality & Security',
          description: 'Automated testing pyramids, SAST/DAST scanning, performance benchmarks, and observability instrumentation.',
          accent: '#f59e0b',
        },
      ],
    },
    isFeatured: true,
    displayOrder: 25,
    services: [
      { name: 'Custom Application Development', slug: generateSlug('Custom Application Development'), description: 'Design and build bespoke web and mobile applications tailored to your business needs.', icon: 'Code', typicalDeliverables: ['Working software', 'Source code repository', 'Technical documentation', 'Deployment artifacts'] },
      { name: 'API Design & Microservices', slug: generateSlug('API Design & Microservices'), description: 'Architect and implement scalable APIs and microservice ecosystems.', icon: 'Plug', typicalDeliverables: ['API specifications (OpenAPI)', 'Service contracts', 'Integration tests', 'API gateway configuration'] },
      { name: 'DevSecOps & CI/CD', slug: generateSlug('DevSecOps & CI/CD'), description: 'Build automated pipelines with security gates, quality checks, and zero-downtime deployments.', icon: 'GitBranch', typicalDeliverables: ['CI/CD pipelines', 'IaC templates', 'Security scan reports', 'Deployment runbooks'] },
      { name: 'Cloud-Native Engineering', slug: generateSlug('Cloud-Native Engineering'), description: 'Build containerized, serverless, and event-driven applications optimized for cloud platforms.', icon: 'Cloud', typicalDeliverables: ['Container images', 'Kubernetes manifests', 'Serverless functions', 'Cloud architecture diagrams'] },
      { name: 'Quality Engineering & Testing', slug: generateSlug('Quality Engineering & Testing SW'), description: 'Establish comprehensive testing strategies with automated test suites and performance benchmarks.', icon: 'TestTube2', typicalDeliverables: ['Test strategy', 'Automated test suites', 'Performance test results', 'Quality dashboards'] },
    ],
  },
  // TOWER 26: MONITORING & OBSERVABILITY
  {
    code: 'MONITOR',
    name: 'Monitoring & Observability',
    shortName: 'Monitoring & Observability',
    slug: 'monitoring',
    icon: 'Activity',
    accentColor: '#8B5CF6',
    description: 'Build comprehensive monitoring and observability platforms that provide real-time visibility into application performance, infrastructure health, and business metrics. Our observability practice helps GCC enterprises transition from reactive monitoring to proactive insights, enabling faster incident resolution, better capacity planning, and data-driven operational decisions. From infrastructure monitoring through full-stack observability and AIOps, we deliver solutions that support mission-critical operations across Qatar, Saudi Arabia, UAE, and the broader region.',
    scope: 'Our comprehensive monitoring and observability services cover the complete visibility spectrum: Infrastructure Monitoring (server, network, storage monitoring, resource utilization tracking, availability monitoring, capacity metrics), Application Performance Management (APM for distributed applications, transaction tracing, code-level diagnostics, user experience monitoring, synthetic monitoring), Log Management & Analytics (centralized logging, log aggregation and parsing, security log analysis, compliance logging, log retention optimization), Distributed Tracing (end-to-end transaction visibility, microservices tracing, latency analysis, dependency mapping), Real-Time Dashboards & Visualization (business metrics dashboards, operational dashboards, executive reporting, custom visualizations), Alerting & Incident Management (intelligent alerting, escalation workflows, on-call management, incident correlation), Network Performance Monitoring (network flow analysis, bandwidth monitoring, latency tracking, DNS monitoring), Cloud Monitoring (multi-cloud visibility, cloud-native monitoring, cost monitoring integration), Capacity Planning & Forecasting (trend analysis, resource forecasting, growth planning, optimization recommendations), AIOps & Intelligent Operations (anomaly detection, predictive analytics, automated root cause analysis, ML-driven insights), Observability Platform Engineering (observability-as-code, instrumentation standards, telemetry pipelines, data retention strategies).',
    typicalOutcomes: [
      'Reduced mean time to detect (MTTD) incidents by 60-80% through comprehensive monitoring',
      'Decreased mean time to resolve (MTTR) by 50-70% with distributed tracing and correlation',
      'Achieved 99.99% uptime SLAs through proactive monitoring and alerting',
      'Improved application performance by 40-60% through APM insights and optimization',
      'Reduced alert noise by 70-85% through intelligent correlation and ML-based filtering',
      'Enabled real-time business insights with custom dashboards and metrics',
      'Optimized infrastructure capacity reducing costs by 25-35% through forecasting',
      'Automated incident response reducing manual toil by 60-75%',
      'Achieved compliance with regulatory logging requirements across QCB, SAMA, CBUAE',
      'Improved developer productivity by 40% with observability-driven debugging',
      'Detected anomalies 3-5x faster using AIOps and machine learning',
      'Established full-stack observability across hybrid and multi-cloud environments',
    ],
    certifications: ['Datadog Certified Administrator', 'Splunk Certified Architect', 'Elastic Certified Engineer', 'New Relic Certified Performance Pro', 'Dynatrace Certified Professional', 'Prometheus Certified Associate', 'AWS Certified Solutions Architect', 'Certified Kubernetes Administrator (CKA)', 'ITIL 4 Foundation', 'Site Reliability Engineering (SRE) Certified'],
    frameworks: ['OpenTelemetry', 'Prometheus & Grafana Stack', 'ELK Stack (Elasticsearch, Logstash, Kibana)', 'LGTM Stack (Loki, Grafana, Tempo, Mimir)', 'The Three Pillars of Observability', 'Site Reliability Engineering (SRE)', 'ITIL Service Operation', 'DevOps Research and Assessment (DORA)', 'Google SRE Workbook', 'Cloud Native Computing Foundation (CNCF) Observability'],
    isFeatured: true,
    displayOrder: 26,
    services: [
      {
        name: 'Infrastructure Monitoring',
        slug: generateSlug('Infrastructure Monitoring'),
        description: 'Implement comprehensive infrastructure monitoring across servers, networks, storage, and cloud resources. We deploy monitoring solutions that provide real-time visibility into infrastructure health, capacity utilization, and performance metrics with intelligent alerting to prevent outages and optimize resource allocation.',
        icon: 'Server',
        isFeatured: true,
        isActive: true,
        displayOrder: 1,
        deliverables: [
          { id: 'im-1', serviceId: 'infrastructure-monitoring', name: 'Infrastructure Monitoring Architecture', description: 'End-to-end monitoring architecture covering all infrastructure layers', displayOrder: 1 },
          { id: 'im-2', serviceId: 'infrastructure-monitoring', name: 'Monitoring Agent Deployment', description: 'Automated agent deployment across servers, VMs, and containers', displayOrder: 2 },
          { id: 'im-3', serviceId: 'infrastructure-monitoring', name: 'Metrics Collection Framework', description: 'Standardized metrics collection with retention policies', displayOrder: 3 },
          { id: 'im-4', serviceId: 'infrastructure-monitoring', name: 'Infrastructure Dashboards', description: 'Real-time dashboards for compute, storage, and network metrics', displayOrder: 4 },
          { id: 'im-5', serviceId: 'infrastructure-monitoring', name: 'Threshold-Based Alerting', description: 'Intelligent alerting with dynamic thresholds and escalation', displayOrder: 5 },
          { id: 'im-6', serviceId: 'infrastructure-monitoring', name: 'Capacity Planning Reports', description: 'Utilization trends and capacity forecasting analysis', displayOrder: 6 },
          { id: 'im-7', serviceId: 'infrastructure-monitoring', name: 'Integration Playbook', description: 'Integration with ITSM, ticketing, and incident management systems', displayOrder: 7 },
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION', 'MANAGED'],
        durationRange: { min: '4 weeks', max: '12 weeks' },
      },
      {
        name: 'Application Performance Management (APM)',
        slug: generateSlug('Application Performance Management'),
        description: 'Deploy APM solutions that provide deep visibility into application performance, user experience, and code-level diagnostics. We instrument applications for distributed tracing, transaction profiling, and real-user monitoring to identify bottlenecks and optimize performance across modern application architectures.',
        icon: 'Gauge',
        isFeatured: true,
        isActive: true,
        displayOrder: 2,
        deliverables: [
          { id: 'apm-1', serviceId: 'application-performance-management', name: 'APM Strategy & Tool Selection', description: 'APM platform selection aligned with application architecture', displayOrder: 1 },
          { id: 'apm-2', serviceId: 'application-performance-management', name: 'Application Instrumentation', description: 'Code-level instrumentation across all application tiers', displayOrder: 2 },
          { id: 'apm-3', serviceId: 'application-performance-management', name: 'Transaction Tracing Configuration', description: 'End-to-end transaction visibility with latency breakdown', displayOrder: 3 },
          { id: 'apm-4', serviceId: 'application-performance-management', name: 'Real User Monitoring (RUM)', description: 'Browser and mobile monitoring for actual user experience', displayOrder: 4 },
          { id: 'apm-5', serviceId: 'application-performance-management', name: 'Performance Dashboards', description: 'Application health, response times, and error rate dashboards', displayOrder: 5 },
          { id: 'apm-6', serviceId: 'application-performance-management', name: 'Performance Baseline & SLOs', description: 'Performance baselines with SLI/SLO definitions', displayOrder: 6 },
          { id: 'apm-7', serviceId: 'application-performance-management', name: 'Performance Optimization Report', description: 'Bottleneck analysis with optimization recommendations', displayOrder: 7 },
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION', 'MANAGED'],
        durationRange: { min: '6 weeks', max: '16 weeks' },
      },
      {
        name: 'Log Management & Analytics',
        slug: generateSlug('Log Management & Analytics'),
        description: 'Build centralized log management platforms for aggregation, analysis, and retention of logs from all sources. We implement scalable logging solutions that enable troubleshooting, security analysis, compliance reporting, and business intelligence from structured and unstructured log data.',
        icon: 'FileText',
        isFeatured: true,
        isActive: true,
        displayOrder: 3,
        deliverables: [
          { id: 'lma-1', serviceId: 'log-management-analytics', name: 'Log Management Architecture', description: 'Centralized logging platform design with scalability considerations', displayOrder: 1 },
          { id: 'lma-2', serviceId: 'log-management-analytics', name: 'Log Collection Pipeline', description: 'Automated log collection from all infrastructure and applications', displayOrder: 2 },
          { id: 'lma-3', serviceId: 'log-management-analytics', name: 'Log Parsing & Normalization', description: 'Structured parsing with field extraction and enrichment', displayOrder: 3 },
          { id: 'lma-4', serviceId: 'log-management-analytics', name: 'Security Log Analytics', description: 'Security event correlation and threat detection rules', displayOrder: 4 },
          { id: 'lma-5', serviceId: 'log-management-analytics', name: 'Compliance Logging Framework', description: 'Regulatory logging for audit and compliance requirements', displayOrder: 5 },
          { id: 'lma-6', serviceId: 'log-management-analytics', name: 'Log Retention & Archival', description: 'Cost-optimized retention policies with cold storage integration', displayOrder: 6 },
          { id: 'lma-7', serviceId: 'log-management-analytics', name: 'Log Analytics Dashboards', description: 'Pre-built dashboards for common analysis patterns', displayOrder: 7 },
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION', 'MANAGED'],
        durationRange: { min: '6 weeks', max: '14 weeks' },
      },
      {
        name: 'Distributed Tracing',
        slug: generateSlug('Distributed Tracing'),
        description: 'Implement distributed tracing for microservices and distributed systems to track requests across service boundaries. We deploy OpenTelemetry-based tracing solutions that provide end-to-end visibility, latency analysis, and dependency mapping critical for troubleshooting modern architectures.',
        icon: 'GitBranch',
        isFeatured: true,
        isActive: true,
        displayOrder: 4,
        deliverables: [
          { id: 'dt-1', serviceId: 'distributed-tracing', name: 'Distributed Tracing Architecture', description: 'Tracing platform design using OpenTelemetry standards', displayOrder: 1 },
          { id: 'dt-2', serviceId: 'distributed-tracing', name: 'Service Instrumentation', description: 'Auto-instrumentation and manual tracing across all services', displayOrder: 2 },
          { id: 'dt-3', serviceId: 'distributed-tracing', name: 'Trace Context Propagation', description: 'Context propagation configuration across service mesh', displayOrder: 3 },
          { id: 'dt-4', serviceId: 'distributed-tracing', name: 'Service Dependency Map', description: 'Automated service topology and dependency visualization', displayOrder: 4 },
          { id: 'dt-5', serviceId: 'distributed-tracing', name: 'Latency Analysis Dashboards', description: 'Trace analytics with latency breakdown and bottleneck identification', displayOrder: 5 },
          { id: 'dt-6', serviceId: 'distributed-tracing', name: 'Sampling Strategy', description: 'Intelligent sampling configuration for cost and performance optimization', displayOrder: 6 },
          { id: 'dt-7', serviceId: 'distributed-tracing', name: 'Trace-Based Alerting', description: 'Alert rules based on trace patterns and anomalies', displayOrder: 7 },
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '6 weeks', max: '12 weeks' },
      },
      {
        name: 'Synthetic Monitoring',
        slug: generateSlug('Synthetic Monitoring'),
        description: 'Deploy synthetic monitoring to proactively test application availability and performance from global locations. We create synthetic transactions that simulate user journeys, API calls, and critical business processes to detect issues before they impact real users.',
        icon: 'PlayCircle',
        isFeatured: false,
        isActive: true,
        displayOrder: 5,
        deliverables: [
          { id: 'sm-1', serviceId: 'synthetic-monitoring', name: 'Synthetic Monitoring Strategy', description: 'Critical user journey identification and monitoring approach', displayOrder: 1 },
          { id: 'sm-2', serviceId: 'synthetic-monitoring', name: 'Synthetic Test Scripts', description: 'Automated test scripts for key user flows and API endpoints', displayOrder: 2 },
          { id: 'sm-3', serviceId: 'synthetic-monitoring', name: 'Global Monitoring Locations', description: 'Geographic probe deployment for regional performance testing', displayOrder: 3 },
          { id: 'sm-4', serviceId: 'synthetic-monitoring', name: 'Availability Monitoring', description: 'Uptime monitoring with SLA tracking and reporting', displayOrder: 4 },
          { id: 'sm-5', serviceId: 'synthetic-monitoring', name: 'Performance Benchmarking', description: 'Baseline performance metrics from synthetic transactions', displayOrder: 5 },
          { id: 'sm-6', serviceId: 'synthetic-monitoring', name: 'Synthetic Alerting Rules', description: 'Proactive alerting based on synthetic test failures', displayOrder: 6 },
        ],
        engagementTypes: ['IMPLEMENTATION', 'MANAGED'],
        durationRange: { min: '4 weeks', max: '8 weeks' },
      },
      {
        name: 'Network Performance Monitoring',
        slug: generateSlug('Network Performance Monitoring'),
        description: 'Implement network performance monitoring to track bandwidth utilization, latency, packet loss, and network flow across enterprise and cloud networks. We deploy NPM solutions that provide visibility into network health, troubleshoot connectivity issues, and optimize network performance.',
        icon: 'Network',
        isFeatured: false,
        isActive: true,
        displayOrder: 6,
        deliverables: [
          { id: 'npm-1', serviceId: 'network-performance-monitoring', name: 'Network Monitoring Architecture', description: 'NPM platform design for enterprise and cloud networks', displayOrder: 1 },
          { id: 'npm-2', serviceId: 'network-performance-monitoring', name: 'Flow Collection Setup', description: 'NetFlow/sFlow/IPFIX collection and analysis', displayOrder: 2 },
          { id: 'npm-3', serviceId: 'network-performance-monitoring', name: 'Bandwidth Monitoring', description: 'Real-time bandwidth utilization tracking and trending', displayOrder: 3 },
          { id: 'npm-4', serviceId: 'network-performance-monitoring', name: 'Latency & Packet Loss Monitoring', description: 'Network latency tracking with packet loss detection', displayOrder: 4 },
          { id: 'npm-5', serviceId: 'network-performance-monitoring', name: 'Network Topology Mapping', description: 'Automated network discovery and topology visualization', displayOrder: 5 },
          { id: 'npm-6', serviceId: 'network-performance-monitoring', name: 'Network Performance Dashboards', description: 'Real-time network health and performance dashboards', displayOrder: 6 },
          { id: 'npm-7', serviceId: 'network-performance-monitoring', name: 'Network Capacity Planning', description: 'Network utilization trends and capacity forecasting', displayOrder: 7 },
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '6 weeks', max: '12 weeks' },
      },
      {
        name: 'Cloud Monitoring',
        slug: generateSlug('Cloud Monitoring'),
        description: 'Establish comprehensive monitoring for cloud environments across AWS, Azure, and GCP with visibility into cloud services, costs, and compliance. We implement cloud-native and third-party monitoring solutions that provide unified visibility across multi-cloud and hybrid architectures.',
        icon: 'Cloud',
        isFeatured: true,
        isActive: true,
        displayOrder: 7,
        deliverables: [
          { id: 'cm-1', serviceId: 'cloud-monitoring', name: 'Multi-Cloud Monitoring Strategy', description: 'Unified monitoring approach across all cloud platforms', displayOrder: 1 },
          { id: 'cm-2', serviceId: 'cloud-monitoring', name: 'Cloud-Native Integration', description: 'CloudWatch, Azure Monitor, and GCP Operations integration', displayOrder: 2 },
          { id: 'cm-3', serviceId: 'cloud-monitoring', name: 'Cloud Service Monitoring', description: 'Monitoring for managed services (RDS, Lambda, containers, etc.)', displayOrder: 3 },
          { id: 'cm-4', serviceId: 'cloud-monitoring', name: 'Cloud Cost Monitoring', description: 'Cost tracking dashboards with anomaly detection', displayOrder: 4 },
          { id: 'cm-5', serviceId: 'cloud-monitoring', name: 'Cloud Compliance Monitoring', description: 'Continuous compliance monitoring for cloud configurations', displayOrder: 5 },
          { id: 'cm-6', serviceId: 'cloud-monitoring', name: 'Unified Cloud Dashboard', description: 'Single-pane view across all cloud environments', displayOrder: 6 },
          { id: 'cm-7', serviceId: 'cloud-monitoring', name: 'Cloud Alerting Framework', description: 'Cloud-specific alerting with integration to incident management', displayOrder: 7 },
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION', 'MANAGED'],
        durationRange: { min: '6 weeks', max: '14 weeks' },
      },
      {
        name: 'Real-Time Dashboards & Visualization',
        slug: generateSlug('Real-Time Dashboards & Visualization'),
        description: 'Design and build custom real-time dashboards that visualize operational metrics, business KPIs, and executive reporting. We create intuitive dashboards using Grafana, Kibana, or custom solutions that provide actionable insights for different stakeholder levels.',
        icon: 'LayoutDashboard',
        isFeatured: false,
        isActive: true,
        displayOrder: 8,
        deliverables: [
          { id: 'rtd-1', serviceId: 'real-time-dashboards-visualization', name: 'Dashboard Requirements', description: 'Stakeholder workshop to identify metrics and visualization needs', displayOrder: 1 },
          { id: 'rtd-2', serviceId: 'real-time-dashboards-visualization', name: 'Operational Dashboards', description: 'Real-time dashboards for NOC, SOC, and operations teams', displayOrder: 2 },
          { id: 'rtd-3', serviceId: 'real-time-dashboards-visualization', name: 'Executive Dashboards', description: 'High-level KPI dashboards for leadership and executives', displayOrder: 3 },
          { id: 'rtd-4', serviceId: 'real-time-dashboards-visualization', name: 'Business Metrics Dashboards', description: 'Custom dashboards linking technical metrics to business outcomes', displayOrder: 4 },
          { id: 'rtd-5', serviceId: 'real-time-dashboards-visualization', name: 'Dashboard-as-Code', description: 'Version-controlled dashboard definitions for consistency', displayOrder: 5 },
          { id: 'rtd-6', serviceId: 'real-time-dashboards-visualization', name: 'Dashboard Access Control', description: 'Role-based access and dashboard sharing configuration', displayOrder: 6 },
        ],
        engagementTypes: ['IMPLEMENTATION'],
        durationRange: { min: '4 weeks', max: '10 weeks' },
      },
      {
        name: 'Alerting & Incident Management',
        slug: generateSlug('Alerting & Incident Management'),
        description: 'Build intelligent alerting and incident management workflows that reduce noise, accelerate response, and improve resolution times. We implement alert correlation, escalation policies, and integration with incident management platforms to ensure the right people are notified at the right time.',
        icon: 'Bell',
        isFeatured: true,
        isActive: true,
        displayOrder: 9,
        deliverables: [
          { id: 'aim-1', serviceId: 'alerting-incident-management', name: 'Alerting Strategy', description: 'Alert philosophy, severity definitions, and notification approach', displayOrder: 1 },
          { id: 'aim-2', serviceId: 'alerting-incident-management', name: 'Alert Rules & Thresholds', description: 'Intelligent alert rules with dynamic thresholds and ML-based anomaly detection', displayOrder: 2 },
          { id: 'aim-3', serviceId: 'alerting-incident-management', name: 'Alert Correlation & Grouping', description: 'Correlation rules to reduce alert noise and group related alerts', displayOrder: 3 },
          { id: 'aim-4', serviceId: 'alerting-incident-management', name: 'Escalation Policies', description: 'On-call schedules, escalation paths, and notification channels', displayOrder: 4 },
          { id: 'aim-5', serviceId: 'alerting-incident-management', name: 'Incident Management Integration', description: 'Integration with PagerDuty, ServiceNow, or ITSM platforms', displayOrder: 5 },
          { id: 'aim-6', serviceId: 'alerting-incident-management', name: 'Incident Response Playbooks', description: 'Automated runbooks for common incident types', displayOrder: 6 },
          { id: 'aim-7', serviceId: 'alerting-incident-management', name: 'Alert Analytics & Optimization', description: 'Alert effectiveness tracking and continuous optimization', displayOrder: 7 },
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '6 weeks', max: '12 weeks' },
      },
      {
        name: 'Capacity Planning & Forecasting',
        slug: generateSlug('Capacity Planning & Forecasting'),
        description: 'Implement capacity planning and forecasting capabilities to predict resource needs, prevent capacity-related outages, and optimize infrastructure investments. We use historical trends, growth patterns, and predictive analytics to ensure infrastructure scales ahead of demand.',
        icon: 'TrendingUp',
        isFeatured: false,
        isActive: true,
        displayOrder: 10,
        deliverables: [
          { id: 'cpf-1', serviceId: 'capacity-planning-forecasting', name: 'Capacity Planning Framework', description: 'Methodology for ongoing capacity analysis and planning', displayOrder: 1 },
          { id: 'cpf-2', serviceId: 'capacity-planning-forecasting', name: 'Resource Utilization Analysis', description: 'Historical utilization trends across all infrastructure layers', displayOrder: 2 },
          { id: 'cpf-3', serviceId: 'capacity-planning-forecasting', name: 'Growth Forecasting Models', description: 'Predictive models for compute, storage, and network growth', displayOrder: 3 },
          { id: 'cpf-4', serviceId: 'capacity-planning-forecasting', name: 'Capacity Thresholds & Alerts', description: 'Proactive alerting for approaching capacity limits', displayOrder: 4 },
          { id: 'cpf-5', serviceId: 'capacity-planning-forecasting', name: 'Capacity Optimization Recommendations', description: 'Right-sizing and efficiency improvement opportunities', displayOrder: 5 },
          { id: 'cpf-6', serviceId: 'capacity-planning-forecasting', name: 'Capacity Planning Dashboard', description: 'Executive dashboard showing capacity status and forecasts', displayOrder: 6 },
          { id: 'cpf-7', serviceId: 'capacity-planning-forecasting', name: 'Quarterly Capacity Reports', description: 'Regular capacity reporting with investment recommendations', displayOrder: 7 },
        ],
        engagementTypes: ['ADVISORY', 'MANAGED'],
        durationRange: { min: '6 weeks', max: 'Ongoing' },
      },
      {
        name: 'AIOps & Intelligent Operations',
        slug: generateSlug('AIOps & Intelligent Operations'),
        description: 'Deploy AIOps platforms that use machine learning and artificial intelligence to automate operations, predict failures, and accelerate incident resolution. We implement intelligent operations capabilities including anomaly detection, predictive analytics, and automated root cause analysis.',
        icon: 'Brain',
        isFeatured: true,
        isActive: true,
        displayOrder: 11,
        deliverables: [
          { id: 'aiops-m-1', serviceId: 'aiops-intelligent-operations', name: 'AIOps Platform Strategy', description: 'Platform selection and use case prioritization for AIOps', displayOrder: 1 },
          { id: 'aiops-m-2', serviceId: 'aiops-intelligent-operations', name: 'Data Pipeline for AIOps', description: 'Unified data ingestion from all monitoring and logging sources', displayOrder: 2 },
          { id: 'aiops-m-3', serviceId: 'aiops-intelligent-operations', name: 'Anomaly Detection Models', description: 'ML-based anomaly detection for metrics, logs, and traces', displayOrder: 3 },
          { id: 'aiops-m-4', serviceId: 'aiops-intelligent-operations', name: 'Predictive Analytics', description: 'Predictive failure analysis and proactive remediation', displayOrder: 4 },
          { id: 'aiops-m-5', serviceId: 'aiops-intelligent-operations', name: 'Automated Root Cause Analysis', description: 'AI-powered correlation and root cause identification', displayOrder: 5 },
          { id: 'aiops-m-6', serviceId: 'aiops-intelligent-operations', name: 'Intelligent Alert Routing', description: 'ML-based alert prioritization and routing to correct teams', displayOrder: 6 },
          { id: 'aiops-m-7', serviceId: 'aiops-intelligent-operations', name: 'AIOps Effectiveness Metrics', description: 'Measurement framework for AIOps value and continuous improvement', displayOrder: 7 },
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION', 'MANAGED'],
        durationRange: { min: '10 weeks', max: '20 weeks' },
      },
      {
        name: 'Observability Platform Engineering',
        slug: generateSlug('Observability Platform Engineering'),
        description: 'Build enterprise observability platforms that standardize instrumentation, manage telemetry pipelines, and provide self-service observability capabilities. We establish observability-as-code practices, instrumentation standards, and platform engineering approaches that scale across large organizations.',
        icon: 'Boxes',
        isFeatured: true,
        isActive: true,
        displayOrder: 12,
        deliverables: [
          { id: 'ope-1', serviceId: 'observability-platform-engineering', name: 'Observability Platform Architecture', description: 'End-to-end platform design for metrics, logs, and traces', displayOrder: 1 },
          { id: 'ope-2', serviceId: 'observability-platform-engineering', name: 'OpenTelemetry Standards', description: 'Standardized instrumentation using OpenTelemetry', displayOrder: 2 },
          { id: 'ope-3', serviceId: 'observability-platform-engineering', name: 'Telemetry Pipeline', description: 'Scalable collection, processing, and routing of telemetry data', displayOrder: 3 },
          { id: 'ope-4', serviceId: 'observability-platform-engineering', name: 'Observability-as-Code', description: 'Version-controlled observability configurations and dashboards', displayOrder: 4 },
          { id: 'ope-5', serviceId: 'observability-platform-engineering', name: 'Self-Service Observability Portal', description: 'Developer portal for self-service instrumentation and dashboards', displayOrder: 5 },
          { id: 'ope-6', serviceId: 'observability-platform-engineering', name: 'Data Retention Strategy', description: 'Cost-optimized retention with hot/warm/cold storage tiers', displayOrder: 6 },
          { id: 'ope-7', serviceId: 'observability-platform-engineering', name: 'Platform Operations Runbooks', description: 'Operational procedures for observability platform management', displayOrder: 7 },
        ],
        engagementTypes: ['ADVISORY', 'IMPLEMENTATION'],
        durationRange: { min: '10 weeks', max: '20 weeks' },
      },
    ],
  },
  // TOWER 27: MANAGED DETECTION & RESPONSE
  {
    code: 'MDR',
    name: 'Managed Detection & Response',
    shortName: 'MDR',
    slug: 'managed-detection',
    icon: 'ShieldAlert',
    accentColor: '#DC2626',
    description: 'Comprehensive managed security services delivering 24/7 threat detection, monitoring, and incident response capabilities for GCC enterprises. Our SOC-as-a-Service combines advanced security technologies, threat intelligence, and expert analysts to protect your critical assets from evolving cyber threats. We provide end-to-end managed security operations that enable organizations to maintain robust cybersecurity postures without the overhead of building in-house security operations centers.',
    scope: 'Full-spectrum managed security services including 24/7 security operations center (SOC) monitoring, managed SIEM deployment and analytics, endpoint detection and response (EDR), threat intelligence integration, continuous vulnerability management, incident response services, digital forensics and investigation, managed email security, DDoS protection, managed firewall and network security, security awareness training programs, and compliance monitoring aligned with GCC regulatory requirements including NESA, NCA, SAMA, and GDPR frameworks.',
    typicalOutcomes: [
      '24/7 continuous monitoring and threat detection across all attack vectors',
      'Mean time to detect (MTTD) reduced by 80-90% through automated threat detection',
      'Mean time to respond (MTTR) reduced by 70-85% with orchestrated incident response',
      '99.9% uptime for security monitoring and protection services',
      'Detection and remediation of 95%+ security incidents before business impact',
      'Complete visibility into security posture with real-time dashboards and analytics',
      'Compliance alignment with GCC regulations and international security standards',
      'Reduction of security operations costs by 40-60% compared to in-house SOC',
      'Access to Tier 2 and Tier 3 security analysts and incident responders',
      'Integration of threat intelligence with security controls for proactive defense',
      'Comprehensive forensic investigation capabilities for security incidents',
      'Quarterly executive reporting with security metrics, trends, and recommendations',
    ],
    certifications: ['ISO/IEC 27001 - Information Security Management', 'SOC 2 Type II - Security Operations Compliance', 'CISSP - Certified Information Systems Security Professional', 'GCIH - GIAC Certified Incident Handler', 'GCFA - GIAC Certified Forensic Analyst', 'CEH - Certified Ethical Hacker', 'GCIA - GIAC Certified Intrusion Analyst', 'OSCP - Offensive Security Certified Professional', 'CISM - Certified Information Security Manager', 'GMON - GIAC Continuous Monitoring Certification'],
    frameworks: ['NIST Cybersecurity Framework (CSF)', 'MITRE ATT&CK Framework', 'NESA Cybersecurity Controls (UAE)', 'NCA Essential Cybersecurity Controls (KSA)', 'SAMA Cybersecurity Framework (Saudi Arabia)', 'ISO/IEC 27035 - Incident Management', 'SANS Incident Response Process', 'NIST SP 800-61 - Incident Handling', 'CIS Critical Security Controls', 'GDPR Security Requirements'],
    isFeatured: true,
    displayOrder: 27,
    services: [
      {
        name: '24/7 Managed SOC',
        slug: generateSlug('24/7 Managed SOC'),
        description: 'Round-the-clock security operations center providing continuous monitoring, threat detection, and incident response with dedicated security analysts and advanced security orchestration.',
        icon: 'Eye',
        isFeatured: true,
        isActive: true,
        displayOrder: 1,
        deliverables: [
          { id: 'mdr-soc-001', serviceId: 'mdr-soc', name: '24/7 Security Monitoring', description: 'Continuous monitoring of security events, alerts, and threats across all infrastructure and applications with escalation protocols', displayOrder: 1 },
          { id: 'mdr-soc-002', serviceId: 'mdr-soc', name: 'Threat Detection & Analysis', description: 'Advanced threat detection using behavioral analytics, correlation rules, and machine learning to identify security incidents', displayOrder: 2 },
          { id: 'mdr-soc-003', serviceId: 'mdr-soc', name: 'Incident Triage & Response', description: 'Rapid incident classification, prioritization, and coordinated response actions to contain and remediate threats', displayOrder: 3 },
          { id: 'mdr-soc-004', serviceId: 'mdr-soc', name: 'Security Event Correlation', description: 'Advanced correlation of security events across multiple sources to detect complex attack patterns and campaigns', displayOrder: 4 },
          { id: 'mdr-soc-005', serviceId: 'mdr-soc', name: 'SOC Playbooks & Runbooks', description: 'Standardized incident response procedures and automated workflows for consistent and efficient threat handling', displayOrder: 5 },
          { id: 'mdr-soc-006', serviceId: 'mdr-soc', name: 'Monthly Security Reports', description: 'Executive and technical security reports with metrics, trends, incidents, and strategic recommendations', displayOrder: 6 },
          { id: 'mdr-soc-007', serviceId: 'mdr-soc', name: 'Continuous Service Improvement', description: 'Regular optimization of detection rules, response procedures, and security controls based on emerging threats', displayOrder: 7 },
        ],
        engagementTypes: ['MANAGED'],
        durationRange: { min: '12 months', max: 'Ongoing' },
      },
      {
        name: 'Managed SIEM & Log Analytics',
        slug: generateSlug('Managed SIEM & Log Analytics'),
        description: 'Enterprise-grade Security Information and Event Management (SIEM) platform with centralized log collection, correlation, analysis, and long-term retention for compliance and forensics.',
        icon: 'Database',
        isFeatured: true,
        isActive: true,
        displayOrder: 2,
        deliverables: [
          { id: 'mdr-siem-001', serviceId: 'mdr-siem', name: 'SIEM Platform Deployment', description: 'Implementation and configuration of enterprise SIEM solution with high-availability architecture and scalable infrastructure', displayOrder: 1 },
          { id: 'mdr-siem-002', serviceId: 'mdr-siem', name: 'Log Source Integration', description: 'Integration of all critical log sources including firewalls, servers, applications, cloud services, and security tools', displayOrder: 2 },
          { id: 'mdr-siem-003', serviceId: 'mdr-siem', name: 'Custom Correlation Rules', description: 'Development and tuning of correlation rules tailored to your environment, industry threats, and compliance requirements', displayOrder: 3 },
          { id: 'mdr-siem-004', serviceId: 'mdr-siem', name: 'Real-time Dashboards', description: 'Interactive security dashboards providing real-time visibility into security posture, threats, and operational metrics', displayOrder: 4 },
          { id: 'mdr-siem-005', serviceId: 'mdr-siem', name: 'Log Retention & Archival', description: 'Secure long-term log retention meeting compliance requirements with efficient search and retrieval capabilities', displayOrder: 5 },
          { id: 'mdr-siem-006', serviceId: 'mdr-siem', name: 'Advanced Analytics & Reporting', description: 'Behavioral analytics, trend analysis, and custom reporting for security investigations and compliance audits', displayOrder: 6 },
          { id: 'mdr-siem-007', serviceId: 'mdr-siem', name: 'SIEM Platform Optimization', description: 'Ongoing performance tuning, rule optimization, and capacity management to ensure optimal SIEM operations', displayOrder: 7 },
        ],
        engagementTypes: ['IMPLEMENTATION', 'MANAGED'],
        durationRange: { min: '3 months', max: 'Ongoing' },
      },
      {
        name: 'Endpoint Detection & Response (EDR)',
        slug: generateSlug('Endpoint Detection & Response EDR'),
        description: 'Advanced endpoint security with continuous monitoring, behavioral analysis, and automated response capabilities to detect and remediate threats on workstations, servers, and mobile devices.',
        icon: 'Activity',
        isFeatured: true,
        isActive: true,
        displayOrder: 3,
        deliverables: [
          { id: 'mdr-edr-001', serviceId: 'mdr-edr', name: 'EDR Solution Deployment', description: 'Enterprise-wide deployment of endpoint detection and response agents across all workstations, servers, and mobile endpoints', displayOrder: 1 },
          { id: 'mdr-edr-002', serviceId: 'mdr-edr', name: 'Behavioral Threat Detection', description: 'Advanced behavioral analysis and machine learning to detect malware, ransomware, and advanced persistent threats (APTs)', displayOrder: 2 },
          { id: 'mdr-edr-003', serviceId: 'mdr-edr', name: 'Automated Threat Containment', description: 'Automated isolation and quarantine of compromised endpoints to prevent lateral movement and contain incidents', displayOrder: 3 },
          { id: 'mdr-edr-004', serviceId: 'mdr-edr', name: 'Endpoint Forensics', description: 'Detailed forensic data collection and analysis from endpoints for incident investigation and root cause analysis', displayOrder: 4 },
          { id: 'mdr-edr-005', serviceId: 'mdr-edr', name: 'Threat Hunting', description: 'Proactive threat hunting across endpoints to identify hidden threats, suspicious activities, and indicators of compromise', displayOrder: 5 },
          { id: 'mdr-edr-006', serviceId: 'mdr-edr', name: 'Remediation & Recovery', description: 'Guided remediation procedures and system recovery support to restore affected endpoints to secure operational state', displayOrder: 6 },
        ],
        engagementTypes: ['IMPLEMENTATION', 'MANAGED'],
        durationRange: { min: '2 months', max: 'Ongoing' },
      },
      {
        name: 'Managed Threat Intelligence',
        slug: generateSlug('Managed Threat Intelligence'),
        description: 'Curated threat intelligence integration providing actionable insights on emerging threats, adversary tactics, and industry-specific risks with automated IOC feeds and strategic intelligence briefings.',
        icon: 'Search',
        isFeatured: false,
        isActive: true,
        displayOrder: 4,
        deliverables: [
          { id: 'mdr-ti-001', serviceId: 'mdr-ti', name: 'Threat Intelligence Platform', description: 'Deployment and management of threat intelligence platform aggregating feeds from commercial, open-source, and proprietary sources', displayOrder: 1 },
          { id: 'mdr-ti-002', serviceId: 'mdr-ti', name: 'IOC Integration', description: 'Automated integration of indicators of compromise (IOCs) into security controls including SIEM, EDR, firewalls, and proxies', displayOrder: 2 },
          { id: 'mdr-ti-003', serviceId: 'mdr-ti', name: 'Industry-Specific Intelligence', description: 'Tailored threat intelligence focused on threats targeting your industry, geographic region, and technology stack', displayOrder: 3 },
          { id: 'mdr-ti-004', serviceId: 'mdr-ti', name: 'Adversary Tracking', description: 'Monitoring and tracking of advanced persistent threat (APT) groups and their tactics, techniques, and procedures (TTPs)', displayOrder: 4 },
          { id: 'mdr-ti-005', serviceId: 'mdr-ti', name: 'Strategic Intelligence Briefings', description: 'Monthly strategic intelligence briefings on emerging threats, geopolitical risks, and recommended security posture adjustments', displayOrder: 5 },
          { id: 'mdr-ti-006', serviceId: 'mdr-ti', name: 'Threat Intelligence Reports', description: 'Detailed threat intelligence reports on specific threats, campaigns, and vulnerabilities relevant to your organization', displayOrder: 6 },
        ],
        engagementTypes: ['MANAGED'],
        durationRange: { min: '12 months', max: 'Ongoing' },
      },
      {
        name: 'Managed Vulnerability Scanning',
        slug: generateSlug('Managed Vulnerability Scanning'),
        description: 'Continuous vulnerability assessment and management with automated scanning, prioritization, remediation tracking, and compliance reporting across infrastructure, applications, and cloud environments.',
        icon: 'AlertTriangle',
        isFeatured: false,
        isActive: true,
        displayOrder: 5,
        deliverables: [
          { id: 'mdr-vuln-001', serviceId: 'mdr-vuln', name: 'Continuous Vulnerability Scanning', description: 'Automated vulnerability scanning across networks, systems, applications, and cloud infrastructure on weekly or monthly schedules', displayOrder: 1 },
          { id: 'mdr-vuln-002', serviceId: 'mdr-vuln', name: 'Risk-Based Prioritization', description: 'Prioritization of vulnerabilities based on exploitability, business impact, and threat intelligence to focus remediation efforts', displayOrder: 2 },
          { id: 'mdr-vuln-003', serviceId: 'mdr-vuln', name: 'Remediation Tracking', description: 'Vulnerability remediation workflow management with tracking, verification, and accountability for security teams', displayOrder: 3 },
          { id: 'mdr-vuln-004', serviceId: 'mdr-vuln', name: 'Compliance Vulnerability Reporting', description: 'Vulnerability reports aligned with compliance requirements including PCI DSS, ISO 27001, NESA, and NCA frameworks', displayOrder: 4 },
          { id: 'mdr-vuln-005', serviceId: 'mdr-vuln', name: 'Web Application Scanning', description: 'Specialized scanning for web applications to identify OWASP Top 10 vulnerabilities and application security risks', displayOrder: 5 },
          { id: 'mdr-vuln-006', serviceId: 'mdr-vuln', name: 'Cloud Security Scanning', description: 'Vulnerability and configuration scanning for cloud environments including AWS, Azure, and Google Cloud Platform', displayOrder: 6 },
          { id: 'mdr-vuln-007', serviceId: 'mdr-vuln', name: 'Vulnerability Metrics & Trends', description: 'Executive dashboards and reports showing vulnerability trends, remediation rates, and security posture improvements', displayOrder: 7 },
        ],
        engagementTypes: ['MANAGED'],
        durationRange: { min: '12 months', max: 'Ongoing' },
      },
      {
        name: 'Incident Response Retainer',
        slug: generateSlug('Incident Response Retainer'),
        description: 'Dedicated incident response capability with guaranteed response times, priority access to expert incident responders, and coordinated breach response for cyber security incidents.',
        icon: 'Shield',
        isFeatured: true,
        isActive: true,
        displayOrder: 6,
        deliverables: [
          { id: 'mdr-ir-001', serviceId: 'mdr-ir', name: 'Incident Response Plan', description: 'Customized incident response plan with procedures, roles, communication protocols, and escalation paths', displayOrder: 1 },
          { id: 'mdr-ir-002', serviceId: 'mdr-ir', name: '24/7 Emergency Response', description: 'Guaranteed 1-hour response time for critical security incidents with priority escalation to senior incident responders', displayOrder: 2 },
          { id: 'mdr-ir-003', serviceId: 'mdr-ir', name: 'Incident Coordination', description: 'Coordination of incident response activities across internal teams, vendors, law enforcement, and regulatory bodies', displayOrder: 3 },
          { id: 'mdr-ir-004', serviceId: 'mdr-ir', name: 'Breach Containment', description: 'Rapid containment actions to isolate affected systems, prevent data exfiltration, and minimize business impact', displayOrder: 4 },
          { id: 'mdr-ir-005', serviceId: 'mdr-ir', name: 'Root Cause Analysis', description: 'Comprehensive investigation to determine attack vectors, timeline, scope of compromise, and root causes', displayOrder: 5 },
          { id: 'mdr-ir-006', serviceId: 'mdr-ir', name: 'Post-Incident Report', description: 'Detailed incident report with timeline, actions taken, lessons learned, and security improvement recommendations', displayOrder: 6 },
          { id: 'mdr-ir-007', serviceId: 'mdr-ir', name: 'Tabletop Exercises', description: 'Quarterly incident response tabletop exercises to test and improve incident response procedures and readiness', displayOrder: 7 },
        ],
        engagementTypes: ['MANAGED'],
        durationRange: { min: '12 months', max: 'Ongoing' },
      },
      {
        name: 'Digital Forensics',
        slug: generateSlug('Digital Forensics'),
        description: 'Expert digital forensics and investigation services for security incidents, data breaches, and cyber crimes with evidence collection, analysis, and court-admissible reporting.',
        icon: 'Search',
        isFeatured: false,
        isActive: true,
        displayOrder: 7,
        deliverables: [
          { id: 'mdr-forensics-001', serviceId: 'mdr-forensics', name: 'Forensic Evidence Collection', description: 'Forensically sound collection and preservation of digital evidence from systems, networks, and storage devices', displayOrder: 1 },
          { id: 'mdr-forensics-002', serviceId: 'mdr-forensics', name: 'Disk & Memory Forensics', description: 'Analysis of disk images, memory dumps, and file systems to recover deleted data and identify attack artifacts', displayOrder: 2 },
          { id: 'mdr-forensics-003', serviceId: 'mdr-forensics', name: 'Network Forensics', description: 'Analysis of network traffic captures, logs, and packet data to reconstruct attack timelines and data flows', displayOrder: 3 },
          { id: 'mdr-forensics-004', serviceId: 'mdr-forensics', name: 'Malware Analysis', description: 'Reverse engineering and analysis of malware samples to understand functionality, capabilities, and indicators', displayOrder: 4 },
          { id: 'mdr-forensics-005', serviceId: 'mdr-forensics', name: 'Timeline Reconstruction', description: 'Detailed timeline reconstruction of security incidents showing attacker actions, system changes, and data access', displayOrder: 5 },
          { id: 'mdr-forensics-006', serviceId: 'mdr-forensics', name: 'Forensic Investigation Report', description: 'Court-admissible forensic investigation report with findings, evidence, methodology, and expert opinions', displayOrder: 6 },
        ],
        engagementTypes: ['ADVISORY'],
        durationRange: { min: '2 weeks', max: '3 months' },
      },
      {
        name: 'Managed Email Security',
        slug: generateSlug('Managed Email Security'),
        description: 'Advanced email security services protecting against phishing, business email compromise, malware, and spam with AI-powered threat detection and automated response.',
        icon: 'Shield',
        isFeatured: false,
        isActive: true,
        displayOrder: 8,
        deliverables: [
          { id: 'mdr-email-001', serviceId: 'mdr-email', name: 'Email Security Gateway', description: 'Deployment and management of advanced email security gateway with anti-phishing, anti-malware, and anti-spam protection', displayOrder: 1 },
          { id: 'mdr-email-002', serviceId: 'mdr-email', name: 'Business Email Compromise (BEC) Protection', description: 'AI-powered detection of business email compromise, CEO fraud, and impersonation attacks with real-time blocking', displayOrder: 2 },
          { id: 'mdr-email-003', serviceId: 'mdr-email', name: 'Email Threat Analysis', description: 'Analysis of suspicious emails, malicious attachments, and phishing campaigns with threat intelligence integration', displayOrder: 3 },
          { id: 'mdr-email-004', serviceId: 'mdr-email', name: 'URL & Attachment Sandboxing', description: 'Dynamic analysis of URLs and attachments in isolated sandbox environment to detect zero-day threats', displayOrder: 4 },
          { id: 'mdr-email-005', serviceId: 'mdr-email', name: 'Email Authentication', description: 'Implementation and monitoring of SPF, DKIM, and DMARC to prevent email spoofing and domain impersonation', displayOrder: 5 },
          { id: 'mdr-email-006', serviceId: 'mdr-email', name: 'Incident Response for Email Threats', description: 'Rapid response to email-based threats including account compromise, data exfiltration, and malware infections', displayOrder: 6 },
        ],
        engagementTypes: ['IMPLEMENTATION', 'MANAGED'],
        durationRange: { min: '1 month', max: 'Ongoing' },
      },
      {
        name: 'DDoS Protection & Mitigation',
        slug: generateSlug('DDoS Protection & Mitigation'),
        description: 'Comprehensive DDoS protection with traffic scrubbing, intelligent threat detection, and automated mitigation to ensure availability of critical services during volumetric and application-layer attacks.',
        icon: 'Globe',
        isFeatured: false,
        isActive: true,
        displayOrder: 9,
        deliverables: [
          { id: 'mdr-ddos-001', serviceId: 'mdr-ddos', name: 'DDoS Protection Service', description: 'Cloud-based DDoS protection service with multi-terabit mitigation capacity and global scrubbing centers', displayOrder: 1 },
          { id: 'mdr-ddos-002', serviceId: 'mdr-ddos', name: 'Always-On Traffic Analysis', description: 'Continuous monitoring of network traffic with behavioral analysis to detect DDoS attacks in real-time', displayOrder: 2 },
          { id: 'mdr-ddos-003', serviceId: 'mdr-ddos', name: 'Automated Attack Mitigation', description: 'Automated mitigation of volumetric, protocol, and application-layer DDoS attacks with intelligent traffic filtering', displayOrder: 3 },
          { id: 'mdr-ddos-004', serviceId: 'mdr-ddos', name: 'Layer 7 Application Protection', description: 'Advanced protection against application-layer DDoS attacks targeting web applications and APIs', displayOrder: 4 },
          { id: 'mdr-ddos-005', serviceId: 'mdr-ddos', name: 'DDoS Attack Reporting', description: 'Detailed reporting on DDoS attacks including attack vectors, volume, duration, and mitigation effectiveness', displayOrder: 5 },
          { id: 'mdr-ddos-006', serviceId: 'mdr-ddos', name: 'DDoS Response Runbooks', description: 'Incident response procedures and escalation protocols for DDoS attacks with stakeholder communication plans', displayOrder: 6 },
        ],
        engagementTypes: ['IMPLEMENTATION', 'MANAGED'],
        durationRange: { min: '12 months', max: 'Ongoing' },
      },
      {
        name: 'Managed Firewall & Network Security',
        slug: generateSlug('Managed Firewall & Network Security'),
        description: 'Enterprise firewall and network security management with configuration, monitoring, policy optimization, and intrusion prevention across on-premises and cloud environments.',
        icon: 'Network',
        isFeatured: false,
        isActive: true,
        displayOrder: 10,
        deliverables: [
          { id: 'mdr-firewall-001', serviceId: 'mdr-firewall', name: 'Next-Gen Firewall Management', description: 'Management of next-generation firewalls with application control, IPS, SSL inspection, and threat prevention', displayOrder: 1 },
          { id: 'mdr-firewall-002', serviceId: 'mdr-firewall', name: 'Security Policy Optimization', description: 'Regular review and optimization of firewall rules, policies, and configurations to maintain security and performance', displayOrder: 2 },
          { id: 'mdr-firewall-003', serviceId: 'mdr-firewall', name: 'Intrusion Prevention System (IPS)', description: 'Management of IPS signatures and policies to detect and block network-based attacks and exploits', displayOrder: 3 },
          { id: 'mdr-firewall-004', serviceId: 'mdr-firewall', name: 'VPN Management', description: 'Configuration and management of site-to-site and remote access VPNs with secure authentication and encryption', displayOrder: 4 },
          { id: 'mdr-firewall-005', serviceId: 'mdr-firewall', name: 'Network Segmentation', description: 'Implementation of network segmentation and micro-segmentation to limit lateral movement and contain breaches', displayOrder: 5 },
          { id: 'mdr-firewall-006', serviceId: 'mdr-firewall', name: 'Firewall Log Analysis', description: 'Centralized collection and analysis of firewall logs for security monitoring, troubleshooting, and compliance', displayOrder: 6 },
          { id: 'mdr-firewall-007', serviceId: 'mdr-firewall', name: 'Change Management', description: 'Structured change management process for firewall modifications with testing, approval, and rollback procedures', displayOrder: 7 },
        ],
        engagementTypes: ['IMPLEMENTATION', 'MANAGED'],
        durationRange: { min: '12 months', max: 'Ongoing' },
      },
      {
        name: 'Security Awareness as a Service',
        slug: generateSlug('Security Awareness as a Service'),
        description: 'Comprehensive security awareness training program with phishing simulations, interactive training modules, and continuous education to build a human firewall against cyber threats.',
        icon: 'GraduationCap',
        isFeatured: false,
        isActive: true,
        displayOrder: 11,
        deliverables: [
          { id: 'mdr-awareness-001', serviceId: 'mdr-awareness', name: 'Security Awareness Training Platform', description: 'Deployment of interactive training platform with role-based security awareness courses and compliance training', displayOrder: 1 },
          { id: 'mdr-awareness-002', serviceId: 'mdr-awareness', name: 'Phishing Simulation Campaigns', description: 'Monthly simulated phishing campaigns to test user awareness and identify high-risk users requiring additional training', displayOrder: 2 },
          { id: 'mdr-awareness-003', serviceId: 'mdr-awareness', name: 'Interactive Training Modules', description: 'Engaging training content covering phishing, social engineering, data protection, password security, and incident reporting', displayOrder: 3 },
          { id: 'mdr-awareness-004', serviceId: 'mdr-awareness', name: 'Targeted Risk User Training', description: 'Additional training and coaching for users who fail phishing simulations or exhibit risky security behaviors', displayOrder: 4 },
          { id: 'mdr-awareness-005', serviceId: 'mdr-awareness', name: 'Security Culture Metrics', description: 'Metrics and reporting on security awareness program effectiveness including completion rates and risk reduction', displayOrder: 5 },
          { id: 'mdr-awareness-006', serviceId: 'mdr-awareness', name: 'Compliance Training Tracking', description: 'Tracking and reporting of mandatory security training completion for compliance with regulatory requirements', displayOrder: 6 },
        ],
        engagementTypes: ['MANAGED'],
        durationRange: { min: '12 months', max: 'Ongoing' },
      },
      {
        name: 'Compliance Monitoring & Reporting',
        slug: generateSlug('Compliance Monitoring & Reporting'),
        description: 'Continuous compliance monitoring and reporting services for GCC regulatory frameworks including NESA, NCA, SAMA with automated control validation and audit-ready documentation.',
        icon: 'FileText',
        isFeatured: false,
        isActive: true,
        displayOrder: 12,
        deliverables: [
          { id: 'mdr-compliance-001', serviceId: 'mdr-compliance', name: 'Compliance Monitoring Platform', description: 'Deployment of compliance monitoring platform with automated control validation and evidence collection', displayOrder: 1 },
          { id: 'mdr-compliance-002', serviceId: 'mdr-compliance', name: 'GCC Framework Alignment', description: 'Mapping of security controls to NESA, NCA, SAMA, and other GCC regulatory frameworks with gap analysis', displayOrder: 2 },
          { id: 'mdr-compliance-003', serviceId: 'mdr-compliance', name: 'Automated Control Testing', description: 'Continuous automated testing of security controls with evidence collection for compliance validation', displayOrder: 3 },
          { id: 'mdr-compliance-004', serviceId: 'mdr-compliance', name: 'Compliance Dashboards', description: 'Real-time compliance dashboards showing control effectiveness, gaps, and remediation status for each framework', displayOrder: 4 },
          { id: 'mdr-compliance-005', serviceId: 'mdr-compliance', name: 'Audit-Ready Reporting', description: 'Comprehensive compliance reports with evidence packages ready for regulatory audits and assessments', displayOrder: 5 },
          { id: 'mdr-compliance-006', serviceId: 'mdr-compliance', name: 'Regulatory Change Management', description: 'Monitoring of regulatory updates and guidance with impact assessment and control update recommendations', displayOrder: 6 },
          { id: 'mdr-compliance-007', serviceId: 'mdr-compliance', name: 'Executive Compliance Briefings', description: 'Quarterly executive briefings on compliance posture, regulatory risks, and strategic compliance roadmap', displayOrder: 7 },
        ],
        engagementTypes: ['MANAGED'],
        durationRange: { min: '12 months', max: 'Ongoing' },
      },
    ],
  },
];

/**
 * Engagement Model data - 4 engagement models
 */
export const engagementModels: EngagementModel[] = [
  {
    code: 'ADVISORY',
    name: 'Advisory Sprints',
    slug: generateSlug('Advisory Sprints'),
    icon: 'Zap',
    accentColor: '#1E4DB7',
    description: 'Rapid strategic assessments and decision-ready recommendations.',
    durationRange: '2-6 weeks',
    typicalOutputs: ['Decision-ready report', 'Strategic roadmap', 'Business case'],
    displayOrder: 1,
  },
  {
    code: 'IMPLEMENTATION',
    name: 'Implementation Programs',
    slug: generateSlug('Implementation Programs'),
    icon: 'Rocket',
    accentColor: '#F59A23',
    description: 'Build and rollout capabilities with governance and adoption.',
    durationRange: '6 weeks - 12 months',
    typicalOutputs: ['Working capabilities', 'Governance framework', 'Adoption & KPI tracking'],
    displayOrder: 2,
  },
  {
    code: 'MANAGED',
    name: 'Managed Services',
    slug: generateSlug('Managed Services'),
    icon: 'Headset',
    accentColor: '#10B981',
    description: 'Ongoing operations with SLA-driven stability and optimization.',
    durationRange: 'Ongoing',
    typicalOutputs: ['SLA-driven stability', 'Operational reporting', 'Continuous optimization'],
    displayOrder: 3,
  },
  {
    code: 'ACADEMY',
    name: 'Training & Capability Academies',
    slug: generateSlug('Training & Capability Academies'),
    icon: 'GraduationCap',
    accentColor: '#8B5CF6',
    description: 'Role-based academies with certifications and assessments.',
    durationRange: '1 day - 12 weeks',
    typicalOutputs: ['Trained workforce', 'Assessments', 'Certification outcomes'],
    displayOrder: 4,
  },
];

/**
 * Industry Practice data - 5 industry practices
 */
export const industryPractices: IndustryPractice[] = [
  {
    code: 'FSI',
    name: 'Financial Services',
    slug: generateSlug('Financial Services'),
    icon: 'Building2',
    accentColor: '#1E4DB7',
    description: 'Specialized offerings for banks, MFBs, fintechs, and regulators.',
    subSectors: ['Banks', 'Microfinance Banks', 'Fintechs', 'Regulators', 'Insurance'],
    keyOfferings: [
      'Core banking integration & modernization',
      'Open banking/API enablement',
      'Payment switching architecture',
      'Fraud & risk controls',
      'IAM/PAM rollout',
      'Digital channels modernization',
      'Data/AI for customer 360',
    ],
    relatedTowerCodes: ['CYBER', 'AI-DATA', 'CLOUD', 'GRC', 'ENGINEERING'],
    displayOrder: 1,
  },
  {
    code: 'PUBLIC',
    name: 'Public Sector & Regulators',
    slug: generateSlug('Public Sector & Regulators'),
    icon: 'Landmark',
    accentColor: '#0369A1',
    description: 'Government digitization and regulatory modernization.',
    subSectors: ['Federal Government', 'State Government', 'Regulators', 'Parastatals'],
    keyOfferings: [
      'Digital supervision enablement',
      'Resilience programs',
      'National identity frameworks',
      'Enterprise IT modernization',
      'Governance and compliance uplift',
    ],
    relatedTowerCodes: ['PUBLIC', 'CYBER', 'GRC', 'TRANSFORM'],
    displayOrder: 2,
  },
  {
    code: 'HEALTH',
    name: 'Healthcare & Life Sciences',
    slug: generateSlug('Healthcare & Life Sciences'),
    icon: 'Heart',
    accentColor: '#EC4899',
    description: 'Healthcare system modernization and clinical enablement.',
    subSectors: ['Hospitals', 'Clinics', 'Pharmaceuticals', 'Health Regulators'],
    keyOfferings: [
      'Hospital/clinic systems modernization',
      'Identity and access management',
      'Privacy and compliance controls',
      'Digitized clinical workflows',
      'Data analytics and operational dashboards',
    ],
    relatedTowerCodes: ['CYBER', 'AI-DATA', 'GRC', 'DIGITAL'],
    displayOrder: 3,
  },
  {
    code: 'TELCO',
    name: 'Telecommunications & Enterprises',
    slug: generateSlug('Telecommunications & Enterprises'),
    icon: 'Wifi',
    accentColor: '#6366F1',
    description: 'Telco transformation and large enterprise enablement.',
    subSectors: ['Mobile Operators', 'ISPs', 'Large Enterprises'],
    keyOfferings: [
      'Customer experience transformation',
      'Automation and process optimization',
      'Cloud migration',
      'Cybersecurity uplift',
      'Data platforms and analytics',
    ],
    relatedTowerCodes: ['CX-GROWTH', 'DIGITAL', 'CLOUD', 'CYBER', 'AI-DATA'],
    displayOrder: 4,
  },
  {
    code: 'ENERGY',
    name: 'Energy & Critical Infrastructure',
    slug: generateSlug('Energy & Critical Infrastructure'),
    icon: 'Zap',
    accentColor: '#F97316',
    description: 'Critical infrastructure protection and modernization.',
    subSectors: ['Oil & Gas', 'Power Generation', 'Utilities', 'Critical National Infrastructure'],
    keyOfferings: [
      'OT/IT security convergence',
      'SCADA security assessments',
      'Business continuity',
      'Regulatory compliance',
      'Digital twin enablement',
    ],
    relatedTowerCodes: ['CYBER', 'GRC', 'OPS-EXCEL', 'AI-DATA'],
    displayOrder: 5,
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get a service tower by its slug
 */
export function getTowerBySlug(slug: string): ServiceTower | undefined {
  return serviceTowers.find((tower) => tower.slug === slug);
}

/**
 * Get a service tower by its code
 */
export function getTowerByCode(code: string): ServiceTower | undefined {
  return serviceTowers.find((tower) => tower.code === code);
}

/**
 * Get a service by its slug (searches across all towers)
 */
export function getServiceBySlug(slug: string): CatalogService | undefined {
  for (const tower of serviceTowers) {
    const service = tower.services.find((s) => s.slug === slug);
    if (service) {
      return service;
    }
  }
  return undefined;
}

/**
 * Get an engagement model by its code
 */
export function getEngagementModelByCode(code: string): EngagementModel | undefined {
  return engagementModels.find((model) => model.code === code);
}

/**
 * Get an industry practice by its code
 */
export function getIndustryPracticeByCode(code: string): IndustryPractice | undefined {
  return industryPractices.find((practice) => practice.code === code);
}

// ============================================================================
// Additional Helper Functions
// ============================================================================

/**
 * Get all featured service towers
 */
export function getFeaturedTowers(): ServiceTower[] {
  return serviceTowers.filter((tower) => tower.isFeatured);
}

/**
 * Get service towers sorted by display order
 */
export function getTowersSorted(): ServiceTower[] {
  return [...serviceTowers].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
}

/**
 * Get related towers for an industry practice
 */
export function getRelatedTowersForPractice(practiceCode: string): ServiceTower[] {
  const practice = getIndustryPracticeByCode(practiceCode);
  if (!practice) return [];

  return (practice.relatedTowerCodes ?? [])
    .map((code) => getTowerByCode(code))
    .filter((tower): tower is ServiceTower => tower !== undefined);
}

/**
 * Get all services across all towers (flattened)
 */
export function getAllServices(): CatalogService[] {
  return serviceTowers.flatMap((tower) => tower.services);
}

/**
 * Get the tower that contains a specific service
 */
export function getTowerForService(serviceSlug: string): ServiceTower | undefined {
  return serviceTowers.find((tower) =>
    tower.services.some((service) => service.slug === serviceSlug)
  );
}

/**
 * Get engagement model by slug
 */
export function getEngagementModelBySlug(slug: string): EngagementModel | undefined {
  return engagementModels.find((model) => model.slug === slug);
}

/**
 * Get industry practice by slug
 */
export function getIndustryPracticeBySlug(slug: string): IndustryPractice | undefined {
  return industryPractices.find((practice) => practice.slug === slug);
}

/**
 * Alias for getTowerBySlug for compatibility
 */
export const getServiceTowerBySlug = getTowerBySlug;

/**
 * Get related towers (excluding the current one)
 */
export function getRelatedTowers(currentSlug: string, count: number = 3): ServiceTower[] {
  return serviceTowers
    .filter((tower) => tower.slug !== currentSlug)
    .slice(0, count);
}
