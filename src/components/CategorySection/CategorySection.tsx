import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ResourceCard } from '../ResourceCard/ResourceCard';
import type { Resource, ResourceGroup } from '../../types/resource';

interface CategorySectionProps {
  group: ResourceGroup;
  onSelectResource?: (resource: Resource) => void;
}

export const CategorySection = ({ group, onSelectResource }: CategorySectionProps) => {
  const headingId = `category-heading-${group.category.toLowerCase()}`;

  return (
    <Box component="section" aria-labelledby={headingId} sx={{ mb: 5 }}>
      <Typography
        id={headingId}
        variant="h2"
        sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2 }}
      >
        {group.category}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {group.resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onSelect={onSelectResource}
          />
        ))}
      </Box>
    </Box>
  );
};