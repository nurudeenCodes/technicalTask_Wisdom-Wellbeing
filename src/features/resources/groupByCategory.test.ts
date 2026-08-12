import { groupByCategory } from "./groupByCategory";
import { makeResource } from "../../test/factories";

describe("groupByCategory", () => {
  it("groups resources under their category", () => {
    const resources = [
      makeResource({ id: "001", category: "Podcasts" }),
      makeResource({ id: "002", category: "Articles" }),
      makeResource({ id: "003", category: "Podcasts" }),
    ];

    const result = groupByCategory(resources);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      category: "Podcasts",
      resources: [resources[0], resources[2]],
    });
  });

  it("returns groups in the canonical category order", () => {
    const resources = [
      makeResource({ category: "Meditation" }),
      makeResource({ category: "Articles" }),
      makeResource({ category: "Podcasts" }),
    ];

    const result = groupByCategory(resources);

    expect(result.map((group) => group.category)).toEqual([
      "Podcasts",
      "Articles",
      "Meditation",
    ]);
  });

  it("omits categories with no resources", () => {
    const result = groupByCategory([makeResource({ category: "Fitness" })]);

    expect(result.map((group) => group.category)).toEqual(["Fitness"]);
  });

  it("returns an empty array when given no resources", () => {
    expect(groupByCategory([])).toEqual([]);
  });
});
