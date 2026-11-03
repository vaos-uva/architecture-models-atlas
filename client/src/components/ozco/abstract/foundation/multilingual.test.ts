/**
 * ident: client.components.ozco.abstract.foundation.multilingual-test
 * category: test
 * purpose: validate
 * role: test
 * semantic: validation
 * universe: ozco
 */

import { describe, expect, it } from "vitest";
import { normalizeMultilingualNormalForm, resolveTranslation, validateMultilingualNormalForm } from "./multilingual";

const validTerm = {
  termsExpressions: ["Architecture View", "view"],
  asciiAlphanumericCode: "ArchitectureView",
  eng: "Architecture View",
  rus: "Архитектурное представление",
} as const;

describe("multilingual normal form", () => {
  it("accepts stable ASCII identity and explicit English/Russian values", () => {
    expect(validateMultilingualNormalForm(validTerm)).toEqual([]);
  });

  it("rejects missing translations and non-ASCII identity", () => {
    expect(validateMultilingualNormalForm({ ...validTerm, asciiAlphanumericCode: "architecture-view", rus: "" })).toEqual([
      { field: "asciiAlphanumericCode", message: "must contain only ASCII letters and digits" },
      { field: "rus", message: "must be explicit and non-empty" },
    ]);
  });

  it("deduplicates expressions without changing their order or translations", () => {
    expect(normalizeMultilingualNormalForm({ ...validTerm, termsExpressions: [" Architecture View ", "view", "view"] })).toEqual(validTerm);
  });

  it("makes missing Russian content explicit instead of returning an empty string", () => {
    expect(resolveTranslation({ eng: "Architecture Description", rus: "" }, "rus")).toEqual({
      requestedLocale: "rus",
      resolvedLocale: "eng",
      status: "fallback",
      value: "Architecture Description",
      reason: "missing-requested-translation",
    });
    expect(resolveTranslation(undefined, "rus", "Legacy label").status).toBe("fallback");
    expect(resolveTranslation(undefined, "rus").status).toBe("unavailable");
  });
});
