# C4 Model research notes

## Primary source

Visual Paradigm, “Unveiling the Power of C4 Model: Simplifying Software Architecture Diagrams,” https://blog.visual-paradigm.com/unveiling-the-power-of-c4-model-simplifying-software-architecture-diagrams/

The article describes the C4 Model as a concept introduced by Simon Brown and a set of hierarchical abstractions and corresponding diagrams for communicating software architecture at four levels: software systems, containers, components, and code.

It defines the four abstraction levels as follows:

| Level | Meaning in the article |
|---|---|
| Software systems | Highest level; the entire software ecosystem and major subsystems or bounded contexts. |
| Containers | Runtime/deployment units such as web servers, databases, or microservices. |
| Components | More granular building blocks within containers, such as classes, modules, or services with specific responsibilities. |
| Code | Lowest-level implementation detail, including class diagrams, source code, and technical artifacts. |

The article pairs these abstractions with four hierarchical diagrams: System Context, Container, Component, and Code. It also emphasizes notation independence and tooling independence.

## Official cross-check

C4 Model official site, https://c4model.com/

The official site confirms the same hierarchy and adds three supporting diagram types: System Landscape, Dynamic, and Deployment. It also confirms that the C4 Model is notation-independent and tooling-independent. The official site describes it as an easy-to-learn, developer-friendly approach to software architecture diagramming and identifies Simon Brown as its creator.

## Integration decision

Add a new “C4 lens” section after the existing ISO/IEEE core model section and before the concept explorer. The section should show a progressive stack from System Context to Code, make the four levels clickable, surface the audience and purpose of each level, and explicitly connect C4’s diagrams to the broader Architecture Description vocabulary. Add the Visual Paradigm article and official C4 site to the source trail.
