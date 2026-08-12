import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("shows only matching resources when a query is entered", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole("searchbox"), "sleep");

    expect(
      screen.getByRole("heading", { level: 3, name: "The Science of Sleep" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 3, name: "Mindful Moments" }),
    ).not.toBeInTheDocument();
  });

  it("hides categories that have no matching resources", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole("searchbox"), "smoothie");

    expect(
      screen.getByRole("heading", { level: 2, name: "Recipes" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Podcasts" }),
    ).not.toBeInTheDocument();
  });

  it("explains when nothing matches", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole("searchbox"), "zzzzz");

    expect(screen.getByText(/no resources match/i)).toBeInTheDocument();
    expect(screen.queryAllByRole("heading", { level: 2 })).toHaveLength(0);
  });

  it("opens a detail dialog when a resource card is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole("heading", { level: 3, name: "Mindful Moments" }),
    );

    expect(
      await screen.findByRole("dialog", { name: "Mindful Moments" }),
    ).toBeInTheDocument();
  });

  it("sorts by newest first by default", () => {
    render(<App />);

    const meditation = screen.getByRole("region", { name: "Meditation" });
    const titles = within(meditation)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);

    expect(titles[0]).toBe("Three-Minute Breathing Space");
  });

  it("reorders resources within a category when the sort option changes", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("combobox", { name: /sort by/i }));
    await user.click(screen.getByRole("option", { name: /oldest/i }));

    const meditation = screen.getByRole("region", { name: "Meditation" });
    const titles = within(meditation)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);

    expect(titles[0]).toBe("Loving-Kindness Practice");
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
