import { render, screen } from "@testing-library/react";
import { CategorySection } from "./CategorySection";
import type { Resource, ResourceGroup } from "../../types/resource";

const makeResource = (overrides: Partial<Resource> = {}): Resource => ({
  id: "001",
  category: "Podcasts",
  title: "Mindful Moments",
  thumbnail: "https://example.com/photo.jpg",
  tags: ["wellbeing"],
  durationMinutes: 25,
  description: "A calming podcast.",
  dateUploaded: new Date("2025-07-10"),
  ...overrides,
});

const makeGroup = (overrides: Partial<ResourceGroup> = {}): ResourceGroup => ({
  category: "Podcasts",
  resources: [makeResource()],
  ...overrides,
});

describe("CategorySection", () => {
  it("shows the category name as a section heading", () => {
    render(<CategorySection group={makeGroup()} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Podcasts" }),
    ).toBeInTheDocument();
  });

  it("renders a card for every resource in the group", () => {
    const group = makeGroup({
      resources: [
        makeResource({ id: "001", title: "Mindful Moments" }),
        makeResource({ id: "003", title: "Deep Focus" }),
      ],
    });

    render(<CategorySection group={group} />);

    expect(
      screen.getByRole("heading", { name: "Mindful Moments" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Deep Focus" }),
    ).toBeInTheDocument();
  });

  it("labels the section with its category for assistive technology", () => {
    render(<CategorySection group={makeGroup({ category: "Fitness" })} />);

    expect(screen.getByRole("region", { name: "Fitness" })).toBeInTheDocument();
  });
});
