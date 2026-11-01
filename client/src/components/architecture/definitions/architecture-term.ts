/**
 * ident: client.components.architecture.definitions.architecture-term
 * category: definition
 * purpose: define
 * role: domain
 * semantic: translation
 * universe: architecture
 */

import type { MultilingualTermRecord } from "@/components/ozco/abstract/foundation/multilingual";

/** Architecture terms add domain classification while retaining the OZCO normal form. */
export type ArchitectureTerm = MultilingualTermRecord & {
  architectureCategory: "concept" | "element" | "relationship" | "artifact" | "framework";
  legacyIds?: readonly string[];
};

export function toArchitectureTerm(term: ArchitectureTerm): ArchitectureTerm {
  return {
    ...term,
    termsExpressions: Array.from(new Set(term.termsExpressions.map((expression) => expression.trim()))),
    legacyIds: term.legacyIds ? Array.from(new Set(term.legacyIds)) : undefined,
  };
}
