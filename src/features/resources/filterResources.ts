import type { Resource } from '../../types/resource';

const matches = (resource: Resource, query: string): boolean =>
  resource.title.toLowerCase().includes(query) ||
  resource.tags.some((tag) => tag.toLowerCase().includes(query));

export const filterResources = (resources: Resource[], query: string): Resource[] => {
  const normalised = query.trim().toLowerCase();

  if (normalised === '') return resources;

  return resources.filter((resource) => matches(resource, normalised));
};