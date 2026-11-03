/**
 * ident: client.components.kniga.view.translation-fallback-notice
 * category: view
 * purpose: render
 * role: feedback
 * semantic: translation
 * universe: kniga
 */

import type { TranslationResolution } from "@/components/ozco/abstract/foundation/multilingual";

type TranslationFallbackNoticeProps = {
  resolution: TranslationResolution;
  compact?: boolean;
};

export function TranslationFallbackNotice({ resolution, compact = false }: TranslationFallbackNoticeProps) {
  if (resolution.status === "translated") return null;

  const unavailable = resolution.status === "unavailable";
  const label = unavailable
    ? resolution.requestedLocale === "rus" ? "Перевод отсутствует" : "Translation unavailable"
    : resolution.requestedLocale === "rus" ? "Английский fallback" : "English fallback";
  const description = unavailable
    ? "This value is not available in the selected language yet."
    : "The English value is shown while the selected-language translation is pending.";

  return (
    <span
      className={`translation-fallback translation-fallback-${unavailable ? "unavailable" : "fallback"}${compact ? " translation-fallback-compact" : ""}`}
      title={description}
      role="status"
      aria-label={description}
    >
      {label}
    </span>
  );
}
