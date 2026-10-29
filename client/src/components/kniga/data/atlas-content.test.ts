import { describe, expect, it } from "vitest";
import {
  architectureRoleLenses,
  concepts,
  c4Levels,
  frameworkMetamodelMappings,
  mappingRows,
  mdaStages,
  modelTheoryLenses,
  togafContentObjects,
} from "./atlas-content";

describe("KNIGA atlas content instances", () => {
  it("preserves the extracted concept and lens records", () => {
    expect(concepts).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: "entity" }),
      expect.objectContaining({ id: "mda-pim" }),
      expect.objectContaining({ id: "dragon1-metamodel" }),
      expect.objectContaining({ id: "solution-architecture" }),
      expect.objectContaining({ id: "model-satisfaction" }),
    ]));
    expect(c4Levels).toHaveLength(4);
    expect(mdaStages).toHaveLength(6);
    expect(mappingRows).toHaveLength(6);
    expect(architectureRoleLenses).toHaveLength(3);
    expect(modelTheoryLenses).toHaveLength(4);
    expect(togafContentObjects).toHaveLength(8);
  });

  it("preserves the reciprocal MDA mapping profile", () => {
    expect(frameworkMetamodelMappings["omg-mda"]).toHaveLength(7);
    expect(frameworkMetamodelMappings["omg-mda"]).toEqual(expect.arrayContaining([
      expect.objectContaining({ targetId: "omg-mof", tone: "direct" }),
      expect.objectContaining({ targetId: "iso-42010", tone: "complementary" }),
    ]));
  });
});
