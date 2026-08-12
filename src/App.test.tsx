import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("shows the page heading", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: /resource centre/i }),
    ).toBeInTheDocument();
  });

  it("renders a section for every category present in the data", () => {
    render(<App />);

    [
      "Podcasts",
      "Articles",
      "Newsletters",
      "Recipes",
      "Fitness",
      "Meditation",
    ].forEach((category) => {
      expect(
        screen.getByRole("heading", { level: 2, name: category }),
      ).toBeInTheDocument();
    });
  });

  it("renders every resource from the dataset", () => {
    render(<App />);

    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(24);
  });

  it("orders categories canonically rather than by data order", () => {
    render(<App />);

    const headings = screen.getAllByRole("heading", { level: 2 });

    expect(headings.map((h) => h.textContent)).toEqual([
      "Podcasts",
      "Articles",
      "Newsletters",
      "Recipes",
      "Fitness",
      "Meditation",
    ]);
  });
});
