# Resource Centre

A single-page application displaying wellbeing resources grouped by category, built for the HA | Wisdom Wellbeing frontend tech task.

![Resource Centre](docs/Screenshot.png)

## Running locally

```bash
npm install
npm run dev
```

## Tests

```bash
npm run test:run   # single run
npm test           # watch mode
npx tsc --noEmit   # typecheck
```

53 tests across 12 files.

## Stack

React 19, TypeScript, Vite, MUI 7, Vitest, React Testing Library.

MUI was chosen mainly for its accessible `Dialog`, focus trapping, Escape handling and focus restoration are easy to get subtly wrong by hand, and the detail view needed all three. The default MUI look is deliberately overridden in `src/theme/theme.ts` (flat cards with a hairline border rather than drop shadows, larger corner radius, palette drawn from the HA branding).

## Approach

Development was test-first throughout. Each feature is two commits.. a `test:` commit containing a failing spec, then a `feat:` commit making it pass. So the git history shows the red/green cycle rather than tests written retrospectively.

### Architecture

Pure logic lives in `src/features/resources/` and is unit-tested without rendering anything. Components consume it and are tested through the DOM. The split keeps the interesting logic: grouping, filtering, formatting - fast to test and independent of React.

Raw JSON is mapped to a domain model at a single boundary (`mapResource`). `RawResource` mirrors the API shape with `category: string`; `Resource` uses `Category`, a union derived from the `CATEGORIES` const tuple. The mapper narrows between them with a type predicate and throws on an unknown category, so invalid data fails at the boundary rather than propagating as a type that lies. Swapping mock data for a real API means changing one function.

### Notable decisions

- **Categories render in a fixed order**, not data order. `groupByCategory` iterates `CATEGORIES` and collects matching resources, so ordering is guaranteed by construction with no sort step.
- **Empty categories are omitted.** This costs nothing on first load but matters when filtering.. sections disappear as they empty instead of leaving dangling headings.
- **Filtering matches title *or* tags** in a single pass. The brief's "filter by title/tags" is ambiguous; one box matching either seemed the better user experience, and a single pass avoids duplicating a resource that matches both.
- **Cards show at most 3 tags; the dialog shows all.** The 3-tag cap is a card layout constraint, not a property of the data.
- **Duration labels vary by category** - "25 min listen", "8 min read", "10 min workout", driven by a `Record<Category, string>`, so adding a category is a compile error until the label is supplied.
- **Accessibility**: sections are labelled regions, headings nest `h1` → `h2` → `h3`, thumbnails are marked decorative since the title sits beside them, and the no-results message is a live region.
- **Sorting applies within categories, not across them.** Category order is fixed by design, so the sort control reorders cards inside each section rather than reordering the sections themselves.
- **Filtering, then sorting, then grouping.** Sorting before filtering would order records that get discarded; grouping consumes an already-ordered flat list, so `groupByCategory` needed no changes to support sorting.

## Given more time

- **A real data layer.** Currently a synchronous import. I would move to TanStack Query behind the existing mapper, which would also surface loading and error states the UI does not yet have.
- **Remove the one remaining type assertion.** MUI's `Select` types its change value as `string`, so `SortControl` casts to `SortOption`. Safe in practice, but a type predicate would prove it rather than assert it.
- **Debounced filtering.** Filtering runs on every keystroke. Fine for 24 records, wasteful against an API.
- **URL-synced state.** The query and selected resource are component state, so a filtered view can't be shared or survive a refresh. `?q=sleep` would fix that.
- **Timezone handling.** `new Date('2025-07-10')` parses as UTC midnight. Harmless in the UK; in a negative-offset timezone the displayed date could be a day early. A date-only type or explicit local construction would be correct.
- **Virtualisation and image loading.** At this size neither matters. At a few hundred resources I would virtualise the grids and lazy-load thumbnails.
- **Visual regression and E2E coverage.** Unit and integration tests cover behaviour; they would not catch a layout regression. Playwright for a smoke path, plus screenshot testing on the card.
- **Error boundaries.** A malformed record currently throws from the mapper and takes the page down.

## Time spent

Approximately 9 hours.