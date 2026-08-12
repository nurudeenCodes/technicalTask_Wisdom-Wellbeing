import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterBar } from "./FilterBar";

describe("FilterBar", () => {
  it("shows the current query", () => {
    render(<FilterBar query="sleep" onQueryChange={() => {}} />);

    expect(
      screen.getByRole("searchbox", { name: /search resources/i }),
    ).toHaveValue("sleep");
  });

  it("reports each keystroke to the parent", async () => {
    const user = userEvent.setup();
    const onQueryChange = vi.fn();

    render(<FilterBar query="" onQueryChange={onQueryChange} />);
    await user.type(screen.getByRole("searchbox"), "sun");

    expect(onQueryChange).toHaveBeenCalledTimes(3);
    expect(onQueryChange).toHaveBeenLastCalledWith("n");
  });
});
