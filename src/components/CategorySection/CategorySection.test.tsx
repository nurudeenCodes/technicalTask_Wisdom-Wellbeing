import { render, screen } from "@testing-library/react";
import { CategorySection } from "./CategorySection";
import { makeResource, makeGroup } from "../../test/factories";

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
