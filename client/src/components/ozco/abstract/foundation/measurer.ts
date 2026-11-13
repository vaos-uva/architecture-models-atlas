/**
 * ident: client.components.ozco.abstract.foundation.measurer
 * category: module
 * purpose: measure
 * role: domain
 * semantic: measurer
 * universe: ozco
 */

import type { InspectionQuery, ScanItem } from "./scanner";

export type Measurement<Item, Value> = {
  query: InspectionQuery;
  value: Value;
  items: readonly ScanItem<Item>[];
};

export type MeasurementCalculator<Item, Value> = (items: readonly ScanItem<Item>[]) => Value;
export type Measurer<Item, Value> = (
  query: InspectionQuery,
  items: readonly ScanItem<Item>[],
) => Measurement<Item, Value>;

/** Build a repeatable measurer; calculation is pure and receives immutable results. */
export function createMeasurer<Item, Value>(
  calculate: MeasurementCalculator<Item, Value>,
): Measurer<Item, Value> {
  return (query, items) => ({ query, value: calculate(items), items });
}

export function measure<Item, Value>(
  query: InspectionQuery,
  items: readonly ScanItem<Item>[],
  calculate: MeasurementCalculator<Item, Value>,
): Measurement<Item, Value> {
  return createMeasurer(calculate)(query, items);
}
