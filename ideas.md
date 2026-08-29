# Architecture Models Atlas — Design Direction

## Three directions considered

### Theme Name: Print-room atlas
Very warm editorial research experience with paper texture, ink-blue diagrams, and rust annotation marks. Designed to make a complex conceptual model feel collected, readable, and human.
**Probability:** 0.07

### Theme Name: Observatory console
Dark, instrument-like interface with signal colors and a persistent model navigator. Designed for fast comparison and visual exploration.
**Probability:** 0.03

### Theme Name: Civic systems library
Light institutional interface with restrained blue-green color, archival cards, and quiet data visualizations. Designed for classroom and policy audiences.
**Probability:** 0.09

## Chosen approach: Print-room atlas

**Design Movement:** Contemporary editorial information design grounded in Swiss modernism, technical drafting, and independent research publishing.

**Core Principles:** Make relationships visible before prose; use whitespace as hierarchy; pair tactile paper warmth with precise diagram geometry; turn comparison and traceability into first-class interactions.

**Color Philosophy:** Warm ivory creates the feeling of an accessible research desk rather than a corporate tool. Ink navy carries structure and authority. Cobalt marks relationships and interaction. Rust-orange signals change, emphasis, and the 2022 additions without imitating the source diagram’s purple.

**Layout Paradigm:** An asymmetric two-rail composition: a narrow fixed-feeling index rail on the left, a wide editorial canvas on the right, and offset panels that echo pinned research sheets. The primary architecture map is allowed to breathe instead of being forced into a centered dashboard grid.

**Signature Elements:** A vertical section index with oversized numerals; orange “annotation tabs” for deltas and source notes; a precise node-and-relationship map that uses thin lines and generous labels.

**Interaction Philosophy:** Interactions should feel like inspecting a working research wall. Selecting a model highlights its neighborhood, switching editions changes the lens without losing context, and every source or save action stays visible and reversible.

**Animation:** Use short 180–260ms ease-out transitions for highlights, pills, and panels. Let active relationships fade in with a small opacity/translate shift. Respect reduced motion. Avoid decorative loops; movement should explain state changes.

**Typography System:** Fraunces for display headlines and section numerals; IBM Plex Sans for body and interface copy; IBM Plex Mono for evidence labels, citations, and relationship verbs. Headlines use tight tracking and italic emphasis only for the word “architecture.”

**Brand Essence:** A compact visual guide to the concepts behind architecture descriptions, for architects, systems thinkers, and students who need the model in one glance. Personality: exacting, warm, exploratory.

**Brand Voice:** Headlines are crisp and observant. CTAs are verbs that describe the action, never hype. Example lines: “Trace the model from concern to view.” “Compare what changed—and what stayed foundational.”

**Wordmark & Logo:** A compact open-cube mark built from three interlocking viewpoint frames, with one rust-orange plane to signal the active lens. The mark is used as a visual anchor, not as decorative clutter.

**Signature Brand Color:** Signal rust `#C65D3A`, reserved for deltas, annotations, and active research cues.

## Research model captured in the page

The page distinguishes the historical IEEE 1471-2000 / ISO/IEC 42010:2007 conceptual framework from the ISO/IEC/IEEE 42010:2011 first edition and the current 2022 second edition. The main explorer focuses on the 2022 concepts while the timeline and comparison panel surface the evolution.

### Primary extracted concepts

- Entity of Interest (generalizes System of Interest in 2022)
- Environment
- Architecture
- Architecture Description
- Stakeholder
- Concern
- Stakeholder Perspective (2022)
- Architecture Viewpoint
- Architecture View
- View Component (renamed from Architecture Model in 2022)
- Model Kind
- Architecture Aspect (2022)
- Architecture Rationale
- Correspondence
- Correspondence Method
- Legend

### Key relationships

- An Entity of Interest is situated in an Environment and has an Architecture.
- An Architecture Description identifies the Entity of Interest and expresses its Architecture.
- Stakeholders have interests in the Entity of Interest; those interests are Concerns.
- Stakeholder Perspectives group Concerns and organize Viewpoints in the 2022 model.
- Viewpoints frame Concerns and govern Views.
- Views address Concerns and contain View Components.
- Model Kinds govern View Components.
- Architecture Aspects are reflected in Views and refine traceability between Concerns and Views.
- Architecture Descriptions may carry Rationale, Correspondence, and Correspondence Methods.

## Sources

1. ISO Architecture, “A Conceptual Model of Architecture Description,” http://www.iso-architecture.org/ieee-1471/cm/
2. ISO Architecture, “IEEE 1471-2000 Conceptual Framework for Architectural Description,” http://www.iso-architecture.org/42010/cm/cm-1471-2000.html
3. ISO, “ISO/IEC/IEEE 42010:2022 — Software, systems and enterprise — Architecture description,” https://www.iso.org/standard/74393.html
