/**
 * ident: client.components.kniga.data.translation-metrics
 * category: metric
 * purpose: measure
 * role: projection
 * semantic: localization
 * universe: kniga
 */

import { createFactory, measure, scan, type InspectionQuery, type Measurement, type ScanItem } from "@/components/ozco/abstract/foundation/factory";
import type { TranslationResolution, TranslationResolutionStatus, SupportedLocale } from "@/components/ozco/abstract/foundation/multilingual";

export type TranslationMetricField = {
  id: string;
  label: string;
  resolution: TranslationResolution;
};

export type TranslationCompletenessMetric = {
  locale: SupportedLocale;
  scope: "architecture-specification-registry";
  translated: number;
  fallback: number;
  unavailable: number;
  total: number;
  percentage: number;
  items: readonly TranslationMetricField[];
};

export type RegistryTranslationRecord = {
  id: string;
  nameResolution: TranslationResolution;
  contentResolution: TranslationResolution;
};

const translationMetricFactory = createFactory<TranslationCompletenessMetric, "Digital">(
  "Digital",
  ({ payload }) => payload,
);

const metricQuery: InspectionQuery = {
  what: "translation completeness of architecture specification fields",
  where: "KNIGA architecture specification registry",
  how: "scan each localized field, then measure resolution status",
};

function statusCount(items: readonly ScanItem<TranslationMetricField>[], status: TranslationResolutionStatus): number {
  return items.filter(({ item }) => item.resolution.status === status).length;
}

export function createRegistryTranslationFields(record: RegistryTranslationRecord): TranslationMetricField[] {
  return [
    { id: `${record.id}:name`, label: "name", resolution: record.nameResolution },
    { id: `${record.id}:primaryQuestion`, label: "primary question", resolution: record.contentResolution },
  ];
}

export function measureTranslationCompleteness(
  locale: SupportedLocale,
  fields: readonly TranslationMetricField[],
): TranslationCompletenessMetric {
  const scanned = scan(metricQuery, fields, (field) => field.id);
  const measured: Measurement<TranslationMetricField, Omit<TranslationCompletenessMetric, "locale" | "scope" | "items">> = measure(
    metricQuery,
    scanned,
    (items) => {
      const total = items.length;
      const translated = statusCount(items, "translated");
      const fallback = statusCount(items, "fallback");
      const unavailable = statusCount(items, "unavailable");
      return {
        translated,
        fallback,
        unavailable,
        total,
        percentage: total === 0 ? 0 : Math.round((translated / total) * 100),
      };
    },
  );

  return translationMetricFactory.create({
    kind: "Digital",
    payload: {
      locale,
      scope: "architecture-specification-registry",
      ...measured.value,
      items: fields,
    },
  });
}

export function measureRegistryTranslationCompleteness(
  locale: SupportedLocale,
  records: readonly RegistryTranslationRecord[],
): TranslationCompletenessMetric {
  return measureTranslationCompleteness(locale, records.flatMap(createRegistryTranslationFields));
}

export function formatTranslationPercentage(metric: TranslationCompletenessMetric): string {
  return `${metric.percentage}%`;
}
