import { CATEGORIES } from '../../types/resource';
import type { Resource, ResourceGroup } from '../../types/resource';

export const groupByCategory = (resources: Resource[]): ResourceGroup[] =>
  CATEGORIES.map((category) => ({
    category,
    resources: resources.filter((resource) => resource.category === category),
  })).filter((group) => group.resources.length > 0);