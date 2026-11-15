/**
 * ident: client.components.kniga.structure.autodev-tool
 * category: module
 * purpose: orchestrate
 * role: product
 * semantic: autodev
 * universe: kniga
 */

import { createDigitalFactoryTool } from "@/components/ozco/abstract/foundation/digital-factory";
import type { InspectionQuery, Measurement } from "@/components/ozco/abstract/foundation/factory";

export const AUTODEV_ROLES = ["architect", "developer", "operator"] as const;
export type AutoDevRole = (typeof AUTODEV_ROLES)[number];

export const AUTODEV_STATUSES = ["planned", "ready", "in-progress", "blocked", "done"] as const;
export type AutoDevStatus = (typeof AUTODEV_STATUSES)[number];

export type AutoDevWorkItem = {
  id: string;
  role: AutoDevRole;
  title: string;
  objective: string;
  status: AutoDevStatus;
  query: InspectionQuery;
  acceptance: readonly string[];
  dependsOn?: readonly string[];
};

export type AutoDevRoleMetric = {
  role: AutoDevRole | "all";
  total: number;
  done: number;
  ready: number;
  blocked: number;
  completionPercent: number;
};

export type AutoDevToolConfig = {
  items: readonly AutoDevWorkItem[];
  defaultQuery?: InspectionQuery;
};

export type AutoDevTool = {
  readonly create: (item: Omit<AutoDevWorkItem, "status"> & { status?: AutoDevStatus }) => AutoDevWorkItem;
  readonly scan: (role?: AutoDevRole) => AutoDevWorkItem[];
  readonly measure: (role?: AutoDevRole) => Measurement<AutoDevWorkItem, AutoDevRoleMetric>;
  readonly brief: (role?: AutoDevRole) => string;
};

const EMPTY_QUERY: InspectionQuery = { what: "work items", where: "KNIGA atlas", how: "execute by role and gate" };

function percentage(done: number, total: number): number {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

function metric(role: AutoDevRole | "all", items: readonly AutoDevWorkItem[]): AutoDevRoleMetric {
  const done = items.filter((item) => item.status === "done").length;
  return {
    role,
    total: items.length,
    done,
    ready: items.filter((item) => item.status === "ready").length,
    blocked: items.filter((item) => item.status === "blocked").length,
    completionPercent: percentage(done, items.length),
  };
}

/**
 * Create a deterministic atlas workflow tool. The source list is immutable;
 * role scans and metrics are derived projections, so the same config produces
 * the same execution brief without duplicating task meaning in a renderer.
 */
export function createAtlasAutoDevTool(config: AutoDevToolConfig): AutoDevTool {
  const source = config.items.map((item) => ({ ...item, acceptance: [...item.acceptance], dependsOn: item.dependsOn ? [...item.dependsOn] : undefined }));
  const productTool = createDigitalFactoryTool<AutoDevWorkItem, AutoDevRoleMetric>(
    ({ payload }) => payload,
    (items) => metric("all", items.map(({ item }) => item)),
    (item) => item.id,
  );
  const defaultQuery = config.defaultQuery ?? EMPTY_QUERY;

  const create = (item: Omit<AutoDevWorkItem, "status"> & { status?: AutoDevStatus }): AutoDevWorkItem =>
    productTool.factory.create({
      kind: "Digital",
      payload: { ...item, status: item.status ?? "planned", query: item.query ?? defaultQuery },
    });

  const scan = (role?: AutoDevRole): AutoDevWorkItem[] => {
    const selected = role ? source.filter((item) => item.role === role) : source;
    return productTool.scan(defaultQuery, selected).map(({ item }) => item);
  };

  const measure = (role?: AutoDevRole): Measurement<AutoDevWorkItem, AutoDevRoleMetric> => {
    const selected = scan(role);
    const scanned = productTool.scan(defaultQuery, selected);
    return productTool.measure(defaultQuery, scanned);
  };

  const brief = (role?: AutoDevRole): string => {
    const selected = scan(role);
    const label = role ?? "all roles";
    return selected.length === 0
      ? `${label}: no work items`
      : `${label}: ${selected.map((item) => `${item.id} [${item.status}] ${item.title}`).join("; ")}`;
  };

  return { create, scan, measure, brief };
}
