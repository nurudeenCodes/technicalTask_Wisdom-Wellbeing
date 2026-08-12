import { useMemo } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { groupByCategory } from './features/resources/groupByCategory';
import { mapResource } from './features/resources/mapResource';
import { rawResources } from './data/rawResources';
import { CategorySection } from './components/CategorySection/CategorySection';

const App = () => {
  const groups = useMemo(
    () => groupByCategory(rawResources.map(mapResource)),
    []
  );

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h1" component="h1" sx={{ mb: 4 }}>
        Resource Centre
      </Typography>

      {groups.map((group) => (
        <CategorySection key={group.category} group={group} />
      ))}
    </Container>
  );
};

export default App;