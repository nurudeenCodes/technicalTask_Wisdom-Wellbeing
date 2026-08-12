import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SORT_OPTIONS } from "../../features/resources/sortResources";
import type { SortOption } from "../../features/resources/sortResources";

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  title: "Title (A-Z)",
  duration: "Shortest first",
};

interface SortControlProps {
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
}

export const SortControl = ({ sortBy, onSortChange }: SortControlProps) => (
  <FormControl sx={{ minWidth: 200 }}>
    <InputLabel id="sort-label">Sort by</InputLabel>
    <Select
      labelId="sort-label"
      id="sort-select"
      label="Sort by"
      value={sortBy}
      onChange={(event) => onSortChange(event.target.value as SortOption)}
    >
      {SORT_OPTIONS.map((option) => (
        <MenuItem key={option} value={option}>
          {SORT_LABELS[option]}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
