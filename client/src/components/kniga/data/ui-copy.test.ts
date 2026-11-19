/**
 * ident: client.components.kniga.data.ui-copy.test
 * category: test
 * purpose: verify
 * role: quality
 * semantic: interface-language
 * universe: kniga
 */

import { describe, expect, it } from "vitest";
import { atlasUiCopy } from "./ui-copy";

describe("atlas UI copy", () => {
  it("keeps the same navigation keys in English and Russian", () => {
    expect(Object.keys(atlasUiCopy.en.nav)).toEqual(Object.keys(atlasUiCopy.ru.nav));
  });

  it("provides non-empty localized values for every navigation item", () => {
    for (const locale of ["en", "ru"] as const) {
      expect(Object.values(atlasUiCopy[locale].nav).every((label) => label.trim().length > 0)).toBe(true);
    }
  });

  it("localizes the high-frequency controls instead of relying on blank fallbacks", () => {
    expect(atlasUiCopy.en.searchRegistry).not.toBe(atlasUiCopy.ru.searchRegistry);
    expect(atlasUiCopy.en.chooseFileFirst).not.toBe(atlasUiCopy.ru.chooseFileFirst);
    expect(atlasUiCopy.en.toggleNavigation).not.toBe(atlasUiCopy.ru.toggleNavigation);
  });

  it("keeps registry and comparison label shapes aligned across locales", () => {
    expect(Object.keys(atlasUiCopy.en.registry)).toEqual(Object.keys(atlasUiCopy.ru.registry));
    expect(Object.keys(atlasUiCopy.en.mapping.headers)).toEqual(Object.keys(atlasUiCopy.ru.mapping.headers));
    expect(atlasUiCopy.en.registry.primaryQuestion).not.toBe(atlasUiCopy.ru.registry.primaryQuestion);
    expect(atlasUiCopy.en.mapping.compareBy).not.toBe(atlasUiCopy.ru.mapping.compareBy);
    expect(atlasUiCopy.en.registry.kindLabels).toHaveProperty("model");
    expect(atlasUiCopy.ru.registry.kindLabels.model).toBe("модель");
    expect(atlasUiCopy.en.mapping.xmiEyebrow).not.toBe(atlasUiCopy.ru.mapping.xmiEyebrow);
  });
});
