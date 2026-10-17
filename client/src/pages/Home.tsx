// Design philosophy: print-room atlas — warm editorial surfaces, ink-blue structure, signal-rust deltas, and an asymmetric research-wall layout.
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowUpDown,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleDot,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Layers3,
  Link2,
  Menu,
  Network,
  Search,
  Share2,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  architectureSpecificationCount,
  architectureSpecificationRegistry,
  type ArchitectureSpecification,
} from "@/lib/architecture-specification-registry";
import { getCatalogStats } from "@/lib/architecture-taxonomy";

type StoredAtlasFile = {
  id: number;
  title: string;
  description: string | null;
  fileName: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
};

function encodeBytes(bytes: Uint8Array) {
  let binary = "";
  for (let index = 0; index < bytes.length; index += 1) binary += String.fromCharCode(bytes[index]);
  return btoa(binary);
}

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatMetadataLabel(key: string) {
  return key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").replace(/^./, (value) => value.toUpperCase());
}

function metadataValueParts(value: string | number | boolean | readonly string[]) {
  return Array.isArray(value) ? value.map(String) : [String(value)];
}

type Edition = "2022" | "2011" | "2000";

type Concept = {
  id: string;
  name: string;
  short: string;
  detail: string;
  category: string;
  edition: string;
  anchor?: string;
};

const editions: Array<{ id: Edition; label: string; title: string; note: string }> = [
  { id: "2022", label: "CURRENT", title: "ISO/IEC/IEEE 42010:2022", note: "Entity of interest · perspectives · aspects" },
  { id: "2011", label: "FIRST EDITION", title: "ISO/IEC/IEEE 42010:2011", note: "System of interest · architecture models" },
  { id: "2000", label: "ORIGIN", title: "IEEE 1471-2000", note: "The conceptual framework that started the vocabulary" },
];

const concepts: Concept[] = [
  { id: "entity", name: "Entity of Interest", short: "The thing being described", detail: "The 2022 edition generalizes the subject from a System of Interest to an Entity of Interest, broadening the scope to software, enterprises, services, product lines, technologies, and business domains.", category: "Context", edition: "2022", anchor: "context" },
  { id: "environment", name: "Environment", short: "The surrounding field of influence", detail: "Every entity is situated in an environment. The source describes this broadly: operational, developmental, technical, political, regulatory, and other influences that can affect the architecture.", category: "Context", edition: "2000 → 2022", anchor: "context" },
  { id: "architecture", name: "Architecture", short: "What is fundamental", detail: "Architecture is the fundamental concepts or properties of a system in its environment, embodied in its elements, relationships, and principles of design and evolution. It can exist even when it is not written down.", category: "Context", edition: "2011 → 2022", anchor: "context" },
  { id: "ad", name: "Architecture Description", short: "The work product that expresses an architecture", detail: "An AD is an artifact or collection of artifacts used to express an architecture. It may be a document, a set of models, a repository, or another form; the standard does not prescribe a media format.", category: "Core of AD", edition: "2000 → 2022", anchor: "core" },
  { id: "stakeholder", name: "Stakeholder", short: "Who holds an interest", detail: "Individuals, groups, or organizations holding concerns for the entity of interest. Examples include clients, owners, users, suppliers, designers, maintainers, auditors, certification authorities, and architects.", category: "Core of AD", edition: "2000 → 2022", anchor: "core" },
  { id: "concern", name: "Concern", short: "What matters to a stakeholder", detail: "Any interest in the entity. The source examples include purpose, functionality, structure, behavior, cost, supportability, safety, and interoperability.", category: "Core of AD", edition: "2000 → 2022", anchor: "core" },
  { id: "perspective", name: "Stakeholder Perspective", short: "A grouping lens introduced in 2022", detail: "The 2022 edition introduces Stakeholder Perspectives to group Concerns and organize Viewpoints that frame those concerns.", category: "2022 addition", edition: "2022", anchor: "changes" },
  { id: "viewpoint", name: "Architecture Viewpoint", short: "Conventions for one kind of view", detail: "A set of conventions for constructing, interpreting, using, and analyzing one type of Architecture View. It can include model kinds, languages, notations, modeling methods, and analytic techniques.", category: "Core of AD", edition: "2000 → 2022", anchor: "core" },
  { id: "view", name: "Architecture View", short: "A perspective on the architecture", detail: "An Architecture View expresses the architecture from the perspective of one or more stakeholders to address specific concerns, using the conventions of its governing viewpoint.", category: "Core of AD", edition: "2000 → 2022", anchor: "core" },
  { id: "component", name: "View Component", short: "The 2022 name for an architecture model", detail: "In the 2022 edition, Architecture Model is changed to View Component. The earlier model concept is preserved as a component used within views, governed by a model kind.", category: "2022 change", edition: "2022", anchor: "changes" },
  { id: "model-kind", name: "Model Kind", short: "Conventions for one model type", detail: "A Model Kind defines the conventions for one type of Architecture Model or View Component. It is typically part of a governing viewpoint.", category: "Core of AD", edition: "2000 → 2022", anchor: "core" },
  { id: "aspect", name: "Architecture Aspect", short: "A characteristic reflected in views", detail: "A 2022 addition: characteristics of the Entity of Interest reflected in Architecture Views. Aspects can refine traceability between Concerns and Views.", category: "2022 addition", edition: "2022", anchor: "changes" },
  { id: "rationale", name: "Architecture Rationale", short: "Why a choice was made", detail: "Rationale records the explanation, justification, or reasoning behind architecture decisions and alternatives not chosen.", category: "Supporting content", edition: "2000 → 2022", anchor: "core" },
  { id: "correspondence", name: "Correspondence", short: "A relation between AD elements", detail: "Correspondences express relationships of interest within an AD or between ADs. Correspondence Rules can enforce relations such as composition, refinement, consistency, traceability, dependency, constraint, and obligation.", category: "Supporting content", edition: "2011 → 2022", anchor: "core" },
  { id: "method", name: "Correspondence Method", short: "A way to establish correspondence", detail: "The 2022 core diagram includes Correspondence Method alongside Correspondence, making the means of establishing and maintaining relationships explicit.", category: "2022 addition", edition: "2022", anchor: "changes" },
  { id: "togaf-adm", name: "TOGAF Architecture Development Method", short: "An iterative method for developing enterprise architecture", detail: "The TOGAF ADM organizes architecture work into a Preliminary phase, Architecture Vision, domain architecture phases, delivery planning, governance, and change management. The Standard is designed to be configured for an organization rather than followed as a rigid recipe.", category: "TOGAF method", edition: "10th Edition", anchor: "togaf" },
  { id: "togaf-content", name: "TOGAF Fundamental Content", short: "Enduring concepts and core practices", detail: "The TOGAF Standard, 10th Edition separates Fundamental Content from TOGAF Series Guides. Fundamental Content provides core concepts and practices; Series Guides add configurable, topical guidance for different contexts and architecture styles.", category: "TOGAF content", edition: "10th Edition", anchor: "togaf" },
  { id: "archimate-metamodel", name: "ArchiMate Metamodel", short: "Elements, relationships, and rules of the language", detail: "The ArchiMate metamodel defines the concepts and relationships available in the language. It supports a common, tool-independent way to describe, analyze, and visualize relationships across enterprise architecture domains.", category: "ArchiMate metamodel", edition: "3.2", anchor: "archimate" },
  { id: "archimate-layers", name: "ArchiMate Core Layers", short: "Motivation, strategy, business, application, and technology", detail: "ArchiMate organizes its core language into layers and aspects. The layers provide a disciplined way to connect motivation and strategy to business behavior, applications, technology, physical realization, and implementation or migration.", category: "ArchiMate structure", edition: "3.2", anchor: "archimate" },
  { id: "archimate-exchange", name: "ArchiMate Model Exchange", short: "A file format for moving models between tools", detail: "The Open Group provides an ArchiMate Model Exchange File Format so ArchiMate models can be exchanged between compatible tools. The supplied G201 publication is a concrete reference model that includes an ArchiMate Exchange File Format model.", category: "ArchiMate exchange", edition: "G201 · 2020", anchor: "archimate" },
  { id: "dragon1-metamodel", name: "Dragon1 Enterprise Architecture Meta Model", short: "Entity classes and relationships for enterprise architecture", detail: "Dragon1 defines a core Enterprise Architecture Meta Model that relates important entity classes across architecture, enterprise structure, strategy, transformation, stakeholders, requirements, design, and realization. The provided source identifies it as Dragon1 Standard V2.1.", category: "Dragon1 metamodel", edition: "V2.1", anchor: "dragon1" },
  { id: "dragon1-eaml", name: "Dragon1 EA Modeling Language", short: "Symbols, rules, and classes for EA models", detail: "Dragon1 EAML combines entity classes, symbols, and modeling rules for informal and formal enterprise architecture models. Its basis distinguishes meta-meta-model, metamodel, and model, with rules for extending the metamodel.", category: "Dragon1 language", edition: "Current framing", anchor: "dragon1" },
  { id: "dragon1-reference-model", name: "Dragon1 Enterprise Architecture Reference Model", short: "Governance, business, information, and IT layers", detail: "The Dragon1 reference model presents four overview layers—Enterprise Governance, Business, Information, and IT Infrastructure—inside an enterprise, organization, or company container.", category: "Dragon1 reference model", edition: "Current framing", anchor: "dragon1" },
  { id: "mda-cim", name: "Computation-Independent Model", short: "Domain meaning before platform detail", detail: "A CIM expresses the domain, business problem, or computational intent without committing to the structure of a software platform. It is useful for framing what the system must mean before selecting implementation technology.", category: "OMG MDA model level", edition: "MDA Guide rev. 2.0", anchor: "mda" },
  { id: "mda-pim", name: "Platform-Independent Model", short: "Business functionality separated from technology", detail: "A PIM describes application or integrated-system business functionality and behavior independently of a particular platform. OMG presents it as the stable model that can be realized across platforms.", category: "OMG MDA model level", edition: "MDA Guide rev. 2.0", anchor: "mda" },
  { id: "mda-psm", name: "Platform-Specific Model", short: "A PIM mapped to a target platform", detail: "A PSM adds the details required by a chosen implementation platform. MDA development tools transform the PIM into one or more PSMs before producing a working implementation.", category: "OMG MDA model level", edition: "MDA Guide rev. 2.0", anchor: "mda" },
  { id: "mda-transformation", name: "Model Transformation", short: "A governed mapping between model levels", detail: "Transformation is the bridge from a more abstract model to a more concrete model or implementation. The mapping preserves intent while introducing platform, domain, or deployment detail.", category: "OMG MDA mechanism", edition: "MDA Guide rev. 2.0", anchor: "mda" },
  { id: "mda-mof-foundation", name: "MOF-based Modeling Foundation", short: "Models as first-class interoperable artifacts", detail: "OMG describes MOF as a key foundation for MDA. MOF-based languages let models be stored in compliant repositories, parsed and transformed by compatible tools, and rendered into XMI for transport.", category: "OMG MDA foundation", edition: "MDA specifications", anchor: "mda" },
];

const c4Levels = [
  { id: "context", level: "01", abstraction: "Software system", diagram: "System Context", title: "See the system in its world", purpose: "The highest-level view: the software system, its users, and the external systems it interacts with.", audience: "Product, delivery, and architecture stakeholders", artifact: "A boundary map of people, systems, and relationships", tone: "navy" },
  { id: "container", level: "02", abstraction: "Container", diagram: "Container diagram", title: "See the runtime shape", purpose: "Zoom into the software system to show the deployable or executable units—web apps, APIs, databases, and services.", audience: "Developers, architects, and operations", artifact: "A runtime topology with responsibilities and interactions", tone: "blue" },
  { id: "component", level: "03", abstraction: "Component", diagram: "Component diagram", title: "See the internal building blocks", purpose: "Zoom into a container to reveal the components that collaborate to fulfill its responsibilities.", audience: "Developers and technical designers", artifact: "A responsibility map inside one container", tone: "rust" },
  { id: "code", level: "04", abstraction: "Code", diagram: "Code diagram", title: "See the implementation detail", purpose: "The lowest level, used when a code-level conversation needs classes, modules, source code, or other technical artifacts.", audience: "Developers working close to the code", artifact: "A focused implementation view—not a mandate to diagram everything", tone: "paper" },
] as const;

const mofLayers = [
  { id: "m3", level: "M3", label: "Meta-metamodel", title: "The language that defines languages", purpose: "The foundation for defining metamodels: the concepts, relationships, and rules used to describe modeling languages.", example: "MOF Core", audience: "Standards authors and tool builders", output: "A formal metamodeling vocabulary", tone: "navy" },
  { id: "m2", level: "M2", label: "Metamodel", title: "The language of a domain", purpose: "A metamodel defines the elements and semantics of a modeling language, such as UML or another MOF-based language.", example: "UML metamodel", audience: "Language designers and model engineers", output: "A model language definition", tone: "blue" },
  { id: "m1", level: "M1", label: "User model", title: "The model you create", purpose: "A concrete model conforms to a metamodel. It captures a system, domain, process, or other subject using the language defined above it.", example: "A UML class model", audience: "Architects, analysts, and developers", output: "An interoperable model artifact", tone: "rust" },
  { id: "m0", level: "M0", label: "Instances / reality", title: "The things the model describes", purpose: "The modeled instances or real-world/runtime objects that populate the user model. The model is useful because it gives these instances structure and meaning.", example: "Objects at runtime", audience: "Teams using the modeled system", output: "A subject situated in the world", tone: "paper" },
] as const;

const togafSteps = [
  { id: "preliminary", number: "00", label: "Preliminary", title: "Prepare the capability", purpose: "Establish the Architecture Capability: scope, principles, governance, organization, and the tailoring needed for the enterprise context.", output: "Capability, principles, governance", tone: "navy" },
  { id: "vision", number: "A", label: "Architecture Vision", title: "Agree the direction", purpose: "Create a shared vision, identify stakeholders and concerns, confirm scope, and secure commitment to the architecture work.", output: "Statement of Architecture Work", tone: "blue" },
  { id: "business", number: "B", label: "Business Architecture", title: "Describe the business change", purpose: "Develop the target Business Architecture and show how it responds to the Architecture Vision and stakeholder concerns.", output: "Baseline and target Business Architecture", tone: "rust" },
  { id: "information", number: "C", label: "Information Systems", title: "Shape data and applications", purpose: "Develop the Data and Application Architectures that enable the business capabilities and trace them to the target state.", output: "Data and Application Architecture", tone: "blue" },
  { id: "technology", number: "D", label: "Technology Architecture", title: "Describe the technology foundation", purpose: "Develop the target Technology Architecture and the technology building blocks needed to support the information systems.", output: "Technology Architecture", tone: "paper" },
  { id: "opportunities", number: "E", label: "Opportunities & Solutions", title: "Turn architecture into change", purpose: "Identify major implementation projects, group them into work packages, and evaluate strategic options for delivery.", output: "Architecture Roadmap and work packages", tone: "rust" },
  { id: "migration", number: "F", label: "Migration Planning", title: "Sequence the transition", purpose: "Prioritize projects, assess costs and benefits, and create a detailed implementation and migration plan.", output: "Implementation and Migration Plan", tone: "blue" },
  { id: "governance", number: "G", label: "Implementation Governance", title: "Keep delivery aligned", purpose: "Provide architectural oversight during implementation and establish contracts, compliance reviews, and governance controls.", output: "Architecture contract and compliance", tone: "navy" },
  { id: "change", number: "H", label: "Architecture Change Management", title: "Keep the architecture alive", purpose: "Monitor changes in the business and technology environment and determine when a new architecture cycle should begin.", output: "Change requests and new cycle", tone: "paper" },
] as const;

const archiMateLayers = [
  { id: "motivation", level: "01", label: "Motivation", title: "Why the enterprise changes", purpose: "Motivation elements express drivers, assessments, goals, outcomes, principles, requirements, and constraints that shape architecture decisions.", elements: "Stakeholder · Driver · Goal · Requirement", tone: "rust" },
  { id: "strategy", level: "02", label: "Strategy & Capability", title: "What the enterprise can do", purpose: "Strategy elements describe resources, capabilities, courses of action, and value streams that connect intent to enterprise action.", elements: "Resource · Capability · Value Stream · Course of Action", tone: "navy" },
  { id: "business", level: "03", label: "Business", title: "How the business operates", purpose: "Business elements model active and behavioral structure such as actors, roles, processes, functions, services, products, and business events.", elements: "Actor · Role · Process · Service · Product", tone: "blue" },
  { id: "application", level: "04", label: "Application", title: "How applications support work", purpose: "Application elements describe application components, interfaces, functions, and services and their relationships to business behavior.", elements: "Application Component · Interface · Function · Service", tone: "rust" },
  { id: "technology", level: "05", label: "Technology, Physical & Implementation", title: "What realizes the architecture", purpose: "Technology, physical, and implementation/migration elements connect infrastructure, facilities, deliverables, work packages, plateaus, and gaps to the change journey.", elements: "Node · System Software · Facility · Work Package · Gap", tone: "paper" },
] as const;

const dragon1Packages = [
  { id: "architecture", number: "01", label: "Architecture · core", title: "Start with the total concept", purpose: "Dragon1 describes architecture as a total concept of a structure: a coherent set of concepts and principles used to design and change enterprise-wide solutions.", entities: "Architecture · Concept · Principle · Element · Component · Technical Product", tone: "navy" },
  { id: "enterprise", number: "02", label: "Enterprise as structure", title: "Place the enterprise in domains", purpose: "The enterprise is treated as a structure containing domains and functions, situated in an ecosystem and environment. Capabilities express how well functions can be performed with support.", entities: "Enterprise · Structure · Domain · Function · Capability · Ecosystem", tone: "blue" },
  { id: "strategy", number: "03", label: "Strategy", title: "Connect direction to architecture", purpose: "Identity, mission, vision, needs, goals, and actions provide direction and input for the architecture. Strategy gives the architecture a destination and rationale.", entities: "Strategy · Identity · Mission · Vision · Goal · Action", tone: "rust" },
  { id: "transformation", number: "04", label: "Transformation & projects", title: "Turn concepts into change", purpose: "Projects and transformation organize the implementation of architecture. Deliverables are defined for concepts, elements, components, and technical products so intent can become a realized solution.", entities: "Transformation · Project · Deliverable · Work Package · Milestone · Phase", tone: "paper" },
  { id: "stakeholders", number: "05", label: "Stakeholders & requirements", title: "Design from needs and concerns", purpose: "Owners, clients, stakeholders, and architects connect needs, issues, concerns, and requirements to the design. Requirements guide the concepts and principles that contractors realize.", entities: "Owner · Stakeholder · Need · Issue · Concern · Requirement", tone: "blue" },
  { id: "realization", number: "06", label: "Design & realization", title: "Express and supervise the design", purpose: "Architects use viewpoints and views to communicate concepts and principles at logical and physical levels, then supervise realization through models, visualizations, and roadmaps.", entities: "Design · Viewpoint · View · Visualization · Architect · Contractor", tone: "rust" },
] as const;

const mdaStages = [
  { id: "cim", number: "01", label: "CIM", title: "Frame the domain meaning", purpose: "Describe the business, domain, or computational problem without committing to a software platform. This level keeps stakeholder intent visible before technical realization.", model: "Computation-Independent Model", artifact: "Domain concepts, rules, goals, and behavior", tone: "rust" },
  { id: "pim", number: "02", label: "PIM", title: "Stabilize platform-independent behavior", purpose: "Capture application or integrated-system business functionality and behavior independently of a particular platform. The PIM is the durable center of the MDA flow.", model: "Platform-Independent Model", artifact: "MOF-based model, often expressed with UML", tone: "navy" },
  { id: "mapping", number: "03", label: "MAP", title: "Declare the transformation", purpose: "Define the mapping, profile, rules, or transformation that introduces the target platform concepts while preserving the intent of the source model.", model: "PIM-to-PSM mapping", artifact: "Transformation rules and trace links", tone: "blue" },
  { id: "psm", number: "04", label: "PSM", title: "Add platform realization detail", purpose: "Refine the independent model for a selected platform such as a web, middleware, language, or deployment environment. Multiple PSMs can realize one PIM.", model: "Platform-Specific Model", artifact: "Platform profile, deployment model, or technology design", tone: "rust" },
  { id: "exchange", number: "05", label: "XMI", title: "Exchange the model artifact", purpose: "Use MOF-compatible tools, repositories, and XMI serialization to move model artifacts while preserving identity, structure, and references across a tool chain.", model: "Interoperable model artifact", artifact: "XMI document, repository content, or model package", tone: "paper" },
  { id: "implementation", number: "06", label: "BUILD", title: "Realize and evolve the system", purpose: "Generate or implement the target application, then keep the platform-specific realization aligned as business needs and technology platforms evolve.", model: "Working implementation", artifact: "Code, deployment, and maintained platform realization", tone: "navy" },
] as const;

const generalizedLevels = [
  { id: "architecture", number: "01", label: "Architecture", subtitle: "The whole and its intent", tone: "navy" },
  { id: "component", number: "02", label: "Components", subtitle: "The meaningful parts", tone: "blue" },
  { id: "element", number: "03", label: "Elements", subtitle: "The atomic concepts", tone: "rust" },
] as const;

type GeneralizedNode = {
  id: string;
  level: "architecture" | "component" | "element";
  name: string;
  kind: string;
  short: string;
  detail: string;
  examples: string;
  tone: string;
};

const generalizedNodes: GeneralizedNode[] = [
  { id: "gm-architecture", level: "architecture", name: "Architecture", kind: "root concept", short: "The fundamental arrangement and principles", detail: "The architecture is the coherent set of fundamental concepts, properties, boundaries, relationships, and principles that shape an entity in its environment. It is the subject being reasoned about—not merely the document that describes it.", examples: "Enterprise · product · service · system · platform", tone: "navy" },
  { id: "gm-environment", level: "architecture", name: "Environment", kind: "context", short: "The field of influence around the architecture", detail: "The environment includes operational, organizational, technical, regulatory, economic, and social conditions that influence the architecture and its evolution.", examples: "Regulation · market · organization · ecosystem", tone: "blue" },
  { id: "gm-intent", level: "architecture", name: "Intent & Principles", kind: "governance", short: "Why it exists and how it should evolve", detail: "Intent captures purpose, outcomes, concerns, decisions, principles, constraints, and rationale. It gives components and elements a direction instead of treating them as an inventory.", examples: "Goal · concern · principle · decision · rationale", tone: "rust" },
  { id: "gm-boundary", level: "architecture", name: "Boundary & Scope", kind: "framing", short: "What is inside, outside, and in focus", detail: "A boundary makes the architecture manageable: it defines the entity of interest, scope of description, interfaces with the environment, and the level of detail appropriate for the current question.", examples: "System boundary · domain · viewpoint scope", tone: "paper" },
  { id: "gm-component", level: "component", name: "Component", kind: "part", short: "A meaningful architectural part with responsibility", detail: "A component is a stable unit of structure or behavior that can be named, assigned responsibility, composed with other parts, and traced to intent. The term is deliberately general across enterprise, software, data, and technology architectures.", examples: "Business unit · service · subsystem · platform", tone: "navy" },
  { id: "gm-interface", level: "component", name: "Interface", kind: "connection", short: "A point where a component meets another", detail: "An interface defines the observable contract, capability, protocol, or boundary through which components exchange value, information, control, or responsibility.", examples: "API · business interface · event channel · contract", tone: "blue" },
  { id: "gm-realization", level: "component", name: "Realization Unit", kind: "implementation", short: "A component that realizes a capability or service", detail: "A realization unit connects desired capability and observable service to the structures that implement it. It is the bridge between architecture intent and implementation or deployment.", examples: "Application · data store · process · node · work package", tone: "rust" },
  { id: "gm-view", level: "component", name: "View & Artifact", kind: "description", short: "A representation used to inspect or communicate", detail: "Views and artifacts are not the architecture itself. They are governed representations—diagrams, models, documents, repositories, or exchanges—selected to address stakeholder concerns.", examples: "View · model · diagram · repository · exchange file", tone: "paper" },
  { id: "gm-element", level: "element", name: "Actor & Role", kind: "active structure", short: "Who acts or holds responsibility", detail: "Actors and roles identify people, organizations, systems, or responsibilities that participate in architecture behavior, governance, ownership, or use.", examples: "Stakeholder · actor · role · team · organization", tone: "navy" },
  { id: "gm-capability", level: "element", name: "Capability & Function", kind: "behavior", short: "What can be done and how work behaves", detail: "Capabilities, functions, processes, services, and interactions express behavior and value. They connect intent to the work a component or architecture enables.", examples: "Capability · function · process · service · interaction", tone: "blue" },
  { id: "gm-information", level: "element", name: "Information & Data", kind: "passive structure", short: "What is known, exchanged, or transformed", detail: "Information and data elements capture meaning, structure, lifecycle, ownership, and flow. They can be conceptual, logical, physical, or exchanged between components.", examples: "Concept · record · data object · message · repository", tone: "rust" },
  { id: "gm-technology", level: "element", name: "Technology & Resource", kind: "realization", short: "What provides the means to operate", detail: "Technology, facilities, resources, and deployment elements provide the material or computational means through which components and capabilities are realized.", examples: "Node · device · facility · resource · runtime", tone: "paper" },
  { id: "gm-relation", level: "element", name: "Relationship", kind: "connector", short: "How architecture concepts affect one another", detail: "Relationships make the model explanatory: composition, aggregation, assignment, realization, serving, flow, access, dependency, influence, triggering, and specialization are examples of relationship semantics.", examples: "Composes · realizes · serves · flows to · influences", tone: "navy" },
] as const;

const generalizedRelations = [
  { from: "Architecture", relation: "decomposes into", to: "Components", note: "The whole is made useful by meaningful parts with responsibilities." },
  { from: "Components", relation: "expose", to: "Interfaces", note: "Boundaries make collaboration and contracts observable." },
  { from: "Components", relation: "realize", to: "Capabilities", note: "Structure and behavior connect architecture intent to value." },
  { from: "Elements", relation: "relate through", to: "Relationships", note: "Meaning comes from typed connections, not isolated boxes." },
  { from: "Architecture", relation: "is described by", to: "Views & Artifacts", note: "Representations address concerns without replacing the architecture." },
] as const;

const mappingRows = [
  { topic: "Primary question", iso: "What must an architecture description express, and why?", c4: "How much of the software architecture should this audience see?", mof: "What language defines the model, and how can the artifact interoperate?", togaf: "How should enterprise architecture be developed, governed, and changed?", archimate: "What language expresses relationships across enterprise domains?", dragon1: "How can enterprise architecture entities and relationships form a coherent modeling language?", mda: "How can models remain stable while platforms and implementations change?" },
  { topic: "Abstraction", iso: "Stakeholders, concerns, viewpoints, views, models, and correspondences.", c4: "Software system, container, component, and code.", mof: "M3 meta-metamodel, M2 metamodel, M1 user model, and M0 instances.", togaf: "Capability, ADM phases, deliverables, governance, and change cycles.", archimate: "Motivation, strategy, business, application, technology, physical, and implementation elements.", dragon1: "Architecture core, enterprise structure, strategy, transformation, stakeholders, requirements, design, and realization.", mda: "CIM, PIM, mapping, PSM, exchange, and implementation across a transformation chain." },
  { topic: "Core artifact", iso: "Architecture Description and its governed views.", c4: "A hierarchical architecture diagram and supporting views.", mof: "A MOF-based metamodel or model that can be exchanged and transformed.", togaf: "Architecture Vision, domain architectures, roadmaps, contracts, and governance outputs.", archimate: "A model expressed through ArchiMate elements, relationships, viewpoints, and exchange files.", dragon1: "Enterprise Architecture Meta Model, reference models, views, visualizations, and architecture models.", mda: "A platform-independent model, platform-specific model, mapping, exchange artifact, and implementation." },
  { topic: "Audience", iso: "Stakeholders with different concerns and perspectives.", c4: "Product, architecture, delivery, operations, and development teams.", mof: "Language designers, tool builders, model engineers, and interoperating tools.", togaf: "Enterprise architects, stakeholders, governance bodies, and delivery leaders.", archimate: "Enterprise architects and stakeholders communicating across business, information, application, and technology domains.", dragon1: "Architects, owners, stakeholders, analysts, engineers, and contractors working across enterprise change.", mda: "Domain experts, architects, model engineers, tool builders, and implementation teams." },
  { topic: "Relationship to views", iso: "Defines the conventions and rationale for an Architecture View.", c4: "Provides a practical zoom level that can populate an Architecture View.", mof: "Provides the metamodeling foundation and interchange mechanisms behind models.", togaf: "Structures the lifecycle in which architecture views are commissioned and used.", archimate: "Provides a modeling language and viewpoint mechanism for constructing cross-domain views.", dragon1: "Uses entity classes, relationships, views, and visualizations to express and communicate enterprise architecture.", mda: "Provides the transformation architecture that moves models from domain intent to platform realization." },
  { topic: "Interoperability", iso: "Correspondences and rules preserve traceability across AD elements.", c4: "Notation- and tooling-independent; exchange depends on the chosen tools.", mof: "XMI represents, links, validates, and identifies objects across files and tools.", togaf: "Configurable practice and governance align architecture work across organizations.", archimate: "The Open Group ArchiMate Model Exchange File Format supports compatible-tool exchange.", dragon1: "Extensible entity classes, symbols, constraints, relationship rules, and model layers provide conceptual consistency.", mda: "MOF-based languages, UML, XMI, repositories, mappings, and transformations support portability and interoperability." },
] as const;

type RegistrySortKey = "name" | "kind" | "version" | "primaryQuestion" | "abstraction";
type RegistrySortDirection = "asc" | "desc";
type MetamodelMapping = { targetId: string; relation: string; detail: string; tone: "direct" | "complementary" | "synthesis" };

const frameworkMetamodelMappings: Record<string, MetamodelMapping[]> = {
  "iso-42010": [
    { targetId: "omg-mda", relation: "is realized through", detail: "MDA supplies a transformation architecture for moving models toward platform realizations; ISO 42010 supplies the description framing and stakeholder concerns around them.", tone: "complementary" },
    { targetId: "c4-model", relation: "frames", detail: "C4 can supply the software-architecture views selected by a viewpoint to answer stakeholder concerns.", tone: "complementary" },
    { targetId: "omg-mof", relation: "governs the meaning of", detail: "MOF provides the metamodeling and interchange foundation behind model kinds and view components.", tone: "complementary" },
    { targetId: "togaf-standard", relation: "structures the work around", detail: "TOGAF provides the method and governance context in which architecture descriptions are commissioned and evolved.", tone: "complementary" },
    { targetId: "archimate-language", relation: "can use as a viewpoint language", detail: "ArchiMate supplies cross-domain elements and relationships for architecture views.", tone: "complementary" },
    { targetId: "dragon1-ea-metamodel", relation: "can be enriched by", detail: "Dragon1 adds an enterprise-oriented vocabulary of concepts, entities, relationships, and realizations around the description.", tone: "complementary" },
    { targetId: "generalized-architecture-metamodel", relation: "is synthesized by", detail: "The atlas synthesis preserves the whole, parts, elements, relationships, views, and traceability spine.", tone: "synthesis" },
  ],
  "c4-model": [
    { targetId: "omg-mda", relation: "can be transformed from", detail: "C4 views can contribute software architecture content to a model-driven flow when a formal target language and mapping are defined.", tone: "complementary" },
    { targetId: "iso-42010", relation: "populates views in", detail: "C4 levels are practical zoom choices that can become Architecture Views governed by viewpoints.", tone: "direct" },
    { targetId: "omg-mof", relation: "may be formalized through", detail: "A C4 vocabulary can be represented as a modeling language when a tool requires a formal metamodel.", tone: "complementary" },
    { targetId: "togaf-standard", relation: "supports delivery in", detail: "C4 diagrams make software architecture decisions visible during TOGAF delivery and governance cycles.", tone: "complementary" },
    { targetId: "archimate-language", relation: "complements", detail: "C4 focuses software zoom; ArchiMate connects software with wider enterprise domains.", tone: "complementary" },
    { targetId: "dragon1-ea-metamodel", relation: "can zoom into enterprise concepts with", detail: "Dragon1 supplies enterprise concepts and realization terms that surround a software system and its components.", tone: "complementary" },
    { targetId: "generalized-architecture-metamodel", relation: "maps to component levels", detail: "System, container, component, and code align naturally with whole-to-part decomposition.", tone: "synthesis" },
  ],
  "omg-mof": [
    { targetId: "omg-mda", relation: "provides the foundation for", detail: "MOF is a key foundation of MDA: it enables model languages, repositories, transformation tools, and XMI-based transport.", tone: "direct" },
    { targetId: "iso-42010", relation: "formalizes model kinds for", detail: "MOF can define the languages and model kinds used by architecture description views.", tone: "complementary" },
    { targetId: "c4-model", relation: "can define a language for", detail: "C4 concepts can be captured as typed model elements when stronger conformance is needed.", tone: "complementary" },
    { targetId: "togaf-standard", relation: "supports content metamodels in", detail: "MOF-style modeling helps make enterprise architecture content structures explicit and exchangeable.", tone: "complementary" },
    { targetId: "archimate-language", relation: "provides infrastructure for", detail: "ArchiMate is a modeling language whose elements, relationships, and exchange artifacts benefit from metamodel discipline.", tone: "direct" },
    { targetId: "dragon1-ea-metamodel", relation: "can formalize the enterprise vocabulary of", detail: "MOF concepts can help represent Dragon1 entity classes, relationships, and model conformance when formal interchange is needed.", tone: "complementary" },
    { targetId: "generalized-architecture-metamodel", relation: "supplies the conformance layer for", detail: "The generalized vocabulary can be implemented as a metamodel with typed elements and relationships.", tone: "synthesis" },
  ],
  "togaf-standard": [
    { targetId: "omg-mda", relation: "can govern model-driven realization in", detail: "TOGAF can provide enterprise governance and lifecycle context around MDA models, mappings, implementation, and change.", tone: "complementary" },
    { targetId: "iso-42010", relation: "commissions and governs", detail: "TOGAF organizes the architecture work while ISO 42010 shapes the description that expresses the result.", tone: "complementary" },
    { targetId: "c4-model", relation: "uses for software views", detail: "C4 provides lightweight software views within enterprise architecture initiatives and delivery packages.", tone: "complementary" },
    { targetId: "omg-mof", relation: "can formalize content through", detail: "MOF provides a route to explicit content metamodels and interoperable architecture artifacts.", tone: "complementary" },
    { targetId: "archimate-language", relation: "pairs with", detail: "TOGAF supplies method and governance; ArchiMate supplies a cross-domain language for the views.", tone: "direct" },
    { targetId: "dragon1-ea-metamodel", relation: "can reuse the enterprise concepts of", detail: "Dragon1 contributes a broad enterprise metamodel and reference-model vocabulary that can be used within configured TOGAF practices.", tone: "complementary" },
    { targetId: "generalized-architecture-metamodel", relation: "provides lifecycle context for", detail: "The synthesis vocabulary can travel through capability, roadmap, governance, and change cycles.", tone: "synthesis" },
  ],
  "archimate-language": [
    { targetId: "omg-mda", relation: "can serve as a model language in", detail: "ArchiMate content can participate in an MDA flow when its models, profiles, and mappings are supported by compatible tools and exchange formats.", tone: "complementary" },
    { targetId: "iso-42010", relation: "provides language for views in", detail: "ArchiMate elements and relationships can populate architecture views addressing stakeholder concerns.", tone: "complementary" },
    { targetId: "c4-model", relation: "connects beyond", detail: "ArchiMate expands a software-architecture view into business, application, technology, and migration context.", tone: "complementary" },
    { targetId: "omg-mof", relation: "is supported by", detail: "The ArchiMate metamodel and exchange format benefit from formal language and interchange concepts.", tone: "direct" },
    { targetId: "togaf-standard", relation: "pairs with", detail: "ArchiMate gives TOGAF practitioners a common modeling language across domains and phases.", tone: "direct" },
    { targetId: "generalized-architecture-metamodel", relation: "instantiates elements and relations in", detail: "ArchiMate demonstrates how a concrete language can realize the whole, part, element, and relationship spine.", tone: "synthesis" },
    { targetId: "dragon1-ea-metamodel", relation: "is adjacent to", detail: "Dragon1 provides a broader enterprise-oriented metamodel and visual modeling language for concepts, relationships, and realization.", tone: "complementary" },
  ],
  "omg-mda": [
    { targetId: "iso-42010", relation: "transforms models that describe", detail: "MDA can realize models used within architecture descriptions; ISO 42010 remains the framing standard for concerns, viewpoints, views, and correspondences.", tone: "complementary" },
    { targetId: "c4-model", relation: "can transform software views from", detail: "C4 provides a software zoom vocabulary that may be carried into a platform-independent or platform-specific realization.", tone: "complementary" },
    { targetId: "omg-mof", relation: "is founded on", detail: "OMG identifies MOF as a key foundation for MDA model languages, repositories, transformations, and XMI transport.", tone: "direct" },
    { targetId: "togaf-standard", relation: "can be governed through", detail: "TOGAF contributes enterprise lifecycle and governance context around model-driven platform realization.", tone: "complementary" },
    { targetId: "archimate-language", relation: "can transform models expressed in", detail: "ArchiMate can provide enterprise architecture content when mappings and compatible model-exchange tooling are available.", tone: "complementary" },
    { targetId: "dragon1-ea-metamodel", relation: "can realize enterprise models from", detail: "Dragon1’s enterprise vocabulary can be carried into a model-driven flow when a platform mapping and compatible transformation chain are defined.", tone: "complementary" },
    { targetId: "generalized-architecture-metamodel", relation: "can operationalize the synthesis of", detail: "The generalized vocabulary can be given a platform-independent model and transformed into concrete model or implementation targets.", tone: "synthesis" },
  ],
  "generalized-architecture-metamodel": [
    { targetId: "iso-42010", relation: "inherits description framing from", detail: "The synthesis keeps architecture distinct from the views and artifacts used to describe it.", tone: "direct" },
    { targetId: "c4-model", relation: "maps decomposition to", detail: "C4 supplies a concrete software zoom from architecture whole to component and code detail.", tone: "direct" },
    { targetId: "omg-mof", relation: "can be realized as a", detail: "MOF supplies the formal metamodeling level for the generalized concepts and relationships.", tone: "direct" },
    { targetId: "togaf-standard", relation: "travels through the lifecycle of", detail: "TOGAF supplies the enterprise method, governance, and change context around the vocabulary.", tone: "complementary" },
    { targetId: "archimate-language", relation: "can be expressed with", detail: "ArchiMate supplies concrete cross-domain elements, relationships, viewpoints, and exchange artifacts.", tone: "direct" },
    { targetId: "dragon1-ea-metamodel", relation: "is extended by the enterprise vocabulary of", detail: "Dragon1 makes the whole-to-realization path explicit through concepts, elements, components, stakeholders, requirements, and projects.", tone: "direct" },
  ],
};

const artifactExamples = [
  { id: "uml", label: "UML class model", kicker: "M1 / conforms to UML", title: "A small domain model", description: "An illustrative UML-style class model for an order flow. It is a user model at M1: useful to architects and developers, and conforming to a UML metamodel at M2.", note: "Illustrative artifact · not a normative UML excerpt", tone: "navy" },
  { id: "mof", label: "MOF metamodel", kicker: "M2 / defines a language", title: "The language behind the model", description: "An illustrative MOF-style metamodel fragment. It describes the types and relationships that a modeling language makes available to user models.", note: "Illustrative artifact · simplified for teaching", tone: "rust" },
] as const;

const xmiSteps = [
  { id: "conform", number: "01", label: "Conform", title: "Start with a model and its metamodel", copy: "A UML class model is authored as an M1 artifact and conforms to a UML metamodel at M2. MOF supplies the metamodeling foundation.", snippet: '<uml:Model xmi:id="model_01" name="Order domain">' },
  { id: "serialize", number: "02", label: "Serialize", title: "Represent model objects as XML", copy: "XMI maps model objects into XML elements and attributes, preserving identity with xmi:id values and relationships with references.", snippet: '<xmi:XMI xmi:version="2.5.1">' },
  { id: "exchange", number: "03", label: "Exchange", title: "Move and validate the artifact", copy: "The serialized document can travel between compatible tools or repositories. XML Schemas and object identity support validation and cross-file linking.", snippet: '<uml:Class xmi:id="class_customer" name="Customer" />' },
  { id: "transform", number: "04", label: "Transform", title: "Use the model downstream", copy: "MOF-enabled transformations can take models toward another model, generated code, or a deployable application, as described in OMG’s MDA context.", snippet: '</xmi:XMI>  →  PSM  →  code' },
] as const;

const chartData = [
  { edition: "1471 · 2000", concepts: 9, fill: "#9eb1c4" },
  { edition: "42010 · 2011", concepts: 12, fill: "#5c78a1" },
  { edition: "42010 · 2022", concepts: 15, fill: "#c65d3a" },
];

const nodePositions: Record<string, { x: number; y: number; w: number; h: number; tone: string }> = {
  environment: { x: 346, y: 28, w: 172, h: 52, tone: "blue" },
  entity: { x: 92, y: 132, w: 188, h: 62, tone: "rust" },
  architecture: { x: 590, y: 132, w: 164, h: 62, tone: "navy" },
  stakeholder: { x: 26, y: 274, w: 176, h: 62, tone: "blue" },
  perspective: { x: 262, y: 244, w: 190, h: 62, tone: "rust" },
  ad: { x: 506, y: 256, w: 220, h: 72, tone: "navy" },
  concern: { x: 78, y: 386, w: 176, h: 62, tone: "blue" },
  viewpoint: { x: 314, y: 392, w: 190, h: 62, tone: "blue" },
  view: { x: 594, y: 392, w: 164, h: 62, tone: "navy" },
  component: { x: 810, y: 392, w: 184, h: 62, tone: "rust" },
  aspect: { x: 798, y: 260, w: 162, h: 58, tone: "rust" },
  rationale: { x: 806, y: 132, w: 174, h: 54, tone: "paper" },
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function MapNode({ id, selected, onSelect }: { id: string; selected: string; onSelect: (id: string) => void }) {
  const p = nodePositions[id];
  const concept = concepts.find((item) => item.id === id);
  if (!p || !concept) return null;
  const isSelected = selected === id;
  return (
    <g className={`map-node map-node-${p.tone} ${isSelected ? "is-selected" : ""}`} onClick={() => onSelect(id)} role="button" tabIndex={0} aria-label={`Inspect ${concept.name}`} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onSelect(id); }}>
      <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="6" />
      <text x={p.x + 14} y={p.y + 22} className="node-kicker">{concept.category.toUpperCase()}</text>
      <text x={p.x + 14} y={p.y + 43} className="node-title">{concept.name}</text>
    </g>
  );
}

export default function Home() {
  const [activeEdition, setActiveEdition] = useState<Edition>("2022");
  const [selectedId, setSelectedId] = useState("ad");
  const [selectedC4, setSelectedC4] = useState("context");
  const [selectedMof, setSelectedMof] = useState("m3");
  const [selectedTogaf, setSelectedTogaf] = useState("preliminary");
  const [selectedArchiMate, setSelectedArchiMate] = useState("motivation");
  const [selectedDragon1, setSelectedDragon1] = useState("architecture");
  const [selectedMda, setSelectedMda] = useState("cim");
  const [selectedGeneralizedLevel, setSelectedGeneralizedLevel] = useState<GeneralizedNode["level"]>("architecture");
  const [selectedGeneralizedId, setSelectedGeneralizedId] = useState("gm-architecture");
  const [selectedSpecification, setSelectedSpecification] = useState<ArchitectureSpecification | null>(null);
  const [registrySearch, setRegistrySearch] = useState("");
  const [registryType, setRegistryType] = useState("all");
  const [registryVersion, setRegistryVersion] = useState("all");
  const [registryTag, setRegistryTag] = useState("all");
  const [registrySort, setRegistrySort] = useState<{ key: RegistrySortKey; direction: RegistrySortDirection }>({ key: "name", direction: "asc" });
  const [selectedArtifact, setSelectedArtifact] = useState("uml");
  const [xmiStep, setXmiStep] = useState("conform");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [storageFiles, setStorageFiles] = useState<StoredAtlasFile[]>([]);
  const [storageLoading, setStorageLoading] = useState(true);
  const [storageBusy, setStorageBusy] = useState(false);
  const [storageTitle, setStorageTitle] = useState("");
  const [storageDescription, setStorageDescription] = useState("");
  const [storageFile, setStorageFile] = useState<File | null>(null);

  const taxonomyStats = useMemo(() => getCatalogStats(), []);

  useEffect(() => {
    fetch("/api/files", { credentials: "include" })
      .then((response) => response.ok ? response.json() as Promise<StoredAtlasFile[]> : [])
      .then((files) => setStorageFiles(files))
      .catch(() => setStorageFiles([]))
      .finally(() => setStorageLoading(false));
  }, []);

  const uploadArtifact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!storageFile || !storageTitle.trim()) {
      toast.info("Choose a file and add a title first");
      return;
    }
    setStorageBusy(true);
    try {
      const bytes = new Uint8Array(await storageFile.arrayBuffer());
      const response = await fetch("/api/files/upload", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: storageFile.name, title: storageTitle.trim(), description: storageDescription.trim(), mimeType: storageFile.type || "application/octet-stream", dataBase64: encodeBytes(bytes) }),
      });
      const payload = await response.json() as StoredAtlasFile | { message?: string };
      if (!response.ok) throw new Error("message" in payload ? payload.message : "Upload failed");
      setStorageFiles((files) => [payload as StoredAtlasFile, ...files]);
      setStorageTitle("");
      setStorageDescription("");
      setStorageFile(null);
      const input = event.currentTarget.elements.namedItem("atlas-file") as HTMLInputElement | null;
      if (input) input.value = "";
      toast.success("Artifact saved to your private shelf");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setStorageBusy(false);
    }
  };

  const removeArtifact = async (id: number) => {
    setStorageBusy(true);
    try {
      const response = await fetch(`/api/files/${id}`, { method: "DELETE", credentials: "include" });
      if (!response.ok) throw new Error("Could not remove artifact");
      setStorageFiles((files) => files.filter((file) => file.id !== id));
      toast.success("Artifact removed from the shelf");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setStorageBusy(false);
    }
  };

  const selected = concepts.find((concept) => concept.id === selectedId) ?? concepts[3];
  const selectedC4Level = c4Levels.find((level) => level.id === selectedC4) ?? c4Levels[0];
  const selectedMofLayer = mofLayers.find((layer) => layer.id === selectedMof) ?? mofLayers[0];
  const selectedTogafStep = togafSteps.find((step) => step.id === selectedTogaf) ?? togafSteps[0];
  const selectedArchiMateLayer = archiMateLayers.find((layer) => layer.id === selectedArchiMate) ?? archiMateLayers[0];
  const selectedDragon1Package = dragon1Packages.find((item) => item.id === selectedDragon1) ?? dragon1Packages[0];
  const selectedMdaStage = mdaStages.find((item) => item.id === selectedMda) ?? mdaStages[0];
  const selectedGeneralized = generalizedNodes.find((node) => node.id === selectedGeneralizedId) ?? generalizedNodes[0];
  const visibleGeneralizedNodes = generalizedNodes.filter((node) => node.level === selectedGeneralizedLevel);
  const selectedArtifactExample = artifactExamples.find((artifact) => artifact.id === selectedArtifact) ?? artifactExamples[0];
  const selectedXmiStep = xmiSteps.find((step) => step.id === xmiStep) ?? xmiSteps[0];
  const registryTypes = useMemo(() => Array.from(new Set(architectureSpecificationRegistry.map((specification) => specification.kind))).sort(), []);
  const registryVersions = useMemo(() => Array.from(new Set(architectureSpecificationRegistry.map((specification) => specification.version))).sort(), []);
  const registryTags = useMemo(() => Array.from(new Set(architectureSpecificationRegistry.flatMap((specification) => specification.tags))).sort(), []);
  const filteredRegistry = useMemo(() => {
    const needle = registrySearch.trim().toLowerCase();
    const rows = architectureSpecificationRegistry.filter((specification) => {
      const metadataSearch = Object.entries(specification.metadata ?? {}).flatMap(([key, value]) => [key, ...metadataValueParts(value)]).join(" ");
      const searchable = `${specification.name} ${specification.acronym} ${specification.kind} ${specification.version} ${specification.primaryQuestion} ${specification.abstraction} ${specification.primaryArtifact} ${specification.interoperability} ${specification.tags.join(" ")} ${metadataSearch}`.toLowerCase();
      return (!needle || searchable.includes(needle)) && (registryType === "all" || specification.kind === registryType) && (registryVersion === "all" || specification.version === registryVersion) && (registryTag === "all" || specification.tags.includes(registryTag));
    });
    return [...rows].sort((a, b) => {
      const left = registrySort.key === "name" ? a.name : a[registrySort.key];
      const right = registrySort.key === "name" ? b.name : b[registrySort.key];
      const comparison = String(left).localeCompare(String(right), undefined, { numeric: true, sensitivity: "base" });
      return registrySort.direction === "asc" ? comparison : -comparison;
    });
  }, [registrySearch, registrySort, registryTag, registryType, registryVersion]);
  const selectedMetamodelMappings = selectedSpecification ? frameworkMetamodelMappings[selectedSpecification.id] ?? [] : [];
  const filteredConcepts = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return concepts;
    return concepts.filter((concept) => `${concept.name} ${concept.short} ${concept.detail} ${concept.category}`.toLowerCase().includes(needle));
  }, [search]);

  const selectConcept = (id: string) => {
    setSelectedId(id);
    const concept = concepts.find((item) => item.id === id);
    if (concept?.anchor) scrollToId(concept.anchor);
  };

  const sharePage = async () => {
    const shareData = { title: "Architecture Models Atlas", text: "An interactive guide to the IEEE 1471 / ISO 42010, OMG MDA, TOGAF, ArchiMate, C4, and MOF architecture models.", url: window.location.href };
    try {
      const canShare = Boolean((navigator as Navigator & { share?: unknown }).share);
      if (canShare) await (navigator as Navigator & { share: (data: ShareData) => Promise<void> }).share(shareData);
      else await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success(canShare ? "Share sheet opened" : "Page link copied");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.info("Sharing was cancelled");
    }
  };

  const downloadAtlas = () => {
    const blob = new Blob([JSON.stringify({ title: "Architecture Models Atlas", source: "ISO Architecture / IEEE 1471 + OMG MDA + C4 Model + OMG MOF + TOGAF + ArchiMate + Dragon1", architectureSpecificationRegistry, taxonomyModule: "client/src/lib/architecture-taxonomy.ts", taxonomyStats, editions, concepts, c4Levels, mofLayers, togafSteps, archiMateLayers, dragon1Packages, generalizedLevels, generalizedNodes, generalizedRelations, mappingRows, artifactExamples, xmiSteps }, null, 2)], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = "architecture-models-atlas.json";
    a.click();
    URL.revokeObjectURL(href);
    toast.success("Atlas data downloaded");
  };

  return (
    <div className="atlas-shell">
      <header className="topbar">
        <a href="#top" className="brand" aria-label="KNIGA in OZCO · Architecture Models Atlas home">
          <span className="brand-mark"><img src="/manus-storage/atlas-mark_d0d985a0.png" alt="" /></span>
          <span className="brand-copy"><strong className="brand-ozco">KNIGA</strong><em className="brand-computation">in OZCO</em></span>
        </a>
        <div className="topbar-meta"><span className="eyebrow">FIELD NOTE 01</span><span className="topbar-line" /><span>ISO 42010 · OMG MDA · TOGAF · ArchiMate · Dragon1</span></div>
        <div className="topbar-actions">
          <button className="icon-button mobile-menu" onClick={() => setMobileNav((value) => !value)} aria-label="Toggle navigation"><Menu size={18} /></button>
          <button className="text-button" onClick={downloadAtlas}><Download size={16} /> Save atlas</button>
          <button className="text-button primary" onClick={sharePage}>{copied ? <Check size={16} /> : <Share2 size={16} />} {copied ? "Copied" : "Share"}</button>
        </div>
      </header>

      <div className={`mobile-nav ${mobileNav ? "open" : ""}`}>
        { ["top", "context", "core", "c4", "mof", "mda", "togaf", "archimate", "dragon1", "metamodel", "registry", "mapping", "changes", "sources", "storage"].map((id) => <a key={id} href={`#${id}`} onClick={() => setMobileNav(false)}>{id === "top" ? "Overview" : id === "core" ? "Core model" : id === "c4" ? "C4 lens" : id === "mof" ? "MOF lens" : id === "mda" ? "MDA lens" : id === "togaf" ? "TOGAF" : id === "archimate" ? "ArchiMate" : id === "dragon1" ? "Dragon1" : id === "metamodel" ? "Metamodel" : id === "registry" ? "Registry" : id === "mapping" ? "Compare" : id === "changes" ? "Edition shifts" : id === "storage" ? "File Storage" : id[0].toUpperCase() + id.slice(1)}</a>)}
      </div>

      <div className="atlas-layout" id="top">
        <aside className="index-rail">
          <div className="rail-label">CONTENTS</div>
          <nav>
            <a className="rail-link active" href="#top"><span>01</span><b>Overview</b></a>
            <a className="rail-link" href="#context"><span>02</span><b>Context</b></a>
            <a className="rail-link" href="#core"><span>03</span><b>Core model</b></a>
            <a className="rail-link" href="#c4"><span>04</span><b>C4 lens</b></a>
            <a className="rail-link" href="#mof"><span>05</span><b>MOF lens</b></a>
            <a className="rail-link" href="#mda"><span>06</span><b>MDA</b></a>
            <a className="rail-link" href="#togaf"><span>07</span><b>TOGAF</b></a>
            <a className="rail-link" href="#archimate"><span>08</span><b>ArchiMate</b></a>
            <a className="rail-link" href="#dragon1"><span>09</span><b>Dragon1</b></a>
            <a className="rail-link" href="#metamodel"><span>10</span><b>Metamodel</b></a>
            <a className="rail-link" href="#registry"><span>11</span><b>Registry</b></a>
            <a className="rail-link" href="#mapping"><span>12</span><b>Compare</b></a>
            <a className="rail-link" href="#changes"><span>13</span><b>Edition shifts</b></a>
            <a className="rail-link" href="#sources"><span>14</span><b>Sources</b></a>
            <a className="rail-link" href="#storage"><span>15</span><b>File Storage</b></a>
          </nav>
          <div className="rail-foot"><span className="rail-dot" />Interactive research note<br /><small>Last framed · 2022 edition</small></div>
        </aside>

        <main className="atlas-main">
          <section className="hero-section">
            <div className="hero-image" />
            <div className="hero-overlay" />
            <div className="hero-content">
              <div className="hero-kicker"><span className="orange-rule" /> A visual guide to architecture description</div>
              <h1>Make the <i>architecture</i><br />of the model visible.</h1>
              <p className="hero-deck">A field guide to architecture description, software zoom, metamodeling, and enterprise architecture—what the terms mean, how they connect, and where each lens is useful.</p>
              <div className="hero-actions"><button className="hero-cta" onClick={() => scrollToId("core")}>Explore the model <ArrowDownRight size={17} /></button><span className="hero-source">Research based on three published editions<br /><b>2000 · 2011 · 2022</b></span></div>
            </div>
            <div className="hero-stamp"><span>ATLAS</span><strong>01</strong><small>MODEL / TRACE</small></div>
          </section>

          <section className="intro-band">
            <div className="intro-lead"><span className="section-number">01</span><div><div className="eyebrow">ORIENTATION</div><h2>A standard for expressing architecture—not prescribing it.</h2></div></div>
            <div className="intro-copy"><p>ISO/IEC/IEEE 42010 establishes requirements for the <strong>structure and expression</strong> of an Architecture Description (AD). It distinguishes an entity’s architecture from the AD that expresses it, and leaves the choice of process, tool, notation, and media open.</p><a href="#sources" className="inline-link">Read the source trail <ChevronRight size={15} /></a></div>
          </section>

          <section className="stat-strip" aria-label="Atlas at a glance">
            <div><span className="stat-value">{String(architectureSpecificationCount).padStart(2, "0")}</span><span className="stat-label">architecture specs registered</span></div>
            <div><span className="stat-value">20</span><span className="stat-label">named concepts in current atlas</span></div>
            <div><span className="stat-value">03</span><span className="stat-label">enterprise architecture additions</span></div>
            <div><span className="stat-value accent">∞</span><span className="stat-label">ways to assemble an AD</span></div>
          </section>

          <section className="section-block context-section" id="context">
            <div className="section-heading"><div className="section-marker"><span>02</span><span className="marker-line" /></div><div><div className="eyebrow">THE FIELD AROUND THE AD</div><h2>Start with the thing, its world, and what is fundamental.</h2></div></div>
            <div className="context-grid">
              <div className="context-art"><img src="/manus-storage/architecture-map_f06cf696.jpg" alt="Abstract editorial systems map with connected nodes and tracing paper layers" /><div className="art-caption">A model is never just a diagram. It is a deliberate cut through a wider field of influence.</div></div>
              <div className="context-notes">
                {concepts.filter((concept) => concept.category === "Context").map((concept, index) => <button className={`note-card ${selectedId === concept.id ? "selected" : ""}`} key={concept.id} onClick={() => setSelectedId(concept.id)}><span className="note-index">0{index + 1}</span><span><strong>{concept.name}</strong><small>{concept.short}</small></span><ChevronRight size={17} /></button>)}
                <blockquote>“Fundamental concepts or properties of a system in its environment…”<cite>— definition of architecture, ISO/IEC/IEEE 42010:2011</cite></blockquote>
              </div>
            </div>
          </section>

          <section className="section-block core-section" id="core">
            <div className="section-heading core-heading"><div className="section-marker"><span>03</span><span className="marker-line" /></div><div><div className="eyebrow">THE CORE MODEL</div><h2>Trace the line from concern to view.</h2><p className="section-intro">The Architecture Description is the center of gravity. Stakeholders bring concerns; viewpoints frame them; views address them through models or view components.</p></div></div>
            <div className="model-board">
              <div className="board-topline"><span><CircleDot size={14} /> click a node to inspect</span><span className="board-legend"><i className="legend-dot navy" />core <i className="legend-dot blue" />relationship <i className="legend-dot rust" />2022 delta</span></div>
              <svg className="model-map" viewBox="0 0 1020 490" role="img" aria-label="Interactive architecture description conceptual model map">
                <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#9aa8b7" /></marker><marker id="arrow-rust" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#c65d3a" /></marker></defs>
                <g className="map-links" fill="none" stroke="#9aa8b7" strokeWidth="1.4" markerEnd="url(#arrow)">
                  <path d="M432 80 L190 132" /><path d="M432 80 L670 132" /><path d="M280 163 L590 163" /><path d="M202 304 L506 288" /><path d="M202 304 L166 386" /><path d="M452 275 L590 424" /><path d="M726 292 L594 424" /><path d="M504 423 L594 423" /><path d="M758 423 L810 423" /><path d="M690 194 L838 188" />
                </g>
                <g className="map-links rust-links" fill="none" stroke="#c65d3a" strokeWidth="1.6" strokeDasharray="5 5" markerEnd="url(#arrow-rust)"><path d="M358 244 L190 194" /><path d="M798 288 L758 424" /><path d="M452 275 L798 288" /></g>
                <g className="map-labels"><text x="310" y="105">is situated in</text><text x="508" y="105">has</text><text x="342" y="151">expresses</text><text x="336" y="258">frames</text><text x="220" y="350">holds</text><text x="510" y="365">governs</text><text x="736" y="365">reflected in</text><text x="778" y="230" className="rust-label">2022 trace</text></g>
                {Object.keys(nodePositions).map((id) => <MapNode key={id} id={id} selected={selectedId} onSelect={selectConcept} />)}
              </svg>
              <div className="selection-drawer"><div><span className="drawer-label">SELECTED CONCEPT</span><h3>{selected.name}</h3><p>{selected.detail}</p></div><div className="drawer-meta"><span>{selected.category}</span><span>{selected.edition}</span><button onClick={() => scrollToId("explorer")}>Open in explorer <ArrowUpRight size={14} /></button></div></div>
            </div>
          </section>

          <section className="section-block c4-section" id="c4">
            <div className="section-heading"><div className="section-marker"><span>04</span><span className="marker-line" /></div><div><div className="eyebrow">THE C4 LENS</div><h2>Zoom from system context to code.</h2><p className="section-intro">C4 gives the architecture conversation a sequence of useful zoom levels. It is a complementary lens: where ISO 42010 frames concerns and views, C4 gives software teams a lightweight way to choose the granularity of those views.</p></div></div>
            <div className="c4-board">
              <div className="c4-board-top"><div><span className="eyebrow">HIERARCHICAL ABSTRACTIONS</span><h3>One system. Four conversations.</h3></div><div className="c4-independence"><span><Layers3 size={15} /> notation independent</span><span><Network size={15} /> tooling independent</span></div></div>
              <div className="c4-layout">
                <div className="c4-ladder" aria-label="Interactive C4 Model levels">
                  {c4Levels.map((level) => <button key={level.id} className={`c4-level c4-${level.tone} ${selectedC4 === level.id ? "selected" : ""}`} onClick={() => setSelectedC4(level.id)}><span className="c4-level-number">{level.level}</span><span className="c4-level-copy"><strong>{level.abstraction}</strong><small>{level.diagram}</small></span><ChevronRight size={17} /></button>)}
                </div>
                <div className="c4-readout"><div className="c4-readout-top"><span className="c4-readout-number">{selectedC4Level.level}</span><span className="category-tag">{selectedC4Level.diagram}</span></div><h3>{selectedC4Level.title}</h3><p>{selectedC4Level.purpose}</p><div className="c4-meta"><div><span className="eyebrow">WHO IT HELPS</span><strong>{selectedC4Level.audience}</strong></div><div><span className="eyebrow">THE OUTPUT</span><strong>{selectedC4Level.artifact}</strong></div></div><div className="c4-bridge"><Link2 size={16} /><span><strong>Bridge to the atlas:</strong> a C4 level can become an Architecture View, governed by a viewpoint and selected to address a concern.</span></div></div>
              </div>
              <div className="c4-supporting"><span className="eyebrow">SUPPORTING DIAGRAMS</span><span>System landscape</span><span>Dynamic</span><span>Deployment</span></div>
            </div>
          </section>

          <section className="section-block mof-section" id="mof">
            <div className="section-heading"><div className="section-marker"><span>05</span><span className="marker-line" /></div><div><div className="eyebrow">THE MOF LENS</div><h2>See the language behind the model.</h2><p className="section-intro">The OMG Meta-Object Facility adds a different kind of depth: not another architecture view, but the metamodeling infrastructure that lets languages, models, and tools interoperate.</p></div></div>
            <div className="mof-board">
              <div className="mof-board-top"><div><span className="eyebrow">FOUR-LAYER METAMODELING FRAME</span><h3>From language definition to lived instances.</h3></div><div className="mof-capabilities"><span><Layers3 size={15} /> define</span><span><Network size={15} /> transform</span><span><Download size={15} /> exchange</span></div></div>
              <div className="mof-layout">
                <div className="mof-stack" aria-label="Interactive MOF metamodeling layers">
                  {mofLayers.map((layer) => <button key={layer.id} className={`mof-layer mof-${layer.tone} ${selectedMof === layer.id ? "selected" : ""}`} onClick={() => setSelectedMof(layer.id)}><span className="mof-layer-level">{layer.level}</span><span className="mof-layer-copy"><strong>{layer.label}</strong><small>{layer.example}</small></span><ChevronRight size={17} /></button>)}
                </div>
                <div className="mof-readout"><div className="mof-readout-top"><span className="mof-readout-level">{selectedMofLayer.level}</span><span className="category-tag">{selectedMofLayer.label}</span></div><h3>{selectedMofLayer.title}</h3><p>{selectedMofLayer.purpose}</p><div className="mof-meta"><div><span className="eyebrow">EXAMPLE</span><strong>{selectedMofLayer.example}</strong></div><div><span className="eyebrow">WHO IT HELPS</span><strong>{selectedMofLayer.audience}</strong></div><div><span className="eyebrow">OUTPUT</span><strong>{selectedMofLayer.output}</strong></div></div><div className="mof-bridge"><Link2 size={16} /><span><strong>Bridge to the atlas:</strong> ISO 42010 frames architecture description; C4 chooses a software-architecture zoom; MOF explains how a modeling language and its artifacts can be defined, exchanged, stored, transformed, and used for code generation.</span></div></div>
              </div>
              <div className="mof-flow"><span>MOF-based language</span><ChevronRight size={15} /><span>model artifact</span><ChevronRight size={15} /><span>XMI / repository</span><ChevronRight size={15} /><span>transformation / code</span></div>
            </div>
          </section>


          <section className="section-block ea-section mda-section" id="mda">
            <div className="section-heading"><div className="section-marker"><span>06</span><span className="marker-line" /></div><div><div className="eyebrow">THE OMG MDA LENS</div><h2>Keep the model stable while platforms change.</h2><p className="section-intro">OMG’s Model Driven Architecture separates business and application logic from underlying platform technology. The flow below makes the CIM/PIM/PSM transformation chain visible and connects it to MOF, UML, XMI, repositories, and implementation.</p></div></div>
            <div className="ea-board mda-board">
              <div className="ea-board-top"><div><span className="eyebrow">OMG MDA GUIDE · MODEL TRANSFORMATION CHAIN</span><h3>From domain meaning to platform realization.</h3></div><div className="ea-badges"><span><Layers3 size={15} /> model levels</span><span><Link2 size={15} /> mappings</span><span><Network size={15} /> platforms</span></div></div>
              <div className="ea-layout">
                <div className="ea-steps" aria-label="Interactive OMG Model Driven Architecture stages">{mdaStages.map((stage) => <button key={stage.id} className={`ea-step ea-${stage.tone} ${selectedMda === stage.id ? "selected" : ""}`} onClick={() => setSelectedMda(stage.id)}><span className="ea-step-number">{stage.number}</span><span className="ea-step-copy"><strong>{stage.label}</strong><small>{stage.model}</small></span><ChevronRight size={16} /></button>)}</div>
                <div className="ea-readout mda-readout"><div className="ea-readout-top"><span className="ea-readout-number">{selectedMdaStage.number}</span><span className="category-tag">OMG MDA</span></div><h3>{selectedMdaStage.title}</h3><p>{selectedMdaStage.purpose}</p><div className="ea-meta"><span className="eyebrow">MODEL / ARTIFACT</span><strong>{selectedMdaStage.model} · {selectedMdaStage.artifact}</strong></div><div className="ea-bridge"><Link2 size={16} /><span><strong>Bridge to the atlas:</strong> MDA supplies a transformation architecture; MOF supplies the modeling foundation, ISO 42010 frames descriptions and concerns, and the other lenses provide concrete software or enterprise content.</span></div></div>
              </div>
              <div className="ea-foot"><span>CIM</span><ChevronRight size={14} /><span>PIM</span><ChevronRight size={14} /><span>mapping</span><ChevronRight size={14} /><span>PSM</span><ChevronRight size={14} /><span>XMI / repository</span><ChevronRight size={14} /><span>implementation</span></div>
            </div>
            <div className="archimate-note mda-note"><span className="eyebrow">SOURCE NOTE</span><p>OMG describes MDA as an approach for structuring software specifications as models. Its official overview identifies PIM-to-PSM transformation and names MOF, UML, XMI, and CWM as supporting standards. The MDA lens is therefore presented as a transformation and interoperability architecture, not as another diagram notation.</p><a href="https://www.omg.org/mda/" target="_blank" rel="noreferrer">Open OMG MDA overview <ExternalLink size={14} /></a><a href="https://www.omg.org/mda/specs.htm" target="_blank" rel="noreferrer">Open MDA specifications <ExternalLink size={14} /></a></div>
          </section>

          <section className="section-block ea-section" id="togaf">
            <div className="section-heading"><div className="section-marker"><span>06</span><span className="marker-line" /></div><div><div className="eyebrow">THE TOGAF LENS</div><h2>Move from architecture intent to governed change.</h2><p className="section-intro">The TOGAF Standard contributes a configurable enterprise-architecture method and body of guidance. It is a process and governance lens, not a diagram notation or metamodel replacement.</p></div></div>
            <div className="ea-board">
              <div className="ea-board-top"><div><span className="eyebrow">ARCHITECTURE DEVELOPMENT METHOD</span><h3>One cycle, many configured practices.</h3></div><div className="ea-badges"><span><Target size={15} /> method</span><span><Network size={15} /> governance</span><span><BookOpen size={15} /> guidance</span></div></div>
              <div className="ea-layout">
                <div className="ea-steps" aria-label="Interactive TOGAF ADM phases">{togafSteps.map((step) => <button key={step.id} className={`ea-step ea-${step.tone} ${selectedTogaf === step.id ? "selected" : ""}`} onClick={() => setSelectedTogaf(step.id)}><span className="ea-step-number">{step.number}</span><span className="ea-step-copy"><strong>{step.label}</strong><small>{step.output}</small></span><ChevronRight size={16} /></button>)}</div>
                <div className="ea-readout"><div className="ea-readout-top"><span className="ea-readout-number">{selectedTogafStep.number}</span><span className="category-tag">TOGAF ADM</span></div><h3>{selectedTogafStep.title}</h3><p>{selectedTogafStep.purpose}</p><div className="ea-bridge"><Link2 size={16} /><span><strong>Bridge to the atlas:</strong> TOGAF supplies the lifecycle and governance context in which ISO 42010 architecture descriptions are commissioned, maintained, reviewed, and used to guide change.</span></div></div>
              </div>
              <div className="ea-foot"><span>Fundamental Content</span><ChevronRight size={14} /><span>configured Architecture Capability</span><ChevronRight size={14} /><span>Series Guides</span><ChevronRight size={14} /><span>enterprise-specific practice</span></div>
            </div>
          </section>

          <section className="section-block ea-section archimate-section" id="archimate">
            <div className="section-heading"><div className="section-marker"><span>07</span><span className="marker-line" /></div><div><div className="eyebrow">THE ARCHIMATE METAMODEL</div><h2>Give enterprise relationships a common language.</h2><p className="section-intro">ArchiMate is an open, independent Enterprise Architecture modeling language. Its metamodel defines the elements and relationships that make cross-domain architecture communication more unambiguous.</p></div></div>
            <div className="ea-board archimate-board">
              <div className="ea-board-top"><div><span className="eyebrow">CORE LANGUAGE STRUCTURE</span><h3>From motivation to realization.</h3></div><div className="ea-badges"><span><Layers3 size={15} /> layers</span><span><Link2 size={15} /> relationships</span><span><Download size={15} /> exchange</span></div></div>
              <div className="ea-layout">
                <div className="ea-steps" aria-label="Interactive ArchiMate metamodel layers">{archiMateLayers.map((layer) => <button key={layer.id} className={`ea-step ea-${layer.tone} ${selectedArchiMate === layer.id ? "selected" : ""}`} onClick={() => setSelectedArchiMate(layer.id)}><span className="ea-step-number">{layer.level}</span><span className="ea-step-copy"><strong>{layer.label}</strong><small>{layer.elements}</small></span><ChevronRight size={16} /></button>)}</div>
                <div className="ea-readout archimate-readout"><div className="ea-readout-top"><span className="ea-readout-number">{selectedArchiMateLayer.level}</span><span className="category-tag">ARCHIMATE METAMODEL</span></div><h3>{selectedArchiMateLayer.title}</h3><p>{selectedArchiMateLayer.purpose}</p><div className="ea-meta"><span className="eyebrow">REPRESENTATIVE ELEMENTS</span><strong>{selectedArchiMateLayer.elements}</strong></div><div className="ea-bridge"><Link2 size={16} /><span><strong>Bridge to TOGAF:</strong> TOGAF provides the architecture practice and lifecycle; ArchiMate provides a language for expressing the resulting viewpoints, domains, dependencies, and change relationships.</span></div></div>
              </div>
              <div className="ea-foot"><span>motivation</span><ChevronRight size={14} /><span>strategy</span><ChevronRight size={14} /><span>business / application</span><ChevronRight size={14} /><span>technology / implementation</span></div>
            </div>
            <div className="archimate-note"><span className="eyebrow">SOURCE NOTE</span><p>The supplied <strong>G201</strong> publication is an Information Architecture reference model, published in 2020, and includes an ArchiMate Exchange File Format model. It is shown here as an example of a concrete ArchiMate model artifact; the language/metamodel framing comes from The Open Group’s ArchiMate specification overview.</p><a href="https://publications.opengroup.org/archimate-library/archimate-models/g201" target="_blank" rel="noreferrer">Open G201 model record <ExternalLink size={14} /></a></div>
          </section>


          <section className="section-block ea-section dragon1-section" id="dragon1">
            <div className="section-heading"><div className="section-marker"><span>08</span><span className="marker-line" /></div><div><div className="eyebrow">THE DRAGON1 LENS</div><h2>Model the enterprise as a total concept.</h2><p className="section-intro">Dragon1 contributes an open enterprise architecture method, framework, and modeling language. Its meta model connects concepts, elements, components, stakeholders, requirements, strategy, projects, and realization so architecture can be designed as a coherent enterprise-wide system.</p></div></div>
            <div className="ea-board dragon1-board">
              <div className="ea-board-top"><div><span className="eyebrow">DRAGON1 STANDARD V2.1 · SIX PACKAGES</span><h3>From architecture core to realization.</h3></div><div className="ea-badges"><span><Layers3 size={15} /> entity classes</span><span><Link2 size={15} /> relationships</span><span><Network size={15} /> visual models</span></div></div>
              <div className="ea-layout">
                <div className="ea-steps" aria-label="Interactive Dragon1 Enterprise Architecture Meta Model packages">{dragon1Packages.map((item) => <button key={item.id} className={`ea-step ea-${item.tone} ${selectedDragon1 === item.id ? "selected" : ""}`} onClick={() => setSelectedDragon1(item.id)}><span className="ea-step-number">{item.number}</span><span className="ea-step-copy"><strong>{item.label}</strong><small>{item.entities}</small></span><ChevronRight size={16} /></button>)}</div>
                <div className="ea-readout dragon1-readout"><div className="ea-readout-top"><span className="ea-readout-number">{selectedDragon1Package.number}</span><span className="category-tag">DRAGON1 META MODEL</span></div><h3>{selectedDragon1Package.title}</h3><p>{selectedDragon1Package.purpose}</p><div className="ea-meta"><span className="eyebrow">REPRESENTATIVE ENTITY CLASSES</span><strong>{selectedDragon1Package.entities}</strong></div><div className="ea-bridge"><Link2 size={16} /><span><strong>Bridge to the atlas:</strong> Dragon1 broadens the metamodel conversation from formal description and language conformance to enterprise concepts, responsibilities, requirements, design, and realization.</span></div></div>
              </div>
              <div className="ea-foot"><span>meta-meta-model</span><ChevronRight size={14} /><span>meta model</span><ChevronRight size={14} /><span>model</span><ChevronRight size={14} /><span>instance / realization</span></div>
            </div>
            <div className="archimate-note dragon1-note"><span className="eyebrow">SOURCE NOTE</span><p>Dragon1 describes the Enterprise Architecture Meta Model as part of Dragon1 Standard V2.1 and presents it through six packages. Its EAML page distinguishes meta-meta-model, metamodel, and model levels and describes extension rules for new entity classes.</p><a href="https://www.dragon1.com/resources/dragon1/enterprise-architecture-meta-model" target="_blank" rel="noreferrer">Open Dragon1 meta model source <ExternalLink size={14} /></a></div>
          </section>

          <section className="section-block generalized-section" id="metamodel">
            <div className="section-heading"><div className="section-marker"><span>09</span><span className="marker-line" /></div><div><div className="eyebrow">GENERALIZED ARCHITECTURE METAMODEL</div><h2>From architecture to components to elements.</h2><p className="section-intro">This is a reusable synthesis model for architecture work—not a replacement standard. It gives the atlas a common vocabulary for describing the whole, its meaningful parts, and the atomic concepts that make relationships and decisions visible.</p></div></div>
            <div className="generalized-board">
              <div className="generalized-board-top"><div><span className="eyebrow">MODEL / 01 · ABSTRACT CORE</span><h3>A stable spine for different architecture languages.</h3></div><span className="info-pill">synthesis · not normative</span></div>
              <div className="generalized-level-tabs" role="tablist" aria-label="Generalized architecture model levels">{generalizedLevels.map((level) => <button key={level.id} role="tab" aria-selected={selectedGeneralizedLevel === level.id} className={`generalized-level generalized-${level.tone} ${selectedGeneralizedLevel === level.id ? "selected" : ""}`} onClick={() => { setSelectedGeneralizedLevel(level.id); setSelectedGeneralizedId(generalizedNodes.find((node) => node.level === level.id)?.id ?? "gm-architecture"); }}><span>{level.number}</span><strong>{level.label}</strong><small>{level.subtitle}</small></button>)}</div>
              <div className="generalized-layout"><div className="generalized-node-grid" role="tabpanel" aria-label={`${selectedGeneralizedLevel} model nodes`}>{visibleGeneralizedNodes.map((node) => <button key={node.id} className={`generalized-node generalized-${node.tone} ${selectedGeneralizedId === node.id ? "selected" : ""}`} onClick={() => setSelectedGeneralizedId(node.id)}><span className="generalized-node-kind">{node.kind}</span><strong>{node.name}</strong><small>{node.short}</small><ChevronRight size={15} /></button>)}</div><div className="generalized-readout"><div className="generalized-readout-top"><span className="generalized-readout-level">{selectedGeneralized.level === "architecture" ? "A" : selectedGeneralized.level === "component" ? "C" : "E"}</span><span className="category-tag">{selectedGeneralized.kind}</span></div><h3>{selectedGeneralized.name}</h3><p>{selectedGeneralized.detail}</p><div className="generalized-meta"><span className="eyebrow">EXAMPLES / NEIGHBORS</span><strong>{selectedGeneralized.examples}</strong></div><div className="generalized-bridge"><Link2 size={16} /><span><strong>Model rule:</strong> keep the selected concept traceable to its parent level, its responsibility, and the relationships that make it meaningful.</span></div></div></div>
              <div className="generalized-relations"><span className="eyebrow">RELATIONSHIP SPINE</span>{generalizedRelations.map((item) => <div className="generalized-relation" key={`${item.from}-${item.to}`}><strong>{item.from}</strong><span>{item.relation}</span><strong>{item.to}</strong><small>{item.note}</small></div>)}</div>
            </div>
          </section>

          <section className="section-block registry-section" id="registry">
            <div className="section-heading"><div className="section-marker"><span>10</span><span className="marker-line" /></div><div><div className="eyebrow">ARCHITECTURE SPECIFICATION REGISTRY</div><h2>One row for every architecture lens.</h2><p className="section-intro">Search, filter, and sort the atlas’s typed index of standards, models, methods, metamodeling infrastructure, modeling languages, and the generalized synthesis. Select a row to inspect its full metamodel-oriented profile.</p></div></div>
            <div className="registry-table-card"><div className="registry-card-top"><div><span className="eyebrow">DYNAMIC DATA TABLE</span><h3>{filteredRegistry.length} of {architectureSpecificationCount} specifications</h3></div><span className="info-pill">click a row to explore</span></div><div className="registry-controls"><label className="registry-search"><Search size={16} /><span className="sr-only">Search architecture registry</span><input value={registrySearch} onChange={(event) => setRegistrySearch(event.target.value)} placeholder="Search names, questions, artifacts, tags…" />{registrySearch && <button type="button" onClick={() => setRegistrySearch("")} aria-label="Clear registry search"><X size={14} /></button>}</label><label><span>Type</span><select value={registryType} onChange={(event) => setRegistryType(event.target.value)}><option value="all">All types</option>{registryTypes.map((type) => <option key={type} value={type}>{type.replaceAll("-", " ")}</option>)}</select></label><label><span>Version</span><select value={registryVersion} onChange={(event) => setRegistryVersion(event.target.value)}><option value="all">All versions</option>{registryVersions.map((version) => <option key={version} value={version}>{version}</option>)}</select></label><label><span>Tag</span><select value={registryTag} onChange={(event) => setRegistryTag(event.target.value)}><option value="all">All tags</option>{registryTags.map((tag) => <option key={tag} value={tag}>{tag}</option>)}</select></label><button type="button" className="registry-reset" onClick={() => { setRegistrySearch(""); setRegistryType("all"); setRegistryVersion("all"); setRegistryTag("all"); setRegistrySort({ key: "name", direction: "asc" }); }} disabled={!registrySearch && registryType === "all" && registryVersion === "all" && registryTag === "all" && registrySort.key === "name" && registrySort.direction === "asc"}><Filter size={14} /> Reset</button></div><div className="registry-filter-summary"><span><Filter size={14} /> {filteredRegistry.length} matching rows</span><span>Sort any column · press Enter on a row to inspect</span></div><div className="registry-table-wrap"><table className="registry-table"><caption className="sr-only">Architecture specification registry</caption><thead><tr><th scope="col"><button type="button" className="registry-sort" onClick={() => { const direction = registrySort.key === "name" && registrySort.direction === "asc" ? "desc" : "asc"; setRegistrySort({ key: "name", direction }); }} aria-label="Sort by specification name">Specification <ArrowUpDown size={13} /></button></th><th scope="col"><button type="button" className="registry-sort" onClick={() => { const direction = registrySort.key === "kind" && registrySort.direction === "asc" ? "desc" : "asc"; setRegistrySort({ key: "kind", direction }); }} aria-label="Sort by type">Type <ArrowUpDown size={13} /></button></th><th scope="col"><button type="button" className="registry-sort" onClick={() => { const direction = registrySort.key === "version" && registrySort.direction === "asc" ? "desc" : "asc"; setRegistrySort({ key: "version", direction }); }} aria-label="Sort by version">Version <ArrowUpDown size={13} /></button></th><th scope="col"><button type="button" className="registry-sort" onClick={() => { const direction = registrySort.key === "primaryQuestion" && registrySort.direction === "asc" ? "desc" : "asc"; setRegistrySort({ key: "primaryQuestion", direction }); }} aria-label="Sort by primary question">Primary question <ArrowUpDown size={13} /></button></th><th scope="col"><button type="button" className="registry-sort" onClick={() => { const direction = registrySort.key === "abstraction" && registrySort.direction === "asc" ? "desc" : "asc"; setRegistrySort({ key: "abstraction", direction }); }} aria-label="Sort by metamodel focus">Metamodel focus <ArrowUpDown size={13} /></button></th><th scope="col"><span className="sr-only">Action</span></th></tr></thead><tbody>{filteredRegistry.length ? filteredRegistry.map((specification) => <tr key={specification.id} tabIndex={0} role="button" aria-label={`Explore ${specification.name} specification`} onClick={() => setSelectedSpecification(specification)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedSpecification(specification); } }}><td><div className="registry-name"><strong>{specification.name}</strong><span>{specification.acronym}</span></div></td><td><span className={`registry-kind registry-kind-${specification.kind}`}>{specification.kind.replaceAll("-", " ")}</span></td><td>{specification.version}</td><td className="registry-question">{specification.primaryQuestion}</td><td className="registry-abstraction">{specification.abstraction}</td><td><ChevronRight size={16} /></td></tr>) : <tr className="registry-empty"><td colSpan={6}><strong>No registry rows match these filters.</strong><span>Try clearing a filter or searching for another framework, artifact, or tag.</span></td></tr>}</tbody></table></div></div>
          </section>

          <section className="section-block mapping-section" id="mapping">
            <div className="section-heading"><div className="section-marker"><span>11</span><span className="marker-line" /></div><div><div className="eyebrow">CROSS-MODEL MAPPING</div><h2>Six lenses. One architecture conversation.</h2><p className="section-intro">ISO 42010 governs why an architecture is described; C4 chooses a software zoom; MOF explains metamodeling and exchange; TOGAF structures enterprise architecture work; ArchiMate supplies a cross-domain modeling language; Dragon1 supplies an enterprise concept and realization vocabulary.</p></div></div>
            <div className="mapping-table-wrap"><table className="mapping-table"><thead><tr><th>Compare by</th><th><span className="mapping-kicker iso">ISO 42010</span><strong>Architecture description</strong></th><th><span className="mapping-kicker c4">C4</span><strong>Software architecture zoom</strong></th><th><span className="mapping-kicker mof">MOF</span><strong>Metamodeling infrastructure</strong></th><th><span className="mapping-kicker togaf">TOGAF</span><strong>EA method & governance</strong></th><th><span className="mapping-kicker archimate">ArchiMate</span><strong>EA modeling language</strong></th><th><span className="mapping-kicker dragon1">Dragon1</span><strong>EA metamodel & language</strong></th><th><span className="mapping-kicker mda">OMG MDA</span><strong>Transformation architecture</strong></th></tr></thead><tbody>{mappingRows.map((row) => <tr key={row.topic}><th scope="row">{row.topic}</th><td>{row.iso}</td><td>{row.c4}</td><td>{row.mof}</td><td>{row.togaf}</td><td>{row.archimate}</td><td>{row.dragon1}</td><td>{row.mda}</td></tr>)}</tbody></table></div>
            <div className="artifact-desk"><div className="desk-heading"><div><span className="eyebrow">ARTIFACT DESK</span><h3>See the model and the language behind it.</h3></div><span className="info-pill">illustrative examples</span></div><div className="artifact-tabs">{artifactExamples.map((artifact) => <button key={artifact.id} className={selectedArtifact === artifact.id ? "active" : ""} onClick={() => setSelectedArtifact(artifact.id)}><span>{artifact.label}</span><small>{artifact.kicker}</small></button>)}</div><div className="artifact-layout"><div className={`artifact-canvas artifact-${selectedArtifact}`} aria-label={`${selectedArtifactExample.label} illustrative artifact`}>{selectedArtifact === "uml" ? <><div className="artifact-class customer"><strong>Customer</strong><span>id: UUID</span><span>name: String</span></div><div className="artifact-connector one" /><div className="artifact-card-label">places</div><div className="artifact-class order"><strong>Order</strong><span>number: String</span><span>status: Status</span></div><div className="artifact-connector two" /><div className="artifact-card-label line">contains</div><div className="artifact-class line-item"><strong>OrderLine</strong><span>quantity: Integer</span><span>price: Money</span></div></> : <><div className="artifact-class meta-class"><strong>Class</strong><span>name: String</span><span>ownedAttribute: Property[*]</span></div><div className="artifact-connector meta-one" /><div className="artifact-class meta-property"><strong>Property</strong><span>name: String</span><span>type: Type</span></div><div className="artifact-connector meta-two" /><div className="artifact-class meta-type"><strong>Type</strong><span>isAbstract: Boolean</span></div><div className="artifact-card-label meta-label">defines the language</div></>}</div><div className="artifact-readout"><span className="eyebrow">{selectedArtifactExample.kicker}</span><h3>{selectedArtifactExample.title}</h3><p>{selectedArtifactExample.description}</p><div className="artifact-note"><BookOpen size={15} /> {selectedArtifactExample.note}</div></div></div></div>
            <div className="xmi-walkthrough"><div className="xmi-heading"><div><span className="eyebrow">XMI EXCHANGE WALKTHROUGH</span><h3>From a model on one desk to an artifact another tool can read.</h3></div><span className="info-pill">simplified teaching flow</span></div><div className="xmi-layout"><div className="xmi-steps">{xmiSteps.map((step) => <button key={step.id} className={`xmi-step ${xmiStep === step.id ? "active" : ""}`} onClick={() => setXmiStep(step.id)}><span>{step.number}</span><strong>{step.label}</strong><ChevronRight size={15} /></button>)}</div><div className="xmi-readout"><div className="xmi-readout-top"><span className="xmi-number">{selectedXmiStep.number}</span><span className="category-tag">{selectedXmiStep.label}</span></div><h3>{selectedXmiStep.title}</h3><p>{selectedXmiStep.copy}</p><pre><code>{selectedXmiStep.snippet}</code></pre><div className="xmi-foot"><Link2 size={15} /><span>XMI is the exchange representation; MOF and the source metamodel supply the meaning of the objects being exchanged.</span></div></div></div></div>
          </section>

          <section className="section-block explorer-section" id="explorer">
            <div className="explorer-top"><div className="section-heading compact"><div className="section-marker"><span>08A</span><span className="marker-line" /></div><div><div className="eyebrow">CONCEPT EXPLORER</div><h2>Build your own glossary.</h2></div></div><div className="search-wrap"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a concept…" aria-label="Find a concept" />{search && <button onClick={() => setSearch("")} aria-label="Clear search"><X size={15} /></button>}</div></div>
            <div className="filter-row"><span><Filter size={14} /> {filteredConcepts.length} concepts surfaced</span><span>Click any card for a closer read</span></div>
            <div className="concept-grid">{filteredConcepts.map((concept) => <button className={`concept-card ${selectedId === concept.id ? "selected" : ""}`} key={concept.id} onClick={() => setSelectedId(concept.id)}><div className="concept-card-top"><span className="category-tag">{concept.category}</span><span className="concept-edition">{concept.edition}</span></div><h3>{concept.name}</h3><p>{concept.short}</p><span className="concept-read">Inspect <ChevronRight size={14} /></span></button>)}</div>
          </section>

          <section className="section-block changes-section" id="changes">
            <div className="section-heading"><div className="section-marker"><span>12</span><span className="marker-line" /></div><div><div className="eyebrow">EDITION SHIFTS</div><h2>What changed—and what stayed foundational.</h2><p className="section-intro">The vocabulary grows, but its organizing question remains stable: how does an AD help people express and reason about an architecture?</p></div></div>
            <div className="changes-grid"><div className="chart-card"><div className="card-heading"><div><span className="eyebrow">ATLAS INVENTORY</span><h3>Named elements surfaced</h3></div><span className="info-pill">derived count</span></div><div className="chart-wrap"><ResponsiveContainer width="100%" height={230}><BarChart data={chartData} margin={{ top: 12, right: 8, left: -18, bottom: 6 }}><CartesianGrid strokeDasharray="2 5" vertical={false} stroke="#d7d1c7" /><XAxis dataKey="edition" tick={{ fill: "#6a7180", fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} /><YAxis domain={[0, 16]} tick={{ fill: "#8a8c93", fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} /><Tooltip cursor={{ fill: "#f0ebe3" }} contentStyle={{ border: "1px solid #d6cfc4", borderRadius: 6, fontFamily: "IBM Plex Sans", fontSize: 12, boxShadow: "0 10px 30px rgba(41,48,60,.08)" }} /><Bar dataKey="concepts" radius={[4, 4, 0, 0]}>{chartData.map((entry) => <Cell key={entry.edition} fill={entry.fill} />)}</Bar></BarChart></ResponsiveContainer></div><p className="chart-footnote">A reading aid for this atlas, not a claim about the number of terms in the standards themselves.</p></div>
              <div className="delta-card"><div className="delta-card-head"><span className="eyebrow">2022 / NEW LENS</span><span className="delta-arrow"><ArrowUpRight size={16} /></span></div><h3>From a system to an entity.<br />From models to components.</h3><div className="delta-list"><div><span className="delta-num">01</span><p><strong>Entity of Interest</strong> broadens the subject beyond a System of Interest.</p></div><div><span className="delta-num">02</span><p><strong>Stakeholder Perspective</strong> groups concerns and organizes viewpoints.</p></div><div><span className="delta-num">03</span><p><strong>Architecture Aspect</strong> refines traceability between concerns and views.</p></div></div><button className="delta-link" onClick={() => { setActiveEdition("2022"); scrollToId("edition-switcher"); }}>Compare the editions <ChevronRight size={15} /></button></div></div>
            <div className="edition-switcher" id="edition-switcher"><div className="edition-switcher-head"><div><span className="eyebrow">LENS SELECTOR</span><h3>Read the same model through three frames.</h3></div><span className="selected-edition-label">{activeEdition} selected</span></div><div className="edition-tabs">{editions.map((edition) => <button key={edition.id} className={activeEdition === edition.id ? "active" : ""} onClick={() => setActiveEdition(edition.id)}><span>{edition.label}</span><strong>{edition.title}</strong><small>{edition.note}</small></button>)}</div><div className="edition-readout"><div className="readout-year">{activeEdition}</div><div><span className="eyebrow">THE SHORT READ</span><p>{activeEdition === "2022" ? "The current edition keeps the AD as the concrete expression of an architecture, while adding a wider subject, grouped stakeholder perspectives, and aspects that sharpen traceability." : activeEdition === "2011" ? "The first edition tightened the original framework around an Architecture Description, clarified concerns and viewpoints, and made the architecture-model relationship explicit." : "The origin model introduced the durable vocabulary: system, mission, environment, architecture, stakeholders, concerns, viewpoints, views, models, and rationale."}</p></div></div></div>
          </section>

          <section className="section-block sources-section" id="sources">
            <div className="section-heading"><div className="section-marker"><span>13</span><span className="marker-line" /></div><div><div className="eyebrow">SOURCE TRAIL</div><h2>Keep the reference close.</h2></div></div>
            <div className="sources-grid"><div className="source-intro"><BookOpen size={28} strokeWidth={1.5} /><p>This atlas is a visual interpretation of public conceptual-model pages, official specifications, and method references. Follow the source trail when you need the exact normative or framework-specific language.</p><button className="text-button primary" onClick={downloadAtlas}><Download size={16} /> Download extracted data</button></div><div className="source-list"><a href="http://www.iso-architecture.org/ieee-1471/cm/" target="_blank" rel="noreferrer"><span className="source-number">01</span><span><strong>ISO Architecture</strong><small>A Conceptual Model of Architecture Description · current and historical context</small></span><ExternalLink size={15} /></a><a href="http://www.iso-architecture.org/42010/cm/cm-1471-2000.html" target="_blank" rel="noreferrer"><span className="source-number">02</span><span><strong>IEEE 1471-2000 framework</strong><small>Original conceptual framework and definitions</small></span><ExternalLink size={15} /></a><a href="https://www.iso.org/standard/74393.html" target="_blank" rel="noreferrer"><span className="source-number">03</span><span><strong>ISO official publication</strong><small>ISO/IEC/IEEE 42010:2022 scope, status, and abstract</small></span><ExternalLink size={15} /></a><a href="https://blog.visual-paradigm.com/unveiling-the-power-of-c4-model-simplifying-software-architecture-diagrams/" target="_blank" rel="noreferrer"><span className="source-number">04</span><span><strong>Visual Paradigm C4 article</strong><small>Four levels of abstraction and corresponding diagrams</small></span><ExternalLink size={15} /></a><a href="https://c4model.com/" target="_blank" rel="noreferrer"><span className="source-number">05</span><span><strong>Official C4 Model site</strong><small>Supporting diagrams, notation independence, and tooling guidance</small></span><ExternalLink size={15} /></a><a href="https://www.omg.org/mof/" target="_blank" rel="noreferrer"><span className="source-number">06</span><span><strong>OMG MetaObject Facility</strong><small>Model interchange, transformation, repositories, XMI, and MDA context</small></span><ExternalLink size={15} /></a><a href="https://www.omg.org/spec/MOF/2.5.1/PDF" target="_blank" rel="noreferrer"><span className="source-number">07</span><span><strong>MOF Core Specification 2.5.1</strong><small>Authoritative technical specification for MOF Core</small></span><ExternalLink size={15} /></a><a href="https://www.opengroup.org/togaf" target="_blank" rel="noreferrer"><span className="source-number">08</span><span><strong>The Open Group TOGAF overview</strong><small>TOGAF Standard 10th Edition, ADM, Fundamental Content, and Series Guides</small></span><ExternalLink size={15} /></a><a href="https://publications.opengroup.org/togaf-library" target="_blank" rel="noreferrer"><span className="source-number">09</span><span><strong>TOGAF Library</strong><small>Official library organized by foundation, generic, industry, and organization-specific guidance</small></span><ExternalLink size={15} /></a><a href="https://www.opengroup.org/archimate-forum/archimate-overview" target="_blank" rel="noreferrer"><span className="source-number">10</span><span><strong>ArchiMate overview</strong><small>Open, independent Enterprise Architecture modeling language and exchange format context</small></span><ExternalLink size={15} /></a><a href="https://publications.opengroup.org/archimate-library/archimate-models/g201" target="_blank" rel="noreferrer"><span className="source-number">11</span><span><strong>ArchiMate G201 model</strong><small>Information Architecture reference model with an ArchiMate Exchange File Format model</small></span><ExternalLink size={15} /></a><a href="https://www.dragon1.com/resources/dragon1/enterprise-architecture-meta-model" target="_blank" rel="noreferrer"><span className="source-number">12</span><span><strong>Dragon1 Enterprise Architecture Meta Model</strong><small>Dragon1 Standard V2.1 core entity classes, relationships, and six packages</small></span><ExternalLink size={15} /></a><a href="https://www.dragon1.com/modeling-languages/dragon1" target="_blank" rel="noreferrer"><span className="source-number">13</span><span><strong>Dragon1 EA Modeling Language</strong><small>Meta-meta-model, metamodel, model levels, symbols, and extension rules</small></span><ExternalLink size={15} /></a><a href="https://www.dragon1.com/resources/dragon1/meta-models" target="_blank" rel="noreferrer"><span className="source-number">14</span><span><strong>Dragon1 Meta Models</strong><small>Entity classes, model conformance, generic submodels, and metamodel process</small></span><ExternalLink size={15} /></a><a href="https://www.dragon1.com/reference-models/enterprise-architecture-reference-model" target="_blank" rel="noreferrer"><span className="source-number">15</span><span><strong>Dragon1 EA Reference Model</strong><small>Enterprise governance, business, information, and IT infrastructure layers</small></span><ExternalLink size={15} /></a><a href="https://www.omg.org/mda/" target="_blank" rel="noreferrer"><span className="source-number">16</span><span><strong>OMG Model Driven Architecture</strong><small>MDA approach, platform independence, interoperability, and supporting standards</small></span><ExternalLink size={15} /></a><a href="https://www.omg.org/mda/specs.htm" target="_blank" rel="noreferrer"><span className="source-number">17</span><span><strong>OMG MDA Specifications</strong><small>PIM, PSM, MOF foundation, XMI exchange, and transformation context</small></span><ExternalLink size={15} /></a></div></div>
          </section>

          <section className="section-block storage-section" id="storage">
            <div className="section-heading"><div className="section-marker"><span>14</span><span className="marker-line" /></div><div><div className="eyebrow">PERSONAL ATLAS STORAGE</div><h2>Keep architecture artifacts close.</h2></div></div>
            <p className="storage-intro">Save taxonomy definitions, model files, decision records, and exchange artifacts to your private atlas shelf. File bytes live in built-in S3 storage; the database keeps only searchable metadata.</p>
            <div className="storage-board">
              <div className="storage-board-head"><div><span className="eyebrow">FILE STORAGE · 01</span><h3>Your private artifact shelf.</h3><small>Private to this browser session · 8 MB per file</small></div><span className="storage-lock">SESSION-SCOPED</span></div>
              <div className="storage-grid">
                <form className="storage-form" onSubmit={uploadArtifact}>
                  <label htmlFor="atlas-title">Artifact title</label>
                  <input id="atlas-title" value={storageTitle} onChange={(event) => setStorageTitle(event.target.value)} placeholder="Architecture decision record" maxLength={255} />
                  <label htmlFor="atlas-description">Description</label>
                  <textarea id="atlas-description" value={storageDescription} onChange={(event) => setStorageDescription(event.target.value)} placeholder="What does this artifact explain?" rows={3} maxLength={2000} />
                  <label htmlFor="atlas-file">File</label>
                  <input id="atlas-file" name="atlas-file" type="file" onChange={(event) => setStorageFile(event.target.files?.[0] ?? null)} />
                  <button className="text-button primary storage-submit" type="submit" disabled={storageBusy}>{storageBusy ? "Saving…" : "Save artifact"} <ArrowUpRight size={15} /></button>
                  <small className="storage-form-note">Accepted as-is for research artifacts; the server validates metadata and enforces the 8 MB limit.</small>
                </form>
                <div className="storage-summary"><span className="eyebrow">SUPPLIED TAXONOMY · PRESERVED</span><h3>Architecture Taxonomy</h3><p>The complete typed catalog is available to the atlas codebase and can be saved here as an artifact for handoff.</p><div className="storage-stats"><div><strong>{taxonomyStats.total}</strong><span>catalog records</span></div><div><strong>{taxonomyStats.unifiedEntities}</strong><span>unified entities</span></div><div><strong>{taxonomyStats.frameworks}</strong><span>frameworks</span></div></div><code>client/src/lib/architecture-taxonomy.ts</code></div>
              </div>
              <div className="storage-list"><div className="storage-list-head"><span className="eyebrow">SAVED ARTIFACTS</span><span>{storageLoading ? "Loading…" : `${storageFiles.length} saved`}</span></div>{!storageLoading && storageFiles.length === 0 ? <p className="storage-empty">No artifacts yet. Save a model file or a small decision record to start your shelf.</p> : storageFiles.map((file) => <div className="storage-file" key={file.id}><div className="storage-file-copy"><a href={file.url} target="_blank" rel="noreferrer"><strong>{file.title}</strong><ExternalLink size={13} /></a><span>{file.fileName} · {formatFileSize(file.sizeBytes)} · {new Date(file.createdAt).toLocaleDateString()}</span>{file.description && <small>{file.description}</small>}</div><button className="storage-remove" type="button" onClick={() => removeArtifact(file.id)} disabled={storageBusy}>Remove</button></div>)}</div>
            </div>
          </section>


          <Dialog open={Boolean(selectedSpecification)} onOpenChange={(open) => { if (!open) setSelectedSpecification(null); }}>
            <DialogContent className="registry-dialog">
              {selectedSpecification && <>
                <DialogHeader className="registry-dialog-header">
                  <div className="registry-dialog-kicker"><span className="eyebrow">SPECIFICATION PROFILE</span><span className={`registry-kind registry-kind-${selectedSpecification.kind}`}>{selectedSpecification.kind.replaceAll("-", " ")}</span></div>
                  <DialogTitle>{selectedSpecification.name}</DialogTitle>
                  <DialogDescription>{selectedSpecification.acronym} · {selectedSpecification.version} · {selectedSpecification.status.replaceAll("-", " ")}</DialogDescription>
                </DialogHeader>
                <div className="registry-dialog-grid">
                  <div className="registry-dialog-field registry-dialog-wide"><span className="eyebrow">PRIMARY QUESTION</span><p>{selectedSpecification.primaryQuestion}</p></div>
                  <div className="registry-dialog-field"><span className="eyebrow">ABSTRACTION / METAMODEL</span><p>{selectedSpecification.abstraction}</p></div>
                  <div className="registry-dialog-field"><span className="eyebrow">PRIMARY ARTIFACT</span><p>{selectedSpecification.primaryArtifact}</p></div>
                  <div className="registry-dialog-field registry-dialog-wide"><span className="eyebrow">INTEROPERABILITY / CONFORMANCE</span><p>{selectedSpecification.interoperability}</p></div>
                </div>
                {selectedSpecification.metadata && Object.keys(selectedSpecification.metadata).length > 0 && <div className="registry-custom-metadata"><div className="registry-map-heading"><div><span className="eyebrow">CUSTOM METADATA</span><h3>Framework-specific signals.</h3></div><span className="info-pill">{Object.keys(selectedSpecification.metadata).length} fields</span></div><div className="registry-metadata-grid">{Object.entries(selectedSpecification.metadata).map(([key, value]) => { const parts = metadataValueParts(value); const isList = Array.isArray(value); return <div className="registry-metadata-field" key={key}><span className="eyebrow">{formatMetadataLabel(key)}</span>{isList ? <div className="registry-metadata-chips">{parts.map((part) => <span key={part}>{part}</span>)}</div> : <p>{parts[0]}</p>}</div>; })}</div></div>}
                <div className="registry-metamodel-map"><div className="registry-map-heading"><div><span className="eyebrow">FRAMEWORK-TO-FRAMEWORK METAMODEL MAP</span><h3>How this lens connects.</h3></div><span className="info-pill">{selectedMetamodelMappings.length} relationships</span></div><div className="registry-map-origin"><span className="registry-map-node-label">SELECTED FRAMEWORK</span><strong>{selectedSpecification.acronym}</strong><small>{selectedSpecification.kind.replaceAll("-", " ")}</small></div><div className="registry-map-links">{selectedMetamodelMappings.map((mapping) => { const target = architectureSpecificationRegistry.find((specification) => specification.id === mapping.targetId); return target ? <div className={`registry-map-link registry-map-link-${mapping.tone}`} key={mapping.targetId}><div className="registry-map-line"><span className="registry-map-arrow">→</span><span className="registry-map-relation">{mapping.relation}</span><strong>{target.acronym}</strong></div><p>{mapping.detail}</p></div> : null; })}</div></div>
                <div className="registry-dialog-bottom"><div><span className="eyebrow">TAGS</span><div className="registry-tags">{selectedSpecification.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div><span className="eyebrow">SOURCE TRAIL</span><div className="registry-sources">{selectedSpecification.sources.map((source) => <a key={source} href={source} target="_blank" rel="noreferrer">{new URL(source).hostname.replace("www.", "")} <ExternalLink size={12} /></a>)}</div></div></div>
                <div className="registry-dialog-footer"><span>Registry ID · {selectedSpecification.id}</span><button className="text-button primary" onClick={() => { setSelectedSpecification(null); scrollToId(selectedSpecification.atlasAnchor); }}>Open atlas lens <ArrowUpRight size={15} /></button></div>
              </>}
            </DialogContent>
          </Dialog>
          <footer className="footer"><span>KNIGA · ARCHITECTURE MODELS ATLAS · OZCO</span><span>Author: Usanov VA · Master: Usan VA · #16B8F3</span><span>v2.0 · March 2026 · Definitions-first · Traceable · kniga.agile-dev.ru · © 2026 Usan VA · VA UVA · OZCO</span></footer>
        </main>
      </div>
    </div>
  );
}
