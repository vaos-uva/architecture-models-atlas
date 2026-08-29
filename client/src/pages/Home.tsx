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
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const selected = concepts.find((concept) => concept.id === selectedId) ?? concepts[3];
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
    const blob = new Blob([JSON.stringify({ title: "Architecture Models Atlas", source: "ISO Architecture / IEEE 1471", editions, concepts }, null, 2)], { type: "application/json" });
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
        {["top", "context", "core", "changes", "sources"].map((id) => <a key={id} href={`#${id}`} onClick={() => setMobileNav(false)}>{id === "top" ? "Overview" : id === "core" ? "Core model" : id === "changes" ? "Edition shifts" : id[0].toUpperCase() + id.slice(1)}</a>)}
      </div>

      <div className="atlas-layout" id="top">
        <aside className="index-rail">
          <div className="rail-label">CONTENTS</div>
          <nav>
            <a className="rail-link active" href="#top"><span>01</span><b>Overview</b></a>
            <a className="rail-link" href="#context"><span>02</span><b>Context</b></a>
            <a className="rail-link" href="#core"><span>03</span><b>Core model</b></a>
            <a className="rail-link" href="#changes"><span>04</span><b>Edition shifts</b></a>
            <a className="rail-link" href="#sources"><span>05</span><b>Sources</b></a>
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

          <section className="section-block explorer-section" id="explorer">
            <div className="explorer-top"><div className="section-heading compact"><div className="section-marker"><span>03A</span><span className="marker-line" /></div><div><div className="eyebrow">CONCEPT EXPLORER</div><h2>Build your own glossary.</h2></div></div><div className="search-wrap"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a concept…" aria-label="Find a concept" />{search && <button onClick={() => setSearch("")} aria-label="Clear search"><X size={15} /></button>}</div></div>
            <div className="filter-row"><span><Filter size={14} /> {filteredConcepts.length} concepts surfaced</span><span>Click any card for a closer read</span></div>
            <div className="concept-grid">{filteredConcepts.map((concept) => <button className={`concept-card ${selectedId === concept.id ? "selected" : ""}`} key={concept.id} onClick={() => setSelectedId(concept.id)}><div className="concept-card-top"><span className="category-tag">{concept.category}</span><span className="concept-edition">{concept.edition}</span></div><h3>{concept.name}</h3><p>{concept.short}</p><span className="concept-read">Inspect <ChevronRight size={14} /></span></button>)}</div>
          </section>

          <section className="section-block changes-section" id="changes">
            <div className="section-heading"><div className="section-marker"><span>04</span><span className="marker-line" /></div><div><div className="eyebrow">EDITION SHIFTS</div><h2>What changed—and what stayed foundational.</h2><p className="section-intro">The vocabulary grows, but its organizing question remains stable: how does an AD help people express and reason about an architecture?</p></div></div>
            <div className="changes-grid"><div className="chart-card"><div className="card-heading"><div><span className="eyebrow">ATLAS INVENTORY</span><h3>Named elements surfaced</h3></div><span className="info-pill">derived count</span></div><div className="chart-wrap"><ResponsiveContainer width="100%" height={230}><BarChart data={chartData} margin={{ top: 12, right: 8, left: -18, bottom: 6 }}><CartesianGrid strokeDasharray="2 5" vertical={false} stroke="#d7d1c7" /><XAxis dataKey="edition" tick={{ fill: "#6a7180", fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} /><YAxis domain={[0, 16]} tick={{ fill: "#8a8c93", fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} /><Tooltip cursor={{ fill: "#f0ebe3" }} contentStyle={{ border: "1px solid #d6cfc4", borderRadius: 6, fontFamily: "IBM Plex Sans", fontSize: 12, boxShadow: "0 10px 30px rgba(41,48,60,.08)" }} /><Bar dataKey="concepts" radius={[4, 4, 0, 0]}>{chartData.map((entry) => <Cell key={entry.edition} fill={entry.fill} />)}</Bar></BarChart></ResponsiveContainer></div><p className="chart-footnote">A reading aid for this atlas, not a claim about the number of terms in the standards themselves.</p></div>
              <div className="delta-card"><div className="delta-card-head"><span className="eyebrow">2022 / NEW LENS</span><span className="delta-arrow"><ArrowUpRight size={16} /></span></div><h3>From a system to an entity.<br />From models to components.</h3><div className="delta-list"><div><span className="delta-num">01</span><p><strong>Entity of Interest</strong> broadens the subject beyond a System of Interest.</p></div><div><span className="delta-num">02</span><p><strong>Stakeholder Perspective</strong> groups concerns and organizes viewpoints.</p></div><div><span className="delta-num">03</span><p><strong>Architecture Aspect</strong> refines traceability between concerns and views.</p></div></div><button className="delta-link" onClick={() => { setActiveEdition("2022"); scrollToId("edition-switcher"); }}>Compare the editions <ChevronRight size={15} /></button></div></div>
            <div className="edition-switcher" id="edition-switcher"><div className="edition-switcher-head"><div><span className="eyebrow">LENS SELECTOR</span><h3>Read the same model through three frames.</h3></div><span className="selected-edition-label">{activeEdition} selected</span></div><div className="edition-tabs">{editions.map((edition) => <button key={edition.id} className={activeEdition === edition.id ? "active" : ""} onClick={() => setActiveEdition(edition.id)}><span>{edition.label}</span><strong>{edition.title}</strong><small>{edition.note}</small></button>)}</div><div className="edition-readout"><div className="readout-year">{activeEdition}</div><div><span className="eyebrow">THE SHORT READ</span><p>{activeEdition === "2022" ? "The current edition keeps the AD as the concrete expression of an architecture, while adding a wider subject, grouped stakeholder perspectives, and aspects that sharpen traceability." : activeEdition === "2011" ? "The first edition tightened the original framework around an Architecture Description, clarified concerns and viewpoints, and made the architecture-model relationship explicit." : "The origin model introduced the durable vocabulary: system, mission, environment, architecture, stakeholders, concerns, viewpoints, views, models, and rationale."}</p></div></div></div>
          </section>

          <section className="section-block sources-section" id="sources">
            <div className="section-heading"><div className="section-marker"><span>05</span><span className="marker-line" /></div><div><div className="eyebrow">SOURCE TRAIL</div><h2>Keep the reference close.</h2></div></div>
            <div className="sources-grid"><div className="source-intro"><BookOpen size={28} strokeWidth={1.5} /><p>This atlas is a visual interpretation of the public conceptual-model pages and the official ISO publication abstract. Follow the source trail when you need the exact normative language.</p><button className="text-button primary" onClick={downloadAtlas}><Download size={16} /> Download extracted data</button></div><div className="source-list"><a href="http://www.iso-architecture.org/ieee-1471/cm/" target="_blank" rel="noreferrer"><span className="source-number">01</span><span><strong>ISO Architecture</strong><small>A Conceptual Model of Architecture Description · current and historical context</small></span><ExternalLink size={15} /></a><a href="http://www.iso-architecture.org/42010/cm/cm-1471-2000.html" target="_blank" rel="noreferrer"><span className="source-number">02</span><span><strong>IEEE 1471-2000 framework</strong><small>Original conceptual framework and definitions</small></span><ExternalLink size={15} /></a><a href="https://www.iso.org/standard/74393.html" target="_blank" rel="noreferrer"><span className="source-number">03</span><span><strong>ISO official publication</strong><small>ISO/IEC/IEEE 42010:2022 scope, status, and abstract</small></span><ExternalLink size={15} /></a></div></div>
          </section>

          <footer className="footer"><span>ARCHITECTURE MODELS ATLAS</span><span>Research note · 29 AUG 2026</span><span>Built for inspection, comparison, and traceability.</span></footer>
        </main>
      </div>
    </div>
  );
}
