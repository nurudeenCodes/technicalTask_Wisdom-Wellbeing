import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SortControl } from "./SortControl";

describe("SortControl", () => {
  it("shows the current selection", () => {
    render(<SortControl sortBy="title" onSortChange={() => {}} />);

    expect(
      screen.getByRole("combobox", { name: /sort by/i }),
    ).toHaveTextContent(/title/i);
  });

  it("reports a new selection to the parent", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();

    render(<SortControl sortBy="newest" onSortChange={onSortChange} />);

    await user.click(screen.getByRole("combobox", { name: /sort by/i }));
    await user.click(screen.getByRole("option", { name: /oldest/i }));

    expect(onSortChange).toHaveBeenCalledWith("oldest");
  });
});
