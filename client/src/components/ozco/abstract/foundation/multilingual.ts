/**
 * ident: client.components.ozco.abstract.foundation.multilingual
 * category: contract
 * purpose: normalize
 * role: domain
 * semantic: translation
 * universe: ozco
 */

/** Supported product-language codes in the first multilingual foundation slice. */
export const SUPPORTED_LOCALES = ["eng", "rus"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/**
 * The canonical normal form for a term or expression.
 *
 * `asciiAlphanumericCode` is immutable identity. `termsExpressions` preserves
 * ordered source spellings and aliases; it is not a translation field.
 * `eng` and `rus` are explicit values: the normalizer never invents a value.
 */
export type MultilingualNormalForm = {
  termsExpressions: readonly string[];
  asciiAlphanumericCode: string;
  eng: string;
  rus: string;
};

export type TermProvenance =
  | "source-quoted"
  | "source-paraphrase"
  | "normalized"
  | "translated"
  | "editorial"
  | "derived"
  | "interpretive-bridge"
  | "unverified"
  | "deprecated";

/** Optional evidence envelope shared by architecture and KNIGA records. */
export type MultilingualTermRecord = MultilingualNormalForm & {
  provenance: TermProvenance;
  sourceId?: string;
  edition?: string;
};

export type TranslationResolutionStatus = "translated" | "fallback" | "unavailable";

export type TranslationResolution = {
  requestedLocale: SupportedLocale;
  resolvedLocale: SupportedLocale | null;
  status: TranslationResolutionStatus;
  value: string;
  reason?: "missing-canonical-term" | "missing-requested-translation" | "missing-all-values";
};

const ASCII_ALPHANUMERIC_CODE = /^[A-Za-z0-9]+$/;

export type MultilingualValidationError = {
  field: keyof MultilingualNormalForm;
  message: string;
};

export function validateMultilingualNormalForm(term: MultilingualNormalForm): MultilingualValidationError[] {
  const errors: MultilingualValidationError[] = [];
  if (!ASCII_ALPHANUMERIC_CODE.test(term.asciiAlphanumericCode)) {
    errors.push({ field: "asciiAlphanumericCode", message: "must contain only ASCII letters and digits" });
  }
  if (!term.termsExpressions.length || term.termsExpressions.some((expression) => !expression.trim())) {
    errors.push({ field: "termsExpressions", message: "must contain at least one non-empty expression" });
  }
  if (!term.eng.trim()) errors.push({ field: "eng", message: "must be explicit and non-empty" });
  if (!term.rus.trim()) errors.push({ field: "rus", message: "must be explicit and non-empty" });
  return errors;
}

/**
 * Resolve a display value without inventing a translation.
 * Strict canonical records are preferred; partial legacy records can expose
 * an explicit fallback state while the migration is still in progress.
 */
export function resolveTranslation(
  term: Pick<MultilingualNormalForm, "eng" | "rus"> | undefined,
  requestedLocale: SupportedLocale,
  legacyFallback = "",
): TranslationResolution {
  const requestedValue = term?.[requestedLocale] ?? "";
  if (requestedValue.trim()) {
    return { requestedLocale, resolvedLocale: requestedLocale, status: "translated", value: requestedValue.trim() };
  }

  const englishValue = term?.eng?.trim() || legacyFallback.trim();
  if (englishValue) {
    return {
      requestedLocale,
      resolvedLocale: "eng",
      status: "fallback",
      value: englishValue,
      reason: term ? "missing-requested-translation" : "missing-canonical-term",
    };
  }

  return { requestedLocale, resolvedLocale: null, status: "unavailable", value: "", reason: "missing-all-values" };
}

/**
 * Normalize ordering noise without changing meaning or silently filling a translation.
 * Invalid records throw so callers cannot persist partial multilingual data.
 */
export function normalizeMultilingualNormalForm(term: MultilingualNormalForm): MultilingualNormalForm {
  const errors = validateMultilingualNormalForm(term);
  if (errors.length) throw new Error(`Invalid multilingual normal form: ${errors.map((error) => `${error.field} ${error.message}`).join("; ")}`);

  const expressions = Array.from(new Set(term.termsExpressions.map((expression) => expression.trim())));
  return {
    termsExpressions: expressions,
    asciiAlphanumericCode: term.asciiAlphanumericCode,
    eng: term.eng.trim(),
    rus: term.rus.trim(),
  };
}
