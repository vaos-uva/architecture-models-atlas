import { describe, expect, it } from "vitest";
import {
  concepts,
  c4Levels,
  frameworkMetamodelMappings,
  mappingRows,
  mdaStages,
} from "./atlas-content";

describe("KNIGA atlas content instances", () => {
  it("preserves the extracted concept and lens records", () => {
    expect(concepts).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: "entity" }),
      expect.objectContaining({ id: "mda-pim" }),
      expect.objectContaining({ id: "dragon1-metamodel" }),
    ]));
    expect(c4Levels).toHaveLength(4);
    expect(mdaStages).toHaveLength(6);
    expect(mappingRows).toHaveLength(6);
  });

  it("preserves the reciprocal MDA mapping profile", () => {
    expect(frameworkMetamodelMappings["omg-mda"]).toHaveLength(7);
    expect(frameworkMetamodelMappings["omg-mda"]).toEqual(expect.arrayContaining([
      expect.objectContaining({ targetId: "omg-mof", tone: "direct" }),
      expect.objectContaining({ targetId: "iso-42010", tone: "complementary" }),
    ]));
  });
});
