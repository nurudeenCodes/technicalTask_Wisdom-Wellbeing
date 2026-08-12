import { CATEGORIES } from "../../types/resource";
import type { Category, RawResource, Resource } from "../../types/resource";

const isCategory = (value: string): value is Category =>
  (CATEGORIES as readonly string[]).includes(value);

export const mapResource = (raw: RawResource): Resource => {
  if (!isCategory(raw.category)) {
    throw new Error(`Unknown resource category: ${raw.category}`);
  }

  return {
    id: raw.id,
    category: raw.category,
    title: raw.title,
    thumbnail: raw.thumbnail,
    tags: raw.tags,
    durationMinutes: raw.duration,
    description: raw.description,
    dateUploaded: new Date(raw.date_uploaded),
  };
};
