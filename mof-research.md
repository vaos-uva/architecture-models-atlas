# OMG MOF research notes

## Primary source

Object Management Group, “MetaObject Facility,” https://www.omg.org/mof/

OMG describes the MetaObject Facility (MOF) as the foundation of an industry-standard environment in which models can be exported, imported, transported, stored in repositories, retrieved, rendered into different formats including XMI, transformed, and used to generate application code. The environment is not limited to structural models or UML; behavioral, data, and non-UML modeling languages can participate when they are MOF-based.

OMG also positions MOF as a specification for interoperability rather than a software product. Tool providers can build modelers, repositories, transformation engines, code generators, analyzers, and related tools around MOF-compliant models and XMI exchange.

The OMG page explains that Model Driven Architecture (MDA) relies on MOF-enabled transformations to connect a Platform-Independent Model (PIM) to one or more Platform-Specific Models (PSMs), generated code, and a deployable application. It describes model portability, interoperability, and transformation as central benefits.

## Specification cross-check

OMG Meta Object Facility (MOF) Core Specification, Version 2.5.1, https://www.omg.org/spec/MOF/2.5.1/PDF

The official specification is titled “OMG Meta Object Facility (MOF) Core Specification,” version 2.5.1, dated October 2019. The specification is the authoritative technical reference for MOF Core and its machine-readable artifacts.

For the atlas, MOF is represented as a metamodeling and interchange lens rather than another architecture-description viewpoint. The standard four-layer teaching frame is used as a visual aid: M3 meta-metamodel, M2 metamodels such as UML, M1 user models, and M0 runtime or real-world instances. The OMG landing page emphasizes the practical functions behind those layers: model definition, interchange, storage, transformation, and code generation.

## Integration decision

Add a MOF lens after the C4 section and before the concept explorer. Show a stacked M3 → M2 → M1 → M0 ladder with clickable layers, a readout explaining the selected layer, and a bridge note: ISO 42010 describes architecture through concerns, viewpoints, views, and AD elements; C4 selects software architecture zoom levels; MOF explains the metamodeling infrastructure that can define and exchange modeling languages and models. Add the OMG landing page and MOF Core specification to the source trail and include the MOF data in the downloadable atlas export.
