import { mapResource } from "./mapResource";
import type { RawResource } from "../../types/resource";

const rawPodcast: RawResource = {
  id: "001",
  category: "Podcasts",
  title: "Mindful Moments",
  thumbnail: "https://example.com/photo.jpg",
  tags: ["wellbeing", "mindfulness", "relaxation"],
  duration: 25,
  description: "A calming podcast.",
  date_uploaded: "2025-07-10",
};

describe("mapResource", () => {
  it("maps snake_case API fields onto the camelCase domain model", () => {
    const result = mapResource(rawPodcast);

    expect(result.durationMinutes).toBe(25);
    expect(result.dateUploaded).toBeInstanceOf(Date);
    expect(result.dateUploaded.toISOString()).toBe("2025-07-10T00:00:00.000Z");
  });

  it("preserves fields that need no transformation", () => {
    const result = mapResource(rawPodcast);

    expect(result).toMatchObject({
      id: "001",
      category: "Podcasts",
      title: "Mindful Moments",
      description: "A calming podcast.",
    });
  });

  it("rejects a category outside the known set", () => {
    const invalid = { ...rawPodcast, category: "Webinars" };

    expect(() => mapResource(invalid)).toThrow(/Webinars/);
  });
});
