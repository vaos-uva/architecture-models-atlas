/**
 * OZCO-agnostic component contracts.
 *
 * This layer is intentionally free of KNIGA vocabulary, architecture-domain
 * records, source URLs, and product-specific styling. Product components may
 * adapt these contracts; OZCO primitives must not import product data.
 */
export type OzcoTone = "neutral" | "accent" | "positive" | "warning" | "critical";
export type OzcoInteractionState = "idle" | "selected" | "disabled" | "loading" | "complete";

export type OzcoSelectableItem = {
  id: string;
  label: string;
  tone?: OzcoTone;
  state?: OzcoInteractionState;
};

export type OzcoViewConfig = {
  density?: "compact" | "comfortable" | "spacious";
  interactive?: boolean;
  reducedMotion?: boolean;
};
