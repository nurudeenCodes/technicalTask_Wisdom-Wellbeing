import { useMemo, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { groupByCategory } from "./features/resources/groupByCategory";
import { filterResources } from "./features/resources/filterResources";
import { mapResource } from "./features/resources/mapResource";
import { rawResources } from "./data/rawResources";
import { CategorySection } from "./components/CategorySection/CategorySection";
import { FilterBar } from "./components/FilterBar/FilterBar";

const App = () => {
  const [query, setQuery] = useState("");

  const resources = useMemo(() => rawResources.map(mapResource), []);

  const groups = useMemo(
    () => groupByCategory(filterResources(resources, query)),
    [resources, query],
  );

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h1" component="h1" sx={{ mb: 3 }}>
        Resource Centre
      </Typography>

      <FilterBar query={query} onQueryChange={setQuery} />

      {groups.length === 0 ? (
        <Typography role="status" color="text.secondary">
          No resources match “{query}”. Try a different search term.
        </Typography>
      ) : (
        groups.map((group) => (
          <CategorySection key={group.category} group={group} />
        ))
      )}
    </Container>
  );
};

export default App;
