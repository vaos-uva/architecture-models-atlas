/**
 * ident: client.components.ozco.abstract.foundation.factory
 * category: contract
 * purpose: construct-and-measure
 * role: domain
 * semantic: factory-tool
 * universe: ozco
 */

/** A product constructor is deliberately independent of React, storage, or UI. */
export type ProductConstructor<Product, Spec> = (spec: Spec) => Product;

/** The smallest schema accepted by a typed factory. */
export type Schema<Product, Kind extends string = string> = {
  kind: Kind;
  payload: Product;
};

/** An abstract factory definition: abstract kind + constructor. */
export type Abstract<Product, Kind extends string = "abstract"> = {
  kind: Kind;
  constructor: ProductConstructor<Product, Schema<Product, Kind>>;
};

/** Factory<Product, Kind> implements factory(spec: Schema<Product>) -> Product. */
export type Factory<Product, Kind extends string = string> = {
  readonly kind: Kind;
  create(spec: Schema<Product, Kind>): Product;
};

export type DigitalSchema<Product> = Schema<Product, "Digital">;
export type DigitalFactory<Product> = Factory<Product, "Digital">;

export function createFactory<Product, Kind extends string>(
  kind: Kind,
  constructor: ProductConstructor<Product, Schema<Product, Kind>>,
): Factory<Product, Kind> {
  return {
    kind,
    create: (spec) => constructor(spec),
  };
}

export { createScanner, scan, type InspectionQuery, type ItemIdentifier, type ScanItem, type Scanner } from "./scanner";
export { createMeasurer, measure, type Measurement, type MeasurementCalculator, type Measurer } from "./measurer";
