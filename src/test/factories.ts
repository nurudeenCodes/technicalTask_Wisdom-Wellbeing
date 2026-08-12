import type { Resource, ResourceGroup } from "../types/resource";

export const makeResource = (overrides: Partial<Resource> = {}): Resource => ({
  id: "001",
  category: "Podcasts",
  title: "Mindful Moments",
  thumbnail: "https://example.com/photo.jpg",
  tags: ["wellbeing", "mindfulness", "relaxation"],
  durationMinutes: 25,
  description: "A calming podcast.",
  dateUploaded: new Date("2025-07-10"),
  ...overrides,
});

export const makeGroup = (
  overrides: Partial<ResourceGroup> = {},
): ResourceGroup => ({
  category: "Podcasts",
  resources: [makeResource()],
  ...overrides,
});
