export const CATEGORIES = [
  'Podcasts',
  'Articles',
  'Newsletters',
  'Recipes',
  'Fitness',
  'Meditation',
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Shape as received from the API / mock JSON. */
export interface RawResource {
  id: string;
  category: string;
  title: string;
  thumbnail: string;
  tags: string[];
  duration: number;
  description: string;
  date_uploaded: string;
}

/** Domain model used throughout the app. */
export interface Resource {
  id: string;
  category: Category;
  title: string;
  thumbnail: string;
  tags: string[];
  durationMinutes: number;
  description: string;
  dateUploaded: Date;
}