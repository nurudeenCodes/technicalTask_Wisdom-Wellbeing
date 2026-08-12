import { render, screen } from "@testing-library/react";
import { ResourceCard } from "./ResourceCard";
import type { Resource } from "../../types/resource";

const makeResource = (overrides: Partial<Resource> = {}): Resource => ({
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

describe("ResourceCard", () => {
  it("shows the resource title", () => {
    render(<ResourceCard resource={makeResource()} />);

    expect(
      screen.getByRole("heading", { name: "Mindful Moments" }),
    ).toBeInTheDocument();
  });

  it("shows the thumbnail as a decorative image", () => {
    render(<ResourceCard resource={makeResource()} />);

    const image = screen.getByRole("presentation");
    expect(image).toHaveAttribute("src", "https://example.com/photo.jpg");
  });

  it("shows a category-appropriate duration label", () => {
    render(
      <ResourceCard
        resource={makeResource({ category: "Articles", durationMinutes: 8 })}
      />,
    );

    expect(screen.getByText("8 min read")).toBeInTheDocument();
  });

  it("shows every tag when there are three or fewer", () => {
    render(<ResourceCard resource={makeResource()} />);

    expect(screen.getByText("wellbeing")).toBeInTheDocument();
    expect(screen.getByText("mindfulness")).toBeInTheDocument();
    expect(screen.getByText("relaxation")).toBeInTheDocument();
  });

  it("shows no more than three tags", () => {
    render(
      <ResourceCard
        resource={makeResource({
          tags: ["one", "two", "three", "four", "five"],
        })}
      />,
    );

    expect(screen.getByText("one")).toBeInTheDocument();
    expect(screen.getByText("three")).toBeInTheDocument();
    expect(screen.queryByText("four")).not.toBeInTheDocument();
    expect(screen.queryByText("five")).not.toBeInTheDocument();
  });
});
