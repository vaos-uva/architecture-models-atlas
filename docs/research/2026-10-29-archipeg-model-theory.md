# ArchiPeg and Model Theory Research Note

## ArchiPeg: enterprise and solution architecture

Source: [Enterprise Architecture vs. Solution Architecture](https://www.archipeg.com/learn/enterprise-architecture-vs-solution-architecture)

ArchiPeg describes Enterprise Architecture as a high-level, nearly abstract decision-making framework that collects and analyzes enterprise knowledge for organizational decision-making and transformation. It positions Solution Architecture between Enterprise and Application Architecture, with medium-level abstraction focused on implementation, hosting, deployment, and integration. The article presents Solution Architecture as a possible constituent of an enterprise architecture and recommends partnership: enterprise architects address high-level problems while solution architects turn direction into technical strategies.

These claims are represented in KNIGA as explanatory concepts and a role lens. They are not added as a new normative framework or registry row.

## ArchiPeg: TOGAF 9.2 Content Metamodel

Sources: [ArchiPeg TOGAF 9.2 Content v1.0 Metamodel](https://www.archipeg.com/learn/togaf-9p2-content-v1-metamodel) and [official TOGAF 9.2 Content Metamodel chapter](https://pubs.opengroup.org/architecture/togaf9-doc/arch/chap30.html).

ArchiPeg describes the TOGAF Content Metamodel as a formal structure for architectural work products produced by the ADM. Its explanatory page identifies extension modules and notes that its implementation includes the modules but does not reproduce the original predefined object attributes. The KNIGA lens therefore uses a small representative object set: Actor, Business Capability, Business Service, Data Entity, Driver, Goal, Logical Application Component, and Gap. The UI labels this as an illustrative teaching slice and points readers to the official chapter for normative detail.

Representative source-backed definitions used in the atlas include: Actor as a person, organization, or system interacting with activities; Business Capability as an ability used to achieve a purpose; Business Service as a governed interface supporting capabilities; Data Entity as a business-recognized data thing; Driver as a motivating condition; Goal as an intent or direction; Logical Application Component as implementation-independent application functionality; and Gap as a difference between baseline and target states.

## Model theory as an interpretive bridge

Source: [Stanford Encyclopedia of Philosophy — Model Theory, Philosophy section](https://plato.stanford.edu/entries/model-theory/#Philosophy).

The entry describes model theory as the study of languages and their interpretations by structures. An interpretation assigns referents and ranges to expressions; when an interpretation makes a sentence true, the interpretation satisfies the sentence. A theory is a set of sentences or axioms, and the class of structures satisfying them together can be written as Mod(T).

KNIGA uses these ideas only as a careful explanatory bridge for architecture modeling: language, structure, satisfaction, and theory can clarify how terms, elements, relationships, and constraints are evaluated. They do not establish that an architecture framework is a formal theory, nor do they by themselves prove business fitness, stakeholder value, or architectural correctness.

## Attached content guidance

The attached `pasted_content.txt` is a writing-style guide for OZCO practicum material. Its useful project rules were distilled into [`docs/agent/content-style.md`](../agent/content-style.md): write for experienced IT professionals, use direct practitioner language, connect concepts to constraints and decisions, show alternatives in case studies, and distinguish sourced claims from interpretation.
