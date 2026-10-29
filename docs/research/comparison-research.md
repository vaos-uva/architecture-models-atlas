<!-- ident: docs.research.comparison
category: research
purpose: compare
role: source
semantic: mapping
universe: architecture -->

# Cross-model comparison and XMI walkthrough

## Terminology confirmed

ISO/IEC/IEEE 42010 describes an Architecture Description as an artifact that expresses an architecture. An Architecture View addresses concerns from one or more stakeholder perspectives and consists of one or more Architecture Models. A Viewpoint supplies conventions, model kinds, languages, notations, methods, and analysis techniques. The atlas mapping should therefore distinguish ISO 42010’s concern/view governance from C4’s software-architecture zoom levels and MOF’s metamodeling/interchange infrastructure.

The official C4 Model site describes C4 as hierarchical abstractions and diagrams for software systems, containers, components, and code, with supporting system landscape, dynamic, and deployment diagrams. C4 is notation-independent and tooling-independent.

OMG’s MOF page positions MOF as the foundation for exporting, importing, transporting, storing, transforming, and generating code from models. MOF-based languages can include UML and non-UML languages. OMG’s MDA explanation connects Platform-Independent Models to Platform-Specific Models, generated code, and deployable applications through MOF-enabled transformations.

OMG’s XMI 2.5.1 page defines XMI around representing objects as XML elements and attributes, linking objects within and across files, validating XMI documents with XML Schemas, and preserving object identity through IDs and UUIDs. The walkthrough should present XMI as a model exchange representation, not as a modeling method or architecture framework.

## UI content plan

Add a “Cross-model mapping” section after the MOF lens. It should contain a responsive table with columns for ISO 42010, C4, and MOF and rows for primary question, abstraction, core artifact, audience, relationship to views, exchange/interoperability, and typical use.

Add an “Artifact desk” with two selectable examples. UML example: a small class model with Customer, Order, and OrderLine, showing classes, attributes, and associations. MOF example: a compact metamodel fragment showing Class, Property, and Type, with a conformance note that a UML class model is an M1 model conforming to a metamodel at M2. The examples are illustrative, not normative specification excerpts.

Add an interactive four-step XMI walkthrough: 1) define/conform, 2) serialize, 3) exchange/validate, 4) transform/use. Show a small illustrative XML snippet with xmi:XMI, xmi:version, an example model element, and href/id references. Clearly label the snippet as a simplified teaching artifact rather than a complete XMI document.

## Sources

ISO/IEC/IEEE 42010 conceptual model: http://www.iso-architecture.org/42010/cm/
C4 Model official site: https://c4model.com/
OMG MetaObject Facility: https://www.omg.org/mof/
OMG MOF Core 2.5.1: https://www.omg.org/spec/MOF/2.5.1/PDF
OMG XMI 2.5.1: https://www.omg.org/spec/XMI/
