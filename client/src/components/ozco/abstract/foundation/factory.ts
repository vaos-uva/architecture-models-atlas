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

export function createFactory<Product, Kind extends string>(
  kind: Kind,
  constructor: ProductConstructor<Product, Schema<Product, Kind>>,
): Factory<Product, Kind> {
  return {
    kind,
    create: (spec) => constructor(spec),
  };
}

/** A bounded inspection request: What, Where, and How. */
export type InspectionQuery = {
  what: string;
  where: string;
  how: string;
};

export type ScanItem<Item> = {
  id: string;
  item: Item;
  query: InspectionQuery;
};

export type Scanner<Item, Source> = (query: InspectionQuery, source: Source) => ScanItem<Item>[];

/** Default scanner: inspect every source item while preserving the query envelope. */
export function scan<Item>(
  query: InspectionQuery,
  source: readonly Item[],
  identify: (item: Item, index: number) => string = (_item, index) => String(index + 1),
): ScanItem<Item>[] {
  return source.map((item, index) => ({ id: identify(item, index), item, query }));
}

export type Measurement<Item, Value> = {
  query: InspectionQuery;
  value: Value;
  items: readonly ScanItem<Item>[];
};

export type Measurer<Item, Value> = (query: InspectionQuery, items: readonly ScanItem<Item>[]) => Measurement<Item, Value>;

export function measure<Item, Value>(
  query: InspectionQuery,
  items: readonly ScanItem<Item>[],
  calculate: (items: readonly ScanItem<Item>[]) => Value,
): Measurement<Item, Value> {
  return { query, value: calculate(items), items };
}
