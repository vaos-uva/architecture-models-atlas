/**
 * ident: client.components.ozco.abstract.foundation.scanner
 * category: module
 * purpose: inspect
 * role: domain
 * semantic: scanner
 * universe: ozco
 */

/** A bounded, repeatable inspection request. */
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

export type ItemIdentifier<Item> = (item: Item, index: number) => string;
export type Scanner<Item, Source extends readonly Item[] = readonly Item[]> = (
  query: InspectionQuery,
  source: Source,
) => ScanItem<Item>[];

/**
 * Build a scanner once and reuse it for equivalent sources. The scanner never
 * mutates input and preserves the query on every result for traceability.
 */
export function createScanner<Item>(
  identify: ItemIdentifier<Item> = (_item, index) => String(index + 1),
): Scanner<Item> {
  return (query, source) => source.map((item, index) => ({ id: identify(item, index), item, query }));
}

export function scan<Item>(
  query: InspectionQuery,
  source: readonly Item[],
  identify?: ItemIdentifier<Item>,
): ScanItem<Item>[] {
  return createScanner(identify)(query, source);
}
