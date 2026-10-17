/**
 * ARCHITECTURE TAXONOMY - ENTITY DEFINITIONS
 * Comprehensive TypeScript definitions for all architecture concepts
 * Organized by Domain, Layer, Category, Type
 */

// ============================================================================
// 1. DOMAIN ENTITIES
// ============================================================================

export enum ArchitectureDomain {
  ENTERPRISE = "enterprise",
  SOFTWARE = "software",
  INFORMATION = "information",
  TECHNOLOGY = "technology",
  BUSINESS = "business",
  SOLUTION = "solution",
  SECURITY = "security",
  PRODUCT = "product"
}

export interface Domain {
  id: string;
  name: string;
  domain: ArchitectureDomain;
  description: string;
  subDomains: string[];
}

export const DomainCatalog: Record<string, Domain> = {
  "dom-ent-001": {
    id: "dom-ent-001",
    name: "Enterprise Architecture",
    domain: ArchitectureDomain.ENTERPRISE,
    description: "Organizational structure, business processes, governance",
    subDomains: ["organizational-structure", "business-processes", "governance"]
  },
  "dom-sft-001": {
    id: "dom-sft-001",
    name: "Software Architecture",
    domain: ArchitectureDomain.SOFTWARE,
    description: "System design, component structure, data architecture",
    subDomains: ["system-design", "component-structure", "data-architecture"]
  },
  "dom-inf-001": {
    id: "dom-inf-001",
    name: "Information Architecture",
    domain: ArchitectureDomain.INFORMATION,
    description: "Data models, information flows, data governance",
    subDomains: ["data-models", "information-flows", "data-governance"]
  },
  "dom-tec-001": {
    id: "dom-tec-001",
    name: "Technology Architecture",
    domain: ArchitectureDomain.TECHNOLOGY,
    description: "Infrastructure, platforms, tools, standards",
    subDomains: ["infrastructure", "platforms", "tools", "standards"]
  },
  "dom-bus-001": {
    id: "dom-bus-001",
    name: "Business Architecture",
    domain: ArchitectureDomain.BUSINESS,
    description: "Capabilities, value streams, products, business models",
    subDomains: ["capabilities", "value-streams", "products", "business-models"]
  },
  "dom-sol-001": {
    id: "dom-sol-001",
    name: "Solution Architecture",
    domain: ArchitectureDomain.SOLUTION,
    description: "Requirements analysis, design synthesis, implementation",
    subDomains: ["requirements", "design", "implementation"]
  },
  "dom-sec-001": {
    id: "dom-sec-001",
    name: "Security Architecture",
    domain: ArchitectureDomain.SECURITY,
    description: "Identity, access, data protection, threat modeling",
    subDomains: ["identity", "access-control", "data-protection", "threat-modeling"]
  },
  "dom-prd-001": {
    id: "dom-prd-001",
    name: "Product Architecture",
    domain: ArchitectureDomain.PRODUCT,
    description: "Feature structure, user experience, scalability",
    subDomains: ["features", "user-experience", "scalability"]
  }
};

// ============================================================================
// 2. LAYER ENTITIES
// ============================================================================

export enum ArchitectureLayer {
  STRATEGIC = "strategic",
  CONCEPTUAL = "conceptual",
  LOGICAL = "logical",
  PHYSICAL = "physical",
  IMPLEMENTATION = "implementation"
}

export interface Layer {
  id: string;
  name: string;
  layer: ArchitectureLayer;
  level: number;
  description: string;
  abstraction: string;
  audience: string[];
}

export const LayerCatalog: Record<string, Layer> = {
  "lyr-str-001": {
    id: "lyr-str-001",
    name: "Strategic Layer",
    layer: ArchitectureLayer.STRATEGIC,
    level: 1,
    description: "Vision, mission, goals, principles, constraints",
    abstraction: "Highest level of abstraction",
    audience: ["executives", "architects", "stakeholders"]
  },
  "lyr-con-001": {
    id: "lyr-con-001",
    name: "Conceptual Layer",
    layer: ArchitectureLayer.CONCEPTUAL,
    level: 2,
    description: "Domain concepts, capabilities, services, information concepts",
    abstraction: "Business and domain level",
    audience: ["architects", "business-analysts", "designers"]
  },
  "lyr-log-001": {
    id: "lyr-log-001",
    name: "Logical Layer",
    layer: ArchitectureLayer.LOGICAL,
    level: 3,
    description: "Logical components, data models, interfaces, processes",
    abstraction: "Technology-independent design",
    audience: ["architects", "developers", "designers"]
  },
  "lyr-phy-001": {
    id: "lyr-phy-001",
    name: "Physical Layer",
    layer: ArchitectureLayer.PHYSICAL,
    level: 4,
    description: "Deployed components, data stores, infrastructure, topology",
    abstraction: "Concrete infrastructure",
    audience: ["developers", "operators", "infrastructure-engineers"]
  },
  "lyr-imp-001": {
    id: "lyr-imp-001",
    name: "Implementation Layer",
    layer: ArchitectureLayer.IMPLEMENTATION,
    level: 5,
    description: "Code, modules, databases, deployment artifacts",
    abstraction: "Lowest level of abstraction",
    audience: ["developers", "operators"]
  }
};

// ============================================================================
// 3. CATEGORY ENTITIES
// ============================================================================

export enum ArchitectureCategory {
  STRUCTURAL = "structural",
  BEHAVIORAL = "behavioral",
  INFORMATIONAL = "informational",
  INTENTIONAL = "intentional",
  STAKEHOLDER = "stakeholder",
  TECHNOLOGICAL = "technological",
  GOVERNANCE = "governance"
}

export interface Category {
  id: string;
  name: string;
  category: ArchitectureCategory;
  description: string;
  types: string[];
}

export const CategoryCatalog: Record<string, Category> = {
  "cat-str-001": {
    id: "cat-str-001",
    name: "Structural",
    category: ArchitectureCategory.STRUCTURAL,
    description: "Components, interfaces, containers, relationships",
    types: ["component", "interface", "container", "relationship"]
  },
  "cat-bhv-001": {
    id: "cat-bhv-001",
    name: "Behavioral",
    category: ArchitectureCategory.BEHAVIORAL,
    description: "Processes, capabilities, services, interactions, functions",
    types: ["process", "capability", "service", "interaction", "function"]
  },
  "cat-inf-001": {
    id: "cat-inf-001",
    name: "Informational",
    category: ArchitectureCategory.INFORMATIONAL,
    description: "Data, information objects, knowledge, artifacts",
    types: ["data", "information-object", "knowledge", "artifact"]
  },
  "cat-int-001": {
    id: "cat-int-001",
    name: "Intentional",
    category: ArchitectureCategory.INTENTIONAL,
    description: "Goals, principles, constraints, requirements, decisions",
    types: ["goal", "principle", "constraint", "requirement", "decision"]
  },
  "cat-stk-001": {
    id: "cat-stk-001",
    name: "Stakeholder",
    category: ArchitectureCategory.STAKEHOLDER,
    description: "Actors, stakeholders, concerns, perspectives",
    types: ["actor", "stakeholder", "concern", "perspective"]
  },
  "cat-tec-001": {
    id: "cat-tec-001",
    name: "Technological",
    category: ArchitectureCategory.TECHNOLOGICAL,
    description: "Platforms, infrastructure, tools, standards",
    types: ["platform", "infrastructure", "tool", "standard"]
  },
  "cat-gov-001": {
    id: "cat-gov-001",
    name: "Governance",
    category: ArchitectureCategory.GOVERNANCE,
    description: "Policies, processes, metrics, controls",
    types: ["policy", "process", "metric", "control"]
  }
};

// ============================================================================
// 4. TYPE ENTITIES
// ============================================================================

export enum ComponentType {
  MONOLITHIC = "monolithic",
  DISTRIBUTED = "distributed",
  COMPOSITE = "composite",
  SPECIALIZED = "specialized",
  PLATFORM = "platform"
}

export enum DataType {
  STRUCTURED = "structured",
  SEMI_STRUCTURED = "semi-structured",
  UNSTRUCTURED = "unstructured",
  METADATA = "metadata"
}

export enum InterfaceType {
  SYNCHRONOUS = "synchronous",
  ASYNCHRONOUS = "asynchronous",
  USER_INTERFACE = "user-interface",
  SYSTEM_INTERFACE = "system-interface"
}

export enum RelationshipType {
  COMPOSITION = "composition",
  AGGREGATION = "aggregation",
  DEPENDENCY = "dependency",
  ASSOCIATION = "association",
  REALIZATION = "realization",
  SERVES = "serves",
  FLOWS_TO = "flows-to",
  ACCESSES = "accesses"
}

export interface Type {
  id: string;
  name: string;
  category: ArchitectureCategory;
  typeEnum: string;
  description: string;
  examples: string[];
}

export const TypeCatalog: Record<string, Type> = {
  "typ-cmp-mon-001": {
    id: "typ-cmp-mon-001",
    name: "Monolithic Component",
    category: ArchitectureCategory.STRUCTURAL,
    typeEnum: ComponentType.MONOLITHIC,
    description: "Single, unified component without decomposition",
    examples: ["monolithic-application", "monolithic-service", "monolithic-system"]
  },
  "typ-cmp-dis-001": {
    id: "typ-cmp-dis-001",
    name: "Distributed Component",
    category: ArchitectureCategory.STRUCTURAL,
    typeEnum: ComponentType.DISTRIBUTED,
    description: "Components spread across multiple nodes",
    examples: ["microservice", "distributed-component", "service-oriented-component"]
  },
  "typ-cmp-com-001": {
    id: "typ-cmp-com-001",
    name: "Composite Component",
    category: ArchitectureCategory.STRUCTURAL,
    typeEnum: ComponentType.COMPOSITE,
    description: "Component composed of other components",
    examples: ["composite-service", "orchestrated-component", "federated-component"]
  },
  "typ-cmp-spe-001": {
    id: "typ-cmp-spe-001",
    name: "Specialized Component",
    category: ArchitectureCategory.STRUCTURAL,
    typeEnum: ComponentType.SPECIALIZED,
    description: "Component with specialized purpose",
    examples: ["api-gateway", "message-broker", "cache-layer", "load-balancer"]
  },
  "typ-cmp-plf-001": {
    id: "typ-cmp-plf-001",
    name: "Platform Component",
    category: ArchitectureCategory.STRUCTURAL,
    typeEnum: ComponentType.PLATFORM,
    description: "Platform providing services to other components",
    examples: ["paas", "iaas", "saas", "baas"]
  },
  "typ-dat-str-001": {
    id: "typ-dat-str-001",
    name: "Structured Data",
    category: ArchitectureCategory.INFORMATIONAL,
    typeEnum: DataType.STRUCTURED,
    description: "Data with defined schema and structure",
    examples: ["relational-data", "hierarchical-data", "network-data", "graph-data"]
  },
  "typ-dat-sem-001": {
    id: "typ-dat-sem-001",
    name: "Semi-Structured Data",
    category: ArchitectureCategory.INFORMATIONAL,
    typeEnum: DataType.SEMI_STRUCTURED,
    description: "Data with partial structure",
    examples: ["xml-data", "json-data", "csv-data", "key-value-data"]
  },
  "typ-dat-uns-001": {
    id: "typ-dat-uns-001",
    name: "Unstructured Data",
    category: ArchitectureCategory.INFORMATIONAL,
    typeEnum: DataType.UNSTRUCTURED,
    description: "Data without predefined structure",
    examples: ["text-data", "image-data", "video-data", "audio-data", "document-data"]
  },
  "typ-ifc-syn-001": {
    id: "typ-ifc-syn-001",
    name: "Synchronous Interface",
    category: ArchitectureCategory.STRUCTURAL,
    typeEnum: InterfaceType.SYNCHRONOUS,
    description: "Real-time, blocking interface",
    examples: ["rest-api", "soap-api", "grpc", "direct-call"]
  },
  "typ-ifc-asn-001": {
    id: "typ-ifc-asn-001",
    name: "Asynchronous Interface",
    category: ArchitectureCategory.STRUCTURAL,
    typeEnum: InterfaceType.ASYNCHRONOUS,
    description: "Non-blocking, event-driven interface",
    examples: ["message-queue", "event-stream", "pub-sub", "webhook"]
  },
  "typ-rel-com-001": {
    id: "typ-rel-com-001",
    name: "Composition Relationship",
    category: ArchitectureCategory.STRUCTURAL,
    typeEnum: RelationshipType.COMPOSITION,
    description: "Part-of relationship with strong ownership",
    examples: ["system-contains-component", "component-contains-module"]
  },
  "typ-rel-dep-001": {
    id: "typ-rel-dep-001",
    name: "Dependency Relationship",
    category: ArchitectureCategory.STRUCTURAL,
    typeEnum: RelationshipType.DEPENDENCY,
    description: "One element depends on another",
    examples: ["component-depends-on-library", "service-depends-on-database"]
  }
};

// ============================================================================
// 5. LIFECYCLE STAGE ENTITIES
// ============================================================================

export enum LifecycleStage {
  CONCEPTION = "conception",
  DESIGN = "design",
  DEVELOPMENT = "development",
  DEPLOYMENT = "deployment",
  OPERATION = "operation",
  EVOLUTION = "evolution",
  RETIREMENT = "retirement"
}

export interface LifecyclePhase {
  id: string;
  name: string;
  stage: LifecycleStage;
  sequence: number;
  description: string;
  activities: string[];
}

export const LifecycleCatalog: Record<string, LifecyclePhase> = {
  "lfc-con-001": {
    id: "lfc-con-001",
    name: "Conception",
    stage: LifecycleStage.CONCEPTION,
    sequence: 1,
    description: "Idea, proposal, assessment, approval",
    activities: ["ideation", "proposal", "assessment", "approval"]
  },
  "lfc-des-001": {
    id: "lfc-des-001",
    name: "Design",
    stage: LifecycleStage.DESIGN,
    sequence: 2,
    description: "Specification, modeling, review, refinement",
    activities: ["specification", "modeling", "review", "refinement"]
  },
  "lfc-dev-001": {
    id: "lfc-dev-001",
    name: "Development",
    stage: LifecycleStage.DEVELOPMENT,
    sequence: 3,
    description: "Implementation, testing, integration, validation",
    activities: ["implementation", "testing", "integration", "validation"]
  },
  "lfc-dep-001": {
    id: "lfc-dep-001",
    name: "Deployment",
    stage: LifecycleStage.DEPLOYMENT,
    sequence: 4,
    description: "Staging, release, rollout, stabilization",
    activities: ["staging", "release", "rollout", "stabilization"]
  },
  "lfc-opr-001": {
    id: "lfc-opr-001",
    name: "Operation",
    stage: LifecycleStage.OPERATION,
    sequence: 5,
    description: "Monitoring, maintenance, optimization, support",
    activities: ["monitoring", "maintenance", "optimization", "support"]
  },
  "lfc-evo-001": {
    id: "lfc-evo-001",
    name: "Evolution",
    stage: LifecycleStage.EVOLUTION,
    sequence: 6,
    description: "Enhancement, refactoring, modernization, migration",
    activities: ["enhancement", "refactoring", "modernization", "migration"]
  },
  "lfc-ret-001": {
    id: "lfc-ret-001",
    name: "Retirement",
    stage: LifecycleStage.RETIREMENT,
    sequence: 7,
    description: "Deprecation, decommissioning, archival, disposal",
    activities: ["deprecation", "decommissioning", "archival", "disposal"]
  }
};

// ============================================================================
// 6. STAKEHOLDER ROLE ENTITIES
// ============================================================================

export enum StakeholderRole {
  CHIEF_ARCHITECT = "chief-architect",
  ENTERPRISE_ARCHITECT = "enterprise-architect",
  SOLUTION_ARCHITECT = "solution-architect",
  SOFTWARE_ARCHITECT = "software-architect",
  DEVELOPER = "developer",
  OPERATIONS_MANAGER = "operations-manager",
  PRODUCT_MANAGER = "product-manager",
  COMPLIANCE_OFFICER = "compliance-officer",
  CTO = "cto",
  CIO = "cio"
}

export interface StakeholderRoleEntity {
  id: string;
  name: string;
  role: StakeholderRole;
  description: string;
  responsibilities: string[];
  concerns: string[];
}

export const StakeholderRoleCatalog: Record<string, StakeholderRoleEntity> = {
  "stk-carch-001": {
    id: "stk-carch-001",
    name: "Chief Architect",
    role: StakeholderRole.CHIEF_ARCHITECT,
    description: "Leads architecture strategy and governance",
    responsibilities: ["architecture-strategy", "governance", "standards", "oversight"],
    concerns: ["strategic-alignment", "governance", "compliance", "innovation"]
  },
  "stk-earch-001": {
    id: "stk-earch-001",
    name: "Enterprise Architect",
    role: StakeholderRole.ENTERPRISE_ARCHITECT,
    description: "Designs enterprise-wide architecture",
    responsibilities: ["enterprise-design", "roadmap", "governance", "alignment"],
    concerns: ["business-alignment", "integration", "scalability", "governance"]
  },
  "stk-sarch-001": {
    id: "stk-sarch-001",
    name: "Solution Architect",
    role: StakeholderRole.SOLUTION_ARCHITECT,
    description: "Designs solutions for specific problems",
    responsibilities: ["solution-design", "requirements", "implementation", "delivery"],
    concerns: ["requirements", "design", "feasibility", "delivery"]
  },
  "stk-swarch-001": {
    id: "stk-swarch-001",
    name: "Software Architect",
    role: StakeholderRole.SOFTWARE_ARCHITECT,
    description: "Designs software systems and components",
    responsibilities: ["software-design", "components", "patterns", "quality"],
    concerns: ["design", "quality", "performance", "maintainability"]
  },
  "stk-dev-001": {
    id: "stk-dev-001",
    name: "Developer",
    role: StakeholderRole.DEVELOPER,
    description: "Implements architecture and components",
    responsibilities: ["implementation", "testing", "integration", "support"],
    concerns: ["implementation", "quality", "performance", "usability"]
  },
  "stk-ops-001": {
    id: "stk-ops-001",
    name: "Operations Manager",
    role: StakeholderRole.OPERATIONS_MANAGER,
    description: "Manages operational aspects",
    responsibilities: ["operations", "monitoring", "maintenance", "support"],
    concerns: ["availability", "performance", "cost", "reliability"]
  },
  "stk-pm-001": {
    id: "stk-pm-001",
    name: "Product Manager",
    role: StakeholderRole.PRODUCT_MANAGER,
    description: "Manages product and features",
    responsibilities: ["product-vision", "requirements", "roadmap", "delivery"],
    concerns: ["features", "market", "cost", "time-to-market"]
  },
  "stk-comp-001": {
    id: "stk-comp-001",
    name: "Compliance Officer",
    role: StakeholderRole.COMPLIANCE_OFFICER,
    description: "Ensures compliance and governance",
    responsibilities: ["compliance", "governance", "audit", "risk"],
    concerns: ["compliance", "risk", "audit", "governance"]
  }
};

// ============================================================================
// 7. CONCERN ENTITIES
// ============================================================================

export enum ConcernCategory {
  FUNCTIONAL = "functional",
  QUALITY = "quality",
  OPERATIONAL = "operational",
  BUSINESS = "business",
  TECHNICAL = "technical",
  GOVERNANCE = "governance",
  RISK = "risk",
  SUSTAINABILITY = "sustainability"
}

export interface Concern {
  id: string;
  name: string;
  category: ConcernCategory;
  description: string;
  stakeholders: string[];
  relatedQualityAttributes: string[];
}

export const ConcernCatalog: Record<string, Concern> = {
  "con-fun-001": {
    id: "con-fun-001",
    name: "Feature Completeness",
    category: ConcernCategory.FUNCTIONAL,
    description: "All required features are implemented",
    stakeholders: ["product-manager", "developer"],
    relatedQualityAttributes: ["functionality", "completeness"]
  },
  "con-qua-001": {
    id: "con-qua-001",
    name: "Performance",
    category: ConcernCategory.QUALITY,
    description: "System meets performance requirements",
    stakeholders: ["architect", "operations", "developer"],
    relatedQualityAttributes: ["performance", "responsiveness", "throughput"]
  },
  "con-qua-002": {
    id: "con-qua-002",
    name: "Reliability",
    category: ConcernCategory.QUALITY,
    description: "System operates reliably without failures",
    stakeholders: ["architect", "operations"],
    relatedQualityAttributes: ["reliability", "availability", "fault-tolerance"]
  },
  "con-qua-003": {
    id: "con-qua-003",
    name: "Security",
    category: ConcernCategory.QUALITY,
    description: "System is secure against threats",
    stakeholders: ["architect", "security-officer", "compliance-officer"],
    relatedQualityAttributes: ["security", "confidentiality", "integrity"]
  },
  "con-opr-001": {
    id: "con-opr-001",
    name: "Deployment Ease",
    category: ConcernCategory.OPERATIONAL,
    description: "System can be deployed easily",
    stakeholders: ["operations", "developer"],
    relatedQualityAttributes: ["deployability", "operability"]
  },
  "con-opr-002": {
    id: "con-opr-002",
    name: "Scalability",
    category: ConcernCategory.OPERATIONAL,
    description: "System can scale to meet demand",
    stakeholders: ["architect", "operations"],
    relatedQualityAttributes: ["scalability", "elasticity"]
  },
  "con-bus-001": {
    id: "con-bus-001",
    name: "Time-to-Market",
    category: ConcernCategory.BUSINESS,
    description: "Deliver features quickly to market",
    stakeholders: ["product-manager", "executive"],
    relatedQualityAttributes: ["agility", "speed"]
  },
  "con-bus-002": {
    id: "con-bus-002",
    name: "Cost Efficiency",
    category: ConcernCategory.BUSINESS,
    description: "Minimize operational and development costs",
    stakeholders: ["executive", "operations", "architect"],
    relatedQualityAttributes: ["cost", "efficiency"]
  },
  "con-gov-001": {
    id: "con-gov-001",
    name: "Compliance",
    category: ConcernCategory.GOVERNANCE,
    description: "Meet regulatory and compliance requirements",
    stakeholders: ["compliance-officer", "architect"],
    relatedQualityAttributes: ["compliance", "auditability"]
  },
  "con-ris-001": {
    id: "con-ris-001",
    name: "Risk Management",
    category: ConcernCategory.RISK,
    description: "Identify and mitigate architectural risks",
    stakeholders: ["architect", "risk-manager"],
    relatedQualityAttributes: ["resilience", "robustness"]
  }
};

// ============================================================================
// 8. QUALITY ATTRIBUTE ENTITIES
// ============================================================================

export enum QualityAttributeType {
  PERFORMANCE = "performance",
  RELIABILITY = "reliability",
  SECURITY = "security",
  MAINTAINABILITY = "maintainability",
  USABILITY = "usability",
  INTEROPERABILITY = "interoperability",
  RESILIENCE = "resilience",
  GOVERNANCE = "governance"
}

export interface QualityAttribute {
  id: string;
  name: string;
  type: QualityAttributeType;
  description: string;
  measurable: boolean;
  metrics: string[];
}

export const QualityAttributeCatalog: Record<string, QualityAttribute> = {
  "qat-prf-001": {
    id: "qat-prf-001",
    name: "Response Time",
    type: QualityAttributeType.PERFORMANCE,
    description: "Time taken to respond to requests",
    measurable: true,
    metrics: ["milliseconds", "percentile-p99"]
  },
  "qat-prf-002": {
    id: "qat-prf-002",
    name: "Throughput",
    type: QualityAttributeType.PERFORMANCE,
    description: "Number of requests processed per unit time",
    measurable: true,
    metrics: ["requests-per-second", "transactions-per-second"]
  },
  "qat-rel-001": {
    id: "qat-rel-001",
    name: "Availability",
    type: QualityAttributeType.RELIABILITY,
    description: "System is available and operational",
    measurable: true,
    metrics: ["uptime-percentage", "nines"]
  },
  "qat-rel-002": {
    id: "qat-rel-002",
    name: "Fault Tolerance",
    type: QualityAttributeType.RELIABILITY,
    description: "System continues operating despite failures",
    measurable: true,
    metrics: ["mtbf", "mtr"]
  },
  "qat-sec-001": {
    id: "qat-sec-001",
    name: "Confidentiality",
    type: QualityAttributeType.SECURITY,
    description: "Data is protected from unauthorized access",
    measurable: false,
    metrics: ["encryption-level", "access-control-rules"]
  },
  "qat-sec-002": {
    id: "qat-sec-002",
    name: "Integrity",
    type: QualityAttributeType.SECURITY,
    description: "Data is accurate and unmodified",
    measurable: false,
    metrics: ["checksum-validation", "audit-trail"]
  },
  "qat-mnt-001": {
    id: "qat-mnt-001",
    name: "Modifiability",
    type: QualityAttributeType.MAINTAINABILITY,
    description: "System can be modified easily",
    measurable: false,
    metrics: ["cyclomatic-complexity", "code-coverage"]
  },
  "qat-mnt-002": {
    id: "qat-mnt-002",
    name: "Testability",
    type: QualityAttributeType.MAINTAINABILITY,
    description: "System can be tested effectively",
    measurable: true,
    metrics: ["test-coverage", "test-execution-time"]
  },
  "qat-usr-001": {
    id: "qat-usr-001",
    name: "Learnability",
    type: QualityAttributeType.USABILITY,
    description: "Users can learn to use the system quickly",
    measurable: false,
    metrics: ["time-to-proficiency", "error-rate"]
  },
  "qat-res-001": {
    id: "qat-res-001",
    name: "Elasticity",
    type: QualityAttributeType.RESILIENCE,
    description: "System can scale up and down dynamically",
    measurable: true,
    metrics: ["scale-up-time", "scale-down-time"]
  }
};

// ============================================================================
// 9. PATTERN ENTITIES
// ============================================================================

export enum PatternCategory {
  ARCHITECTURAL = "architectural",
  DESIGN = "design",
  INTEGRATION = "integration",
  DATA = "data",
  SECURITY = "security",
  RESILIENCE = "resilience"
}

export interface Pattern {
  id: string;
  name: string;
  category: PatternCategory;
  description: string;
  applicableTo: ArchitectureDomain[];
  benefits: string[];
  tradeoffs: string[];
}

export const PatternCatalog: Record<string, Pattern> = {
  "pat-arc-001": {
    id: "pat-arc-001",
    name: "Layered Architecture",
    category: PatternCategory.ARCHITECTURAL,
    description: "Organize system into horizontal layers",
    applicableTo: [ArchitectureDomain.SOFTWARE, ArchitectureDomain.ENTERPRISE],
    benefits: ["separation-of-concerns", "testability", "maintainability"],
    tradeoffs: ["performance", "complexity"]
  },
  "pat-arc-002": {
    id: "pat-arc-002",
    name: "Microservices Architecture",
    category: PatternCategory.ARCHITECTURAL,
    description: "Decompose system into small, independent services",
    applicableTo: [ArchitectureDomain.SOFTWARE],
    benefits: ["scalability", "independence", "technology-diversity"],
    tradeoffs: ["complexity", "distributed-systems-challenges"]
  },
  "pat-arc-003": {
    id: "pat-arc-003",
    name: "Event-Driven Architecture",
    category: PatternCategory.ARCHITECTURAL,
    description: "Components communicate through events",
    applicableTo: [ArchitectureDomain.SOFTWARE, ArchitectureDomain.ENTERPRISE],
    benefits: ["loose-coupling", "scalability", "responsiveness"],
    tradeoffs: ["complexity", "eventual-consistency"]
  },
  "pat-des-001": {
    id: "pat-des-001",
    name: "Factory Pattern",
    category: PatternCategory.DESIGN,
    description: "Create objects without specifying exact classes",
    applicableTo: [ArchitectureDomain.SOFTWARE],
    benefits: ["flexibility", "decoupling"],
    tradeoffs: ["complexity"]
  },
  "pat-des-002": {
    id: "pat-des-002",
    name: "Observer Pattern",
    category: PatternCategory.DESIGN,
    description: "Define one-to-many dependency between objects",
    applicableTo: [ArchitectureDomain.SOFTWARE],
    benefits: ["loose-coupling", "dynamic-relationships"],
    tradeoffs: ["memory-overhead"]
  },
  "pat-int-001": {
    id: "pat-int-001",
    name: "API Gateway Pattern",
    category: PatternCategory.INTEGRATION,
    description: "Single entry point for API requests",
    applicableTo: [ArchitectureDomain.SOFTWARE, ArchitectureDomain.ENTERPRISE],
    benefits: ["centralized-control", "cross-cutting-concerns"],
    tradeoffs: ["single-point-of-failure", "performance"]
  },
  "pat-int-002": {
    id: "pat-int-002",
    name: "Message Queue Pattern",
    category: PatternCategory.INTEGRATION,
    description: "Asynchronous communication via message queues",
    applicableTo: [ArchitectureDomain.SOFTWARE],
    benefits: ["decoupling", "reliability", "scalability"],
    tradeoffs: ["complexity", "eventual-consistency"]
  },
  "pat-dat-001": {
    id: "pat-dat-001",
    name: "Event Sourcing",
    category: PatternCategory.DATA,
    description: "Store state changes as immutable events",
    applicableTo: [ArchitectureDomain.SOFTWARE, ArchitectureDomain.INFORMATION],
    benefits: ["audit-trail", "replay", "temporal-queries"],
    tradeoffs: ["complexity", "storage"]
  },
  "pat-sec-001": {
    id: "pat-sec-001",
    name: "Zero-Trust Architecture",
    category: PatternCategory.SECURITY,
    description: "Never trust, always verify",
    applicableTo: [ArchitectureDomain.SECURITY, ArchitectureDomain.ENTERPRISE],
    benefits: ["security", "compliance"],
    tradeoffs: ["complexity", "performance"]
  },
  "pat-res-001": {
    id: "pat-res-001",
    name: "Circuit Breaker Pattern",
    category: PatternCategory.RESILIENCE,
    description: "Prevent cascading failures",
    applicableTo: [ArchitectureDomain.SOFTWARE],
    benefits: ["fault-isolation", "graceful-degradation"],
    tradeoffs: ["complexity"]
  }
};

// ============================================================================
// 10. FRAMEWORK ENTITIES
// ============================================================================

export enum FrameworkType {
  STANDARD = "standard",
  ENTERPRISE_FRAMEWORK = "enterprise-framework",
  MODELING_LANGUAGE = "modeling-language",
  SOFTWARE_FRAMEWORK = "software-framework",
  AGILE_FRAMEWORK = "agile-framework",
  CLOUD_FRAMEWORK = "cloud-framework"
}

export interface Framework {
  id: string;
  name: string;
  acronym: string;
  type: FrameworkType;
  description: string;
  applicableDomains: ArchitectureDomain[];
  primaryQuestion: string;
}

export const FrameworkCatalog: Record<string, Framework> = {
  "frm-iso-001": {
    id: "frm-iso-001",
    name: "ISO/IEC/IEEE 42010",
    acronym: "ISO 42010",
    type: FrameworkType.STANDARD,
    description: "Standard for architecture description",
    applicableDomains: [ArchitectureDomain.ENTERPRISE, ArchitectureDomain.SOFTWARE],
    primaryQuestion: "What must an architecture description express, and why?"
  },
  "frm-c4-001": {
    id: "frm-c4-001",
    name: "C4 Model",
    acronym: "C4",
    type: FrameworkType.SOFTWARE_FRAMEWORK,
    description: "Hierarchical software architecture diagrams",
    applicableDomains: [ArchitectureDomain.SOFTWARE],
    primaryQuestion: "How much of the software architecture should this audience see?"
  },
  "frm-tog-001": {
    id: "frm-tog-001",
    name: "TOGAF Standard",
    acronym: "TOGAF",
    type: FrameworkType.ENTERPRISE_FRAMEWORK,
    description: "Enterprise architecture framework",
    applicableDomains: [ArchitectureDomain.ENTERPRISE, ArchitectureDomain.BUSINESS],
    primaryQuestion: "How should enterprise architecture be developed, governed, and changed?"
  },
  "frm-arc-001": {
    id: "frm-arc-001",
    name: "ArchiMate",
    acronym: "ArchiMate",
    type: FrameworkType.MODELING_LANGUAGE,
    description: "Modeling language for enterprise architecture",
    applicableDomains: [ArchitectureDomain.ENTERPRISE, ArchitectureDomain.BUSINESS, ArchitectureDomain.SOFTWARE],
    primaryQuestion: "What language expresses relationships across enterprise domains?"
  },
  "frm-mof-001": {
    id: "frm-mof-001",
    name: "OMG Meta-Object Facility",
    acronym: "MOF",
    type: FrameworkType.STANDARD,
    description: "Metamodeling facility for model interchange",
    applicableDomains: [ArchitectureDomain.SOFTWARE, ArchitectureDomain.INFORMATION],
    primaryQuestion: "What language defines the model, and how can the artifact interoperate?"
  },
  "frm-saf-001": {
    id: "frm-saf-001",
    name: "Scaled Agile Framework",
    acronym: "SAFe",
    type: FrameworkType.AGILE_FRAMEWORK,
    description: "Framework for scaling agile practices",
    applicableDomains: [ArchitectureDomain.ENTERPRISE, ArchitectureDomain.SOFTWARE],
    primaryQuestion: "How can agile practices be scaled across the enterprise?"
  },
  "frm-aws-001": {
    id: "frm-aws-001",
    name: "AWS Well-Architected Framework",
    acronym: "AWS WAF",
    type: FrameworkType.CLOUD_FRAMEWORK,
    description: "Framework for designing cloud architectures on AWS",
    applicableDomains: [ArchitectureDomain.TECHNOLOGY, ArchitectureDomain.SOFTWARE],
    primaryQuestion: "How can we design architectures that are secure, reliable, efficient, and cost-effective?"
  }
};

// ============================================================================
// 11. ARTIFACT ENTITIES
// ============================================================================

export enum ArtifactType {
  DIAGRAM = "diagram",
  MODEL = "model",
  DOCUMENT = "document",
  SPECIFICATION = "specification",
  REPOSITORY = "repository",
  EXCHANGE_FORMAT = "exchange-format",
  VIEWPOINT = "viewpoint"
}

export interface Artifact {
  id: string;
  name: string;
  type: ArtifactType;
  description: string;
  governedBy: string[];
  audience: string[];
}

export const ArtifactCatalog: Record<string, Artifact> = {
  "art-dia-001": {
    id: "art-dia-001",
    name: "Context Diagram",
    type: ArtifactType.DIAGRAM,
    description: "Shows system in its environment",
    governedBy: ["c4-level-1", "iso-42010-viewpoint"],
    audience: ["stakeholders", "architects", "product-managers"]
  },
  "art-dia-002": {
    id: "art-dia-002",
    name: "Component Diagram",
    type: ArtifactType.DIAGRAM,
    description: "Shows internal components and relationships",
    governedBy: ["c4-level-3", "uml-component-diagram"],
    audience: ["architects", "developers"]
  },
  "art-dia-003": {
    id: "art-dia-003",
    name: "Deployment Diagram",
    type: ArtifactType.DIAGRAM,
    description: "Shows deployment topology",
    governedBy: ["c4-level-2", "uml-deployment-diagram"],
    audience: ["architects", "operations", "developers"]
  },
  "art-mod-001": {
    id: "art-mod-001",
    name: "Domain Model",
    type: ArtifactType.MODEL,
    description: "Conceptual model of domain",
    governedBy: ["uml-class-diagram", "domain-driven-design"],
    audience: ["architects", "analysts", "developers"]
  },
  "art-mod-002": {
    id: "art-mod-002",
    name: "Data Model",
    type: ArtifactType.MODEL,
    description: "Logical or physical data structure",
    governedBy: ["er-diagram", "database-standards"],
    audience: ["data-architects", "developers", "dbas"]
  },
  "art-doc-001": {
    id: "art-doc-001",
    name: "Architecture Vision",
    type: ArtifactType.DOCUMENT,
    description: "High-level vision and direction",
    governedBy: ["iso-42010", "togaf-phase-a"],
    audience: ["executives", "stakeholders", "architects"]
  },
  "art-doc-002": {
    id: "art-doc-002",
    name: "Architecture Decision Record",
    type: ArtifactType.DOCUMENT,
    description: "Records architecture decisions and rationale",
    governedBy: ["adr-format"],
    audience: ["architects", "developers"]
  },
  "art-spc-001": {
    id: "art-spc-001",
    name: "API Specification",
    type: ArtifactType.SPECIFICATION,
    description: "Detailed API interface specification",
    governedBy: ["openapi", "rest-standards"],
    audience: ["developers", "architects"]
  },
  "art-rep-001": {
    id: "art-rep-001",
    name: "Model Repository",
    type: ArtifactType.REPOSITORY,
    description: "Centralized storage of architecture models",
    governedBy: ["mof", "xmi"],
    audience: ["architects", "tools"]
  },
  "art-exc-001": {
    id: "art-exc-001",
    name: "XMI Exchange File",
    type: ArtifactType.EXCHANGE_FORMAT,
    description: "Model interchange format",
    governedBy: ["xmi-standard", "mof"],
    audience: ["tools", "architects"]
  }
};

// ============================================================================
// 12. UNIFIED ENTITY CATALOG
// ============================================================================

export interface UnifiedEntity {
  id: string;
  name: string;
  domain: ArchitectureDomain;
  layer: ArchitectureLayer;
  category: ArchitectureCategory;
  type: string;
  description: string;
  lifecycle: LifecycleStage;
  stakeholders: string[];
  concerns: string[];
  qualityAttributes: string[];
  relatedPatterns: string[];
  relatedFrameworks: string[];
  artifacts: string[];
  relationships: Array<{
    type: RelationshipType;
    targetId: string;
  }>;
}

export const UnifiedEntityCatalog: Record<string, UnifiedEntity> = {
  "ent-001": {
    id: "ent-001",
    name: "Microservice Component",
    domain: ArchitectureDomain.SOFTWARE,
    layer: ArchitectureLayer.LOGICAL,
    category: ArchitectureCategory.STRUCTURAL,
    type: "microservice",
    description: "Independent, deployable service component",
    lifecycle: LifecycleStage.OPERATION,
    stakeholders: ["software-architect", "developer", "operations"],
    concerns: ["scalability", "independence", "deployment"],
    qualityAttributes: ["modularity", "scalability", "maintainability"],
    relatedPatterns: ["microservices-architecture", "api-gateway-pattern"],
    relatedFrameworks: ["c4-model", "archimate"],
    artifacts: ["component-diagram", "api-specification"],
    relationships: [
      { type: RelationshipType.COMPOSITION, targetId: "ent-002" },
      { type: RelationshipType.SERVES, targetId: "ent-003" }
    ]
  },
  "ent-002": {
    id: "ent-002",
    name: "REST API Interface",
    domain: ArchitectureDomain.SOFTWARE,
    layer: ArchitectureLayer.LOGICAL,
    category: ArchitectureCategory.STRUCTURAL,
    type: "synchronous-interface",
    description: "RESTful API interface for service communication",
    lifecycle: LifecycleStage.OPERATION,
    stakeholders: ["software-architect", "developer"],
    concerns: ["interoperability", "performance", "security"],
    qualityAttributes: ["interoperability", "performance"],
    relatedPatterns: ["api-gateway-pattern"],
    relatedFrameworks: ["c4-model"],
    artifacts: ["api-specification"],
    relationships: [
      { type: RelationshipType.REALIZATION, targetId: "ent-001" }
    ]
  },
  "ent-003": {
    id: "ent-003",
    name: "Business Capability",
    domain: ArchitectureDomain.BUSINESS,
    layer: ArchitectureLayer.CONCEPTUAL,
    category: ArchitectureCategory.BEHAVIORAL,
    type: "capability",
    description: "Business capability that delivers value",
    lifecycle: LifecycleStage.OPERATION,
    stakeholders: ["product-manager", "business-analyst"],
    concerns: ["business-value", "market-fit"],
    qualityAttributes: ["value-delivery"],
    relatedPatterns: [],
    relatedFrameworks: ["archimate", "togaf"],
    artifacts: ["capability-model"],
    relationships: [
      { type: RelationshipType.SERVES, targetId: "ent-001" }
    ]
  }
};

// ============================================================================
// EXPORT ALL CATALOGS
// ============================================================================

export const AllCatalogs = {
  domains: DomainCatalog,
  layers: LayerCatalog,
  categories: CategoryCatalog,
  types: TypeCatalog,
  lifecycle: LifecycleCatalog,
  stakeholders: StakeholderRoleCatalog,
  concerns: ConcernCatalog,
  qualityAttributes: QualityAttributeCatalog,
  patterns: PatternCatalog,
  frameworks: FrameworkCatalog,
  artifacts: ArtifactCatalog,
  unified: UnifiedEntityCatalog
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function getCatalogStats(): Record<string, number> {
  return {
    domains: Object.keys(DomainCatalog).length,
    layers: Object.keys(LayerCatalog).length,
    categories: Object.keys(CategoryCatalog).length,
    types: Object.keys(TypeCatalog).length,
    lifecyclePhases: Object.keys(LifecycleCatalog).length,
    stakeholderRoles: Object.keys(StakeholderRoleCatalog).length,
    concerns: Object.keys(ConcernCatalog).length,
    qualityAttributes: Object.keys(QualityAttributeCatalog).length,
    patterns: Object.keys(PatternCatalog).length,
    frameworks: Object.keys(FrameworkCatalog).length,
    artifacts: Object.keys(ArtifactCatalog).length,
    unifiedEntities: Object.keys(UnifiedEntityCatalog).length,
    total: Object.keys(AllCatalogs).reduce((sum, key) => sum + Object.keys(AllCatalogs[key as keyof typeof AllCatalogs]).length, 0)
  };
}

export function findEntitiesByDomain(domain: ArchitectureDomain): UnifiedEntity[] {
  return Object.values(UnifiedEntityCatalog).filter(e => e.domain === domain);
}

export function findEntitiesByLayer(layer: ArchitectureLayer): UnifiedEntity[] {
  return Object.values(UnifiedEntityCatalog).filter(e => e.layer === layer);
}

export function findEntitiesByCategory(category: ArchitectureCategory): UnifiedEntity[] {
  return Object.values(UnifiedEntityCatalog).filter(e => e.category === category);
}

export function findEntitiesByStakeholder(stakeholder: string): UnifiedEntity[] {
  return Object.values(UnifiedEntityCatalog).filter(e => e.stakeholders.includes(stakeholder));
}
