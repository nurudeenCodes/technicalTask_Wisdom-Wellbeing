import type { Category } from '../../types/resource';

const DURATION_LABELS: Record<Category, string> = {
  Podcasts: 'listen',
  Articles: 'read',
  Newsletters: 'read',
  Recipes: 'read',
  Fitness: 'workout',
  Meditation: 'listen',
};

export const formatDuration = (minutes: number, category: Category): string =>
  `${minutes} min ${DURATION_LABELS[category]}`;