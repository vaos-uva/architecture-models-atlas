/**
 * ident: client.components.ozco.abstract.foundation.digital-factory
 * category: module
 * purpose: compose
 * role: domain
 * semantic: digital-factory
 * universe: ozco
 */

import { createFactory, type DigitalFactory } from "./factory";
import { createMeasurer, type Measurement, type MeasurementCalculator } from "./measurer";
import { createScanner, type InspectionQuery, type ItemIdentifier, type ScanItem } from "./scanner";

export type DigitalFactoryTool<Product, Metric> = {
  readonly factory: DigitalFactory<Product>;
  readonly scan: (query: InspectionQuery, source: readonly Product[]) => ScanItem<Product>[];
  readonly measure: (
    query: InspectionQuery,
    items: readonly ScanItem<Product>[],
  ) => Measurement<Product, Metric>;
};

/**
 * Compose the Digital product factory once, then reuse the stable tool for
 * repeatable scans and measurements over any equivalent product collection.
 */
export function createDigitalFactoryTool<Product, Metric>(
  construct: (spec: { kind: "Digital"; payload: Product }) => Product,
  calculate: MeasurementCalculator<Product, Metric>,
  identify?: ItemIdentifier<Product>,
): DigitalFactoryTool<Product, Metric> {
  const factory = createFactory<Product, "Digital">("Digital", construct);
  const scanner = createScanner(identify);
  const measurer = createMeasurer(calculate);

  return {
    factory,
    scan: (query, source) => scanner(query, source),
    measure: (query, items) => measurer(query, items),
  };
}
