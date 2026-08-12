import { sortResources } from "./sortResources";
import { makeResource } from "../../test/factories";

const a = makeResource({
  id: "a",
  title: "Zebra Facts",
  durationMinutes: 30,
  dateUploaded: new Date("2025-01-01"),
});
const b = makeResource({
  id: "b",
  title: "Apple Basics",
  durationMinutes: 10,
  dateUploaded: new Date("2025-06-01"),
});
const c = makeResource({
  id: "c",
  title: "Mango Guide",
  durationMinutes: 20,
  dateUploaded: new Date("2025-03-01"),
});

const resources = [a, b, c];

describe("sortResources", () => {
  it("orders by newest first", () => {
    expect(sortResources(resources, "newest").map((r) => r.id)).toEqual([
      "b",
      "c",
      "a",
    ]);
  });

  it("orders by oldest first", () => {
    expect(sortResources(resources, "oldest").map((r) => r.id)).toEqual([
      "a",
      "c",
      "b",
    ]);
  });

  it("orders by title alphabetically", () => {
    expect(sortResources(resources, "title").map((r) => r.id)).toEqual([
      "b",
      "c",
      "a",
    ]);
  });

  it("orders by shortest duration first", () => {
    expect(sortResources(resources, "duration").map((r) => r.id)).toEqual([
      "b",
      "c",
      "a",
    ]);
  });

  it("does not mutate the array it is given", () => {
    const original = [...resources];

    sortResources(resources, "title");

    expect(resources).toEqual(original);
  });

  it("compares titles case-insensitively", () => {
    const lower = makeResource({ id: "lower", title: "apple" });
    const upper = makeResource({ id: "upper", title: "Banana" });

    expect(sortResources([upper, lower], "title").map((r) => r.id)).toEqual([
      "lower",
      "upper",
    ]);
  });
});
