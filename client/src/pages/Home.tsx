// Design philosophy: print-room atlas — warm editorial surfaces, ink-blue structure, signal-rust deltas, and an asymmetric research-wall layout.
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
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

const mappingRows = [
  { topic: "Primary question", iso: "What must an architecture description express, and why?", c4: "How much of the software architecture should this audience see?", mof: "What language defines the model, and how can the artifact interoperate?" },
  { topic: "Abstraction", iso: "Stakeholders, concerns, viewpoints, views, models, and correspondences.", c4: "Software system, container, component, and code.", mof: "M3 meta-metamodel, M2 metamodel, M1 user model, and M0 instances." },
  { topic: "Core artifact", iso: "Architecture Description and its governed views.", c4: "A hierarchical architecture diagram and supporting views.", mof: "A MOF-based metamodel or model that can be exchanged and transformed." },
  { topic: "Audience", iso: "Stakeholders with different concerns and perspectives.", c4: "Product, architecture, delivery, operations, and development teams.", mof: "Language designers, tool builders, model engineers, and interoperating tools." },
  { topic: "Relationship to views", iso: "Defines the conventions and rationale for an Architecture View.", c4: "Provides a practical zoom level that can populate an Architecture View.", mof: "Provides the metamodeling foundation and interchange mechanisms behind models." },
  { topic: "Interoperability", iso: "Correspondences and rules preserve traceability across AD elements.", c4: "Notation- and tooling-independent; exchange depends on the chosen tools.", mof: "XMI represents, links, validates, and identifies objects across files and tools." },
] as const;

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
  const [selectedArtifact, setSelectedArtifact] = useState("uml");
  const [xmiStep, setXmiStep] = useState("conform");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const selected = concepts.find((concept) => concept.id === selectedId) ?? concepts[3];
  const selectedC4Level = c4Levels.find((level) => level.id === selectedC4) ?? c4Levels[0];
  const selectedMofLayer = mofLayers.find((layer) => layer.id === selectedMof) ?? mofLayers[0];
  const selectedArtifactExample = artifactExamples.find((artifact) => artifact.id === selectedArtifact) ?? artifactExamples[0];
  const selectedXmiStep = xmiSteps.find((step) => step.id === xmiStep) ?? xmiSteps[0];
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
    const shareData = { title: "Architecture Models Atlas", text: "An interactive guide to the IEEE 1471 / ISO 42010 conceptual model.", url: window.location.href };
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
    const blob = new Blob([JSON.stringify({ title: "Architecture Models Atlas", source: "ISO Architecture / IEEE 1471 + C4 Model + OMG MOF", editions, concepts, c4Levels, mofLayers, mappingRows, artifactExamples, xmiSteps }, null, 2)], { type: "application/json" });
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
        <a href="#top" className="brand" aria-label="Architecture Models Atlas home">
          <span className="brand-mark"><img src="/manus-storage/atlas-mark_d0d985a0.png" alt="" /></span>
          <span className="brand-copy"><strong>ARCHITECTURE</strong><em>models atlas</em></span>
        </a>
        <div className="topbar-meta"><span className="eyebrow">FIELD NOTE 01</span><span className="topbar-line" /><span>IEEE 1471 → ISO 42010</span></div>
        <div className="topbar-actions">
          <button className="icon-button mobile-menu" onClick={() => setMobileNav((value) => !value)} aria-label="Toggle navigation"><Menu size={18} /></button>
          <button className="text-button" onClick={downloadAtlas}><Download size={16} /> Save atlas</button>
          <button className="text-button primary" onClick={sharePage}>{copied ? <Check size={16} /> : <Share2 size={16} />} {copied ? "Copied" : "Share"}</button>
        </div>
      </header>

      <div className={`mobile-nav ${mobileNav ? "open" : ""}`}>
        {["top", "context", "core", "c4", "mof", "mapping", "changes", "sources"].map((id) => <a key={id} href={`#${id}`} onClick={() => setMobileNav(false)}>{id === "top" ? "Overview" : id === "core" ? "Core model" : id === "c4" ? "C4 lens" : id === "mof" ? "MOF lens" : id === "mapping" ? "Compare" : id === "changes" ? "Edition shifts" : id[0].toUpperCase() + id.slice(1)}</a>)}
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
            <a className="rail-link" href="#mapping"><span>06</span><b>Compare</b></a>
            <a className="rail-link" href="#changes"><span>07</span><b>Edition shifts</b></a>
            <a className="rail-link" href="#sources"><span>08</span><b>Sources</b></a>
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
              <p className="hero-deck">A field guide to the conceptual models behind IEEE 1471 and ISO/IEC/IEEE 42010—what the terms mean, how they connect, and what changed along the way.</p>
              <div className="hero-actions"><button className="hero-cta" onClick={() => scrollToId("core")}>Explore the model <ArrowDownRight size={17} /></button><span className="hero-source">Research based on three published editions<br /><b>2000 · 2011 · 2022</b></span></div>
            </div>
            <div className="hero-stamp"><span>ATLAS</span><strong>01</strong><small>MODEL / TRACE</small></div>
          </section>

          <section className="intro-band">
            <div className="intro-lead"><span className="section-number">01</span><div><div className="eyebrow">ORIENTATION</div><h2>A standard for expressing architecture—not prescribing it.</h2></div></div>
            <div className="intro-copy"><p>ISO/IEC/IEEE 42010 establishes requirements for the <strong>structure and expression</strong> of an Architecture Description (AD). It distinguishes an entity’s architecture from the AD that expresses it, and leaves the choice of process, tool, notation, and media open.</p><a href="#sources" className="inline-link">Read the source trail <ChevronRight size={15} /></a></div>
          </section>

          <section className="stat-strip" aria-label="Atlas at a glance">
            <div><span className="stat-value">03</span><span className="stat-label">editions traced</span></div>
            <div><span className="stat-value">15</span><span className="stat-label">named concepts in current atlas</span></div>
            <div><span className="stat-value">02</span><span className="stat-label">new lenses in 2022</span></div>
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

          <section className="section-block mapping-section" id="mapping">
            <div className="section-heading"><div className="section-marker"><span>06</span><span className="marker-line" /></div><div><div className="eyebrow">CROSS-MODEL MAPPING</div><h2>Three lenses. One model conversation.</h2><p className="section-intro">ISO 42010 governs why an architecture is described, C4 helps teams choose a useful software zoom, and MOF explains how modeling languages and artifacts can be defined and exchanged.</p></div></div>
            <div className="mapping-table-wrap"><table className="mapping-table"><thead><tr><th>Compare by</th><th><span className="mapping-kicker iso">ISO 42010</span><strong>Architecture description</strong></th><th><span className="mapping-kicker c4">C4</span><strong>Software architecture zoom</strong></th><th><span className="mapping-kicker mof">MOF</span><strong>Metamodeling infrastructure</strong></th></tr></thead><tbody>{mappingRows.map((row) => <tr key={row.topic}><th scope="row">{row.topic}</th><td>{row.iso}</td><td>{row.c4}</td><td>{row.mof}</td></tr>)}</tbody></table></div>
            <div className="artifact-desk"><div className="desk-heading"><div><span className="eyebrow">ARTIFACT DESK</span><h3>See the model and the language behind it.</h3></div><span className="info-pill">illustrative examples</span></div><div className="artifact-tabs">{artifactExamples.map((artifact) => <button key={artifact.id} className={selectedArtifact === artifact.id ? "active" : ""} onClick={() => setSelectedArtifact(artifact.id)}><span>{artifact.label}</span><small>{artifact.kicker}</small></button>)}</div><div className="artifact-layout"><div className={`artifact-canvas artifact-${selectedArtifact}`} aria-label={`${selectedArtifactExample.label} illustrative artifact`}>{selectedArtifact === "uml" ? <><div className="artifact-class customer"><strong>Customer</strong><span>id: UUID</span><span>name: String</span></div><div className="artifact-connector one" /><div className="artifact-card-label">places</div><div className="artifact-class order"><strong>Order</strong><span>number: String</span><span>status: Status</span></div><div className="artifact-connector two" /><div className="artifact-card-label line">contains</div><div className="artifact-class line-item"><strong>OrderLine</strong><span>quantity: Integer</span><span>price: Money</span></div></> : <><div className="artifact-class meta-class"><strong>Class</strong><span>name: String</span><span>ownedAttribute: Property[*]</span></div><div className="artifact-connector meta-one" /><div className="artifact-class meta-property"><strong>Property</strong><span>name: String</span><span>type: Type</span></div><div className="artifact-connector meta-two" /><div className="artifact-class meta-type"><strong>Type</strong><span>isAbstract: Boolean</span></div><div className="artifact-card-label meta-label">defines the language</div></>}</div><div className="artifact-readout"><span className="eyebrow">{selectedArtifactExample.kicker}</span><h3>{selectedArtifactExample.title}</h3><p>{selectedArtifactExample.description}</p><div className="artifact-note"><BookOpen size={15} /> {selectedArtifactExample.note}</div></div></div></div>
            <div className="xmi-walkthrough"><div className="xmi-heading"><div><span className="eyebrow">XMI EXCHANGE WALKTHROUGH</span><h3>From a model on one desk to an artifact another tool can read.</h3></div><span className="info-pill">simplified teaching flow</span></div><div className="xmi-layout"><div className="xmi-steps">{xmiSteps.map((step) => <button key={step.id} className={`xmi-step ${xmiStep === step.id ? "active" : ""}`} onClick={() => setXmiStep(step.id)}><span>{step.number}</span><strong>{step.label}</strong><ChevronRight size={15} /></button>)}</div><div className="xmi-readout"><div className="xmi-readout-top"><span className="xmi-number">{selectedXmiStep.number}</span><span className="category-tag">{selectedXmiStep.label}</span></div><h3>{selectedXmiStep.title}</h3><p>{selectedXmiStep.copy}</p><pre><code>{selectedXmiStep.snippet}</code></pre><div className="xmi-foot"><Link2 size={15} /><span>XMI is the exchange representation; MOF and the source metamodel supply the meaning of the objects being exchanged.</span></div></div></div></div>
          </section>

          <section className="section-block explorer-section" id="explorer">
            <div className="explorer-top"><div className="section-heading compact"><div className="section-marker"><span>05A</span><span className="marker-line" /></div><div><div className="eyebrow">CONCEPT EXPLORER</div><h2>Build your own glossary.</h2></div></div><div className="search-wrap"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a concept…" aria-label="Find a concept" />{search && <button onClick={() => setSearch("")} aria-label="Clear search"><X size={15} /></button>}</div></div>
            <div className="filter-row"><span><Filter size={14} /> {filteredConcepts.length} concepts surfaced</span><span>Click any card for a closer read</span></div>
            <div className="concept-grid">{filteredConcepts.map((concept) => <button className={`concept-card ${selectedId === concept.id ? "selected" : ""}`} key={concept.id} onClick={() => setSelectedId(concept.id)}><div className="concept-card-top"><span className="category-tag">{concept.category}</span><span className="concept-edition">{concept.edition}</span></div><h3>{concept.name}</h3><p>{concept.short}</p><span className="concept-read">Inspect <ChevronRight size={14} /></span></button>)}</div>
          </section>

          <section className="section-block changes-section" id="changes">
            <div className="section-heading"><div className="section-marker"><span>07</span><span className="marker-line" /></div><div><div className="eyebrow">EDITION SHIFTS</div><h2>What changed—and what stayed foundational.</h2><p className="section-intro">The vocabulary grows, but its organizing question remains stable: how does an AD help people express and reason about an architecture?</p></div></div>
            <div className="changes-grid"><div className="chart-card"><div className="card-heading"><div><span className="eyebrow">ATLAS INVENTORY</span><h3>Named elements surfaced</h3></div><span className="info-pill">derived count</span></div><div className="chart-wrap"><ResponsiveContainer width="100%" height={230}><BarChart data={chartData} margin={{ top: 12, right: 8, left: -18, bottom: 6 }}><CartesianGrid strokeDasharray="2 5" vertical={false} stroke="#d7d1c7" /><XAxis dataKey="edition" tick={{ fill: "#6a7180", fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} /><YAxis domain={[0, 16]} tick={{ fill: "#8a8c93", fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} /><Tooltip cursor={{ fill: "#f0ebe3" }} contentStyle={{ border: "1px solid #d6cfc4", borderRadius: 6, fontFamily: "IBM Plex Sans", fontSize: 12, boxShadow: "0 10px 30px rgba(41,48,60,.08)" }} /><Bar dataKey="concepts" radius={[4, 4, 0, 0]}>{chartData.map((entry) => <Cell key={entry.edition} fill={entry.fill} />)}</Bar></BarChart></ResponsiveContainer></div><p className="chart-footnote">A reading aid for this atlas, not a claim about the number of terms in the standards themselves.</p></div>
              <div className="delta-card"><div className="delta-card-head"><span className="eyebrow">2022 / NEW LENS</span><span className="delta-arrow"><ArrowUpRight size={16} /></span></div><h3>From a system to an entity.<br />From models to components.</h3><div className="delta-list"><div><span className="delta-num">01</span><p><strong>Entity of Interest</strong> broadens the subject beyond a System of Interest.</p></div><div><span className="delta-num">02</span><p><strong>Stakeholder Perspective</strong> groups concerns and organizes viewpoints.</p></div><div><span className="delta-num">03</span><p><strong>Architecture Aspect</strong> refines traceability between concerns and views.</p></div></div><button className="delta-link" onClick={() => { setActiveEdition("2022"); scrollToId("edition-switcher"); }}>Compare the editions <ChevronRight size={15} /></button></div></div>
            <div className="edition-switcher" id="edition-switcher"><div className="edition-switcher-head"><div><span className="eyebrow">LENS SELECTOR</span><h3>Read the same model through three frames.</h3></div><span className="selected-edition-label">{activeEdition} selected</span></div><div className="edition-tabs">{editions.map((edition) => <button key={edition.id} className={activeEdition === edition.id ? "active" : ""} onClick={() => setActiveEdition(edition.id)}><span>{edition.label}</span><strong>{edition.title}</strong><small>{edition.note}</small></button>)}</div><div className="edition-readout"><div className="readout-year">{activeEdition}</div><div><span className="eyebrow">THE SHORT READ</span><p>{activeEdition === "2022" ? "The current edition keeps the AD as the concrete expression of an architecture, while adding a wider subject, grouped stakeholder perspectives, and aspects that sharpen traceability." : activeEdition === "2011" ? "The first edition tightened the original framework around an Architecture Description, clarified concerns and viewpoints, and made the architecture-model relationship explicit." : "The origin model introduced the durable vocabulary: system, mission, environment, architecture, stakeholders, concerns, viewpoints, views, models, and rationale."}</p></div></div></div>
          </section>

          <section className="section-block sources-section" id="sources">
            <div className="section-heading"><div className="section-marker"><span>08</span><span className="marker-line" /></div><div><div className="eyebrow">SOURCE TRAIL</div><h2>Keep the reference close.</h2></div></div>
            <div className="sources-grid"><div className="source-intro"><BookOpen size={28} strokeWidth={1.5} /><p>This atlas is a visual interpretation of the public conceptual-model pages and the official ISO publication abstract. Follow the source trail when you need the exact normative language.</p><button className="text-button primary" onClick={downloadAtlas}><Download size={16} /> Download extracted data</button></div><div className="source-list"><a href="http://www.iso-architecture.org/ieee-1471/cm/" target="_blank" rel="noreferrer"><span className="source-number">01</span><span><strong>ISO Architecture</strong><small>A Conceptual Model of Architecture Description · current and historical context</small></span><ExternalLink size={15} /></a><a href="http://www.iso-architecture.org/42010/cm/cm-1471-2000.html" target="_blank" rel="noreferrer"><span className="source-number">02</span><span><strong>IEEE 1471-2000 framework</strong><small>Original conceptual framework and definitions</small></span><ExternalLink size={15} /></a><a href="https://www.iso.org/standard/74393.html" target="_blank" rel="noreferrer"><span className="source-number">03</span><span><strong>ISO official publication</strong><small>ISO/IEC/IEEE 42010:2022 scope, status, and abstract</small></span><ExternalLink size={15} /></a><a href="https://blog.visual-paradigm.com/unveiling-the-power-of-c4-model-simplifying-software-architecture-diagrams/" target="_blank" rel="noreferrer"><span className="source-number">04</span><span><strong>Visual Paradigm C4 article</strong><small>Four levels of abstraction and corresponding diagrams</small></span><ExternalLink size={15} /></a><a href="https://c4model.com/" target="_blank" rel="noreferrer"><span className="source-number">05</span><span><strong>Official C4 Model site</strong><small>Supporting diagrams, notation independence, and tooling guidance</small></span><ExternalLink size={15} /></a><a href="https://www.omg.org/mof/" target="_blank" rel="noreferrer"><span className="source-number">06</span><span><strong>OMG MetaObject Facility</strong><small>Model interchange, transformation, repositories, XMI, and MDA context</small></span><ExternalLink size={15} /></a><a href="https://www.omg.org/spec/MOF/2.5.1/PDF" target="_blank" rel="noreferrer"><span className="source-number">07</span><span><strong>MOF Core Specification 2.5.1</strong><small>Authoritative technical specification for MOF Core</small></span><ExternalLink size={15} /></a></div></div>
          </section>

          <footer className="footer"><span>ARCHITECTURE MODELS ATLAS</span><span>Research note · 29 AUG 2026</span><span>Built for inspection, comparison, and traceability.</span></footer>
        </main>
      </div>
    </div>
  );
}
