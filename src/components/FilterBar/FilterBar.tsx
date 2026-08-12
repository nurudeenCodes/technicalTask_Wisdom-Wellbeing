import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

interface FilterBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export const FilterBar = ({ query, onQueryChange }: FilterBarProps) => (
  <TextField
    type="search"
    label="Search resources"
    value={query}
    onChange={(event) => onQueryChange(event.target.value)}
    fullWidth
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      },
    }}
    sx={{ mb: 4, maxWidth: 480 }}
  />
);
