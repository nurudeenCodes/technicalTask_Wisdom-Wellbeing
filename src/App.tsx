import { useMemo, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { groupByCategory } from "./features/resources/groupByCategory";
import { filterResources } from "./features/resources/filterResources";
import { mapResource } from "./features/resources/mapResource";
import { rawResources } from "./data/rawResources";
import { CategorySection } from "./components/CategorySection/CategorySection";
import { FilterBar } from "./components/FilterBar/FilterBar";
import { ResourceDialog } from "./components/ResourceDialog/ResourceDialog";
import type { Resource } from "./types/resource";
import { Stack } from "@mui/material";
import { SortControl } from "./components/SortControl/SortControl";
import {
  sortResources,
  type SortOption,
} from "./features/resources/sortResources";

const App = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Resource | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const resources = useMemo(() => rawResources.map(mapResource), []);

  const groups = useMemo(
    () =>
      groupByCategory(sortResources(filterResources(resources, query), sortBy)),
    [resources, query, sortBy],
  );

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h1" component="h1" sx={{ mb: 3 }}>
        Resource Centre
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
        <FilterBar query={query} onQueryChange={setQuery} />
        <SortControl sortBy={sortBy} onSortChange={setSortBy} />
      </Stack>

      {groups.length === 0 ? (
        <Typography role="status" color="text.secondary">
          No resources match “{query}”. Try a different search term.
        </Typography>
      ) : (
        groups.map((group) => (
          <CategorySection
            key={group.category}
            group={group}
            onSelectResource={setSelected}
          />
        ))
      )}

      <ResourceDialog resource={selected} onClose={() => setSelected(null)} />
    </Container>
  );
};

export default App;
