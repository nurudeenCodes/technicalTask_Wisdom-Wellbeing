import type { Resource } from "../../types/resource";

export const SORT_OPTIONS = ["newest", "oldest", "title", "duration"] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

const COMPARATORS: Record<SortOption, (a: Resource, b: Resource) => number> = {
  newest: (a, b) => b.dateUploaded.getTime() - a.dateUploaded.getTime(),
  oldest: (a, b) => a.dateUploaded.getTime() - b.dateUploaded.getTime(),
  title: (a, b) =>
    a.title.localeCompare(b.title, "en-GB", { sensitivity: "base" }),
  duration: (a, b) => a.durationMinutes - b.durationMinutes,
};

export const sortResources = (
  resources: Resource[],
  sortBy: SortOption,
): Resource[] => [...resources].sort(COMPARATORS[sortBy]);
